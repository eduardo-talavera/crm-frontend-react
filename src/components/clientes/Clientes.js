import React, { useEffect, useState, useContext, Fragment } from 'react';

// importar  cliente  Axios 
import clienteAxios from '../../config/axios';

import Cliente from './Cliente';

import { Link, withRouter} from 'react-router-dom';
import Spinner from '../layout/Spinner';

// importar el context
import { CRMContext } from '../../context/CRMContext';


// hecho con hooks
function Clientes(props) {

    // trabajar con el state
    // clientes = state, guardarClientes = funcion para guardar el state
    const [clientes, guardarClientes] = useState([]);

    // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);
   

    // Use Efect es igual a componentDidMount y willMount
    useEffect( () => {
      if (auth.token !== '') {
    
         // Query a la API
        const consultarApi = async () => {       
            try {
               // Axios soporta headers
               const clientesConsulta = await clienteAxios.get('/clientes',{
                     headers: {
                        Authorization : `Bearer ${auth.token}` // aqui se pasa el jwt
                     }
               });
               // Colocar el resultado en el state
               guardarClientes(clientesConsulta.data);   
            } catch (error) {
               // error con autorizacion
               if(error.response.status === 500) {
                  props.history.push('/iniciar-sesion');
               }
            }
         }
         consultarApi();         
      } else{
         props.history.push('/iniciar-sesion');
      }
    }, [clientes]);// consulta la api cuando el state de clientes cambia


    // si el state esta como false
    if(!auth.auth) {
       props.history.push('iniciar-sesion');
    }


      // Spinner de carga
    if(!clientes.length) return (
      <Fragment>
          <h2>Clientes</h2>
          <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
              Nuevo Cliente
          </Link>
          {/* Spinner de carga */}
          <Spinner />
      </Fragment>
  );

   


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

export default withRouter(Clientes);