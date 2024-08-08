// React
import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
// Component
import App from './App';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}; */
// Initialize Firebase
/* const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */



let routerSet = [
  // =============================
  // Public
  {
    path: "/",
    element: <App/>,
  },
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
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  )

