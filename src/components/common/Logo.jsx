const Logo = ({ size = "default", type = "image" }) => {
  const sizes = {
    small: "h-8 w-8",
    default: "h-10 w-10", 
    large: "h-16 w-16"
  }

  // Görsel Logo
  if (type === "image") {
    return (
      <div className={`${sizes[size]} relative`}>
        <img 
          src="/logo.png"  // logo dosya adınızı buraya yazın
          alt="Dress AI Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    )
  }

  // Text Logo
  if (type === "text") {
    return (
      <div className="font-display font-bold">
        <span className="text-white text-3xl">Dress</span>
        <span className="text-white/90 text-3xl font-light">AI</span>
      </div>
    )
  }
}

export default Logo
