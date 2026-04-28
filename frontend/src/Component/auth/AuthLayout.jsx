import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const AuthLayout = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const user = localStorage.getItem("user");

    if (isAuthenticated || user) {
        return <Navigate to={"/"} />
    }
    
    return <Outlet />
}

export default AuthLayout

