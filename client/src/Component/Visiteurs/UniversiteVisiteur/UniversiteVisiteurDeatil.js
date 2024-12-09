/* eslint-disable eqeqeq */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Modal } from 'rsuite';
import Adresse from '../Adresse/Adresse';
import { decryptData } from '../../../encryptionModule';
import axios from 'axios';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
import { FadeLoader } from 'react-spinners';

function UniversiteVisiteurDeatil() {
    const [etudeDetails, setetudeDetails] = useState({});
    const { id } = useParams()
    const [loadings, Setloadings] = useState(true);
    const [boutLoading, setboutLoading] = useState(false)


    const etudeId = decryptData(id)
    useEffect(() => {
        const fetchetudeDetails = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/etude/getEtudeById/${etudeId}`);
                setetudeDetails(response.data);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la etude :', error);
                Setloadings(false)
            }
        };


        fetchetudeDetails();
    }, [etudeId]);






    const [nom, setNom] = useState('');
    const nomRef = useRef(null);

    const [prenom, setPrenom] = useState('');
    const prenomRef = useRef(null);

    const [tel, setTel] = useState('');
    const telRef = useRef(null);

    const [adresse, setAdresse] = useState('');
    const adresseRef = useRef(null);

    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const [email, setEmail] = useState('');
    const emailRef = useRef(null);



    const [message, setMessage] = useState('');
    const messageRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (nom.trim() == '') {
            toast.warning("Votre nom est obligatoire", {
                autoClose: 2000
            });
            nomRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            nomRef.current.focus()
            return;
        } else if (prenom.trim() == '') {
            toast.warning("Votre prenom est obligatoire", {
                autoClose: 2000
            });

            prenomRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            prenomRef.current.focus()
            return;
        } else if (tel.trim() == '') {
            toast.warning("Votre téléphone est obligatoire", {
                autoClose: 2000
            });
            telRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            telRef.current.focus()
            return;
        } else if (adresse.trim() == '') {
            toast.warning("Votre addresse physique est obligatoire", {
                autoClose: 2000
            });

            adresseRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            adresseRef.current.focus()
            return;
        } else if (email.trim() == '') {
            toast.warning("Votre  email est obligatoire", {
                autoClose: 2000
            });
            emailRef.current.focus()
            return;
        }
        else if (!email.trim().match(emailRegex)) {
            toast.warning("Votre  email est incorrect", {
                autoClose: 2000
            });
            emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            emailRef.current.focus()
            return;
        } else if (message.trim() == '') {
            toast.warning("Votre message est obligatoire", {
                autoClose: 2000
            });
            messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            messageRef.current.focus()
            return;
        } else {
            setboutLoading(true)
            const formData = {
                etudeId: etudeId,
                nom: nomRef.current.value,
                prenom: prenomRef.current.value,
                tel: telRef.current.value,
                adresse: adresseRef.current.value,
                email: emailRef.current.value,
                message: messageRef.current.value,
            };

            axios.post(`https://speedreal.abahs-jobconnect.com/etude/createPostulation`, formData)
                .then(response => {
                    console.log("Réponse du serveur :", response.data);
                    toast.success("Votre demande de etude a été soumise avec succès !");
                    setNom("")
                    setPrenom("")
                    setTel("")
                    setAdresse("")
                    setEmail("")
                    setMessage("")
                    handleOpen()
                    setboutLoading(false)
                })
                .catch(error => {
                    // Gérer l'erreur ici
                    console.error("Erreur lors de l'envoi de la demande de etude :", error);
                    if (error.response && error.response.data) {
                        toast.error(error.response.data);
                        setboutLoading(false)
                    } else {
                        toast.error("Une erreur est survenue lors de l'envoi de la demande de etude. Veuillez réessayer.");
                        setboutLoading(false)
                    }
                });

        };
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);


    const [mobile, SetMobile] = useState(window.innerWidth < 653)
    useEffect(() => {

        const HundleSize = () => {
            SetMobile(window.innerWidth < 653)
        }
        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, [])


    return (
        <div className='p-2'>
            {loadings && <SpinnerDemarage />}
            <Link to='/universite'>return</Link>
            <div className='flex  bg-gray-50 rounded'>
                <div className='w-full  sm:p-3 p-1 rounded-xl h-max  m-2'>
                    <div className='sm:text-[20px] text-[12px]'>
                        Avec une date limite d'inscription fixée au {new Date(etudeDetails.fin).toLocaleDateString()},
                        ces etudes offrent aux étudiants intéressés une
                        occasion unique de poursuivre leurs études dans {etudeDetails.pays}
                        <br /><br />
                        Si vous êtes intéressé par les <a href='#'>{etudeDetails.domaine}</a> et vous pouvez lire les <a href='#avantages'>avantages</a> et <a href='#Critere'>les critères d'éligiblité </a> pour obtenir
                        un diplôme de baccalauréat en Allemagne, il est vivement recommandé de soumettre
                        votre candidature avant la date limite spécifiée afin de profiter de cette opportunité
                        exceptionnelle.
                    </div>
                    <div className='text-orange-600 font-bold text-3xl'>{etudeDetails.titre}</div>
                    <div className='mt-2 text-lg'>
                        <div className="w-14 h-14">
                            {etudeDetails.drapeux && (<img src={`https://flagcdn.com/w40/${etudeDetails.drapeux.toLowerCase()}.png`} alt="Drapeau" className="w-full md:max-w-[122px]" />)}
                        </div>
                        <div className='max-sm:text-[15px]'>Pays: {etudeDetails.pays}</div>
                        <div className='max-sm:text-[15px]'>Domaine: {etudeDetails.domaine}</div>
                        <div className='max-sm:text-[15px]'>Niveau: {etudeDetails.niveau}</div>
                        <div className='max-sm:text-[15px]'>Inscription: <span className='font-bold'>du {new Date(etudeDetails.createdAt).toLocaleDateString()} au {new Date(etudeDetails.fin).toLocaleDateString()}</span></div>
                    </div>

                    <div className='text-[15px] sm:text-[17px] mt-5'>
                        <div id='avantages' className='sm:text-[20px] text-[#ca3232] text-[15px] font-bold'>Avantage</div>
                        <div className='pl-2'>
                            {etudeDetails.savantages && etudeDetails.savantages.map((avantage, index) => (
                                <div key={index} className="flex flex-col items-start justify-between">
                                    {index + 1}. {avantage.av}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='text-[15px] sm:text-[17px] mt-4'>
                        <div id="Critere" className='sm:text-[20px] text-[#ca3232] text-[15px] font-bold'>Critere d'eligibilite</div>
                        <div className='pl-2'>
                            {etudeDetails.seligibres && etudeDetails.seligibres.map((critere, index) => (
                                <div key={index} className="flex flex-col items-start justify-between">
                                    {index + 1}. {critere.crit}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='mt-10 max-sm:text-center'>
                        Si vous êtes intéressé, inscrivez-vous ci-dessous.
                    </div>

                    <form className="w-full mx-auto rounded-md p-1 sm:p-4 bg-white mt-4" onSubmit={handleSubmit}>
                        <div className={`flex ${mobile ? 'flex-col pr-1' : ''} w-full`}>
                            <div className="mb-4 w-full mx-1">
                                <label htmlFor="nom" className="block tracking-wide text-lg mb-2">
                                    Nom :
                                </label>
                                <input
                                    ref={nomRef}
                                    id="nom"
                                    type="text"
                                    placeholder="Nom"
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    className={`block w-full bg-transparent outline-none  border-gray-400 focus:border focus:border-orange-500 border border-red rounded py-2 px-2 sm:py-3 sm:px-4 mb-3  `}
                                />
                            </div>
                            <div className="mb-4 w-full mx-1">
                                <label htmlFor="prenom" className="block tracking-wide text-lg mb-2">
                                    Prénom :
                                </label>
                                <input
                                    ref={prenomRef}
                                    id="prenom"
                                    type="text"
                                    placeholder="Prénom"
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                    className={`block w-full bg-transparent outline-none  border-gray-400 focus:border focus:border-orange-500 border border-red rounded py-2 px-2 sm:py-3 sm:px-4 mb-3  `}
                                />
                            </div>
                            <div className="mb-4 w-full mx-1">
                                <label htmlFor="tel" className="block tracking-wide text-lg mb-2">
                                    Téléphone :
                                </label>
                                <input
                                    ref={telRef}
                                    id="tel"
                                    type="tel"
                                    placeholder="Téléphone"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                    className={`block w-full bg-transparent outline-none  border-gray-400 focus:border focus:border-orange-500 border border-red rounded py-2 px-2 sm:py-3 sm:px-4 mb-3  `}


                                />
                            </div>
                        </div>
                        <div className="mb-4 w-full mx-1">
                            <label htmlFor="adresse" className="block tracking-wide text-lg mb-2">
                                Adresse :
                            </label>
                            <textarea
                                ref={adresseRef}
                                id="adresse"
                                placeholder="Adresse"
                                value={adresse}
                                onChange={(e) => setAdresse(e.target.value)}
                                className="block w-full bg-transparent min-h-[5em] sm:min-h-[10em] border-gray-400  resize-y outline-none focus:border focus:border-orange-500 border border-red rounded py-3 px-4 mb-3"
                            ></textarea>
                        </div>
                        <div className="mb-4 w-full mx-1">
                            <label className="block tracking-wide text-lg mb-2">
                                Email :
                            </label>
                            <input
                                ref={emailRef}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`block w-full bg-transparent outline-none  border-gray-400 focus:border focus:border-orange-500 border border-red rounded py-2 px-2 sm:py-3 sm:px-4 mb-3  `}


                            />
                        </div>
                        <div className="mb-4 w-full mx-1">
                            <label htmlFor="message" className="block tracking-wide text-lg mb-2">
                                Message :
                            </label>
                            <textarea
                                ref={messageRef}
                                id="message"
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="block w-full bg-transparent min-h-[5em] sm:min-h-[10em] resize-y border-gray-400  outline-none focus:border focus:border-orange-500 border border-red rounded py-3 px-4 mb-3"
                            ></textarea>
                        </div>
                        <div className=" flex justify-end  w-full">

                            {boutLoading ? (
                                <>
                                    <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-orange-950    p-2 rounded  text-gray-400">
                                        <input type="submit" id="send" value='Postuler' className='pointer-events-none' />
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
                                    <input type="submit" id="send" value='Postuler' className='cursor-pointer'></input>
                                    <i class="bi bi-send ml-2 "></i>
                                </label>
                            </>)}
                        </div>

                        <div className='mt-5  w-full'>
                            <div onClick={handleOpen} className='animate-pulse text-orange-700 font-extrabold cursor-pointer flex items-center w-max py-2 px-3 hover:bg-gray-50 rounded' >
                                <div> Demmande d'aide</div>
                                <div className='animate-ping'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation" viewBox="0 0 16 16">
                                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
                                    </svg>
                                </div>
                            </div>

                            <Modal size="lg" open={open} onClose={handleClose}>
                                <Modal.Header>
                                    <Modal.Title>Information intéressant</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    AHABS est une entreprise renommée dans la ville de Bujumbura, avec une expertise reconnue
                                    dans notre domaine d'activité. Vous pouvez vous rendre à notre bureau situé au numéro 24
                                    du Maire de la Ville pour obtenir
                                    davantage d'informations, poser des questions ou bénéficier d'une assistance personnalisée.
                                    <br />
                                    <br />
                                    Nous sommes impatients de vous offrir une expérience exceptionnelle et de répondre à
                                    tous vos besoins. N'hésitez pas à contacter notre équipe compétente et dévouée à AHABS pour
                                    obtenir l'assistance dont vous avez besoin.
                                    <br />
                                    <br />
                                    Encore une fois, bienvenue chez AHABS et merci d'avoir choisi notre plateforme. Nous sommes ravis de vous accompagner dans votre parcours.
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={handleClose} appearance="subtle">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleClose} appearance="primary">
                                        Ok
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </form>
                    <Adresse />
                </div>
            </div>
        </div>
    )
}

export default UniversiteVisiteurDeatil