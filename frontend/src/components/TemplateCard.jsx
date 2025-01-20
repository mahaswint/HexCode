export const TemplateCard = ({ title, description, imgSrc }) => {
    return (
      <div className="bg-gradient-to-b from-slate-800 to-slate-700 p-6 rounded-2xl shadow-md text-white border border-gray-600 hover:scale-105 ease-in duration-300 ease-out">
        <div className="flex justify-between">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <button className="flex items-center text-xs border rounded-full px-1 mt-1">
             PREVIEW
          </button>
        </div>
        
        <p className="text-sm text-gray-300">{description}</p>
        <img src={imgSrc} className="mt-2 w-full" alt="website preview"/>
      </div>
    );
  };