import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { Calendarpage } from "../calendar";

export const AppRouter = () => {

    const authStatus = 'authenticated'; //'not-authenticated' 'authenticated'

  return (
    <Routes>
        
        {
            (authStatus === 'not-authenticated')
            ?<Route path="/auth/*" element={ <LoginPage/> }/>
            :<Route path="/*" element={ <Calendarpage /> } />
        }

        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}
