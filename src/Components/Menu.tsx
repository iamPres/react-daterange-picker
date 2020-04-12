import React from "react";
import { Button, Box, Typography } from '@material-ui/core';

export default class Body extends React.Component {

  render() {
    return (
      <Box className="box">
        <Box mt={2}>
          <Typography color="secondary" variant="h5">Nothing to see here!</Typography>
        </Box>
      </Box>
    );
  }
}
