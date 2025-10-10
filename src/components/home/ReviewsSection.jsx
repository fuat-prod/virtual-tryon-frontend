const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Enthusiast",
      rating: 5,
      comment: "This app is amazing! The AI is incredibly accurate and saves me so much time on returns.",
    },
    {
      id: 2,
      name: "Emily Chen",
      role: "Style Blogger",
      rating: 5,
      comment: "Game changer for online shopping! I've been recommending this to all my followers.",
    },
    {
      id: 3,
      name: "Maria Garcia",
      role: "Busy Professional",
      rating: 5,
      comment: "Perfect for someone with no time to shop. The AI technology is impressive!",
    },
    {
      id: 4,
      name: "Jessica Taylor",
      role: "Fashion Lover",
      rating: 5,
      comment: "It's helped me discover new looks I never thought would suit me!",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Online Shopper",
      rating: 5,
      comment: "No more returns! I can see exactly how clothes will look on me.",
    }
  ];

  return (
    <section className="py-8 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">
            User Reviews & Feedback
          </h2>
          <p className="text-base text-white/80">
            Real experiences from real Dress AI users
          </p>
        </div>

        {/* Mobile Slider / Desktop Grid */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
            {reviews.map((review) => (
              <div 
                key={review.id}
                className="flex-none w-[85vw] snap-center"
              >
                <div className="glass-card rounded-xl p-4 h-full flex flex-col">
                  {/* Rating Stars - Sol hizalı */}
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>

                  {/* Review Text - Sol hizalı */}
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed text-left flex-grow">
                    "{review.comment}"
                  </p>

                  {/* User Name - Sol alt köşe */}
                  <div className="text-left mt-auto">
                    <h4 className="font-semibold text-gray-800 text-sm">{review.name}</h4>
                    <p className="text-xs text-gray-600">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.slice(0, 4).map((review) => (
              <div 
                key={review.id}
                className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Rating Stars - Sol hizalı */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>

                {/* Review Text - Sol hizalı */}
                <p className="text-gray-700 text-sm mb-4 leading-relaxed text-left flex-grow">
                  "{review.comment}"
                </p>

                {/* User Info - Sol hizalı */}
                <div className="text-left mt-auto">
                  <h4 className="font-semibold text-gray-800">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;