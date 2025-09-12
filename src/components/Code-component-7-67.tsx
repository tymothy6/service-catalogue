import React from 'react';
import { Link } from 'react-router-dom';

export function BCHeader() {
  return (
    <header className="bg-primary text-primary-foreground">
      {/* Top banner */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-foreground rounded flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">BC</span>
                </div>
                <div>
                  <div className="text-lg font-bold">Government of British Columbia</div>
                  <div className="text-sm opacity-90">Service Catalogue</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation bar */}
      <div className="bg-accent">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8 py-3">
            <Link 
              to="/" 
              className="text-accent-foreground hover:text-primary-foreground transition-colors px-3 py-2 rounded"
            >
              Home
            </Link>
            <span className="text-accent-foreground opacity-75">|</span>
            <span className="text-accent-foreground">
              Service Directory
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
}