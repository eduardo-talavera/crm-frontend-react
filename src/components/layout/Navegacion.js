import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

const Navegacion = () => {

    const [auth, guardarAuth] = useContext(CRMContext);

    if(!auth.auth) return null;

    return ( 
        <nav className="navegacion">
            <Link to={"/clientes"} className="clientes text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Clientes</Link>
            <Link to={"/productos"} className="productos text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productos</Link>
            <Link to={"/pedidos"} className="pedidos text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pedidos</Link>
        </nav>
 );
}
 
export default Navegacion;