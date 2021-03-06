import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { v5 as uuidv5 } from "uuid";
import { links } from "../Config";

import { useForm } from "react-hook-form/dist/react-hook-form.ie11";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
const error = red[700];

const useStyles = makeStyles(theme => ({
  container: {
    border: "1px solid #cfd8dc",
    boxShadow: "7px 5px #eeeeee",
    top: 176,
    position: "absolute",
    maxWidth: "45%",
    marginBottom: 75,
    left: "30%",
    width: "100%"
  },
  questionfields: {
    border: "1px solid #cfd8dc",
    boxShadow: "7px 5px #eeeeee",
    margin: 11,
    display: "block",
    "&:hover": {
      backgroundColor: "#fafafa"
    }
  },
  questionContent: {
    marginLeft: "-1%"
  },
  questionOption: {
    marginLeft: "3%"
  },
  input: {
    boxShadow: "7px 5px #eeeeee",
    display: "block",
    width: "97%",
    borderRadius: 4,
    border: "1px solid #bdbdbd",
    backgroundColor: "#e9ecef40",
    padding: "10px 15px",
    margin: 10,
    fontSize: 14
  },
  label: {
    lineHeight: 2,
    textAlign: "left",
    display: "block",
    marginBottom: 13,
    marginTop: 20,
    fontSize: 19,
    color: "black",
    fontWeight: 500,
    marginLeft: 14,
    fontFamily: "sans-serif"
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    marginLeft: 15,
    width: 123,
    marginTop: 13,
    height: 44,
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  },
  error: {
    color: "#bf1650",
    "&::before": {
      content: "'⚠ '"
    }
  },
  asteriskField: {
    marginLeft: 24,
    color: error
  },
  radioButton: {
    height: 12,
    marginRight: 13
  },
  optionLabel: {
    width: "100%"
  },
  [theme.breakpoints.down("361")]: {
    container: {
      maxWidth: "100%",
      top: 176,
      marginBottom: "22%",
      left: "0%"
    },
    input: {
      width: "100%",
      margin: 0,
      fontSize: 17,
      padding: "8px 8px",
      boxShadow: "3px 3px #eeeeee"
    },
    label: {
      marginBottom: 2,
      marginTop: 4,
      fontSize: 19,
      marginLeft: 8
    },
    asteriskField: {
      fontSize: 19,
      marginLeft: "4%"
    },
    questionfields: {
      boxShadow: "3px 3px #eeeeee",
      margin: 6
    },
    questionContent: {
      marginLeft: "0%",
      maxWidth: "100%"
    },
    questionOption: {
      marginLeft: "3%",
      fontSize: 18
    },
    radioButton: {
      height: 16
    },
    questionLabel: {
      fontSize: 19
    },

    button: {
      width: 102,
      marginTop: 8,
      marginLeft: 7,
      height: 44,
      fontSize: 19
    },
    error: {
      fontSize: 9
    },
    optionLabel: {
      paddingLeft: 8
    }
  },

  [theme.breakpoints.between("361", "xs")]: {
    container: {
      maxWidth: "100%",
      top: 176,
      marginBottom: "22%",
      left: "0%"
    },
    input: {
      width: "100%",
      margin: 0,
      fontSize: 21,
      padding: "5px 8px",
      boxShadow: "4px 4px #eeeeee"
    },
    label: {
      marginBottom: 3,
      marginTop: 3,
      fontSize: 22,
      marginLeft: 8
    },
    asteriskField: {
      fontSize: 21,
      marginLeft: "4%"
    },
    questionfields: {
      boxShadow: "4px 3px #eeeeee",
      margin: 7
    },
    questionContent: {
      marginLeft: "0%",
      maxWidth: "100%"
    },
    questionOption: {
      marginLeft: "3%",
      fontSize: 21
    },
    radioButton: {
      height: 18
    },
    questionLabel: {
      fontSize: 22
    },
    button: {
      width: 107,
      marginTop: 7,
      marginLeft: 8,
      height: 46,
      fontSize: 21
    },
    error: {
      fontSize: 20
    },
    optionLabel: {
      paddingLeft: 8
    }
  }
}));

