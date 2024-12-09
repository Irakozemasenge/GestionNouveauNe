import React, { useEffect, useState } from 'react'
import Footer from '../../Visiteur/FootentContent/Footer';
import ServiceNavBars from './ServiceNavBars';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';


function AjoutService() {
    const [boutLoading, setboutLoading] = useState(false);
    const [inputFields, setInputFields] = useState([{ value: '' }]);

    const handleChangeInput = (index, event) => {
        const values = [...inputFields];
        values[index].value = event.target.value;
        setInputFields(values);
    };

    const handleAddFields = () => {
        setInputFields([...inputFields, { value: '' }]);
    };

    const handleRemoveFields = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const isFieldsEmpty = inputFields.some(field => field.value.trim() === '');
        if (isFieldsEmpty) {
            toast.info("Veuillez remplir tous les champs avant de soumettre le formulaire.");
            return;
        }


        const formattedData = inputFields.map(field => ({ nom: field.value }));
        setboutLoading(true)
        // Effectuez l'appel à l'API pour soumettre le formulaire
        axios.post('http://localhost:8005/service/ajouter', formattedData)
            .then(response => {
                // Réinitialisez les champs du formulaire
                setInputFields([{ value: '' }]);
                navigate("/service")
                // Affichez un message de succès
                toast.success('Formulaire soumis avec succès !');
                setboutLoading(false)
            })
            .catch(error => {
                // Gérez les erreurs renvoyées par l'API
                if (error.response) {
                    // Erreurs renvoyées par le backend
                    const errorMessage = error.response.data.error;
                    toast.error(Array.isArray(errorMessage) ? errorMessage.join('\n') : errorMessage);
                    setboutLoading(false)
                } else {
                    // Erreur inattendue
                    toast.error('Une erreur est survenue lors de la soumission du formulaire.');
                    console.error('Erreur inattendue :', error.message);
                    setboutLoading(false)
                }
            });
    };



    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)

    useEffect(() => {
        const hundleSize = () => {
            SetMobile3(window.innerWidth < 342)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])



    return (
        <div className='w-full'>
            <ServiceNavBars />
            <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                <div className='flex flex-col justify-start min-h-[80vh] mb-2 mt-10 w-full'>
                    <div className=' mx-5 text-2xl w-full  '>Ajoute le services</div>
                    <div className='w-full p-3'>
                        <form onSubmit={handleSubmit}>
                            {inputFields.map((inputField, index) => (
                                <div key={index} className='flex w-full text-center'>
                                    <div className='w-[90%] mr-2 my-2'>
                                        <input
                                            type="text"
                                            placeholder="Entrez une valeur"
                                            value={inputField.value}
                                            className={`w-full  border  pr-8 outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-200`}
                                            onChange={event => handleChangeInput(index, event)}
                                        />
                                    </div>
                                    {inputFields.length > 1 && index > 0 && (
                                        <button type="button" className='  bg-red-400 text-white p-2 rounded  h-max mt-2' onClick={() => handleRemoveFields(index)}>
                                            Supprimer
                                        </button>
                                    )}
                                </div>
                            ))}
                            <div className=''>
                                <button type="button" className='text-[#5dca32]' onClick={handleAddFields}>
                                    Ajouter un champ
                                </button>

                            </div>
                            <div className=" flex justify-end  w-full">
                                {boutLoading ? (
                                    <>
                                        <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-green-950    p-2 rounded  text-gray-400">
                                            <input type="submit" id="send" value='Enregister' className='pointer-events-none' />
                                            <div disabled className='absolute pointer-events-none  bg-transparent pt-4  pl-4  w-full h-full flex justify-center items-center z-50'>
                                                <FadeLoader
                                                    color="rgb(255, 255, 255)"
                                                    height={10}
                                                    margin={-9}
                                                    radius={100}
                                                    speedMultiplier={1}
                                                    width={1}
                                                />
                                            </div>
                                        </button>
                                    </>
                                ) : (<>
                                    <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-green-600   p-2 rounded  text-white">
                                        <input type="submit" id="send" value="Enregister" className='cursor-pointer'></input>
                                    </label>
                                </>)}
                            </div>
                        </form>
                    </div>
                </div>

                <Footer />
            </div></div>
    )
}

export default AjoutService

