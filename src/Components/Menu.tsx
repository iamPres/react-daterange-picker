import React from "react";
import { Button, Box, Typography, FormGroup, FormControlLabel, Switch } from '@material-ui/core';

interface Inputs {
  refreshIntervalEnabled: boolean;
  setRefreshIntervalEnabled(x): void;
  menuClass: string;
}

export function Menu(Props: Inputs) {

    function toggleSwitch() {
      if (Props.refreshIntervalEnabled) {
        Props.setRefreshIntervalEnabled(false)
      } else {
        Props.setRefreshIntervalEnabled(true)
      }
    }

    return (
      <Box mt={2} className={Props.menuClass}>
        <Box mt={2} ml={2}>
          <FormGroup>
            <FormControlLabel control={<Switch size="small" checked={Props.refreshIntervalEnabled} onChange={() => toggleSwitch()} />} label="Refresh Interval"/>
          </FormGroup>
        </Box>
      </Box>
    );
}
