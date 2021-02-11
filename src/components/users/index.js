import React, { Component } from "react";
import PropTypes from "prop-types";
import Content from "./Content";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Tab from "./Tab";
import { Layout } from "../common/Layout";
import { getUsers, deleteUser } from "../../actions/usersAction";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import DeleteUsers from "./DeleteUsers";

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
      userLoading: false,
      loading: false,
      hasError: false,
      openSnackBar: false,
      errMsg: "",
      openDelete: false,
      userDelete: "",
      SnackbarMsg: "",
    };
  }

  componentDidMount() {
    this.setState({ userLoading: true });
    this.props.getUsers({}, (result) => {
      this.setState({ userLoading: false });
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
      openDelete: false,
      openSnackBar: false,
    });
  };

  onClickDelete = (val) => {
    this.setState({ openDelete: true, userDelete: val });
  };

  onClickDeleteConfirm = () => {
    const { userDelete } = this.state;
    this.setState({ userLoading: true }, () => {
      this.props.deleteUser({ userId: userDelete }, (result, response) => {
        this.setState({
          userLoading: false,
          openDelete: false,
        });
        if (result) {
          this.setState({
            userDelete: "",
            SnackbarMsg: "User Deleted Successfully",
            openSnackBar: true,
          });
        } else {
          this.setState({
            userDelete: "",
            SnackbarMsg: response.message,
            openSnackBar: true,
          });
        }
      });
    });
  };

  onClick = () => {
    this.setState({ loading: true }, () => {
      this.props.getUsers({}, (result) => {
        this.setState({ loading: false });
        if (result) {
          console.log("");
        } else {
          console.log("");
        }
      });
    });
  };

  render() {
    const { classes, userList } = this.props;
    const {
      loading,
      openSnackBar,
      openDelete,
      SnackbarMsg,
      userLoading,
    } = this.state;
    return (
      <div>
        <Paper className={classes.paper}>
          <div>
            <Typography color="textSecondary" align="center">
              <Content
                loopData={userList}
                loading={loading}
                edit={(obj) => this.onClickEdit(obj)}
                delete={(val) => this.onClickDelete(val)}
                userLoading={userLoading}
              />
            </Typography>
          </div>
        </Paper>

        <DeleteUsers
          classes={classes}
          openDelete={openDelete}
          loading={loading}
          handleClose={this.handleClose}
          onClickDeleteConfirm={this.onClickDeleteConfirm}
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
    userList: state.user.userList,
  };
};

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  getUsers: PropTypes.array,
  deleteUser: PropTypes.func,
};

export default Layout(withStyles(styles)(Users), Tab, mapStateToProps, {
  getUsers,
  deleteUser,
});
