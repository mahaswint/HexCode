import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHexagonNodes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Footer = () => {
    const [numProjects, setNumProjects] = useState(200);
    const [displayCount, setDisplayCount] = useState(0);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setDisplayCount(prev => {
                if (prev < numProjects) {
                    return prev + 1;
                }
                clearInterval(timer);
                return prev;
            });
        }, 20);
        
        return () => clearInterval(timer);
    }, [numProjects]);
    return (
        <footer className="w-full bg-gray-950 mt-4 py-2 px-4 flex md:flex-row justify-between items-center">
            <div className="flex flex-col items-start mb-4 md:mb-0">
                <div className="text-white  font-semibold"><FontAwesomeIcon icon={faHexagonNodes} className="mr-1 h-5 w-5" />HexCode</div>
                <div className="flex items-center">
                    <span className="text-sm">Powered by</span>
                    <img src="https://cdn.brandfetch.io/idmJWF3N06/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B" 
                        alt="Anthropic Logo" 
                        className="inline ml-2 h-3" />
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-white transition-all duration-300">
                        {displayCount}+
                </div>
                <div className="text-gray-300">Websites Generated</div>
            </div>
            <div className="hidden md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 justify-center md:justify-end w-full md:w-auto">
                <Link to="/token" className="hover:text-gray-600 transition-colors duration-300">About</Link>
                <Link to="/faqs" className="hover:text-gray-600 transition-colors duration-300">Licensing</Link>
                <Link to="/roadmap" className="hover:text-gray-600 transition-colors duration-300">Contacts</Link>
                <Link to="/privacy" className="hover:text-gray-600 transition-colors duration-300">Privacy</Link>
            </div>
        </footer>
    );
}

export default Footer