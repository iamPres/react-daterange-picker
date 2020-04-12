import React, { Fragment } from "react";
import { Button, Box, Typography, GridList, GridListTile, Grid } from '@material-ui/core';

interface Dates {
  [x:string]:string;
}

interface State {
  setSelected(x): void;
  setDates(y): void;
  selected: number[];
  index: number;
  dates: Dates[];
}

export function Body(Props: State) {

  const getVariant = (item) => {
      if(item == Props.selected[Props.index]) {
        return 'contained';
      } else {
        return 'outlined';
      }
    }

    const handleClick = (index) => {

      if(Props.index == 0){
        Props.setSelected([index, Props.selected[1]]);
        Props.setDates([{day: index+1, month: Props.dates[Props.index].month, year: Props.dates[Props.index].year}, Props.dates[1]]);
      } else {
        Props.setSelected([Props.selected[0], index]);
        Props.setDates([Props.dates[0], {day: index+1, month: Props.dates[Props.index].month, year: Props.dates[Props.index].year}]);
      }
    }

    return (
      <Box className="box">
        <Box className="box-header" mt={2} mb={2}>
          <Box mt={2} mr={1}>
            <Typography color="textPrimary" variant="h5">{Props.dates[Props.index]['month']}</Typography>
          </Box>
          <Box mt={2}>
            <Typography color="secondary" variant="h5">{Props.dates[Props.index]['year']}</Typography>
          </Box>
        </Box>
        <Grid container justify="center" spacing={1} style={{maxWidth: '300px', maxHeight: '250px', minWidth: '300px', minHeight: '250px'}}>
        {[...Array(31).keys()].map(item => (
          <Grid key={item} item>
           <Button onClick={() => handleClick(item)} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} size="small" color='primary' variant={getVariant(item)} disableRipple >{item+1}</Button>
          </Grid>
         ))}
        </Grid>
      </Box>
    );
}
