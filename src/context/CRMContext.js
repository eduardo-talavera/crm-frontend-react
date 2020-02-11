import React, {useState} from 'react';


// crear el context

// context toma dos parametros uno por default
const CRMContext = React.createContext([{}, () => {}]);

const CRMProvider = props => {

    // definir el state inicial
    const [auth, guardarAuth] = useState({
        token: '',
        auth: false
    });

    return (
        <CRMContext.Provider value={[auth, guardarAuth]}>
            {props.children}
        </CRMContext.Provider>
    );
}

export {CRMContext, CRMProvider};