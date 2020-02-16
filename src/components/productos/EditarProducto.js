import React, {useEffect, useState, useContext, Fragment} from 'react';
import Swal from 'sweetalert2';
import clienteAxios  from '../../config/axios';
import { withRouter }  from 'react-router-dom';
import Spinner from '../layout/Spinner'

// importar el context
import { CRMContext } from '../../context/CRMContext';


function EditarProducto(props) {

    // obtener ID del producto
    const { id } = props.match.params;

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });

      //state para la imagen 
      const [archivo, guardarArchivo] = useState('');

       // utilizar valores del context
     const [auth, guardarAuth] = useContext(CRMContext);


    
    // edita un producto en la BD

    const editarProducto = async e => {
        e.preventDefault();

         // Crear un formdata para poder enviar la imagen
         const formData = new FormData();
         formData.append('nombre', producto.nombre);
         formData.append('precio', producto.precio);
         formData.append('imagen', archivo);
 
         
 
         // almacenarlo en la base de datos
         try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                 headers: {
                     'Content-Type' : 'multipart/form-data',
                     Authorization: `Barer ${auth.token}`
                 }
             });
 
             // lanzar una alerta
             if(res.status === 200) {
                 Swal.fire(
                     'Producto guardado correctamente',
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


    
    // useEffect cuando el componente carga
    useEffect( () => {
        if(auth.token !== '') {
            try {
                // consultar la API para traer el producto a editar
                const consultarAPI = async () => {
                    const productoConsulta = await clienteAxios.get(`/productos/${id}`,{
                        headers: {
                            Authorization: `Barer ${auth.token}`
                        }
                    });
                    guardarProducto(productoConsulta.data);
                }

                consultarAPI();

            } catch (error) {
                
            }
        } else{
            props.history.push('/iniciar-sesion');
        }

    }, [id]);

      // si el state esta como false
      if (!auth.auth) {
        props.history.push('/iniciar-sesion');
    }





     // funcion para leer los datos del formulario
     const leerInformacionProducto = e => {
        guardarProducto({
            // obtener una copia del state y agregar el nuevo
            ...producto,
            [e.target.name] : e.target.value 
        })
    }

    // console.log(producto);

    // funcion para colocar la imagen en el state
    const leerArchivo = e => {
        guardarArchivo(e.target.files[0] );
    }

    // extarer los valores dl state
    const { nombre, precio, imagen } = producto;

    if (!nombre) return <Spinner /> 
        
    

    return(
        <Fragment>
        <h2>Editar Producto</h2>

        <form
            onSubmit={editarProducto}
        >
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input type="text"
                       placeholder="Nombre Producto"
                       name="nombre"
                       onChange={leerInformacionProducto}
                       defaultValue={nombre}
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
                       defaultValue={precio}
                        />
            </div>

            <div className="campo">
                <label>Imagen:</label>
                { imagen ? (
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${imagen}`} alt="imagen"
                     width="300" />
                ) : null }

                <input type="file"
                       name="imagen"
                       onChange={leerArchivo}
                        />
            </div>

            <div className="enviar">
                    <input type="submit"
                           className="btn btn-azul"
                           value="Guardar"
                            />
            </div>
        </form>
    </Fragment>
    );
}

export default withRouter(EditarProducto);