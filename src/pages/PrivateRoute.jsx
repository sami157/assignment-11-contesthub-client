import { useNavigate } from "react-router";
import Forbidden from "../components/error/Forbidden";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";

const PrivateRoute = ({ role, children }) => {
    const navigate = useNavigate()
    const { user, loading } = useAuth();
    const { role: userRole, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loading/>;
    }

    if (!user) {
        navigate('/login')
    }

    const allowedRoles = Array.isArray(role) ? role : [role];


    if (!allowedRoles.includes(userRole)) {
        return <Forbidden />;
    }

    return children;
};

export default PrivateRoute;
