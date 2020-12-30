import React, {useState, useContext} from "react";
import defaultAvatar from "../../static/img/clientes/default.png";
import { withRouter } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

function ProfileDropDown(props) {

  const [auth, guardarAuth] = useContext(CRMContext);
  const [showMenu, setShowMenu] = useState(false);

  const showPopUp = () => {
    setShowMenu(!showMenu);
  }


  const cerrarSesion = () => {
      // auth.aut = false y el token se remueve
      guardarAuth({
          token: '',
          auth: false
      });

      localStorage.setItem('token', '');
      
      // redireccionar
      props.history.push('/iniciar-sesion');
  }

  return (
    <div>
      <div className="ml-3 relative">
        <div>
          <button
            className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            id="user-menu"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <img 
              className="h-8 w-8 rounded-full" src={defaultAvatar}
              alt=""
              onClick={showPopUp}
            />
          </button>
        </div>
        {/* <!--
                Profile dropdown panel, show/hide based on dropdown state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              --> */}
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
          style={{display: showMenu ? '' : 'none'}}
        >
          {/* <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Your Profile
          </a>

          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Settings
          </a> */}

          <span
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            style={{cursor: 'pointer'}}
            role="menuitem"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </span>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ProfileDropDown);
