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

## Find Distributors (product posts with photos)

Distributors post products on the website. Each post lands in the **Distributors** tab and its photo in a Drive folder called
**Data Wey Talk – Product photos**. **Nothing shows on the website until you approve it.**

**One-time update:** paste the new `Code.gs`, Save, then **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**.
Google will ask for a new permission (Google Drive, to save the photos). Allow it. Until you do this, the site says "Posting opens very soon".

**When a post comes in** you get an email. Open the **Distributors** tab, look at the details and the photo link, then:
- to **publish** it, type **Yes** in the **Approved? (type Yes)** column. It appears on the site the next time someone opens the page;
- to **remove** it later, delete the Yes (or the whole row).

The email and account phone columns are private and never sent to the website.

### Posters edit their own posts

Once you've approved a post, the poster can change or remove it themselves from **Find Distributors → ✏️ My posts**.
To protect buyers, they must be signed up with the **same email and phone** they posted with, and enter the private
**edit code** emailed to them when they posted (the phone they posted from remembers it). Edits go live straight away,
and **you get an email for every edit** showing the old and new WhatsApp number and prices. If something looks wrong,
change it back in the Distributors tab or clear the "Approved?" cell. "Removed by poster" in that column means they took it down.
