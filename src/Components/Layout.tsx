import React, { useState } from 'react';
import { format, formatDistance, formatRelative, subDays, getMonth, getDay, getYear } from 'date-fns';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, Box } from '@material-ui/core';
import { Body } from './Body.tsx';
import { Menu } from './Menu.tsx'
import './Styling.css';

export function Layout() {
  const [start, setStart] = useState(true);
  const [tabSelected, setTab] = useState(-1);
  const [propertySelected, setPropertySelected] = useState(-1);
  const [daySelected, setSelected] = useState([0,0]);
  const [menuClass, setMenuClass] = useState("menu-closed");
  const [boxClass, setBoxClass] = useState("box-closed");
  const [refreshInterval, setRefreshInterval] = useState(-1);
  const [refreshIntervalEnabled, setRefreshIntervalEnabled] = useState(false);
  const currentDate = {day: 11, month: 'August', year: 1965};
  const [dates, setDates] = useState([currentDate, currentDate]);

  const toggleDropdown = (num) => {
    if (num != 0 && tabSelected != num) {
      if (boxClass == "box-closed") {
        setBoxClass("box")
        setMenuClass("menu-closed")
      }
      setTab(num);
    } else if (tabSelected == num){
      if (boxClass == "box-closed") {
        setBoxClass("box")
        setMenuClass("menu-closed")
      }
      else {
        setBoxClass("box-closed")
      }
    }
    if (num == 0) {
      if (menuClass == "menu-closed") {
        setMenuClass("menu")
        setBoxClass("box-closed")
        setTab(num);
      } else {
        setMenuClass("menu-closed")
      }
    }
  }

  function loadDates(dates) {
    return JSON.parse(JSON.stringify(dates, null, 2));
  }

  function initDates() {
    if (start) {
      setStart(false)
      setSelected([dates[0]['day']-1, dates[1]['day']-1])
    }
  }

    return (
      <div className='layout'>
        <Tabs onSelect={index => toggleDropdown(index)}>
          <TabList className='header'>
            <Tab>
              <Button color='primary' variant='contained' className='header-button'>Menu</Button>
            </Tab>
            <Tab>
              <Box ml={2}>
                <Button onClick={() => initDates()} color='primary' variant='text' className='header-title'> {loadDates(dates)[0]['month']+' '+loadDates(dates)[0]['day']+' '+loadDates(dates)[0]['year']}</Button>
              </Box>
            </Tab>
            <span>&#10230;</span>
            <Tab>
              <Button onClick={() => initDates()} color='primary' variant='text' className='header-title2'>{loadDates(dates)[1]['month']+' '+loadDates(dates)[1]['day']+' '+loadDates(dates)[1]['year']}</Button>
            </Tab>
          </TabList>
          <TabPanel>
            <Menu refreshIntervalEnabled={refreshIntervalEnabled} setRefreshIntervalEnabled={setRefreshIntervalEnabled} menuClass={menuClass}/>
          </TabPanel>
          <TabPanel>
            <Body propertySelected={propertySelected} setPropertySelected={setPropertySelected} boxClass={boxClass} setBoxClass={setBoxClass} index={0} dates={loadDates(dates)} setDates={setDates} selected={daySelected} setSelected={setSelected}/>
          </TabPanel>
          <TabPanel>
            <Body propertySelected={propertySelected} setPropertySelected={setPropertySelected} boxClass={boxClass} setBoxClass={setBoxClass} index={1} dates={loadDates(dates)} setDates={setDates} selected={daySelected} setSelected={setSelected}/>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
