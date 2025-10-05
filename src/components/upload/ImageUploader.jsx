import { useState, useRef } from 'react';

const ImageUploader = ({ 
  title, 
  description, 
  onImageUpload, 
  uploadedImage,
  isActive,
  stepNumber 
}) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (file) => {
    if (!file) return;
    
    // Validate file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      setError('Unsupported format. Use JPG, PNG or WEBP.');
      return;
    }
    if (file.size > maxSize) {
      setError('File too large. Maximum 10MB allowed.');
      return;
    }

    setError(null);
    setIsUploading(true);
    
    try {
      onImageUpload(file);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current.click();
  };

  const isCompleted = uploadedImage !== null;

  return (
    <div className={`
     glass-card rounded-2xl p-6 transition-all duration-300
     ${isActive ? 'ring-2 ring-violet-500 shadow-glow' : ''}
     ${error ? 'animate-pulse' : ''}
     hover:shadow-xl
   `}>
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
        <span className={`
          inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm mr-3
          ${isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'}
        `}>
          {isCompleted ? '✓' : stepNumber}
        </span>
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <div 
        onClick={openFileSelector}
       className="border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer transition-all duration-300 border-gray-300/50 hover:border-violet-500 hover:bg-violet-50/30 backdrop-blur"
      >
        {uploadedImage ? (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={URL.createObjectURL(uploadedImage)} 
                alt="Preview" 
                className="max-w-full max-h-48 mx-auto shadow-md rounded-lg"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-green-600 font-medium">✓ Photo uploaded successfully</p>
              <p className="text-xs text-gray-500">
                {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button 
                onClick={(e) => {e.stopPropagation(); openFileSelector();}}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Change Photo
              </button>
            </div>
          </div>
        ) : isUploading ? (
          <div className="space-y-4">
            <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600">Processing image...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-4xl md:text-6xl text-gray-400">📷</div>
            <div>
              <p className="text-lg font-medium text-gray-700">Tap to Upload Photo</p>
              <p className="text-sm text-gray-500 mt-2">Camera or Gallery</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP • Max 10MB</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">⚠️ {error}</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
