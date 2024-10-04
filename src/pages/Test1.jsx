import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../style/test1.css";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const Test1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [answers, setAnswers] = useState({});
  const [required, setRequired] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [user, setUser] = useState({
    Age: "",
    Name: "",
    Lastname: "",
    Email: "",
    Phone:"",
    Instagram:""
  });

  useEffect(() => {
    setUser({
      Age: answers[0] || "",
      Name: answers[1] || "",
      Lastname: answers[2] || "",
      Email: answers[3] || "",
      Phone:answers[4]||"",
      Instagram:answers[5]||""
    });
  }, [answers]);

  console.log(user);

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
    setRequired(false);
  };

  const handleNext = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const currentAnswer = answers[currentQuestion];

    if (currentAnswer === undefined || currentAnswer === "") {
      setRequired(true);
      setErrorMessage("Please fill this in");
      return;
    }

    if (currentQuestion === 3 && !emailRegex.test(currentAnswer)) {
      setRequired(true);
      setErrorMessage("Email is not valid.");
      return;
    }

    setRequired(false);
    setErrorMessage(""); 
    setCurrentQuestion((prev) => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    setRequired(false);
  };

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <Box sx={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      <TransitionGroup>
        <CSSTransition key={currentQuestion} timeout={300} classNames="fade">
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
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.1rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "400px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    1.
                  </span>
                  How old are you?
                </Typography>
                <RadioGroup
                  sx={{ width: { xs: "300px", sm: "400px" }, gap: 1.5 }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleRadioChange}
                >
                  {["Under 18", "18-24", "25-34", "35-44", "45-54", "55+"].map(
                    (value) => (
                      <Sheet
                        key={value}
                        sx={{ p: 2, borderRadius: "sm", boxShadow: "sm" }}
                      >
                        <Radio
                          label={value}
                          overlay
                          disableIcon
                          value={value}
                        />
                      </Sheet>
                    )
                  )}
                </RadioGroup>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "400px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        Please fill this in
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 1 */}
            {currentQuestion === 1 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.1rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    2.
                  </span>
                  What's your First Name?
                </Typography>
                <TextField
                  variant="standard"
                  placeholder="Jane"
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        Please fill this in
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 2 */}
            {currentQuestion === 2 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.1rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    3.
                  </span>
                  What's your Last Name, {formatName(user?.Name)}?
                </Typography>
                <TextField
                  variant="standard"
                  placeholder="Smith"
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        Please fill this in
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 3 */}
            {currentQuestion === 3 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.1rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    4.
                  </span>
                  What's your email, {formatName(user?.Name)}?
                </Typography>
                <Typography
                  sx={{
                    width: {
                      xs: "300px",
                      sm: "500px",
                      mt: "-0.5rem",
                      fontSize: "0.85rem",
                    },
                  }}
                >
                  (Where we can definitely reach out to you - make sure it is
                  100% correct)
                </Typography>
                <TextField
                  variant="standard"
                  type="email"
                  placeholder="name@example.com"
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {errorMessage}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

            {/* Question 4 */}
            {currentQuestion === 4 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.1rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    5.
                  </span>
                  What's your WhatsApp Number, {formatName(user?.Name)}?
                </Typography>
                <Typography
                  sx={{
                    width: {
                      xs: "300px",
                      sm: "500px",
                      mt: "-0.5rem",
                      fontSize: "0.85rem",
                    },
                  }}
                >
                  (Please check if the number is 100% correct, because we will contact you there, if you qualify.)
                </Typography>
<Box sx={{  width: { xs: "300px", sm: "500px"}, height:"3rem", mt:"3rem", mb:"1rem"
}}>

<PhoneInput
    defaultCountry="IRE"
    value={answers[currentQuestion] || ""}
    onChange={(value) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: value,
      }));
      setRequired(false);
    }}
    inputProps={{
      style: {
        width: "100%",
        color:"#0445AF",
        fontSize:"1.2rem"
      },
    }}
  />
</Box>

              


                {/* <TextField
                  variant="standard"
                  type="email"
                  placeholder="name@example.com"
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                /> */}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {errorMessage}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}

              {/* Question 5 */}
              {currentQuestion === 5 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.1rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    6.
                  </span>
                  What's your Instagram username, {formatName(user?.Name)}?
                </Typography>
                <TextField
                  variant="standard"
                  placeholder="Smith"
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    mt: 2,
                    "& .MuiInputBase-input": {
                      color: "#0445AF",
                      fontSize: "1.2rem",
                    },
                  }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleInputChange}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  {required ? (
                    <Box
                      sx={{
                        backgroundColor: "#F7E6E5",
                        color: "#bc1616",
                        p: "0.5rem",
                        mt: "0.5rem",
                        mb: "-1rem",
                        borderRadius: "0.2rem",
                        width: "9rem",
                        textAlign: "center",
                        display: "flex",
                        gap: "0.2rem",
                      }}
                    >
                      <WarningRoundedIcon style={{ fontSize: "0.98rem" }} />
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        Please fill this in
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ height: "2rem" }}></Box>
                  )}
                </Box>
              </>
            )}




          </Box>
        </CSSTransition>
      </TransitionGroup>
      {/* Arrow Icons */}
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
            visibility: currentQuestion === 0 ? "hidden" : "visible",
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
