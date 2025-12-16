import Forbidden from "../components/error/Forbidden";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const PrivateRoute = ({ role, children }) => {
    const { user, loading } = useAuth();
    const { role: userRole, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <p className="text-center">Loading...</p>;
    }

    if (!user) {
        return <Forbidden />;
    }

    const allowedRoles = Array.isArray(role) ? role : [role];


    if (!allowedRoles.includes(userRole)) {
        return <Forbidden />;
    }

    return children;
};

export default PrivateRoute;
