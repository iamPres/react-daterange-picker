import React, { Fragment } from "react";
import {
  Button,
  Box,
  Typography,
  GridList,
  GridListTile,
  TextField,
  Grid,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ReactList from "react-list";
import "./Styling.css";

interface Dates {
  [x: string]: string;
}

interface State {
  setSelected(x): void;
  setDates(y): void;
  setBoxClass(z): void;
  setPropertySelected(a): void;
  setDateTextContents(c): void;
  setDateError(f): void;
  setDaysInMonth(g): void;
  getData(h): void;
  boxClass: string;
  selected: number[];
  index: number;
  dates: Dates[];
  propertySelected: number;
  dateTextContents: string[];
  dateError: boolean[];
  daysInMonth: number[];
}

export function Body(props: State) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  const day = ["S", "M", "T", "W", "T", "F", "S"];

  const getVariant = (item) => {
    if (item == props.selected[props.index]) {
      return "contained";
    } else {
      return "outlined";
    }
  };

  function toggleBox() {
    if (props.boxClass == "box") {
      props.setBoxClass("box-wide");
    } else {
      props.setBoxClass("box");
    }
  }

  function updateTransition(index) {
    if (props.propertySelected == -1) {
      props.setPropertySelected(index);
      props.setBoxClass("box-wide");
    } else if (index == props.propertySelected) {
      toggleBox();
    } else if (
      index != props.propertySelected &&
      props.boxClass == "box-wide"
    ) {
      props.setPropertySelected(index);
    } else if (index != props.propertySelected && props.boxClass == "box") {
      props.setPropertySelected(index);
      toggleBox();
    }
  }

  const handleClick = (key, value) => {
    var dateContent = props.dateTextContents;
    var words = dateContent[props.index].split(" ");
    if (key == "day") {
      resetDate("day", value);
      words[0] = value + 1;
    } else if (key == "month") {
      toggleBox();
      resetDate("month", value);
      words[1] = value;
    } else if (key == "year") {
      toggleBox();
      resetDate("year", value);
      words[2] = value;
    }
    dateContent[props.index] =
      String(words[0]) + " " + String(words[1]) + " " + String(words[2]);
    props.setDateTextContents([dateContent[0], dateContent[1]]);
  };

  function handleTextDate(event) {
    var dateContent = props.dateTextContents;
    dateContent[props.index] = event;
    props.setDateTextContents([dateContent[0], dateContent[1]]);

    var errorState = props.dateError;
    var words = event.split(" ");
    words[0] = parseInt(words[0]);
    words[2] = parseInt(words[2]);

    if (
      words[0] > -1 &&
      words[0] <= 31 &&
      month.includes(words[1]) &&
      words[2] < 2100 &&
      words[2] > 0
    ) {
      resetDate("day", words[0] - 1);
      resetDate("month", words[1]);
      resetDate("year", words[2]);
      errorState[props.index] = false;
    } else {
      errorState[props.index] = true;
    }
    props.setDateError(errorState);
  }

  function resetDate(key, value) {
    var date = props.dates;
    var selected = props.selected;
    var daysInMonthContent = props.daysInMonth;

    if (key == "day") {
      selected[props.index] = value;
      props.setSelected(selected);
      value += 1;
    } else if (key == "month") {
      date[props.index][key] = month[value];
    }
    date[props.index][key] = value;
    props.setDates(date);

    daysInMonthContent[props.index] = new Date(
      parseInt(date[props.index]["year"]),
      month.indexOf(date[props.index]["month"]) + 1,
      0
    ).getDate();
    props.setDaysInMonth([daysInMonthContent[0], daysInMonthContent[1]]);
    props.getData(props.dates)
  }

  function renderItem(index) {
    var key = "month";
    if (props.propertySelected == 1) {
      key = "year";
    }
    return (
      <Button
        onClick={() => handleClick(key, index)}
        variant="text"
        color="primary"
        size="large"
        style={{
          maxWidth: "100px",
          maxHeight: "30px",
          minWidth: "100px",
          minHeight: "30px",
        }}
      >
        {index}
      </Button>
    );
  }

  function renderScroll() {
    if (props.boxClass == "box-wide") {
      if (props.propertySelected == 1) {
        return (
          <Box mt={10}>
            <div style={{ overflow: "auto", maxHeight: 200, maxWidth: 120 }}>
              {" "}
              <ReactList
                itemRenderer={(index) => renderItem(index + 2000)}
                length={100}
                type="uniform"
              />
            </div>
          </Box>
        );
      } else {
        return (
          <Box mt={10}>
            <div style={{ overflow: "auto", maxHeight: 200, maxWidth: 120 }}>
              {" "}
              <ReactList
                itemRenderer={(index) => renderItem(month[index])}
                length={12}
                type="uniform"
              />
            </div>
          </Box>
        );
      }
    } else {
      return <div />;
    }
  }

  function getTextTitle() {
    if (props.index == 1) {
      return "End Date";
    } else {
      return "Start Date";
    }
  }

  return (
    <Box className={props.boxClass}>
      <Box className="box-container">
        <Box className="box-header" mt={2} mb={2}>
          <Box mt={2}>
            <Button
              onClick={() => updateTransition(0)}
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                minWidth: "30px",
                minHeight: "30px",
              }}
              size="small"
              variant="text"
            >
              <ArrowForwardIosIcon />
            </Button>
          </Box>
          <Box mt={2} mr={1}>
            <Typography color="textPrimary" variant="h5">
              {props.dates[props.index]["month"]}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography color="secondary" variant="h5">
              {props.dates[props.index]["year"]}
            </Typography>
          </Box>
          <Box ml={1} mt={2}>
            <Button
              onClick={() => updateTransition(1)}
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                minWidth: "30px",
                minHeight: "30px",
              }}
              size="small"
              color="secondary"
              variant="text"
            >
              <ArrowBackIosIcon />
            </Button>
          </Box>
        </Box>
        <Box ml={4}>
          <Grid
            container
            justify="flex-start"
            spacing={1}
            style={{
              maxWidth: "300px",
              maxHeight: "200px",
              minWidth: "300px",
              minHeight: "200px",
            }}
          >
            {[...Array(7).keys()].map((item) => (
              <Grid item>
                <Button
                  disableRipple={true}
                  color="secondary"
                  size="small"
                  variant="text"
                  style={{
                    maxWidth: "30px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }}
                >
                  {day[item]}
                </Button>
              </Grid>
            ))}
            {[...Array(props.daysInMonth[props.index]).keys()].map((item) => (
              <Grid key={item} item>
                <Button
                  onClick={() => handleClick("day", item)}
                  style={{
                    maxWidth: "30px",
                    maxHeight: "30px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }}
                  size="small"
                  color="primary"
                  variant={getVariant(item)}
                  disableRipple
                >
                  {item + 1}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={7}>
          <TextField
            error={props.dateError[props.index]}
            fullWidth={true}
            value={props.dateTextContents[props.index]}
            size="small"
            id="outlined-basic"
            label={getTextTitle()}
            variant="outlined"
            onChange={(event) => handleTextDate(event.target.value)}
          />
        </Box>
      </Box>
      {renderScroll()}
    </Box>
  );
}
