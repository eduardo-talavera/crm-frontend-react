import React, {useEffect, useState, useContext, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';
import Spinner from '../layout/Spinner';
import Layout from "../layout/Layout";
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
        

    return(
       <Layout title="Pedidos">
           {!pedidos.length ? (<Spinner />) : null}
            <ul className="listado-pedidos">
                {pedidos.map(pedido => (
                    <DetallesPedido
                        key={pedido._id}
                        pedido={pedido}
                    />
                ))}
            </ul>
       </Layout>
    );
}

export default withRouter(Pedidos);