import { useState } from 'react';

const ResultDisplay = ({ 
  resultImageUrl, 
  isLoading, 
  onDownload, 
  progress, 
  error, 
  selectedCategory 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isLoading && !resultImageUrl && !error) {
    return null;
  }

  return (
      <div className="glass-card rounded-2xl p-6 shadow-xl">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
        <span className={`
          inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm mr-3
          ${error ? 'bg-red-500' : resultImageUrl ? 'bg-green-500' : 'bg-blue-500'}
        `}>
          {error ? '⚠' : resultImageUrl ? '✓' : '4'}
        </span>
        Result
      </h3>

      <div className="text-center">
        {isLoading ? (
          <div className="space-y-6 py-8">
            <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="space-y-3">
              <p className="text-lg font-medium text-gray-700">AI Processing...</p>
              <p className="text-sm text-gray-500">{progress || 'Processing may take 30-60 seconds'}</p>
            </div>
            <div className="max-w-xs mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse" 
                   style={{width: '70%'}}></div>
            </div>
          </div>
        ) : error ? (
          <div className="space-y-4 py-8">
            <div className="text-4xl md:text-6xl text-red-400">⚠️</div>
            <div>
              <p className="text-lg font-medium text-red-600 mb-2">Process Failed</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : resultImageUrl ? (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 font-medium">🎉 Virtual try-on completed!</p>
            </div>
            
            <div className="relative">
              <img 
                src={resultImageUrl} 
                alt="Virtual Try-On Result" 
                className={`max-w-full max-h-96 mx-auto shadow-lg border rounded-lg transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={onDownload}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                📥 Download
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                🔄 Try Again
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ResultDisplay;
