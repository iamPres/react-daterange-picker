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
}

export function MenuView(Props: Inputs) {

    function toggleSwitch() {
      if (Props.refreshIntervalEnabled) {
        Props.setRefreshIntervalEnabled(false)
      } else {
        Props.setRefreshIntervalEnabled(true)
      }
    }

    function handleClick(event) {
      Props.setAnchorEl(event.target)
    }

    function handleClose(item) {
      Props.setRefreshIntervalUnits(item)
      Props.setAnchorEl(null);
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
          <TextField defaultValue={setDefaultValue()} disabled={!Props.refreshIntervalEnabled} id="outlined-basic" label="Refresh Interval" variant="outlined" />
          <Button style={{maxHeight: '55px', minHeight: '55px'}} aria-controls="simple-menu" variant="contained" color="primary" aria-haspopup="true" onClick={(event) => handleClick(event)}>{Props.refreshIntervalUnits}</Button>
          <Menu
            id="simple-menu"
            anchorEl={Props.anchorEl}
            keepMounted
            open={Boolean(Props.anchorEl)}
          >
            <MenuItem onClick={() => handleClose('Seconds')}>Seconds</MenuItem>
            <MenuItem onClick={() => handleClose('Minutes')}>Minutes</MenuItem>
            <MenuItem onClick={() => handleClose('Hours')}>Hours</MenuItem>
          </Menu>
        </Box>
      </Box>
    );
}
