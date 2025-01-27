// export const TemplateCard = ({ title, description, imgSrc }) => {
//     return (
//       <div className="bg-gradient-to-b from-slate-800 to-slate-700 p-6 rounded-2xl shadow-md text-white border border-gray-600 hover:scale-105 ease-in duration-300 ease-out">
//         <div className="flex justify-between">
//         <h3 className="text-lg font-semibold mb-2">{title}</h3>
//           <button className="flex items-center text-xs border rounded-full px-1 mt-1">
//              PREVIEW
//           </button>
//         </div>
        
//         <p className="text-sm text-gray-300">{description}</p>
//         <img src={imgSrc} className="mt-2 w-full" alt="website preview"/>
//       </div>
//     );
//   };
export const TemplateCard = ({ title, description, imgSrc }) => {
  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-700 p-6 rounded-2xl border border-gray-700 hover:scale-105 transition-transform duration-300 ease-out flex flex-col h-[350px]">
      
      {/* Title & Preview Button */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <button className="px-3 py-1 text-xs font-medium uppercase rounded-full border border-blue-500 bg-blue-900/30 text-blue-400 hover:bg-blue-500 hover:text-white transition">
          Preview
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 leading-relaxed flex-grow">
        {description}
      </p>

      {/* Image */}
      <div className="mt-4 overflow-hidden rounded-xl h-[120px]">
        <img
          src={imgSrc}
          className="w-full h-full object-cover rounded-lg"
          alt={`${title} preview`}
          onError={(e) => (e.target.style.display = 'none')} // Hide if broken
        />
      </div>

    </div>
  );
};

