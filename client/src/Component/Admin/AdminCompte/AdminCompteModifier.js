import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
import { FadeLoader } from 'react-spinners';
import { decryptData } from '../../../encryptionModule';

function AdminCompteModifier() {

    const [boutLoading, setboutLoading] = useState(false);
    const [nom_complet, setnom_complet] = useState('');
    const [animationClassNom, setAnimationClassNom] = useState('');
    const nomRef = useRef(null);


    const [email, setemail] = useState('');
    const [animationClassEmail, setAnimationClassEmail] = useState('');
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const emailRef = useRef(null);

    const [loadings, Setloadings] = useState(true);
    const navigate = useNavigate("")
    const [isProfil, setIsProfil] = useState(null);
    const [photo, setphoto] = useState(null);
    const profilmRef = useRef(null);
    const idcr = localStorage.getItem("xtoks");
    const id = decryptData(idcr)
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

        setboutLoading(true)

        const formData = new FormData();
        formData.append('nom_complet', nom_complet);
        formData.append('email', email);
        if (isProfil) {
            formData.append('photo', isProfil);
        }

        // Réinitialise les champs après la soumission réussie
        axios.put(`http://localhost:8005/admin/Updateuser/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log('Réponse du serveur:', response.data);
            // Afficher un toast de succès
            toast.success('Compte créé avec succès !');
            setnom_complet('');
            setemail('');
            setphoto('');

            navigate("/")
            window.location.reload();
            setboutLoading(false)
        })
            .catch(error => {
                setboutLoading(false)
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
    const [mobile1, Setmobile1] = useState(window.innerWidth < 1170);
    const [mobile, SetMobile] = useState(window.innerWidth < 431);

    useEffect(() => {
        const hundleSize = () => {
            Setmobile1(window.innerWidth < 1170)
            SetMobile(window.innerWidth < 431)
        }
        window.addEventListener('resize', hundleSize)

        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8005/admin/getOne/${id}`).then((rep) => {
            setnom_complet(rep.data.nom_complet)
            setemail(rep.data.email)
            setphoto(rep.data.photo)
            Setloadings(false)
        }).catch((err) => {
            console.log(err.message)
            Setloadings(false)
        })
    }, [id])
    return (
        <div className={`w-full ${mobile1 ? ' h-[92vh]' : ' h-[87vh]'} overflow-x-hidden overflow-y-auto`}>
            {loadings && <SpinnerDemarage />}

            <div className='w-full flex justify-start p-3'>
                <Link to='/'>
                    Aller à la page d'accueil
                </Link>
            </div>

            <div className={`mx-auto w-[90%]  my-3 p-3 border border-[#5dca32] rounded-xl`}>
                <h1 className="sm:text-3xl first-letter:uppercase font-bold mb-8 text-lg">Modifier le profil</h1>
                <form onSubmit={handleSubmit} className='w-full'>
                    <div className={`flex ${mobile ? 'flex-col' : ''} w-full`}>
                        <div className="mb-4 mx-1 w-full">
                            <label className="block mb-2 text-lg" htmlFor="nom">
                                Nom complet
                            </label>
                            <input
                                id="nom"
                                type="text"
                                placeholder="Votre nom"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-[#5dca32] ${animationClassNom}`}
                                ref={nomRef}
                                value={nom_complet}
                                onChange={(e) => setnom_complet(e.target.value)}
                            />
                        </div>
                        <div className="mb-4 mx-1 w-full">
                            <label className="block mb-2 text-lg" htmlFor="email">
                                Adresse email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Votre adresse email"
                                className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-[#5dca32] `}
                                ref={emailRef}
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                    </div>


                    <div className="mb-4 w-full">
                        <label className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-[#5dca32]`} htmlFor="profil">
                            Photo de profil
                        </label>
                        <input
                            id="profil"
                            type="file"
                            ref={profilmRef}
                            hidden
                            accept="image/*"
                            className="border cursor-pointer rounded p-2 w-full"
                            onChange={(e) => setIsProfil(e.target.files[0])}
                        />
                    </div>
                    <div className='sm:w-[30em] w-full h-auto sm:h-[30em] border m-2 rounded-xl overflow-hidden border-[#5dca32]'>
                        {isProfil ? <img src={URL.createObjectURL(isProfil)} className='w-full h-full ' alt=' ' /> : photo ? <img src={`http://localhost:8005/uploads/Admin/${photo}`} className='w-full h-full ' alt=' ' /> : null}
                    </div>


                    <div className=" flex justify-end  w-full">
                        <div className="flex justify-end items-center mr-2 ">
                            <Link to="/compte" for="send" className="w-max  flex justify-end p-1 ">Retourner</Link>
                        </div>
                        {boutLoading ? (
                            <>
                                <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-green-950    p-2 rounded  text-gray-400">
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
            </div>
        </div>
    );
}

export default AdminCompteModifier;
