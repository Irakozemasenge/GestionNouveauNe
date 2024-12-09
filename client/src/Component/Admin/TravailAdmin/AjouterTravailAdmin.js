import React, { createRef, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader } from 'react-spinners'
import { countries } from "../../Data/Data";
import Footer from "../../Visiteurs/Footer/Footer";
import NavBarsTravail from "./NavBarsTravail";
import axios from "axios";
function AjouterTravailAdmin() {
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
        { paySelected: '', tavantages: [{ av: '' }] }
    ]);


    const inputRefs = useRef([]);
    if (inputRefs.current.length !== blocs.length) {
        inputRefs.current = Array(blocs.length).fill({}).map((_, index) => ({
            paySelected: createRef(null),
            tavantages: createRef(null)
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
        let requiredFields = ['paySelected', 'tavantages'];

        for (const field of requiredFields) {
            if (!bloc[field]) {

                toast.warning(
                    <>
                        {
                            field === 'paySelected' ? 'Le pays de travil' :
                                field === 'tavantages' ? 'L\'avantage travail' :
                                    null} est obligatoire.
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





    const lastAvantageInputRef = useRef(null);

    const handleAvantageChange = (e, blocIndex, AvantageIndex) => {
        const newBlocs = [...blocs];
        newBlocs[blocIndex].tavantages[AvantageIndex].av = e.target.value;
        setBlocs(newBlocs);
    };


    const handleAddAvantage = (index) => {
        const newBlocs = [...blocs];
        const lastAvantage = newBlocs[index].tavantages[newBlocs[index].tavantages.length - 1];
        if (lastAvantage && lastAvantage.av.trim() === '') {
            toast.info(
                <>
                    Veuillez remplir le champ d'avantage existant avant d'en ajouter un nouveau.
                </>
            )
            if (lastAvantageInputRef.current) {
                animateAndScrollToRef(lastAvantageInputRef);
                lastAvantageInputRef.current.focus();
            }
            return;
        }

        // Vérifie si le nouveau critère est déjà présent dans la liste
        const newAvantage = lastAvantage.av.trim();
        const AvantageAlreadyExists = newBlocs[index].tavantages.some((critere, i) => i !== newBlocs[index].tavantages.length - 1 && critere.av.trim() === newAvantage);
        if (AvantageAlreadyExists) {
            toast.info('L\'avantage que vous essayez d\'ajouter existe déjà.');
            if (lastAvantageInputRef.current) {
                animateAndScrollToRef(lastAvantageInputRef);
                lastAvantageInputRef.current.focus();
            }
            return;
        }

        newBlocs[index].tavantages.push({ av: '' });
        setBlocs(newBlocs);

        if (lastCritereInputRef.current) {
            lastCritereInputRef.current.focus();
        }
    };


    const handleRemoveAvantage = (index, AvantageIndex) => {
        const newBlocs = [...blocs];
        newBlocs[index].tavantages.splice(AvantageIndex, 1);
        setBlocs(newBlocs);
    };




    const lastCritereInputRef = useRef(null);


    const Datas = blocs.map((bloc) => ({
        pays: bloc.paySelected,
        drapeux: selectedCountryCode,
        tavantages: bloc.tavantages
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        for (let index = 0; index < blocs.length; index++) {
            if (!validateBloc(blocs[index], index)) {
                return false;
            }
        }

        const isEmptyAvat = blocs.some((bloc) => bloc.tavantages.some((critere) => critere.av.trim() === ''));
        if (isEmptyAvat) {
            toast.info('Veuillez remplir tous les champs de l\'avantage avant de soumettre.');
            if (lastAvantageInputRef.current) {
                lastAvantageInputRef.current.focus();
            }
            return;
        }
        setboutLoading(true)


        axios.post("https://speedreal.abahs-jobconnect.com/travail/createTravail", Datas[0])
            .then((rep) => {
                toast.success(rep.data)
                setBlocs([
                    { paySelected: '', tavantages: [{ av: '' }] }
                ]);
                setSelectedCountryCode("")
                setboutLoading(false)
            })
            .catch((err) => {
                // Afficher les erreurs ici
                if (err.response) {
                    // Si la requête a été faite et le serveur a répondu avec un code d'erreur
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
            <NavBarsTravail />
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
                                                        Ajouter un nouvelle travail
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
                                                <div className=" mb-5">
                                                    <label class="block  tracking-wide  text-lg  mb-2">Avanatage</label>
                                                    {bloc.tavantages.map((avantage, avantageIndex) => (
                                                        <div key={avantageIndex} className="flex items-center  mt-1">
                                                            <input
                                                                type="text"
                                                                value={avantage.av}
                                                                onChange={(e) => handleAvantageChange(e, index, avantageIndex)}
                                                                ref={lastAvantageInputRef}
                                                                class="block w-full bg-transparent  outline-none  focus:border focus:border-orange-500   border border-red rounded py-3 px-4"
                                                                placeholder={`${avantageIndex + 1}. avanatage`}
                                                            />
                                                            {avantageIndex <= 0 && <button type="button" className="bg-blue-500 cursor-default opacity-0 text-white p-1 rounded ml-1">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-square" viewBox="0 0 16 16">
                                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                                                </svg>
                                                            </button>}


                                                            {avantageIndex > 0 && <button type="button" className="bg-red-500 text-white p-1 rounded ml-1" onClick={() => handleRemoveAvantage(index, avantageIndex)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                                </svg>
                                                            </button>
                                                            }
                                                        </div>
                                                    ))}
                                                    <button type="button" className=" bg-[#b4b4b436] text-orange-600 px-3 py-2  mt-1 rounded-md" onClick={() => handleAddAvantage(index)}>Ajouter un avantage</button>
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


export default AjouterTravailAdmin;
