
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-diagnosai-gray">
      <div className="container py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-diagnosai-red">Diagnos</span>
            <span className="text-diagnosai-black">AI</span>
          </h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li>
              <a href="#" className="text-sm hover:text-diagnosai-red transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-diagnosai-red transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:text-diagnosai-red transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
