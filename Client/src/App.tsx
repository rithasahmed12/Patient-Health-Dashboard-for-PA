import { Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import SignupPage from "./Pages/SignupPage"
import { ProtectRoute } from "./Components/PrivateRoute/PrivateRoute"
import PatientListPage from "./Pages/PatientList"
import PatientViewPage from "./Pages/PatientView"
import PaListPage from "./Pages/PAListPage"
import PaFormPage from "./Pages/PaFormPage"



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<SignupPage/>} />

        <Route element={<ProtectRoute />}>
        <Route path="/dashboard" element={<PatientListPage/>} />
        <Route path="/patient/:id" element={<PatientViewPage />} />
        <Route path="/prior-auth" element={<PaListPage/>} />
        <Route path="/prior-auth-form" element={<PaFormPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
