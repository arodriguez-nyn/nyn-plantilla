// Estado global
import { AuthContextProvider } from 'context/AuthContext'
import { Provider } from 'react-redux'
import store from './redux'

// Componentes
import AppRoutes from 'routes'

const App = () => {
    return (
        <Provider store={store}>
            <AuthContextProvider>
                <AppRoutes />
            </AuthContextProvider>
        </Provider>
    )
}

export default App
