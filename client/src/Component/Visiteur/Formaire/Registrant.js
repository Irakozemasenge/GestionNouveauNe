

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { toast } from 'react-toastify';

function Registrant() {
    const [nom_complet, setnom_complet] = useState('');
    const [animationClassNom, setAnimationClassNom] = useState('');
    const nomRef = useRef(null);


    const [email, setemail] = useState('');
    const [animationClassEmail, setAnimationClassEmail] = useState('');
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const emailRef = useRef(null);


    const [password, setpassword] = useState('');
    const [animationClassPass, setAnimationClassPass] = useState('');
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/i;
    const passRef = useRef(null);

    const [passwordConfirm, setpasswordConfirm] = useState('');
    const [animationClassConfirm, setAnimationClassConfirm] = useState('');
    const passConfirmRef = useRef(null);
    const [typeTextConfirm, GettypeTextConfirm] = useState(true)

    const [photo, setphoto] = useState(null);
    const [animationClassProfil, setanimationClassProfil] = useState('');
    const profilmRef = useRef(null);

    const navigate = useNavigate()
    const [boutLoading, setboutLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (nom_complet.trim() === '') {
            toast.warning('Le nom est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassNom('animate__animated animate__shakeX placeholder-shown:border-yellow-500');
            nomRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            nomRef.current.focus();
            return;
        }


        if (email.trim() === '') {
            toast.warning("L'adresse email est obligatoire", {
                autoClose: 2000
            });
            setAnimationClassEmail('animate__animated animate__shakeX placeholder-shown:border-yellow-500');
            emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            emailRef.current.focus();
            return;
        }

        if (!email.trim().match(emailRegex)) {
            toast.error("L'adresse email est incorrecte", {
                autoClose: 2000
            });
            setAnimationClassEmail('animate__animated animate__shakeX placeholder-shown:border-red-500');
            emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            emailRef.current.focus();
            return;
        }

        if (password.trim() === '') {
            toast.warning('Le mot de passe est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassPass('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passRef.current.focus();
            return;
        }

        if (!password.trim().match(PasswordRegex)) {
            toast.error('Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial', {
                autoClose: 2000
            });
            setAnimationClassPass('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passRef.current.focus();
            return;
        }

        if (passwordConfirm.trim() === '') {
            toast.warning('Veuillez confirmer votre mot de passe', {
                autoClose: 2000
            });
            setAnimationClassConfirm('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passConfirmRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passConfirmRef.current.focus();
            return;
        }

        if (password !== passwordConfirm) {
            toast.error('Les mots de passe ne correspondent pas', {
                autoClose: 2000
            });
            setAnimationClassConfirm('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passConfirmRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passConfirmRef.current.focus();
            return;
        }



        if (photo === null) {
            toast.warning('Veuillez sélectionner votre photo de profil', {
                autoClose: 2000
            });
            setanimationClassProfil('animate__animated animate__shakeX placeholder-shown:border-red-500');
            profilmRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setboutLoading(true)
        const formData = new FormData();
        formData.append('nom_complet', nom_complet);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('photo', photo);
        // Réinitialise les champs après la soumission réussie
        axios.post('http://localhost:8005/admin/createAccount', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log('Réponse du serveur:', response.data);
            // Afficher un toast de succès
            toast.success('Compte créé avec succès !');
            setnom_complet('');
            setemail('');
            setpassword('');
            setpasswordConfirm('');
            setphoto('');
            navigate("/")
            setboutLoading(false)
        })
            .catch(error => {
                if (error.response) {
                    // Le serveur a renvoyé une réponse avec un code d'erreur
                    console.error('Erreur de réponse du serveur:', error.response.data);
                    // Afficher un toast d'erreur avec le message renvoyé par le serveur
                    toast.error(error.response.data);
                    setboutLoading(false)

                } else if (error.request) {
                    // La requête a été faite mais aucune réponse n'a été reçue
                    console.error('Pas de réponse du serveur:', error.request);
                    // Afficher un toast d'erreur générique
                    toast.error('Une erreur est survenue lors de la communication avec le serveur.');
                    setboutLoading(false)
                } else {
                    // Une erreur s'est produite lors de la configuration de la requête
                    console.error('Erreur de configuration de la requête:', error.message);
                    // Afficher un toast d'erreur générique
                    toast.error('Une erreur est survenue.');
                    setboutLoading(false)
                }
            });
    };


    const [mobile, SetMobile] = useState(window.innerWidth < 481);

    useEffect(() => {
        const hundleSize = () => {
            SetMobile(window.innerWidth < 481)
        }
        window.addEventListener('resize', hundleSize)

        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])
    const [showEye, SetshowEye] = useState(false)
    return (
        <div className={`fixed w-full h-full z-[100] py-5 top-0 left-0 flex justify-center overflow-y-auto overflow-x-hidden bg-[white]`}>
            <div className={` bg-white  p-2 w-[35em] border shadow-2xl border-green-600 sm: max-sm:w-[95%] rounded-3xl h-max`}>
                <div className="w-full flex justify-center items-center">
                    <div className="h-[10em] w-max max-sm:h-[7em]    transition-all  relative overflow-hidden ml-3 rounded ">
                        <img draggable='false' src='http://localhost:8005/uploads/Logo/HATHA_LOGO.png' alt="" className='h-full w-full  object-contain object-center' />
                    </div>
                </div>
                <h2 className=' text-center max-sm:text-[12px] font-serif text-gray-600 '>S'inscrivez-vous</h2>
                <div className='flex justify-center w-full'>
                    <p className='text-[15px] text-gray-500 pl-3 text-center w-[16em] max-sm:text-[11px]'>Si vous n'êtes pas déjà membre, S'inscrivez-vous facilement maintenant.</p>

                </div>
                <form onSubmit={handleSubmit} className='text-black' >
                    <div className={`flex mt-4 w-full  ${mobile ? 'flex-col' : ''} `}>
                        <div className={`mb-4 ${mobile ? 'w-full' : 'w-1/2  mx-1'}`}>
                            <label className="block mb-2 text-lg" htmlFor="nom">
                                Nom Complet
                            </label>
                            <input
                                id="nom"
                                type="text"
                                placeholder="Votre nom"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-green-700 ${animationClassNom}`}
                                ref={nomRef}
                                value={nom_complet}
                                onChange={(e) => setnom_complet(e.target.value)}
                            />
                        </div>
                        <div className={`mb-4 ${mobile ? 'w-full' : 'w-1/2  mx-1'}`}>
                            <label className="block mb-2 text-lg" htmlFor="email">
                                Adresse email
                            </label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Votre adresse email"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-green-700 ${animationClassEmail}`}
                                ref={emailRef}
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                    </div>



                    <div className={`flex ${mobile ? 'flex-col' : ''} `}>
                        <div className={`mb-4 ${mobile ? 'w-full' : 'w-1/2  mx-1'}`}>
                            <label className="block mb-1 text-sm font-medium ">Mot de passe Exemple:<span className='text-gray-500'>Xxxxx@12</span> </label>
                            <div className='flex relative'>
                                <input
                                    ref={passRef}
                                    onChange={(e) => setpassword(e.target.value)}
                                    type={`${showEye ? 'text' : 'password'}`}
                                    className={`w-full  border  pr-8 outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent ${animationClassPass} border-gray-200`}
                                    placeholder="Xxxxx@12"
                                />
                                <div onClick={() => SetshowEye(!showEye)} className={`absolute cursor-pointer w-7 right-1 h-[97%] flex justify-center items-center`}>
                                    {showEye ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-eye rounded hover:bg-gray-200 transition-all p-2 " viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5  2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-eye-slash  rounded hover:bg-gray-200 transition-all p-2" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={`mb-4 ${mobile ? 'w-full' : 'w-1/2  mx-1'}`}>
                            <label className="block mb-1 text-sm font-medium ">Confirmer</label>
                            <div className='flex relative'>
                                <input
                                    onChange={(e) => setpasswordConfirm(e.target.value)}
                                    type={typeTextConfirm ? 'password' : 'text'}
                                    ref={passConfirmRef}
                                    className={`w-full  border  pr-8 outline-none ${animationClassConfirm} focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-200`}
                                    placeholder="Xxxxx@12"
                                />
                                <div onClick={() => GettypeTextConfirm(!typeTextConfirm)} className={`absolute cursor-pointer w-7 right-1 h-[97%] flex justify-center items-center`}>
                                    {showEye ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-eye rounded hover:bg-gray-200 transition-all p-2 " viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5  2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-eye-slash  rounded hover:bg-gray-200 transition-all p-2" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-green-700 ${animationClassProfil}`} htmlFor="profil">
                            Photo de profil
                        </label>
                        <input
                            id="profil"
                            type="file"
                            ref={profilmRef}
                            hidden
                            accept="image/*"
                            className="border cursor-pointer rounded p-2 w-full"
                            onChange={(e) => setphoto(e.target.files[0])}
                        />
                    </div>
                    {photo && <div className='w-[15em] h-[15em] border m-2 rounded-xl overflow-hidden border-green-600'>
                        <img src={URL.createObjectURL(photo)} className='w-full h-full ' alt=' ' />
                    </div>
                    }
                    <div className=" flex justify-end  w-full">

                        {boutLoading ? (
                            <>
                                <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-green-950    p-2 rounded  text-gray-400">
                                    <input type="submit" id="send" value='Créer' className='pointer-events-none' />
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
                            <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-green-600   p-2 rounded  text-white">
                                <input type="submit" id="send" value='Créer' className='cursor-pointer'></input>
                                <i class="bi bi-send ml-2 "></i>
                            </label>
                        </>)}
                    </div>

                </form>

                Vous avez  un compte ? <Link to='/' className='cursor-pointer hover:bg-gray-100 py-1 px-2 text-green-700'>Lessez</Link>
            </div>
        </div>
    );
}

export default Registrant;












