import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
// importar el context
import { CRMContext } from '../../context/CRMContext';


function Producto({producto}) {

     // utilizar valores del context
     const [auth, guardarAuth] = useContext(CRMContext);


    // elimina un  produto
    const eliminarProducto = id => {
        Swal.fire({
                title: 'Estas Seguro',
                text: "Un producto eliminado no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'No, Cancelar'
          }).then((result) => {
            if (result.value) {
                // eliminar en la rest API
                clienteAxios.delete(`/productos/${id}`,{
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                })
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire(
                                'Eliminado!',
                                 res.data.mensaje,
                                'success'
                              )
                        }
                    })
            }
          })
    }

    const {_id, nombre, precio, imagen} = producto;

    return(
        <li className="producto">
            <div className="info-producto">
            <p className="nombre">{nombre}</p>
                <p className="precio">$ {precio}</p>
                {imagen ? (
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`} alt="imagen" />
                ) : null }
            </div>
            <div className="acciones">
                <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>

                <button type="button"
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => eliminarProducto(_id)}
                    >
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    );
}

export default Producto;