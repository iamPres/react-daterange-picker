import React from "react";
import { Button, Box, Typography, FormGroup, FormControlLabel, Switch, TextField, Menu, MenuItem } from '@material-ui/core';

interface Inputs {
  refreshIntervalEnabled: boolean;
  setRefreshIntervalEnabled(x): void;
  menuClass: string;
  setAnchorEl(x): void;
  anchorEl: any;
  refreshIntervalUnits: string;
  setRefreshIntervalUnits(x): void;
  refreshInterval: number;
  setRefreshInterval(x): void;
  setTimerRunning(x): void;
  timerRunning: boolean;
  setMenuError(x): void;
  menuError: boolean;
}

export function MenuView(Props: Inputs) {

    function applyChanges() {
      Props.setTimerRunning(true)
    }

    function toggleSwitch() {
      if (Props.refreshIntervalEnabled) {
        Props.setRefreshIntervalEnabled(false)
      } else {
        Props.setRefreshIntervalEnabled(true)
      }
    }

    function handleTextChange(event) {
        if (String(parseFloat(event.target.value)) == "NaN") {
          Props.setMenuError(true)
        } else {
          Props.setRefreshInterval(parseFloat(event.target.value))
          Props.setMenuError(false)
        }

    }

    function handleClick(event) {
      Props.setAnchorEl(event.currentTarget)
    }

    function handleClose(item) {
      Props.setAnchorEl(null);
      Props.setRefreshIntervalUnits(item);
    }

    function setDefaultValue() {
      if(Props.refreshInterval != -1) {
        return Props.refreshInterval
      } else {
        return ""
      }
    }

    return (
      <Box mt={2} className={Props.menuClass}>
        <Box mt={2} ml={2}>
          <FormGroup>
            <FormControlLabel control={<Switch color="primary" size="medium" checked={Props.refreshIntervalEnabled} onChange={() => toggleSwitch()} />} label="Refresh Interval"/>
          </FormGroup>
        </Box>
        <Box ml={2} mt={1} display="flex" flexDirection="row" alignItems="center">
          <TextField error={Props.menuError} helperText={Props.menuError} onChange={(event) => handleTextChange(event)}size="small" defaultValue={setDefaultValue()} disabled={!Props.refreshIntervalEnabled} id="outlined-basic" label="Refresh Interval" variant="outlined" />
          <Button disabled={!Props.refreshIntervalEnabled} style={{maxHeight: '40px', minHeight: '40px'}} aria-controls="simple-menu" variant="outlined" color="primary" aria-haspopup="true" onClick={(event) => handleClick(event)}>{Props.refreshIntervalUnits}</Button>
          <Menu
            id="simple-menu"
            anchorEl={Props.anchorEl}
            keepMounted
            open={Boolean(Props.anchorEl)}
            onClose={() => handleClose(Props.refreshIntervalUnits)}
          >
            <MenuItem onClick={() => handleClose('Seconds')}>Seconds</MenuItem>
            <MenuItem onClick={() => handleClose('Minutes')}>Minutes</MenuItem>
            <MenuItem onClick={() => handleClose('Hours')}>Hours</MenuItem>
          </Menu>
        </Box>
        <Box mt={1} ml={2} className="timer-buttons">
          <Box>
            <Button disabled={!Props.refreshIntervalEnabled} style={{maxHeight: '40px', minHeight: '40px', maxWidth: '80px', minWidth: '80px'}} aria-controls="simple-menu" variant="contained" color="primary" aria-haspopup="true" onClick={() => applyChanges()}>Apply</Button>
          </Box>
          <Box ml={1}>
            <Button disabled={!Props.timerRunning} style={{maxHeight: '40px', minHeight: '40px', maxWidth: '80px', minWidth: '80px'}} variant="contained" color="primary" onClick={() => Props.setTimerRunning(false)}>Stop</Button>
          </Box>
        </Box>
      </Box>
    );
}
