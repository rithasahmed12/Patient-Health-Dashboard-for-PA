  import { Route, Routes } from "react-router-dom"
  import LoginPage from "./Pages/LoginPage"
  import SignupPage from "./Pages/SignupPage"
  import { ProtectRoute } from "./Components/PrivateRoute/PrivateRoute"
  import PatientListPage from "./Pages/PatientList"
  import PatientViewPage from "./Pages/PatientView"
  import PaListPage from "./Pages/PaListPage"
  import PaFormPage from "./Pages/PaFormPage"
  import InsuranceDashboard from "./Pages/InsuranceDashboard"
import ProtectedRouteForInsurance from "./Components/PrivateRoute/ProtectedRouteForInsurance"
import Unauthorized from "./Pages/Unauthorized"
import ProtectedRouteForHealthCare from "./Components/PrivateRoute/ProtectedRouteForHealthCare"
import Layout from "./Pages/Layout"



  function App() {

    return (
      <>
        <Routes>

          <Route path="/" element={<LoginPage/>} />
          <Route path="/register" element={<SignupPage/>} />
          <Route path="/unauthorized" element={<Unauthorized/>} />

          <Route element={<ProtectRoute />}>
          <Route element={<Layout/>}>
          <Route element={<ProtectedRouteForHealthCare/>} >
          <Route path="/dashboard" element={<PatientListPage/>} />
          <Route path="/patient/:id" element={<PatientViewPage />} />
          <Route path="/prior-auth" element={<PaListPage/>} />
          <Route path="/prior-auth-form" element={<PaFormPage/>} />
          </Route>

          
          <Route element={<ProtectedRouteForInsurance/>} >
          <Route path="/insurance/dashboard" element={<InsuranceDashboard/>} />
          </Route>
          </Route>
          </Route>
        </Routes>
      </>
    )
  }

  export default App
