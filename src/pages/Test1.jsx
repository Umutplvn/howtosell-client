import React, { useState, useRef } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../style/test1.css'; // CSS dosyasını oluşturun

const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'How old are you?',
    options: ['Under 18', '18-24', '24-34', '35-44', '45-54', '55+']
  },
  {
    id: 2,
    type: 'fill-in-the-blank',
    question: 'What is your favorite color?',
    placeholder: 'Enter your color'
  },
  // Daha fazla soru ekleyin
];

const Test1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');
  const [answers, setAnswers] = useState({});
  
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleInputChange = (event) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: event.target.value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      if (questions[currentQuestion].type === 'multiple-choice' && !selectedValue) {
        alert('Please make a selection!');
        return;
      }
      setAnswers((prev) => ({
        ...prev,
        [questions[currentQuestion].id]: selectedValue,
      }));
      setSelectedValue('');
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log('Answers:', answers);
      // Sonuçları işleyebilirsiniz
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <TransitionGroup>
        <CSSTransition
          key={currentQuestion}
          classNames="fade"
          timeout={300}
        >
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
                fontWeight: 'xl',
                textTransform: 'uppercase',
                fontSize: 'xs',
                letterSpacing: '0.15rem',
              }}
            >
              {questions[currentQuestion].question}
            </Typography>
            {questions[currentQuestion].type === 'multiple-choice' ? (
              <RadioGroup
                aria-labelledby="storage-label"
                size="lg"
                sx={{ gap: 1.5, width: "300px" }}
                value={selectedValue}
                onChange={handleRadioChange}
              >
                {questions[currentQuestion].options.map((value) => (
                  <Sheet key={value} sx={{ p: 2, borderRadius: 'md', boxShadow: 'sm' }}>
                    <Radio
                      label={`${value}`}
                      overlay
                      disableIcon
                      value={value}
                      slotProps={{
                        label: ({ checked }) => ({
                          sx: {
                            fontWeight: 'lg',
                            fontSize: 'md',
                            color: checked ? 'text.primary' : 'text.secondary',
                          },
                        }),
                      }}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
            ) : (
              <TextField
                variant="outlined"
                placeholder={questions[currentQuestion].placeholder}
                onChange={handleInputChange}
                sx={{ width: '300px', mt: 2 }}
              />
            )}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handlePrev} disabled={currentQuestion === 0}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Box>
        </CSSTransition>
      </TransitionGroup>
    </Box>
  );
};

export default Test1;
