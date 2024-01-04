import React from "react";
import { render } from "react-dom";
import FlameGraph from "./FlameGraph";
import { flameData } from "./flamedata.json";

render(
  <FlameGraph {...{ flameData: flameData }} />,
  document.getElementById("root")
);
