import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Home from './pages/home';
import axios from 'axios';
import Login from './pages/login';


function App() {
  const [user,setUser] = useState({
    createdAt:"",
    email:"",
    imageURL:"",
    name:"",
    projects:[],
    updatedAt:"",
    _v:0,
    _id:"", 
  });

  const getUser = async ()=>{
    try{
      const url = `http://localhost:5000/auth/login/success`;
      const {data} = await axios.get(url,{withCredentials:true});
      setUser(data.user);
      console.log(data.user);
    } catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getUser();
    console.log(user);
  },[])
  return (
    <div className="App">
      <Routes>
        <Route exact 
        path="/"
        element={user ? <Home user = {user}/>:<Navigate to="/login"/>}>

        </Route>
        <Route exact path="/login" element={<Login />} />
      </Routes>
      
    </div>
  );
}

export default App;
