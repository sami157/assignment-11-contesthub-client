import Forbidden from '../components/error/Forbidden';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const CreatorRoute = ({children}) => {
    const { user } = useAuth()
    const roleObject = useRole()
    return (
        <div>
            {
                user && roleObject.role === 'creator' 
                    ? roleObject.roleLoading ? <p>Loading</p>
                        : children
                    : roleObject.roleLoading ? <p>Loading</p>
                        : <Forbidden />
            }
        </div>
    );
};

export default CreatorRoute;