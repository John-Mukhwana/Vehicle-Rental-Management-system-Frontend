
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
         <Navbar toggleSidebar={function (): void {
                throw new Error("Function not implemented.");
            } }/>
            <RegistrationForm/>
        <Footer/>
         </>
    )


}
export default RegistrationPage;