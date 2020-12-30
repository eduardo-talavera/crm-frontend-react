import React, {useContext} from "react";
import defaultAvatar from "../../static/img/clientes/default.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
// importar el context
import { CRMContext } from "../../context/CRMContext";

function Cliente({ cliente }) {
  // utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);

  // extraer los valores
  const { _id, nombre, apellido, empresa, email, telefono, rol } = cliente;

  // Eliminar Cliente
  const eliminarCliente = (idCliente) => {
    Swal.fire({
      title: "Estas Seguro",
      text: "Un Cliente eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // llamado a axios
        clienteAxios
          .delete(`clientes/${idCliente}`, {
            headers: {
              Authorization: `Barer ${auth.token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              if (res.data.type === "success") {
                Swal.fire("Eliminado!", res.data.mensaje, "success");
              }
              if (res.data.type === "warning") {
                Swal.fire({
                  icon: "warning",
                  title: "No se puede realizar esta operacón",
                  text: res.data.mensaje,
                });
              }
            }
          });
      }
    });
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={defaultAvatar}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {nombre} {apellido}
            </div>
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{empresa}</div>
        <div className="text-sm text-gray-500">{rol}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {telefono}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link to={`/clientes/editar/${_id}`} className="text-indigo-600 hover:text-indigo-900">
            Editar
        </Link>
        <Link to={`/pedidos/nuevo/${_id}`} className="ml-3 text-indigo-600 hover:text-indigo-900">
          NuevoPedido
        </Link>
        <span
          onClick={() => eliminarCliente(_id)}
          style={{cursor: 'pointer'}}
          className="ml-3 text-indigo-600 hover:text-indigo-900"
        >
          Eliminar
        </span>
      </td>
    </tr>
  );
}

export default Cliente;
