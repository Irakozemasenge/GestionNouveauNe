import React, { createRef, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader } from 'react-spinners'
import NavBarsEtude from "./NavBarsEtude";
import { countries, domainesEtudes } from "../../Data/Data";
import Footer from "../../Visiteurs/Footer/Footer";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { decryptData } from "../../../encryptionModule";
function AdminModifEtude() {
    const [mobile11, SetMobile11] = useState(window.innerWidth < 501)
    const [loadings, Setloadings] = useState(true);
    useEffect(() => {
        const hundlesSize = () => {
            SetMobile11(window.innerWidth < 501)
        }
        window.addEventListener('resize', hundlesSize)
        return () => {
            window.removeEventListener('resize', hundlesSize)
        }
    }, [])

    const { id } = useParams()
    const bId = decryptData(id)
    const navigate = useNavigate()
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


    const [bourse, setbourse] = useState(
        { titre: '', domaine: '', champSupplementaire: '', niveau: '', fin: '' }
    );
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');
    const location = useLocation();
    useEffect(() => {
        const bourseDetails = location.state;
        if (bourseDetails) {
            setbourse({
                titre: bourseDetails.titre,
                domaine: bourseDetails.domaine,
                niveau: bourseDetails.niveau,
                fin: new Date(bourseDetails.fin).toISOString().split('T')[0]
            });
            setSelectedCountryCode(bourseDetails.drapeux)
            setSelectedCountry(bourseDetails.pays)
        }
    }, [location.state]);

    const inputRefs = useRef([]);
    useEffect(() => {
        // Initialize refs based on bourse state
        inputRefs.current = Object.keys(bourse).map((key) => inputRefs.current[key] || createRef());
    }, [bourse]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setbourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedCountryCode(e.target.options[e.target.selectedIndex].getAttribute('codes'));

    };

    let data = {
        titre: bourse.titre,
        pays: selectedCountry,
        drapeux: selectedCountryCode,
        domaine: bourse.domaine,
        niveau: bourse.niveau,
        fin: bourse.fin,
    };
    if (bourse.domaine === 'Autre_demain') {
        data.domaine = bourse.champSupplementaire;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setboutLoading(true)

        // Utilisation des données correctes pour la mise à jour de la bourse
        axios.put(`https://speedreal.abahs-jobconnect.com/etude/updateEtude/${bId}`, data) // Utilisation de 'data' au lieu de 'bourse'
            .then((resp) => {
                toast.success(resp.data);
                setbourse(
                    { titre: '', domaine: '', champSupplementaire: '', niveau: '', fin: '' }
                );
                setSelectedCountryCode("")
                setSelectedCountry("")
                setboutLoading(false)
                navigate(`/etude/detail/${id}`);
            })
            .catch((err) => {
                if (err.response) {
                    // Le serveur a répondu avec un code d'erreur
                    console.error("Erreur lors de la mise à jour de la bourse :", err.response.data);
                    toast.error(err.response.data);
                    setboutLoading(false)
                } else if (err.request) {
                    // La requête a été envoyée, mais aucune réponse n'a été reçue
                    console.error("Aucune réponse du serveur lors de la mise à jour de la bourse :", err.request);
                    toast.error("Aucune réponse du serveur lors de la mise à jour de la bourse");
                    setboutLoading(false)
                } else {
                    // Une erreur s'est produite lors de la configuration de la requête
                    console.error("Erreur lors de la mise à jour de la bourse :", err.message);
                    toast.error("Erreur lors de la mise à jour de la bourse :)");
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

                        <div className="justify-center overflow-hidden rounded-xl w-full h-max p-1 sm:p-2 mb-10  border-[1px] flex flex-col">
                            <div className="w-full">
                                <div className="h-max w-full">
                                    <div className="px-3  w-full">
                                        <div className="w-full flex items_center justify-between">
                                            <label className="boursek  mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide  text-lg  mb-1">
                                                Modifier la  bourse
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
                                                    class="boursek  tracking-wide  text-lg  mb-2"
                                                    for="grid-Title"
                                                >
                                                    Titre bourses d'études
                                                </label>
                                                <input
                                                    ref={inputRefs.current.titre}
                                                    class="boursek w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3"
                                                    value={bourse.titre}
                                                    placeholder="Titre bourses d'études"
                                                    name="titre"
                                                    onChange={handleChange}

                                                />
                                            </div>
                                        </div>
                                        <div className="rounded-lg w-full">
                                            <div class="w-full mb-5">
                                                <label
                                                    class="boursek  tracking-wide  text-lg  mb-2"
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
                                                        ref={inputRefs.current.pays}
                                                        value={selectedCountry}
                                                        name="pays"
                                                        onChange={handleChange}
                                                        onInput={(e) => { handleCountryChange(e) }}

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
                                                    class="boursek  tracking-wide  text-lg  mb-2"
                                                    for="grid-Title"
                                                >
                                                    Domaine
                                                </label>
                                                <select
                                                    ref={inputRefs.current.domaine}
                                                    class="boursek w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3"
                                                    value={bourse.domaine}
                                                    name="domaine"
                                                    onChange={handleChange}

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
                                                {bourse.domaine == 'Autre_demain' && <div className="rounded-lg w-full">
                                                    <div class="w-full mb-5">
                                                        <label
                                                            class="boursek  tracking-wide  text-lg  mb-2"
                                                            for="grid-Title"
                                                        >
                                                            Autre demain
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={bourse.champSupplementaire}
                                                            name="champSupplementaire"
                                                            onChange={handleChange}
                                                            ref={inputRefs.current.champSupplementaire}
                                                            placeholder="Champ supplémentaire..."
                                                            className="boursek w-full px-3 py-2 mt-1 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>

                                        <div className={`w-full flex ${mobile ? 'flex-col' : ''}`}>
                                            <div className="rounded-lg w-full mx-2">
                                                <div class="w-full mb-5">
                                                    <label
                                                        class="boursek  tracking-wide  text-lg  mb-2"
                                                        for="grid-Title"
                                                    >
                                                        Niveau
                                                    </label>
                                                    <select
                                                        ref={inputRefs.current.niveau}
                                                        class="boursek w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3"
                                                        value={bourse.niveau}
                                                        name="niveau"
                                                        onChange={handleChange}
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
                                                        class="boursek  tracking-wide  text-lg  mb-2"
                                                        for="grid-Title"
                                                    >
                                                        Fin d'inscription
                                                    </label>
                                                    <input type='date'
                                                        ref={inputRefs.current.fin}
                                                        class="boursek w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3"
                                                        value={bourse.fin}
                                                        name="fin"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className=" flex justify-end  w-[95%]">

                        {boutLoading ? (
                            <>
                                <label disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center   bg-orange-950    p-2 rounded  text-gray-400">
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
                            <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-orange-600   p-2 rounded  text-white">
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
