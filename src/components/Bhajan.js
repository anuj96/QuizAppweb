import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { links } from "../Config";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  },
  topInstruction: {
    color: "#ac0b0b",
    marginBottom: 10,
    fontSize: 20
  },
  formContainer: {
    textAlign: "center",
    marginTop: 18
  },
  message: {
    marginBottom: 10,
    fontSize: 19,
    fontWeight: 500,
    textAlign: "left"
  },
  instruction: {
    flexGrow: 1,
    marginTop: 152,
    position: "absolute",
    marginBottom: 73,
    left: "25%",
    right: "25%"
  },
  [theme.breakpoints.down("1123")]: {
    instruction: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%"
    },
    quizitems: {
      maxWidth: "100%",
      padding: "0px ! important",
      paddingTop: "10px ! important"
    },
    button: {
      padding: "11px 6px",
      width: 185
    },
    form: {
      display: "inline-block"
    },
    formContainer: {
      textAlign: "center",
      marginTop: 18
    },
    message: {
      marginBottom: 14,
      fontSize: 18,
      fontWeight: 500
    }
  },
  [theme.breakpoints.down("361")]: {
    formContainer: {
      textAlign: "center",
      marginTop: 18
    },
    message: {
      marginBottom: 14,
      fontSize: 16,
      fontWeight: 500
    },
    topInstruction: {
      fontSize: 17
    }
  }
}));

function Bhajan() {
  const classes = useStyles();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const questionsArray = [];
    fetch(links.backendURL + "bhajan")
      .then(answerJson => {
        return answerJson.json();
      })
      .then(answers => {
        answers.map(answer => {
          questionsArray.push(answer);
        });
        setAnswers(questionsArray);
        //setLoading(false);
      });
  }, []);

  return (
    <div className={classes.instruction}>
      <Paper className={classes.tableheading}>
        {answers.length != 0 ? (
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              aria-label="sticky table"
              className={classes.tableHeader}
            >
              <TableHead className={classes.tablecolumns}>
                <TableRow>
                  <TableCell key="name" className={classes.tableNumber}>
                    भजन नाम
                  </TableCell>
                  <TableCell key="name" className={classes.tableQuestion}>
                    गायक
                  </TableCell>
                  <TableCell key="code" className={classes.tableAnswer}>
                    गीतकार
                  </TableCell>
                  <TableCell key="population" className={classes.tableRemarks}>
                    Link
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {answers.map(answer => (
                  <TableRow>
                    <TableCell className={classes.tableNumberCell}>
                      {answer.bhajanName}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tableQuestionCell}
                    >
                      {answer.singer}
                    </TableCell>
                    <TableCell className={classes.tableAnswerCell}>
                      {answer.writer}
                    </TableCell>
                    <TableCell className={classes.tableRemarkCell}>
                      <Link
                        href={answer.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <label className={classes.helpLabel}>
                          Click here to listen
                        </label>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          ""
        )}
      </Paper>
    </div>
  );
}

export default Bhajan;
