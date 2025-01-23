const Anthropic = require('@anthropic-ai/sdk');

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY

const client = new Anthropic({
  apiKey: CLAUDE_API_KEY,
});

exports.chat = async (req,res)=> {
  console.log(req.user);
  if(req.isAuthenticated()){
    const userPrompt = req.body.message;
    console.log('Received Prompt:',userPrompt);

    const defaultPrompt = `
    You are an expert web developer tasked with generating a complete, production-ready React.js project from a user's description. Follow these precise guidelines:

    1. Project Generation Requirements:
    Create a fully functional React.js project using create-react-app or a custom Webpack configuration.
    Use modern React best practices, including functional components and hooks.
    Implement responsive design using a modern CSS framework like Tailwind CSS.
    Ensure meaningful, clean, and well-structured code with a component-based architecture.
    Include appropriate error boundaries for error handling.
    Add basic optimizations for performance and SEO (where applicable for SPAs).

    2. JSON Structure Specifications:
    Generate a comprehensive JSON object.
    Keys must represent full file paths.
    Values must contain complete file contents.
    Include all necessary project files, excluding node_modules and .git directories.
    Maintain a standard React.js project structure.
    
    3. Structural Details:
    Use TypeScript (optional, but recommended).
    Implement Tailwind CSS for styling.
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

    const prompt = `${defaultPrompt}\n\n${userPrompt}`;

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
      res.json(message)
    } catch (error) {
      console.error('Error:', error);
    }

  } else{
    res.json({'error':"Not Authorized"})
  }
    
}
