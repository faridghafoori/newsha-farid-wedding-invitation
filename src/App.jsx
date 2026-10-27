import { useState } from "react";
import Envelope from "./components/Envelope.jsx";
import Invitation from "./components/Invitation.jsx";

function initiallyOpen() {
  return new URLSearchParams(window.location.search).get("open") === "1";
}

export default function App() {
  const [opened, setOpened] = useState(initiallyOpen);

  function openInvitation() {
    const url = new URL(window.location.href);
    url.searchParams.set("open", "1");
    window.history.pushState({}, "", url);
    setOpened(true);
    window.dispatchEvent(new Event("invite-open"));
  }

  return opened ? <Invitation /> : <Envelope onOpen={openInvitation} />;
}
