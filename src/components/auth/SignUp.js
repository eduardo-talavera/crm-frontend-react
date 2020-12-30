import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import  clienteAxios from '../../config/axios';

// context
// import  { CRMContext } from '../../context/CRMContext';

function SignUp(props){

    // Auth y token
    // const [auth, guardarAuth] = useContext(CRMContext);
   

    // State con los datos del formulario
    const [usuario, guardarUsuario] = useState({});

  

    // Inicia sesion en el servidor
    const registrarUsuario = async e => {

        e.preventDefault(); // cancelamos que el el componente se recargue 
        // Autenticar el usuario
        try {

            const res = await clienteAxios.post('/crear-cuenta', usuario);

              // lanzar una alerta
              if(res.status === 200) {
                Swal.fire(
                    'Usuario Registrado correctamente',
                    res.data.mensaje,
                    'success'
                )
            }
            

            // redireccionar
            props.history.push('/iniciar-sesion');

        } catch (error) {

                // si es un error de express
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.mensaje
                 })

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: error.response.data
                 })
            }    
         }
    }

    // Asignando lo que el usuario escribe en el state
    const leerDatos = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h3 className="text-center font-extrabold text-gray-900 mt-2">Mini CRM</h3>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Inicia tu prueba gratuita
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              O &nbsp;
              <Link to={"/iniciar-sesion"} className="font-medium text-indigo-600 hover:text-indigo-500">inicia sesión si ya tienes una cuenta</Link>
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={registrarUsuario}
          >
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
            <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                <input
                  id="email-address"
                  name="nombre"
                  type="text"
                  autoComplete="nombre"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your name"
                  onChange={leerDatos}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={leerDatos}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={leerDatos}
                />
              </div>
            </div>
  
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
  
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div> */}
  
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* <!-- Heroicon name: lock-closed --> */}
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Iniciar Prueba
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}


export default withRouter(SignUp);
