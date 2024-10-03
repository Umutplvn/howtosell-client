import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../style/test1.css"; // CSS dosyanızı ekleyin

const Test1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [answers, setAnswers] = useState({});
  const [required, setRequired] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: event.target.value,
    }));
    setRequired(false);
  };

  const handleInputChange = (event) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: event.target.value,
    }));
  };

  const handleNext = () => {
    if (answers[currentQuestion] === undefined || answers[currentQuestion] === "") {
      setRequired(true);
      return;
    }
    setRequired(false);
    setCurrentQuestion((prev) => Math.min(prev + 1, 2)); //! Kac soru oldugunu guncelle
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  console.log(answers);
  return (
    <Box sx={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      <TransitionGroup>
        <CSSTransition
          key={currentQuestion}
          timeout={300}
          classNames="fade" // CSS sınıfı
        >
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              transition: "opacity 0.3s ease-in-out",
            }}
          >
{/* Question 0 */}
{currentQuestion === 0 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "xl",
                    textTransform: "uppercase",
                    fontSize: "xs",
                    letterSpacing: "0.15rem",
                    textAlign: "left",
                    width: "300px",
                  }}
                >
                  How old are you?
                </Typography>
                <RadioGroup
                  sx={{ width: "300px", gap: 1.5 }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleRadioChange}
                >
                  {["Under 18", "18-24", "25-34", "35-44", "45-54", "55+"].map(
                    (value) => (
                      <Sheet key={value} sx={{ p: 2, borderRadius: "md", boxShadow: "sm" }}>
                        <Radio label={value} overlay disableIcon value={value} />
                      </Sheet>
                    )
                  )}
                </RadioGroup>
                {required && (
                  <Typography sx={{ color: "red", mt: 2 }}>
                    Please answer this question.
                  </Typography>
                )}
              </>
            )}
{/* Question 1 */}
{currentQuestion === 1 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "xl",
                    textTransform: "uppercase",
                    fontSize: "xs",
                    letterSpacing: "0.15rem",
                    textAlign: "left",
                    width: "300px",
                  }}
                >
                  What's your First Name?
                </Typography>
                <TextField
                  variant="outlined"
                  sx={{ width: "300px", mt: 2 }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                />
                {required && (
                  <Typography sx={{ color: "red", mt: 2 }}>
                    Please answer this question.
                  </Typography>
                )}
              </>
            )}

{/* Question 2 */}
            {currentQuestion === 2 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "xl",
                    textTransform: "uppercase",
                    fontSize: "xs",
                    letterSpacing: "0.15rem",
                    textAlign: "left",
                    width: "300px",
                  }}
                >
                  What's your Last Name?
                </Typography>
                <TextField
                  variant="outlined"
                  sx={{ width: "300px", mt: 2 }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                />
                {required && (
                  <Typography sx={{ color: "red", mt: 2 }}>
                    Please answer this question.
                  </Typography>
                )}
              </>
            )}


          </Box>
        </CSSTransition>
      </TransitionGroup>


//! Arrow Icons
      <Box
        sx={{
          position: "fixed",
          zIndex: 3,
          bottom: "2rem",
          right: "2rem",
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
        <ArrowUpwardIcon
          onClick={handlePrev}
          sx={{
            backgroundColor: "#0544AF",
            color: "white",
            borderRadius: "0.5rem",
            fontSize: "2rem",
            p: "0.2rem",
            cursor: "pointer",
            visibility: currentQuestion === 0 ? "hidden" : "visible", // İlk soruda yukarı oku gizle
          }}
        />
        <ArrowDownwardIcon
          onClick={handleNext}
          sx={{
            backgroundColor: "#0544AF",
            color: "white",
            borderRadius: "0.5rem",
            fontSize: "2rem",
            p: "0.2rem",
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
};

export default Test1;
