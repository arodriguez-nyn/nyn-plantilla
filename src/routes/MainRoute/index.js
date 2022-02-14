import MenuLayout from 'layouts/MenuLayout'
import ProtectedRoute from 'routes/ProtectedRoute'

import Expeju from 'pages/juridica/expeju'
import Exjute from 'pages/auxiliares/juridica/exjute'
import Exjuab from 'pages/auxiliares/juridica/exjuab'

const MainRoute = () => {
    return (
        <MenuLayout>
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
        </MenuLayout>
    )
}

export default MainRoute
