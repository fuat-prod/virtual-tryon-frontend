import { useState, useEffect } from 'react'
import { virtualTryOnService } from '../services/api'
import CategorySelector from '../components/common/CategorySelector'
import ImageUploader from '../components/upload/ImageUploader'
import ResultDisplay from '../components/result/ResultDisplay'

const categories = [
  { value: 'upper_body', label: 'Upper Body', icon: '👔' },
  { value: 'lower_body', label: 'Lower Body', icon: '👖' },
  { value: 'dresses', label: 'Dress', icon: '👗' }
];

function VirtualTryOnPage() {
  const [selectedCategory, setSelectedCategory] = useState('upper_body')
  const [userImage, setUserImage] = useState(null)
  const [clothingImage, setClothingImage] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [resultImageUrl, setResultImageUrl] = useState(null)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState('')

  useEffect(() => {
    if (!userImage) setCurrentStep(1)
    else if (!clothingImage) setCurrentStep(2)
    else setCurrentStep(3)
  }, [userImage, clothingImage])

  const handleGenerate = async () => {
    if (!userImage || !clothingImage) {
      alert('Please upload both photos!');
      return;
    }

    setIsLoading(true);
    setResultImageUrl(null);
    setError(null);
    setProgress('Initializing AI model...');

    try {
      const data = await virtualTryOnService.processImage(
        userImage, 
        clothingImage, 
        selectedCategory
      );

      if (data.success) {
        setResultImageUrl(data.imageUrl);
        setProgress('Process completed!');
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }

    } catch (error) {
      console.error('❌ Process error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
      setProgress('');
    }
  };

  const handleDownload = () => {
    if (resultImageUrl) {
      const link = document.createElement('a');
      link.href = resultImageUrl;
      link.download = `ai-virtual-tryon-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const isGenerateEnabled = userImage && clothingImage && !isLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
          👗 Dress AI Virtual Try-On
        </h1>
        
        <CategorySelector 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ImageUploader
            title="Person Photo"
            description="Full body, standing straight, plain background"
            onImageUpload={setUserImage}
            uploadedImage={userImage}
            stepNumber={1}
            isActive={currentStep === 1}
          />
          
          <ImageUploader
            title={`${categories.find(c => c.value === selectedCategory)?.label || 'Clothing'} Photo`}
            description="Clothing item laid flat, clear and wrinkle-free"
            onImageUpload={setClothingImage}
            uploadedImage={clothingImage}
            stepNumber={2}
            isActive={currentStep === 2}
          />
        </div>
        
        {/* Generate Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleGenerate}
            disabled={!isGenerateEnabled}
            className={`px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 ${
              isGenerateEnabled
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>AI Processing...</span>
              </span>
            ) : (
              <span>🤖 Try with AI</span>
            )}
          </button>
        </div>
        
        {/* Result Display */}
        <ResultDisplay
          resultImageUrl={resultImageUrl}
          isLoading={isLoading}
          progress={progress}
          error={error}
          selectedCategory={selectedCategory}
          onDownload={handleDownload}
        />
      </div>
    </div>
  )
}

export default VirtualTryOnPage
