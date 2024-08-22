// React
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
// Component
import App from './App';
import Dashboard from './admin/Dashboard';
import DonateForm from './user/DonateForm';
import Login from './admin/Login';

let routerSet = [
  // =============================
  // Public
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/admin",
    element: <Dashboard/>
  },
  {
    path: "/form",
    element: <DonateForm />
  },
  {
    path: "/login",
    element: <Login />
  }
  // =============================
  // Handler
/*   {
    path: "*",
    element: <ErrorPage />
  },
  {
    path: "error",
    element: <ErrorPage />
  }, */

]

let router = createBrowserRouter(routerSet);
  ReactDOM.createRoot(document.getElementById('root')).render(
  /*   <React.StrictMode> */
      <RouterProvider router={router} />
  /*   </React.StrictMode>, */
  )

