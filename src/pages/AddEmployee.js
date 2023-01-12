import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployee } from "../redux/actions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";

const AddEmployee = () => {
  const [state, setState] = useState({
    name: "",
    surname: "",
    phone: "",
    job: "",
    birthday: Date.now(),
  });

  const [error, setError] = useState("");
  //const [value, setValue] = React.useState(dayjs("2022-04-07"));
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const { name, surname, phone, job, birthday } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !surname || !phone || !job || !birthday) {
      setError("Lütfen gerekli bilgileri doldurunuz.");
    } else {
      dispatch(addEmployee(state));
      navigate("/");
      setError("");
    }
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
      
      </div>
      <h2> Çalışan Ekle</h2>
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
          value={name}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Soyisim"
          name="surname"
          variant="outlined"
          value={surname}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Telefon Numarası"
          name="phone"
          variant="outlined"
          value={phone}
          type="number"
          onChange={handleInputChange}
        />

        <br />

        <TextField
          id="select"
          label="Pozisyon"
          select
          onChange={handleInputChange}
          name="job"
        >
          <MenuItem value="CEO">Ceo</MenuItem>
          <MenuItem value="Yazılım Mühendisi">Yazılım Mühendisi</MenuItem>
          <MenuItem value="İnsan kaynakları">İnsan kaynakları</MenuItem>
        </TextField>

        <br />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            inputFormat="DD.MM.YYYY"
            label="Doğum Günü"
            value={birthday}
            name="birthday"
            maxDate={birthday}
            onChange={(birthday) =>
              handleInputChange({
                target: { value: birthday, name: "birthday" },
              })
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <br />
        <Button
          style={{ width: "380px", backgroundColor: "#4caf50" }}
          variant="contained"
          color="primary"
          type="submit"
          onChange={handleInputChange}
        >
          Çalışan Ekle
        </Button>
        <br />
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

export default AddEmployee;
