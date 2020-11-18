import React, {Fragment,useState,useContext, useEffect} from 'react';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
import clienteAxios from '../../config/axios';

// importar el context
import { CRMContext } from '../../context/CRMContext';

function  EditarCliente(props) {

     // utilizar valores del context
     const [auth, guardarAuth] = useContext(CRMContext);


    // cliente = state
    // guardarCliente = funcion para guardar el state 
    const [cliente, datosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: '',
    });

    

    // useEffect cuando el componente carga
    useEffect( () => {

           // Obtener el ID
           const { id } = props.match.params;

           //  Query a la API
               const consultarAPI = async () => {
               const clienteConsulta = await clienteAxios.get(`/clientes/${id}`,{
                   headers:{
                       Authorization: `Barer ${auth.token}`
                   }
               });
    
            // colocar en el state 
               datosCliente(clienteConsulta.data);
        }

          consultarAPI();
    },[props] );

    // leer los datos del formulario
    const actualizarState = e => {
       
        // Almacenar lo que el usuario escribe en el state
        datosCliente({
            // Obtener una copia del state actual para que no elimine los valores previos
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    // Envia una peticion por axios para actualizar el cliente
    const actualizarCliente = e => {
        e.preventDefault();

        // Enviar peticion por axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente,{
            headers:{
                Authorization: `Barer ${auth.token}`
            }
        })
            .then(res => {
                // Validar si hay errores de mongo
                if (res.data.code === 11000) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Ese correo ya existe'
                    })

                } else {
                    console.log(res.data);

                    Swal.fire(
                        'Correcto',
                        'El cliente ha sido actualizado',
                        'success'
                    )
                }

                // Redireccionar
                props.history.push('/');
            });
    }

   
    const isPhoneNumber = (phone) => { 
 
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
        if(phone.match(regex)) return true; 
        else return false; 
    }


    // Validar el formulario
    const validarCliente = () => {
        //Destructuring
        const {nombre, apellido, email, empresa, telefono} = cliente;

        // revisar que las propiedades del objeto tengan contenido
        let valido = !nombre.length ||
                     !apellido.length ||
                     !email.length ||
                     !empresa.length ||
                     !telefono.length ||
                     !isPhoneNumber(telefono);

        // retorna true o false
        return valido;
    }

    return (
       <Fragment>

            <h2>Editar cliente</h2>

            <form
                onSubmit={actualizarCliente}
            >
                <legend> Llena todos los campos </legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                           placeholder="Nombre Cliente" 
                           name="nombre"
                           onChange={actualizarState}
                           value={cliente.nombre}
                           />

                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                           placeholder="Apellido Cliente" 
                           name="apellido"
                           onChange={actualizarState}
                           value={cliente.apellido}
                           />

                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                           placeholder="Empresa Cliente" 
                           name="empresa"
                           onChange={actualizarState}
                           value={cliente.empresa}
                           />

                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                           placeholder="Email Cliente" 
                           name="email"
                           onChange={actualizarState}
                           value={cliente.email}
                            />

                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel"
                           placeholder="Teléfono Cliente" 
                           name="telefono"
                           onChange={actualizarState}
                           value={cliente.telefono}
                           />
                </div>

                <div className="enviar">
                        <input type="submit" 
                               className="btn btn-azul" 
                               value="Guardar Cambios"
                               disabled={ validarCliente() }
                               />
                </div>

            </form>

       </Fragment>
    );    
}

// HOC, es una funcion que toma un componente y retorna un nuevo componente
export default withRouter( EditarCliente );