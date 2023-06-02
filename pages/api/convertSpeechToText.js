// pages/api/convertSpeechToText.js

//Note: I'm not using this file anymore, but I'm keeping it for now to remember how to do things. Also, I probably should be consistent with calling APIs, and every other external API call is currently in pages/api.
//The problem here was I couldn't correctly pass an audiofile or formData to this function.
export default async function handler(req, res) {
    const { formData } = req.body;
    console.log("Going off to Whisper...")

    
    fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log("Data!" , data);
    })
    .catch((error) => {
        console.error("error:" , error);
    });

    // axios.post{"https://api.openai.com/v1/audio/transcriptions", formData, {
    //     headers: {
    //         Authorization: Bearer ${process.env.OPENAI_API_KEY} ,
    //         "Content-Type": `multipart/form-data; boundary=${formData._boundary}` ,
    //     },
    // }}
    // .then((response) => {
    //     console.error(error);
    // })
    // .catch((error) => {
    //     console.error(error);
    // });
  
    // const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //   },
    //   body: formData,
    // });
  
    // const data = await response.json();
    // console.log("Data? " , data)
  
    // res.status(200).json({ transcript: data.transcript });
  }
  