/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Footer from '../../Visiteur/FootentContent/Footer';
import SociauxmediaNavBars from './SociauxmediaNavBars';
import { sociauxWithIcons } from '../../Data/Data';
import ReactDOMServer from 'react-dom/server';

import { Popover, Whisper } from "rsuite";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";


function AjouterSociaux() {

    const [boutLoading, setboutLoading] = useState(false);
    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)

    useEffect(() => {
        const hundlesSize = () => {
            SetMobile3(window.innerWidth < 342)
        }
        window.addEventListener('resize', hundlesSize)
        return () => {
            window.removeEventListener('resize', hundlesSize)
        }
    }, [])







    const [blocs, setBlocs] = useState([
        { nom: '', link: '' }
    ]);

    // Créez un nouvel état pour stocker l'option sélectionnée dans chaque bloc
    const [selectedOptions, setSelectedOptions] = useState(Array(blocs.length).fill(null));


    const sociauxOptions = Object.keys(sociauxWithIcons).map((key) => ({
        value: key,
        nom: sociauxWithIcons[key].nom,
    }));




    const addBloc = () => {
        setBlocs([...blocs, { nom: '', link: '' }]);
    };
    const removeBloc = (index) => {
        const newBlocs = [...blocs];
        newBlocs.splice(index, 1);
        setBlocs(newBlocs);
    };
    const inputRefs = useRef([]);
    if (inputRefs.current.length !== blocs.length) {
        inputRefs.current = Array(blocs.length).fill({}).map((_, index) => ({
            nom: React.createRef(null),
            link: React.createRef(null),

        }));
    }

    const handleInputChange = (index, field, value, isTrue) => {
        const newBlocs = [...blocs];
        newBlocs[index][field] = value;
        setBlocs(newBlocs);
        if (isTrue) {
            const newSelectedOptions = [...selectedOptions];
            newSelectedOptions[index] = value;
            setSelectedOptions(newSelectedOptions);
        }

        if (value && inputRefs.current[index][field].current) {
            inputRefs.current[index][field].current.classList.remove('animate__animated', 'animate__shakeX', 'border-2', 'border-red-500');
        }
    };


    const animateAndScrollToRef = (ref) => {
        if (ref && ref.current) {
            ref.current.classList.add('animate__animated', 'animate__shakeX', 'border-2', 'border-red-500', 'outline-none');
            setTimeout(() => {
                ref.current.classList.remove('animate__animated', 'animate__shakeX', 'border-2', 'border-red-500', 'outline-none');
            }, 5000);
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            ref.current.focus();
        }
    };


    const valilinkBloc = (bloc, index) => {
        const requiredFields = ['nom', 'link'];

        //Validation pour les champs vide
        for (const field of requiredFields) {
            if (!bloc[field]) {
                toast.warning(<div>Le <strong>{
                    field == 'nom' ? 'nom réseau sociaux' :
                        field == 'link' ? 'link de vos réseau sociaux selectionne  ' :
                            null}</strong> est obligatoire à l'horaire {index + 1}.</div>);
                if (inputRefs.current[index][field].current) {
                    inputRefs.current[index][field].current.classList.add('animate__animated', 'animate__shakeX', 'border-2', 'border-red-500', 'outline-none');
                    setTimeout(() => {
                        inputRefs.current[index][field].current.classList.remove('animate__animated', 'animate__shakeX', 'border-2', 'border-red-500', 'outline-none');
                    }, 3000);
                    inputRefs.current[index][field].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    inputRefs.current[index][field].current.focus();
                    return false;
                }
            }
        }

        //Validation pour eviter de sousmettre deux block de meme nom
        const isdepluquenom = blocs.some((b, i) => i !== index && b.nom == bloc.nom);
        if (isdepluquenom) {
            const duplicateBlockIndex = blocs.findIndex((b, i) => i !== index && b.nom === bloc.nom);
            const duplicateBlockNumber = toRoman(duplicateBlockIndex + 1);
            toast.warning(
                <div>
                    Le nom réseau sociaux  <span className="font-bold text-[#5dca32]" >{bloc.nom}</span> est déjà  utilise  dans le block <span className="font-bold text-[#5dca32]" >{toRoman(index + 1)}</span> et block <span className="font-bold text-[#5dca32]" >{duplicateBlockNumber}</span>
                </div>
            );
            animateAndScrollToRef(inputRefs.current[index].nom);
            return false;
        }

        //Validation pour eviter de sousmettre deux block de meme link
        const isdepluqueLink = blocs.some((b, i) => i !== index && b.link == bloc.link);
        if (isdepluqueLink) {
            const duplicateBlockIndex = blocs.findIndex((b, i) => i !== index && b.link === bloc.link);
            const duplicateBlockNumber = toRoman(duplicateBlockIndex + 1);
            toast.warning(
                <div>
                    Le link de réseau sociaux  <span className="font-bold text-[#5dca32]" >{bloc.nom}</span> est déjà  utilise  dans le block <span className="font-bold text-[#5dca32]" >{toRoman(index + 1)}</span> et block <span className="font-bold text-[#5dca32]" >{duplicateBlockNumber}</span>
                </div>

            );
            animateAndScrollToRef(inputRefs.current[index].nom);
            return false;
        }
        return true;
    };



    function toRoman(num) {
        const romanNumerals = [
            "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
            "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
            "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX"
        ];
        return romanNumerals[num - 1] || num.toString();
    }


    const Datas = blocs.map((bloc, index) => ({
        nom: bloc.nom,
        icon: selectedOptions[index] && ReactDOMServer.renderToString(sociauxWithIcons[selectedOptions[index]].icon),
        link: bloc.link,
    }));
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        for (let index = 0; index < blocs.length; index++) {
            if (!valilinkBloc(blocs[index], index)) {
                return;
            }

        }

        setboutLoading(true)
        axios.post('http://localhost:8005/socialmedia/ajouter', Datas)
            .then(response => {
                toast.success('Les médias sociaux ont été ajoutés avec succès.');
                //console.log(response.data);
                navigate("/sociauxmedia")
                setboutLoading(false)
            })
            .catch(error => {
                if (error.response) {
                    // Erreurs renvoyées par le backend
                    const errorMessage = error.response.data.error;
                    toast.error(Array.isArray(errorMessage) ? errorMessage.join('\n') : errorMessage);
                    setboutLoading(false)
                } else {
                    console.error('Erreur lors de l\'ajout des médias sociaux:', error.response.data);
                    toast.error('Erreur lors de l\'ajout des médias sociaux.');
                    setboutLoading(false)
                }

            });

    };

    return (
        <div className='w-full'>
            <div className='w-full'>
                <SociauxmediaNavBars />
                <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                    <div className='flex justify-center w-full min-h-[80vh]'>
                        <div className="w-full sm:m-3  p-2 sm:p-4 h-full ">
                            <h2 className='sm:text-[30px] text-[18px] text-[#5dca32] '>Ajouter des  réseaux sociaux</h2>
                            <form onSubmit={handleSubmit} >
                                <div className="">
                                    {blocs.map((bloc, index) => (
                                        <div className={` py-3 ${index > 0 ? 'border-t-2' : null} border-dashed border-[#5dca32]`}>
                                            <div className="w-full mx-1 relative mb-2 ">
                                                <nom className="block  mb-2 text-sm font-medium">{toRoman(index + 1)}.block</nom>

                                                <div className=" relative">
                                                    {selectedOptions[index] && (
                                                        <div className="absolute h-full top-[13px] left-2">
                                                            {sociauxWithIcons[selectedOptions[index]].icon}
                                                        </div>
                                                    )}

                                                    <select
                                                        value={blocs.nom}
                                                        ref={inputRefs.current[index].nom}
                                                        className={`w-full pl-6 border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300}`}
                                                        onChange={(e) => handleInputChange(index, "nom", e.target.value, true)}
                                                    >
                                                        <option hidden value="">Sélectionnez un réseau social</option>
                                                        {sociauxOptions.map((option, index) => (
                                                            <option key={index} className='text-black' value={option.value}>{option.nom}</option>
                                                        ))}
                                                    </select>

                                                </div>
                                            </div>
                                            <div className="w-full relative mb-2 ">
                                                <nom className="block  mb-2 text-sm font-medium">Link de réseau sociaul</nom>
                                                <input
                                                    value={bloc.link}
                                                    ref={inputRefs.current[index].link}
                                                    onChange={(option1) => handleInputChange(index, "link", option1.target.value)}
                                                    type='text'
                                                    className={` block  border w-full  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300}`}
                                                    placeholder="Link de réseau sociaul "
                                                />
                                            </div>
                                            {index > 0 && (
                                                <div className="flex justify-end w-full">
                                                    <Whisper
                                                        trigger='hover'
                                                        placement='auto'
                                                        speaker={<Popover>
                                                            Supprimer
                                                        </Popover>}
                                                    >
                                                        <div onClick={() => removeBloc(index)} className='text-red-600 p-2 hover:bg-red-200 m-0.5 cursor-pointer rounded-lg'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                            </svg>
                                                        </div>
                                                    </Whisper>
                                                </div>
                                            )}
                                        </div>
                                    ))}


                                    <div className="w-full flex mt-4 ">
                                        <button montant="button" className="bg-blue-500 hover-bg-blue-700 text-white py-1 px-2  max-sm:text-xs sm:py-2 sm:px-4 rounded" onClick={addBloc}>
                                            Autre social
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

                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}


export default AjouterSociaux;
