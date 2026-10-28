export const wedding = {
  day: 21,
  monthIndex: 10,
  year: 2026,
  time: "19:00",
  target: "2026-11-21T19:00:00+03:30",
  address:
    "استان تهران، شهرستان شهریار، بزرگراه باغستان، جاده رضی آباد، صدرا، باغ صدرا",
  colors: ["#A8B89F", "#A9B8C8", "#791a3d", "#000000"],
  photos: [
    { src: "/photos/1.jpg" },
    { src: "/photos/2.jpg" },
    { src: "/photos/3.jpg" },
  ],
  schedule: [
    { time: "18:00" },
    { time: "19:00", icon: "/theme/letter.webp" },
    { time: "20:00", icon: "/theme/ring.webp" },
    { time: "21:00", icon: "/theme/cake.webp" },
    { time: "22:00" },
    { time: "00:00" },
  ],
};

const encodedAddress = encodeURIComponent(wedding.address);

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
export const directionsUrlInNeshan = "https://nshn.ir/b2sbvbiVyxB_9z";

export function mapEmbedUrl(locale) {
  const language = locale === "fa" ? "fa" : "en";
  return `https://maps.google.com/maps?q=${encodedAddress}&z=15&output=embed&hl=${language}`;
}

export function calendarUrl({ title, details }) {
  return (
    "https://www.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}` +
    "&dates=20261121T153000Z/20261121T173000Z" +
    "&ctz=Asia/Tehran" +
    `&details=${encodeURIComponent(`${details} ${wedding.address}`)}` +
    `&location=${encodedAddress}`
  );
}
