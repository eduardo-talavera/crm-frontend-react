import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

// importar el context
import { CRMContext } from '../../context/CRMContext';

function DetallesPeido({pedido}) {

    const {cliente} = pedido;
     // utilizar valores del context
     const [auth, guardarAuth] = useContext(CRMContext);


      // Eliminar Pedido
      const eliminarPedido = idPedido => {
        Swal.fire({
            title: 'Estas Seguro',
            text: "Un Pedido eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                // llamado a axios
                clienteAxios.delete(`pedidos/${idPedido}`,{
                    headers: {
                        Authorization: `Barer ${auth.token}`
                    }
                })
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire(
                                'Eliminado!',
                                res.data.mensaje,
                                'success'
                            );
                         } 
                    });     
            }
          })
    }

    return(
            <li className="pedido">
                    <div className="info-pedido">
                        <p className="id">ID: {cliente._id}</p>
                        <p className="nombre">cliente: {cliente.nombre} {cliente.apellido}</p>
    
                        <div className="articulos-pedido">
                            <p className="productos">Artículos Pedido: </p>
                            <ul>
                               {pedido.pedido.map(articulos => (
                                    <li key={pedido._id+articulos.producto._id}>
                                        <p>{articulos.producto.nombre}</p>
                                        <CurrencyFormat value={articulos.producto.precio} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className="precio">Precio unitario: {value}</p>} />
                                        <p>Cantidad:{articulos.cantidad}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <CurrencyFormat value={pedido.total} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p className="total">Total: {value}</p>} />
                    </div>
                    <div className="acciones">
{/*                     
                        <Link to={`/pedido/editar/${pedido._id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                                 Editar Pedido
                        </Link> */}

                        <button type="button" className="btn btn-rojo btn-eliminar"
                            onClick={() => eliminarPedido(pedido._id)}
                        >
                            <i className="fas fa-times"></i>
                            Eliminar Pedido
                        </button>
                    </div>
                </li>
    );
}

export default DetallesPeido;