import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-blue-900 font-bold">GS</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Government Services</h1>
            <p className="text-blue-200 text-sm">Service Catalogue Portal</p>
          </div>
        </Link>
      </div>
    </header>
  );
}