#!/usr/bin/env python3
"""Build the curriculum draft videos from video/scripts.json.

For each module it makes:
  video/module-NN.mp4   narrated slide video
  video/module-NN.jpg   poster image
  video/module-NN.vtt   Pidgin captions
  video/scripts/module-NN.md   recording script for a real presenter

Voice for each slide, in this order:
  1. a real recording: video/recordings/module-NN-slide-K.(mp3|m4a|wav)   (K = 1, 2, 3 …)
  2. Microsoft Azure Nigerian-English AI voice (default en-NG-EzinneNeural), if a key is set:
       env AZURE_SPEECH_KEY + AZURE_SPEECH_REGION, or a file video/.azure-key with the key on
       line 1 and the region (e.g. uksouth) on line 2. That file is never committed.
       AI audio is cached in video/.tts-cache so rebuilding doesn't use the free allowance again.
  3. Free Nigerian-English voice via `edge-tts` (pip install edge-tts) — same Ezinne voice, no account.
     Note: uses the Microsoft Edge read-aloud service; it may change or stop working.
  4. macOS `say` (last fallback — no Nigerian voice on macOS).

Needs: macOS `afinfo`, Google Chrome, and ffmpeg
(set FFMPEG=/path/to/ffmpeg, or `pip install imageio-ffmpeg`).

Usage: python3 video/build_videos.py [module ids...]
"""
import hashlib, html, json, os, re, shutil, subprocess, sys, tempfile, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VID = ROOT / "video"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
VOICE = os.environ.get("VOICE", "Tessa")   # macOS fallback voice (no Nigerian voice on macOS)
RATE = os.environ.get("RATE", "160")       # words per minute for the fallback voice
AZ_VOICE = os.environ.get("AZURE_VOICE", "en-NG-EzinneNeural")   # Nigerian-English female; male: en-NG-AbeoNeural
AZ_RATE = os.environ.get("AZURE_RATE", "-6%")                    # a little slower for clarity
REC = ROOT / "video" / "recordings"
CACHE = ROOT / "video" / ".tts-cache"
W, H = 1280, 720
SITE = "www.datalization.co.uk"


def azure_creds():
    key, region = os.environ.get("AZURE_SPEECH_KEY"), os.environ.get("AZURE_SPEECH_REGION")
    f = ROOT / "video" / ".azure-key"
    if not key and f.exists():
        lines = [l.strip() for l in f.read_text().splitlines() if l.strip()]
        key, region = lines[0], (lines[1] if len(lines) > 1 else region)
    return (key, region) if key and region else (None, None)


AZ_KEY, AZ_REGION = azure_creds()


def ffmpeg_path():
    if os.environ.get("FFMPEG"):
        return os.environ["FFMPEG"]
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        return shutil.which("ffmpeg") or sys.exit("ffmpeg not found: set FFMPEG or pip install imageio-ffmpeg")


