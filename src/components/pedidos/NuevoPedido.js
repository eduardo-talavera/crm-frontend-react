import React, {useEffect, useState, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';


import FormBuscarProducto from '../../components/pedidos/FormBuscarProducto';

function NuevoPedido(props) {


    // Extraer el ID del cliente
    const { id } = props.match.params;

    // State
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);

    useEffect( () => {
        // Obtener el cliente
        const consultarAPI = async () => {
            // consultar el cliente actual
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            guardarCliente(resultado.data);
        }

        // llamar api
        consultarAPI();

    }, [id]);


    
    const buscarProducto = async e => {
        e.preventDefault();

        // Obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        // si no hay resultados alerta contrario agregar al state
        if (resultadoBusqueda[0]) {
                let productoResultado = resultadoBusqueda.data[0];

                // Agregar la llave producto (copia de id)
                productoResultado.producto = resultadoBusqueda.data[0]._id;
                productoResultado.cantidad = 0;

                // setear el state
                guardarProductos([...productos, productosResultado]);

        } else { 
            // no hay resultados
            Swal.fire({
                icon: 'error',
                title: 'No resultados',
                text: 'No hay resultados'
            });
        }
    }


        

    // almacena una busqueda en el state
    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value);
    }

    


    return(
        <Fragment>

                <h2>Nuevo Pedido</h2>

                <div className="ficha-cliente">
                        <h3>Datos de Cliente</h3>
                        <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                        <p>Tel: {cliente.telefono}</p>
                </div>


                   <FormBuscarProducto
                        buscarProducto={buscarProducto}
                        leerDatosBusqueda={leerDatosBusqueda}
                    /> 

                <ul className="resumen">
                        <li>
                            <div className="texto-producto">
                                    <p className="nombre">Macbook Pro</p>
                                    <p className="precio">$250</p>
                            </div>
                                <div className="acciones">
                                    <div className="contenedor-cantidad">
                                        <i className="fas fa-minus"></i>
                                        <input type="text" name="cantidad" />
                                        <i className="fas fa-plus"></i>
                                    </div>
                                    <button type="button" className="btn btn-rojo">
                                        <i className="fas fa-minus-circle"></i>
                                            Eliminar Producto
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div className="texto-producto">
                                    <p className="nombre">Macbook Pro</p>
                                    <p className="precio">$250</p>
                                </div>
                                <div className="acciones">
                                    <div className="contenedor-cantidad">
                                        <i className="fas fa-minus"></i>
                                        <input type="text" name="cantidad" />
                                        <i className="fas fa-plus"></i>
                                    </div>
                                    <button type="button" className="btn btn-rojo">
                                        <i className="fas fa-minus-circle"></i>
                                            Eliminar Producto
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div className="texto-producto">
                                    <p className="nombre">Macbook Pro</p>
                                    <p className="precio">$250</p>
                                </div>
                                <div className="acciones">
                                    <div className="contenedor-cantidad">
                                        <i className="fas fa-minus"></i>
                                        <input type="text" name="cantidad" />
                                        <i className="fas fa-plus"></i>
                                    </div>
                                    <button type="button" className="btn btn-rojo">
                                        <i className="fas fa-minus-circle"></i>
                                            Eliminar Producto
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <div className="campo">
                            <label>Total:</label>
                            <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
                        </div>
                        <div className="enviar">
                            <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
                        </div>
        </Fragment>
    );

}

export default NuevoPedido;