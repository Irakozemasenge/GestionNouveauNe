/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import NavBarsEvemet from './NavBarsPublicite';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import Footer from '../../Visiteur/FootentContent/Footer';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

const AjouterPubliciteAdmin = () => {
    const [boutLoading, setboutLoading] = useState(false);
    const navigate = useNavigate()
    const [blocks, setBlocks] = useState([
        { titre: '', photos: '', link: '', description: '' }
    ]);

    const addBloc = () => {
        setBlocks([...blocks, { titre: '', photos: '', link: '', description: '' }]);
    };

    const removeBloc = (index) => {
        const newBlocs = [...blocks];
        newBlocs.splice(index, 1);
        setBlocks(newBlocs);
    };

    const inputRefs = useRef([]);
    if (inputRefs.current.length !== blocks.length) {
        inputRefs.current = blocks.map(() => ({
            titre: React.createRef(null),
            photos: React.createRef(null),
            link: React.createRef(null),
            description: React.createRef(null),
        }));
    }

    const handleInputChange = (index, field, value, isFile = false) => {
        const newBlocs = [...blocks];
        newBlocs[index][field] = value;

        if (isFile) {
            if (value && value.length > 0) {
                let file = value[0];
                newBlocs[index] = { ...newBlocs[index], [field]: file };
            } else {
                delete newBlocs[index];
            }
        } else {
            newBlocs[index] = { ...newBlocs[index], [field]: value };
        }

        setBlocks(newBlocs);

        if (value && inputRefs.current[index][field].current) {
            inputRefs.current[index][field].current.classList.remove('animate__animated', 'animate__shakeX', 'border-2', 'border-red-500');
        }
    };


    const animateAndScrollToRef = (ref) => {
        if (ref && ref.current) {
            ref.current.classList.add('animate__animated', 'animate__shakeX', 'border-2', 'border-red-500', 'outline-none',);
            setTimeout(() => {
                ref.current.classList.remove('animate__animated', 'animate__shakeX', 'border-2', 'border-red-500', 'outline-none',);
            }, 5000);
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            ref.current.focus();
        }
    };




    const validateBloc = (bloc, index) => {
        const requiredFields = ['titre', 'photos', 'link', 'description'];

        if (!!bloc.link) {
            requiredFields.splice(1, 1);
        }
        if (!!bloc.photos) {
            requiredFields.splice(2, 1);
        }


        for (const field of requiredFields) {
            if (!bloc[field]) {
                toast.warning(
                    <div>Le <strong>                {
                        field === 'titre' ? 'titre de l\'événement ' :
                            field === 'photos' ? 'photos de l\'événement ' :
                                field === 'link' ? 'lien de youtube de l\'événement ' :
                                    field === 'description' ? 'description de l\'événement ' :
                                        null}</strong> est obligatoire à publicite {index + 1}.</div>);
                if (inputRefs.current[index][field].current) {
                    inputRefs.current[index][field].current.classList.add('animate__animated', 'animate__shakeX', 'border-2', 'border-red-500');
                    setTimeout(() => {
                        inputRefs.current[index][field].current.classList.remove('animate__animated', 'animate__shakeX', 'border-2', 'border-red-500');
                    }, 3000);
                    inputRefs.current[index][field].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    inputRefs.current[index][field].current.focus();
                    return false;
                }
            }
        }

        //Validation pour empêcher evemenement  avec le même titr
        const isSametitre = blocks.some((b, i) => i !== index && b.titre === bloc.titre);
        if (isSametitre) {
            toast.warning(<div>Vous avez déjà utilisé le titre <span className="font-bold">{bloc.titre}</span> dans la evenement de block  {(index + 1)}</div>);
            animateAndScrollToRef(inputRefs.current[index].titre);
            return false;
        }

        // Validation pour empêcher publicite avec le même lien vidéo YouTube
        const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        if (bloc.link && !youtubeRegex.test(bloc.link)) {
            toast.warning(<div>Le lien vidéo doit être un lien YouTube valide pour publicite {(index + 1)}</div>);
            animateAndScrollToRef(inputRefs.current[index].link);
            return false;
        }

        //Validation pour empêcher evemenement  avec le même description
        const isSamedescrip = blocks.some((b, i) => i !== index && b.description === bloc.description);
        if (isSamedescrip) {
            toast.warning(<div>Vous avez déjà utilisé le description <span className="font-bold">{bloc.description}</span> dans la evenement de block  {(index + 1)}</div>);
            animateAndScrollToRef(inputRefs.current[index].description);
            return false;
        }

        return true;
    }


    const handleResetPhotos = (index) => {
        const updatedBlocks = [...blocks];
        updatedBlocks[index].photos = '';
        setBlocks(updatedBlocks);
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        for (let index = 0; index < blocks.length; index++) {
            if (!validateBloc(blocks[index], index)) {
                return;
            }
        }
        setboutLoading(true)
        const formData = new FormData();
        blocks.forEach((event, index) => {
            formData.append(`item[${index}][titre]`, event.titre);
            formData.append(`item[${index}][description]`, event.description);
            formData.append(`item[${index}][link]`, event.link);
            if (event.photos !== "") {
                formData.append(`item[${index}][photo]`, event.photos);
                formData.append(`item[${index}][photoindex]`, parseInt(index));
            }
        });


        // Ajout de l'en-tête Content-Type pour indiquer la présence de fichiers
        axios.post("http://localhost:8005/event/addevent", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log("Réponse du serveur :", response.data);
                toast.success("Événement enregistré avec succès !");
                setBlocks([
                    { titre: '', photos: '', link: '', description: '' }
                ]);
                setboutLoading(false)
                navigate("/Publicite")
            })
            .catch(error => {
                console.error("Erreur lors de l'envoi des données d'événement :", error);
                setboutLoading(false)
                if (error.response && error.response.data) {
                    toast.error(error.response.data);
                    setboutLoading(false)
                } else {
                    toast.error("Une erreur est survenue lors de l'enregistrement de publicite. Veuillez réessayer.");
                    setboutLoading(false)
                }
            });
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
            <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                <form onSubmit={handleSubmit} className="flex flex-col items-center mb-5">
                    <div className="rounded-lg p-2   w-[90%]  sm:p-4">
                        {blocks.map((block, index) => (
                            <div key={index} className="justify_center rounded-xl w-full p-1 sm:p-4 mb-10 border border-[#5dca32] flex flex-col">
                                <label className="block tracking-wide text-grey-darker text-lg mb-2">Titre</label>
                                <input
                                    className="appearance-none outline-none focus:border focus:border-[#5dca32] block bg-transparent w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                    type="text"
                                    ref={inputRefs.current[index].titre}
                                    value={block.titre}
                                    placeholder="Le titre de publicite est obligatoire"
                                    onChange={(event) => handleInputChange(index, 'titre', event.target.value)}
                                />

                                {!block.link && <label ref={inputRefs.current[index].photos} htmlFor={`photos_${index}`} className={`appearance-none outline-none focus:border focus:border-[#5dca32] block cursor-pointer bg-transparent w-full  text-grey-darker border border-red rounded py-3 px-4 mb-3 `}>
                                    Photos
                                </label>
                                }
                                <input
                                    className="border p-2"
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    id={`photos_${index}`}
                                    onChange={(event) => handleInputChange(index, 'photos', event.target.files, true)}
                                />

                                {block.photos &&
                                    <div className='max-w-[20em] max-h-[20em] relative border  overflow-hidden rounded-md'>
                                        <div className='absolute  cursor-pointer py-2 m-2 right-1  text-end' >
                                            <svg onClick={() => handleResetPhotos(index)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bg-red-500 rounded-md cursor-pointer p-1 pointer-events-auto bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                            </svg>
                                        </div>
                                        <img src={URL.createObjectURL(block.photos)} className="w-full h-full object-cover" />
                                    </div>
                                }

                                {!block.photos &&
                                    <>
                                        <label className="block tracking-wide text-grey-darker text-lg mb-2 mt-7">Vidéo</label><input
                                            className="appearance-none outline-none focus:border focus:border-[#5dca32] block bg-transparent w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                            type="text"
                                            placeholder="Le url de youtube de publicite est obligatoire"
                                            value={block.link}
                                            ref={inputRefs.current[index].link}
                                            onChange={(event) => { handleInputChange(index, 'link', event.target.value) }} />
                                    </>
                                }
                                <label className="block tracking-wide text-grey-darker text-lg mb-2 mt-7">Description:</label>
                                <textarea
                                    className="appearance-none block min-h-[15em] resize-y bg-transparent overflow-hidden outline-none focus:border focus:border-[#5dca32] w-full bg-grey-lighter text-grey-darker border border-gray-400 rounded  p-2 mb-1"
                                    ref={inputRefs.current[index].description}
                                    value={block.description}
                                    placeholder="La description de publicite est obligatoire"
                                    onChange={(event) => handleInputChange(index, 'description', event.target.value)}
                                />
                                <div className='w-full flex justify-start'>
                                    {index !== 0 && (
                                        <button type="button" className='text-red-600 font-extrabold' onClick={() => removeBloc(index)}>
                                            Supprimer
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={addBloc}
                            className="bg-[#5dca32] cursor-pointer hover-bg-blue-700 text-white py-1 px-2  max-sm:text-xs sm:py-2 sm:px-4 rounded">
                            Ajouter un autre événement
                        </button>
                    </div>
                    <div className=" flex justify-end  w-[95%]">

                        {boutLoading ? (
                            <>
                                <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-orange-950    p-2 rounded  text-gray-400">
                                    <input type="submit" id="send" value='Enregister' className='pointer-events-none' />
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
                        ) : (
                            <>
                                <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-[#5dca32]   p-2 rounded  text-white">
                                    <input type="submit" id="send" value="Enregister'" className='cursor-pointer'></input>
                                    <i class="bi bi-send ml-2 "></i>
                                </label>
                            </>
                        )}
                    </div>
                </form>
                <Footer />
            </div>
        </div>
    );
};

export default AjouterPubliciteAdmin;