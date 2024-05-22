import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg border">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 leading-relaxed">
          Welcome to our doctor-patient management system. By using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
        <p className="text-gray-700 leading-relaxed">
          You must create an account to access our services. You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Medical Information</h2>
        <p className="text-gray-700 leading-relaxed">
          You agree to provide accurate and complete medical information to your healthcare providers through our system. Any intentional misrepresentation or omission of medical information may result in serious consequences and will be considered a violation of these Terms and Conditions.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Privacy and Confidentiality</h2>
        <p className="text-gray-700 leading-relaxed">
          We respect your privacy and take appropriate measures to protect your personal and medical information. However, we cannot guarantee the security of any information transmitted over the internet or stored on our systems. You acknowledge and agree that you are solely responsible for any disclosure or transmission of your information.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
        <p className="text-gray-700 leading-relaxed">
          Our services are provided on an "as is" and "as available" basis. We make no warranties or representations of any kind, express or implied, regarding the accuracy, reliability, or completeness of the information provided through our system. In no event shall we be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with the use of our services.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms and Conditions</h2>
        <p className="text-gray-700 leading-relaxed">
          We reserve the right to modify or update these Terms and Conditions at any time without prior notice. Your continued use of our services after any changes constitutes your acceptance of the new Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;