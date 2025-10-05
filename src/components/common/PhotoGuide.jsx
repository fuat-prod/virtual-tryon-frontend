const PhotoGuide = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 mb-6">
      <h3 className="text-lg font-bold text-blue-800 mb-3">📸 Photo Guide</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <h4 className="font-semibold text-blue-700 mb-2">👤 Person Photo:</h4>
          <ul className="text-sm text-blue-600 space-y-1">
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              Full body visible
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              Standing straight
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              Plain background
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              Clear quality
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-blue-700 mb-2">👕 Clothing Photo:</h4>
          <ul className="text-sm text-blue-600 space-y-1">
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              Laid flat or on hanger
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              White background
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              Complete garment visible
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              Wrinkle-free
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-700">
          <span className="font-semibold">💡 Tip:</span> Best results with 768x1024 pixels, JPG or PNG format.
        </p>
      </div>
    </div>
  );
};

export default PhotoGuide;
