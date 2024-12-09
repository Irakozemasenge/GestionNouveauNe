/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select"
import { FadeLoader } from 'react-spinners'
import Footer from "../../Visiteur/FootentContent/Footer";
import HoraireNavBars from "./HoraireNavBars";
import { Popover, Whisper } from "rsuite";
import axios from "axios";


function HoraireAjout() {
    const [boutLoading, setboutLoading] = useState(false);
    const navigate = useNavigate();
    const [mobile11, SetMobile11] = useState(window.innerWidth < 501)

    useEffect(() => {
        const hundlesSize = () => {
            SetMobile11(window.innerWidth < 501)
        }
        window.addEventListener('resize', hundlesSize)
        return () => {
            window.removeEventListener('resize', hundlesSize)
        }
    }, [])



    const [mobile, SetMobile] = useState(window.innerWidth <= 640)


    useEffect(() => {
        const hundleSize = () => {
            SetMobile(window.innerWidth <= 640)
        }
        window.addEventListener('resize', hundleSize)

        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])




    const [blocs, setBlocs] = useState([
        { jours: '', heuredebut: '', heurefin: "" }
    ]);
    const addBloc = () => {
        setBlocs([...blocs, { jours: '', heuredebut: '', heurefin: "" }]);
    };
    const removeBloc = (index) => {
        const newBlocs = [...blocs];
        newBlocs.splice(index, 1);
        setBlocs(newBlocs);
    };
    const inputRefs = useRef([]);
    if (inputRefs.current.length !== blocs.length) {
        inputRefs.current = Array(blocs.length).fill({}).map((_, index) => ({
            jours: React.createRef(null),
            heuredebut: React.createRef(null),
            heurefin: React.createRef(null),
        }));
    }

    const handleInputChange = (index, field, value) => {
        const newBlocs = [...blocs];
        newBlocs[index][field] = value;
        setBlocs(newBlocs);
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


    const valiheuredebutBloc = (bloc, index) => {
        const requiredFields = ['jours', 'heuredebut', 'heurefin'];

        //Validation pour les champs vide
        for (const field of requiredFields) {
            if (!bloc[field]) {
                toast.warning(<div>Le <strong>{
                    field == 'jours' ? 'jour de travail ' :
                        field == 'heuredebut' ? 'heure d\'ouverture de travail  ' :
                            field == 'heurefin' ? 'heurs de fermeture' : null}</strong> est obligatoire à l'horaire {index + 1}.</div>);
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

        //Validation pour eviter de sousmettre deux block de meme jours
        const isdepluque = blocs.some((b, i) => i !== index && b.jours == bloc.jours);
        console.log(isdepluque)
        if (isdepluque) {
            const duplicateBlockIndex = blocs.findIndex((b, i) => i !== index && b.jours === bloc.jours);
            const duplicateBlockNumber = toRoman(duplicateBlockIndex + 1);
            toast.warning(
                <div>
                    Vous avez  utilise le jours déjà  utilise le  <span className="font-bold text-[#5dca32]" >{bloc.jours}</span> dans le block <span className="font-bold text-[#5dca32]" >{toRoman(index + 1)}</span> et block <span className="font-bold text-[#5dca32]" >{duplicateBlockNumber}</span>
                    .Selectionnez les jours différentes
                </div>
            );
            animateAndScrollToRef(inputRefs.current[index].jours);
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


    const dataToSend = blocs.map((bloc) => ({
        jours: bloc.jours,
        heuredebut: bloc.heuredebut,
        heurefin: bloc.heurefin,
    }))


    const handleSubmit = (e) => {
        e.preventDefault();
        for (let index = 0; index < blocs.length; index++) {
            if (!valiheuredebutBloc(blocs[index], index)) {
                return;
            }

        }
        setboutLoading(true)

        axios.post('http://localhost:8005/horaire/ajouter', dataToSend)
            .then(response => {
                toast.success('Données envoyées avec succès !');
                navigate("/horaire")
                setboutLoading(false)
                //console.log('Réponse du serveur :', response.data);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error);
                    setboutLoading(false)
                } else {
                    toast.error('Erreur lors de l\'envoi des données');
                    setboutLoading(false)
                }
                console.error('Erreur lors de l\'envoi des données au serveur :', error);
                setboutLoading(false)
            });
    };


    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 407)

    useEffect(() => {
        const HundleSize = () => {
            SetMobile3(window.innerWidth < 342)
            SetMobile2(window.innerWidth < 407)
        }
        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, []
    )



    return (
        <div className='w-full'>
            <div className='w-full'>
                <HoraireNavBars />
                <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                    <div className='flex justify-center w-full min-h-[80vh] items-center'>
                        <div className="w-full m-3  sm:p-4 h-full ">
                            <h2 className='sm:text-[30px] text-[18px] text-[#5dca32] '>Ajouter des horaires</h2>
                            <form onSubmit={handleSubmit} >
                                <div className="">
                                    {blocs.map((bloc, index) => (

                                        <div className={` py-3 ${index > 0 ? 'border-t-2' : null} border-dashed border-[#5dca32]`}>
                                            <div className="w-full mx-1 relative mb-2 ">
                                                <label className="block  mb-2 text-sm font-medium">{toRoman(index + 1)}.block</label>

                                                <select
                                                    value={blocs.jours}
                                                    ref={inputRefs.current[index].jours}
                                                    onChange={(event) => handleInputChange(index, "jours", event.target.value)}
                                                    className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300}`}
                                                >
                                                    <option hidden value="">Selectionnez le jours de travail</option>
                                                    <option value="lundi">Lundi</option>
                                                    <option value="mardi">Mardi</option>
                                                    <option value="mercredi">Mercredi</option>
                                                    <option value="jeudi">Jeudi</option>
                                                    <option value="vendredi">Vendredi</option>
                                                    <option value="samedi">Samedi</option>
                                                    <option value="dimanche">Dimanche</option>
                                                </select>
                                            </div>
                                            <div className={`text-[20px flex  p-1 justify-between ${mobile2 ? 'flex-col' : ''} `}>
                                                <div className="w-full mx-1 relative mb-2 ">
                                                    <label className="block  mb-2 text-sm font-medium">Heure d'ouvrir </label>
                                                    <input
                                                        value={bloc.heuredebut}
                                                        ref={inputRefs.current[index].heuredebut}
                                                        onChange={(option1) => handleInputChange(index, "heuredebut", option1.target.value)}
                                                        type='time'
                                                        className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300}`}
                                                        placeholder="Heure d'ouvrir'"
                                                    />
                                                </div>
                                                <div className="w-full relative mx-1 mb-2">
                                                    <label className="block  mb-2   text-sm font-medium"> Heure de fermeture</label>
                                                    <input
                                                        value={bloc.heurefin}
                                                        ref={inputRefs.current[index].heurefin}
                                                        onChange={(option1) => handleInputChange(index, "heurefin", option1.target.value)}
                                                        type='time'
                                                        className={`w-full  border  outline-none   rounded-md p-2.5  bg-transparent  border-gray-300  focus:border-green-500`}
                                                        placeholder="Heure de fermeture"
                                                    />
                                                </div>
                                            </div>

                                            {index > 0 && (
                                                <div className="flex justify-end w-full">
                                                    <Whisper
                                                        trigger='hover'
                                                        placement='auto'
                                                        speaker={<Popover>
                                                            Supprimer le contrant
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
                                            Autre jour
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


export default HoraireAjout;
