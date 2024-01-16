// Footer component
const Footer = () => {
  return (
    // Footer container with background and text styles
    <footer className="bg-base-300 text-base-content inset-x-0 bottom-0">
      {/* Container for centering content and adding padding */}
      <div className="container mx-auto text-center py-4">
        {/* Copyright information with smaller text size */}
        <p className="text-sm">Copyright © 2024 - All rights reserved by Intellipaat</p>
      </div>
    </footer>
  );
};

// Export Footer component for use in other parts of the application
export default Footer;
