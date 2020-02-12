import React, {useEffect, useState, useContext, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';
import Spinner from '../layout/Spinner';
// importar el context
import { CRMContext } from '../../context/CRMContext';
import {withRouter} from 'react-router-dom';

function Pedidos(props) {

    

    const [pedidos, guardarPedidos] = useState([]);

     // utilizar valores del context
     const [auth, guardarAuth] = useContext(CRMContext);


    useEffect(() => {
        if (auth.token !== '') {
                try {
                    const consultarAPI = async () => {
                        // obtener los pedidos
                        const resultado = await clienteAxios.get('/pedidos',{
                             headers: {
                                 Authorization: `Barer ${auth.token}`
                             }
                        }); 
                        guardarPedidos(resultado.data);
                     }
             
                     consultarAPI();

                } catch (error) {
                    if (error.response.status = 500) {
                            props.history.push('/iniciar-sesion');
                     }
                }

        } else{
            props.history.push('/iniciar-sesion');
        }

    },[pedidos,auth]);

     // si el state esta como false
     if (!auth.auth) {
        props.history.push('/iniciar-sesion');
    }


    // Spinner de carga
    if(!pedidos.length) return <Spinner />
        

    return(
       <Fragment>
           <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                {pedidos.map(pedido => (
                    <DetallesPedido
                        key={pedido._id}
                        pedido={pedido}
                    />
                ))}
            </ul>
       </Fragment>
    );
}

export default withRouter(Pedidos);