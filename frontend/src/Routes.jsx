import {createBrowserRouter} from 'react-router-dom' ;

import Signup from './Components/User.Signup.jsx';
import Signin from './Components/User.Signin.jsx';
import Home from './Components/Home.jsx';


const routes = createBrowserRouter([
    {path: '/', element: <Home/>},
    { path: '/signup', element: <Signup/>},
    {path : '/signin', element: <Signin/>}
]) ;

export default routes ;