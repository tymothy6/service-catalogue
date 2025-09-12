import React from 'react';

export function BCFooter() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Government Links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Government</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www2.gov.bc.ca/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
                >
                  BC Government Website
                </a>
              </li>
              <li>
                <a 
                  href="https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
                >
                  Ministries & Organizations
                </a>
              </li>
              <li>
                <a 
                  href="https://www2.gov.bc.ca/gov/content/governments/services-for-government" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
                >
                  Services for Government
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold mb-4 text-lg">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/contact-us" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/web-presence/social-media-guidelines" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
                >
                  Social Media
                </a>
              </li>
              <li>
                <a 
                  href="https://news.gov.bc.ca/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
                >
                  BC Gov News
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold mb-4 text-lg">About</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
                >
                  About gov.bc.ca
                </a>
              </li>
              <li>
                <a 
                  href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/accessibility" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
                >
                  Accessibility
                </a>
              </li>
              <li>
                <a 
                  href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/disclaimer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <a 
                href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/copyright" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
              >
                Copyright
              </a>
              <a 
                href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
              >
                Privacy
              </a>
              <a 
                href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/accessibility" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground hover:text-accent-foreground transition-colors text-sm"
              >
                Accessibility
              </a>
            </div>
            <div className="text-sm text-primary-foreground/75">
              © 2024 Government of British Columbia
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}