import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getSingleEmployee, updateEmployee } from "../redux/actions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

const getFormattedDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

const UpdateEmployee = () => {
  const [state, setState] = useState({
    name: "",
    surname: "",
    phone: "",
    job: "",
    birthday: "",
  });

  const [error, setError] = useState("");
  let { id } = useParams();
  const { employee } = useSelector((state) => state.data);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const { name, surname, phone, job, birthday } = state;

  useEffect(() => {
    dispatch(getSingleEmployee(id));
  }, []);

  useEffect(() => {
    if (employee) {
      setState({ ...employee });
    }
  }, [employee]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !surname || !phone || !job || !birthday) {
      setError("Lütfen gerekli bilgileri doldurunuz.");
    } else {
      dispatch(updateEmployee(state,id));
      navigate("/");
      setError("");
    }
  };

  return (
    <div>
      
      <h2> Çalışan Düzenle</h2>
      <h3 style={{ color: "red" }}>{error}</h3>

      <Box
        component="form"
        marginTop="10px"
        sx={{
          "& > :not(style)": { m: 1, width: "45ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="İsim"
          name="name"
          variant="outlined"
          value={name || ""}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Soyisim"
          name="surname"
          variant="outlined"
          value={surname || ""}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Telefon Numarası"
          name="phone"
          variant="outlined"
          value={phone || ""}
          type="number"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Çalıştığı Pozisyon"
          variant="outlined"
          name="job"
          value={job || ""}
          type="text"
          onChange={handleInputChange}
        />
        <br />
   
      
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputFormat=" MM.DD.YYYY"
            id="outlined-basic"
            label="Doğum Günü"
            variant="outlined"
            value={getFormattedDate(birthday) || ""}
            name="birthday"
            type="text"
            
            onChange={ birthday=> handleInputChange({target:{value:birthday, name:'birthday'}})}
            renderInput={(params) => (
              <TextField
                {...params}
               
                //onChange={handleInputChange}
              />
            )}
          />
        </LocalizationProvider>
        <br />
        <Button
          style={{ width: "380px" }}
          variant="contained"
          color="primary"
          type="submit"
          onChange={handleInputChange}
        >
          Güncelle
        </Button>
        <br/>
        <Button
        style={{ width: "380px", marginTop: "20px" }}
        variant="contained"
        color="error"
        onClick={() => navigate("/")}
      >
        Çalışan Listesine Dön
      </Button>
      </Box>
    </div>
  );
};

export default UpdateEmployee;
