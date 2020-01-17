import React, { useEffect,useState,Fragment } from 'react';

// importar  cliente  Axios 
import clienteAxios from '../../config/axios';

import Cliente from './Cliente';

import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

// hecho con hooks
function Clientes() {

    // trabajar con el state
    // clientes = state, guardarClientes = funcion para guardar el state
    const [clientes, guardarClientes] = useState([]);


    // Use Efect es igual a componentDidMount y willMount
    useEffect( () => {
         // Query a la API
        const consultarApi = async () => {
                const clientesConsulta = await clienteAxios.get('/clientes');
                // Colocar el resultado en el state
                guardarClientes(clientesConsulta.data);
             }
             
        consultarApi();

    }, [clientes]);// consulta la api cuando el state de clientes cambia


     // Spinner de carga
     if(!clientes.length) return <Spinner/>

   


    return(
       <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
                 <i className="fas fa-plus-circle"></i>
                 Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clientes.map(cliente => (
                   <Cliente
                      key={cliente._id}
                      cliente={cliente}
                   />
                ))}
            </ul>
       </Fragment>
    );
}

export default Clientes;