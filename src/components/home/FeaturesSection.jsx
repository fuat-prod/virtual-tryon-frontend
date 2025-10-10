const FeaturesSection = () => {
  const showcases = [
    {
      id: 1,
      title: "Casual to Elegant", 
      description: "Transform your everyday look into a stunning evening outfit instantly",
      image: "/feature-1.jpg",
      beforeLabel: "Before",
      afterLabel: "After"
    },
    {
      id: 2,
      title: "Style Swap Magic",
      description: "See how different clothing styles look on you before buying",
      image: "/feature-2.jpg",
      beforeLabel: "Original", 
      afterLabel: "New Style"
    },
    {
      id: 3,
      title: "Professional Try-on",
      description: "From casual to business ready in seconds with AI",
      image: "/feature-3.jpg",
      beforeLabel: "Casual",
      afterLabel: "Professional"
    }
  ];

  return (
    <section className="py-6 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 md:mb-6">
            AI-Powered Outfit Try-on
          </h2>
          <p className="text-base md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed px-4">
            Transform your look with our Inspiration Try-on tool. Upload your photo and your 
            favorite style image, and let our AI-Powered the rest. Discover your next look in seconds!
          </p>
        </div>

        {/* Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {showcases.map((showcase) => (
            <div 
              key={showcase.id} 
              className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={showcase.image}
                  alt={showcase.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                
                {/* Mobile: Labels */}
                <div className="md:hidden">
                  <div className="absolute top-2 left-2 bg-gray-800/80 backdrop-blur text-white text-xs px-2 py-1 rounded-full">
                    {showcase.beforeLabel}
                  </div>
                  <div className="absolute top-2 right-2 bg-violet-600/80 backdrop-blur text-white text-xs px-2 py-1 rounded-full">
                    {showcase.afterLabel}
                  </div>
                </div>

                {/* Desktop: Labels */}
                <div className="hidden md:block">
                  <div className="absolute top-3 left-3 bg-gray-800/80 backdrop-blur text-white text-sm px-3 py-1 rounded-full">
                    {showcase.beforeLabel}
                  </div>
                  <div className="absolute top-3 right-3 bg-violet-600/80 backdrop-blur text-white text-sm px-3 py-1 rounded-full">
                    {showcase.afterLabel}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                  {showcase.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {showcase.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
