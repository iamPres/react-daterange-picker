# React Date Range Picker
react-daterange-picker can be used to pick a date range in react and specify a data refresh interval.
## Demo
![media](https://github.com/iamPres/react-daterange-picker/blob/new/media/readme-body-1.PNG)
![media](https://github.com/iamPres/react-daterange-picker/blob/new/media/readme-body-2.PNG)
![media](https://github.com/iamPres/react-daterange-picker/blob/new/media/readme-timer-1.PNG)
## Dependencies
 - install the [package.json](https://github.com/iamPres/react-daterange-picker/blob/master/package.json) dependencies with npm

## Example Usage
```
import React from "react";
import ReactDOM from "react-dom";
import DateRangePicker from "../src/index.tsx";

const app = document.getElementById("app");

function reset() {
  console.log("Reset!");
}

function getData(data) {
  console.log(data);
}

ReactDOM.render(
  <DateRangePicker
    resetFn={reset}
    getData={getData}
    dateFormatter={new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })}
  />,
  app
);

```

## Props
- getData(data)
  - Called every time the user chooses a date, takes a Date() object
- resetFn()
  - Called when the refresh timer resets
- dateFormatter (optional)
  - Takes a Intl.DateTimeFormat object used to format displayed dates
## Customization
 - Utilizes materialUI elements
 - Compatible with any materialUI theme
 - Add custom date formatters (11/2/2000 vs November 2, 2000)
