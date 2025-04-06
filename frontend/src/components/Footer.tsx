
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-diagnosai-gray mt-auto">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DiagnosAI. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-diagnosai-red transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-diagnosai-red transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-diagnosai-red transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
