// don't forget to download openai on frontend 
require("dotenv").config();

const { Configuration , OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main(prompt){

    try{
        const openai = new OpenAIApi(configuration);
        const response = await openai.createImage({
        prompt: prompt,
        n: 4,
        size: "512x512",
        });
    
        const images = []
        response.data.data.forEach( (obj) => {
            images.push(obj.url)
        }) 
        console.log(images);
    }
    
    catch(error){
        console.log(error)
    }



}

main("animated gothic black dragon flying in black night");


