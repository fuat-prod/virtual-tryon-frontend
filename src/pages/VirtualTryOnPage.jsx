import { useState, useEffect } from 'react'
import { virtualTryOnService } from '../services/api'
import { useUser } from '../contexts/UserContext'
import PaywallModal from '../components/payment/PaywallModal'
import CategorySelector from '../components/common/CategorySelector'
import ImageUploader from '../components/upload/ImageUploader'
import ResultDisplay from '../components/result/ResultDisplay'
import ProgressBar from '../components/common/ProgressBar'
import PhotoGuide from '../components/common/PhotoGuide'
import FeaturesSection from '../components/home/FeaturesSection'
import ReviewsSection from '../components/home/ReviewsSection'

const categories = [
  { value: 'upper_body', label: 'Upper Body', icon: '👚' },
  { value: 'lower_body', label: 'Lower Body', icon: '👖' },
  { value: 'dresses', label: 'Full Outfit', icon: '👗' }
];


function VirtualTryOnPage() {
  const { user, loading: userLoading, updateUserCredits, useFreeTrialLocally } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('upper_body')
  const [userImage, setUserImage] = useState(null)
  const [clothingImage, setClothingImage] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [resultImageUrl, setResultImageUrl] = useState(null)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState('')

 // Paywall modal state
  const [showPaywall, setShowPaywall] = useState(false)
  const [paywallReason, setPaywallReason] = useState('no_credits') 

  useEffect(() => {
    if (!userImage) setCurrentStep(1)
    else if (!clothingImage) setCurrentStep(2)
    else setCurrentStep(3)
  }, [userImage, clothingImage])

  const handleGenerate = async () => {
  // Her iki resim de gerekli
  if (!userImage || !clothingImage) {
    alert('Please upload both photos!');
    return;
  }

  // User kontrolü
  if (!user) {
    alert('Please wait, user is loading...');
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
      selectedCategory,
      user.id  // ← USER ID EKLENDI
    );

    if (data.success) {
      setResultImageUrl(data.imageUrl);
      setProgress('Process completed!');
      
      // Update user credits/trials locally
      if (data.usedFreeTrial) {
        useFreeTrialLocally();
      } else {
        updateUserCredits(data.creditsRemaining);
      }
    } else {
      throw new Error(data.error || 'Unknown error occurred');
    }

  } catch (error) {
    console.error('❌ Process error:', error);
    
    // Check for NO_CREDITS error
    if (error.code === 'NO_CREDITS') {
      setError('No free trials or credits remaining. Please purchase credits to continue.');
      setShowPaywall(true);
      setPaywallReason('no_credits');
    } else {
      setError(error.message);
    }
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
   <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 pt-20 px-4 pb-8 md:pt-24 md:p-4">
      {/* Floating orbs for depth - mobile optimized */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 md:w-80 h-40 md:h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-40 md:w-80 h-40 md:h-80 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-96 h-48 md:h-96 bg-white/5 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">        

        <FeaturesSection />    
    
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


        {/* TEST: Paywall Button - Production'da silinecek */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowPaywall(true)}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-semibold"
          >
            🧪 Test Paywall Modal
          </button>
        </div>


        <ReviewsSection />   


        <PaywallModal 
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
          reason={paywallReason}
        />

      </div>
    </div>
  )
}

export default VirtualTryOnPage