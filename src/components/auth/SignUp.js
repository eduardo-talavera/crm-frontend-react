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
       <div className="login">
           <h2>Registro</h2>
           <p style={{textAlign:'center', color: 'gray'}}>La opción de registro ha sido habilitada solo para efectos de prueba dado que esta es solo una versión para demostración</p>

           <div className="contenedor-formulario">
               <form
                    onSubmit={registrarUsuario}
               >
                 <div className="campo">
                     <label>Correo</label>
                     <input
                        type="text"
                        name="email"
                        placeholder="Email para iniciar sesion"
                        required
                        onChange={leerDatos}
                      />
                </div>  
                <div className="campo">
                     <label>Nombre</label>
                     <input
                        type="text"
                        name="nombre"
                        placeholder="Email para iniciar sesion"
                        required
                        onChange={leerDatos}
                      />
                </div> 
                <div className="campo">
                     <label>Contraseña</label>
                     <input
                        type="password"
                        name="password"
                        placeholder="Tu pasword"
                        required
                        onChange={leerDatos}
                      />
                </div>  
                <input type="submit" value="Registrarme" className="btn btn-verde btn-block"/>
               </form>
           </div>
           <div className="link__register_container">
                <Link to={"/iniciar-sesion"} className="link__register">Iniciar Sesión</Link>
            </div>
       </div>
    )
}


export default withRouter(SignUp);
