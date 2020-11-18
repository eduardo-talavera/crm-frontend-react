import React from 'react';
import CurrencyFormat from 'react-currency-format';

function FormCantidadProducto(props) {

   const {
        producto,
        restarProductos,
        aumentarProductos,
        index,
        eliminarProductoPedido
    } = props;

    return(
        <li>
            <div className="texto-producto">
                    <p className="nombre">{producto.nombre || producto.producto.nombre}</p>
                    <CurrencyFormat
                        value={producto.precio || producto.producto.precio}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        renderText={value => <p className="precio">Precio unitario: {value}</p>}
                    />
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i
                         className="fas fa-minus"
                         onClick={() => restarProductos(index)}
                    ></i>
                    {/*si queremos que el usuario coloque la cantidad manual
                       mejor colocar un input*/}
                    <p> {producto.cantidad} </p>

                    <i
                         className="fas fa-plus"
                         onClick={() => aumentarProductos(index)}
                    ></i>
                </div>
                <button 
                    type="button"
                    className="btn btn-rojo"
                    onClick={() => eliminarProductoPedido(producto._id)}
                >
                        <i className="fas fa-minus-circle"></i>
                            Eliminar Producto
                </button>
            </div>
        </li>
    );
}

export default FormCantidadProducto;