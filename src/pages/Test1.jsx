import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  LinearProgress,
} from "@mui/material";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Sheet from "@mui/joy/Sheet";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../style/test1.css";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";

const Test1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [answers, setAnswers] = useState({});
  const [required, setRequired] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const progress = (currentQuestion / 11) * 100;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 400); 

  const [user, setUser] = useState({
    age: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    instagram: "",
    occupation: "",
    descOfJob: "",
    income: "",
    goal: "",
    obstacles: "",
    directInvest: "",
  });

  const handleResize = () => {
    setIsMobile(window.innerWidth < 400);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 


  useEffect(() => {
    setUser({
      age: answers[0] || "",
      name: answers[1] || "",
      lastname: answers[2] || "",
      email: answers[3] || "",
      phone: answers[4] || "",
      instagram: answers[5] || "",
      occupation: answers[6] || "",
      descOfJob: answers[7] || "",
      income: answers[8] || "",
      goal: answers[9] || "",
      obstacles: answers[10] || "",
      directInvest: answers[11] || "",
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
    const requiredQuestions = [0, 1, 3, 4, 5, 8, 10];

    if (
      requiredQuestions.includes(currentQuestion) &&
      (currentAnswer === undefined || currentAnswer === "")
    ) {
      setRequired(true);
      setErrorMessage("Please fill this in");
      return;
    }
    if (currentQuestion === 3 && !emailRegex.test(currentAnswer)) {
      setRequired(true);
      setErrorMessage("Email is not valid");
      return;
    }

    if (currentQuestion === 4 && currentAnswer.length <= 5) {
      setRequired(true);
      setErrorMessage("Please fill this in");
      return;
    }

    setRequired(false);
    setErrorMessage("");
    setCurrentQuestion((prev) => Math.min(prev + 1, 11)); //! Soru sayisini guncelle buradan
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    setRequired(false);
  };

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const currentAnswer = answers[currentQuestion];
    try {

    if (currentAnswer === undefined || currentAnswer === "") {
      setRequired(true);
      setErrorMessage("Please fill this in");
      return;
    }    
      const data=await axios.post('https://howtosell.onrender.com/create', user);
   console.log(data, data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  console.log("object", user);

  return (
    <Box sx={{ height: "100vh", overflow: "hidden", position: "relative" }}>
      <LinearProgress variant="determinate" value={progress} />
      <TransitionGroup>
        <CSSTransition key={currentQuestion} timeout={300} classNames="fade">
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              mt:"2rem",
              alignItems: "center",
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            {/* Question 0- Age* */}
            {currentQuestion === 0 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "400px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    1.
                  </span>
                  How old are you?*
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

            {/* Question 1 - Name */}
            {currentQuestion === 1 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    2.
                  </span>
                  What's your{" "}
                  <span style={{ fontWeight: "700" }}>First Name</span>?*
                </Typography>
                <TextField
                  autoFocus
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

            {/* Question 2 - Last name*/}
            {currentQuestion === 2 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    3.
                  </span>
                  What's your{" "}
                  <span style={{ fontWeight: "700" }}>Last Name</span>,{" "}
                  {formatName(user?.name)}?
                </Typography>
                <TextField
                  autoFocus
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

            {/* Question 3 - email */}
            {currentQuestion === 3 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    4.
                  </span>
                  What's your best email, {formatName(user?.name)}?*
                </Typography>
                <Typography
                  sx={{
                    width: {
                      xs: "300px",
                      sm: "500px",
                      mt: "-0.5rem",
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  (Where we can definitely reach out to you - make sure it is
                  100% correct)
                </Typography>
                <TextField
                  autoFocus
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

            {/* Question 4 - Number */}
            {currentQuestion === 4 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    5.
                  </span>
                  What's your WhatsApp Number, {formatName(user?.name)}?*
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
                  (Please check if the number is 100% correct, because we will
                  contact you there, if you qualify.)
                </Typography>
                <Box
                  sx={{
                    width: { xs: "300px", sm: "500px" },
                    height: "3rem",
                    mt: "3rem",
                    mb: "1rem",
                  }}
                >
                  <PhoneInput
                    autoFocus
                    defaultCountry="IRE"
                    defaultValue=""
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
                        color: "#0445AF",
                        fontSize: "1.2rem",
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
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    6.
                  </span>
                  What's your Instagram username, {formatName(user?.name)}?*
                </Typography>
                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="Type your answer here..."
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

            {/* Question 6 */}
            {currentQuestion === 6 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03em",
                    textAlign: "left",
                    width: { xs: "300px", sm: "400px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    7.
                  </span>
                  What's your current occupation, {formatName(user?.name)}?
                </Typography>
                <RadioGroup
                  sx={{ width: { xs: "300px", sm: "400px" }, gap: 1.5 }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleRadioChange}
                >
                  {[
                    "Student",
                    "Employee",
                    "Self-Employed / Business Owner",
                    "Currently Not Working",
                  ].map((value) => (
                    <Sheet
                      key={value}
                      sx={{ p: 2, borderRadius: "sm", boxShadow: "sm" }}
                    >
                      <Radio label={value} overlay disableIcon value={value} />
                    </Sheet>
                  ))}
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

            {/* Question 7 - what exactly you do*/}
            {currentQuestion === 7 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    8.
                  </span>
                  {formatName(user?.name)}, please let us know a little bit
                  about{" "}
                  <span style={{ fontWeight: "700" }}>
                    {" "}
                    what exactly you do for a living?
                  </span>
                </Typography>
                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="Type your answer here..."
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

            {/* Question 8 - Yearly Income */}
            {currentQuestion === 8 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    9.
                  </span>
                  What's your{" "}
                  <span style={{ fontWeight: "700" }}> yearly income?</span>(in
                  USD)*
                </Typography>
                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="Type your answer here..."
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

            {/* Question 9 - Income Goal */}
            {currentQuestion === 9 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    10.
                  </span>
                  What are your goals for sales and business,{" "}
                  {formatName(user?.name)}?
                  <br />
                  How much would you like to earn per year within next 12
                  months?
                </Typography>

                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="Type your answer here..."
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

            {/* Question 10 - Obstacle */}
            {currentQuestion === 10 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "500px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    11.
                  </span>
                  What are the{" "}
                  <span style={{ fontWeight: "700" }}>biggest obstacles</span>{" "}
                  that keep you from achieving your goal,{" "}
                  {formatName(user?.name)}?*
                </Typography>

                <TextField
                  autoFocus
                  variant="standard"
                  placeholder="Type your answer here..."
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
            {/* Question 11 - Direct Invest* */}
            {currentQuestion === 11 && (
              <>
                <Typography
                  sx={{
                    mb: 2,
                    fontWeight: "500",
                    fontSize: "1.3rem",
                    letterSpacing: "0.03rem",
                    textAlign: "left",
                    width: { xs: "300px", sm: "400px" },
                  }}
                >
                  <span style={{ color: "#0445AF", marginRight: "5px" }}>
                    12.
                  </span>
                  How much money could you{" "}
                  <span style={{ fontWeight: "700" }}>directly invest</span> in
                  achieving these goals, if you are 100% certain that you
                  achieve them?
                </Typography>

                <RadioGroup
                  sx={{ width: { xs: "300px", sm: "400px" }, gap: 1.5 }}
                  value={answers[currentQuestion] || ""}
                  onChange={handleRadioChange}
                >
                  {[
                    "Below $1000",
                    "$1000-$2000",
                    "$2000-$5000",
                    "$5000-$10,000",
                    "$10,000+",
                  ].map((value) => (
                    <Sheet
                      key={value}
                      sx={{ p: 2, borderRadius: "sm", boxShadow: "sm" }}
                    >
                      <Radio label={value} overlay disableIcon value={value} />
                    </Sheet>
                  ))}
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
                {(currentQuestion == 11 && !isMobile) && (
              <Box sx={{ display: "flex", justifyContent: "center", mt:"1.5rem" }}>
                <Button
                  variant="contained"
                  sx={{
                    width: "5rem",
                    backgroundColor: "#0445AF",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            )}
              </>
            )}
          </Box>
        </CSSTransition>
      </TransitionGroup>
      {/* Arrow Icons */}
      {isMobile ? (
        <Box
          sx={{
            position: "absolute",
            zIndex: 3,
            bottom: "1rem",
            width: "100%",
            p:"0.5rem",
            display:"flex",
            gap:"0.5rem",
          }}
        >
              <Button
                onClick={handlePrev}
                sx={{
                  backgroundColor: "#0544AF",
                  color: "white",
                  borderRadius: "0.5rem",
                  cursor: "pointer",

                }}
                disabled={currentQuestion === 0}
              >
                <ArrowBackIosIcon
                  style={{ color: currentQuestion === 0 ? "#adadad" : "white" }}
                />
              </Button>

              <Button
                onClick={handleNext}
                sx={{
                  backgroundColor: "#0544AF",
                  color: "white",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                  width:"80%"
                }}
                disabled={currentQuestion === 11}
              >
                {currentQuestion===11? 
                
                <Button sx={{color:"white", fontSize:"1.1rem"}} onClick={handleSubmit}>Submit</Button>
                : 
                <Typography sx={{color:"white", fontSize:"1.1rem"}}>OK</Typography>

               }

          </Button>
            </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            zIndex: 3,
            bottom: "1rem",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              width: "100%",
            }}
          >
          

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
                pr: "1rem",
              }}
            >
              <Button
                onClick={handlePrev}
                sx={{
                  backgroundColor: "#0544AF",
                  color: "white",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
                disabled={currentQuestion === 0}
              >
                <ExpandLessOutlinedIcon
                  style={{ color: currentQuestion === 0 ? "#adadad" : "white" }}
                />
              </Button>

              <Button
                onClick={handleNext}
                sx={{
                  backgroundColor: "#0544AF",
                  color: "white",
                  borderRadius: "0.5rem",
                  cursor: "pointer",
                }}
                disabled={currentQuestion === 11}
              >
                <ExpandMoreOutlinedIcon />
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Test1;
