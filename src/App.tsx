
// import  Home  from './pages/Home'
import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import UserDashboard from './pages/Userdashboard'
import Admindashboard from './pages/Admindashboard'
import Error from './pages/Error'
import AdminHome from "./pages/AdminPages/Dashboard"
import AdminUserManagement from "./pages/AdminPages/Users"
import AdminBookings from "./pages/AdminPages/bookings"
import UserLogin from "./pages/userLogin"
import RegistrationPage from "./pages/RegistrationPage"
import UserDetails from "./pages/userDetailsForm"
import UserHome from './pages/UserPages/userHome';
import AdminVehicle from "./pages/AdminPages/Vehicles"
import Ticketspage from "./pages/AdminPages/tickets"
import FleetManagementPage from "./pages/AdminPages/fleets"
import LocationAndBranchesPage from "./pages/AdminPages/LocationAndBraches"
import AdminProfilePage from "./pages/AdminPages/adminProfile"
import Report from "./pages/AdminPages/adminReports"
import UserProfilePage from './pages/UserPages/UserProfilePage';
import UserAvailableVehicles from './pages/UserPages/availableVehicles';
import CurrentBookings from "./pages/UserPages/currentBookings"
import UserBookingsHistory from "./pages/UserPages/BookingHistory"
import UserPayments from "./pages/UserPages/UserPayments"




function App() {
  const router = createBrowserRouter([
   {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
   },
   {
    path: "/createAccount",
    element: <UserDetails />,

   },
   {
    path: "/RegistrationForm",
    element: <RegistrationPage/>,
    errorElement: <Error />,
   },
   {
    path: "/Login",
    element: <UserLogin />,
    errorElement: <Error />,
   },
  
      
    {
      path: "AdminDashboard",
      element: <Admindashboard />,
      errorElement: <Error />,
      children: [
        {
          path: "",
          element: <AdminHome />, // Default page for dashboard
        },
        {
          path: "AdminHome",
          element: <AdminHome />, // Default page for dashboard
        },
        {
          path: "Users",
          element: <AdminUserManagement />,
        },
        {
          path: "bookings",
          element: <AdminBookings />,
        },
        {
          path: "AdminVehicleTable",
          element: <AdminVehicle/>,
        },
        {
          path: "ticketspage",
          element: <Ticketspage/>,
        },
        {
          path: "FleetsPage",
          element: <FleetManagementPage/>,
        },
        {
          path: "LocationAndBranches",
          element: <LocationAndBranchesPage/>,
        },
        {
          path: "Reports",
          element: <Report/>,
        },
        {
          path: "AdminProfile",
          element: <AdminProfilePage/>,
        },
        // Add more dashboard routes as needed
      ],
    },
    {
      path: "UserDashboard",
      element: < UserDashboard/>,
      errorElement: <Error />,
      children: [
        {
          path: "",
          element: <UserHome/>, // Default page for dashboard
        },
        {
          path: "userHome",
          element: <UserHome />, // Default page for dashboard
        },
        {
          path: "AvailableVehicles",
          element: <UserAvailableVehicles />,
        },
        {
          path: "CurrentBookings",
          element: <CurrentBookings />,
        },
        {
          path: "BookingsHistory",
          element: <UserBookingsHistory />,
        },
        {
          path: "UserPayments",
          element: <UserPayments/>,
        },
        {
          path: "UserProfile",
          element: <UserProfilePage/>,
        },
        // Add more dashboard routes as needed
      ],
    },
    ]) 
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App
