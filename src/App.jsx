
import React from "react" 
import axios from "axios"
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

function App() {
  const [text, setText] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [translatedText, setTranslatedText] = React.useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const options = {
        method: 'POST',
        url: 'https://google-translator9.p.rapidapi.com/v2',
        headers: {
          'x-rapidapi-key': '14f1bc4c2emsh38ed5dfc847c7bbp1d264bjsn66046c2120b9',
          'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          q: text,
          source: 'en',
          target: language,
          format: 'text'
        }
      };
      const response = await axios.request(options);
      console.log(response?.data?.data ?.translations[0]?.translatedText);
      setTranslatedText(response?.data?.data ?.translations[0]?.translatedText);
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      console.log(error?.data);
    }
  }
  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-r from-blue-500 to-white-200 flex flex-col justify-center items-center">
        <div>
          <h1 className="text-4xl font-600 text-blue mb-6">Text Translator</h1>
        </div>
        <div>
          <textarea
             name = "input-text" className="w-96 h-48 p-2 border border-grey-500 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 " placeholder="Enter text to translate..." onChange={(e) => setText(e.target.value) }
          ></textarea>
          <textarea
             name = "input-text" className="w-96 h-48 p-2 border border-grey-500 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ml-4"
            placeholder="Translated text will appear here..."
            value={translatedText} readOnly
          ></textarea>      
        </div>  
        <div>
          <label className="mr-2">Select Language:</label>
          <select  name = "value" className="border border-grey-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" onChange={(e) => setLanguage(e.target.value)} >
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
            <option value="hi">Hindi</option>
            <option value="ar">Arabic</option>
            <option value="ru">Russian</option>
            <option value="pt">Portuguese</option>
          </select>     
        </div>
        <div className="mt-4">
          <button className="mx-auto w-[300px] bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-800 cursor-pointer" onClick={handleTranslate} >
            {
              loading ? <LoaderCircle className="animate-spin mx-auto" /> : "Translate"
            }
          </button>
        </div>  
        
      </div>
    </>
  )
}

export default App
