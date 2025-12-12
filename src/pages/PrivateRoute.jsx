import Forbidden from '../components/error/Forbidden';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { loading, user } = useAuth()
    return (
        <div>
            {
                user && user === 'creator'
                    ? loading ? <p>Loading</p> : loading
                        ? <p>Loading</p>
                        : children
                    : <Forbidden />
            }
        </div>
    );
};

export default PrivateRoute;