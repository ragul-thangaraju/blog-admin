import React from "react";
import { authenticate } from "../../actions/loginInAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { PATH } from "../../config/routes";
import { isEmptyString } from "../../utils/validations";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#1976d2",
    backgroundColor: "#edf2ff",
    fontWeight: "500",
    borderRadius: "4px",
    letterSpacing: "0.02857em",
    lineHeight: "1.2",
    padding: ".6180469716em 1.41575em",
    textDecoration: "none",
    display: "inline-block",
    border: "0",
    fontSize: "inherit",
    textTransform: "initial",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = React.useState({
    username: "",
    password: "",
    loginError: false,
    openSnackBar: false,
    hasError: false,
    backDrop: false,
  });

  const {
    username,
    password,
    loginError,
    openSnackBar,
    hasError,
    backDrop,
  } = state;

  const onClickLogin = () => {
    setState({ ...state, backDrop: true });
    const loginData = {
      username: username,
      password: password,
    };

    if (isEmptyString(username) || isEmptyString(password)) {
      setState({ ...state, hasError: true, backDrop: false });
    } else {
      props.authenticate(loginData, (result) => {
        if (result) {
          history.push(PATH.POST);
        } else {
          setState({
            ...state,
            hasError: true,
            openSnackBar: true,
            backDrop: false,
          });
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  const handleClose = () => {
    setState({ ...state, openSnackBar: false, backDrop: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Snackbar
          autoHideDuration={1000}
          open={openSnackBar}
          TransitionComponent={SlideTransition}
          message="Invalid username or password"
          onClose={handleClose}
        />
        <Backdrop
          className={classes.backdrop}
          open={backDrop}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={(hasError && isEmptyString(hasError)) || loginError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onKeyDown={handleKeyDown}
            onChange={(e) => setState({ ...state, username: e.target.value })}
          />
          <TextField
            error={(hasError && isEmptyString(password)) || loginError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name={password}
            label="password"
            type="password"
            id="password"
            autoComplete="current-password"
            onKeyDown={handleKeyDown}
            onChange={(e) => setState({ ...state, password: e.target.value })}
          />
          <Button
            fullWidth
            className={classes.submit}
            onClick={() => onClickLogin()}
          >
            Sign In
          </Button>
        </form>
        <Grid container></Grid>
      </div>
    </Container>
  );
}

Login.propTypes = {
  authenticate: PropTypes.func,
  history: PropTypes.object,
};

export default connect(null, { authenticate })(Login);
