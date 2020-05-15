import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { links } from "../../Config";
import { useForm } from "react-hook-form";

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
  feedbackButton: {
    backgroundColor: "#1976d2",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  },
  home: {
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73,
    left: "25%",
    right: "25%"
  },
  quizResultButton: {
    backgroundColor: "#aa1050e3",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#610c2b"
    }
  },
  [theme.breakpoints.down("1123")]: {
    home: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%"
    },
    quizbutton: {
      display: "inline-block"
    },
    quizitems: {
      maxWidth: "100%",
      padding: "0px ! important",
      paddingTop: "10px ! important"
    },
    feedbackButton: {
      padding: "4px 6px",
      width: 111
    },
    button: {
      padding: "4px 6px",
      width: 185
    },
    form: {
      display: "inline-block"
    },
    mobileInput: {
      display: "block",
      left: 0,
      right: 0,
      margin: "0 auto",
      marginBottom: 10,
      boxShadow: "4px 4px #eeeeee"
    },
    feedbackInput: {
      left: 0,
      right: 0,
      margin: "0 auto",
      marginBottom: 17,
      paddingBottom: 0,
      marginBottom: 17,
      boxShadow: "4px 4px #eeeeee"
    },
    formContainer: {
      textAlign: "center",
      marginTop: 18
    },
    message: {
      marginBottom: 14,
      fontSize: 16,
      fontWeight: 500
    },
    responseMessage: {
      color: "#d34242"
    },
    comment: {
      display: "block",
      textAlign: "center"
    },
    submitButton: {
      textAlign: "center",
      marginRight: 28
    },
    mobilenumber: {
      textAlign: "center",
      display: "block"
    }
  },
  [theme.breakpoints.down("361")]: {
    form: {
      display: "inline-block"
    },
    mobileInput: {
      display: "block",
      marginBottom: 10,
      boxShadow: "4px 4px #eeeeee"
    },
    feedbackInput: {
      paddingBottom: 0,
      marginBottom: 17,
      boxShadow: "4px 4px #eeeeee"
    },
    formContainer: {
      textAlign: "center",
      marginTop: 18
    },
    message: {
      marginBottom: 14,
      fontSize: 16,
      fontWeight: 500
    },
    comment: {
      display: "block",
      marginLeft: -33
    },
    submitButton: {
      textAlign: "center",
      marginRight: 28
    }
  }
}));

function Home() {
  const classes = useStyles();
  const date = new Date();
  const [toggleButton, setToggleButton] = useState(false);
  const day =
    new Date().getDate() > 9
      ? new Date().getDate()
      : "0" + new Date().getDate();
  const year = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    let userOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch(links.backendURL + "comments", userOptions).then(response => {
      setToggleButton(true);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.home}>
      <Grid container spacing={3} className={classes.quizbutton}>
        <Grid item xs={6} className={classes.quizitems}>
          <Link
            to={`/datemonthquiz` + `/${day + "-0" + currentMonth + "-" + year}`}
          >
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                QUIZ {day + "-" + month}
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} className={classes.quizitems}>
          <Link
            to={`/quizresult` + `/${day + "-0" + currentMonth + "-" + year}`}
          >
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.quizResultButton}>
                QUIZ RESULT {day + "-" + month}
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} className={classes.quizitems}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                OLD QUIZ & RESULTS
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} className={classes.quizitems}>
          <Link to="/answerSheets">
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                Answer Sheets
              </Button>
            </Paper>
          </Link>
        </Grid>
      </Grid>
      <Card className={classes.formContainer}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <label className={classes.message}>
              यदि आपको उक्त QUIZ भरने में कोई तकनीकी समस्या आ रही है तो कृपया
              निम्न फार्म में समस्या का विवरण लिखें
            </label>
            {toggleButton === false ? (
              <React.Fragment>
                {" "}
                <div>
                  <label className={classes.mobilenumber}>Mobile Number</label>
                  <input
                    name="mobilenumber"
                    ref={register}
                    className={classes.mobileInput}
                  />
                </div>
                <label className={classes.comment}>Comment</label>
                <input
                  name="comment"
                  ref={register}
                  className={classes.feedbackInput}
                />
                <div className={classes.submitButton}>
                  <Button
                    variant="contained"
                    className={classes.feedbackButton}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </React.Fragment>
            ) : (
              <label className={classes.responseMessage}>
                Thanks for your comment, we will contact you soon.
              </label>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
