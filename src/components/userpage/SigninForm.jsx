import { useState } from "react";
import { login } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils/StateContext";

// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../@mui/components/iconify";
// ------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SigninForm() {
  const initialFormState = {
    email: "",
    password: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [error, setError] = useState(null);

  const { dispatch } = useGlobalState();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  //setup onchange for email and password
  function handleChange(event) {
    setError(null);
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }
  //setup submit button for sign in
  function handleSubmit(event) {
    event.preventDefault();
    //once user login, we save user detailed information in the store.
    login(formState)
      .then((data) => {
        const user = data.user;
        // user: { username, role }
        // const loggedInUser = sessionStorage.getItem('user')
        // ...
        /*
            // TicketForm.jsx
            const Form = (props) => {
                return <form>...</form>
            }

            if (loggedInUser.role === 'manager') {
                return <TicketForm disabledFields={['initiative', 'description']} />
            }

            return <TicketForm disabledFields={['priority']} />
            */
        // ! get user info
        // console.log(user)

        const token = data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "setLoggedInUser", data: JSON.stringify(user) });
        dispatch({ type: "setToken", data: token });
        //go to home page
        navigate("/");
      })
      .catch((error) =>
        setError(error.response.data.errors || error.response.data.error)
      );
  }
  
  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={handleChange} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {error && typeof(error) === "string" ? 
        (<Alert variant="outlined" severity="error" sx={{ m: 1 }}>
          {error}
        </Alert>)
       : error ? (
        error.map((err, i) => (
          <Alert key={i} variant="outlined" severity="error" sx={{ m: 1 }}>
            {err.msg}
          </Alert>
        ))
      ) : (
        <></>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Sign In
      </LoadingButton>
    </>
  );
}
