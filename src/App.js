import React, { Fragment, useContext } from "react";

// Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/** * Layout*/
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";

/**Componentes para Clientes */
import Clientes from "./components/clientes/Clientes";
import NuevoCliente from "./components/clientes/NuevoCliente";
import EditarCliente from "./components/clientes/EditarCliente";

/**Componentes para Productos */
import Productos from "./components/productos/Productos";
import EditarProducto from "./components/productos/EditarProducto";
import NuevoProducto from "./components/productos/NuevoProducto";

/**Componentes para Pedidos */
import Pedidos from "./components/pedidos/Pedidos";
import NuevoPedido from "./components/pedidos/NuevoPedido";
import EditarPedido from "./components/pedidos/EditarPedido";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { CRMContext, CRMProvider } from "./context/CRMContext";

function App() {
  // utilizar context en el componente para pasarlo a cualquier componente sin pasarlo por props
  const [auth, guardarAuth] = useContext(CRMContext);

  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, guardarAuth]}>
          {/* <Header /> */}
          <div>
            {/* <Navegacion /> */}
              <Switch>
                {/**Rutas para Clientes */}
                <Route exact path="/" component={Clientes} />
                <Route exact path="/clientes" component={Clientes} />
                <Route exact path="/clientes/nuevo" component={NuevoCliente} />
                <Route
                  exact
                  path="/clientes/editar/:id"
                  component={EditarCliente}
                />
                <Route exact path="/clientes" component={Clientes} />

                {/**Rutas para productos */}
                <Route exact path="/productos" component={Productos} />
                <Route
                  exact
                  path="/productos/nuevo"
                  component={NuevoProducto}
                />
                <Route
                  exact
                  path="/productos/editar/:id"
                  component={EditarProducto}
                />

                {/**Rutas para pedidos */}
                <Route exact path="/pedidos" component={Pedidos} />
                <Route
                  exact
                  path="/pedidos/nuevo/:id"
                  component={NuevoPedido}
                />
                {/* <Route exact path="/pedido/editar/:idPedido" component={EditarPedido} /> */}

                <Route exact path="/iniciar-sesion" component={Login} />
                <Route exact path="/registro" component={SignUp} />
              </Switch>
          </div>
        </CRMProvider>
      </Fragment>
    </Router>
  );
}

export default App;
