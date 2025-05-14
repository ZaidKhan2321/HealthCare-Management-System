import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import Signup from "./Components/User.Signup.jsx";
import Signin from "./Components/User.Signin.jsx";
import Home from "./Components/Home.jsx";
import PatientProfile from "./Components/PatientProfile.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import CreatePatientProfile from "./Components/CreatePatientProfile.jsx" ;
import CreateDoctorProfile from "./Components/CreateDoctorProfile.jsx";
import DoctorProfile from "./Components/DoctorProfile.jsx";
import FindDoctor from "./Components/FindDoctor.jsx";
import PatientPrescriptions from "./Components/PatientPrescriptions.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "find-doctor", element: <FindDoctor /> },
      { path: "create-patient-profile", element: <CreatePatientProfile />},
      { path: "patient-profile", element: (<PrivateRoute> <PatientProfile /> </PrivateRoute>)},
      { path: "my-prescriptions", element: <PatientPrescriptions />},
      { path: "create-doctor-profile", element: <CreateDoctorProfile />},
      { path: "doctor-profile", element: (<PrivateRoute> <DoctorProfile /> </PrivateRoute>)},
    ]
  }
]);

export default routes;
