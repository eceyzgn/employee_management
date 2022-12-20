import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, loadEmployees } from "../redux/actions";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";

const getFormattedDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { employees } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadEmployees());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Çalışanı silmek istediğinize emin misiniz? ")) {
      dispatch(deleteEmployee(id));
    }
  };

  const imageClick = () => {
    navigate("/");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "5px",
          marginBottom: "15px",
          height: "72px",
        }}
      >
        <div style={{ display: "flex", float: "left" }}>
          <Button>
            <img
              src="https://openmoney.com.tr/images/logo.svg"
              style={{ width: "170px", pointerEvents: "all" }}
              onClick={() => imageClick()}
            />
          </Button>
        </div>
      </div>
      <h2> ÇALIŞAN LİSTESİ</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "100px" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ad</StyledTableCell>
              <StyledTableCell align="center">Soyad</StyledTableCell>
              <StyledTableCell align="center">Telefon</StyledTableCell>
              <StyledTableCell align="center">Pozisyon</StyledTableCell>
              <StyledTableCell align="center">Doğum Günü</StyledTableCell>
              <StyledTableCell align="center">Eylem</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees &&
              employees.map((employee) => (
                <StyledTableRow key={employee.id}>
                  <StyledTableCell component="th" scope="row">
                    {employee.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.surname}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.phone}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {employee.job}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {getFormattedDate(employee.birthday)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <ButtonGroup
                      variant="contained"
                      aria-label=" contained primary button group"
                      sx={{
                        alignItems: "center",
                        boxShadow: "none",
                        "& > *": {
                          m: 1,
                        },
                      }}
                    >
                      <Button
                        color="error"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Sil
                      </Button>
                      <Button
                        color="primary"
                        onClick={() =>
                          navigate(`/updateEmployee/${employee.id}`)
                        }
                      >
                        Güncelle
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <div
        sx={{
          alignItems: "center",
          //boxShadow: "none",
        }}
      >
        <Button
          style={{
            backgroundColor: "#4caf50",
            marginInlineStart: "0px",
            height: "40px",
            width: "170px",
            fontWeight: "10000px",
          }}
          variant="contained"
          color="primary"
          onClick={() => navigate("/addEmployee")}
        >
          Çalışan Ekle
        </Button>
      </div>
    </div>
  );
};

export default Home;
