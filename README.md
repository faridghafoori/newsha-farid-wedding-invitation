# Newsha & Farid

**نیوشا و فرید**

A wedding invitation that opens like a letter. Guests lift the envelope, the card unfolds, and the evening of **Saturday, 21 November 2026** is waiting inside — in English or Persian.

[Open in English](https://newsha-farid-wedding-invitation.vercel.app/en) · [باز کردن به فارسی](https://newsha-farid-wedding-invitation.vercel.app/fa)

---

## What guests see

The page is one long card, set in garden greens and a deep wine red, with floral sprigs along the paper.

1. **Envelope.** A sealed invitation. Opening it starts a gentle scroll down the card, with music if the guest allows it.
2. **Names.** Newsha and Farid, with a monogram wreath and a short invitation line.
3. **Gallery.** Three photographs. They advance on their own, and any photo opens larger.
4. **Reception.** The date, a live countdown, a calendar page, and a link that adds the evening to Google Calendar. Persian shows the date in the Jalali calendar.
5. **RSVP.** A name and a yes or no. The answer is sent to the Google Apps Script in `src/api/config.js`.
6. **Venue.** Sadra Garden Hall, with an embedded map and directions in Google Maps and Neshan.
7. **Schedule.** From welcome through the last dance.

English reads left to right. Persian reads right to left, including the gallery controls. The language switch sits at the top of the page and keeps the choice in the address:

| | |
| --- | --- |
| English | `/en` |
| فارسی | `/fa` |

Opening the site root lands on English, then the address becomes `/en`.

## Run it locally

```bash
npm install
npm run dev
```

The dev server starts at [http://localhost:5173](http://localhost:5173). Use `/en` or `/fa` the same way as the live site.

```bash
npm run build    # write the production site to dist/
npm run preview  # serve that build locally
```

## Change the wedding

Almost everything a guest reads lives in two files.

| File | What to edit |
| --- | --- |
| `src/data.js` | Date, time, address, photos, and the evening schedule |
| `src/i18n/copy.js` | Every English and Persian sentence, including the page title |

Photos belong in `public/photos/` and are listed in `src/data.js`. Music is `public/music/music1.mp3`. Flowers, icons, and paper textures are in `public/theme/`.

Dress code and the guestbook are already built. They are left out of the card in `src/components/Invitation.jsx`. Uncomment `DressCode` or `Guestbook` there to bring either section back.

## Deploy

The site is a Vite and React single-page app on Vercel. There is no server route for `/en` or `/fa` — the browser chooses the language after `index.html` loads. `vercel.json` sends every path to that file, while images, fonts, and music are still served as files.

Push to `main` and Vercel rebuilds the invitation.
