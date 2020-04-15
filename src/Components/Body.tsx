import React, { Fragment } from "react";
import { Button, Box, Typography, GridList, GridListTile, Grid } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ReactList from 'react-list';
import './Styling.css'

interface Dates {
  [x:string]:string;
}

interface State {
  setSelected(x): void;
  setDates(y): void;
  setBoxClass(z): void;
  setPropertySelected(a):void;
  boxClass: string;
  selected: number[];
  index: number;
  dates: Dates[];
  propertySelected: number;
}

export function Body(Props: State) {

  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December']
  const day = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  const getVariant = (item) => {
      if(item == Props.selected[Props.index]) {
        return 'contained';
      } else {
        return 'outlined';
      }
    }

    function toggleBox() {
      if (Props.boxClass == "box") {
        Props.setBoxClass("box-wide")
      } else {
        Props.setBoxClass("box")
      }
    }

    function updateTransition(index) {
      if (Props.propertySelected == -1) {
        Props.setPropertySelected(index)
        Props.setBoxClass("box-wide")
      }
      else if (index == Props.propertySelected) {
        toggleBox()
      } else if (index != Props.propertySelected && Props.boxClass == "box-wide") {
        Props.setPropertySelected(index)
      } else if (index != Props.propertySelected && Props.boxClass == "box") {
        Props.setPropertySelected(index)
        toggleBox()
      }
    }

    const handleClick = (key, value) => {
      var date = Props.dates
      if (key == 'day') {
        var selected = Props.selected
        selected[Props.index] = value
        Props.setSelected(selected)
        value += 1
      } else {
        toggleBox()
      }
      date[Props.index][key] = value
      Props.setDates(date);

    }

  function renderItem(index) {
    var key = 'month'
    if (Props.propertySelected == 1) {
      key = 'year'
    }
    return <Button onClick={() => handleClick(key, index)} variant="text" color="primary" size="large" style={{maxWidth: '100px', maxHeight: '30px', minWidth: '100px', minHeight: '30px'}}>{index}</Button>;
  }

  function renderScroll() {
    if (Props.boxClass == "box-wide") {
      if (Props.propertySelected == 1) {
        return <Box mt={10}><div style={{overflow: 'auto', maxHeight: 200, maxWidth: 120}}> <ReactList itemRenderer={(index) => renderItem(index+2000)} length={100} type='uniform'/></div></Box>
      } else {
        return <Box mt={10}><div style={{overflow: 'auto', maxHeight: 200, maxWidth: 120}}> <ReactList itemRenderer={(index) => renderItem(month[index])} length={12} type='uniform'/></div></Box>
      }
    } else {
      return <div/>
    }
  }

    return (
      <Box className={Props.boxClass}>
        <Box className="box-container">
          <Box className="box-header" mt={2} mb={2}>
          <Box mt={2}>
            <Button onClick={() => updateTransition(0)} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} size="small" variant="text"><ArrowForwardIosIcon/></Button>
          </Box>
            <Box mt={2} mr={1}>
              <Typography color="textPrimary" variant="h5">{Props.dates[Props.index]['month']}</Typography>
            </Box>
            <Box mt={2}>
              <Typography color="secondary" variant="h5">{Props.dates[Props.index]['year']}</Typography>
            </Box>
            <Box ml={1} mt={2}>
              <Button onClick={() => updateTransition(1)} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} size="small" color="secondary" variant="text"><ArrowBackIosIcon/></Button>
            </Box>
          </Box>
          <Box ml={4}>
            <Grid container justify="flex-start" spacing={1} style={{maxWidth: '300px', maxHeight: '200px', minWidth: '300px', minHeight: '200px'}}>
              {[...Array(7).keys()].map(item => (
                <Grid item>
                  <Button disableRipple={true} color="secondary" size="small" variant="text" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>{day[item]}</Button>
                </Grid>
               ))}
            {[...Array(31).keys()].map(item => (
              <Grid key={item} item>
               <Button onClick={() => handleClick('day', item)} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}} size="small" color='primary' variant={getVariant(item)} disableRipple >{item+1}</Button>
              </Grid>
             ))}
            </Grid>
          </Box>
        </Box>
        {renderScroll()}
      </Box>
    );
}
