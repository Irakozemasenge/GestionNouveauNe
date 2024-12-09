/* eslint-disable no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { createRef, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { FadeLoader } from 'react-spinners'
import { Link } from "react-router-dom";
import { countries, domainesEtudes } from "../../Data/Data";
import Footer from "../../Visiteurs/Footer/Footer";
import NavBarsEtude from "./NavBarsEtude";

function AdminModifEtude() {
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
    const [eledemmade, GeteleDemmande] = useState([])

    const [boutLoading, setboutLoading] = useState(false)
    const [radioValue, setRadioValue] = useState('');

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
        { titre: '', paySelected: '', domaine: '', niveau: '', notes: '', debutInscrire: '', fintInscrire: '', descript: '' }
    ]);

    const addBloc = () => {
        setBlocs([...blocs, { titre: '', paySelected: '', domaine: '', niveau: '', notes: '', debutInscrire: '', fintInscrire: '', descript: '' }]);
    };
    const removeBloc = (index) => {
        const newBlocs = [...blocs];
        newBlocs.splice(index, 1);
        setBlocs(newBlocs);
    };
    const inputRefs = useRef([]);
    if (inputRefs.current.length !== blocs.length) {

        inputRefs.current = Array(blocs.length).fill({}).map((_, index) => ({
            titre: createRef(null),
            paySelected: createRef(null),
            domaine: createRef(null),
            niveau: createRef(null),
            notes: createRef(null),
            debutInscrire: createRef(null),
            fintInscrire: createRef(null),
            descript: createRef(null),
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


    const validateBloc = (bloc, index) => {
        const requiredFields = ['titre', 'paySelected', 'domaine', 'niveau', 'notes', 'debutInscrire', 'fintInscrire', 'descript'];

        //Validation pour les champs vide
        for (const field of requiredFields) {
            if (!bloc[field]) {
                toast.warning(
                    <div>Le <strong>
                        {field == 'titre' ? 'titre de l\'événement' :
                            field == 'paySelected' ? 'paySelected de l\'événement' :
                                field == 'domaine' ? 'domaine de l\'événement' :
                                    field == 'niveau' ? 'niveau de l\'événement' :
                                        field == 'notes' ? 'notes de l\'événement' :
                                            field == 'debutInscrire' ? 'debutInscrire de l\'événement' :
                                                field == 'fintInscrire' ? 'fintInscrire de l\'événement' :
                                                    field == 'descript' ? 'description  de l\'événement' :
                                                        null}</strong> est obligatoire l'événement numero {index + 1}.</div>);
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


        //Validation pour eviter de sousmettre deux block de meme information

        const isdepluqueNom = blocs.some((b, i) => i !== index && b.titre === bloc.titre);
        if (isdepluqueNom) {
            const duplicateBlockIndex = blocs.findIndex((b, i) => i !== index && b.titre === bloc.titre);
            const duplicateBlockNumber = toRoman(duplicateBlockIndex + 1);
            toast.warning(
                <div>
                    Vous avez saisie le même nom de  <b className="font-bold">{bloc.titre}</b> à la block de <b className="font-bold"> {duplicateBlockNumber}</b> et  <b>{toRoman(index + 1)}</b>.
                </div>
            );
            animateAndScrollToRef(inputRefs.current[index].titre);
            return false;
        }



        //Validation pour eviter de sousmettre deux block de meme  nom du paySelected
        const isdepluquepaySelected = blocs.some((b, i) => i !== index && b.paySelected.name === bloc.paySelected.name);
        if (isdepluquepaySelected) {
            const duplicateBlockIndex = blocs.findIndex((b, i) => i !== index && b.paySelected.name === bloc.paySelected.name);
            const duplicateBlockNumber = toRoman(duplicateBlockIndex + 1);
            toast.warning(
                <div>
                    Vous avez saisie le même date de  <b className="font-bold">{bloc.paySelected.name}</b> à la block de <b className="font-bold"> {duplicateBlockNumber}</b> et  <b>{toRoman(index + 1)}</b>.
                </div>
            );
            animateAndScrollToRef(inputRefs.current[index].paySelected);
            return false;
        }


        //Validation pour eviter de sousmettre deux block de meme  nom du paySelected
        const isdepluqueDescript = blocs.some((b, i) => i !== index && b.descript === bloc.descript);
        if (isdepluqueDescript) {
            const duplicateBlockIndex = blocs.findIndex((b, i) => i !== index && b.descript === bloc.descript);
            const duplicateBlockNumber = toRoman(duplicateBlockIndex + 1);
            toast.warning(
                <div>
                    Vous avez saisie le même descriptin  à la block de <b className="font-bold"> {duplicateBlockNumber}</b> et  <b>{toRoman(index + 1)}</b>.
                </div>
            );
            animateAndScrollToRef(inputRefs.current[index].descript);
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


    const Datas = blocs.map((bloc) => ({
        titre: bloc.titre,
        paySelected: bloc.paySelected,
        domaine: bloc.domaine,
        niveau: bloc.niveau,
        notes: bloc.notes,
        debutInscrire: bloc.debutInscrire,
        fintInscrire: bloc.fintInscrire,
        descript: bloc.descript

    }))


    const handleSubmit = (e) => {
        e.preventDefault();
        for (let index = 0; index < blocs.length; index++) {
            if (!validateBloc(blocs[index], index)) {
                return false;
            }
        }

        toast.success(
            <div>
                Enregistrement avec succèss
            </div>
        );
        console.log('Datas', Datas)
    };

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedCountryCode(e.target.options[e.target.selectedIndex].getAttribute('codes'));
        handleOpen()
    };





    return (

        <div className="w-full overflow-hidden">
            <NavBarsEtude />
            <div className='w-full h-[80vh] overflow-x-hidden overflow-y-auto'>
                <form onSubmit={handleSubmit} className="flex mb-4 flex-col items-center">
                    <div className="rounded-lg p-2 relative  flex flex-wrap   w-[95%] sm:p-4">
                        {blocs.map((bloc, index) => (
                            <div key={index} className="justify-center overflow-hidden rounded-xl w-full h-max p-1 sm:p-2 mb-10  border-[1px] flex flex-col">
                                <div className="w-full">
                                    <div className="h-max w-full">
                                        <div className="px-3  w-full">
                                            <div className="w-full flex items_center justify-between">
                                                <label className="block  mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide  text-lg  mb-1">
                                                    {toRoman(index + 1)}.bourse
                                                </label>
                                                {index > 0 && (
                                                    <button
                                                        montant="button"
                                                        className="text-red-500 px-1 max-sm:text-xs py-2"
                                                        onClick={() => removeBloc(index)}
                                                    >
                                                        Supprimer
                                                    </button>
                                                )}
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
                                                        Titre bourses d'études
                                                    </label>
                                                    <input
                                                        ref={inputRefs.current[index].titre}
                                                        class="block w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3"
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
                                                    <div className="w-full flex bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded mb-3">
                                                        <div className="py-3 px-2 w-[5em]  p-2  border-r" >
                                                            <img src={`https://flagcdn.com/w40/${selectedCountryCode.toLowerCase()}.png`} alt="Drapeau" />
                                                        </div>
                                                        <select
                                                            className="py-3 px-4 w-full bg-transparent"
                                                            ref={inputRefs.current[index].paySelected}
                                                            value={bloc.paySelected}
                                                            onInput={(e) => { handleInputChange(index, "paySelected", e.target.value); handleCountryChange(e) }}

                                                        >
                                                            <option value="" className="bg-red-500">Sélectionnez un pays</option>
                                                            {Object.entries(countries).map(([code, name], index) => (
                                                                <option key={index} value={name} codes={code}>
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
                                                        class="block w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3"
                                                        value={bloc.domaine}
                                                        onChange={(e) => handleInputChange(index, "domaine", e.target.value)}

                                                    >
                                                        <option value="">
                                                            Selectionnez la domaine
                                                        </option>
                                                        {domainesEtudes.map((data, index) => (
                                                            <option key={index} value={data.nom}>{data.nom}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="w-full flex">
                                                <div className="rounded-lg w-1/2 mx-2">
                                                    <div class="w-full mb-5">
                                                        <label
                                                            class="block  tracking-wide  text-lg  mb-2"
                                                            for="grid-Title"
                                                        >
                                                            Niveau
                                                        </label>
                                                        <select
                                                            ref={inputRefs.current[index].niveau}
                                                            class="block w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3"
                                                            value={bloc.niveau}
                                                            onChange={(e) => handleInputChange(index, "niveau", e.target.value)}

                                                        >
                                                            <option value="">
                                                                Selectionnez la Niveau
                                                            </option>
                                                            <option className="Niveaux d'études secondaires">Niveaux d'études secondaires</option>
                                                            <option className="Niveaux d'études supérieures">Niveaux d'études supérieures</option>
                                                            <option className="Niveaux d'études maîtrise">Niveaux d'études maîtrise</option>
                                                            <option className="Niveaux d'études doctorale">Niveaux d'études doctorale</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="rounded-lg w-1/2 mx-2">
                                                    <div class="w-full mb-5">
                                                        <label
                                                            class="block  tracking-wide  text-lg  mb-2"
                                                            for="grid-Title"
                                                        >
                                                            Notes élevées en pourcentage
                                                        </label>
                                                        <input type="number"
                                                            min="0"
                                                            max="100"
                                                            placeholder="Notes élevées en pourcentage"
                                                            ref={inputRefs.current[index].notes}
                                                            class="block w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3"
                                                            value={bloc.notes}
                                                            onChange={(e) => handleInputChange(index, "notes", e.target.value)}

                                                        />


                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full flex">
                                                <div className="rounded-lg w-1/2 mx-2">
                                                    <div class="w-full mb-5">
                                                        <label
                                                            class="block  tracking-wide  text-lg  mb-2"
                                                            for="grid-Title"
                                                        >
                                                            Début d'inscription
                                                        </label>
                                                        <input type='date'
                                                            ref={inputRefs.current[index].debutInscrire}
                                                            class="block w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3"
                                                            value={bloc.debutInscrire}
                                                            onChange={(e) => handleInputChange(index, "debutInscrire", e.target.value)}

                                                        />
                                                    </div>
                                                </div>
                                                <div className="rounded-lg w-1/2 mx-2">
                                                    <div class="w-full mb-5">
                                                        <label
                                                            class="block  tracking-wide  text-lg  mb-2"
                                                            for="grid-Title"
                                                        >
                                                            Fin d'inscription
                                                        </label>
                                                        <input type='date'
                                                            ref={inputRefs.current[index].fintInscrire}
                                                            class="block w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3"
                                                            value={bloc.fintInscrire}
                                                            onChange={(e) => handleInputChange(index, "fintInscrire", e.target.value)}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="rounded-lg w-full">
                                                <div class="w-full mb-5">
                                                    <label
                                                        class="block  tracking-wide  text-lg  mb-2"
                                                        for="grid-Title"
                                                    >
                                                        Description  de bourses d'études
                                                    </label>
                                                    <textarea
                                                        placeholder=" Description  de bourses d'études"
                                                        ref={inputRefs.current[index].descript}
                                                        class="block w-full bg-transparent min-h-[10em] resize-y  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3"
                                                        value={bloc.descript}
                                                        onChange={(e) => handleInputChange(index, "descript", e.target.value)}
                                                    ></textarea>
                                                </div>
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
                                <label disabled className="cursor-no-drop w-max relative  flex justify-center  items-center   bg-green-950    p-2 rounded  text-gray-400">
                                    <input type="submit" id="send" value='Modifier' className='pointer-events-none' />
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
                            <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-green-600   p-2 rounded  text-white">
                                <input type="submit" id="send" value='Modifier' className='cursor-pointer'></input>
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


export default AdminModifEtude;



