import React, { useState } from 'react'
import axios from "axios"
import { useMutation } from '@tanstack/react-query'

const generateImage = async(prompt) => {
    const res = await axios.post("http://localhost:3000/generate", {
        prompt
    });
    return res.data;
};

const Generate = () => {
    const [prompt, setPrompt] = useState("");
    const mut = useMutation({
        mutationFn: generateImage,
        mutationKey: ["dalle-3"]
    });
    const handler = () => {
        if (!prompt) {
            alert("Enter a prompt please");
            return;
        }
        mut.mutate(prompt);
    }
    return (
    <div className='generate-container'>
      <input 
      className="input-box"
      type='text' 
      placeholder='Enter a prompt...' 
      value={prompt} 
      onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="button" type='submit' onClick={handler}>
            {mut?.isPending ? "Generating..." : "Generate"}
        </button>
    </div>
  )
}

export default Generate;