import React from 'react';

export function BCFooter() {
  return (
    <footer className="mt-16">
      {/* Land Acknowledgement - Dark section with yellow top border */}
      <div className="bg-gray-800 text-white border-t-4 border-yellow-400">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm leading-relaxed">
            The B.C. Public Service acknowledges the territories of First Nations around B.C. and is grateful to carry out our work on these lands. We acknowledge the rights, 
            interests, priorities, and concerns of all Indigenous Peoples - First Nations, Métis, and Inuit - respecting and acknowledging their distinct cultures, histories, rights, laws, 
            and governments.
          </p>
        </div>
      </div>

      {/* Main footer content - Light gray section */}
      <div className="bg-gray-100 text-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side - BC Logo and contact info */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-12 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">BC</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-3">British Columbia</h3>
                <div className="space-y-1 text-sm">
                  <p>We can help in over 220 languages and through</p>
                  <p>other accessible options. <a href="#" className="text-primary underline">Call, email or text us</a>,</p>
                  <p>or <a href="#" className="text-primary underline">find a service centre</a>.</p>
                </div>
              </div>
            </div>

            {/* Right side - Links */}
            <div>
              <h4 className="mb-4">MORE INFO</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div><a href="https://www2.gov.bc.ca/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">BC Government Website</a></div>
                  <div><a href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/contact-us" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Contact Us</a></div>
                  <div><a href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/accessibility" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Accessibility</a></div>
                  <div><a href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy</a></div>
                </div>
                <div className="space-y-2">
                  <div><a href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/disclaimer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Disclaimer</a></div>
                  <div><a href="https://www2.gov.bc.ca/gov/content/about-gov-bc-ca/copyright" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Copyright</a></div>
                  <div><a href="https://news.gov.bc.ca/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">BC Gov News</a></div>
                  <div><a href="https://www2.gov.bc.ca/gov/content/governments/services-for-government" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Services for Government</a></div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright line */}
          <div className="border-t border-gray-300 mt-8 pt-4">
            <p className="text-sm text-gray-600">© 2024 Government of British Columbia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}