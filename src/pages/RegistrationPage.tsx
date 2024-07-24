
import { Toaster } from "sonner";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";
import RegistrationForm from "../components/Registration";
const RegistrationPage =() => {
    
    return (
         < >
            <Toaster
                position="top-center" // Position notifications at the top center
                toastOptions={{
                    duration: 5000, // Duration in milliseconds
                }}
            />
         <Navbar/>
            <RegistrationForm/>
        <Footer/>
         </>
    )


}
export default RegistrationPage;