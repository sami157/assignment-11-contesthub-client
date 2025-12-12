import Forbidden from '../components/error/Forbidden';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
    const { loading, user} = useAuth()
    const roleInfo = useRole()
    return (
        <div>
            {
                user && roleInfo.role === 'admin'
                    ? loading ? <p>Loading</p> : loading
                        ? <p>Loading</p>
                        : children
                    : <Forbidden />
            }
        </div>
    );
};

export default AdminRoute;