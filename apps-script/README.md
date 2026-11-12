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
