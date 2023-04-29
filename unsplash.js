require('dotenv').config();
const apiKey = process.env.UNSPLASH_API_KEY;
async function getImages( query ){
try {
    const endPoint = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`;
    const response = await fetch(endPoint);
    const data = await response.json();
    const array = data.results.map( (obj) => obj.urls.regular );
    console.log( array );
}
catch (error){
    console.log(error);
}
}

getImages( "crest");