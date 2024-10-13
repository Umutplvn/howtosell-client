import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #6a6a6a",
  boxShadow: 12,
  pt: 4,
  px: 4,
  height: "35rem",
  overflow: "scroll",
};

export default function ReadNestedModal({ readOpen, setReadOpen, data }) {
  const handleReadClose = () => {
    setReadOpen(false);
  };

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <Box>
      <Modal
        open={readOpen}
        onClose={handleReadClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: "90%",
            maxWidth: "550px",
            borderRadius: "1rem",
          }}
        >
          {/* Q1 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              1.How old are you?*
            </Typography>

            <Typography sx={{ color: "#0445AF" }}>{data?.age}</Typography>
          </Box>

          {/* Q2 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              2.What's your First Name?*
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>
              {formatName(data?.name)}
            </Typography>
          </Box>

          {/* Q3 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              3.What's your Last Name?
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>
              {formatName(data?.lastname)}
            </Typography>
          </Box>

          {/* Q4 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              4.What's your best email?*
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.email}</Typography>
          </Box>
          {/* Q5 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              5.What's your WhatsApp Number?*
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.phone}</Typography>
          </Box>
          {/* Q6 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              6.What's your Instagram username?*
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.instagram}</Typography>
          </Box>
          {/* Q7 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              7.What's your current occupation?
            </Typography>

            <Typography sx={{ color: "#0445AF" }}>
              {data?.occupation}
            </Typography>
          </Box>
          {/* Q8 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              8.Please let us know a little bit about what exactly you do for a
              living?
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.descOfJob}</Typography>
          </Box>

          {/* Q9 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              9.What's your yearly income?(in USD)*
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.income}</Typography>
          </Box>

          {/* Q10 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              10.What are your goals for sales and business?{" "}
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.goal}</Typography>
          </Box>

          {/* Q11 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              11.What are the biggest obstacles that keep you from achieving
              your goal?*{" "}
            </Typography>
            <Typography sx={{ color: "#0445AF" }}>{data?.obstacles}</Typography>
          </Box>

          {/* Q12 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              12.How much money could you directly invest in achieving these
              goals, if you are 100% certain that you achieve them?*
            </Typography>

            <Typography sx={{ color: "#0445AF" }}>
              {data?.directInvest}
            </Typography>
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
              onClick={handleReadClose}
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
