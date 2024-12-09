/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import NavBarsEvemet from './NavBarsPublicite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import Footer from '../../Visiteur/FootentContent/Footer';
import { decryptData } from '../../../encryptionModule';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';

const FormComponent = () => {
    const [boutLoading, setBoutLoading] = useState(false);
    const [titre, settitre] = useState('');
    const [photo, setPhoto] = useState('');
    const [photoOrder, setPhotoOrder] = useState('');
    const [link, setlink] = useState('');
    const [description, setDescription] = useState('');

    const inputRefs = useRef({
        titre: React.createRef(null),
        photo: React.createRef(null),
        link: React.createRef(null),
        description: React.createRef(null),
    });

    const [loadings, Setloadings] = useState(true);
    const { id } = useParams();
    const eventId = decryptData(id);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8005/event/getOneById/${eventId}`);
                const { titre, photo, link, description } = response.data;
                settitre(titre);
                setPhotoOrder(photo);
                setlink(link);
                setDescription(description);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'événement :', error);
                Setloadings(false)
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titre) {
            toast.error("Veuillez remplir le champ titre.");
            return;
        }

        if (!description) {
            toast.error("Veuillez remplir le champ description.");
            return;
        }

        if (!photoOrder && !link && !photo) {
            toast.error("Veuillez Modifier soit une vidéo soit une photo.");
            return;
        }

        if (link && photo) {
            toast.error("Vous ne pouvez pas Modifier à la fois une vidéo et une photo.");
            return;
        }

        // Validation de l'URL YouTube
        const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        if (link && !youtubeRegex.test(link)) {
            toast.error("Veuillez entrer une URL YouTube valide pour la vidéo.");
            return;
        }

        // Envoi des données si la validation est réussie
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);

        if (link) {
            formData.append('link', link);
        }
        if (photo) {
            formData.append('photo', photo);
        }

        setBoutLoading(true);

        axios.put(`http://localhost:8005/event/updateevent/${eventId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                navigate("/Publicite")
                toast.success("Événement mis à jour avec succès !");
                setBoutLoading(false)
            })
            .catch(error => {
                setBoutLoading(false)
                console.error("Erreur lors de la mise à jour de l'événement :", error.message);
                if (error.response && error.response.data) {
                    toast.error(error.response.data);
                    setBoutLoading(false)
                } else {
                    toast.error("Une erreur est survenue lors de la mise à jour de l'événement. Veuillez réessayer.");
                    setBoutLoading(false)
                }
            })
            .finally(() => setBoutLoading(false));
    };

    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)

    useEffect(() => {
        const hundleSize = () => {
            SetMobile3(window.innerWidth < 342)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])



    return (
        <div className='w-full'>
            <NavBarsEvemet />
            {loadings && <SpinnerDemarage />}
            <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                <div className="flex items-center w-full justify-between">
                    <Link to='/Publicite' className="w-8 h-8 flex justify-center items-center text-green-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                        </svg>
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center mb-5">
                    <div className="rounded-lg p-2 border border-[#5dca32] w-[90%] sm:p-4">
                        <div className="justify_center rounded-xl w-full p-1 sm:p-4 mb-10   flex flex-col">
                            <label className="block tracking-wide text-grey-darker text-lg mb-2">titre</label>
                            <input
                                className="appearance-none outline-none focus:border focus:border-[#5dca32] block bg-transparent w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                type="text"
                                ref={inputRefs.current.titre}
                                value={titre}
                                placeholder="Le titre de l'événement est obligatoire"
                                onChange={(event) => settitre(event.target.value)}
                            />

                            <label htmlFor={`photo`} className={`appearance-none outline-none focus:border focus:border-[#5dca32] block cursor-pointer bg-transparent w-full  text-grey-darker border border-red rounded py-3 px-4 mb-3 `}>
                                photo
                            </label>
                            <input
                                className="border p-2"
                                type="file"
                                accept="image/*"
                                hidden
                                id={`photo`}
                                onChange={(event) => { setPhoto(event.target.files[0]); setPhotoOrder(""); setlink("") }}
                            />

                            {photo &&
                                <div className='max-w-[20em] max-h-[20em] relative border  overflow-hidden rounded-md'>

                                    <img src={URL.createObjectURL(photo)} className="w-full h-full object-cover" alt='' />
                                </div>
                            }
                            {photoOrder &&
                                <div className='max-w-[20em] max-h-[20em] relative border  overflow-hidden rounded-md'>

                                    <img src={`http://localhost:8005/uploads/publicites/${photoOrder}`} alt='' className="w-full h-full object-cover" />
                                </div>
                            }

                            <label className="block tracking-wide text-grey-darker text-lg mb-2 mt-7">Vidéo</label>
                            <input
                                className="appearance-none outline-none focus:border focus:border-[#5dca32] block bg-transparent w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                type="text"
                                placeholder="Le url de youtube de l'événement est obligatoire"
                                value={link}
                                ref={inputRefs.current.link}
                                onChange={(event) => { setlink(event.target.value); setPhoto("") }}
                            />

                            <label className="block tracking-wide text-grey-darker text-lg mb-2 mt-7">Description:</label>
                            <textarea
                                className="appearance-none block min-h-[15em] resize-y bg-transparent overflow-hidden outline-none focus:border focus:border-[#5dca32] w-full bg-grey-lighter text-grey-darker border border-gray-400 rounded  p-2 mb-1"
                                ref={inputRefs.current.description}
                                value={description}
                                placeholder="La description de l'événement est obligatoire"
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className=" flex justify-end  w-[95%]">
                        {boutLoading ? (
                            <>
                                <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-orange-950    p-2 rounded  text-gray-400">
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
                                </button>
                            </>
                        ) : (<>
                            <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-[#5dca32]   p-2 rounded  text-white">
                                <input type="submit" id="send" value="Modifier" className='cursor-pointer'></input>
                                <i class="bi bi-send ml-2 "></i>
                            </label>
                        </>)}
                    </div>
                </form>
                <Footer />
            </div>
        </div>
    );
};

export default FormComponent;
