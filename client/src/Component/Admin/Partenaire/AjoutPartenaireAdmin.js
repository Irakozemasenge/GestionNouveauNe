/* eslint-disable eqeqeq */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import NabBarpartenaire from './NabBarpartenaire';
import axios from 'axios';

function AjoutPartenaireAdmin() {
    const [nom, setNom] = useState('');
    const nomRef = useRef(null);

    const [Site, setSite] = useState('');
    const SiteRef = useRef(null);

    const [Description, setDescription] = useState('');
    const DescriptionRef = useRef(null);

    const [logo, setLogo] = useState('');
    const logoRef = useRef(null);

    // Fonction de validation de l'URL
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation des champs
        if (nom.trim() === '') {
            toast.warning("Le nom du partenaire est obligatoire", { autoClose: 2000 });
            nomRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            nomRef.current.focus();
            return;
        } else if (Site.trim() === '') {
            toast.warning("L'URL du site web est obligatoire", { autoClose: 2000 });
            SiteRef.current.focus();
            return;
        } else if (!isValidUrl(Site.trim())) { // Ajout de validation pour l'URL
            toast.warning("Veuillez entrer une URL valide", { autoClose: 2000 });
            SiteRef.current.focus();
            return;
        } else if (Description.trim() === '') {
            toast.warning("La description du partenaire est obligatoire", { autoClose: 2000 });
            DescriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            DescriptionRef.current.focus();
            return;
        } else if (logo === '') {
            toast.warning("Le logo du partenaire est obligatoire", { autoClose: 2000 });
            logoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            logoRef.current.focus();
            return;
        }

        // Si la validation réussit, construisez le formulaire FormData
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('siteweb', Site);
        formData.append('logo', logo);
        formData.append('description', Description);

        // Envoyer les données via Axios
        axios.post("https://speedreal.abahs-jobconnect.com/partenaire/Addnew", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log("Réponse du serveur :", response.data);
                setNom("")
                setSite("")
                setDescription("")
                setLogo("")
                toast.success("Partenaire enregistré avec succès !");
            })
            .catch(error => {
                console.error("Erreur lors de l'envoi des données de Partenaire :", error);
                if (error.response && error.response.data) {
                    toast.error(error.response.data);
                } else {
                    toast.error("Une erreur est survenue lors de l'enregistrement du Partenaire. Veuillez réessayer.");
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
        <div className='w-full'>
            <NabBarpartenaire />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className='w-[97%]  sm:p-3 p-1 rounded-xl h-max border  m-2'>
                    <form className="w-full mx-auto rounded-md p-4 mt-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="nom" className="block tracking-wide text-lg mb-2">
                                Nom
                            </label>
                            <input
                                ref={nomRef}
                                id="nom"
                                type="text"
                                placeholder="Nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className={`block w-full bg-transparent outline-none focus:border focus:border-fuchsia-500 border border-red rounded py-3 px-4 mb-3  `}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block tracking-wide text-lg mb-2">
                                Site web
                            </label>
                            <input
                                ref={SiteRef}
                                placeholder="Site web"
                                value={Site}
                                onChange={(e) => setSite(e.target.value)}
                                className="block w-full bg-transparent outline-none focus:border focus:border-fuchsia-500 border border-red rounded py-3 px-4 mb-3"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Description" className="block tracking-wide text-lg mb-2">
                                Description
                            </label>
                            <textarea
                                ref={DescriptionRef}
                                id="Description"
                                placeholder="Description"
                                value={Description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="block w-full bg-transparent min-h-[10em] resize-y outline-none focus:border focus:border-fuchsia-500 border border-red rounded py-3 px-4 mb-3"
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor='logo' ref={logoRef} className="block cursor-pointer w-full bg-transparent outline-none focus:border focus:border-fuchsia-500 border border-red rounded py-3 px-4 mb-3">
                                Logo
                            </label>
                            <input
                                type='file'
                                hidden
                                id='logo'
                                onChange={(e) => setLogo(e.target.files[0])} />
                        </div>
                        {logo &&
                            <div className='w-[15em] h-[15em]'>
                                <img src={URL.createObjectURL(logo)} draggable={false} className='w-full h-full object-cover' alt='    ' />
                            </div>
                        }
                        <div className="flex items-center justify-end">
                            <button
                                className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AjoutPartenaireAdmin