FF = ffmpeg_path()
E = html.escape

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500;700&display=swap');
*{box-sizing:border-box;margin:0}
body{width:%dpx;height:%dpx;overflow:hidden;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;
 background:radial-gradient(ellipse at 90%% 0%%,rgba(222,187,121,.22),transparent 55%%),linear-gradient(160deg,#760308,#4f0205);
 color:#f7ecd9;position:relative}
.slab{font-family:'Roboto Slab',Georgia,serif}
.gold{background:linear-gradient(100deg,#b98a45,#f1d796 45%%,#c59d58);-webkit-background-clip:text;background-clip:text;color:transparent}
.top{position:absolute;top:34px;left:56px;right:56px;display:flex;justify-content:space-between;align-items:center;font-size:20px;letter-spacing:.12em;text-transform:uppercase;color:#debb79}
.top img{width:44px;height:44px;border-radius:50%%;vertical-align:middle;margin-right:12px}
.foot{position:absolute;bottom:30px;left:56px;right:56px;display:flex;justify-content:space-between;font-size:18px;color:#f7ecd9;opacity:.7}
.wrap{position:absolute;top:120px;left:56px;right:56px;bottom:90px;display:flex;flex-direction:column;justify-content:center}
h1{font-size:64px;line-height:1.12}
h2{font-size:50px;line-height:1.15;margin-bottom:34px}
ul{list-style:none;padding:0;display:grid;gap:18px}
li{font-size:34px;line-height:1.3;background:rgba(255,253,249,.08);border-left:6px solid #c59d58;border-radius:0 14px 14px 0;padding:16px 24px}
.big{font-size:44px;line-height:1.35;white-space:pre-line;background:rgba(255,253,249,.08);border-radius:20px;padding:34px 40px;border:2px solid rgba(222,187,121,.5)}
table{border-collapse:collapse;font-size:32px;width:100%%;background:#fffdf9;color:#1d1210;border-radius:14px;overflow:hidden}
th{background:#c59d58;color:#3a0204;text-align:left;padding:14px 22px}
td{padding:14px 22px;border-top:1px solid #ece3d6}
.pill{display:inline-block;border:2px solid rgba(222,187,121,.6);color:#debb79;border-radius:999px;padding:8px 22px;font-size:24px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:26px;align-self:flex-start}
.center{align-items:center;text-align:center}
""" % (W, H)


def slide_html(mod, seg_slide, logo_mark, logo_full):
    k = seg_slide["kind"]
    top = f'<div class="top"><span><img src="{logo_mark}">Scitylana Academy</span><span>Module {mod["id"]} / 8</span></div>'
    foot = f'<div class="foot"><span>Data Wey Talk</span><span>{SITE}</span></div>'
    if k == "title":
        body = (f'<div class="wrap"><span class="pill">Module {mod["id"]}</span>'
                f'<h1 class="slab gold">{E(mod["title"])}</h1>'
                f'<p style="font-size:30px;margin-top:28px;opacity:.9">Data analytics for Pidgin · free from Scitylana</p></div>')
    elif k == "bullets":
        items = "".join(f"<li>{E(i)}</li>" for i in seg_slide["items"])
        body = f'<div class="wrap"><h2 class="slab gold">{E(seg_slide["heading"])}</h2><ul>{items}</ul></div>'
    elif k == "big":
        body = f'<div class="wrap"><h2 class="slab gold">{E(seg_slide["heading"])}</h2><div class="big">{E(seg_slide["text"])}</div></div>'
    elif k == "table":
        th = "".join(f"<th>{E(c)}</th>" for c in seg_slide["cols"])
        tr = "".join("<tr>" + "".join(f"<td>{E(c)}</td>" for c in r) + "</tr>" for r in seg_slide["rows"])
        body = f'<div class="wrap"><h2 class="slab gold">{E(seg_slide["heading"])}</h2><table><tr>{th}</tr>{tr}</table></div>'
    elif k == "outro":
        body = (f'<div class="wrap center"><img src="{logo_full}" style="width:230px;border-radius:20px;margin-bottom:30px">'
                f'<h2 class="slab gold" style="margin-bottom:16px">{E(seg_slide["text"])}</h2>'
                f'<p style="font-size:28px;opacity:.9">{SITE} · scitylanaltd@gmail.com</p></div>')
        top = ""
    else:
        raise ValueError(k)
    return f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{top}{body}{foot}</body></html>'


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"command failed: {' '.join(map(str, cmd[:4]))}…\n{r.stderr[-1500:]}")
    return r


def audio_duration(path):
    out = run(["afinfo", str(path)]).stdout
    m = re.search(r"estimated duration:\s*([\d.]+)", out)
    return float(m.group(1))


def azure_text(text):
    # "₦15,700" → "15,700 naira" so it is read the Nigerian way; everything else stays real Pidgin.
    t = re.sub(r"₦\s?([\d,]+(?:\.\d+)?)", r"\1 naira", text).replace("₦", " naira ")
    return html.escape(t, quote=False)


def azure_tts(text, out_wav):
    ssml = (f"<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-NG'>"
            f"<voice name='{AZ_VOICE}'><prosody rate='{AZ_RATE}'>{azure_text(text)}</prosody></voice></speak>")
    CACHE.mkdir(exist_ok=True)
    cached = CACHE / (hashlib.sha256((AZ_VOICE + AZ_RATE + ssml).encode()).hexdigest()[:24] + ".wav")
    if not cached.exists():
        req = urllib.request.Request(
            f"https://{AZ_REGION}.tts.speech.microsoft.com/cognitiveservices/v1", data=ssml.encode("utf-8"), method="POST",
            headers={"Ocp-Apim-Subscription-Key": AZ_KEY, "Content-Type": "application/ssml+xml",
                     "X-Microsoft-OutputFormat": "riff-24khz-16bit-mono-pcm", "User-Agent": "data-wey-talk-video-builder"})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                cached.write_bytes(r.read())
        except urllib.error.HTTPError as e:
            sys.exit(f"Azure speech error {e.code}: {e.read()[:300]!r} — check the key and region in video/.azure-key")
    shutil.copy(cached, out_wav)


def edge_available():
    try:
        import edge_tts  # noqa: F401
        return True
    except ImportError:
        return False


EDGE = edge_available() and os.environ.get("NO_EDGE") != "1"


def edge_tts_say(text, out_mp3):
    import asyncio, edge_tts
    plain = re.sub(r"₦\s?([\d,]+(?:\.\d+)?)", r"\1 naira", text).replace("₦", " naira ")
    CACHE.mkdir(exist_ok=True)
    cached = CACHE / ("edge-" + hashlib.sha256((AZ_VOICE + AZ_RATE + plain).encode()).hexdigest()[:24] + ".mp3")
    if not cached.exists():
        for attempt in range(3):
            try:
                asyncio.run(edge_tts.Communicate(plain, AZ_VOICE, rate=AZ_RATE).save(str(cached)))
                break
            except Exception as e:  # network hiccup: try again
                if attempt == 2:
                    sys.exit(f"edge-tts failed: {e}")
    shutil.copy(cached, out_mp3)


def recording_for(n, k):
    for ext in ("mp3", "m4a", "wav", "aac", "ogg"):
        f = REC / f"module-{n}-slide-{k}.{ext}"
        if f.exists():
            return f
    return None


def say_text(text):
    # Help the English voice with a few Pidgin/Naira spellings. Captions keep the real Pidgin.
    t = text.replace("₦", " naira ").replace("di ", "dee ").replace("Di ", "Dee ")
    t = re.sub(r"\bdey\b", "day", t)
    t = re.sub(r"\bwetin\b", "wey-tin", t, flags=re.I)
    t = re.sub(r"\bsabi\b", "sah-bee", t)
    return t


def ts(sec):
    h, rem = divmod(sec, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h):02d}:{int(m):02d}:{s:06.3f}"


def build(mod, tmp):
    n = f'{mod["id"]:02d}'
    work = tmp / n
    work.mkdir()
    mark = (ROOT / "assets/scitylana-mark.jpg").as_uri()
    full = (ROOT / "assets/scitylana-logo.jpg").as_uri()
    parts, cues, t, sources = [], [], 0.0, []
    PAD = 0.7
    for i, seg in enumerate(mod["segments"]):
        hp, png, mp4 = work / f"s{i}.html", work / f"s{i}.png", work / f"s{i}.mp4"
        hp.write_text(slide_html(mod, seg["slide"], mark, full), encoding="utf-8")
        run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--window-size={W},{H}",
             "--virtual-time-budget=2500", f"--screenshot={png}", hp.as_uri()])
        rec = recording_for(n, i + 1)
        if rec:
            aiff = rec; sources.append("recording")
        elif AZ_KEY:
            aiff = work / f"s{i}.wav"; azure_tts(seg["say"], aiff); sources.append("azure")
        elif EDGE:
            aiff = work / f"s{i}.mp3"; edge_tts_say(seg["say"], aiff); sources.append("edge")
        else:
            aiff = work / f"s{i}.aiff"; run(["say", "-v", VOICE, "-r", RATE, "-o", str(aiff), say_text(seg["say"])]); sources.append("mac")
        d = audio_duration(aiff) + PAD
        run([FF, "-y", "-loop", "1", "-framerate", "12", "-i", str(png), "-i", str(aiff),
             "-af", f"apad=pad_dur={PAD}", "-t", f"{d:.3f}",
             "-c:v", "libx264", "-tune", "stillimage", "-preset", "medium", "-crf", "28", "-pix_fmt", "yuv420p", "-r", "12",
             "-c:a", "aac", "-b:a", "64k", "-ar", "44100", "-ac", "1", str(mp4)])
        parts.append(mp4)
        # captions: split into sentences, time them by length
        sents = [s.strip() for s in re.split(r"(?<=[.!?])\s+", seg["say"]) if s.strip()]
        total = sum(len(s) for s in sents)
        speak = d - PAD
        for s in sents:
            dur = speak * len(s) / total
            cues.append((t, t + dur, s))
            t += dur
        t += PAD
        if i == 0:
            run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "70", str(png), "--out", str(VID / f"module-{n}.jpg")])
    lst = work / "list.txt"
    lst.write_text("".join(f"file '{p}'\n" for p in parts))
    run([FF, "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", "-movflags", "+faststart", str(VID / f"module-{n}.mp4")])
    (VID / f"module-{n}.vtt").write_text(
        "WEBVTT\n\n" + "\n".join(f"{ts(a)} --> {ts(b)}\n{s}\n" for a, b, s in cues), encoding="utf-8")
    # human recording script
    md = [f"# Module {mod['id']}: {mod['title']}", "",
          "_Recording script for Scitylana Academy. Read naturally in your own Pidgin — change words if e no sound right._", "",
          f"_Record each slide as its own file and name it `module-{n}-slide-1.mp3`, `module-{n}-slide-2.mp3` … "
          "Put the files in `video/recordings/` and rebuild — your voice replaces the AI voice for those slides._", ""]
    for i, seg in enumerate(mod["segments"], 1):
        sl = seg["slide"]
        label = sl.get("heading") or sl.get("text") or mod["title"]
        md += [f"## Slide {i} — {label}", "", seg["say"], ""]
    (VID / "scripts").mkdir(exist_ok=True)
    (VID / "scripts" / f"module-{n}.md").write_text("\n".join(md), encoding="utf-8")
    size = (VID / f"module-{n}.mp4").stat().st_size / 1e6
    used = ", ".join(f"{sources.count(k)} {k}" for k in ("recording", "azure", "edge", "mac") if k in sources)
    print(f"module {n}: {t:.0f}s, {size:.1f} MB  (voice: {used})")


def write_versions():
    # A fingerprint per video, so browsers fetch a rebuilt video instead of an old saved copy.
    v = {}
    for f in sorted(VID.glob("module-*.mp4")):
        v[int(f.stem.split("-")[1])] = hashlib.sha256(f.read_bytes()).hexdigest()[:10]
    (VID / "versions.js").write_text("// Written by build_videos.py — do not edit by hand.\nwindow.DWT_VIDEO_V = "
                                     + json.dumps(v) + ";\n", encoding="utf-8")


def main():
    mods = json.loads((VID / "scripts.json").read_text(encoding="utf-8"))
    want = {int(a) for a in sys.argv[1:]}
    with tempfile.TemporaryDirectory() as tmp:
        for m in mods:
            if not want or m["id"] in want:
                build(m, Path(tmp))
    write_versions()


if __name__ == "__main__":
    main()
