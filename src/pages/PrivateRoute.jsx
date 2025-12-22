import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { loading, user } = useAuth()
    return (
        loading ? <Loading/>
            : (
                <div>
                    {user ? children : <Navigate state={location.pathname} to='/login'></Navigate>}
                </div>
            )
    );
};

export default PrivateRoute;
