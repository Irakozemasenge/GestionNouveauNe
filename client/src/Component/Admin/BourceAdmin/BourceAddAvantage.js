import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader } from 'react-spinners';
import NavBarsBourse from "./NavBarsBourse";
import Footer from "../../Visiteurs/Footer/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { decryptData } from "../../../encryptionModule";

function BourseAddAvantage() {
    const [mobile, setMobile] = useState(window.innerWidth < 686);
    useEffect(() => {
        const handleSize = () => {
            setMobile(window.innerWidth < 686);
        };
        window.addEventListener('resize', handleSize);
        return () => {
            window.removeEventListener('resize', handleSize);
        };
    }, []);

    const { id } = useParams();
    const bourseId = decryptData(id);
    const navigate = useNavigate();
    const [boutLoading, setBoutLoading] = useState(false);
    const [avantages, setAvantages] = useState([{ av: '' }]);
    const [validationErrors, setValidationErrors] = useState([{ av: false }]);

    const handleAddAvantage = () => {
        setAvantages(prevState => [...prevState, { av: '' }]);
        setValidationErrors(prevState => [...prevState, { av: false }]);
    };

    const handleRemoveAvantage = (avantageIndex) => {
        setAvantages(prevState => prevState.filter((_, index) => index !== avantageIndex));
        setValidationErrors(prevState => prevState.filter((_, index) => index !== avantageIndex));
    };

    const handleAvantageChange = (avantageIndex, value) => {
        const updatedAvantages = [...avantages];
        updatedAvantages[avantageIndex].av = value;
        setAvantages(updatedAvantages);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifier la validation des avantages avant la soumission
        const isValid = avantages.every((avantage) => avantage.av.trim() !== '');
        if (!isValid) {
            toast.error("Veuillez remplir tous les avantages de la bourse.");
            return;
        }

        setBoutLoading(true);

        axios.post(`https://speedreal.abahs-jobconnect.com/bourse/addavantages/${bourseId}`, avantages)
            .then((resp) => {
                setBoutLoading(false);
                toast.success(resp.message);
                navigate(`/bourse/detail/${id}`);
            })
            .catch((err) => {
                setBoutLoading(false);
                if (err.response) {
                    console.error("Erreur lors de l'ajout des avantages à la bourse :", err.response.data);
                    toast.error(err.response.data);
                } else if (err.request) {
                    console.error("Aucune réponse du serveur lors de l'ajout des avantages à la bourse :", err.request);
                    toast.error("Aucune réponse du serveur lors de l'ajout des avantages à la bourse");
                } else {
                    console.error("Erreur lors de l'ajout des avantages à la bourse :", err.message);
                    toast.error(err.message);
                }
            });
    };

    return (
        <div className={`w-full`}>
            <NavBarsBourse />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <form onSubmit={handleSubmit} className="flex mb-4 flex-col items-center">
                    <div className="rounded-lg p-2 relative flex flex-wrap w-[95%] sm:p-4">
                        <div className="justify-center overflow-hidden rounded-xl w-full h-max p-1 sm:p-2 mb-10 border-[1px] flex flex-col">
                            <div className="w-full">
                                <div className="h-max w-full">
                                    <div className="px-3 w-full">
                                        <div className="w-full flex items_center justify-between">
                                            <label className="block mt-5 font-serif text-gray-500 uppercase tracking-wide text-lg mb-1">
                                                Ajout des avantages à la bourse
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2 h-max">
                                <div className="rounded-xl p-2 w-full">
                                    <div className="flex flex-col">
                                        <div className="mb-5">
                                            <label className="block tracking-wide text-lg mb-2">Avantages de la bourse d'étude</label>
                                            {avantages.map((avantage, avantageIndex) => (
                                                <div key={avantageIndex} className="flex items-center mt-1">
                                                    <input
                                                        type="text"
                                                        value={avantage.av}
                                                        onChange={(e) => handleAvantageChange(avantageIndex, e.target.value)}
                                                        placeholder={`${avantageIndex + 1}. Avantage de la bourse`}
                                                        className={`block w-full bg-transparent outline-none focus:border focus:border-orange-500 border border-red rounded py-3 px-4 ${validationErrors[avantageIndex].avantage ? 'border-red-500' : ''}`}
                                                    />
                                                    {avantageIndex <= 0 ? (
                                                        <button type="button" className="bg-blue-500 cursor-default opacity-0 text-white p-1 rounded ml-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-square" viewBox="0 0 16 16">
                                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                                            </svg>
                                                        </button>
                                                    ) : (
                                                        <button type="button" className="bg-red-500 text-white p-1 rounded ml-1" onClick={() => handleRemoveAvantage(avantageIndex)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" className="bg-[#b4b4b436] text-orange-600 px-3 py-2 mt-1 rounded-md" onClick={handleAddAvantage}>Ajouter un avantage</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end w-[95%]">
                        {boutLoading ? (
                            <label className="cursor-no-drop w-max relative mt-3 flex justify-center items-center bg-orange-950 p-2 rounded text-gray-400">
                                <input type="submit" id="send" value='Ajouter' className='pointer-events-none' disabled />
                                <i className="bi bi-send ml-2 pointer-events-none "></i>
                                <div className='absolute pointer-events-none bg-transparent pt-4 pl-4 w-full h-full flex justify-center items-center z-50'>
                                    <FadeLoader
                                        color="rgb(255, 255, 255)"
                                        height={10}
                                        margin={-9}
                                        radius={100}
                                        speedMultiplier={1}
                                        width={1}
                                    />
                                </div>
                            </label>
                        ) : (
                            <label htmlFor="send" className="mt-3 cursor-pointer w-max flex justify-end bg-orange-600 p-2 rounded text-white">
                                <input type="submit" id="send" value='Ajouter' className='cursor-pointer'></input>
                                <i className="bi bi-send ml-2 "></i>
                            </label>
                        )}
                    </div>
                </form>
                <Footer />
            </div>
        </div>
    );
}

export default BourseAddAvantage;
