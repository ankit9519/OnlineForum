const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-700">
            <div className="container">
                <div className="text-center">
                    <h1 className="text-9xl font-bold text-blue-600">404</h1>
                    <h2 className="text-6xl mb-8">Ottotto! Pēji ga mitsukarimasen.</h2>
                    <p className="text-lg">The page you are looking for does not exist.</p>
                    <a href="/" className="btn btn-primary btn-lg mt-8">
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
