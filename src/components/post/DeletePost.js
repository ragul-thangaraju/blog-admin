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
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  input: {
    display: "none",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  imageUpload: {
    minHeight: "150px",
    margin: "8px 0px 8px 0px",
    color: "#8f908f",
    borderRadius: "5px",
  },
});

function DeletePost(props) {
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

DeletePost.propTypes = {
  handleClose: PropTypes.func,
  onClickDeleteConfirm: PropTypes.func,
  loading: PropTypes.string,
  openDelete: PropTypes.bool,
};

export default withStyles(styles)(DeletePost);
