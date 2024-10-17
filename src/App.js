import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Post from './components/Post';
import AppNavbar from './components/AppNavbar';
import Container from 'react-bootstrap/Container'
import Error from './components/Error'


function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  function unsetUser(){
    localStorage.clear()
  }

  useEffect(() => {
    fetch(`http://localhost:4000/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(data.auth !== "Failed")
      if (data.auth !== "Failed") {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });

      } else {
        setUser({
          id: null,
          isAdmin: null
        });
      }
    })
  }, []) 


 return (
      <>
        <UserProvider value={{ user, setUser, unsetUser}}>
          <Router>
            <AppNavbar/>
            <Container>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/post" element={<Post />}/>
                <Route path="*" element={<Error />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
              </Routes>
            </Container>
          </Router> 
        </UserProvider>
      </>
  );
}

export default App;
