import React, { useContext } from "react";
import { Link } from "react-router-dom";
import illustrationImg from "../../assets/images/register.svg";
import logoImg from "../../assets/images/MedNet.svg";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../context/AuthContext";
import Alert from "../../components/Modal/Alert";
import { useDispatch, useSelector } from "react-redux";
import { resetSignup } from "../../redux/slices/authSlice";
import { CircularProgress } from "@material-ui/core";

import "./signup.scss";

function Signup() {
  const dispatch = useDispatch();
  const globaState = useSelector((state) => state.authentication);
  const { signState, signupValues } = globaState;
  const { fillFormFields, handleSignup } = useContext(AuthContext);

  const resetForm = () => {
    dispatch(resetSignup());
  };

  return (
    <div id="page-auth">
      <div className="auth-image gradient">
        <img src={illustrationImg} alt="simbolize a question" />
        <p>Regístrate o inicia sesión para crear una consulta médica desde casa</p>
      </div>
      <main>
        <div className="main-content">
          <img className="auth-logo" src={logoImg} alt="Consult" />
          <form action="" autoComplete="off">
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              value={signupValues.username}
              onChange={(e) => fillFormFields(e)}
            />
            <input
              type="text"
              name="email"
              placeholder="Correo Electrónico"
              value={signupValues.email}
              onChange={(e) => fillFormFields(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={signupValues.password}
              onChange={(e) => fillFormFields(e)}
            />
            <div className="radio-container">
              <span>Soy médico</span>
              <input
                type="checkbox"
                name="medicRole"
                checked={signupValues.medicRole}
                onChange={(e) => fillFormFields(e)}
              ></input>
            </div>
            <Button onClick={(e) => handleSignup(e)}>
              {signState.signUp ? (
                <CircularProgress color="inherit" />
              ) : (
                "Registrarse"
              )}
            </Button>
            <p>
              <Link to="/" onClick={() => resetForm()}>
                Iniciar sesion
              </Link>
            </p>
          </form>
        </div>
        {signState.serverResponse.message && (
          <Alert className={signState.serverResponse.status}>
            {signState.serverResponse.message}
          </Alert>
        )}
      </main>
    </div>
  );
}

export default Signup;
