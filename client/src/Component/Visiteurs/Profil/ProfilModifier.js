import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProfilModifier() {
    const [isNom, setIsNom] = useState('');
    const [animationClassNom, setAnimationClassNom] = useState('');
    const nomRef = useRef(null);

    const [isPrenom, setIsPrenom] = useState('');
    const [animationClassPrenom, setAnimationClassPrenom] = useState('');
    const prenomRef = useRef(null);

    const [isEmail, setIsEmail] = useState('');
    const [animationClassEmail, setAnimationClassEmail] = useState('');
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const emailRef = useRef(null);

    const [isTel, setIsTel] = useState('');
    const [animationClassTel, setAnimationClassTel] = useState('');
    const telRef = useRef(null);

    const [isPass, setIsPass] = useState('');
    const [animationClassPass, setAnimationClassPass] = useState('');
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/i;
    const passRef = useRef(null);
    const [typeText, GetTypeText] = useState(true)

    const [isPassConfirm, setIsPassConfirm] = useState('');
    const [animationClassConfirm, setAnimationClassConfirm] = useState('');
    const passConfirmRef = useRef(null);
    const [typeTextConfirm, GettypeTextConfirm] = useState(true)

    const [radioValue, setRadioValue] = useState('');

    const [isProfil, setIsProfil] = useState('');
    const [animationClassProfil, setanimationClassProfil] = useState('');
    const profilmRef = useRef(null);

    console.log('isProfil', isProfil)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isNom.trim() === '') {
            toast.warning('Le nom est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassNom('animate__animated animate__shakeX placeholder-shown:border-yellow-500');
            nomRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            nomRef.current.focus();
            return;
        }

        if (isPrenom.trim() === '') {
            toast.warning('Le prénom est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassPrenom('animate__animated animate__shakeX placeholder-shown:border-yellow-500');
            prenomRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            prenomRef.current.focus();
            return;
        }

        if (isTel.trim() === '') {
            toast.warning('Le numéro de téléphone est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassTel('animate__animated animate__shakeX placeholder-shown:border-yellow-500');
            telRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            telRef.current.focus();
            return;
        }

        if (isEmail.trim() === '') {
            toast.warning("L'adresse email est obligatoire", {
                autoClose: 2000
            });
            setAnimationClassEmail('animate__animated animate__shakeX placeholder-shown:border-yellow-500');
            emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            emailRef.current.focus();
            return;
        }

        if (!isEmail.trim().match(emailRegex)) {
            toast.error("L'adresse email est incorrecte", {
                autoClose: 2000
            });
            setAnimationClassEmail('animate__animated animate__shakeX placeholder-shown:border-red-500');
            emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            emailRef.current.focus();
            return;
        }

        if (isPass.trim() === '') {
            toast.warning('Le mot de passe est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassPass('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passRef.current.focus();
            return;
        }

        if (!isPass.trim().match(PasswordRegex)) {
            toast.error('Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial', {
                autoClose: 2000
            });
            setAnimationClassPass('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passRef.current.focus();
            return;
        }

        if (isPassConfirm.trim() === '') {
            toast.warning('Veuillez confirmer votre mot de passe', {
                autoClose: 2000
            });
            setAnimationClassConfirm('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passConfirmRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passConfirmRef.current.focus();
            return;
        }

        if (isPass !== isPassConfirm) {
            toast.error('Les mots de passe ne correspondent pas', {
                autoClose: 2000
            });
            setAnimationClassConfirm('animate__animated animate__shakeX placeholder-shown:border-red-500');
            passConfirmRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            passConfirmRef.current.focus();
            return;
        }

        if (radioValue === '') {
            toast.warning('Veuillez sélectionner votre genre', {
                autoClose: 2000
            });
            return;
        }

        if (isProfil.trim() === '') {
            toast.warning('Veuillez sélectionner votre photo de profil', {
                autoClose: 2000
            });
            setanimationClassProfil('animate__animated animate__shakeX placeholder-shown:border-red-500');
            profilmRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Toutes les validations sont réussies, vous pouvez soumettre les données
        toast.success('Profil modifié avec succès', {
            autoClose: 2000
        });

        // Réinitialise les champs après la soumission réussie
        setIsNom('');
        setIsPrenom('');
        setIsTel('');
        setIsEmail('');
        setIsPass('');
        setIsPassConfirm('');
        setRadioValue('');
        setIsProfil('');
    };


    const [mobile, SetMobile] = useState(window.innerWidth < 431);

    useEffect(() => {
        const hundleSize = () => {
            SetMobile(window.innerWidth < 431)
        }
        window.addEventListener('resize', hundleSize)

        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className='flex justify-start  min-h-[87vh] flex-col items-center'>
            <div className='w-full flex justify-start p-3'>
                <Link to='/'>
                    Aller à la page d'accueil
                </Link>
            </div>

            <div className={`mx-auto ${mobile ? 'w-[90%]' : 'w-[30em]'}  my-3 p-3 border border-fuchsia-700 rounded-xl`}>
                <h1 className="sm:text-3xl font-bold mb-8 text-lg">Modifier le profil</h1>
                <form onSubmit={handleSubmit}>
                    <div className={`flex ${mobile ? 'flex-col' : ''} `}>
                        <div className="mb-4 mx-1">
                            <label className="block mb-2 text-lg" htmlFor="nom">
                                Nom
                            </label>
                            <input
                                id="nom"
                                type="text"
                                placeholder="Votre nom"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassNom}`}
                                ref={nomRef}
                                value={isNom}
                                onChange={(e) => setIsNom(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 mx-1">
                            <label className="block mb-2 text-lg" htmlFor="prenom">
                                Prénom
                            </label>
                            <input
                                id="prenom"
                                type="text"
                                placeholder="Votre prénom"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassPrenom}`}
                                ref={prenomRef}
                                value={isPrenom}
                                onChange={(e) => setIsPrenom(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={`flex ${mobile ? 'flex-col' : ''} `}>
                        <div className="mb-4 mx-1">
                            <label className="block mb-2 text-lg" htmlFor="tel">
                                Numéro de téléphone
                            </label>
                            <input
                                id="tel"
                                type="text"
                                placeholder="Votre numéro de téléphone"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassTel}`}
                                ref={telRef}
                                value={isTel}
                                onChange={(e) => setIsTel(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 mx-1">
                            <label className="block mb-2 text-lg" htmlFor="email">
                                Adresse email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Votre adresse email"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassEmail}`}
                                ref={emailRef}
                                value={isEmail}
                                onChange={(e) => setIsEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={`flex ${mobile ? 'flex-col' : ''} `}>
                        <div className="mb-4 mx-1">
                            <label className="block mb-2 text-lg" htmlFor="pass">
                                Mot de passe
                            </label>
                            <div className={`w-full relative  bg-transparent`}
                            >
                                <input
                                    id="pass"
                                    type={typeText ? 'password' : 'text'}
                                    placeholder="Votre mot de passe"
                                    className={`border rounded pl-2 py-2 pr-7 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassPass}`}
                                    ref={passRef}
                                    value={isPass}
                                    onChange={(e) => setIsPass(e.target.value)}
                                />
                                <div className='absolute right-0  cursor-pointer p-3 flex justify-center items-center top-2'>

                                    {!typeText &&
                                        <svg onClick={() => GetTypeText(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi absolute  cursor-pointer w-full h-full bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                    }
                                    {typeText &&
                                        <svg onClick={() => GetTypeText(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash cursor-pointer w-full h-full absolute" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                        </svg>
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="mb-4 mx-1">
                            <label className="block mb-2 text-lg" htmlFor="passConfirm">
                                Confirmer
                            </label>
                            <div className={`w-full relative  bg-transparent`}
                            >
                                <input
                                    id="pass"
                                    type={typeTextConfirm ? 'password' : 'text'}
                                    placeholder="Confirmez"
                                    className={`border rounded p-2 w-full pr-7  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassConfirm}`}
                                    ref={passConfirmRef}
                                    value={isPassConfirm}
                                    onChange={(e) => setIsPassConfirm(e.target.value)}
                                />
                                <div className='absolute right-0  p-3 flex justify-center items-center top-2'>

                                    {!typeTextConfirm &&
                                        <svg onClick={() => GettypeTextConfirm(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi absolute  cursor-pointer w-full h-full bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                    }
                                    {typeTextConfirm &&
                                        <svg onClick={() => GettypeTextConfirm(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash cursor-pointer w-full h-full absolute" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                        </svg>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-fuchsia-700 ${animationClassProfil}`} htmlFor="profil">
                            Photo de profil
                        </label>
                        <input
                            id="profil"
                            type="file"
                            ref={profilmRef}
                            hidden
                            accept="image/*"
                            className="border cursor-pointer rounded px-2 py-2 w-full"
                            onChange={(e) => setIsProfil(e.target.files[0])}
                        />
                    </div>
                    <div className='w-[15em] h-[15em] border m-2 rounded-xl overflow-hidden border-orange-600'>
                        {isProfil && <img src={URL.createObjectURL(isProfil)} className='w-full h-full ' alt=' ' />}
                    </div>

                    <div className=' flex justify-end'>
                        <div className="flex justify-end items-center mr-2 ">
                            <Link to="/Profil" for="send" className="w-max  flex justify-end p-1 ">Retourner</Link>
                        </div>
                        <button
                            type="submit"
                            className="bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        >  Modifier
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProfilModifier;
