import React from "react";
import RegistrationForm from "../components/RegisterForm";

const Register: React.FC = () => {
  return (
    <div>
      <RegistrationForm onSubmit={() => void} />
    </div>
  );
};

export default Register;
