import Timer from 'react-compound-timer'
import React, { useState } from 'react';
import ms from 'ms'

interface Inputs {
  refreshInterval: number;
  refreshIntervalUnits: string;
  timerRunning: boolean;
}

export function TimerUI (props: Inputs) {
    if (props.timerRunning == true) {
      return <Timer initialTime={ms(String(props.refreshInterval)+props.refreshIntervalUnits)} direction="backward">{({timerState}) => (<React.Fragment>{"Refresh in "}<Timer.Hours/>{":"}<Timer.Minutes/>{":"}<Timer.Seconds/></React.Fragment>)}</Timer>
    } else {
      return <div>Refresh</div>
    }
}
