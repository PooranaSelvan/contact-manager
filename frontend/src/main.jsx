import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import ContactDetails from './pages/ContactDetails.jsx';
import AddContact from './pages/AddContact.jsx';
import EditContact from './pages/EditContact.jsx';
import DeleteContact from './pages/DeleteContact.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<App/>}>
       <Route path='/' element={<LoginPage />}/>  
       <Route path='/home' element={<HomePage />}/>  
       <Route path='/register' element={<RegisterPage />}/>  
       <Route path='/contacts' element={<ContactDetails />}/>  
       <Route path='/addcontact' element={<AddContact />}/>  
       <Route path='/editcontact' element={<EditContact />}/>  
       <Route path='/deletecontact' element={<DeleteContact />}/>  
    </Route>
  )
  
);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
