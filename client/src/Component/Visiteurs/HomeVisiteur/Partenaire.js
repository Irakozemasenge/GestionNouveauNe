/* eslint-disable react/jsx-no-target-blank */
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Partenaire() {

  const [partenaires, setpartenaires] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://speedreal.abahs-jobconnect.com/partenaire/getAllpartenairesForClients`);
        setpartenaires(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des partenaires :', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='mx-4 hidden'>
      <div className='text-[30px]'>
        Partenaire
      </div>
      <div className='w-full flex flex-wrap'>
        {partenaires.map((data, index) => (
          <div key={index} className='w-[16em] p-2'>
            <div className='rounded-xl border flex flex-col items-center p-2'>
              <div className='w-32 h-32 rounded-full border'>
                <img src={`https://speedreal.abahs-jobconnect.com/uploads/partners/${data.logo}`} alt='  logo ' className='w-full h-full object-cover' />
              </div>
              <div className='w-full text-xs my-2'>{data.nom}</div>
              <div className='text-xs'>{data.description && data.description.length > 100 ? data.description.slice(0, 100) + '...' : data.description}</div>
              <div className='flex items-center w-full my-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                </svg>
                <a href={data.siteweb} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1"> {data.siteweb && data.siteweb.length > 10 ? data.siteweb.slice(0, 25) + '...' : data.siteweb}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Partenaire
