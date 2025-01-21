import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHexagonNodes } from "@fortawesome/free-solid-svg-icons";

const Introduction = () => {
    const words = ["HexCode", "Think", "Prompt", "Develop"];
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[index];
        const typeSpeed = isDeleting ? 100 : 200; 
        const nextDelay = isDeleting && charIndex === -1 ? 1000 : typeSpeed;

        const timer = setTimeout(() => {
            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setIndex((prevIndex) => (prevIndex + 1) % words.length);
            }

            setText(currentWord.substring(0, charIndex));
            setCharIndex((prevChar) => prevChar + (isDeleting ? -1 : 1));
        }, nextDelay);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, index]);

    return (
        <div className="flex flex-col items-center justify-center w-full px-4 md:max-w-[70vw] mx-auto my-5 p-5 font-thin text-center">
            <div className="text-6xl md:text-8xl font-mono m-4">
                <FontAwesomeIcon icon={faHexagonNodes} className="w-15 h-15 md:w-30 md:h-30 mr-2 text-indigo-900"/>
                <span className={words[index] === "HexCode" ? "text-indigo-900" : ""}>{text}</span>
                <span className="border-r-4 border-gray-800 animate-blink"></span>
            </div>
            <div className="text-xl md:text-3xl font-bold mb-1 text-gray-400">The Future of Web Development</div>

            <div className="mt-4">
                <p className="text-base md:text-2xl text-gray-600 m-0">
                    Effortlessly generate a fully responsive website with a single prompt.<br/>
                    Customize layouts, refine designs, and export ready-to-use HTML, CSS, and JavaScript.
                </p>
            </div>
        </div>
    );
};

export default Introduction;
