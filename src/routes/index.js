import { useContext, useEffect } from 'react'

// Dependencias
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useHistory,
} from 'react-router-dom'

// Estado global
import AuthContext from 'context/AuthContext'

// Servicios
import { obtenerRegistrosDerweb } from 'services/derweb'

// Componentes
import Login from 'pages/login'

// Rutas
import ProtectedRoute from 'routes/ProtectedRoute'
import JuridicaRoute from 'routes/JuridicaRoute'
import MultimediaRoute from 'routes/MultimediaRoute'

import Home from 'pages/home'
import MenuLayout from 'layouts/MenuLayout'

const AppRoutes = () => {
    const history = useHistory()
    const { usuario, setListaDerechos } = useContext(AuthContext)

    useEffect(() => {
        if (!usuario) return

        const obtenerRegistros = (filtro = '') => {
            obtenerRegistrosDerweb(filtro).then(
                jsdo => {
                    if (!jsdo) {
                        // Sesión caducada
                        history.push('/')
                        return
                    }

                    const { success, request } = jsdo
                    if (success && request.response.dsDERWEB.ttDERWEB) {
                        setListaDerechos(request.response.dsDERWEB.ttDERWEB)
                    }
                    return jsdo
                },
                error => {
                    console.log('error ListaExjuab', error)
                    return error
                }
            )
        }

        const filtro = `DERWEB.USUARI = "${usuario.codigo}"`

        obtenerRegistros(filtro)
    }, [usuario, history, setListaDerechos])

    return (
        <Router basename={'/nynweb/'}>
            <Switch>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/'>
                    <Login />
                </Route>
                <MenuLayout>
                    <ProtectedRoute
                        exact
                        path='/home'
                        component={Home}
                    ></ProtectedRoute>
                    <JuridicaRoute />
                    <MultimediaRoute />
                </MenuLayout>
            </Switch>
        </Router>
    )
}

export default AppRoutes
