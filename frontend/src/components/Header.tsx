
import React from 'react';
import { ModeToggle } from './ui/mode-toggle';
import { HeartPulseIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-diagnosai-gray">
      <div className="container py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            <HeartPulseIcon className="w-8 h-8 text-diagnosai-red inline-block mr-2" />
            <span className="text-diagnosai-red">Diagnos</span>
            <span className="text-diagnosai-black">AI</span>
          </h1>
        </div>
        <nav>
          <ul className="flex gap-6">
          <li>
             
            </li>
            <li>
              <a href="/" className="text-sm hover:text-diagnosai-red transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-sm hover:text-diagnosai-red transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-sm hover:text-diagnosai-red transition-colors">
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
