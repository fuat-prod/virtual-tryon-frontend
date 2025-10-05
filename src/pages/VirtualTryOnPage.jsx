import { useState, useEffect } from 'react'
import { virtualTryOnService } from '../services/api'
import CategorySelector from '../components/common/CategorySelector'
import ImageUploader from '../components/upload/ImageUploader'
import ResultDisplay from '../components/result/ResultDisplay'
import ProgressBar from '../components/common/ProgressBar'
import PhotoGuide from '../components/common/PhotoGuide'
import Header from '../components/common/Header'

const categories = [
  { value: 'upper_body', label: 'Upper Body', icon: '👚' },
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
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-4">
      {/* Floating orbs for depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">        

      <Header />
        
        <ProgressBar currentStep={isLoading ? 3 : resultImageUrl ? 4 : currentStep} />
        
        <CategorySelector 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <PhotoGuide />
        
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
        
        <div className="text-center mb-6">
          <button
            onClick={handleGenerate}
            disabled={!isGenerateEnabled}
          className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
            isGenerateEnabled
             ? 'btn-primary transform hover:scale-[1.02]'
             : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>AI Processing...</span>
              </span>
            ) : (
              <span>✨ Try with AI</span>
            )}
          </button>
        </div>
        
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
