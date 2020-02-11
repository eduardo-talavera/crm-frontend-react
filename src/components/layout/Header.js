import React from 'react';

import { CRMContext } from '../../context/CRMContext';

const Header = () => {

    // const [auth, guardarAuth]

    return(
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM - Administrador de Clientes</h1>

                    <button 
                        type="button"
                        className="btn btn-rojo"
                    >
                        <i className="far fa-times-circle"></i>
                        Cerrar Sesion
                    </button>
                </div>  
            </div>
        </header>
    );
}

export default Header;