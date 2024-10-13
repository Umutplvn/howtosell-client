import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #6a6a6a",
  boxShadow: 12,
  pt: 2,
  px: 4,
};

export default function NestedModal({ clientOpen, setClientOpen }) {
  const handleClientClose = () => {
    setClientOpen(false);
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const [info, setInfo] = useState({
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
  console.log(info);

  return (
    <Box>
      <Modal
        open={clientOpen}
        onClose={handleClientClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500, borderRadius: "1rem" }}>
         
         
         
         
         
          <Box sx={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}>
            <Typography
              sx={{
                fontWeight: "700",
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              2.What's your First Name?*
            </Typography>
            <TextField
              variant="standard"
              sx={{
                width: "90%",
              }}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 4,
                mb: 5,
                textAlign: "center",
                backgroundColor: "#000000",
                color: "white",
                borderRadius: "0.7rem",
                width: "5rem",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "#37a629",
                  color: "white",
                },
              }}
              //   onClick={}
            >
              submit
            </Button>

            <Button
              type="submit"
              variant="contained"
              onClick={handleClientClose}
              sx={{
                mt: 4,
                mb: 5,
                textAlign: "center",
                backgroundColor: "#000000",
                color: "white",
                borderRadius: "0.7rem",
                width: "5rem",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "#bc3a3a",
                  color: "white",
                },
              }}
            >
              close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
