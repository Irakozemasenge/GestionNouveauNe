/* eslint-disable no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { createRef, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader } from 'react-spinners'
import NavBarsEtude from "./NavBarsEtude";
import { countries, domainesEtudes } from "../../Data/Data";
import Footer from "../../Visiteurs/Footer/Footer";
import axios from "axios";
function AjouterBourseAdmin() {
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
        { titre: '', paySelected: '', domaine: '', champSupplementaire: '', niveau: '', fintInscrire: '', seligibres: [{ crit: '' }], savantages: [{ av: '' }] }
    ]);


    const inputRefs = useRef([]);
    if (inputRefs.current.length !== blocs.length) {
        inputRefs.current = Array(blocs.length).fill({}).map((_, index) => ({
            titre: createRef(null),
            paySelected: createRef(null),
            domaine: createRef(null),
            champSupplementaire: createRef(null),
            niveau: createRef(null),
            fintInscrire: createRef(null),
            seligibres: createRef(null),
            savantages: createRef(null)
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
        let requiredFields = ['titre', 'paySelected', 'domaine', 'niveau', 'fintInscrire', 'savantages', 'seligibres'];

        if (bloc.domaine === 'Autre_demain') {
            requiredFields.splice(3, 0, 'champSupplementaire');
        }

        for (const field of requiredFields) {
            if (!bloc[field]) {

                toast.warning(
                    <>
                        {field === 'titre' ? 'Le titre de la bourse d\'études' :
                            field === 'paySelected' ? 'Le pays de la bourse d\'étude' :
                                field === 'domaine' ? 'La demande de la bourse d\'étude' :
                                    field === 'champSupplementaire' ? 'La champ supplementaire de la domaine de la  bourse d\'étude' :
                                        field === 'niveau' ? 'Le niveau de la bourse d\'étude' :
                                            field === 'fintInscrire' ? 'La date de fin d\'inscription de la bourse d\'étude' :
                                                field === 'savantages' ? 'Ajouter l\'avantage de bourse d\'étude' :
                                                    field === 'seligibres' ? 'Critères d\'éligibilité de la bourse d\'étude' :
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
        newBlocs[blocIndex].savantages[AvantageIndex].av = e.target.value;
        setBlocs(newBlocs);
    };


    const handleAddAvantage = (index) => {
        const newBlocs = [...blocs];
        const lastAvantage = newBlocs[index].savantages[newBlocs[index].savantages.length - 1];
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
        const AvantageAlreadyExists = newBlocs[index].savantages.some((critere, i) => i !== newBlocs[index].savantages.length - 1 && critere.av.trim() === newAvantage);
        if (AvantageAlreadyExists) {
            toast.info('L\'avantage que vous essayez d\'ajouter existe déjà.');
            if (lastAvantageInputRef.current) {
                animateAndScrollToRef(lastAvantageInputRef);
                lastAvantageInputRef.current.focus();
            }
            return;
        }

        newBlocs[index].savantages.push({ av: '' });
        setBlocs(newBlocs);

        if (lastCritereInputRef.current) {
            lastCritereInputRef.current.focus();
        }
    };


    const handleRemoveAvantage = (index, AvantageIndex) => {
        const newBlocs = [...blocs];
        newBlocs[index].savantages.splice(AvantageIndex, 1);
        setBlocs(newBlocs);
    };




    const lastCritereInputRef = useRef(null);

    const handleCritereChange = (e, blocIndex, critereIndex) => {
        const newBlocs = [...blocs];
        newBlocs[blocIndex].seligibres[critereIndex].crit = e.target.value;
        setBlocs(newBlocs);
    };


    const handleAddCritere = (index) => {
        const newBlocs = [...blocs];
        const lastCritere = newBlocs[index].seligibres[newBlocs[index].seligibres.length - 1];
        if (lastCritere && lastCritere.crit.trim() === '') {
            toast.info(
                <>
                    Veuillez remplir le champ de critère existant avant d'en ajouter un nouveau.
                </>
            )
            if (lastCritereInputRef.current) {
                lastCritereInputRef.current.focus();
            }
            return;
        }

        // Vérifie si le nouveau critère est déjà présent dans la liste
        const newCritere = lastCritere.crit.trim();
        const critereAlreadyExists = newBlocs[index].seligibres.some((critere, i) => i !== newBlocs[index].seligibres.length - 1 && critere.crit.trim() === newCritere);
        if (critereAlreadyExists) {
            toast.info('Le critère que vous essayez d\'ajouter existe déjà.');
            if (lastCritereInputRef.current) {
                lastCritereInputRef.current.focus();
            }
            return;
        }



        newBlocs[index].seligibres.push({ crit: '' });
        setBlocs(newBlocs);

        if (lastCritereInputRef.current) {
            lastCritereInputRef.current.focus();
        }
    };


    const handleRemoveCritere = (index, critereIndex) => {
        const newBlocs = [...blocs];
        newBlocs[index].seligibres.splice(critereIndex, 1);
        setBlocs(newBlocs);
    };


    const Datas = blocs.map((bloc) => {
        let data = {
            titre: bloc.titre,
            pays: bloc.paySelected,
            drapeux: selectedCountryCode,
            domaine: bloc.domaine,
            niveau: bloc.niveau,
            fin: bloc.fintInscrire,
            seligibres: bloc.seligibres,
            savantages: bloc.savantages
        };

        if (bloc.domaine === 'Autre_demain') {
            data.domaine = bloc.champSupplementaire;
        }

        return data;
    });



    const handleSubmit = (e) => {
        e.preventDefault();
        for (let index = 0; index < blocs.length; index++) {
            if (!validateBloc(blocs[index], index)) {
                return false;
            }
        }

        const isEmptyAvat = blocs.some((bloc) => bloc.savantages.some((critere) => critere.av.trim() === ''));
        if (isEmptyAvat) {
            toast.info('Veuillez remplir tous les champs de l\'avantage avant de soumettre.');
            if (lastAvantageInputRef.current) {
                lastAvantageInputRef.current.focus();
            }
            return;
        }

        const isEmpty = blocs.some((bloc) => bloc.seligibres.some((critere) => critere.crit.trim() === ''));
        if (isEmpty) {
            toast.info('Veuillez remplir tous les champs de critères avant de soumettre.');
            if (lastCritereInputRef.current) {
                lastCritereInputRef.current.focus();
            }
            return;
        }

        setboutLoading(true)
        axios.post("https://speedreal.abahs-jobconnect.com/etude/createEtude", Datas[0])
            .then((resp) => {
                toast.success(resp.data);
                setBlocs([
                    { titre: '', paySelected: '', domaine: '', champSupplementaire: '', niveau: '', fintInscrire: '', seligibres: [{ crit: '' }], savantages: [{ av: '' }] }
                ])
                setSelectedCountryCode("")
                setboutLoading(false)
            })
            .catch((err) => {
                if (err.response) {
                    // Le serveur a répondu avec un code d'erreur
                    console.error("Erreur lors de la création de la bourse :", err.response.data);
                    toast.error(err.response.data);
                    setboutLoading(false)
                } else if (err.request) {
                    // La requête a été envoyée, mais aucune réponse n'a été reçue
                    console.error("Aucune réponse du serveur lors de la création de la bourse :", err.request);
                    toast.error("Aucune réponse du serveur lors de la création de la bourse");
                    setboutLoading(false)
                } else {
                    // Une erreur s'est produite lors de la configuration de la requête
                    console.error("Erreur lors de la création de la bourse :", err.message);
                    toast.error(err.message);
                    setboutLoading(false)
                }
            });


    };




    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    const [mobile, SetMobile] = useState(window.innerWidth < 560)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 634)
    const [mobile3, SetMobile3] = useState(window.innerWidth < 850)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 688)
            SetMobile(window.innerWidth < 560)
            SetMobile2(window.innerWidth < 634)
            SetMobile3(window.innerWidth < 850)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className={`w-full`}>
            <NavBarsEtude />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <form onSubmit={handleSubmit} className="flex mb-4 flex-col items-center">
                    <div className="rounded-lg p-2 relative  flex flex-wrap   w-[95%] sm:p-4">
                        {blocs.map((bloc, index) => (
                            <div key={index} className="justify-center overflow-hidden rounded-xl w-full h-max p-1 sm:p-2 mb-10  border-[1px] flex flex-col">
                                <div className="w-full">
                                    <div className="h-max w-full">
                                        <div className="px-3  w-full">
                                            <div className="w-full flex items_center justify-between">
                                                <label className="block  mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide  text-lg  mb-1">
                                                    Ajouter un nouvelle etude payant
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
                                                        Titre bourses d'études payant
                                                    </label>
                                                    <input
                                                        ref={inputRefs.current[index].titre}
                                                        class="block w-full bg-transparent  outline-none  focus:border focus:border-orange-500   border border-red rounded py-3 px-4 mb-3"
                                                        value={bloc.titre}
                                                        placeholder="Titre bourses d'études"
                                                        onChange={(e) => handleInputChange(index, "titre", e.target.value)}

                                                    />
                                                </div>
                                            </div>
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
                                            <div className="rounded-lg w-full">
                                                <div class="w-full mb-5">
                                                    <label
                                                        class="block  tracking-wide  text-lg  mb-2"
                                                        for="grid-Title"
                                                    >
                                                        Domaine
                                                    </label>
                                                    <select
                                                        ref={inputRefs.current[index].domaine}
                                                        class="block w-full bg-transparent  outline-none  focus:border focus:border-orange-500   border border-red rounded py-3 px-4 mb-3"
                                                        value={bloc.domaine}
                                                        onChange={(e) => handleInputChange(index, "domaine", e.target.value)}

                                                    >
                                                        <option className="text-black" value="">
                                                            Selectionnez la domaine
                                                        </option>
                                                        {domainesEtudes.map((data, index) => (
                                                            <option key={index} className="text-black" value={data.nom}>{data.nom}</option>
                                                        ))}
                                                        <option className="text-black" value="Autre_demain">
                                                            Autre demain
                                                        </option>
                                                    </select>
                                                    {bloc.domaine == 'Autre_demain' && <div className="rounded-lg w-full">
                                                        <div class="w-full mb-5">
                                                            <label
                                                                class="block  tracking-wide  text-lg  mb-2"
                                                                for="grid-Title"
                                                            >
                                                                Autre demain
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={bloc.champSupplementaire}
                                                                onChange={(e) => handleInputChange(index, 'champSupplementaire', e.target.value)}
                                                                ref={inputRefs.current[index].champSupplementaire}
                                                                placeholder="Champ supplémentaire..."
                                                                className="block w-full px-3 py-2 mt-1 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>

                                            <div className={`w-full flex ${mobile ? 'flex-col' : ''}`}>
                                                <div className="rounded-lg w-full mx-2">
                                                    <div class="w-full mb-5">
                                                        <label
                                                            class="block  tracking-wide  text-lg  mb-2"
                                                            for="grid-Title"
                                                        >
                                                            Niveau
                                                        </label>
                                                        <select
                                                            ref={inputRefs.current[index].niveau}
                                                            class="block w-full bg-transparent  outline-none  focus:border focus:border-orange-500   border border-red rounded py-3 px-4 mb-3"
                                                            value={bloc.niveau}
                                                            onChange={(e) => handleInputChange(index, "niveau", e.target.value)}

                                                        >
                                                            <option className="text-black" value="">
                                                                Selectionnez la Niveau
                                                            </option>
                                                            <option className="text-black" value="Niveaux d'études secondaires">Niveaux d'études secondaires</option>
                                                            <option className="text-black" value="Niveaux d'études supérieures">Niveaux d'études supérieures</option>
                                                            <option className="text-black" value="Niveaux d'études maîtrise">Niveaux d'études maîtrise</option>
                                                            <option className="text-black" value="Niveaux d'études doctorale">Niveaux d'études doctorale</option>
                                                            <option className="text-black" value="Poste doctoral">Poste doctoral</option>
                                                            <option className="text-black" value="Recherche">Recherche</option>
                                                            <option className="text-black" value="Training">Training</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="rounded-lg w-full mx-2">
                                                    <div class="w-full mb-5">
                                                        <label
                                                            class="block  tracking-wide  text-lg  mb-2"
                                                            for="grid-Title"
                                                        >
                                                            Fin d'inscription
                                                        </label>
                                                        <input type='date'
                                                            ref={inputRefs.current[index].fintInscrire}
                                                            class="block w-full bg-transparent  outline-none  focus:border focus:border-orange-500   border border-red rounded py-3 px-4 mb-3"
                                                            value={bloc.fintInscrire}
                                                            onChange={(e) => handleInputChange(index, "fintInscrire", e.target.value)}

                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" mb-5">
                                                <label class="block  tracking-wide  text-lg  mb-2">Avanatage</label>
                                                {bloc.savantages.map((avantage, avantageIndex) => (
                                                    <div key={avantageIndex} className="flex items-center  mt-1">
                                                        <input
                                                            type="text"
                                                            value={avantage.av}
                                                            onChange={(e) => handleAvantageChange(e, index, avantageIndex)}
                                                            ref={(index === blocs.length - 1 && avantageIndex === bloc.seligibres.length - 1) ? lastAvantageInputRef : null}
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



                                            <div className=" mb-5" >
                                                <label class="block  tracking-wide  text-lg  mb-2">Critères d'éligibilité de la bourse d'etude</label>

                                                {bloc.seligibres.map((critere, critereIndex) => (
                                                    <div key={critereIndex} className="flex items-center  mt-1">
                                                        <input
                                                            type="text"
                                                            ref={(index === blocs.length - 1 && critereIndex === bloc.seligibres.length - 1) ? lastCritereInputRef : null}
                                                            value={critere.crit}
                                                            onChange={(e) => handleCritereChange(e, index, critereIndex)}
                                                            placeholder={`${critereIndex + 1}. Critères d'éligibilité`}
                                                            class="block w-full bg-transparent  outline-none  focus:border focus:border-orange-500   border border-red rounded py-3 px-4"
                                                        />
                                                        {critereIndex <= 0 && <button type="button" className="bg-blue-500 cursor-default opacity-0 text-white p-1 rounded ml-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-square" viewBox="0 0 16 16">
                                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                                            </svg>
                                                        </button>}


                                                        {critereIndex > 0 && <button type="button" className="bg-red-500 text-white p-1 rounded ml-1" onClick={() => handleRemoveCritere(index, critereIndex)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                            </svg>
                                                        </button>
                                                        }
                                                    </div>
                                                ))}
                                                <button type="button" className=" bg-[#b4b4b436] text-orange-600 px-3 py-2  mt-1 rounded-md" onClick={() => handleAddCritere(index)}>Ajouter un critère</button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className=" flex justify-end  w-full mr-4">

                        {boutLoading ? (
                            <>
                                <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-orange-950    p-2 rounded  text-gray-400">
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
                                </button>
                            </>
                        ) : (<>
                            <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-orange-600   p-2 rounded  text-white">
                                <input type="submit" id="send" value="Ajouter" className='cursor-pointer'></input>
                                <i class="bi bi-send ml-2 "></i>
                            </label>
                        </>)}
                    </div>
                </form>
                <Footer />
            </div>
        </div>

    );
}


export default AjouterBourseAdmin;
