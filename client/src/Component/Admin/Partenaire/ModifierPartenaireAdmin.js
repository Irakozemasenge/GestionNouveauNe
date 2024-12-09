/* eslint-disable eqeqeq */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import NabBarpartenaire from './NabBarpartenaire';
import axios from 'axios';
import { decryptData } from '../../../encryptionModule';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ModifierPartenaireAdmin() {
    const [nom, setNom] = useState('');
    const nomRef = useRef(null);

    const [Site, setSite] = useState('');
    const SiteRef = useRef(null);

    const [description, setdescription] = useState('');
    const descriptionRef = useRef(null);
    const [photoOrder, setPhotoOrder] = useState('');
    const [logo, setLogo] = useState('');
    const logoRef = useRef(null);
    const { id } = useParams();
    const partenaireId = decryptData(id);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchpartenaire = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/partenaire/getOneById/${partenaireId}`);
                const { nom, logo, siteweb, description } = response.data;
                setNom(nom);
                setPhotoOrder(logo);
                setSite(siteweb)
                setdescription(description)
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'événement :', error);
            }
        };

        fetchpartenaire();
    }, [partenaireId]);

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
        e.preventDefault()
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
        } else if (description.trim() === '') {
            toast.warning("La description du partenaire est obligatoire", { autoClose: 2000 });
            descriptionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            descriptionRef.current.focus();
            return;
        }


        // Si la validation réussit, construisez le formulaire FormData
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('siteweb', Site);
        if (logo) {
            formData.append('logo', logo);
        }
        formData.append('description', description);

        // Envoyer les données via Axios
        axios.put(`https://speedreal.abahs-jobconnect.com/partenaire/updateOne/${partenaireId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log("Réponse du serveur :", response.data);
                setNom("")
                setSite("")
                setdescription("")
                setLogo("")
                toast.success("Partenaire enregistré avec succès !");
                navigate('/partenaire')
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
                <Link to='/partenaire' className='ml-1'>
                    Retour
                </Link>
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
                            <label htmlFor="description" className="block tracking-wide text-lg mb-2">
                                description
                            </label>
                            <textarea
                                ref={descriptionRef}
                                id="description"
                                placeholder="description"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
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
                                onChange={(e) => { setLogo(e.target.files[0]); setPhotoOrder("") }} />
                        </div>
                        {logo &&
                            <div className='w-[15em] h-[15em]'>
                                <img src={URL.createObjectURL(logo)} draggable={false} className='w-full h-full object-cover' alt='    ' />
                            </div>
                        }
                        {photoOrder &&
                            <div className='w-[15em] h-[15em]'>
                                <img src={`https://speedreal.abahs-jobconnect.com/uploads/partners/${photoOrder}`} draggable={false} alt='  ' className="w-full h-full object-cover" />
                            </div>
                        }
                        <div className="flex items-center justify-end">
                            <button
                                className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Modifier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModifierPartenaireAdmin