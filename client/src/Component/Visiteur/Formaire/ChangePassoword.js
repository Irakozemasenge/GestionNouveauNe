/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FadeLoader } from 'react-spinners'
import { Modal, Popover, Whisper } from "rsuite";
import { useTheme } from "../UseContext/ThemeContext";
import { decryptData, encryptData } from "../../../encryptionModule";

function ChangePassoword({ SetisAdmin }) {

    const [boutLoading, setboutLoading] = useState(false);
    const history = useNavigate();
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const [emailValue, setEmailValue] = useState('')
    const [animationClassEmail, setAnimationClassEmail] = useState('');
    const [emailMessage, GetemailMessage] = useState(false)
    const [informationEmail, GetinformationEmail] = useState('')
    const elemetRefEmail = useRef(null)

    const [isPass, setIsPass] = useState('');
    const [isPassMessage, setIsPassMessage] = useState('');
    const [animationClassPass, setAnimationClassPass] = useState('');
    const [informationisPass, GetinformationisPass] = useState('')
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/i;
    const passRef = useRef(null);
    const [typeText, GetTypeText] = useState(true)
    const { isChangePassoword, changePassoword, setchangePassoword, setIsOtpCode } = useTheme();
    const encryptData = localStorage.getItem("emailsend")
    const email = decryptData(encryptData)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (emailValue.trim() == "") {
            GetemailMessage(true)
            setAnimationClassEmail('animate__animated animate__shakeX border border-red-500')
            GetinformationEmail('Votre email est obligatoire !!')
            setTimeout(() => {
                setAnimationClassEmail('')
                GetemailMessage(false)
                GetinformationEmail('')
            }, 4000);
            elemetRefEmail.current && elemetRefEmail.current.focus()
            return false
        } else if (isPass.trim() == "") {
            setIsPassMessage(true)
            GetinformationisPass('Votre mot de passe est obligatoire !!')
            setAnimationClassPass('animate__animated animate__shakeX placeholder-shown:border-green-700 text-green-500 border-green-700')
            setTimeout(() => {
                setAnimationClassPass(' ')
                GetinformationisPass('')
                setIsPassMessage(false)
            }, 3000)
            passRef.current.focus()

            return
        } else if (!isPass.trim().match(PasswordRegex)) {
            toast.warning(
                <div className="text-[15px]">
                    Le mot de passe doit contenir au moins:<br />
                    -une lettre minuscule<br />
                    -lettre majuscule<br />
                    -un chiffre<br />
                    - un caractère spécial<br />
                </div>
            )
            setAnimationClassPass('animate__animated animate__shakeX placeholder-shown:border-red-500 text-red-500 border-red-500')
            setTimeout(() => {
                setAnimationClassPass(' ')
                GetinformationisPass('')
                setIsPassMessage(false)
            }, 10000)
            passRef.current.focus()
            return
        } else {
            setboutLoading(true)
            axios.put('http://localhost:8005/admin/resetpassword', {
                email,
                newPassword: isPass
            })
                .then(response => {
                    setchangePassoword(false);
                    toast.success("Mot de pass change avec succes !", {
                        autoClose: 2000
                    });
                    // Réinitialiser les champs du formulaire après la connexion réussie si nécessaire
                    setEmailValue('');
                    setIsPass('');
                    SetisAdmin(true)
                    localStorage.setItem("xtoks", encryptData((response.data).toString()))
                    history("/acceuil")
                    window.location.reload();
                    setboutLoading(false)

                })
                .catch(error => {
                    // En cas d'erreur, vous pouvez afficher un message d'erreur approprié
                    if (error.response) {

                        console.error('Erreur de réponse du serveur:', error.response.data);
                        toast.error(error.response.data, {
                            autoClose: 2000
                        });
                        setboutLoading(false)
                    } else if (error.request) {
                        console.error('Pas de réponse du serveur:', error.request);
                        toast.error("Pas de réponse du serveur", {
                            autoClose: 2000
                        });
                        setboutLoading(false)
                    } else {
                        console.error('Erreur de configuration de la requête:', error.message);
                        toast.error("Erreur de configuration de la requête", {
                            autoClose: 2000
                        });
                        setboutLoading(false)
                    }
                });
        }
    };


    return (
        <>
            <Modal backdrop="static" overflow={false} open={changePassoword}>
                <Modal.Body>
                    <div className='w-full  h-full overflow-auto flex justify-center sm:py-5 '>
                        <div className={` p-2 relative overflow-hidden border shadow-2xl border-[#5dca32] w-[99%] rounded-3xl h-max`}>
                            <div className="absolute w-full z-50 flex justify-end">
                                <div onClick={() => setchangePassoword(false)} className="mr-5 mt-2 bg-green-100 p-1  rounded cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#5dca32" class="bi bi-x-circle-fill text-[#5dca32]" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-full  flex justify-center items-center">
                                <div className="h-[10em] w-max max-sm:h-[7em] bg-white  transition-all  relative overflow-hidden ml-3 rounded ">
                                    <img draggable='false' src='http://localhost:8005/uploads/Logo/HATHA_LOGO.png' alt="" className='h-full w-full  object-contain object-center' />
                                </div>
                            </div>
                            <h2 className=' text-center max-sm:text-[12px] font-serif text-[#5dca32] '>Se connecter</h2>
                            <div className='flex justify-center w-full'>
                                <p className='text-[15px] text-gray-500 pl-3 text-center w-[16em] max-sm:text-[11px]'>Si vous êtes déjà membre, connectez-vous facilement maintenant.</p>
                            </div>  <div className="p-2 my-2 rounded w-full  h-max">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex mb-6  flex-col ">
                                        <Whisper
                                            placement="bottomStart"
                                            open={emailMessage}
                                            speaker={<Popover>
                                                <div className='text-red-700'>
                                                    {informationEmail}
                                                </div>
                                            </Popover>}
                                        >
                                            <div className="mb-4 mx-1 w-full">


                                                <label className="block mb-2 text-lg ">
                                                    Nouvelle mot de passe
                                                </label>
                                                <input

                                                    placeholder="Nuvellee  mot de passe"
                                                    className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-green-700 ${animationClassEmail}`}
                                                    ref={elemetRefEmail}
                                                    onChange={(e) => setEmailValue(e.target.value)}
                                                />
                                            </div>
                                        </Whisper>
                                        <Whisper
                                            placement="auto"
                                            open={isPassMessage}
                                            speaker={<Popover>
                                                <span className='text-red-700 m-0'>
                                                    {informationisPass}
                                                </span>
                                            </Popover>
                                            }
                                        >
                                            <div className={`mb-4 w-full`}>
                                                <label className="block mb-1 text-sm font-medium ">Confirmre mot de passe<span className='text-gray-500'>Xxxxx@12</span> </label>
                                                <div className='flex relative'>
                                                    <input
                                                        ref={passRef}
                                                        onChange={(e) => setIsPass(e.target.value)}
                                                        type={`${typeText ? 'text' : 'password'}`}
                                                        className={`w-full  border  pr-8 outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent ${animationClassPass} border-gray-200`}
                                                        placeholder="Xxxxx@12"
                                                    />
                                                    <div onClick={() => GetTypeText(!typeText)} className={`absolute cursor-pointer w-7 right-1 h-[97%] flex justify-center items-center`}>
                                                        {typeText ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-eye rounded hover:bg-gray-200  text-black transition-all p-2 " viewBox="0 0 16 16">
                                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                <path d="M8 5.5a2.5  2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-eye-slash  rounded hover:bg-gray-200 text-black  transition-all p-2" viewBox="0 0 16 16">
                                                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                                                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Whisper>
                                    </div>
                                    <div className=" flex justify-end  w-full">

                                        {boutLoading ? (
                                            <>
                                                <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-green-950    p-2 rounded  text-gray-400">
                                                    <input type="submit" id="send" value='Se connecter' className='pointer-events-none' />
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
                                                <input type="submit" id="send" value="Se connecter" className='cursor-pointer'></input>
                                                <i class="bi bi-send ml-2 "></i>
                                            </label>
                                        </>)}
                                    </div>
                                    <div className="cursor-pointer" onClick={() => { setIsOtpCode(true); setchangePassoword(false) }}>
                                        Retour
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ChangePassoword;



