/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { createRef, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader } from 'react-spinners'
import { countries } from "../../Data/Data";
import Footer from "../../Visiteurs/Footer/Footer";
import NavBarsVisaAdmin from "./NavBarsVisaAdmin";
import axios from "axios";


function VisaAdminAjout() {
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

    const [boutLoading, setboutLoading] = useState(false)

    const [blocs, setBlocs] = useState([
        { paySelected: '', categorie: '' }
    ]);


    const inputRefs = useRef([]);
    if (inputRefs.current.length !== blocs.length) {
        inputRefs.current = Array(blocs.length).fill({}).map((_, index) => ({
            paySelected: createRef(null),
            categorie: createRef(null)
        }));
    }




    const handleInputChange = (index, field, value, isFile = false) => {
        const newBlocs = [...blocs];

        newBlocs[index][field] = value;

        if (isFile) {
            if (value && value.length > 0) {
                const file = value[0];
                newBlocs[index] = { ...newBlocs[index], [field]: file };
            } else {
                delete newBlocs[index][field];
            }
        } else {
            newBlocs[index] = { ...newBlocs[index], [field]: value };
        }

        setBlocs(newBlocs);
        if (value && inputRefs.current[index] && inputRefs.current[index][field] && inputRefs.current[index][field].current) {
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


    const validateBloc = (bloc, index) => {
        let requiredFields = ['paySelected', 'categorie'];

        for (const field of requiredFields) {
            if (!bloc[field]) {

                toast.warning(
                    <>
                        {
                            field === 'paySelected' ? 'Le pays de VISA' :
                                field === 'categorie' ? 'Le categorie de VISA' :
                                    null
                        } est obligatoire.
                    </>
                );
                if (inputRefs.current[index][field] && inputRefs.current[index][field].current) {
                    animateAndScrollToRef(inputRefs.current[index][field]);
                }
                return false;
            }
        }
        return true;
    };


    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');


    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedCountryCode(e.target.options[e.target.selectedIndex].getAttribute('codes'));

    };





    const data = blocs.map((bloc) => ({
        pays: bloc.paySelected,
        drapeaux: selectedCountryCode,
        categorie: bloc.categorie,
    }));


    const handleSubmit = (e) => {
        e.preventDefault();
        for (let index = 0; index < blocs.length; index++) {
            if (!validateBloc(blocs[index], index)) {
                return false;
            }
        }



        setboutLoading(true)
        axios.post("https://speedreal.abahs-jobconnect.com/visa/createvisa", data[0])
            .then((rep) => {
                toast.success(rep.data)
                setBlocs([
                    { paySelected: '', categorie: '' }
                ]);
                setSelectedCountryCode("")
                setboutLoading(false)
            })
            .catch((err) => {
                // Afficher les erreurs ici
                if (err.response) {
                    // Si la requête a été faite et le serveur a répondu avec un code d'erreur
                    setboutLoading(false)
                    console.error(err.response.data); // Données d'erreur provenant du serveur
                    toast.error(err.response.data); // Affichage de l'erreur avec toast
                    setboutLoading(false)
                } else if (err.request) {
                    // Si la requête a été faite mais aucune réponse n'a été reçue
                    console.error(err.request); // Requête sans réponse
                    toast.error("Aucune réponse du serveur"); // Affichage de l'erreur avec toast
                    setboutLoading(false)
                } else {
                    // Si une erreur s'est produite lors de la configuration de la requête
                    console.error("Erreur lors de la configuration de la requête:", err.message);
                    toast.error("Erreur lors de la configuration de la requête"); // Affichage de l'erreur avec toast
                    setboutLoading(false)
                }
            });
    };




    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 688)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className={`w-full`}>
            <NavBarsVisaAdmin />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`w-full  overflow-hidden ${mobile1 ? 'min-h-[85vh]' : 'min-h-[80vh]'}`}>
                    <form onSubmit={handleSubmit} className="flex mb-4 flex-col items-center">
                        <div className="rounded-lg p-2 relative  flex flex-wrap   w-[95%] sm:p-4">
                            {blocs.map((bloc, index) => (
                                <div key={index} className="justify-center overflow-hidden rounded-xl w-full h-max p-1 sm:p-2 mb-10  border-[1px] flex flex-col">
                                    <div className="w-full">
                                        <div className="h-max w-full">
                                            <div className="px-3  w-full">
                                                <div className="w-full flex items_center justify-between">
                                                    <label className="block  mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide  text-lg  mb-1">
                                                        Ajouter le VISA
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2 h-max">
                                        <div className="rounded-xl p-2 w-full">
                                            <div className="flex flex-col">
                                                <div className="rounded-lg w-full">
                                                    <div class="w-full mb-5">
                                                        <label
                                                            class="block  tracking-wide  text-lg  mb-2"
                                                            for="grid-Title"
                                                        >
                                                            Selectionnez le pay de bourse
                                                        </label>
                                                        <div className="w-full flex bg-transparent  outline-none  focus:border focus:border-orange-500   border border-red rounded mb-3">
                                                            <div className="py-3 px-2 w-[5em]  p-2  border-r" >
                                                                <img src={`https://flagcdn.com/w40/${selectedCountryCode.toLowerCase()}.png`} alt="Drapeau" />
                                                            </div>
                                                            <select
                                                                className="py-3 px-4 w-full bg-transparent"
                                                                ref={inputRefs.current[index].paySelected}
                                                                value={bloc.paySelected}
                                                                onInput={(e) => { handleInputChange(index, "paySelected", e.target.value); handleCountryChange(e) }}

                                                            >
                                                                <option value="" className="text-black">Sélectionnez un pays</option>
                                                                {Object.entries(countries).map(([code, name], index) => (
                                                                    <option key={index} className="text-black" value={name} codes={code}>
                                                                        {name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div class="w-full mb-5">
                                                    <label
                                                        class="block  tracking-wide  text-lg  mb-2"
                                                        for="grid-Title"
                                                    >
                                                        Catégorie des VISA
                                                    </label>
                                                    <select
                                                        ref={inputRefs.current[index].categorie}
                                                        value={bloc.categorie}
                                                        onInput={(e) => { handleInputChange(index, "categorie", e.target.value) }}
                                                        className="w-full py-3 px-4  flex bg-transparent  outline-none  focus:border focus:border-orange-500   border border-red rounded mb-3"
                                                    >
                                                        <option className="text-black cursor-pointer" value="">Catégorie des VISA</option>
                                                        <option className="text-black cursor-pointer" value="VISA de travail">VISA de travail</option>
                                                        <option className="text-black cursor-pointer" value="VISA de conférence">VISA de conférence</option>
                                                        <option className="text-black cursor-pointer" value="VISA de visite">VISA de visite</option>
                                                        <option className="text-black cursor-pointer" value="VISA de tourisme">VISA de tourisme</option>
                                                        <option className="text-black cursor-pointer" value="VISA d'affaire">VISA d'affaire</option>
                                                        <option className="text-black cursor-pointer" value="VISA d'immigration">VISA d'immigration</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                        <div className=" flex justify-end  w-[95%]">

                            {boutLoading ? (
                                <>
                                    <label disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center   bg-orange-950    p-2 rounded  text-gray-400">
                                        <input type="submit" id="send" value='Ajouter' className='pointer-events-none' />
                                        <i class="bi bi-send ml-2  pointer-events-none "></i>
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
                                    </label>
                                </>
                            ) : (<>
                                <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-orange-600   p-2 rounded  text-white">
                                    <input type="submit" id="send" value='Ajouter' className='cursor-pointer'></input>
                                    <i class="bi bi-send ml-2 "></i>
                                </label>
                            </>)}
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </div>

    );
}


export default VisaAdminAjout;
