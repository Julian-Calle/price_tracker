import React from "react";
import "../CSS/addItemForm.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { newItem } from "../https/request.js";
import Modal from "../components/Modal";

const { REACT_APP_PASSWORD } = process.env;
// const test = REACT_APP_PASSWORD;
// REACT_APP_PASSWORD
export default function AddItemForm({ update }) {
  const { register, errors, handleSubmit, reset } = useForm();
  const [alarmPassword, setAlarmPassword] = useState(false);
  const [stateAddItemModal, setStateAddItemModal] = useState(false);
  const sendInfo = async (data) => {
    if (data.password === REACT_APP_PASSWORD) {
      await newItem(data.url, data.email);
      reset();
      update();
      setAlarmPassword(false);

      setStateAddItemModal(!stateAddItemModal);
    } else if (data.password !== " ") setAlarmPassword(true);
    setTimeout(() => {
      setAlarmPassword(false);
    }, 3000);
  };
  return (
    <>
      <Modal
        active={stateAddItemModal}
        title={"¡Felicidades!"}
        body={"Has empezado a hacer seguimiento a un nuevo item"}
        actBtn={true}
        btnName={"Aceptar"}
        btnAction={() => {
          setStateAddItemModal(!stateAddItemModal);
        }}
        size="little"
        border={false}
      />
      <form className="addItemForm" onSubmit={handleSubmit(sendInfo)}>
        <div>
          <label className="formLabel" htmlFor="url">
            URL :
          </label>
          <div className="field">
            <input
              type="text"
              id="url"
              name="url"
              placeholder="copia el link"
              defaultValue=""
              ref={register({ required: true, minLength: 26 })}
            />
          </div>
          {errors.url && (
            <p className="messageError">
              *Es obligatorio introducir un url correctamente
            </p>
          )}
        </div>
        <div>
          <label className="formLabel" htmlFor="email">
            email:
          </label>
          <div className="field">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="copia el email acá"
              defaultValue=""
              ref={register({ required: true, minLength: 10 })}
            />
          </div>
          {errors.email && (
            <p className="messageError">
              *Es obligatorio introducir el email correctamente
            </p>
          )}
        </div>
        <div>
          <label className="formLabel" htmlFor="password">
            Password:
          </label>
          <div className="field">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Escribe la contraseña"
              defaultValue=""
              ref={register({ required: true, minLength: 3 })}
            />
          </div>
          {alarmPassword && (
            <p className="messageError">
              *Es obligatorio introducir el password correctamente
            </p>
          )}
        </div>
        <button className="formButton"> AÑADIR</button>
      </form>
    </>
  );
}
