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

### Posters edit their own posts (PIN)

Once you've approved a post, the poster can change or remove it from **Find Distributors → ✏️ My posts**.
They need the **same email and phone** they posted with, plus their own **PIN (4 or 6 digits, their choice)**:
- New posters create the PIN on the posting form.
- Posters who already have posts but no PIN get a 6-digit code by email first (so nobody else can grab their account).
- **Forgot or want to change it?** "Forgot or want to change your PIN?" emails a code (valid 30 minutes).
- 5 wrong PINs lock editing for 30 minutes. 5 wrong email codes cancel the code.

PINs live in the **Poster PINs** tab only as a scrambled hash: nobody, including you, can read them.
To help someone who is stuck, delete their row in Poster PINs; they can then set a new PIN with an email code.
Edits go live straight away and **you get an email for every edit**. The old "Edit key" column is no longer used.

### Verified badge, reports and "Looking for a product"

- **✔ Verified:** after you've called a poster and are happy they're genuine, type **Yes** in the **Verified? (type Yes)** column.
  Their card shows "✔ Verified by Scitylana". If they later change their WhatsApp number, the badge is removed automatically and you get an email.
- **Reports:** anyone signed up can tap **🚩 Report** on a post. Reports land in the **Reports** tab and you get an email.
  To hide a post, clear its **Approved?** cell. Write anything in **Done?** to keep track.
- **Looking for a product:** shops and traders can post what they want to buy (Poster type = *Buyer looking for a product*).
  Approve them like any other post. Suppliers reply with the "I can supply this" WhatsApp button.

## Visitor counting (GoatCounter)

1. Make a free account at **https://www.goatcounter.com/signup**. The "code" you choose becomes your address, e.g. `datawey` → `datawey.goatcounter.com`.
2. Put the code in [`../config.js`](../config.js): `goatcounter: "datawey",`
3. Sync. Visits and button uses (signup, game-results, quiz-done, share-game, share-quiz, share-product, contact, report, post-…) appear in your GoatCounter dashboard.
