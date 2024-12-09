import React, { useRef, useState, useEffect } from 'react';
import Footer from '../../Visiteur/FootentContent/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SociauxmediaNavBars from './SociauxmediaNavBars';
import { sociauxWithIcons } from '../../Data/Data';
import ReactDOMServer from 'react-dom/server';
import { toast } from 'react-toastify';
import { decryptData } from '../../../encryptionModule';
import axios from 'axios';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
import { FadeLoader } from 'react-spinners';

function ModifierSocial() {
    const { id } = useParams();
    const smId = decryptData(id);
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState(null);
    const [linkValue, setLinkValue] = useState('');
    const elementRefLink = useRef(null);
    const [spinnerButton, SetloadingButton] = useState(false)
    const [loadings, Setloadings] = useState(true)

    useEffect(() => {
        const fetchSocialMedia = async () => {
            try {
                const response = await axios.get(`http://localhost:8005/socialmedia/${smId}`);
                const socialMediaData = response.data;
                setSelectedOption(socialMediaData.nom);
                Setloadings(false)
                setLinkValue(socialMediaData.link);
            } catch (error) {
                console.error('Erreur lors de la récupération des données du réseau social:', error);
                Setloadings(false)
                //toast.error('Erreur lors de la récupération des données du réseau social');
            }
        };
        fetchSocialMedia();
    }, [smId]);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const sociauxOptions = Object.keys(sociauxWithIcons).map((key) => ({
        value: key,
        nom: sociauxWithIcons[key].nom,
    }));

    const svgString = ReactDOMServer.renderToString(selectedOption && sociauxWithIcons[selectedOption].icon);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérifier si les champs sont vides
        if (!selectedOption || !linkValue) {
            toast.info('Veuillez remplir tous les champs.');
            return;
        }
        const data = {
            icon: svgString,
            nom: selectedOption,
            link: linkValue
        }

        SetloadingButton(true)
        axios.put(`http://localhost:8005/socialmedia/modifier/${smId}`, data)
            .then(response => {
                toast.success('Le réseau social a été modifié avec succès.');
                navigate("/sociauxmedia");
                SetloadingButton(false)
            })
            .catch(error => {
                if (error.response) {
                    // Erreurs renvoyées par le backend
                    const errorMessage = error.response.data.error;
                    toast.error(Array.isArray(errorMessage) ? errorMessage.join('\n') : errorMessage);
                    SetloadingButton(false)
                } else {
                    console.error('Erreur lors de la modification du réseau social:', error);
                    toast.error('Erreur lors de la modification du réseau social.');
                    SetloadingButton(false)
                }
            });

    };


    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)

    useEffect(() => {
        const HundleSize = () => {
            SetMobile3(window.innerWidth < 243)
        }
        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, []
    )


    return (
        <div className='w-full'>
            <div className='w-full'>
                <SociauxmediaNavBars />
                {loadings && <SpinnerDemarage />}
                <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                    <div className="flex items-center w-full justify-between">
                        <Link to='/sociauxmedia' className="w-8 h-8 flex justify-center items-center text-green-500"
                        >    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                            </svg>
                        </Link>
                    </div>
                    <div className='w-full pb-3 min-h-[80vh]'>
                        <div className='flex justify-center w-full items-center h-full'>
                            <div className="w-full  sm:p-4 p-2 sm:m-3">
                                <h2 className='sm:text-[30px] text-[20px] text-[#5dca42]'>Modifier les réseaux sociaux</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className=" relative">
                                        {selectedOption && (
                                            <div className="absolute h-full top-[13px] left-2">
                                                {sociauxWithIcons[selectedOption].icon}
                                            </div>
                                        )}

                                        <select
                                            className={`w-full pl-6 border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300}`}
                                            value={selectedOption}
                                            onChange={(e) => handleOptionChange(e.target.value)}
                                        >
                                            <option hidden value="">Sélectionnez un réseau social</option>
                                            {sociauxOptions.map((option, index) => (
                                                <option key={index} className='text-black' value={option.value}>{option.nom}</option>
                                            ))}
                                        </select>

                                    </div>

                                    <div className="w-full mx-1 relative mb-2 ">
                                        <nom className="block  mb-2 text-sm font-medium">Lien du réseau social</nom>
                                        <input
                                            value={linkValue}
                                            ref={elementRefLink}
                                            onChange={(option1) => setLinkValue(option1.target.value)}
                                            className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300}`}
                                            placeholder="Lien du réseau social"
                                        />
                                    </div>
                                    {spinnerButton ? (
                                        <>
                                            <div className="flex justify-end items-center mt-4 relative pointer-events-none opacity-80">
                                                <div className='absolute bg-transparent  pt-3  w-full h-full flex justify-center items-center z-50'>
                                                    <FadeLoader
                                                        color="rgb(255, 255, 255)"
                                                        height={10}
                                                        margin={-9}
                                                        radius={100}
                                                        speedMultiplier={1}
                                                        width={1}
                                                    /></div>
                                                <input type="submit" id="send" value="Se connecter" class=" transition-all bg-gray-900 rounded  cursor-pointer px-5 py-1 text-gray-600"></input>
                                            </div>
                                        </>
                                    ) : (
                                        <>

                                            <div className="flex justify-end w-max items-center bg-[#5dca32] text-white rounded cursor-pointer px-5 py-1">
                                                <input type="submit" value='Modifier' id="send" ></input>
                                            </div>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div >
        </div >
    );
}

export default ModifierSocial;
