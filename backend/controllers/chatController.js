const Anthropic = require('@anthropic-ai/sdk');

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY

const client = new Anthropic({
  apiKey: CLAUDE_API_KEY, // This is the default and can be omitted
});

exports.chat = async (req,res)=> {
  console.log(req.user);
  if(req.isAuthenticated()){
    const prompt = req.body.message;
    // const prompt_content = prompt['prompt']

    console.log('Received Prompt:',prompt);

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
      res.json({'result':message})
    } catch (error) {
      console.error('Error:', error);
    }

  } else{
    res.json({'error':"Not Authorized"})
  }
    
}
