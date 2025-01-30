'use client'

import React,{useState,useEffect,useContext} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import { Sandpack,
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
   } from "@codesandbox/sandpack-react";
import { atomDark } from '@codesandbox/sandpack-themes';
import SandpackPreviewClient from './SandpackPreviewClient';
import { ActionContext } from './ActionContext'; // Updated import path
import { useParams } from 'react-router-dom';



export default function MainPageReact({children}) {
  const { action, setAction } = useContext(ActionContext) || {};
  const [userprompts, setUserprompts] = useState([]);
  const [aimessage, setAimessage] = useState([]);
  const {projectid} = useParams();
  console.log(projectid);

  let ProjectStructure;

  let parsedData;
  useEffect(() => {
    const data = localStorage.getItem('firstprompt');
    
    if (data) {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
  
      const prompt_area = document.querySelector('#prompt-area');
      if (parsedData.prompt) {
        prompt_area.innerHTML = parsedData.prompt;
        console.log("Prompt taken from local storage");
        setPrompt(parsedData.prompt);
      }
  
      // Clear local storage after using the data
      localStorage.removeItem('firstprompt');
    } else {
      // If no data is found, set prompt area to empty
      const prompt_area = document.querySelector('#prompt-area');
      prompt_area.innerHTML = '';
      setPrompt('');
    }
  }, []);
  

    // const previousPrompts = [
    //   {
    //     prompt : "hi",
    //     response: "A modern, responsive e-commerce website with product listing, cart functionality, and checkout process"
    //   }
    // ];
    

    
    const [previousPrompts,setPreviousPrompts] = useState([
        {
          prompt : "hi",
          response: "A modern, responsive e-commerce website with product listing, cart functionality, and checkout process"
        }
      ]);
    const [prompt, setPrompt] = useState('');
    const [projectStructure, setProjectStructure] = useState({
      "projectTitle": "Centered SVG Website",
      "explanation": "This project creates a responsive website with a centered, blurred hexagon SVG. The SVG is positioned using CSS flexbox and maintains its aspect ratio while fitting the viewport. A subtle blur effect is applied using CSS filters.",
      "files": {
        "/App.js": {
          "code": "import React from 'react';\nimport { BrowserRouter as Router, Route, Routes } from 'react-router-dom';\nimport Home from './components/Home';\nimport './css/App.css';\n\nfunction App() {\n  return (\n    <Router>\n      <Routes>\n        <Route path=\"/\" element={<Home />} />\n      </Routes>\n    </Router>\n  );\n}\n\nexport default App;"
        },
        "/components/Home.js": {
          "code": "import React from 'react';\nimport '../css/Home.css';\n\nconst Home = () => {\n  return (\n    <div className=\"container draggable\">\n      <div className=\"svg-container draggable\">\n        <svg\n          aria-hidden=\"true\"\n          focusable=\"false\"\n          data-prefix=\"fas\"\n          data-icon=\"hexagon-nodes\"\n          className=\"svg-inline--fa fa-hexagon-nodes draggable\"\n          role=\"img\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 700 700\"\n        >\n          <style>\n            {`\n              path {\n                fill: #6366f1;\n              }\n            `}\n          </style>\n          <path\n            fill=\"currentColor\"\n            d=\"M248 106.6c18.9-9 32-28.3 32-50.6c0-30.9-25.1-56-56-56s-56 25.1-56 56c0 22.3 13.1 41.6 32 50.6l0 98.8c-2.8 1.3-5.5 2.9-8 4.7l-80.1-45.8c1.6-20.8-8.6-41.6-27.9-52.8C57.2 96 23 105.2 7.5 132S1.2 193 28 208.5c1.3 .8 2.6 1.5 4 2.1l0 90.8c-1.3 .6-2.7 1.3-4 2.1C1.2 319-8 353.2 7.5 380S57.2 416 84 400.5c19.3-11.1 29.4-32 27.8-52.8l50.5-28.9c-11.5-11.2-19.9-25.6-23.8-41.7L88 306.1c-2.6-1.8-5.2-3.3-8-4.7l0-90.8c2.8-1.3 5.5-2.9 8-4.7l80.1 45.8c-.1 1.4-.2 2.8-.2 4.3c0 22.3 13.1 41.6 32 50.6l0 98.8c-18.9 9-32 28.3-32 50.6c0 30.9 25.1 56 56 56s56-25.1 56-56c0-22.3-13.1-41.6-32-50.6l0-98.8c2.8-1.3 5.5-2.9 8-4.7l80.1 45.8c-1.6 20.8 8.6 41.6 27.8 52.8c26.8 15.5 61 6.3 76.5-20.5s6.3-61-20.5-76.5c-1.3-.8-2.7-1.5-4-2.1l0-90.8c1.4-.6 2.7-1.3 4-2.1c26.8-15.5 36-49.7 20.5-76.5S390.8 96 364 111.5c-19.3 11.1-29.4 32-27.8 52.8l-50.6 28.9c11.5 11.2 19.9 25.6 23.8 41.7L360 205.9c2.6 1.8 5.2 3.3 8 4.7l0 90.8c-2.8 1.3-5.5 2.9-8 4.6l-80.1-45.8c.1-1.4 .2-2.8 .2-4.3c0-22.3-13.1-41.6-32-50.6l0-98.8z\"\n          />\n        </svg>\n      </div>\n    </div>\n  );\n};\n\nexport default Home;"
        },
        "/css/App.css": {
          "code": "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n  background-color: #f8f9fa;\n}"
        },
        "/css/Home.css": {
          "code": ".container {\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #ffffff;\n}\n\n.svg-container {\n  width: 50%;\n  max-width: 500px;\n  filter: blur(2px);\n  transition: filter 0.3s ease;\n}\n\n.svg-container:hover {\n  filter: blur(0);\n}\n\n.svg-inline--fa {\n  width: 100%;\n  height: auto;\n  opacity: 0.9;\n}\n\n@media (max-width: 768px) {\n  .svg-container {\n    width: 70%;\n  }\n}\n\n@media (max-width: 480px) {\n  .svg-container {\n    width: 90%;\n  }\n}"
        },
        "/index.js": {
          "code": "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);"
        },
        "/index.html": {
          "code": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <meta name=\"theme-color\" content=\"#000000\" />\n    <meta\n      name=\"description\"\n      content=\"Centered SVG Website\"\n    />\n    <title>Centered SVG Website</title>\n  </head>\n  <body>\n    <noscript>You need to enable JavaScript to run this app.</noscript>\n    <div id=\"root\"></div>\n  </body>\n</html>"
        }
      },
      "entryFilePath": "/App.js",
      "generatedFiles": [
        "/App.js",
        "/components/Home.js",
        "/css/App.css",
        "/css/Home.css",
        "/index.js",
        "/index.html"
      ]
    });
  const getAIResponse = async ()=>{

    const response = await fetch(`http://localhost:5000/chat/getchat/${projectid}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials for session management
    });

    
    try{

      const data = await response.json();
      console.log("Previous ai response from database:",data)
      const chats = data.chats
      console.log("Chat history of this project:",chats)
      const latest_code_json_string = chats[chats.length - 1].airesponse
      const latest_code = JSON.parse(latest_code_json_string)
      console.log("latest code:",latest_code_json_string)
      // ProjectStructure=latest_code;
      setProjectStructure(latest_code);

      chats.forEach((element)=>{
        setUserprompts((prevPrompts) => [...prevPrompts, element.userprompt]);
        setAimessage((prevMessages) => [...prevMessages, element.text]);
      })

    }catch(e){
      console.log("there is no previous chat in backend",e)
    }
    
  }
  useEffect(() => {
    getAIResponse();
}, []); 
  
  // getAIResponse();

  // Define states
  const [showCode, setShowCode] = useState(false); // State for toggling between website/code views
  const [activeTab,setActiveTab] = useState("preview");

  const highlightCode = React.useCallback(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);

  const onActionBtn = (action) => {
    if (setAction) {
        setAction({
            actionType: action,
            timeStamp: Date.now()
        });
    } else {
        console.error("setAction is not defined");
    }
};

  // Function to handle prompt submission
  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    setPrompt(" ");// Prevents the default form submission behavior
    console.log("Form submitted with prompt:", prompt);
    setUserprompts((prevPrompts) => [...prevPrompts, prompt]);
    // Simulate fetching generated code from backend (replace this with your API call)
    try{
      console.log(projectid);
        const response = await fetch(`http://localhost:5000/chat/${projectid}`,{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
              message: prompt,
              route: window.location.pathname  // Add route to the body
          })
        })
        
        const data = await response.json();
        console.log('Response from backend:', data);
        const project_string = data.content[0].text;
        const project_object = JSON.parse(project_string)
        console.log("Object given to Sandpack:",project_object.explanation)
        setAimessage((prevMessages) => [...prevMessages, project_object.explanation]);
        console.log("Entry file path:",project_object.entryFilePath)
        console.log([userprompts,aimessage]);

        setProjectStructure(project_object);

    }catch(error){
        console.log('Error While fetching:',error);
    }

  };
  return (
  <div className="flex h-screen w-screen text-white">
    {/* Left Panel */}
    <div className="w-1/2 p-6 border-r border-gray-700 bg-gray-800 flex flex-col">
        {/* Previous Prompts Section */}
        <div className="flex-grow max-h-64 overflow-y-auto p-3 mb-4 border border-gray-700 rounded-lg bg-gray-900">
  {userprompts.map((prompt, index) => (
    <div key={index} className="mb-3">
      {/* User Prompt */}
      <div className="flex justify-end">
        <div className="bg-indigo-500 text-white px-4 py-2 rounded-lg max-w-[80%]">
          {prompt}
        </div>
      </div>

      {/* AI Response */}
      {aimessage[index] && (
        <div className="flex justify-start mt-1">
          <div className="bg-gray-700 text-white px-4 py-2 rounded-lg max-w-[80%]">
            {aimessage[index]}
          </div>
        </div>
      )}
    </div>
  ))}
</div>
      <textarea
        id="prompt-area"
        className="w-full h-64 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter website description..."
      />
      <button 
        className="mt-4 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition"
        onClick={handlePromptSubmit}
      >
        Generate Website
      </button>
    </div>

    {/* Right Panel */}
    <div className="w-1/2 flex flex-col">
      {/* Navigation Tabs */}
      <nav className="flex space-x-4 p-4 border-b border-gray-700">
        <button
          className={`py-2 px-6 rounded-md font-medium transition ${activeTab === "preview" ? "bg-indigo-500 text-white" : "text-blue-400 hover:text-white"}`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
        <button
          className={`py-2 px-6 rounded-md font-medium transition ${activeTab === "code" ? "bg-indigo-500 text-white" : "text-blue-400 hover:text-white"}`}
          onClick={() => setActiveTab("code")}
        >
          Code
        </button>
        <button
          className={"bg-indigo-500 text-white py-2 px-6" }
          onClick={() => onActionBtn("deploy")}
        >
          Deploy
        </button>
        <button
          className={"bg-indigo-500 text-white py-2 px-6" }
          onClick={() => onActionBtn("export")}
         
        >
          Export
        </button>
    
      </nav>

      {/* Sandpack Editor */}
      {projectStructure && (
        <SandpackProvider
          template="react"
          theme={atomDark}
          files={projectStructure.files}
          options={{
            showNavigator: true,
            showLineNumbers: true,
            closableTabs: true,
            activeFile: projectStructure.entryFilePath,
          }}
          customSetup={{
            dependencies: {
              "axios": "^1.7.9",
              "class-variance-authority": "^0.7.1",
              "clsx": "^2.1.1",
              "cra-template": "1.2.0",
              "lucide-react": "^0.471.1",
              "prism": "^4.1.2",
              "prismjs": "^1.29.0",
              "react": "^18.3.1",
              "react-dom": "^18.3.1",
              "react-draggable": "^4.4.6",
              "react-frame-component": "^5.2.7",
              "react-grid-layout": "^1.5.0",
              "react-resizable": "^3.0.5",
              "react-router-dom": "^7.1.2",
              "react-scripts": "5.0.1",
            },
            main: projectStructure.entryFilePath,
          }}
        >
          <SandpackLayout className="h-full bg-gray-900">
            {activeTab === "preview" ? (

              // <SandpackPreview style={{ height: '600px' }} showNavigator={true} />
              <SandpackPreviewClient />


            ) : (
              <div className="flex h-[600px]">
                <SandpackFileExplorer className="w-1/3 border-r border-gray-700" />
                <SandpackCodeEditor className="w-2/3" />
              </div>
            )}
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  </div>
);
};