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

## Quiz prize (one winner a month)

The **first** person each month to score above 80% (9 or 10 out of 10) wins. It's automatic:

- Every qualifying claim is saved in the **Quiz Entries** tab. The winner's row says **WINNER**.
- The winner is also added to the **Winners** tab, and you get an **email** straight away.
- Once a month has a winner, the website tells everyone else the prize is gone until the 1st of next month.
- Months follow Nigeria time (Africa/Lagos).

**After updating `Code.gs`**: paste the new code, Save, then
**Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. The URL stays the same.
Google will ask for one extra permission (sending email). Allow it.

**When you get the winner email:** send their $5 voucher / gift card by email or WhatsApp, then write "Yes" in **Prize sent?** in the Winners tab.
If the winner doesn't reply within 7 days, the rules say the prize goes to the next qualifying person. That's the next row for that month in **Quiz Entries**.
