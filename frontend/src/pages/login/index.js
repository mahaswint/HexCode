import reportWebVitals from "../../reportWebVitals";
import { Link } from "react-router-dom";
const Login = () => {
    const googleAuth = ()=>{
        window.open(
            `http://localhost:5000/auth/google/callback`,
            "_self",
        )
    }
    return ( 
        <div>
            <button onClick={googleAuth}>
                Sign In with Google
            </button>
        </div>
     );
}
 
export default Login;