import React from "react";
import { Button, Box, Typography } from '@material-ui/core';

interface BodyProps {
  [x: string]: string;
}

export default class Body extends React.Component<BodyProps> {
  render() {
    return (
      <Box className="box">
        <Box mt={2} mr={1}>
          <Typography color="secondary" variant="h5">{this.props.date['month']}</Typography>
        </Box>
        <Box mt={2}>
          <Typography color="secondary" variant="h5">{this.props.date['year']}</Typography>
        </Box>
      </Box>
    );
  }
}
