import React, { useContext } from "react";
import { Button } from "./Button.jsx";
import { contextGlobal } from "../App.jsx";

export function Buttons() {
  const { btnGood, btnNeutral, btnBad, text } = useContext(contextGlobal);
  return (
    <div>
      <Button hanldlerEvent={btnGood} text={text[0]} />
      <Button hanldlerEvent={btnNeutral} text={text[1]} />
      <Button hanldlerEvent={btnBad} text={text[2]} />
    </div>
  );
}
