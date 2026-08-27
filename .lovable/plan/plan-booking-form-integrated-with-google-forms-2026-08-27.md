# Plan: Booking Form Integrated with Google Forms

## Goal
Add a "Book a Cleaning" section to the Luna Clean landing page with a fully branded, custom-styled booking form. Submissions go straight into a Google Form you own, so every booking lands in your Google account (and the linked Google Sheet, if you attach one).

## What you'll need to do first (Google side)
1. Go to forms.google.com and create a new form, e.g. "Luna Clean — Booking Request".
2. Add a **Short answer** (or **Paragraph**) question for each field below — one question per field:
   - Full name
   - Phone number
   - Email
   - Service address (street, in Maple Leaf / Seattle)
   - Bin types to clean (checkboxes or short answer: trash / recycling / compost)
   - Number of bins
   - Preferred date & time window
   - Cleaning frequency (one-time / weekly / monthly)
   - Bin location / access instructions on cleaning day (paragraph)
   - Permission to post before & after photos on social media (yes/no)
   - Notes / anything else (paragraph)
3. Click the three-dot menu → **Get pre-filled link**, type a word into each field, click **Get link**, and paste that link to me in chat. I only need it once to read the field IDs.

## What I'll build (site side)
1. **New "Book a Cleaning" section** on the landing page (between "How it works" / service area and the contact CTA), plus a header nav link and "Get a Quote" buttons scrolling to it.
2. **Custom booking form** styled with the Luna Clean navy/lime brand — not a Google-looking embed:
   - Name, phone, email, address
   - Bin types (trash / recycling / compost checkboxes) + number of bins
   - Preferred date & time window
   - Frequency (one-time / weekly / monthly)
   - Access instructions ("where will the bins be on cleaning day?")
   - Photo-permission toggle for before/after photos on your Facebook/social media
   - Notes field
3. **Validation** — required fields (name, phone, address), phone/email format checks, friendly error messages.
4. **Submission** — the form POSTs each answer to your Google Form's `formResponse` endpoint behind the scenes, then shows a success message ("We'll confirm your booking within 24 hours — or call (714) 912-3682") and resets. An error state appears if the submission fails.
5. Keep the phone/email CTAs as a fallback so customers can still reach you directly.

## Technical details
- Changes limited to `src/routes/index.tsx` (new section + form component, possibly split into `src/components/BookingForm.tsx`) and nav anchors.
- Google Forms accepts cross-origin POSTs; the field names (`entry.XXXXXXXX`) come from your pre-filled link.
- No backend, database, or new accounts needed.
- I'll test the end-to-end submission with a test entry you can delete from your Google Form responses.

## One thing to note
Until you paste the pre-filled Google Form link, I can build the full form UI with placeholder wiring; the final step is plugging in your real form ID and field IDs from that link.
