import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Box, Typography, Button, TextField } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

const questions = [
  {
    id: 1,
    type: "multiple-choice",
    question: "How old are you?",
    options: ["Under 18", "18-24", "24-34", "35-44", "45-54", "55+"],
    validate: (value) => !!value,
  },
  {
    id: 2,
    type: "fill-in-the-blank",
    question: "What is your First Name?",
    placeholder: "Jane",
    validate: (value) => !!value,
  },
  {
    id: 3,
    type: "fill-in-the-blank",
    question: "What is your Last Name?",
    placeholder: "Smith",
    validate: (value) => !!value,
  },
  {
    id: 4,
    type: "fill-in-the-blank",
    question: "What's your email address?",
    placeholder: "name@example.com",
    validate: (value) => /^\S+@\S+\.\S+$/.test(value), // Email doğrulama
  },
  {
    id: 5,
    type: "fill-in-the-blank",
    question: "What's your WhatsApp Number?",
    placeholder: "+353 (_ _)",
    validate: (value) => /^\+\d{1,3}\s?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(value), // Telefon numarası doğrulama
  },
];

const Test1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [answers, setAnswers] = useState({});
  const [required, setRequired] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setRequired(false);
  };

  const handleInputChange = (event) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: event.target.value,
    }));
    setRequired(false);
  };

  const handleNext = () => {
    const currentQuestionData = questions[currentQuestion];

    if (currentQuestion < questions.length - 1) {
      if (!currentQuestionData.validate(selectedValue || answers[currentQuestionData.id])) {
        setRequired(true);
        return;
      }

      setAnswers((prev) => ({
        ...prev,
        [currentQuestionData.id]: selectedValue || answers[currentQuestionData.id],
      }));
      setSelectedValue("");
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Answers:", answers);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedValue(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <TransitionGroup>
        <CSSTransition key={currentQuestion} classNames="fade" timeout={300}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                mb: 2,
                fontWeight: "xl",
                fontSize: "xs",
                letterSpacing: "1px",
                width: "300px",
              }}
            >
              {questions[currentQuestion].question}
            </Typography>
            {questions[currentQuestion].type === "multiple-choice" ? (
              <RadioGroup
                aria-labelledby="storage-label"
                size="lg"
                sx={{ gap: 1.5, width: "300px" }}
                value={
                  selectedValue || answers[questions[currentQuestion].id] || ""
                }
                onChange={handleRadioChange}
              >
                {questions[currentQuestion].options.map((value) => (
                  <Sheet
                    key={value}
                    sx={{ p: 2, borderRadius: "md", boxShadow: "sm" }}
                  >
                    <Radio
                      label={`${value}`}
                      overlay
                      disableIcon
                      value={value}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
            ) : (
              <TextField
                variant="outlined"
                placeholder={questions[currentQuestion].placeholder}
                value={answers[questions[currentQuestion].id] || ""}
                onChange={handleInputChange}
                sx={{ width: "300px", mt: 2 }}
              />
            )}
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "300px" }}
            >
              {required ? (
                <Box  sx={{
                  backgroundColor: "#F7E6E5",
                  color: "#bc1616",
                  p: "0.5rem",
                  mt: "0.5rem",
                  mb: "-1rem",
                  borderRadius: "0.2rem",
                  width: "9rem",
                  textAlign: "center",
                  display:"flex",
                  gap:"0.2rem"
                }}>
                  <WarningRoundedIcon style={{fontSize:"0.98rem"}}/>
                  <Typography
                   sx={{fontSize: "0.8rem"}}
                  >
                    Please fill this in
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ height: "1.7rem" }}></Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 3,
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </CSSTransition>
      </TransitionGroup>
    </Box>
  );
};

export default Test1;
