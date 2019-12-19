import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    flexGrow: 1,
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    top: '200px',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  paper: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    flex: '1 0 auto'
    // minHeight: '90%'
  },
  stretch: {
    minHeight: '90%'
  },
  grid: {
    minHeight: 150
  },
  left: {
    gridColumn: 1
  },
  right: {
    gridColumn: 2
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));
