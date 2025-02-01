const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";
const Login = () => {
    
    return (
        <div>
            <h1>Login</h1>
            <a href={`${BACKEND_URL}auth/google`}> Login with Google</a>
        </div>
    );
};

export default Login;
