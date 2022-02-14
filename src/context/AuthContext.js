import React, { useState, createContext } from 'react'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    const [listaMenus, setListaMenus] = useState([])
    const [listaSubmenus, setListaSubmenus] = useState([])
    const [listaAplicaciones, setListaAplicaciones] = useState([])
    const [listaDerechos, setListaDerechos] = useState([])

    const guardaUsuario = usuario => {
        localStorage.setItem('usuario', JSON.stringify(usuario))
        setUsuario(usuario)
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                listaMenus,
                listaSubmenus,
                listaAplicaciones,
                listaDerechos,
                guardaUsuario,
                setListaMenus,
                setListaSubmenus,
                setListaAplicaciones,
                setListaDerechos,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
