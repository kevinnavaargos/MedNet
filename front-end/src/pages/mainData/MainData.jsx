import { Button, LinearProgress, Checkbox } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Aside from "../../components/Aside/Aside";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  resetData,
  setDefaultData,
  setHealthData,
  setUserData,
} from "../../redux/slices/updateDataSlice";
import {
  setUserDataRequest,
  getUserDataRequest,
  updateUserData,
} from "../../services/api";
import useLogout from "../../hooks/useLogout";

import "./mainData.scss";
import capitalize from "capitalize";

function MainData() {
  const globalState = useSelector((state) => state.userMedicData);
  const { userData, healthData } = globalState;
  const [editInput, setEditInput] = useState(false);
  const [defaultState, setDefaultState] = useState({ userData, healthData });
  const [load, setLoad] = useState(false);
  const [logout] = useLogout();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const enableEditField = `${
    editInput ? "profile-input" : "profile-input-disable"
  }`;

  const sendRequest = async () => {
    if (!healthData.fullname) {
      const { data } = await updateUserData(globalState, user.token);
      checkRequest(data.status);
    }
    const { data } = await setUserDataRequest(globalState, user.token);
    checkRequest(data.status);
  };

  const checkRequest = (status) => {
    if (status === "success") {
      setEditInput(false);
      const { token, userInfo } = user;
      const setLocal = { ...userInfo, userData: true };
      localStorage.setItem(
        "user",
        JSON.stringify({ token, userInfo: setLocal })
      );
    }
  };

  const handleHealthData = ({ target }) => {
    const { value, checked, name, type } = target;
    dispatch(
      setHealthData({ value: value.toLowerCase(), checked, name, type })
    );
  };

  const handleUserData = ({ target }) => {
    const { value, name, type } = target;

    dispatch(setUserData({ name, value: value.toLowerCase(), type }));
  };

  const enableEditInput = () => {
    setDefaultState(globalState);
    setEditInput(true);
  };

  const disableEditInput = () => {
    setEditInput(false);

    dispatch(setDefaultData(defaultState));
  };

  useEffect(() => {
    setLoad(true);
    async function getData() {
      const request = await getUserDataRequest(user.token);
      if (request.status === 400) {
        logout();
      }
      if (request.data && request.status === 200) {
        const { healthData, ...basicData } = request.data;
        const { id, userId, ...basicUserData } = basicData;
        dispatch(setDefaultData({ healthData, userData: basicUserData }));
        setLoad(false);
      } else {
        dispatch(resetData());
        setLoad(false);
      }
    }
    if (!userData.id) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content">
      <Header />
      <main>
        <Aside />
        <section>
          <h2>Historia medica</h2>
          {load ? (
            <LinearProgress />
          ) : (
            <>
              <div className="health-content">
                <div className="checkbox-area">
                  <div>
                    <span>Alergias</span>
                    <Checkbox
                      color="secondary"
                      className={!editInput ? '' : 'check'}
                      name="isAlergic"
                      disabled={!editInput ? true : false}
                      checked={healthData.isAlergic}
                      onChange={(e) => handleHealthData(e)}
                    />
                  </div>
                  <div>
                    <span>Medicamentos</span>
                    <Checkbox
                      color="secondary"
                      name="useMedication"
                      className={!editInput ? '' : 'check'}
                      disabled={!editInput ? true : false}
                      checked={healthData.useMedication}
                      onChange={(e) => handleHealthData(e)}
                    />
                  </div>
                  <div>
                    <span>Alcohol</span>
                    <Checkbox
                      color="secondary"
                      name="useAlcohol"
                      className={!editInput ? '' : 'check'}
                      disabled={!editInput ? true : false}
                      checked={healthData.useAlcohol}
                      onChange={(e) => handleHealthData(e)}
                    />
                  </div>
                  <div>
                    <span>Tabaquismo</span>
                    <Checkbox
                      color="secondary"
                      name="useCigars"
                      className={!editInput ? '' : 'check'}
                      disabled={!editInput ? true : false}
                      checked={healthData.useCigars}
                      onChange={(e) => handleHealthData(e)}
                    />
                  </div>
                  <div>
                    <span>Drogas</span>
                    <Checkbox
                      color="secondary"
                      name="useDrugs"
                      className={!editInput ? '' : 'check'}
                      disabled={!editInput ? true : false}
                      checked={healthData.useDrugs}
                      onChange={(e) => handleHealthData(e)}
                    />
                  </div>
                </div>
                <div className="input-container">
                  <div>
                    <span>Nombres</span>
                    <input
                      type="text"
                      name="fullname"
                      autoComplete="off"
                      className={enableEditField}
                      disabled={!editInput ? true : false}
                      placeholder="Nombre y apellido"
                      value={capitalize.words(userData.fullname)}
                      onChange={(e) => handleUserData(e)}
                    />
                  </div>
                  <div>
                    <span>Edad</span>
                    <input
                      type="number"
                      name="age"
                      autoComplete="off"
                      value={userData.age}
                      disabled={!editInput ? true : false}
                      className={enableEditField}
                      onChange={(e) => handleUserData(e)}
                    />
                  </div>
                  <div>
                    <span>Sexo</span>
                    <input
                      type="text"
                      name="sex"
                      autoComplete="off"
                      value={capitalize.words(userData.sex)}
                      disabled={!editInput ? true : false}
                      className={enableEditField}
                      onChange={(e) => handleUserData(e)}
                    />
                  </div>
                  <div>
                    <span>Raza</span>
                    <input
                      type="text"
                      name="race"
                      autoComplete="off"
                      value={capitalize.words(userData.race)}
                      disabled={!editInput ? true : false}
                      className={enableEditField}
                      onChange={(e) => handleUserData(e)}
                    />
                  </div>
                  <div>
                    <span>Altura</span>
                    <input
                      type="number"
                      name="height"
                      autoComplete="off"
                      placeholder="Metros"
                      value={userData.height}
                      className={enableEditField}
                      disabled={!editInput ? true : false}
                      onChange={(e) => handleUserData(e)}
                    />
                  </div>
                  <div>
                    <span>Peso</span>
                    <input
                      type="number"
                      placeholder="Kilogramos"
                      name="weight"
                      autoComplete="off"
                      value={userData.weight}
                      className={enableEditField}
                      disabled={!editInput ? true : false}
                      onChange={(e) => handleUserData(e)}
                    />
                  </div>
                  <div
                    className={`hide-element-check ${
                      healthData.isAlergic && "show-element-check"
                    }`}
                  >
                    <span>Indicanos a que eres alergico</span>
                    <input
                      type="text"
                      name="alergics"
                      autoComplete="off"
                      value={healthData.alergics}
                      className={enableEditField}
                      disabled={!editInput ? true : false}
                      onChange={(e) => handleHealthData(e)}
                    />
                  </div>
                  <div
                    className={`hide-element-check ${
                      healthData.useCigars && "show-element-check"
                    }`}
                  >
                    <span>Consumo de cigarros/dia</span>
                    <input
                      type="text"
                      name="howManyCigars"
                      autoComplete="off"
                      value={healthData.howManyCigars}
                      className={enableEditField}
                      disabled={!editInput ? true : false}
                      onChange={(e) => handleHealthData(e)}
                    />
                  </div>
                  <div
                    className={`hide-element-check ${
                      healthData.useAlcohol && "show-element-check"
                    }`}
                  >
                    <span>Frecuencia de ingesta de alcohol</span>
                    <input
                      type="text"
                      name="howMuchAlcohol"
                      autoComplete="off"
                      value={healthData.howMuchAlcohol}
                      className={enableEditField}
                      disabled={!editInput ? true : false}
                      onChange={(e) => handleHealthData(e)}
                    />
                  </div>
                  <div
                    className={`hide-element-check ${
                      healthData.useDrugs && "show-element-check"
                    }`}
                  >
                    <span>Droga, cantidad y frecuencia</span>
                    <input
                      type="text"
                      name="howManyDrugs"
                      autoComplete="off"
                      value={healthData.howManyDrugs}
                      className={enableEditField}
                      disabled={!editInput ? true : false}
                      onChange={(e) => handleHealthData(e)}
                    />
                  </div>
                  <div
                    className={`hide-element-check ${
                      healthData.useMedication && "show-element-check"
                    }`}
                  >
                    <span>Uso medicamentos y frecuencia</span>
                    <input
                      type="text"
                      name="whichMedications"
                      autoComplete="off"
                      value={healthData.whichMedications}
                      disabled={!editInput ? true : false}
                      className={enableEditField}
                      onChange={(e) => handleHealthData(e)}
                    />
                  </div>
                </div>
                <div className="health-textarea">
                  <span>Comorbilidades</span>
                  <textarea
                    type="text"
                    name="comorbidity"
                    autoComplete="off"
                    className={`${enableEditField} profile-textarea`}
                    disabled={!editInput ? true : false}
                    value={healthData.comorbidity}
                    onChange={(e) => handleHealthData(e)}
                  />
                </div>
              </div>
              <div className="btn-container">
                <Button
                  className="btn primary-btn"
                  onClick={!editInput ? enableEditInput : sendRequest}
                >
                  {editInput ? "Salvar" : "Editar"}
                </Button>
                {
                  editInput 
                  ? 
                  <Button
                  className="btn cancel-btn"
                  onClick={disableEditInput}
                  disabled={editInput && false}
                >
                  {editInput ? "Cancelar" : ""}
                </Button>
                  : <></>
                }
                
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default MainData;
