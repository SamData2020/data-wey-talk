# Connect the survey to a Google Sheet (one-time, ~3 minutes)

1. Create a new Google Sheet, e.g. **"Data Wey Talk – Survey Responses"**.
2. In the Sheet: **Extensions → Apps Script**.
3. Delete what's there, paste everything from [`Code.gs`](Code.gs), click **Save**.
4. Click **Deploy → New deployment** → gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, approve the permissions (Advanced → Go to project → Allow).
6. Copy the **Web app URL** (ends in `/exec`).
7. Paste it into [`../config.js`](../config.js):
   ```js
   surveyEndpoint: "https://script.google.com/macros/s/XXXX/exec",
   ```
8. Commit and sync. New answers appear in the **Responses** tab.

If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## Quiz prize draw

Quiz entries (people who score above 80%) go to the **Quiz Entries** tab.

**After updating `Code.gs`** (e.g. when the quiz was added): paste the new code, Save, then
**Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. The URL stays the same.

**To draw winners** (last day of each month):
1. Open the Sheet and reload it. A **Data Wey Talk** menu appears in the toolbar.
2. Click **Data Wey Talk → 🎟️ Draw quiz winners…** and type the month (e.g. `2026-11`).
3. The first time, Google will ask you to approve. Allow it and run it again.
4. Winners are added to the **Winners** tab. Each person gets one chance, even if they entered several times.
5. Send each winner their airtime/data, then write "Yes" in the "Prize sent?" column.

Change the number of winners in **two** places: `WINNERS_PER_DRAW` in `Code.gs` and `quizPrize.winners` in `config.js`.
