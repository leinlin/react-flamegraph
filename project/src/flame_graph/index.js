import React from "react";
import { render } from "react-dom";
import FlameGraph from "./FlameGraph";
import { flameData } from "./../flame_graph/flamedata.json";

render(
  <FlameGraph {...{ flameData: flameData }} />,
  document.getElementById("root")
);
