const ProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 1, title: "Person", icon: "👩" },
    { id: 2, title: "Clothing", icon: "👚" },
    { id: 3, title: "AI Process", icon: "✨" },
    { id: 4, title: "Result", icon: "💎" }
  ];

     return (
          <div className="mb-6">
            <div className="flex justify-between items-center">
               {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center flex-1 relative">
                  <div className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center 
                    text-sm md:text-lg font-bold border-2 transition-all duration-300
                    ${currentStep === step.id ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 border-violet-500 text-white shadow-glow scale-110' : 
                    currentStep > step.id ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-green-500 text-white' : 
                    'border-gray-300/50 bg-white/50 backdrop-blur text-gray-400'}
          `}>

              {step.icon}
            </div>
            <span className={`mt-1 text-xs md:text-sm font-medium text-center ${
              currentStep >= step.id ? 'text-gray-800' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`absolute top-5 left-1/2 w-full h-0.5 ${
                currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
              }`} style={{transform: 'translateX(50%)', width: 'calc(100% - 40px)'}} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
