import React, {useState, Fragment,useContext } from 'react';
import Swal from 'sweetalert2';
import clienteAxios  from '../../config/axios';
import { withRouter }  from 'react-router-dom';

// importar el context
import { CRMContext } from '../../context/CRMContext';

function NuevoProducto(props) {



    // useState toma como parametro el valor de inicio
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    });


    //state para la imagen 
    const [archivo, guardarArchivo] = useState('');

     // utilizar valores del context
    const [auth, guardarAuth] = useContext(CRMContext);



    // Almacena nuevo producto en la Bd
    const agregarProducto = async e => {
        e.preventDefault();

        // Crear un formdata para poder enviar la imagen
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        

        // almacenarlo en la base de datos
        try {
           const res = await clienteAxios.post('/productos', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                    Authorization: `Barer ${auth.token}`
                }
            } );

            // lanzar una alerta
            if(res.status === 200) {
                Swal.fire(
                    'Producto agregado correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // redireccionar
            props.history.push('/productos');


        } catch (error) {
            console.log(error);
            // lanzar alerta
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Vuelve a intentarlo'
            })
        }
    }

    // funcion para leer los datos del formulario
    const leerInformacionProducto = e => {
        guardarProducto({
            // obtener una copia del state y agregar el nuevo
            ...producto,
            [e.target.name] : e.target.value 
        })
    }

    console.log(producto);

    // funcion para colocar la imagen en el state
    const leerArchivo = e => {
        guardarArchivo(e.target.files[0] );
    }

    

    return(
        <Fragment>
            <h2>NuevoProducto</h2>

            <form
                onSubmit={agregarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                           placeholder="Nombre Producto"
                           name="nombre"
                           onChange={leerInformacionProducto}
                             />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number"
                           name="precio"
                           min="0.00"
                           step="0.01"
                           placeholder="Precio"
                           onChange={leerInformacionProducto}
                            />
                </div>

                <div className="campo">
                    <p>Nota: procure que la imagen no exeda los 256px de ancho</p>
                </div>

                <div className="campo">
                   
                    <label>Imagen:</label>
                    <input type="file"
                           name="imagen"
                           onChange={leerArchivo}
                            />
                </div>

                <div className="enviar">
                        <input type="submit"
                               className="btn btn-azul"
                               value="Agregar Producto"
                                />
                </div>
            </form>
        </Fragment>
    );
}

export default withRouter(NuevoProducto);