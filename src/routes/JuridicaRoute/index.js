import ProtectedRoute from 'routes/ProtectedRoute'
import Expeju from 'pages/juridica/expeju'
import Exjuab from 'pages/auxiliares/juridica/exjuab'
import Exjute from 'pages/auxiliares/juridica/exjute'

const JuridicaRoute = () => {
    return (
        <>
            <ProtectedRoute
                exact
                path='/expeju'
                component={Expeju}
            ></ProtectedRoute>
            <ProtectedRoute
                exact
                path='/exjute'
                component={Exjute}
            ></ProtectedRoute>
            <ProtectedRoute
                exact
                path='/exjuab'
                component={Exjuab}
            ></ProtectedRoute>
        </>
    )
}

export default JuridicaRoute
