import React, {Fragment, useEffect,useContext, useState} from 'react';
import Layout from "../layout/Layout";
// Importar cliente axios
import clienteAxios from '../../config/axios';

// importar el componente Producto
import Producto from './Producto';
import Spinner from '../layout/Spinner';
import { Link, withRouter} from 'react-router-dom';

// importar el context
import { CRMContext } from '../../context/CRMContext';

function Productos(props) {


    // inicializamos el state con un arreglo vacio y su seter
    const [productos, guardarProductos] = useState([]);

     // utilizar valores del context
     const [auth, guardarAuth] = useContext(CRMContext);

    // hacemos uso de useEffect para consultar api cuando cargue
    useEffect( () => {

       if (auth.token !== '') {
            // Query a la API
        const consultarAPI = async () => {
           try {

                const productosConsulta = await clienteAxios.get('/productos', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                   // set al state
                guardarProductos(productosConsulta.data);
                
               

           } catch (error) {
               if (error.response.status === 500) {
                   props.history.push('/iniciar-sesion');
               }
           }
        }

             // llamado a la API
             consultarAPI();

       }else{
           props.history.push('/iniciar-sesion');
       }
       

    }, [productos]);

    // si el state esta como false
    if (!auth.auth) {
        props.history.push('/iniciar-sesion');
    }

    // Spinner de carga
    // if(!productos.length) return (
    //     <Fragment>
    //         <h2>Productos</h2>
    //         <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
    //             Nuevo Producto
    //         </Link>
    //         {/* Spinner de carga */}
    //         <Spinner />
    //     </Fragment>
    // );
        
  



    return(
        <Layout title="Productos">
            <Link to={"/productos/nuevo"} className="relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> <i className="fas fa-plus-circle"></i>
               &nbsp; Nuevo Producto
            </Link>

            {!productos.length ? (<Spinner/>) : null}

            <div className="md:grid grid-cols-3 gap-4 mt-10">
                {productos.map(producto => (
                    <Producto
                        key={producto._id}
                        producto={producto}
                    />
                ))}
            </div>
        </Layout>
    );
}

export default withRouter(Productos);