import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
    padding: theme.spacing(3)
  },
  margin: {
    height: theme.spacing(3)
  }
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      PopperProps={{
        popperRef
      }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
};

const marks = [
  {
    value: 0,
    label: 'NORMAL'
  },
  {
    value: 50,
    label: 'WATCH'
  },

  {
    value: 100,
    label: 'ALERT'
  }
];

const TemperatureSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

export default function CustomizedSlider({ initialValue = 'NORMAL', onChange }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const temp = marks.find(m => m.label === initialValue);
    setValue(temp ? initialValue : temp.value);
  }, [initialValue]);
  console.log(value);
  const handleChange = (_, v) => {
    setValue(v);
    console.log(v);
    const temp = marks.find(m => m.value === v);
    console.log(temp.label);
    onChange(temp.label);
  };
  return (
    <div className={classes.root}>
      <Typography gutterBottom>Customer Temperature</Typography>
      <TemperatureSlider
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={null}
        aria-label="pretto slider"
        marks={marks}
        defaultValue={value}
      />
    </div>
  );
}
