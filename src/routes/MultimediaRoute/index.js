import ProtectedRoute from 'routes/ProtectedRoute'
import ConsultaMultimedia from 'pages/multimedia'

const JuridicaRoute = () => {
    return (
        <>
            <ProtectedRoute
                exact
                path='/multimedia'
                component={ConsultaMultimedia}
            ></ProtectedRoute>
        </>
    )
}

export default JuridicaRoute
