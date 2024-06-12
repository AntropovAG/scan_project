import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
    isLoggedIn: boolean;
    children: React.ReactNode;

}

const ProtectedRoute = ({ isLoggedIn, children }: ProtectedRouteProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [navigate, isLoggedIn]);


    return children;
};

export default ProtectedRoute;