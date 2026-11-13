# Data Wey Talk

Data analytics wey dey talk Pidgin. Upload a CSV (from Excel or Google Sheets) and see totals, averages, charts and plain-language insights. Three languages: Pidgin (West Africa), English and Kiswahili (East Africa) — all Swahili text lives in `sw.js`; a missing word falls back to English.

Everything runs in the browser — no file is ever uploaded.

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000 (add `?sample` to load the demo data).
