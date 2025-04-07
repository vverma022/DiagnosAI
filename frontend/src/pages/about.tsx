const About = () => {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-diagnosai-red text-center">About the Project</h1>
        <p className="mb-4 text-gray-700">
          This Disease Prediction System leverages a Random Forest classifier to predict potential diseases based on user-input symptoms. It is built with a focus on accuracy, speed, and user-friendliness, aiming to assist in early detection and awareness. The system was trained on a comprehensive dataset of symptoms and diseases, and provides users with likely diagnoses that can be used for preliminary reference before consulting a medical professional.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2 text-center">System Design</h2>
        <p className="text-gray-700 mb-4">
          Below is a high-level diagram illustrating the system architecture and data flow of the disease prediction model.
        </p>
        <img src="/sysd.png" alt="System Design" className="w-full rounded-lg shadow-md" />
      </div>
    );
  };
  
  export default About;