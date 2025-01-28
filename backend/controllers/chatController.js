const Project = require('../models/projectModel');
const Anthropic = require('@anthropic-ai/sdk');

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY

const client = new Anthropic({
  apiKey: CLAUDE_API_KEY,
});

exports.chat = async (req,res)=> {
  console.log(req.user);
  
  if(req.isAuthenticated()){
    const userPrompt = req.body.message;
    const frontendRoute = req.body.route;
    const projectId = req.params.pid;
    

    console.log('Received Prompt from user:',userPrompt);
    console.log('frontend path:',frontendRoute)
    console.log('project ID', projectId)
    

    let defaultPrompt;
    if(frontendRoute == '/main/react'){
      defaultPrompt = `
    You are an expert web developer tasked with generating a complete, production-ready React.js project from a user's description. Follow these precise guidelines:

    1. Project Generation Requirements:
    Create a fully functional React.js project using create-react-app or a custom Webpack configuration.
    Website should be multipage with routes.
    Use modern React best practices, including functional components and hooks.
    Implement responsive design using only CSS.
    Ensure meaningful, clean, and well-structured code with a component-based architecture.
    Include appropriate error boundaries for error handling.
    Add basic optimizations for performance and SEO (where applicable for SPAs).

    2. JSON Structure Specifications:
    Generate a comprehensive JSON object.
    Keys must represent full file paths.
    Values must contain complete file contents.
    Include all necessary project files, excluding node_modules and .git directories.
    Maintain a standard React.js project structure.
    entryFilePath must contain path to file App.js, the root app which has all routes.
    Do not put App.js and other code files in src folder. Keep them in root folder itself.
    Give the css files for all pages in css folder.Import them from that folder.
    
    3. Structural Details:
    Include at least one reusable component, such as a Button or Card.
    Add basic routing configuration using React Router.
    Provide a clean and maintainable project setup.

    4. Response Format:
    {
      "projectTitle": "",
      "explanation": "",
      "files": {
        "/App.js": {
          "code": ""
        },
        ...
      },
      "entryFilePath": "",
      "generatedFiles": []
    }

    Generate a project that demonstrates professional-grade web development practices, tailored precisely to the user's prompt.
    Do not include any text excluding the code , that is the json object.
    All elements must have a draggable class and vertical or horizontal class.DO NOT GIVE ME A SCRIPT FOR draggable class as i am implementing my own script for drag and drop which will use the draggable class. 
    `;
    }
    else if(frontendRoute === '/main/plain'){
      defaultPrompt = `
      Your task is to create a one-page website based on the given specifications, delivered as an HTML file , CSS file and javascript file. The website should incorporate a variety of engaging and interactive design features, such as drop-down menus, dynamic text and content, clickable buttons, and more. Ensure that the design is visually appealing, responsive, and user-friendly. The HTML, CSS, and JavaScript code should be well-structured, efficiently organized, and properly commented for readability and maintainability.Do not include any text excluding the code.
    All elements must have a draggable class and vertical or horizontal class.DO NOT GIVE ME A SCRIPT FOR draggable class as i am implementing my own script for drag and drop which will use the draggable class.Inside body there should be a div with id 'layout' as root element and what ever html you are generated for the page should be placed inside this layout div
    Generate a JSON object with three keys: 'html' containing the HTML code and 'css' containing the CSS code and 'js' containing the javascript code for a simple website. Do not include additional text outside the JSON object.
    `
    }
    else{
      return res.status(400).json({ error: "Invalid route" });
    }
  

    const prompt = `${defaultPrompt}\n\n${userPrompt}`;
    console.log(prompt);
    try {
      const stream = client.messages
        .stream({
          model: 'claude-3-5-sonnet-latest',
          max_tokens: 8000,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        })
        .on('text', (text) => {
          console.log(text);
        });
  
      const message = await stream.finalMessage();
      console.log("Model Response:-",message);


      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Add the user prompt and AI response to the messages array
      project.chats.push({
        // text: message.content, 
        userprompt: userPrompt,
        airesponse: message.content[0].text,
      });
      console.log("BETICHOD");
      console.log(userPrompt)
      console.log(project.chats);

      // Save the project
      await project.save();
      res.json(message)
    } catch (error) {
      console.error('Error:', error);
    }

  } else{
    res.json({'error':"Not Authorized"})
  }
    
}
