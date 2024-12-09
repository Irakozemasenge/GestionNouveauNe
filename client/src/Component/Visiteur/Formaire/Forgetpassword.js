/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FadeLoader } from 'react-spinners'
import { Modal, Popover, Whisper } from "rsuite";
import { useTheme } from "../UseContext/ThemeContext";
import { encryptData } from "../../../encryptionModule";

function Forgetpassword() {
    const [boutLoading, setboutLoading] = useState(false);
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const [emailValue, setEmailValue] = useState('')
    const [animationClassEmail, setAnimationClassEmail] = useState('');
    const [emailMessage, GetemailMessage] = useState(false)
    const [informationEmail, GetinformationEmail] = useState('')
    const elemetRefEmail = useRef(null)

    const { setForgetPass, forgetPass, SetIsLogin, setIsOtpCode } = useTheme();
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
        } else if (!emailValue.trim().match(emailRegex)) {
            GetemailMessage(true)
            setAnimationClassEmail('animate__animated animate__shakeX border border-red-500')
            GetinformationEmail('Votre email du client est incorrecte !!')
            setTimeout(() => {
                setAnimationClassEmail('')
                GetemailMessage(false)
                GetinformationEmail('')
            }, 4000);
            elemetRefEmail.current && elemetRefEmail.current.focus()
            return false

        } else {
            setboutLoading(true)

            axios.post('http://localhost:8005/admin/sendforgot', {
                email: emailValue,
            })
                .then(response => {
                    localStorage.setItem("sendforgot", encryptData((response.data.code).toString()))
                    localStorage.setItem("emailsend", encryptData(response.data.email))

                    SetIsLogin(false);
                    toast.success("Votre code OTP a été envoyé à votre adresse e-mail!", {
                        autoClose: 2000
                    });
                    setIsOtpCode(true)
                    setForgetPass(false)
                    // Réinitialiser les champs du formulaire après la connexion réussie si nécessaire
                    setEmailValue('');
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

            <Modal backdrop="static" overflow={false} open={forgetPass}>
                <Modal.Body>
                    <div className='w-full  h-full overflow-auto flex justify-center sm:py-5 '>
                        <div className={` p-2 relative overflow-hidden border shadow-2xl border-[#5dca32] w-[99%] rounded-3xl h-max`}>
                            <div className="absolute w-full z-50 flex justify-end">
                                <div onClick={() => setForgetPass(false)} className="mr-5 mt-2 bg-green-100 p-1  rounded cursor-pointer">
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
                            <h2 className=' text-center max-sm:text-[12px] font-serif text-[#5dca32] '>Votre email</h2>
                            <div className='flex justify-center w-full'>
                                <p className='text-[15px] text-gray-500 pl-3 text-center w-max max-sm:text-[11px]'>Complétez votre email là où le code de réinitialisation de votre mot de passe doit être envoyé.</p>
                            </div>  <div className="p-2 my-2 rounded w-full  h-max">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex mb-6  flex-col ">
                                        <Whisper
                                            placement="bottomStart"
                                            open={emailMessage}
                                            speaker={
                                                <Popover>
                                                    <div className='text-red-700'>
                                                        {informationEmail}
                                                    </div>
                                                </Popover>
                                            }
                                        >
                                            <div className="mb-4 mx-1 w-full">


                                                <label className="block mb-2 text-lg ">
                                                    Adresse email
                                                </label>
                                                <input

                                                    placeholder="Votre adresse email"
                                                    className={`border rounded p-2 w-full  bg-transparent outline-none focus:border focus:border-green-700 ${animationClassEmail}`}
                                                    ref={elemetRefEmail}
                                                    onChange={(e) => setEmailValue(e.target.value)}
                                                />
                                            </div>
                                        </Whisper>
                                    </div>
                                    <div className=" flex justify-end  w-full">

                                        {boutLoading ? (
                                            <>
                                                <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-green-950    p-2 rounded  text-gray-400">
                                                    <input type="submit" id="send" value='Envoyer' className='pointer-events-none' />
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
                                                <input type="submit" id="send" value="Envoyer" className='cursor-pointer'></input>
                                                <i class="bi bi-send ml-2 "></i>
                                            </label>
                                        </>)}
                                    </div>
                                    <div className="cursor-pointer" onClick={() => { SetIsLogin(true); setForgetPass(false) }}>
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

export default Forgetpassword;



