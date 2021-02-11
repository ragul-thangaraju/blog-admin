import React, { Component } from "react";
import PropTypes from "prop-types";
import Content from "./Content";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Tab from "./Tab";
import { Layout } from "../common/Layout";
import {
  getComments,
  rejectComment,
  approveComment,
} from "../../actions/commentAction";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import RejectComment from "./Reject";
import ApproveComment from "./Approve";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

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
});

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentLoading: false,
      loading: false,
      hasError: false,
      openSnackBar: false,
      errMsg: "",
      openReject: false,
      openApprove: false,
      commentReject: "",
      commentApprove: "",
      SnackbarMsg: "",
    };
  }

  componentDidMount() {
    this.setState({ commentLoading: true });
    this.props.getComments({}, (result) => {
      this.setState({ commentLoading: false });
      if (result) {
        console.log("");
      } else {
        console.log("");
      }
    });
  }

  handleClickOpen = () => {
    this.setState({ openAdd: true });
  };

  handleClose = () => {
    this.setState({
      openReject: false,
      openApprove: false,
      openSnackBar: false,
    });
  };

  onClickReject = (val) => {
    this.setState({ openReject: true, commentReject: val });
  };

  onClickRejectConfirm = () => {
    const { commentReject } = this.state;
    this.setState({ commentLoading: true }, () => {
      this.props.rejectComment(
        { commentId: commentReject },
        (result, response) => {
          this.setState({
            commentLoading: false,
            openReject: false,
          });
          if (result) {
            this.setState({
              commentReject: "",
              SnackbarMsg: "Comment Rejected Successfully",
              openSnackBar: true,
            });
          } else {
            this.setState({
              commentReject: "",
              SnackbarMsg: response.message,
              openSnackBar: true,
            });
          }
        }
      );
    });
  };

  onClickReject = (val) => {
    this.setState({ openReject: true, commentReject: val });
  };

  onClickRejectConfirm = () => {
    const { commentReject } = this.state;
    this.setState({ commentLoading: true }, () => {
      this.props.rejectComment(
        { commentId: commentReject },
        (result, response) => {
          this.setState({
            commentLoading: false,
            openReject: false,
          });
          if (result) {
            this.setState({
              commentReject: "",
              SnackbarMsg: "Comment Rejected Successfully",
              openSnackBar: true,
            });
          } else {
            this.setState({
              commentReject: "",
              SnackbarMsg: response.message,
              openSnackBar: true,
            });
          }
        }
      );
    });
  };

  onClickApprove = (val) => {
    this.setState({ openApprove: true, commentApprove: val });
  };

  onClickApproveConfirm = () => {
    const { commentApprove } = this.state;
    this.setState({ commentLoading: true }, () => {
      this.props.approveComment(
        { commentId: commentApprove },
        (result, response) => {
          this.setState({
            commentLoading: false,
            openApprove: false,
          });
          if (result) {
            this.setState({
              commentApprove: "",
              SnackbarMsg: "Comment Approved Successfully",
              openSnackBar: true,
            });
          } else {
            this.setState({
              commentApprove: "",
              SnackbarMsg: response.message,
              openSnackBar: true,
            });
          }
        }
      );
    });
  };

  render() {
    const { classes, commentList } = this.props;
    const {
      openApprove,
      loading,
      openSnackBar,
      openReject,
      SnackbarMsg,
      commentLoading,
    } = this.state;
    return (
      <div>
        <Paper className={classes.paper}>
          <div>
            <Typography color="textSecondary" align="center">
              <Content
                loopData={commentList}
                loading={loading}
                edit={(obj) => this.onClickEdit(obj)}
                reject={(val) => this.onClickReject(val)}
                approve={(val) => this.onClickApprove(val)}
                commentLoading={commentLoading}
              />
            </Typography>
          </div>
        </Paper>

        <RejectComment
          classes={classes}
          openReject={openReject}
          loading={loading}
          handleClose={this.handleClose}
          onClickRejectConfirm={this.onClickRejectConfirm}
        />
        <ApproveComment
          classes={classes}
          openApprove={openApprove}
          loading={loading}
          handleClose={this.handleClose}
          onClickApproveConfirm={this.onClickApproveConfirm}
        />
        <Snackbar
          autoHideDuration={1000}
          open={openSnackBar}
          TransitionComponent={SlideTransition}
          message={SnackbarMsg}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    commentList: state.comment.commentList,
  };
};

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  getComments: PropTypes.func,
  rejectComment: PropTypes.func,
  approveComment: PropTypes.func,
};

export default Layout(withStyles(styles)(Users), Tab, mapStateToProps, {
  getComments,
  rejectComment,
  approveComment,
});
