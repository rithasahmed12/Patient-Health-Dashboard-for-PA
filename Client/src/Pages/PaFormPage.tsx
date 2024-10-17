import Navbar from "../Components/Navbar/Navbar";
import PriorAuthorizationForm from "../Components/PriorAuthorization/PAForm";

const PaFormPage = () => {
  return (
    <>
      {/* Keep the navbar fixed at the top */}
      <Navbar />
      
      {/* Add padding or margin to the content below the fixed navbar */}
      <div className="pt-16 bg-gray-100 pb-16"> 
        <PriorAuthorizationForm />
      </div>
    </>
  );
};

export default PaFormPage;
