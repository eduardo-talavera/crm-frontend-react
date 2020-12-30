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

    // if (typeof window !== 'undefined') {
    //     const tokenLs = localStorage.getItem('token');
    //     console.log('token => ', tokenLs);

    //     //colocarlo en el state
    //     guardarAuth({
    //        token: tokenLs,
    //        auth: true
    //     })

    //  }

    return (
        <CRMContext.Provider value={[auth, guardarAuth]}>
            {props.children}
        </CRMContext.Provider>
    );
}

export {CRMContext, CRMProvider};