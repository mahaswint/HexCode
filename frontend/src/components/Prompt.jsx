import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHexagonNodes, 
    faListCheck, 
    faFilePen, 
    faSuitcase, 
    faUsers, 
    faArrowUp,
    faMicrophone 
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Prompt = () => {
    const [prompt, setPrompt] = useState("");

    return ( 
        <div className="relative w-[90vw] md:w-[50vw] h-auto min-h-[50vh] bg-white/10 backdrop-blur-lg rounded-2xl border border-t-4 border-l-2 border-indigo-400/60 shadow-lg shadow-black/30 p-4 mx-auto flex flex-col">
            <div className="relative z-10 flex flex-col items-center mt-20">
                <h3 className="text-lg font-semibold mb-4 text-gray-200">
                    AI Powered Development
                </h3>
            </div>

            <div className="relative z-10 flex justify-center mb-2 overflow-x-auto">
                <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 px-2">
                    <button className="px-3 py-2 text-sm md:text-base text-gray-300 bg-white/10 border border-white/20 rounded-full shadow-md hover:bg-white/20 transition whitespace-nowrap">
                        <FontAwesomeIcon icon={faSuitcase} className="mr-1" />
                        Port Folio
                    </button>
                    
                    <button className="px-3 py-2 text-sm md:text-base text-gray-300 bg-white/10 border border-white/20 rounded-full shadow-md hover:bg-white/20 transition">
                        <FontAwesomeIcon icon={faFilePen} className="mr-1" />
                        Blog
                    </button>
                    
                    <button className="px-3 py-2 text-sm md:text-base text-gray-300 bg-white/10 border border-white/20 rounded-full shadow-md hover:bg-white/20 transition">
                        <FontAwesomeIcon icon={faUsers} className="mr-1" />
                        Social
                    </button>
                    
                    <button className="px-3 py-2 text-sm md:text-base text-gray-300 bg-white/10 border border-white/20 rounded-full shadow-md hover:bg-white/20 transition">
                        <FontAwesomeIcon icon={faListCheck} className="mr-1" />
                        Tasks
                    </button>
                </div>
            </div>

            <div className="relative z-10 flex justify-center mt-auto p-2">
                <div className="bg-[#111] flex items-center w-full md:w-[600px] px-4 py-2 rounded-full border border-gray-800">
                    <textarea 
                        placeholder="Enter your prompt"
                        className="flex-1 bg-transparent text-white outline-none border-none px-2 placeholder-gray-400 text-sm md:text-md resize-none max-h-80 h-20 overflow-y-scroll"
                        style={{ height: 'auto', minHeight: '28px', maxHeight: '5em' }}
                        rows="1"
                        value={prompt}
                        onInput={(e) => {
                            setPrompt(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }} 
                    />
                    <style>
                        {`
                            textarea::-webkit-scrollbar {
                                width: 8px;
                            }
                            textarea::-webkit-scrollbar-thumb {
                                background-color: rgba(255, 255, 255, 0.6);
                                border-radius: 10px;
                            }
                            textarea::-webkit-scrollbar-thumb:hover {
                                background-color: rgba(255, 255, 255, 0.9);
                            }
                            textarea::-webkit-scrollbar-track {
                                background-color: #111;
                                border-radius: 10px;
                            }
                        `}
                    </style>
                    {!prompt.trim()? (
                            <button className={`ml-2 hover:text-gray-300 px-3`}>
                                <FontAwesomeIcon icon={faMicrophone} className="h-5 w-5 md:h-6 md:w-6"/>
                            </button>
                            
                        ) : (
                            <button className={`ml-2 hover:text-gray-300 px-3`}>                         
                                <FontAwesomeIcon icon={faArrowUp} className="h-5 w-5 md:h-6 md:w-6"/>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Prompt;