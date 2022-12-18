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

  return (
    <div>
      <div
        sx={{
          alignItems: "center",
          //boxShadow: "none",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/addEmployee")}
        >
          Çalışan Ekle
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table
          sx={{ marginTop: 10, minWidth: 90 }}
          aria-label="customized table"
        >
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
                    {employee.birthday}
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
                          marginRight: "1px",
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
    </div>
  );
};

export default Home;