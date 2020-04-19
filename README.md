# React Date Range Picker
react-daterange-picker can be used to pick a date range in react and specify a data refresh interval.
## Demo
![media](https://github.com/iamPres/react-daterange-picker/blob/new/media/readme-body-1.PNG)
![media](https://github.com/iamPres/react-daterange-picker/blob/new/media/readme-body-2.PNG)
![media](https://github.com/iamPres/react-daterange-picker/blob/new/media/readme-timer-1.PNG)
## Dependencies
 - install the [package.json](https://github.com/iamPres/react-daterange-picker/blob/master/package.json) dependencies with npm

## Example Usage
```import React from "react";
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
```

## Props
- getData()
  - Called every time the user chooses a date, takes a Date() object
- resetFn()
  - Called when the refresh timer resets
## Customization
 - Utilizes materialUI elements
 - Compatible with any materialUI theme
