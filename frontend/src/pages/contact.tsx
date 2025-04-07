import React from 'react';
import { Github } from 'lucide-react';

const Contact = () => {
  return (
    <div className="p-6 max-w-xl mx-auto text-center text-diagnosai-red">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <img 
        src="https://avatars.githubusercontent.com/u/109036913?v=4" 
        alt="Profile" 
        className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-blue-500" 
      />
      <p className="mb-2 text-gray-700">Have questions or want to collaborate?</p>
      <a 
        href="https://github.com/vverma022" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 hover:underline"
      >
        <Github size={24} /> Visit my GitHub
      </a>
    </div>
  );
};

export default Contact;
