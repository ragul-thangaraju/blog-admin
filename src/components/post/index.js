import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Content from "./Content";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Tab from "./Tab";
import { Layout } from "../common/Layout";
import {
  getPost,
  addPost,
  deletePost,
  editPost,
} from "../../actions/postAction";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import DeletePost from "./DeletePost";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { isEmptyString, isEmptyObject } from "../../utils/validations";
import { DropzoneArea } from "material-ui-dropzone";

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
  imageUpload: {
    minHeight: "150px",
    margin: "8px 0px 8px 0px",
    color: "#8f908f",
    borderRadius: "5px",
  },
});

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postToDelete: "",
      postToEdit: {},
      postLoading: false,
      loading: false,
      openAdd: false,
      openEdit: false,
      loadOnAdd: false,
      hasError: false,
      openSnackBar: false,
      errMsg: "",
      openDelete: false,
      accountTypeDelete: "",
      hasEditError: false,
      SnackbarMsg: "",
      openUpload: false,
      uploadData: [],
      title: "",
      description: "",
      image: "",
      imageEdit: {},
    };
  }

  componentDidMount() {
    this.setState({ postLoading: true });
    this.props.getPost({}, (result) => {
      this.setState({ postLoading: false });
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
      openSnackBar: false,
      openAdd: false,
      openDelete: false,
      openEdit: false,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onClick = () => {
    this.setState({ postLoading: true }, () => {
      this.props.getPost({}, (result) => {
        this.setState({ postLoading: false });
        if (result) {
          console.log("");
        } else {
          console.log("");
        }
      });
    });
  };

  postData = () => {
    if (
      isEmptyString(this.state.description) ||
      this.state.description.length < 150 ||
      isEmptyString(this.state.title) ||
      isEmptyObject(this.state.image)
    ) {
      this.setState({ hasError: true });
    } else {
      this.setState({ loadOnAdd: true, hasError: false });
      const data = new FormData();
      data.append("file", this.state.image);
      data.append("upload_preset", "ragulthangaraju");
      data.append("cloud_name", "ragulthangaraju");
      fetch("https://api.cloudinary.com/v1_1/ragulthangaraju/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const paramsToSend = {
            title: this.state.title,
            image: data.url,
            description: this.state.description,
          };
          this.props.addPost(paramsToSend, (result) => {
            if (result) {
              this.setState({
                loadOnAdd: false,
                image: "",
                title: "",
                description: "",
                openAdd: false,
                openSnackBar: true,
                SnackbarMsg: "Post created successfully",
              });
            } else {
              console.log("");
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  editPostData = () => {
    if (
      isEmptyString(this.state.postToEdit.description) ||
      this.state.postToEdit.description.length < 150 ||
      isEmptyString(this.state.postToEdit.title)
    ) {
      this.setState({ hasError: true });
    } else {
      if (isEmptyObject(this.state.imageEdit)) {
        const paramsToSend = {
          postId: this.state.postToEdit._id,
          title: this.state.postToEdit.title,
          description: this.state.postToEdit.description,
        };
        this.props.editPost(paramsToSend, (result) => {
          if (result) {
            this.setState({
              loadOnEdit: false,
              postToEdit: {},
              openEdit: false,
              openSnackBar: true,
              SnackbarMsg: "Post updated successfully",
            });
          } else {
            this.setState({
              openSnackBar: true,
              SnackbarMsg: "failed to update post",
            });
          }
        });
      } else {
        this.setState({ loadOnEdit: true, hasError: false });
        const data = new FormData();
        data.append("file", this.state.imageEdit);
        data.append("upload_preset", "ragulthangaraju");
        data.append("cloud_name", "ragulthangaraju");
        fetch("https://api.cloudinary.com/v1_1/ragulthangaraju/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            const paramsToSend = {
              postId: this.state.postToEdit._id,
              title: this.state.postToEdit.title,
              image: data.url,
              description: this.state.postToEdit.description,
            };
            this.props.editPost(paramsToSend, (result) => {
              if (result) {
                this.setState({
                  loadOnEdit: false,
                  postToEdit: {},
                  openEdit: false,
                  openSnackBar: true,
                  SnackbarMsg: "Post updated successfully",
                });
              } else {
                this.setState({
                  openSnackBar: true,
                  SnackbarMsg: "failed to update post",
                });
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  onClickEdit = (val) => {
    this.setState({ openEdit: true, postToEdit: val });
  };

  onClickDelete = (val) => {
    this.setState({ openDelete: true, postToDelete: val });
  };

  onClickDeleteConfirm = () => {
    const { postToDelete } = this.state;
    this.setState({ postLoading: true }, () => {
      this.props.deletePost({ postId: postToDelete }, (result, response) => {
        this.setState({
          postLoading: false,
          openDelete: false,
        });
        if (result) {
          this.setState({
            postToDelete: "",
            SnackbarMsg: "Post Deleted Successfully",
            openSnackBar: true,
          });
        } else {
          this.setState({
            postToDelete: "",
            SnackbarMsg: response.message,
            openSnackBar: true,
          });
        }
      });
    });
  };

  render() {
    const { classes, postList } = this.props;
    const {
      loading,
      openEdit,
      openSnackBar,
      openAdd,
      openDelete,
      SnackbarMsg,
      postLoading,
    } = this.state;
    return (
      <div>
        <Paper className={classes.paper}>
          <AppBar
            className={classes.searchBar}
            position="static"
            color="default"
            elevation={0}
          >
            <Toolbar>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.addUser}
                    onClick={() => {
                      this.handleClickOpen();
                    }}
                  >
                    Add Post
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div>
            <Typography color="textSecondary" align="center">
              <Content
                loopData={postList}
                loading={loading}
                edit={(obj) => this.onClickEdit(obj)}
                delete={(val) => this.onClickDelete(val)}
                postLoading={postLoading}
              />
            </Typography>
          </div>
        </Paper>

        <Dialog
          open={openAdd}
          onClose={() => this.handleClose()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a post, you must provide it's title, desc, image below to
              continue
            </DialogContentText>
            <TextField
              error={isEmptyString(this.state.title) && this.state.hasError}
              helperText={
                isEmptyString(this.state.title) && this.state.hasError
              }
              autoFocus
              variant="outlined"
              id="title"
              label="Title"
              type="title"
              name="title"
              fullWidth
              value={this.state.title}
              onChange={(e) => this.handleChange(e)}
            />
            <TextField
              error={
                (isEmptyString(this.state.description) ||
                  this.state.description.length < 150) &&
                this.state.hasError
              }
              helperText={
                (isEmptyString(this.state.description) ||
                  this.state.description.length < 150) &&
                this.state.hasError
              }
              variant="outlined"
              margin="normal"
              id="description"
              multiline
              rows={4}
              label="Description (min 150 char)"
              type="description"
              name="description"
              fullWidth
              value={this.state.description}
              onChange={(e) => this.handleChange(e)}
            />

            <DropzoneArea
              error={isEmptyObject(this.state.image) && this.state.hasError}
              helperText={
                isEmptyObject(this.state.image) && this.state.hasError
              }
              margin="normal"
              filesLimit={1}
              required
              dropzoneClass={classes.imageUpload}
              showPreviewsInDropzone={true}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              dropzoneText={"click to add an image"}
              onChange={(files) => this.setState({ image: files[0] })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
            {!this.state.loadOnAdd ? (
              <Button
                onClick={() => this.postData()}
                color="primary"
                disabled={this.loadOnAdd}
              >
                Submit
              </Button>
            ) : (
              <Button
                onClick={() => this.postData()}
                color="primary"
                disabled={this.loadOnAdd}
              >
                <CircularProgress color="inherit" size={20} />
              </Button>
            )}
          </DialogActions>
        </Dialog>

        <Dialog
          open={openEdit}
          onClose={() => this.handleClose()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              you can able update title, description and image.
            </DialogContentText>
            <TextField
              error={
                isEmptyString(this.state.postToEdit.title) &&
                this.state.hasError
              }
              helperText={
                isEmptyString(this.state.postToEdit.title) &&
                this.state.hasError
              }
              autoFocus
              variant="outlined"
              id="title"
              label="Title"
              type="title"
              name="title"
              fullWidth
              value={this.state.postToEdit.title}
              onChange={(e) =>
                this.setState({
                  postToEdit: {
                    ...this.state.postToEdit,
                    title: e.target.value,
                  },
                })
              }
            />
            <TextField
              error={
                (isEmptyString(this.state.postToEdit.description) ||
                  this.state.postToEdit.description.length < 150) &&
                this.state.hasError
              }
              helperText={
                (isEmptyString(this.state.postToEdit.description) ||
                  this.state.postToEdit.description.length < 150) &&
                this.state.hasError
              }
              variant="outlined"
              margin="normal"
              id="description"
              multiline
              rows={4}
              label="Description (min 150 char)"
              type="description"
              name="description"
              fullWidth
              value={this.state.postToEdit.description}
              onChange={(e) =>
                this.setState({
                  postToEdit: {
                    ...this.state.postToEdit,
                    description: e.target.value,
                  },
                })
              }
            />

            <DropzoneArea
              margin="normal"
              filesLimit={1}
              required
              dropzoneClass={classes.imageUpload}
              showPreviewsInDropzone={true}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              dropzoneText={"click to add an image"}
              onChange={(files) => this.setState({ imageEdit: files[0] })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Cancel
            </Button>
            {!this.state.loadOnEdit ? (
              <Button
                onClick={() => this.editPostData()}
                color="primary"
                disabled={this.loadOnEdit}
              >
                Submit
              </Button>
            ) : (
              <Button
                onClick={() => this.editPostData()}
                color="primary"
                disabled={this.loadOnEdit}
              >
                <CircularProgress color="inherit" size={20} />
              </Button>
            )}
          </DialogActions>
        </Dialog>

        <DeletePost
          // classes={classes}
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
    postList: state.post.postList,
  };
};

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  getPost: PropTypes.func,
  addPost: PropTypes.func,
  deletePost: PropTypes.func,
  editPost: PropTypes.func,
};

export default Layout(withStyles(styles)(Post), Tab, mapStateToProps, {
  getPost,
  addPost,
  deletePost,
  editPost,
});
