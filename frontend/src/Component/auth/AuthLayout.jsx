import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const AuthLayout = ({ children }) => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const user = localStorage.getItem("user");

    if (isAuthenticated || user) {
        return <Navigate to={"/"} />
    }
    
    return children || <Outlet />
}

export default AuthLayout
