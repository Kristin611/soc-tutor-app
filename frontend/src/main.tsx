// import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
// import './index.css'
import App from './App.tsx';
import { Provider } from "@/components/ui/provider";
import SignUp from './Pages/SignUp.tsx';
import LogIn from './Pages/LogIn.tsx';
import Profile from './Pages/ProfilePage.tsx';
import Dashboard from "./Pages/Dashboard.tsx";
import axios from "axios";
import { toaster } from "./components/ui/toaster.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>this is not working</p>,
    loader: async () => {
      //get token from local storage
      const token = localStorage.getItem('token');

      //if we have a token we will use it as a bearer token on our request for user data
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/auth/profile', 
            { headers: { Authorization: `Bearer ${token}` } }); 
            return response.data;
        } catch (error) {

          return {};
        }        
      } else {
        return {};
      } 
    },
    hydrateFallbackElement: <div>Loading...</div>,
    children: [
      {
        path: '/sign-up',
        element: <SignUp />
      },
      {
        path: '/log-in',
        element: <LogIn />
      },
      {
        path: '/profile',
        element: <Profile />,
        loader: async () => {
          //get token from local storage
          const token = localStorage.getItem('token');

          //if we have a token we will use it as a bearer token on our request for user data
          if (token) {
            try {
              const response = await axios.get('http://localhost:3000/auth/profile', 
                { headers: { Authorization: `Bearer ${token}` } }); 
                return response.data;
            } catch (error) {
              //if you have an expired token we will show an error toast and redirect user to log-in page
              console.log('REACT ROUTER TOKEN ERROR:', error);

              return redirect('/log-in');


            }
            
          } else {
            //if we do not have a token we will show an error toast and redirect user to sign-up page
            //console.log('NO TOKEN');
            return redirect('/sign-up');
          }
          
          
          //console.log('LOADER FUNCTION');
        },
        hydrateFallbackElement: <div>Loading...</div>, //this is what shows while data is loading
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider>
      <RouterProvider router={router}/>
    </Provider>
  
)
