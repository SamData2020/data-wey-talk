# Curriculum videos

Each of the 8 curriculum modules has a short video (about 1 minute).

The ones on the site now are **drafts**: slides plus a computer voice reading the Pidgin script, with Pidgin captions. They're meant to be replaced by a real Pidgin-speaking presenter.

## Recording the real version

1. Open the module's script in [`scripts/`](scripts/), e.g. `scripts/module-01.md`. Each "Slide" section is one short part.
2. Record on a phone, holding it **sideways** (landscape), in a quiet room with your face lit from the front.
   - **Easiest:** record yourself talking to camera.
   - **Or:** play the draft video with the sound off and record your voice over it, so the slides stay in.
   - Read naturally. If a line doesn't sound like real Pidgin, change it.
3. Upload the video to the Scitylana YouTube channel (public or "unlisted").
4. Copy the link and add it to [`../config.js`](../config.js):
   ```js
   videos: { 1: "https://youtu.be/XXXXXXXXXXX" },
   ```
   That module then shows the YouTube video in place of the draft. Sync to publish.

## Rebuilding the drafts

The drafts are generated from [`scripts.json`](scripts.json). After editing a script, rebuild that module:

```sh
pip install imageio-ffmpeg
python3 video/build_videos.py 3        # rebuild module 3 only
python3 video/build_videos.py          # rebuild all
```

This needs macOS (for the `say` voice) and Google Chrome (to draw the slides).
