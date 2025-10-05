import Logo from './Logo'

const Header = () => {
  return (
    <header className="relative z-10 mb-8 pt-6">
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-3xl" />
      <div className="relative flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4">
          <Logo size="large" type="image" />
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-white drop-shadow-lg">
              Dress AI
            </span>
          </h1>
        </div>
        <p className="text-white/90 text-center text-sm md:text-base max-w-md drop-shadow">
          Experience the future of fashion with AI-powered virtual try-on technology
        </p>
        <div className="mt-4 flex items-center gap-2 text-white/80 text-xs">
          <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur">
            ✨ AI Powered
          </span>
          <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur">
            💎 High Quality Results
          </span>
          <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur">
            👗 Fashion Trends
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
