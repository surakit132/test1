import React from 'react'
import {Routes, Route, useLocation} from "react-router-dom";
import HomePage from './Homepage'
import LoginOwnerPetPage from './LoginOwnerPetPage'
import LoginPetSitterPage from './LoginPetSitterPage'
import RegisterOwnerPetPage from './RegisterOwnerPetPage'
import RegisterPetSitterPage from './RegisterPetSitterPage'
import SearchListPage from './SearchListPage'
import PetSitterDetailPage from './PetSitterDetailPage'
import ErrorPage from './ErrorPage';

import Navbar from '../components/navbar/PetownerNavbar';

const UnautenticationApp = () => {
    const location = useLocation();
    const hideNavbarPaths = ["/auth"];
  
    const shouldShowNavbar = !hideNavbarPaths.some((path) => 
      location.pathname.startsWith(path)
    );
  return (
    <>
    {shouldShowNavbar && <Navbar />}
    <Routes>
    <Route path="*" element={<ErrorPage />}/>
    <Route path="/" element={<HomePage />} />
    <Route path="/auth/login/user" element={<LoginOwnerPetPage />} />
    <Route path="/auth/login/petsitter" element={<LoginPetSitterPage />} />
    <Route path="/auth/register/user" element={<RegisterOwnerPetPage />} />
    <Route
      path="/auth/register/petsitter"
      element={<RegisterPetSitterPage />}
    />
    <Route path="/search" element={<SearchListPage />} />
    <Route path="/search/:id" element={<PetSitterDetailPage />} />
    </Routes>
    </>
  )
}

export default UnautenticationApp;