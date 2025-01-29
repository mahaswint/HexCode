import '../App.css';
import React,{useState,useEffect,useRef} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import Frame from 'react-frame-component';
import { ResizableBox } from 'react-resizable';
const MainPagePlain = () => {
  // Define states
  const [prompt, setPrompt] = useState(""); // State for user input
  const [generatedHTML, setGeneratedHTML] = useState(
    `<!DOCTYPE html><html><head></head><body>
    <div style="
  position: relative;
  width: 90vw;
  min-height: 50vh;
  background: linear-gradient(to bottom right, #1A1A2E, #0F3460);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(99, 102, 241, 0.6);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
  padding: 1.5rem;
  margin: 2.5rem auto;
  display: flex;
  flex-direction: column;
}
">

    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hexagon-nodes" 
    class="svg-inline--fa fa-hexagon-nodes" 
    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700">
    <style>
        path {
            fill: #6366f1;
        }
    </style>
    <path fill="currentColor" d="M248 106.6c18.9-9 32-28.3 32-50.6c0-30.9-25.1-56-56-56s-56 25.1-56 56c0 22.3 13.1 41.6 32 50.6l0 98.8c-2.8 1.3-5.5 2.9-8 4.7l-80.1-45.8c1.6-20.8-8.6-41.6-27.9-52.8C57.2 96 23 105.2 7.5 132S1.2 193 28 208.5c1.3 .8 2.6 1.5 4 2.1l0 90.8c-1.3 .6-2.7 1.3-4 2.1C1.2 319-8 353.2 7.5 380S57.2 416 84 400.5c19.3-11.1 29.4-32 27.8-52.8l50.5-28.9c-11.5-11.2-19.9-25.6-23.8-41.7L88 306.1c-2.6-1.8-5.2-3.3-8-4.7l0-90.8c2.8-1.3 5.5-2.9 8-4.7l80.1 45.8c-.1 1.4-.2 2.8-.2 4.3c0 22.3 13.1 41.6 32 50.6l0 98.8c-18.9 9-32 28.3-32 50.6c0 30.9 25.1 56 56 56s56-25.1 56-56c0-22.3-13.1-41.6-32-50.6l0-98.8c2.8-1.3 5.5-2.9 8-4.7l80.1 45.8c-1.6 20.8 8.6 41.6 27.8 52.8c26.8 15.5 61 6.3 76.5-20.5s6.3-61-20.5-76.5c-1.3-.8-2.7-1.5-4-2.1l0-90.8c1.4-.6 2.7-1.3 4-2.1c26.8-15.5 36-49.7 20.5-76.5S390.8 96 364 111.5c-19.3 11.1-29.4 32-27.8 52.8l-50.6 28.9c11.5 11.2 19.9 25.6 23.8 41.7L360 205.9c2.6 1.8 5.2 3.3 8 4.7l0 90.8c-2.8 1.3-5.5 2.9-8 4.6l-80.1-45.8c.1-1.4 .2-2.8 .2-4.3c0-22.3-13.1-41.6-32-50.6l0-98.8z">
    </path>
    </svg>
    </div>
    </body></html>`
  ); // State for generated code
  const [showCode, setShowCode] = useState(false); // State for toggling between website/code views
  const [fileName,setFileName] = useState("html");
  const [generatedCSS, setGeneratedCSS] = useState("");
  const [generatedJS, setGeneratedJS] = useState("");
  const [generatedText,setGeneratedText] = useState("")
  const [projectID,setProjectID] = useState('');
  const previousPrompts = [
    {
      prompt : "hi",
      response: "hi"
    }
  ];


  let parsedData;
    useEffect(()=>{
        const data = localStorage.getItem('firstprompt');
        parsedData = JSON.parse(data);
        console.log(parsedData);
        const prompt_area = document.querySelector('#prompt-area')
        prompt_area.innerHTML=parsedData.prompt;
        setPrompt(parsedData.prompt);
        setProjectID(parsedData.PID);
      },[]);

  useEffect(() => {
    Prism.highlightAll(); // Applies syntax highlighting to all <code> elements
  }, [generatedHTML, generatedCSS,generatedJS]);
  const highlightCode = React.useCallback(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);
  const handleClick = (type) => {
    setFileName(type);
    setTimeout(highlightCode, 0);
  };
  const iframeRef = useRef(null);
  const downloadHtmlContent = () => {
    // Get the content of the iframe document
    const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
  
    if (!iframeDocument) {
      console.error("Unable to access iframe content.");
      return;
    }
  
    // Get the updated HTML content of the iframe
    const updatedHtml = `
      <!DOCTYPE html>
      <html>
        ${iframeDocument.documentElement.innerHTML}
      </html>
    `;
  
    // Optionally clean the updated HTML (e.g., remove the script tag)
    const cleanedCode = updatedHtml.replace(
      /<script[^>]*id="draggable-script"[\s\S]*?<\/script>/s,
      ""
    );
    
  
    console.log("Cleaned code after removing the draggable script:", cleanedCode);
  
    // Create a Blob with the HTML content
    const blob = new Blob([cleanedCode], { type: "text/html" });
  
    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
  
    // Set a default filename
    downloadLink.download = "downloaded_page.html";
  
    // Append to body and trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
  
    // Clean up
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  };
  
  const draggableScript = `document.addEventListener('DOMContentLoaded', () => {
    const layout = document.getElementById('layout');
    let dragline = 'vertical';

    function updateHTML(){
        const html = layout.innerHTML;
        console.log(html);
    }

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
  if (draggingElement && !draggingElement.contains(element)) { // Prevent circular relationship
    element.appendChild(draggingElement);
    element.style.border = 'none';
  } else {
    console.error('Cannot append an element to itself or its child.');
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
                updateHTML();
            });

            element.addEventListener('dragleave', () => {
                element.style.border = '2px dashed #dee2e6';
            });
        });
    }

    // Initialize all draggable elements
    document.querySelectorAll('.draggable').forEach(initializeDraggable);
    setupEmptyDivStyling();
})`
    function injectContentIntoHTML(htmlCode, cssCode, jsCode,draggableScript) {
        // First, ensure we have a valid HTML structure
        if (!htmlCode.includes('</head>') || !htmlCode.includes('</body>')) {
          // Create basic HTML structure if missing
          htmlCode = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Generated Page</title>
      </head>
      <body>
          ${htmlCode}
      </body>
      </html>`;
        }
      
        // Inject CSS into head
        const headCloseIndex = htmlCode.toLowerCase().indexOf('</head>');
        const styleTag = `<style>\n${cssCode}\n</style>\n`;
        htmlCode = htmlCode.slice(0, headCloseIndex) + styleTag + htmlCode.slice(headCloseIndex);
      
        // Inject JavaScript just before closing body tag
        const bodyCloseIndex = htmlCode.toLowerCase().indexOf('</body>');
        const scriptTag = `<script>\n${jsCode}\n</script>\n`;
        const draggable = `<script id="draggable-script">\n${draggableScript}\n</script>\n`;
        htmlCode = htmlCode.slice(0, bodyCloseIndex) + draggable + htmlCode.slice(bodyCloseIndex);
        htmlCode = htmlCode.slice(0, bodyCloseIndex) + scriptTag + htmlCode.slice(bodyCloseIndex);
      
        return htmlCode;
      }
  // Function to handle prompt submission
  const handlePromptSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    console.log("Form submitted with prompt:", prompt);
    // Simulate fetching generated code from backend (replace this with your API call)
    try{
        // console.log(parsedData.PID);
        const response = await fetch(`http://localhost:5000/chat/${projectID}`,{
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

        let text = data.content[0].text;
        console.log("Raw text before parsing-",text)
        const object_data = JSON.parse(text)
        // const matches = text.match(/{\s*"html":\s*`([\s\S]*?)`\s*,\s*"css":\s*`([\s\S]*?)`\s*,\s*"js":\s*`([\s\S]*?)`\s*,\s*"text":\s*`([\s\S]*?)`\s*}/);

// if (matches) {
//     const [_, htmlContent, cssContent,jsContent,textContent] = matches;
    
//     // Create a new object with properly escaped content
//     var object_data = {
//         html: htmlContent,
//         css: cssContent,
//         js: jsContent,
//         text: textContent
//     };
    
//     // Now you can use the processed data directly without JSON.parse
//     console.log("This is the object with html and css:", object_data);
// } else {
//     console.error("Could not extract HTML and CSS content");
// }
        setGeneratedText(object_data['text'])
        setGeneratedHTML(object_data['html'])
        setGeneratedCSS(object_data['css'])
        setGeneratedJS(object_data['js'])
        
    }catch(error){
        console.log('Error While fetching:',error);
    }

  };
  const displayCode = injectContentIntoHTML(generatedHTML, generatedCSS, generatedJS, draggableScript);
  const downloadableCode = injectContentIntoHTML(generatedHTML, generatedCSS, generatedJS, '');
  console.log("This is the code that will be given to the iframe:",displayCode)
  return (
    <div className="flex h-screen w-screen text-white bg-gray-900">
      {/* Left Panel */}
      <div className="w-1/2 p-6 border-r border-gray-700 bg-gray-800 flex flex-col">
        {/* Previous Prompts Section */}
        <div className="flex-grow max-h-64 overflow-y-auto p-3 mb-4 border border-gray-700 rounded-lg bg-white">
          {previousPrompts.map((entry, index) => (
            <div key={index} className="mb-3">
              {/* User Prompt */}
              <div className="flex justify-end">
                <div className="bg-indigo-500 text-white px-4 py-2 rounded-lg max-w-[80%]">
                  {entry.prompt}
                </div>
              </div>

              {/* AI Response */}
              {entry.response && (
                <div className="flex justify-start mt-1">
                  <div className="bg-gray-700 text-white px-4 py-2 rounded-lg max-w-[80%]">
                    {entry.response}
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
      <div className="w-1/2 flex flex-col bg-gray-900">
        {/* Navigation Tabs */}
        <nav className="flex space-x-4 p-4 border-b border-gray-700">
          <button
            className={`py-2 px-6 rounded-md font-medium transition ${!showCode ? "bg-indigo-500 text-white" : "text-blue-400 hover:text-white"} border border-blue-600`}
            onClick={() => setShowCode(false)}
          >
            View Website
          </button>
          <button
            className={`py-2 px-6 rounded-md font-medium transition ${showCode ? "bg-indigo-500 text-white" : "text-blue-400 hover:text-white"} border border-blue-600`}
            onClick={() => {setShowCode(true); setTimeout(highlightCode, 0);}}
          >
            View Code
          </button>
          <button
            className="py-2 px-6 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white border border-blue-600"
            onClick={downloadHtmlContent}
          >
            Download Code
          </button>
        </nav>
  
        {/* Generated Website or Code */}
        <div className="flex-grow bg-white p-4">
          {showCode ? (
            <div className="box-border overflow-scroll max-h-full">
              <nav className="flex justify-start items-center space-x-2 mb-2">
                <button
                  className={`py-2 px-4 rounded-md ${fileName === "html" ? "bg-indigo-500 text-white" : "text-blue-400"} border border-blue-600`}
                  onClick={() => handleClick("html")}
                >
                  HTML
                </button>
                <button
                  className={`py-2 px-4 rounded-md ${fileName === "css" ? "bg-indigo-500 text-white" : "text-blue-400"} border border-blue-600`}
                  onClick={() => handleClick("css")}
                >
                  CSS
                </button>
                <button
                  className={`py-2 px-4 rounded-md ${fileName === "js" ? "bg-indigo-500 text-white" : "text-blue-400"} border border-blue-600`}
                  onClick={() => handleClick("js")}
                >
                  JavaScript
                </button>
              </nav>
              <pre className="w-full h-full p-2 m-0 border border-gray-600 rounded-lg bg-gray-800 text-white overflow-scroll">
                <code className={`language-${fileName === "html" ? "markup" : "css"}`}>
                  {fileName === "html" ? generatedHTML : fileName === "css" ? generatedCSS : generatedJS}
                </code>
              </pre>
            </div>
          ) : (
            <ResizableBox
              className="relative w-full h-full border-[1.5px] border-zinc-600 border-solid bg-white rounded-md"
              // width={400}
              // height={700}
              minConstraints={[300, 200]}
              maxConstraints={[1200, 800]}
              resizeHandles={["se"]}
              handle={
                <div className="absolute w-5 h-5 bg-gray-600 bottom-0 right-0 cursor-se-resize z-10"></div>
              }
            >
              <Frame
                ref={iframeRef}
                initialContent={displayCode}
                className="w-full h-full border-0"
              />
            </ResizableBox>
          )}
        </div>
      </div>
    </div>
  );
  
};
export default MainPagePlain;