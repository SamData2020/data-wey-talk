# Data Wey Talk

Data analytics wey dey talk Pidgin. Upload a CSV (from Excel or Google Sheets) and see totals, averages, charts and plain-language insights. Nine languages, picked from the 🌐 menu: Pidgin, English, Français, Kiswahili, العربية (right-to-left), Hausa, Yorùbá, Igbo and isiZulu. Each extra language is one file in `lang/` (e.g. `lang/fr.js`); a missing word falls back to English. To add another: copy a file, translate the values, add a `<script>` line and an `<option>` in `index.html`.

Everything runs in the browser — no file is ever uploaded.

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000 (add `?sample` to load the demo data).
