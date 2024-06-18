import { useState } from 'react'
import Images from './components/Images'
import Generate from './components/Generate'
import "./index.css"

const App = () => {
  const [images, setImages] = useState([]);
  return (
    <div className="container">
      <header className="header">
        <h1 >Generate AI Images using OpenAI Dalle-3</h1>
      </header>
      <div className="subheader">
        Enter a prompt in the textbox below of the image that you would like
      </div>
      <Generate setImages={setImages}/>
      <Images images={images}/>
    </div>
  );
};


export default App;