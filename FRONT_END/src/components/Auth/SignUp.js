import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SignIn.css';
import '../../styles/SignUp.css';

const steps = [
  'Validate Your Phone',
  'Tell About Yourself',
  'Tell About Your Company',
  'Invite Team Members',
];

const SignUp = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    phone: '',
    smsCode: '',
    email: '',
    password: '',
    usageReason: '',
    selfDescription: '',
    companyName: '',
    businessDirection: '',
    teamSize: '',
    teamMembers: [''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAddMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, ''],
    }));
  };

  const handleFinalSubmit = () => {
    console.log('Final Form Data:', formData);
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="smsCode"
              placeholder="Code from SMS"
              value={formData.smsCode}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
            />
          </>
        );
      case 1:
        return (
          <>
            <h3>Why will you use the service?</h3>
            <input
              type="text"
              name="usageReason"
              value={formData.usageReason}
              onChange={handleChange}
            />
            <h3>What describes you best?</h3>
            <input
              type="text"
              name="selfDescription"
              value={formData.selfDescription}
              onChange={handleChange}
            />
          </>
        );
      case 2:
        return (
          <>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
            />
            <h3>What is the business direction?</h3>
            <input
              type="text"
              name="businessDirection"
              value={formData.businessDirection}
              onChange={handleChange}
            />
            <h3>How many people are in your team?</h3>
            <input
              type="text"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
            />
          </>
        );
      case 3:
        return (
          <>
            {formData.teamMembers.map((email, index) => (
              <input
                key={index}
                type="email"
                placeholder="Team Member Email"
                value={email}
                onChange={(e) => {
                  const updatedTeamMembers = [...formData.teamMembers];
                  updatedTeamMembers[index] = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    teamMembers: updatedTeamMembers,
                  }));
                }}
              />
            ))}
            <button onClick={handleAddMember}>Add Another Member</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sign-up-container">
      <div className="sidebar">
        <h3>Steps</h3>
        <ul>
          {steps.map((step, index) => (
            <li key={index} className={index === currentStep ? 'active' : ''}>
              {step}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        <h2>{steps[currentStep]}</h2>
        {renderStepContent()}
        <div className="buttons">
          {currentStep > 0 && <button onClick={handleBack}>Back</button>}
          <button onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
