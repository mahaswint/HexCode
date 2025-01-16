import reportWebVitals from '../../reportWebVitals';

const Home = (userdetails) => {
    const user = userdetails.user;
    const logout = ()=>{

        window.open(
            `http://localhost:5000/auth/google/callback`,
            "_self"

        );
    }
    return ( <div className="home">
    <img src={user.picture} alt="profile"/>
    <p>{user.name}</p>
    <p>{user.email}</p>

    <button onClick={logout}>Logout</button>



    </div> );
}
 
export default Home;