import React, { Fragment, useState, useContext } from "react";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import clienteAxios from "../../config/axios";
// importar el context
import { CRMContext } from "../../context/CRMContext";

import Layout from "../layout/Layout";

function NuevoCliente({ history }) {
  // utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);

  // cliente = state
  // guardarCliente = funcion para guardar el state
  const [cliente, guardarCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  // leer los datos del formulario
  const actualizarState = (e) => {
    // Almacenar lo que el usuario escribe en el state
    guardarCliente({
      // Obtener una copia del state actual para que no elimine los valores previos
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  // Añade en la rest API un Cliente nuevo
  const agregarCliente = (e) => {
    e.preventDefault();

    // enviar peticion a axios
    clienteAxios
      .post("/clientes", cliente, {
        headers: {
          Authorization: `Barer ${auth.token}`,
        },
      })
      .then((res) => {
        // Validar si hay errores de mongo
        if (res.data.code === 11000) {
          Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: "Ese correo ya existe",
          });
        } else {
          console.log(res.data);

          Swal.fire("Se agrego el cliente", res.data.mensaje, "success");
        }

        // redireccionar
        history.push("/");
      });
  };

  const isPhoneNumber = (phone) => {
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.match(regex)) return true;
    else return false;
  };

  // Validar el formulario
  const validarCliente = () => {
    //Destructuring
    const { nombre, apellido, email, empresa, telefono } = cliente;

    // revisar que las propiedades del objeto tengan contenido
    let valido =
      !nombre.length ||
      !apellido.length ||
      !email.length ||
      !empresa.length ||
      !telefono.length ||
      !isPhoneNumber(telefono);

    // retorna true o false
    return valido;
  };

  // verificar si el usuario esta autenticado o no

  if (!auth.auth) history.push("/iniciar-sesion");

  return (
    <Layout title="Nuevo Cliente">
      <form onSubmit={agregarCliente}>
        <legend> Llena todos los campos </legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </Layout>
  );
}

// HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter(NuevoCliente);
