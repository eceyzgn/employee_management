import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEmployee, updateEmployee } from "../redux/actions";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";

// const getFormattedDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString();
// }

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
  const maxDate = new Date();
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
      dispatch(updateEmployee(state, id));
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
        {/* <TextField
          id="outlined-basic"
          label="Çalıştığı Pozisyon"
          variant="outlined"
          name="job"
          value={job || ""}
          type="text"
          onChange={handleInputChange}
        /> */}

        <TextField
          id="select"
          label="pozisyon"
          select
          value={job || ""}
          onChange={handleInputChange}
          name="job"
        >
          <MenuItem value="Ceo">Ceo</MenuItem>
          <MenuItem value="Yazılım Mühendisi">Yazılım Mühendisi</MenuItem>
          <MenuItem value="İnsan kaynakları">İnsan kaynakları</MenuItem>
        </TextField>
        <br />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            inputFormat="DD.MM.YYYY"
            id="outlined-basic"
            label="Doğum Günü"
            variant="outlined"
            // value={getFormattedDate(birthday) || ""}
            value={birthday}
            name="birthday"
            type="text"
            maxDate={maxDate}
            onChange={(birthday) =>
              handleInputChange({
                target: { value: birthday, name: "birthday" },
              })
            }
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

export default UpdateEmployee;



