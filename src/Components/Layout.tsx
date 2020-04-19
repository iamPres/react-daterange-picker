import React, { useState } from "react";
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  getMonth,
  getDay,
  getYear,
} from "date-fns";
import { CSSTransition } from "react-transition-group";
import Timer from "react-compound-timer";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Button, Box } from "@material-ui/core";
import { Body } from "./Body.tsx";
import { MenuView } from "./Menu.tsx";
import { TimerUI } from "./Timer.tsx";
import "./Styling.css";

interface Inputs {
  resetFn(): void;
  getData(x): void;
}

export function Layout(props: Inputs) {
  const [start, setStart] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [refreshIntervalUnits, setRefreshIntervalUnits] = useState("Minutes");
  const [tabSelected, setTabSelected] = useState(-1);
  const [propertySelected, setPropertySelected] = useState(-1);

  const [menuClass, setMenuClass] = useState("menu-closed");
  const [boxClass, setBoxClass] = useState("box-closed");
  const [refreshInterval, setRefreshInterval] = useState(-1);
  const [refreshIntervalEnabled, setRefreshIntervalEnabled] = useState(false);
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [daysInMonth, setDaysInMonth] = useState([
    new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate(),
    new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate(),
  ]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [menuError, setMenuError] = useState(false);
  const [dateError, setDateError] = useState([false, false]);
  const [dateTextContents, setDateTextContents] = useState([
    new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "numeric",
      day: "2-digit",
    }).format(new Date()),
    new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "numeric",
      day: "2-digit",
    }).format(new Date()),
  ]);

  const toggleDropdown = (num) => {
    if (num != 0 && tabSelected != num) {
      if (boxClass == "box-closed") {
        setBoxClass("box");
        setMenuClass("menu-closed");
      }
      setTabSelected(num);
    } else if (tabSelected == num) {
      if (boxClass == "box-closed") {
        setBoxClass("box");
        setMenuClass("menu-closed");
      } else {
        setBoxClass("box-closed");
      }
    }
    if (num == 0) {
      if (menuClass == "menu-closed") {
        setMenuClass("menu");
        setBoxClass("box-closed");
        setTabSelected(num);
      } else {
        setMenuClass("menu-closed");
      }
    }
  };

  function formatDateforDisplay(index) {
    var date = new Date(dates[index]);
    date.setDate(date.getDate());
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "numeric",
      day: "2-digit",
    }).format(date);
  }

  function getMenuObj() {
    return {
      menuError: menuError,
      setMenuError: setMenuError,
      timerRunning: timerRunning,
      setTimerRunning: setTimerRunning,
      refreshInterval: refreshInterval,
      setRefreshInterval: setRefreshInterval,
      anchorEl: anchorEl,
      setAnchorEl: setAnchorEl,
      refreshIntervalUnits: refreshIntervalUnits,
      setRefreshIntervalUnits: setRefreshIntervalUnits,
      refreshIntervalEnabled: refreshIntervalEnabled,
      setRefreshIntervalEnabled: setRefreshIntervalEnabled,
      menuClass: menuClass,
    };
  }

  function getBodyObj(index) {
    return {
      daysInMonth: daysInMonth,
      setDaysInMonth: setDaysInMonth,
      propertySelected: propertySelected,
      setPropertySelected: setPropertySelected,
      boxClass: boxClass,
      setBoxClass: setBoxClass,
      index: index,
      dates: dates,
      setDates: setDates,
      dateError: dateError,
      setDateError: setDateError,
      dateTextContents: dateTextContents,
      setDateTextContents: setDateTextContents,
      getData: props.getData,
      formatDateforDisplay: formatDateforDisplay,
    };
  }

  return (
    <div className="layout">
      <Tabs onSelect={(index) => toggleDropdown(index)}>
        <TabList className="header">
          <Tab>
            <Button
              color="primary"
              variant="contained"
              className="header-button"
            >
              <TimerUI
                timerRunning={timerRunning}
                refreshInterval={refreshInterval}
                refreshIntervalUnits={refreshIntervalUnits}
                resetFn={props.resetFn}
                setTimerRunning={setTimerRunning}
              />
            </Button>
          </Tab>
          <Tab>
            <Box ml={2}>
              <Button color="primary" variant="text" className="header-title">
                {formatDateforDisplay(0)}
              </Button>
            </Box>
          </Tab>
          <span>&#10230;</span>
          <Tab>
            <Button color="primary" variant="text" className="header-title2">
              {formatDateforDisplay(1)}
            </Button>
          </Tab>
        </TabList>
        <TabPanel>
          <MenuView {...getMenuObj()} />
        </TabPanel>
        <TabPanel>
          <Body {...getBodyObj(0)} />
        </TabPanel>
        <TabPanel>
          <Body {...getBodyObj(1)} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
