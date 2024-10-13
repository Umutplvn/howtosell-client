import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ModalUnstyled from "../components/DeleteClientModal";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import useDataCall from "../hooks/useDataCall";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NestedModal from "./CreateClientModal";
import ReadNestedModal from "./ReadClientModal";
import OpenWithIcon from "@mui/icons-material/OpenWith";

const Members = () => {
  const { name } = useSelector((state) => state?.auth);
  const { clients } = useSelector((state) => state?.appData);
  const { listClients, updateClient } = useDataCall();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [readOpen, setReadOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [clientOpen, setClientOpen] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    listClients();
  }, []);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };
  const handleClientOpen = () => {
    setClientOpen(true);
  };

  const handleReadFucn = (row) => {
    setReadOpen(true);
    setData(row);
  };

  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const contFunc = (userId) => {
    updateClient(userId.userId, {
      updateData: { connected: true, connectedBy: name },
    });
  };

  const noContFunc = (userId) => {
    updateClient(userId.userId, {
      updateData: { connected: false, connectedBy: "-" },
    });
  };

  const filterUsers = clients?.filter(
    (item) =>
      item?.name.toLowerCase().includes(search.toLowerCase()) ||
      item?.email.toLowerCase().includes(search.toLowerCase()) ||
      item?.lastname.toLowerCase().includes(search.toLowerCase())
  );

  const cellStyle = {
    height: "3rem",
    overflow: "scroll",
    minWidth: "200px",
    m: "-0.5rem"
  };

  const stickyStyle={ position: 'sticky', top: 0, backgroundColor: '#f8f8f8'
}


  const handleExport = () => {
    const data = filterUsers?.map((user) => ({
      "How old are you?": user.age,
      "What's your First Name?": formatName(user.name),
      "What's your Last Name, ___?": user.lastname,
      "What's your best email, ___?": user.email,
      "What's your WhatsApp Number,____?": user.phone,
      "What's your Instagram username, ____?": user.instagram,
      "What's your current occupation, ____?": user.occupation,
      "____, please let us know a little bit about what exactly you do for a living?":
        user.descOfJob,
      "What's your yearly income?(in USD)": user.income,
      "What are your goals for sales and business, ____?": user.goal,
      "What are the biggest obstacles that keep you from achieving your goal, ____?":
        user.obstacles,
      "How much money could you directly invest in achieving these goals, if you are 100% certain that you achieve them?":
        user.directInvest,
      "Contacted Customer": user.connected,
      "Contacted By":user.connectedBy,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    XLSX.writeFile(workbook, "Clients.xlsx");
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100wh",
          display: "flex",
          justifyContent: "center",
          pt: "2rem",
          mb: "2rem",
        }}
      >
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          variant="outlined"
          sx={{
            width: { xs: "15rem", md: "20rem" },
            borderRadius: "2rem",
            "& .MuiOutlinedInput-root": {
              height: "2.2rem",
              "& fieldset": {
                borderColor: "black",
                borderRadius: "2rem",
              },
              "&:hover fieldset": {
                borderColor: "#FE5E00",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FE5E00",
              },
              "& input": {
                height: "auto",
                padding: "0.75rem",
              },
            },
          }}
        />
      </Box>

      <Box
        sx={{
          overflow: "scroll",
          m: "auto",
          width: `75vw`,
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "1rem",
            overflow: "scroll",
            m: "auto",
            height: "55vh",
          }}
        >
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead sx={{position:"sticky", pb:"4rem"}}>
              <TableRow sx={cellStyle}>
                <TableCell sx={stickyStyle}></TableCell>

                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>How old are you?</Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    What's your First Name?
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    What's your Last Name, ___?
                  </Typography>
                </TableCell>

                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    What's your best email, ___?
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    What's your WhatsApp Number, ____?
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    What's your Instagram username, ____?
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    What's your current occupation, ____?
                  </Typography>
                </TableCell>

                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    ____, please let us know a little bit about what exactly you
                    do for a living?
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    What's your yearly income?(in USD)
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    What are your goals for sales and business, ____?
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    What are the biggest obstacles that keep you from achieving
                    your goal, ____?
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={cellStyle}>
                    How much money could you directly invest in achieving these
                    goals, if you are 100% certain that you achieve them?
                  </Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={{ width: "80px" }}>Contacted</Typography>
                </TableCell>
                <TableCell align="left" sx={stickyStyle}>
                  <Typography sx={{ width: "100px" }}>Contacted By</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {filterUsers?.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.5rem",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "600",
                          color: "#0445AF",
                        }}
                      >
                        {index + 1})
                      </Typography>{" "}
                      <CancelIcon
                        onClick={() => handleOpen(row)}
                        sx={{
                          color: "#4b4b4b",
                          ":hover": {
                            cursor: "pointer",
                            transform: "scale(1.04)",
                            color: "#c72525",
                            transition:
                              "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                          },
                        }}
                      />
                      <OpenWithIcon
                        onClick={() => handleReadFucn(row)}
                        sx={{
                          color: "#4b4b4b",
                          ":hover": {
                            cursor: "pointer",
                            transform: "scale(1.04)",
                            color: "#0aaf04",
                            transition:
                              "transform 0.2s ease-in-out, color 0.2s ease-in-out",
                          },
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>
                      {formatName(row.age)}
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography sx={cellStyle}>
                      {formatName(row.name)}
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography sx={cellStyle}>
                      {formatName(row.lastname)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.email}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.phone}</Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.instagram}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.occupation}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.descOfJob}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.income}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.goal}</Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.obstacles}</Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography sx={cellStyle}>{row.directInvest}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    {row.connected ? (
                      <ThumbUpAltIcon
                        onClick={() => noContFunc({ userId: row._id })}
                        sx={{
                          color: "#24a062",
                          fontSize: "0.95rem",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <ThumbDownIcon
                        onClick={() => contFunc({ userId: row._id })}
                        sx={{
                          color: "#cc2525",
                          fontSize: "0.95rem",
                          cursor: "pointer",
                        }}
                      />
                    )}{" "}
                  </TableCell>

                  <TableCell sx={{ minWidth: "150px" }} align="left">
                    {formatName(row.connectedBy)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 4,
              mb: 5,
              textAlign: "center",
              backgroundColor: "#F2F2F2",
              color: "#494b56",
              borderRadius: "0.7rem",
              width: "8rem",
              transition: "0.4s",

              "&:hover": {
                backgroundColor: "#000000",
                color: "white",
              },
            }}
            onClick={handleClientOpen}
          >
            <AddCircleIcon sx={{ mr: "0.5rem" }} />
            CREATE
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 4,
              mb: 5,
              textAlign: "center",
              backgroundColor: "#F2F2F2",
              color: "#494b56",
              borderRadius: "0.7rem",
              width: "8rem",
              transition: "0.4s",

              "&:hover": {
                backgroundColor: "#000000",
                color: "white",
              },
            }}
            onClick={handleExport}
          >
            <CloudDownloadIcon sx={{ mr: "0.5rem" }} />
            EXPORT
          </Button>
        </Box>
      </Box>

      <NestedModal clientOpen={clientOpen} setClientOpen={setClientOpen} />
      <ReadNestedModal
        readOpen={readOpen}
        setReadOpen={setReadOpen}
        data={data}
      />
      {selectedUser && (
        <ModalUnstyled
          handleClose={handleClose}
          open={open}
          userId={selectedUser._id}
          name={selectedUser.name}
        />
      )}
    </Box>
  );
};

export default Members;
