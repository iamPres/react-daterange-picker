import React, { useState } from 'react';
import { format, formatDistance, formatRelative, subDays, getMonth, getDay, getYear } from 'date-fns';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, Box } from '@material-ui/core';
import { Body } from './Body.tsx';
import Menu from './Menu.tsx';
import './Card.css';

export function Layout() {
  const [tab, setTab] = useState(-1);
  const [selected, setSelected] = useState([0,0]);
  const [is_in, setIn] = useState(false);
  const [refresh_interval, setRefreshInterval] = useState(null);
  const [dates, setDates] = useState([{day: 11, month: 'August', year: 1965}, {day: 26, month: 'December', year: 1945}]);

  const toggleDropdown = (num) => {
    if (tab != num) {
      if (is_in == false) {
        setIn(true);
      }
      setTab(num);
    } else {
      if (is_in == false) {
        setIn(true);
      }
      else {
        setIn(false);
      }
    }
  }

  function loadDates(dates) {
    return JSON.parse(JSON.stringify(dates, null, 2));
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
                <Button color='primary' variant='text' className='header-title'> {loadDates(dates)[0]['month']+' '+loadDates(dates)[0]['day']+' '+loadDates(dates)[0]['year']}</Button>
              </Box>
            </Tab>
            <span>&#10230;</span>
            <Tab>
              <Button color='primary' variant='text' className='header-title2'>{loadDates(dates)[1]['month']+' '+loadDates(dates)[1]['day']+' '+loadDates(dates)[1]['year']}</Button>
            </Tab>
          </TabList>
          <TabPanel>
            <CSSTransition in={is_in} timeout={200} classNames='dropdown' unmountOnExit>
              <Menu />
            </CSSTransition>
          </TabPanel>
          <TabPanel>
            <CSSTransition in={is_in} timeout={200} classNames='dropdown' unmountOnExit>
              <Body index={0} dates={loadDates(dates)} setDates={setDates} selected={selected} setSelected={setSelected}/>
            </CSSTransition>
          </TabPanel>
          <TabPanel>
            <CSSTransition in={is_in} timeout={200} classNames='dropdown' unmountOnExit>
              <Body index={1} dates={loadDates(dates)} setDates={setDates} selected={selected} setSelected={setSelected}/>
            </CSSTransition>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
