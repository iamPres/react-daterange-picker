import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "./Components/Layout.tsx";

const app = document.getElementById("app");

function reset() {
  console.log("Reset!");
}

function getData(data) {
  console.log(data);
}

ReactDOM.render(
  <Layout resetFn={() => reset()} getData={(data) => getData(data)} />,
  app
);
