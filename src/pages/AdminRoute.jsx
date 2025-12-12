import Forbidden from '../components/error/Forbidden';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
    const { loading, user, role } = useAuth()
    return (
        <div>
            {
                user && role === 'creator'
                    ? loading ? <p>Loading</p> : loading
                        ? <p>Loading</p>
                        : children
                    : <Forbidden />
            }
        </div>
    );
};

export default AdminRoute;