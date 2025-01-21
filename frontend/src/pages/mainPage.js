import '../App.css';
import React,{useState,useEffect} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import Frame from 'react-frame-component';
import { ResizableBox } from 'react-resizable';
const MainPage = () => {
  // Define states
  const [prompt, setPrompt] = useState(""); // State for user input
  const [generatedHTML, setGeneratedHTML] = useState(
    "<!DOCTYPE html><html><head></head><body><h1>Generated Website</h1></body></html>"
  ); // State for generated code
  const [showCode, setShowCode] = useState(false); // State for toggling between website/code views
  const [fileName,setFileName] = useState("html");
  const [generatedCSS, setGeneratedCSS] = useState("");

  useEffect(() => {
    Prism.highlightAll(); // Applies syntax highlighting to all <code> elements
  }, [generatedHTML, generatedCSS]);

  // let displayCode = fileName === "html" ? generatedHTML.replace(/(\s*<style>[\s\S]*?<\/style>\s*)/, '').trim() : generatedCSS;

  // useEffect(() => {
  //   Prism.highlightAll();
  // }, [displayCode]);


  const draggableScript = `<script>    
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
        </script>`
  function injectCSSIntoHTML(htmlCode, cssCode) {
    const headCloseIndex = htmlCode.toLowerCase().indexOf('</head>');
    
    if (headCloseIndex === -1) {
        throw new Error('No closing </head> tag found in HTML');
    }
    const styleTag = `<style>\n${cssCode}\n</style>\n`;
    const newHTML = htmlCode.slice(0, headCloseIndex) + styleTag + htmlCode.slice(headCloseIndex);
    return newHTML;
  }
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
            body: JSON.stringify({message:prompt})
        })
        
        const data = await response.json();
        console.log('Response from backend:', data);

        let text = data.content[0].text;
        console.log("Raw text before parsing-",text)
        
        const matches = text.match(/{\s*"html":\s*`([\s\S]*?)`\s*,\s*"css":\s*`([\s\S]*?)`\s*}/);

if (matches) {
    const [_, htmlContent, cssContent] = matches;
    
    // Create a new object with properly escaped content
    var object_data = {
        html: htmlContent,
        css: cssContent
    };
    
    // Now you can use the processed data directly without JSON.parse
    console.log("This is the object with html and css:", object_data);
} else {
    console.error("Could not extract HTML and CSS content");
}
        
        setGeneratedHTML(object_data['html'])
        setGeneratedCSS(object_data['css'])
        
        console.log("This is the code that will be given to iframe",generatedHTML)

    }catch(error){
        console.log('Error While fetching:',error);
    }

  };
  const displayCode = injectCSSIntoHTML(generatedHTML,generatedCSS)+draggableScript;
  console.log(displayCode)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-blue-600 text-white py-4 text-center text-2xl font-bold">
        Text-to-Website Generator
      </header>

      {/* Main Content */}
      <div className="flex flex-grow w-full max-w-full p-4 space-x-4">
        {/* Prompt Input Section */}
        <div className="flex flex-col bg-white shadow-lg p-4 rounded-lg w-1/3">
          <h2 className="text-lg font-semibold mb-2">Enter Your Prompt</h2>
            <form onSubmit={handlePromptSubmit}>
                <textarea
                    className="border rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    name="prompt"
                    rows="8"
                    placeholder="Describe the website you want to generate..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)} // Update prompt state
                    />
                <button
                    type='submit'
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700"
                    >
                    Generate Website
                </button>
            </form>
        </div>

        {/* Generated Website Section */}
        <div className="flex-grow bg-white shadow-lg rounded-lg p-4 relative">
          <nav className="flex space-x-4 border-b pb-2 mb-4">
            <button
              className={`py-2 px-4 rounded-md ${!showCode ? "bg-blue-600 text-white" : "text-blue-600"} border-solid border-blue-600`}
              onClick={() => setShowCode(false)}>
              View Website
            </button>
            <button
              className={`py-2 px-4 rounded-md ${showCode ? "bg-blue-600 text-white" : "text-blue-600"} border-solid border-blue-600`}
              onClick={() => setShowCode(true)}>
              View Code
            </button>
          </nav>

          {/* Content: Website or Code */}
          <div className="relative" >
      {/* Iframe */}
      {showCode ? (
    <div className='box-border overflow-scroll max-h-full'>
    <nav className='flex justify-flex-start align-center w-3'>
      <button
      className={`py-2 px-4 rounded-md ${fileName === "html" ? "bg-blue-600 text-white" : "text-blue-600"} border-solid border-blue-600`}
      onClick={() => setFileName("html")}
      >
      HTML
      </button>
      <button
      className={`py-2 px-4 rounded-md ${fileName === "css" ? "bg-blue-600 text-white" : "text-blue-600"} border-solid border-blue-600`}
      onClick={() => setFileName("css")}
      >
      CSS
      </button>
    </nav>
    <pre
        className="w-full h-full p-2 m-0 border border-gray-300 rounded-lg"
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "14px",
          overflow: "scroll",
          height:'calc(100% - 0.75rem)'
        }}>
        <code className={`language-${fileName === "html" ? "markup" : "css"}`}>
          {fileName === "html"?generatedHTML:generatedCSS}
        </code>
      </pre>
    </div>
  ) : (
    <ResizableBox
    className='relative w-full h-full border-0'
    width={1200}
    height={700}
    minConstraints={[300, 200]}
    maxConstraints={[1200, 800]}
    resizeHandles={["se"]}
    handle={
      <div className="absolute w-5 h-5 bg-gray-300 bottom-0 right-0 cursor-se-resize z-10"></div>
    }
    >
    <Frame
      initialContent={displayCode}
      className='w-full h-full border-0'
    />
    </ResizableBox>
  )}
    </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
