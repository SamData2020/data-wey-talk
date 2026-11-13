# Data Wey Talk

Data analytics wey dey talk Pidgin. Upload a CSV (from Excel or Google Sheets) and see totals, averages, charts and plain-language insights. Nine languages, picked from the 🌐 menu: Pidgin, English, Français, Kiswahili, العربية (right-to-left), Hausa, Yorùbá, Igbo and isiZulu. Each extra language is one file in `lang/` (e.g. `lang/fr.js`); a missing word falls back to English. To add another: copy a file, translate the values, add a `<script>` line and an `<option>` in `index.html`.

Everything runs in the browser — no file is ever uploaded.

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000 (add `?sample` to load the demo data).

## My Book (daily business book)

`book.js` (+ `lang/book-i18n.js`) is a phone-first daily book for one-person businesses — barbers, make-up artists, photographers, tailors, food sellers, POS agents and shops:

- **Record** a job or expense in seconds (ready buttons per trade), with deposits and balances.
- **Summary** for today / this week / this month, top services, best day; one tap sends the book to the analysis tool, or downloads it as CSV.
- **Who owes me** with a ready-written WhatsApp reminder.
- **Price calculator**: the minimum price that covers costs and pays the owner what they want.
- **Receipts / quotes** and a **Business Report Card** as shareable images (with "Made free with Data Wey Talk").

Everything stays in the visitor's browser (`localStorage`). `manifest.webmanifest` + `sw.js` let people install the site on their phone and use it offline.
