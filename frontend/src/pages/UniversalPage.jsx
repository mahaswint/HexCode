// import { TemplateCard } from "../components/TemplateCard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// const templates = [
//     { title: "Blank Bot", description: "Create a blank chatbot, which you can train and customize later.", imgSrc:"/assets/IMG_0664.jpg" },
//     { title: "Website", description: "Crawl your website’s content to get answers to popular user questions.", imgSrc:"/assets/IMG_0664.jpg" },
//     { title: "Zendesk", description: "Scan your Zendesk help center articles to answer customer questions.", imgSrc:"/assets/IMG_0664.jpg" },
//     { title: "Knowledge Base", description: "Scrap your Knowledge Base articles to answer customer questions.", imgSrc:"/assets/IMG_0664.jpg" },
//     { title: "Online Quiz Bot", description: "Engage your customers with a chatbot quiz tailored to your needs.", imgSrc:"/assets/IMG_0664.jpg" },
//     { title: "Job Application Bot", description: "Automate sourcing candidates to speed up your hiring process.", imgSrc:"/assets/IMG_0664.jpg" },
//     { title: "FAQ Bot", description: "Answer frequently asked questions with a chatbot and save your time.", imgSrc:"/assets/IMG_0664.jpg" },
//     { title: "Customer Satisfaction", description: "Automate collecting surveys to capture the voice and opinions of your customers.", imgSrc:"/assets/IMG_0664.jpg" },
//     { title: "Create HelpDesk Tickets", description: "Let customers create HelpDesk tickets while chatting with your chatbot.", imgSrc:"/assets/IMG_0664.jpg" }
//   ];

//   export const UniversalPage = () => {
//     return (
//         <div className="bg-gradient-to-br from-black from-40% via-gray-900 via-60% to-indigo-900 to-90%">
//         <div className="text-white p-8">
        
//           {/* <div className="flex justify-between items-center mb-6">
//             <span className="text-sm bg-blue-500 px-4 py-1 rounded">Days left in your trial: 14</span>
//             <button className="bg-gray-700 px-4 py-2 rounded">Upgrade Now</button>
//           </div> */}
//           <div className="flex justify-between">
//             <div className="text-2xl font-bold mb-4">Public Projects</div>
//             <div className="flex items-center my-4 mx-4 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
//               <input
//                 className="flex-grow px-4 py-2 text-sm rounded-full bg-transparent outline-none dark:text-white"
//                 placeholder="Search projects..."
//               />
//               <button className="p-3 text-gray-300 dark:text-gray-300 hover:text-blue-500 transition">
//                 <FontAwesomeIcon icon={faMagnifyingGlass} />
//               </button>
//             </div>
//           </div>
//           <p className="text-gray-400 mb-6">Train your chatbot with data, use our ready-to-use templates or start from scratch.</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {templates.map((template, index) => (
//               <TemplateCard key={index} title={template.title} description={template.description} imgSrc={template.imgSrc} />
//             ))}
//           </div>
//         </div>
//         </div>
        
//       );
//   };

import { TemplateCard } from "../components/TemplateCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRocket } from "@fortawesome/free-solid-svg-icons";

const templates = [
  { title: "Blank Bot", description: "Create a blank chatbot, which you can train and customize later.", imgSrc: "/assets/IMG_0664.jpg" },
  { title: "Website", description: "Crawl your website’s content to get answers to popular user questions.", imgSrc: "/assets/IMG_0664.jpg" },
  { title: "Zendesk", description: "Scan your Zendesk help center articles to answer customer questions.", imgSrc: "/assets/IMG_0664.jpg" },
  { title: "Knowledge Base", description: "Scrape your Knowledge Base articles to answer customer questions.", imgSrc: "/assets/IMG_0664.jpg" },
  { title: "Online Quiz Bot", description: "Engage your customers with a chatbot quiz tailored to your needs.", imgSrc: "/assets/IMG_0664.jpg" },
  { title: "Job Application Bot", description: "Automate sourcing candidates to speed up your hiring process.", imgSrc: "/assets/IMG_0664.jpg" },
  { title: "FAQ Bot", description: "Answer frequently asked questions with a chatbot and save time.", imgSrc: "/assets/IMG_0664.jpg" },
  { title: "Customer Satisfaction", description: "Automate collecting surveys to capture your customers' voices and opinions.", imgSrc: "/assets/IMG_0664.jpg" },
  { title: "Create HelpDesk Tickets", description: "Let customers create HelpDesk tickets while chatting with your chatbot.", imgSrc: "/assets/IMG_0664.jpg" }
];

const SearchBar = () => (
  <div className="relative w-full max-w-sm">
    <input
      className="w-full px-5 py-3 text-sm rounded-full bg-gray-800 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
      placeholder="Search projects..."
    />
    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </button>
  </div>
);

export const UniversalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white px-8 py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-wide"><FontAwesomeIcon icon={faRocket} /> Public Projects</h2>
        <SearchBar />
      </div>

      {/* Description */}
      <p className="text-gray-400 mb-8 text-lg max-w-2xl">
        Train your chatbot with data, use our ready-to-use templates, or start from scratch.
      </p>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <div 
            key={index} 
            className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl overflow-hidden bg-gray-800"
          >
            <TemplateCard 
              title={template.title} 
              description={template.description} 
              imgSrc={template.imgSrc} 
              altText={`Preview of ${template.title} template`} 
            />
          </div>
        ))}
      </div>

    </div>
  );
};
