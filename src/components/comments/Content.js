import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const columns = [
  {
    id: "sno",
    label: "S.No",
    minWidth: 20,
    align: "center",
  },
  {
    id: "title",
    label: "Title",
    minWidth: 20,
    align: "center",
  },
  {
    id: "comments",
    label: "Comments",
    minWidth: 20,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    maxWidth: 40,
    minWidth: 40,
    align: "center",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  spinner: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Content(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.loopData.length && !props.loading ? (
              props.loopData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.username}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        {row.postDetails.title}
                      </TableCell>
                      <TableCell align="center">{row.comment}</TableCell>
                      <TableCell align="center" size="small">
                        <div>
                          <IconButton>
                            <Check
                              color="inherit"
                              onClick={() => props.approve(row._id)}
                            />
                          </IconButton>
                        </div>
                        <div>
                          <IconButton>
                            <Close
                              color="inherit"
                              onClick={() => props.reject(row._id)}
                            />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : props.commentLoading ? (
              <TableRow style={{ height: "100px" }}>
                <TableCell colSpan={5}>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <CircularProgress />
                  </Grid>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow style={{ height: "100px" }}>
                <TableCell colSpan={5}>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <h3>No comments found!</h3>
                  </Grid>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.loopData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
