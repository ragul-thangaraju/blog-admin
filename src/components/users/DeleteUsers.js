import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
});

function DeleteUser(props) {
  const { classes } = props;

  return (
    <Dialog
      open={props.openDelete}
      onClose={() => props.handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon style={{ height: 130, width: 130 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">are you sure want to delete?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.handleClose()} color="primary">
          Cancel
        </Button>
        {!props.loading ? (
          <Button
            onClick={() => props.onClickDeleteConfirm()}
            color="primary"
            disabled={props.loading}
          >
            Delete
          </Button>
        ) : (
          <Button color="primary" disabled={props.loading}>
            <CircularProgress color="inherit" size={20} />
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

DeleteUser.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  onClickDeleteConfirm: PropTypes.func,
  loading: PropTypes.string,
  openDelete: PropTypes.bool,
};

export default withStyles(styles)(DeleteUser);
