import { useState } from "react";
import Envelope from "./components/Envelope.jsx";
import Invitation from "./components/Invitation.jsx";
import LocaleToggle from "./components/LocaleToggle.jsx";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);

  function openInvitation() {
    setAutoScroll(true);
    setOpened(true);
  }

  return (
    <>
      <LocaleToggle />
      {opened ? <Invitation autoScroll={autoScroll} /> : <Envelope onOpen={openInvitation} />}
    </>
  );
}
