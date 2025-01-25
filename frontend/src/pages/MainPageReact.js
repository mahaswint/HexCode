'use client'

import React,{useState,useEffect} from 'react';
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


export default function MainPageReact({children}) {
    const [prompt, setPrompt] = useState('');
    const [projectStructure, setProjectStructure] = useState({
        files: {
            "/App.js": { code: "export default function App() { return <div>Hello World</div>; }" },
            "/index.js": { code: `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\nReactDOM.render(<App />, document.getElementById("root"));` }
        },
        entryFilePath: "/App.js"
    });
  // Define states
  const [showCode, setShowCode] = useState(false); // State for toggling between website/code views
  const [activeTab,setActiveTab] = useState("preview");

  const highlightCode = React.useCallback(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);

  // const handleClick = (type) => {
  //   setFileName(type);
  //   setTimeout(highlightCode, 0);
  // };

  const draggableScript = `   
            const layout = document.getElementById('layout');
            let dragline = 'vertical';
    
            function initializeDraggable(element) {
                element.setAttribute('draggable', true);
    
                element.addEventListener('dragstart', (e) => {
                    e.stopPropagation(); 
                    e.dataTransfer.setData('text/plain', e.target.id);
                    e.dataTransfer.effectAllowed = 'move';
                    element.classList.add('dragging');
                    dragline = element.classList.contains('horizontal') ? 'horizontal' : 'vertical';
                });
    
                element.addEventListener('dragend', () => {
                    element.classList.remove('dragging');
                });
    
                element.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
    
                    const draggingElement = document.querySelector('.dragging');
                    if (!draggingElement || draggingElement === element) return;
    
                    const bounding = element.getBoundingClientRect();
                    const offset = dragline === 'vertical'
                        ? e.clientY - bounding.top
                        : e.clientX - bounding.left;
    
                    if (offset > (dragline === 'vertical' ? bounding.height : bounding.width) / 2) {
                        element.after(draggingElement);
                    } else {
                        element.before(draggingElement);
                    }
                });
    
                element.addEventListener('drop', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const draggingElement = document.querySelector('.dragging');
                    if (draggingElement) {
                        element.appendChild(draggingElement);
                        element.style.border = 'none';
                    }
                });
    
                element.addEventListener('dragleave', () => {
                    element.style.border = 'none';
                });
            }
    
            function setupEmptyDivStyling() {
                document.querySelectorAll('.draggable').forEach((element) => {
                    if (element.childElementCount === 0) {
                        element.style.minHeight = '50px';
                        element.style.backgroundColor = '#e9ecef';
                        element.style.border = '2px dashed #dee2e6';
                    }
    
                    element.addEventListener('dragover', (e) => {
                        e.preventDefault();
                        const draggingElement = document.querySelector('.dragging');
                        if (draggingElement && draggingElement !== element) {
                            element.style.border = '2px dashed #007bff';
                        }
                    });
    
                    element.addEventListener('drop', (e) => {
                        e.preventDefault();
                        const draggingElement = document.querySelector('.dragging');
                        if (draggingElement && draggingElement !== element) {
                            element.appendChild(draggingElement);
                            element.style.border = 'none';
                            element.style.backgroundColor = 'transparent';
                        }
                    });
    
                    element.addEventListener('dragleave', () => {
                        element.style.border = '2px dashed #dee2e6';
                    });
                });
            }
    
            // Initialize all draggable elements
            document.querySelectorAll('.draggable').forEach(initializeDraggable);
            setupEmptyDivStyling();
        `
    
  // Function to handle prompt submission
  const handlePromptSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    console.log("Form submitted with prompt:", prompt);
    // Simulate fetching generated code from backend (replace this with your API call)
    try{

        const response = await fetch('http://localhost:5000/chat',{
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
        console.log("Object given to Sandpack:",project_object)
        setProjectStructure({
          files:project_object.files,
          entryFilePath:project_object.entryFilePath
        });

//         let text = data.content[0].text;
//         console.log("Raw text before parsing-",text)
        
//         const matches = text.match(/{\s*"html":\s*`([\s\S]*?)`\s*,\s*"css":\s*`([\s\S]*?)`\s*}/);

// if (matches) {
//     const [_, htmlContent, cssContent] = matches;
    
//     // Create a new object with properly escaped content
//     var object_data = {
//         html: htmlContent,
//         css: cssContent
//     };
    
//     // Now you can use the processed data directly without JSON.parse
//     console.log("This is the object with html and css:", object_data);
// } else {
//     console.error("Could not extract HTML and CSS content");
// }
        
//         setGeneratedHTML(object_data['html'])
//         setGeneratedCSS(object_data['css'])
//         setGeneratedJS(object_data['js'])
        
    }catch(error){
        console.log('Error While fetching:',error);
    }

  };
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/2 p-4 bg-gray-100">
        <textarea
          className="w-full h-64 p-2 border rounded text-black"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter website description..."
        />
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handlePromptSubmit}
        >
          Generate Website
        </button>
      </div>
      <div className="w-1/2">
      <nav className='flex justify-flex-start align-center w-3'>
      <button
      className={`py-2 px-4 rounded-md ${activeTab === "preview" ? "bg-blue-600 text-white" : "text-blue-600"} border-solid border-blue-600`}
      onClick={() => setActiveTab("preview")}
      >
      Preview
      </button>
      <button
      className={`py-2 px-4 rounded-md ${activeTab === "code" ? "bg-blue-600 text-white" : "text-blue-600"} border-solid border-blue-600`}
      onClick={() => setActiveTab("code")}
      >
      Code
      </button>
    </nav>
        {projectStructure && (
          <SandpackProvider
            template="react"
            theme={atomDark}
            files={projectStructure.files}
            options={{
              showNavigator: true,
              showLineNumbers: true,
              closableTabs: true,
              activeFile: projectStructure.entryFilePath
            }}
            customSetup={{
              dependencies:{"axios": "^1.7.9",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cra-template": "1.2.0",
    "dotenv": "^16.4.7",
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
    "react-scripts": "5.0.1"},
              main:"./src/App"
  }}
          >
            <SandpackLayout>
                {activeTab === "preview"?
                <>
                <SandpackPreview style={{height:'600px'}}/>
                </>:
                <>
                <SandpackFileExplorer style={{height:'600px'}}/>
                <SandpackCodeEditor style={{height:'600px'}}/>
                </>}
            </SandpackLayout>
          </SandpackProvider>
        )}
      </div>
    </div>
  );
};