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
    Your task is to create a one-page website based on the given specifications, delivered as an HTML file with embedded JavaScript and CSS. The website should incorporate a variety of engaging and interactive design features, such as drop-down menus, dynamic text and content, clickable buttons, and more. Ensure that the design is visually appealing, responsive, and user-friendly. The HTML, CSS, and JavaScript code should be well-structured, efficiently organized, and properly commented for readability and maintainability.Do not include any text excluding the code.
    All elements must have a draggable class and vertical or horizontal class.
    Generate a JSON object with two keys: 'html' containing the HTML code and 'css' containing the CSS code for a simple website. Do not include additional text outside the JSON object.
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
