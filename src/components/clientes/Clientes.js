import React, { useEffect, useState, useContext } from "react";
import Layout from "../layout/Layout";
// importar  cliente  Axios
import clienteAxios from "../../config/axios";

import Cliente from "./Cliente";

import { Link, withRouter } from "react-router-dom";
import Spinner from "../layout/Spinner";

// importar el context
import { CRMContext } from "../../context/CRMContext";

// hecho con hooks
function Clientes(props) {
  // trabajar con el state
  // clientes = state, guardarClientes = funcion para guardar el state
  const [clientes, guardarClientes] = useState([]);

  // utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);

  // Use Efect es igual a componentDidMount y willMount
  useEffect(() => {
    if (auth.token !== "") {
      // Query a la API
      const consultarApi = async () => {
        try {
          // Axios soporta headers
          const clientesConsulta = await clienteAxios.get("/clientes", {
            headers: {
              Authorization: `Bearer ${auth.token}`, // aqui se pasa el jwt
            },
          });
          // Colocar el resultado en el state
          guardarClientes(clientesConsulta.data);
        } catch (error) {
          // error con autorizacion
          if (error.response.status === 500) {
            props.history.push("/iniciar-sesion");
          }
        }
      };
      consultarApi();
    } else {
      props.history.push("/iniciar-sesion");
    }
  }, [clientes]); // consulta la api cuando el state de clientes cambia

  // si el state esta como false
  if (!auth.auth) {
    props.history.push("iniciar-sesion");
  }

  // Spinner de carga
  if (!clientes.length)
    return (
      <Layout title="Clientes">
       
       <Link
        to={"/clientes/nuevo"}
        className="relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <i className="fas fa-plus-circle"></i>
        &nbsp; Nuevo Cliente
      </Link>
        {/* Spinner de carga */}
        <Spinner />
      </Layout>
    );

  return (
    <Layout title="Clientes">
      <Link
        to={"/clientes/nuevo"}
        className="relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <i className="fas fa-plus-circle"></i>
        &nbsp; Nuevo Cliente
      </Link>

      {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
      <div className="flex flex-col mt-10">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Empresa
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                     No. Telefono
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientes.map((cliente) => (
                     <Cliente
                        key={cliente._id}
                        cliente={cliente}
                     />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withRouter(Clientes);
