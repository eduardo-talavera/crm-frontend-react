import React, {Fragment, useEffect, useState} from 'react';

// Importar cliente axios
import clienteAxios from '../../config/axios';

// importar el componente Producto
import Producto from './Producto';
import Spinner from '../layout/Spinner';


import {Link} from 'react-router-dom';

function Productos() {

    // inicializamos el state con un arreglo vacio y su seter
    const [productos, guardarProductos] = useState([]);

    // hacemos uso de useEffect para consultar api cuando cargue
    useEffect( () => {

        // Query a la API
        const consultarAPI = async () => {
            const productosConsulta = await clienteAxios.get('/productos');
            // set al state
            guardarProductos(productosConsulta.data);
        }

        // llamado a la API
        consultarAPI();
       

    }, [productos]);

    // Spinner de carga
    if(!productos.length) return <Spinner />
        
  



    return(
        <Fragment>
            <h2>Productos</h2>

            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map(producto => (
                    <Producto
                        key={producto._id}
                        producto={producto}
                    />
                ))}
            </ul>
        </Fragment>
    );
}

export default Productos;