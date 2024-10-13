import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import useDataCall from '../hooks/useDataCall'
import { toast } from "react-hot-toast";

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

export default function NestedModal({ clientOpen, setClientOpen }) {

const {createClient}=useDataCall()

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


  const handleSubmit = () => {

    if(!info.age||!info.name||!info.email||!info.phone||!info.instagram||!info.income||!info.obstacles||!info.directInvest ){
        toast.error('Please fill required fields')
    }else{
        createClient(info)
        setInfo({
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
          })
        handleClientClose()
    }
    


  };

  return (
    <Box>
      <Modal
        open={clientOpen}
        onClose={handleClientClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width:"90%", maxWidth:"550px", borderRadius: "1rem" }}>
          {/* Q1 */}
          <Box sx={{ mb: "1rem" }}>
            <Typography
              sx={{
                fontWeight: "700",
              }}
            >
              1.How old are you?*
            </Typography>

            <FormControl sx={{ width: "100%" }}>
              <NativeSelect
                onChange={(e) => handleChange(e)}
                name="age"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select your age group
                </option>

                <option value={"under 18"}>Under 18</option>
                <option value={"18-24"}>18-24</option>
                <option value={"25-34"}>25-34</option>
                <option value={"35-44"}>35-44</option>
                <option value={"45-54"}>45-54</option>
                <option value={"55+"}>55+</option>
              </NativeSelect>
            </FormControl>
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
            <TextField
              required
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="name"
              onChange={(e) => handleChange(e)}
            />
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
            <TextField
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="lastname"
              onChange={(e) => handleChange(e)}
            />
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
            <TextField
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="email"
              onChange={(e) => handleChange(e)}
            />
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
            <TextField
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="phone"
              onChange={(e) => handleChange(e)}
            />
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
            <TextField
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="instagram"
              onChange={(e) => handleChange(e)}
            />
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

            <FormControl sx={{ width: "100%" }}>
              <NativeSelect
                onChange={(e) => handleChange(e)}
                name="occupation"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select your occupation
                </option>

                <option value={"Student"}>Student</option>
                <option value={"Employee"}>Employee</option>
                <option value={"Self-Employed/Business Owner"}>
                  Self-Employed/Business Owner
                </option>
                <option value={"Currently Not Working"}>
                  Currently Not Working
                </option>
              </NativeSelect>
            </FormControl>
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
            <TextField
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="descOfJob"
              onChange={(e) => handleChange(e)}
            />
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
            <TextField
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="income"
              onChange={(e) => handleChange(e)}
            />
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
            <TextField
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="goal"
              onChange={(e) => handleChange(e)}
            />
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
            <TextField
              variant="standard"
              sx={{
                width: "100%",
              }}
              name="obstacles"
              onChange={(e) => handleChange(e)}
            />
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

            <FormControl sx={{ width: "100%" }}>
              <NativeSelect
                onChange={(e) => handleChange(e)}
                name="directInvest"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select your answer
                </option>

                <option value={"Below $1000"}>Below $1000</option>
                <option value={"$1000-$2000"}>$1000-$2000</option>
                <option value={"$2000-$5000"}>$2000-$5000</option>
                <option value={"$5000-$10,000"}>$5000-$10,000</option>
                <option value={"10,000+"}>10,000+</option>
              </NativeSelect>
            </FormControl>
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
              onClick={handleSubmit}
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
