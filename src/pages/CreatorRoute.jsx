import Forbidden from '../components/error/Forbidden';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const CreatorRoute = ({children}) => {
    const { loading, user } = useAuth()
    const roleObject = useRole()
    return (
        <div>
            {
                user && roleObject.role === 'creator' 
                    ? loading ? <p>Loading</p> : loading
                        ? <p>Loading</p>
                        : children
                : <Forbidden/>
            }
        </div>
    );
};

export default CreatorRoute;