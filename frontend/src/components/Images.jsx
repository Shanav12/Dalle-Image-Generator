import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from 'axios';


const fetchImages = async() => {
    const res = await axios.get("http://localhost:3000/list");
    return res.data;
};


const Images = () => {
    const {data, isPending, isError, error, isSuccess} = useQuery({
        queryFn: fetchImages,
        queryKey: ["images"]
    });
    if (isPending) {
        return <h3>Loading...</h3>
    }
    return (
        <div className="images">
          {data.map((image, index) => (
              <div key={index} className="image-container">
                <img className="image" src={image.url} alt={`Generated ${index}`} />
              </div>
            ))}
        </div>
      );
}


export default Images;