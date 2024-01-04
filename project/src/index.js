import React from "react";
import { render } from "react-dom";
import FlameGraph from "./flame_graph/FlameGraph";
import packageInfo from "./flame_graph/flamedata.json";

render(
  <FlameGraph {...{ flameData: packageInfo.flameData }} />,
  document.getElementById("root")
);
