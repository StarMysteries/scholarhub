const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen bg-green-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      <span className="ml-4 text-white font-semibold text-lg">Loading...</span>
    </div>
);

export default LoadingSpinner;