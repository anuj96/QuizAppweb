import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  oldQuiz: {
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73,
    left: "25%",
    right: "25%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  },
  loading: {
    position: "relative",
    top: 77,
    left: "38%"
  },
  [theme.breakpoints.down("1105")]: {
    oldQuiz: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%"
    },
    oldQuizButton: {
      minWidth: "100%",
      maxWidth: "100%",
      padding: "1px ! important"
    },
    quizbuttons: {
      display: "inlineBlock"
    },
    oldQuizHeading: {
      fontSize: 22
    },
    quizbuttonsItem: {
      padding: 1,
      padding: "1px ! important"
    },
    button: {
      padding: "4px 6px",
      width: 185
    }
  }
}));

function OldQuiz() {
  const classes = useStyles();
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dateArray = [];
    fetch("https://samplecovide19s.herokuapp.com/data")
      .then(questionJson => {
        return questionJson.json();
      })
      .then(questions => {
        questions.map(question => {
          dateArray.push(question.date);
        });
        setDates(dateArray);
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.oldQuiz}>
      <Grid container spacing={3} className={classes.quizbuttons}>
        <Grid item xs={12} className={classes.quizbuttonsItem}>
          <Paper className={classes.paper}>
            <Typography
              variant="h4"
              gutterBottom
              className={classes.oldQuizHeading}
            >
              OLD QUIZ & RESULTS
            </Typography>
          </Paper>
        </Grid>
        {dates.length != 0 && !loading ? (
          dates.map(date => (
            <React.Fragment>
              <Grid item xs={6} className={classes.oldQuizButton}>
                <Link to={`/datemonthquiz` + `/${date}`}>
                  <Paper className={classes.paper}>
                    <Button variant="contained" className={classes.button}>
                      QUIZ {date}
                    </Button>
                  </Paper>
                </Link>
              </Grid>
              <Grid item xs={6} className={classes.oldQuizButton}>
                <Link to={`/quizresult` + `/${date}`}>
                  <Paper className={classes.paper}>
                    <Button variant="contained" className={classes.button}>
                      QUIZ RESULT {date}
                    </Button>
                  </Paper>
                </Link>
              </Grid>
            </React.Fragment>
          ))
        ) : (
          <div className={classes.loading}>
            Loading
            <CircularProgress />
          </div>
        )}
      </Grid>
    </div>
  );
}

export default OldQuiz;
