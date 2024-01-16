// NotFoundPage component for displaying a 404 error
const NotFoundPage = () => {
    return (
        // Main container with flex layout to center content vertically and horizontally
        <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-700">
            <div className="container">
                <div className="text-center">
                    {/* Large 404 text with blue color */}
                    <h1 className="text-9xl font-bold text-blue-600">404</h1>

                    {/* Subtitle text */}
                    <h2 className="text-6xl mb-8">Ottotto! Pēji ga mitsukarimasen.</h2>

                    {/* Explanation text for the user */}
                    <p className="text-lg">The page you are looking for does not exist.</p>

                    {/* Go Home button with a link to the home page */}
                    <a href="/" className="btn btn-primary btn-lg mt-8">
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
