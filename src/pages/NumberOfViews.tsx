import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles, createStyles } from '@material-ui/core/styles';
import ViewIcon from '@material-ui/icons/ViewComfy';
import Tooltip from '@material-ui/core/Tooltip';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { AUDIT_QUERY } from '../supportcard/queries/AUDIT_QUERY';

const styles = (theme: any) => ({
  badge: {
    top: '50%',
    right: -3,
    backgroundColor: 'black',
    // The border color match the background color.
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`
  },
  icon: {
    marginRight: 10
  }
});

interface Props {
  classes: any;
  linkid: string;
}

const NumberOfViews: React.FC<Props> = ({ classes, linkid }) => {
  const { loading, data } = useQuery(AUDIT_QUERY, {
    suspend: false,
    variables: { linkid }
  });

  let content = loading ? 0 : data.audits ? data.audits.length : 0;
  return (
    <Tooltip title="Number of Views">
      <IconButton aria-label="Cart" className={classes.icon}>
        <Badge
          badgeContent={content}
          color="secondary"
          max={999}
          classes={{ badge: classes.badge }}
        >
          <ViewIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default withStyles(styles)(NumberOfViews);