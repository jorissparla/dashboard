import React, { useState, useEffect } from "react";
import { CardSection } from "../common";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  TextFieldStyle: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150
  },
  buttonStyle: {
    backgroundColor: "#ffc600",
    labelColor: "white",
    margin: "20px"
  },
  buttonStyle2: {
    backgroundColor: "black",
    labelColor: "white",
    margin: "20px"
  }
});

const teams = [
  { key: "Finance", description: "Finance" },
  { key: "Logistics", description: "Logistics" },
  { key: "Tools", description: "Tools" }
];

const regions = [
  { key: "EMEA", description: "EMEA" },
  { key: "NA", description: "NA" },
  { key: "APJ", description: "APJ" },
  { key: "LA", description: "LA" }
];

const ChatAdd = ({ ranges, onCancel, classes, onSave }) => {
  const [team, setTeam] = useState("Finance");
  const [region, setRegion] = useState("EMEA");
  const [nrchats, setnrChats] = useState(0);
  const [weeknr, setWeeknr] = useState(0);
  const [responseintime, setResponseintime] = useState(0);

  useEffect(() => {
    if (ranges.length > 0) {
      console.log("week", ranges);
      setWeeknr(ranges[2].Name);
    } else {
    }
  }, [ranges]);

  const handleSubmit = e => {
    onSave({ team, region, weeknr, responseintime, nrchats });
  };

  function doSubmit(values) {
    window.alert(`You submitted Parent:\n\n${JSON.stringify(values, null, 2)}`);
  }

  // const handleChange = event => {
  //   console.log(
  //     event.target.name,
  //     event.target.value,
  //     State[event.target.name]
  //   );
  //   setState(prevState => ({
  //     ...State,
  //     [event.target.name]: event.target.value
  //   }));
  // };

  console.log("ranges", ranges);

  if (!ranges) {
    return <CardSection>Loading...</CardSection>;
  }
  // const { team, region, weeknr, responseintime, nrchats } = State;
  const percentage = (nrchats === 0
    ? 100
    : (100 * responseintime) / nrchats
  ).toFixed(1);
  return (
    <div className="mx-auto">
      <div className="p-2 rounded shadow-lg bg-white w-2/3 mx-auto">
        <CardSection>
          <span className="text-3xl tracking-wider font-pop">
            Add Chat Result
          </span>
        </CardSection>

        <form className="mb-2">
          <CardSection>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-readonly">Team</InputLabel>
              <Select
                id="team"
                name="team"
                onChange={e => setTeam(e.target.value)}
                style={{ flex: 2 }}
                value={team}
              >
                {teams.map(team => (
                  <MenuItem key={team.key} value={team.key}>
                    {team.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-readonly">region</InputLabel>
              <Select
                id="region"
                name="region"
                style={{ flex: 2 }}
                onChange={e => setRegion(e.target.value)}
                value={region}
              >
                {regions.map(region => (
                  <MenuItem key={region.key} value={region.key}>
                    {region.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-readonly">weeknr</InputLabel>
              <Select
                name="weeknr"
                id="weeknr"
                onChange={e => setWeeknr(e.target.value)}
                value={weeknr}
              >
                {ranges.map(range => (
                  <MenuItem
                    key={range.Name}
                    value={range.Name}
                    primaryText={range.Name}
                  >
                    {range.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardSection>
          <div>
            <img
              className="w-full object-cover h-16"
              src="https://images.unsplash.com/photo-1503494099816-316e7ebbebd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
              alt=""
            />
          </div>

          <div className="flex m-2 items-center" id="inputboxes">
            <div className="m-2">
              <label
                htmlFor="nrchats"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Number of chats
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  onChange={e => setnrChats(e.target.value)}
                  value={nrchats}
                  id="nrchats"
                  name="nrchats"
                  className="form-input block w-32 sm:text-sm sm:leading-5"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="m-2">
              <label
                htmlFor="nrchats"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Responded in time
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  onChange={e => setResponseintime(e.target.value)}
                  value={responseintime}
                  id="responseintime"
                  name="responseintime"
                  className="form-input block w-32 sm:text-sm sm:leading-5"
                  placeholder="0"
                />
              </div>
            </div>
            {/* <TextField
              className={classes.TextFieldStyle}
              name="nrchats"
              label="Number of chats"
              type="number"
              width={2}
              onChange={handleChange}
              value={nrchats}
            />
            <TextField
              className={classes.TextFieldStyle}
              name="responseintime"
              label="Responded in time"
              type="number"
              onChange={handleChange}
              value={responseintime}
            /> */}
            <div className="m-2">
              <label
                htmlFor="nrchats"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Responded in time
              </label>
              <input
                className="form-input block w-32 sm:text-sm sm:leading-5 disabled border-white"
                value={`${percentage} %`}
              />
            </div>
            {/* <TextField
              className={classes.TextFieldStyle}
              name="percentage"
              label="Responded in time"
              type="text"
              value={percentage}
            /> */}
          </div>
          <div className="mt-2 flex items-center">
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.button}
              label="Submit"
              onClick={this.handleSubmit}
              >
              Save
              </Button>
              <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={onCancel}
              type="reset"
              >
              Cancel
            </Button> */}
            <button
              className="btn-tw bg-purp text-white hover:bg-black"
              onClick={handleSubmit}
              type="button"
            >
              Save
            </button>
            <button
              className="btn-tw font-bold bg-gray-300 hover:bg-gray-400 text-gray-800"
              onClick={onCancel}
              type="reset"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {/* <div>
        {JSON.stringify(
          { team, region, weeknr, responseintime, nrchats },
          null,
          2
        )}
      </div> */}
    </div>
  );
};

const MyButton = ({ children, onClick }) => {
  // console.log(props);
  return (
    <span className="inline-flex rounded-md shadow-sm">
      <button
        onClick={onClick}
        type="button"
        className="btn-tw font-bold bg-gray-300 hover:bg-gray-400 text-gray-800"
      >
        {children}
      </button>
    </span>
  );
};

export default withStyles(styles)(ChatAdd);