function QuizForm(props) {
  const classes = new useStyles();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    setError
  } = useForm();
  const [questions, setQuestions] = useState([]);
  const [questionsId, setQuestionsId] = useState([]);
  const [loading, setLoading] = useState(true);
  let result = "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const questionsArray = [];
    const queastionsIdArray = [];
    const date = props.match.params.date;
    fetch(links.backendURL + "questions?date=" + `${date}`)
      .then(questionsJosn => {
        return questionsJosn.json();
      })
      .then(questions => {
        questions.map(question => {
          queastionsIdArray.push(question.id);
          questionsArray.push(question.questions);
        });
        setQuestionsId(queastionsIdArray);
        setQuestions(questionsArray);
        setLoading(false);
      });
  }, []);

  const calcaulateScore = (rightAns, userAns, usersResponse) => {
    let score = 0;
    let usersArray = [];
    rightAns.map(answers => {
      answers.map(answer => {
        let usersJson = {};
        usersJson["question"] = answer.question;
        usersJson["answer"] = userAns.get(answer.question);
        usersJson["_id"] = uuidv5(answer.question, uuidv5.DNS);
        if (
          userAns.get(answer.question).toLowerCase() ===
          answer.answer.toLowerCase()
        ) {
          score++;
        }
        usersArray.push(usersJson);
      });
    });
    usersResponse["score"] = score * 2;
    usersResponse["answers"] = usersArray;
    return usersResponse;
  };
  const patchUserResponse = (
    userresponse,
    detailedUserResponse,
    uuid,
    date,
    score
  ) => {
    let userOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userresponse)
    };
    console.log(
      links.backendURL + "usersresponse?" + `date=${date}` + `&update=true`
    );
    fetch(
      links.backendURL + "usersresponse?" + `date=${date}` + `&update=true`,
      userOptions
    )
      .then(response => {
        console.log(response.status);
        alert("your score is : " + score);
        history.push(`/yourresponse/${uuid}/${date}`, detailedUserResponse);
      })
      .catch(error => console.log("error is", error));
  };

  const onSubmit = (data, ques, quesId) => {
    var myMap = new Map();
    for (const key in data) {
      myMap.set(key, data[key]);
    }
    const time = new Date().toLocaleString();
    const uuid = uuidv5(
      myMap.get("fullname") + myMap.get("mobile"),
      uuidv5.DNS
    );
    let userResponseJson = {};
    userResponseJson["time"] = time;
    userResponseJson["comment"] = "";
    userResponseJson["userId"] = uuid;
    userResponseJson = calcaulateScore(ques, myMap, userResponseJson);
    const date = props.match.params.date;
    let usersJson = {};
    usersJson["fullname"] = myMap.get("fullname");
    usersJson["city"] = myMap.get("city");
    usersJson["mobile"] = myMap.get("mobile");
    usersJson["address"] = myMap.get("address");
    usersJson["userId"] = uuid;
    const userData = Object.assign(data, {
      id: uuid,
      score: userResponseJson["score"],
      time
    });
    fetch(links.backendURL + "users?" + `&userId=${uuid}`)
      .then(response => {
        return response.json();
      })
      .then(count => {
        if (count == 1) {
          fetch(
            links.backendURL +
            "usersresponse?" +
            `date=${date}` +
            `&userId=${uuid}`
          )
            .then(response => {
              return response.json();
            })
            .then(userexists => {
              if (userexists) {
                alert("user already exists");
                return;
              } else {
                patchUserResponse(
                  userResponseJson,
                  userData,
                  uuid,
                  date,
                  userResponseJson["score"]
                );
              }
            });
        } else {
          let userOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usersJson)
          };
          fetch(links.backendURL + "users", userOptions).then(response => {
            patchUserResponse(
              userResponseJson,
              userData,
              uuid,
              date,
              userResponseJson["score"]
            );
          });
        }
      })
      .catch(error => console.log("error is", error));
  };
  const reactStringReplace = require("react-string-replace");

  return (
    <Card className={classes.container}>
      <CardContent>
        <form
          onSubmit={handleSubmit(data =>
            onSubmit(data, questions, questionsId)
          )}
        >
          <Typography
            variant="h9"
            component="h9"
            className={classes.asteriskField}
          >
            * Required field
          </Typography>

          <label className={classes.label}>
            {reactStringReplace("Mobile No. *", new RegExp(/(\*)/g),
              (match, i) => (
                <span key={i} style={{ color: error }}> {match} </span>
              ))}
          </label>
          <input
            className={classes.input}
            placeholder="Mobile Number"
            name="mobile"
            ref={register({ required: true })}
          />
          {errors.mobile && (
            <p className={classes.error}>This field is required</p>
          )}
          <label className={classes.label}>
            {reactStringReplace("Full Name *", new RegExp(/(\*)/g),
              (match, i) => (
                <span key={i} style={{ color: error }}> {match} </span>
              ))}
          </label>
          <input
            className={classes.input}
            placeholder="Full Name"
            name="fullname"
            ref={register({ required: true })}
          />
          {errors.fullname && (
            <p className={classes.error}> This field is required</p>
          )}
          <label className={classes.label}>
            {reactStringReplace("City/Town/Village *", new RegExp(/(\*)/g),
              (match, i) => (
                <span key={i} style={{ color: error }}> {match} </span>
              ))}
          </label>
          <input
            className={classes.input}
            placeholder="City"
            name="city"
            ref={register({ required: true })}
          />
          {errors.city && (
            <p className={classes.error}>This field is required</p>
          )}
          <label className={classes.label}>
            {reactStringReplace("Address In Short *", new RegExp(/(\*)/g),
              (match, i) => (
                <span key={i} style={{ color: error }}> {match} </span>
              ))}
          </label>
          <input
            className={classes.input}
            placeholder="Address"
            name="address"
            ref={register({ required: true })}
          />
          {errors.address && (
            <p className={classes.error}>This field is required</p>
          )}

          {questions.map(question => {
              return question.map((row, index) => (
                <Card className={classes.questionfields}>
                  <CardContent>
                    <fieldset>
                      <fieldset className={classes.questionContent}>
                        <label className={classes.questionLabel}>
                          {index + 1}. {row.question}
                          {reactStringReplace("*" , new RegExp(/(\*)/g), 
                            (match, i) => (
                              <span key={i} style={{ color: error }}> {match} </span>
                            ))}
                        </label>
                      </fieldset>
                      <fieldset className={classes.questionOption}>
                        <label className={classes.optionLabel}>
                          <input
                            type="radio"
                            className={classes.radioButton}
                            value="YES"
                            name={row.question}
                            ref={register({ required: true })}
                            label="YES"
                          />
                        YES
                      </label>
                      </fieldset>
                      <fieldset className={classes.questionOption}>
                        <label className={classes.optionLabel}>
                          <input
                            type="radio"
                            className={classes.radioButton}
                            value="NO"
                            name={row.question}
                            ref={register({ required: true })}
                          />
                        NO
                      </label>
                      </fieldset>
                      {errors[row.question] && (
                        <p className={classes.error}>This field is required</p>
                      )}
                    </fieldset>

                  </CardContent>
                </Card>
              ));
            }

            )}


          <Card className={classes.questionfields}>
            <CardContent>
              <fieldset className={classes.questionContent}>
                <label className={classes.label}>
                  आपको यह क्विज एप्लिकेशन कैसी लगी|
                </label>
              </fieldset>

              <fieldset className={classes.questionOption}>
                <label className={classes.optionLabel}>
                  <input
                    type="radio"
                    className={classes.radioButton}
                    value="उत्कृष्ट"
                    name="feedback"
                    ref={register({ required: true })}
                  />
                        उत्कृष्ट
                      </label>
              </fieldset>

              <fieldset className={classes.questionOption}>
                <label className={classes.optionLabel}>
                  <input
                    type="radio"
                    className={classes.radioButton}
                    value="बहुत अच्छी"
                    name="feedback"
                    ref={register({ required: true })}
                  />
                        बहुत अच्छी
                      </label>
              </fieldset>

              <fieldset className={classes.questionOption}>
                <label className={classes.optionLabel}>
                  <input
                    type="radio"
                    className={classes.radioButton}
                    value="अच्छी"
                    name="feedback"
                    ref={register({ required: true })}
                  />
                        अच्छी
                      </label>
              </fieldset>

              <fieldset className={classes.questionOption}>
                <label className={classes.optionLabel}>
                  <input
                    type="radio"
                    className={classes.radioButton}
                    value="औसत"
                    name="feedback"
                    ref={register({ required: true })}
                  />
                        औसत
                      </label>
              </fieldset>
            </CardContent>
          </Card>
          <Button variant="contained" className={classes.button} type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default QuizForm;
