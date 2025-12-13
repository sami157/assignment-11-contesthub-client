import Forbidden from '../components/error/Forbidden';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
    const { user} = useAuth()
    const roleObject = useRole()
    return (
        <div>
            {
                user && roleObject.role === 'admin'
                    ? roleObject.roleLoading ? <p>Loading</p>
                        : children
                    : roleObject.roleLoading ? <p>Loading</p>
                        : <Forbidden />
            }
        </div>
    );
};

export default AdminRoute;