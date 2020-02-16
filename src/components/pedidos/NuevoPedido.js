import React, { useEffect, useState,useContext, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { withRouter } from 'react-router-dom';

// importar el context
import { CRMContext } from '../../context/CRMContext';

import FormBuscarProducto from "./FormBuscarProducto";
import FormCantidadProducto from "./FormCantidadProducto";



function NuevoPedido(props) {
    // Extraer el ID del cliente
    const { id } = props.match.params;

    // State
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState("");
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);

       // utilizar valores del context
     const [auth, guardarAuth] = useContext(CRMContext);




    useEffect(() => {
        if (auth.token !== '') {
            try {

                // Obtener el cliente
           const consultarAPI = async () => {
               // consultar el cliente actual
               const resultado = await clienteAxios.get(`/clientes/${id}`,{
                   headers: {
                       Authorization: `Barer ${auth.token}`
                   }
               });
               guardarCliente(resultado.data);
           };
   
           // llamar api
            consultarAPI();
              
          } catch (error) {
              if (error.response.status = 500) {
                  props.history.push('/iniciar-sesion');
              }
          }
        }else {
            props.history.push('/iniciar-sesion');
        }

         actualizarTotal();
       
    },[productos,id]);

    if (!auth.auth) {
        props.history.push('/iniciar-sesion');
    }



    const buscarProducto = async e => {
        e.preventDefault();

        // Obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);



        // si no hay resultados alerta contrario agregar al state
        if (resultadoBusqueda.data[0]) {
            let productoResultado = resultadoBusqueda.data[0];

            // Agregar la llave producto (copia de id)
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            // setear el state
            guardarProductos([...productos, productoResultado]);
        } else {
            // no hay resultados
            Swal.fire({
                icon: "error",
                title: "No resultados",
                text: "No hay resultados"
            });
        }
    };



    // almacena una busqueda en el state
    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value);
    };



    // actualizar la cantidad de prouctos
    const restarProductos = i => {
        // copiar el arreglo original de productos
        const todosProductos = [...productos];

        // validar si esta en cero no puede restar mas
        if (todosProductos[i].cantidad === 0) return;

        // decremento
        todosProductos[i].cantidad--;

        // almacenarlo en el state
        guardarProductos(todosProductos);
    };



    const aumentarProductos = i => {
        // copiar el arreglo
        const todosProductos = [...productos];

        // incremento
        todosProductos[i].cantidad++;

        // colocarlo en el state
        guardarProductos(todosProductos);
    };


    // Elimina un producto del state
    const eliminarProductoPedido = id => {
        // retorna los productos diferentes a ese id
        const todosProductos = productos.filter(producto => producto.producto !== id);
        guardarProductos(todosProductos);
    }



    // Actualizar total a pagar
    const actualizarTotal = () => {
        // si el arreglo de productos es igual a cero el total es cero
        if (productos.length === 0) {
            guardarTotal(0);
            return;
        }

        // calcular el nuevo total
        let newTotal = 0;

        // recorrer los productos y sus cantidades y precios
        productos.map(
            producto => (newTotal += producto.cantidad * producto.precio)
        );

        // Almacenar el total
        guardarTotal(newTotal);
    };


    // Almacena el pedido en la base de datos
    const realizarPedido = async e => {
        e.preventDefault();

        // extraer el ID
        const { id } = props.match.params;

        // construir el objeto
        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total
        }

       // Almacenar en la BD
       const resultado = await clienteAxios.post(`pedidos/nuevo/${id}`,pedido,{
           headers: {
               Authorization: `Barer ${auth.token}`
           }
       });

       // Leer resultado
       if (resultado.status === 200) {
           // Alerta de exito
           Swal.fire({
            icon: "success",
            title: "Correcto",
            text: resultado.data.mensaje
        });
          
       }else{
           //alerta de error
           Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: "Vuelve a intentarlo"
         });
       }

       // redireccionar
       props.history.push('/pedidos');
    }

    let e;

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>
                    Nombre: {cliente.nombre} {cliente.apellido}
                </p>
                <p>Tel: {cliente.telefono}</p>
            </div>

            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda={leerDatosBusqueda}
                />

            <ul className="resumen">
                {productos.map((producto, index) => (
                    <FormCantidadProducto
                        key={producto.producto}
                        producto={producto}
                        restarProductos={restarProductos}
                        aumentarProductos={aumentarProductos}
                        eliminarProductoPedido={eliminarProductoPedido}
                        index={index}
                    />
                ))}
            </ul>

            <p className="total">
                Total a Pagar: <span>$ {total}</span>
            </p>

            {total > 0 ? (
                <form
                    onSubmit={realizarPedido}
                >
                    <input
                        type="submit"
                        className="btn btn-verde btn-block"
                        value="Realizar Pedido"
                    />
                </form>
            ) : null}
        </Fragment>
    );
}

export default withRouter(NuevoPedido);
