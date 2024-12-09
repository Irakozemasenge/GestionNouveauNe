import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import NavBarsEvemet from './NavBarsEvemet';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../Visiteurs/Footer/Footer';
import axios from 'axios';
import { decryptData } from '../../../encryptionModule';
import { FadeLoader } from 'react-spinners';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';

const EditorAdminEvent = () => {
    const [boutLoading, setBoutLoading] = useState(false);
    const [titre, settitre] = useState('');
    const [photo, setPhoto] = useState('');
    const [photoOrder, setPhotoOrder] = useState('');
    const [video, setVideo] = useState('');
    const [description, setDescription] = useState('');

    const inputRefs = useRef({
        titre: React.createRef(null),
        photo: React.createRef(null),
        video: React.createRef(null),
        description: React.createRef(null),
    });

    const [loadings, Setloadings] = useState(true);
    const { id } = useParams();
    const eventId = decryptData(id);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/event/getOneById/${eventId}`);
                const { titre, photo, video, description } = response.data;
                settitre(titre);
                setPhotoOrder(photo);
                setVideo(video);
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

        if (!photoOrder && !video && !photo) {
            toast.error("Veuillez Modifier soit une vidéo soit une photo.");
            return;
        }

        if (video && photo) {
            toast.error("Vous ne pouvez pas Modifier à la fois une vidéo et une photo.");
            return;
        }

        // Validation de l'URL YouTube
        const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        if (video && !youtubeRegex.test(video)) {
            toast.error("Veuillez entrer une URL YouTube valide pour la vidéo.");
            return;
        }

        // Envoi des données si la validation est réussie

        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        if (video) {
            formData.append('video', video);
        }
        if (photo) {
            formData.append('photo', photo);
        }

        setBoutLoading(true);

        axios.put(`https://speedreal.abahs-jobconnect.com/event/updateevent/${eventId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                navigate("/event")
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



    return (
        <div className='w-full'>
            <NavBarsEvemet />
            {loadings && <SpinnerDemarage />}
            <div className='w-full overflow-y-auto overflow-x-hidden h-[80vh]'>
                <Link to='/event' className='ml-1'>
                    Retour
                </Link>
                <form onSubmit={handleSubmit} className="flex flex-col items-center mb-5">
                    <div className="rounded-lg p-2 border border-blue-500 w-[90%] sm:p-4">
                        <div className="justify_center rounded-xl w-full p-1 sm:p-4 mb-10 border border-orange-700 flex flex-col">
                            <label className="block tracking-wide text-grey-darker text-lg mb-2">titre</label>
                            <input
                                className="appearance-none outline-none focus:border focus:border-orange-600 block bg-transparent w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                type="text"
                                ref={inputRefs.current.titre}
                                value={titre}
                                placeholder="Le titre de l'événement est obligatoire"
                                onChange={(event) => settitre(event.target.value)}
                            />

                            <label htmlFor={`photo`} className={`appearance-none outline-none focus:border focus:border-orange-600 block cursor-pointer bg-transparent w-full  text-grey-darker border border-red rounded py-3 px-4 mb-3 `}>
                                photo
                            </label>
                            <input
                                className="border p-2"
                                type="file"
                                accept="image/*"
                                hidden
                                id={`photo`}
                                onChange={(event) => { setPhoto(event.target.files[0]); setPhotoOrder(""); setVideo("") }}
                            />

                            {photo &&
                                <div className='max-w-[20em] max-h-[20em] relative border  overflow-hidden rounded-md'>

                                    <img src={URL.createObjectURL(photo)} className="w-full h-full object-cover" alt='' />
                                </div>
                            }
                            {photoOrder &&
                                <div className='max-w-[20em] max-h-[20em] relative border  overflow-hidden rounded-md'>

                                    <img src={`https://speedreal.abahs-jobconnect.com/uploads/evenements/${photoOrder}`} alt='' className="w-full h-full object-cover" />
                                </div>
                            }

                            <label className="block tracking-wide text-grey-darker text-lg mb-2 mt-7">Vidéo</label>
                            <input
                                className="appearance-none outline-none focus:border focus:border-orange-600 block bg-transparent w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                type="text"
                                placeholder="Le url de youtube de l'événement est obligatoire"
                                value={video}
                                ref={inputRefs.current.video}
                                onChange={(event) => { setVideo(event.target.value); setPhoto("") }}
                            />

                            <label className="block tracking-wide text-grey-darker text-lg mb-2 mt-7">Description:</label>
                            <textarea
                                className="appearance-none block h-[15em] resize-none bg-transparent overflow-hidden outline-none focus:border focus:border-orange-600 w-full bg-grey-lighter text-grey-darker border border-gray-400 rounded  p-2 mb-1"
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
                            <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-orange-600   p-2 rounded  text-white">
                                <input type="submit" id="send" value="Modifier'" className='cursor-pointer'></input>
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

export default EditorAdminEvent;
