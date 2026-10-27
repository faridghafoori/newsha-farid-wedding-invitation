export const wedding = {
  bride: "Newsha",
  groom: "Farid",
  dateLabel: "November 21, 2026",
  weekday: "Saturday",
  day: 21,
  month: "November",
  monthIndex: 10,
  year: 2026,
  time: "19:00",
  target: "2026-11-21T19:00:00+03:30",
  venue: "Sadra Garden Hall",
  address:
    "استان تهران، شهرستان شهریار، بزرگراه باغستان، جاده رضی آباد، صدرا، باغ صدرا",
  dressCode: "Formal Party Attire",
  colors: ["#A8B89F", "#A9B8C8", "#791a3d", "#000000"],
  photos: [
    { src: "/photos/1.jpg", alt: "Wedding photo 1" },
    { src: "/photos/2.jpg", alt: "Wedding photo 2" },
    { src: "/photos/3.jpg", alt: "Wedding photo 3" },
  ],
  schedule: [
    { time: "18:00", title: "The moment we say “I do”" },
    { time: "19:00", title: "Welcome", icon: "/theme/letter.webp" },
    { time: "20:00", title: "First dance", icon: "/theme/ring.webp" },
    { time: "21:00", title: "Cake", icon: "/theme/cake.webp" },
    { time: "22:00", title: "Dinner and party" },
    { time: "00:00", title: "Last dance" },
  ],
};

const encodedAddress = encodeURIComponent(wedding.address);

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&z=15&output=embed&hl=en`;

export const calendarUrl =
  "https://www.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent("Farid & Newsha's Wedding")}` +
  "&dates=20261121T153000Z/20261121T173000Z" +
  "&ctz=Asia/Tehran" +
  `&details=${encodeURIComponent(
    `Join us to celebrate the wedding of Farid & Newsha at ${wedding.address}`,
  )}` +
  `&location=${encodedAddress}`;

export const wishIdeas = [
  "Wishing you a lifetime of love, laughter, and quiet mornings together.",
  "May your home be full of warmth, your days full of joy, and your hearts always side by side.",
  "Congratulations on finding each other. Today is only the beginning of a beautiful forever.",
  "So grateful to celebrate this day with you. May every year be sweeter than the last.",
  "With all our love on your wedding day. May the adventure ahead be as lovely as the two of you.",
];
