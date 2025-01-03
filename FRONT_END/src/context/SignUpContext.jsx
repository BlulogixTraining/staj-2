import React, { createContext, useState, useContext } from 'react';
const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    smsCode: '',
    email: '',
    password: '',
    purposeOfUse: '',
    personalDescription: '',
    companyName: '',
    businessDirection: '',
    teamSize: '',
    teamEmails: []
  });

  const updateFormData = (newData) => {
    setFormData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  const nextStep = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
  };

  return (
    <SignUpContext.Provider 
      value={{ 
        currentStep, 
        formData, 
        updateFormData, 
        nextStep, 
        prevStep 
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUp = () => useContext(SignUpContext);