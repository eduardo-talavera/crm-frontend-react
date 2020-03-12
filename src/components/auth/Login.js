import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import  clienteAxios from '../../config/axios';

// context
import  { CRMContext } from '../../context/CRMContext';

function Login(props){

    // Auth y token
    const [auth, guardarAuth] = useContext(CRMContext);
   

    // State con los datos del formulario
    const [credenciales, guardarCredenciales] = useState({});

  

    // Inicia sesion en el servidor
    const iniciarSesion = async e => {

        e.preventDefault(); // cancelamos que el el componente se recargue 
        // Autenticar el usuario
        try {

            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            
            // extraeyendo el token y colocandolo en local storage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // colocarlo en el state
            guardarAuth({
                token,
                auth: true
            })

            // alerta de exito
            Swal.fire(
                'Login Correcto',
                'Has iniciado sesion',
                'success'
            )

            // redireccionar
            props.history.push('/')

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
                    // text: 'Hubo un error'
                    text: error.response.data
                 })
            }    
         }
    }

    // Asignando lo que el usuario escribe en el state
    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    return(
       <div className="login">
           <h2>Iniciar Sesion</h2>

           <div className="contenedor-formulario">
               <form
                    onSubmit={iniciarSesion}
               >
                 <div className="campo">
                     <label>Email</label>
                     <input
                        type="text"
                        name="email"
                        placeholder="Email para iniciar sesion"
                        required
                        onChange={leerDatos}
                      />
                </div>  
                <div className="campo">
                     <label>Password</label>
                     <input
                        type="password"
                        name="password"
                        placeholder="Tu pasword"
                        required
                        onChange={leerDatos}
                      />
                </div>  
                <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block"/>
               </form>
           </div>
       </div>
    )
}


export default withRouter(Login);
