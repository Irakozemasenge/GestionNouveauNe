/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import NavBarsApropsAdmin from './NavBarsApropsAdmin'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
import Footer from '../../Visiteurs/Footer/Footer';

function ApropsAdminModifier() {
    const [spinnerButton, SetSpinnerButton] = useState(false)
    const [coordonne, setcoordonne] = useState({});
    const [cordonneFomrulat, setcordonneFomrulat] = useState(false);

    const [address, Setaddress] = useState('')
    const [animationClassAddress, setanimationClassAddress] = useState('');

    const [tele, Settele] = useState('')
    const [animationClassPrenom, setAnimationClassPrenom] = useState('');


    const [isEmail, SetisEmail] = useState('')
    const [animationClassEmail, setAnimationClassEmail] = useState('');
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

    const [pending, setPending] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault()
        if (address.trim() == '') {
            toast.warning("L'adress physique est obligatoire", {
                autoClose: 2000
            });
            setanimationClassAddress('animate__animated animate__shakeX placeholder-shown:border-yellow-500')
            setTimeout(() => {
                setanimationClassAddress(' ')
            }, 3000)

            return;
        } else if (tele.trim() == '') {
            toast.warning('Le téléphone est obligatoire', {
                autoClose: 2000
            });
            setAnimationClassPrenom('animate__animated animate__shakeX placeholder-shown:border-yellow-500')
            setTimeout(() => {
                setAnimationClassPrenom(' ')
            }, 3000)

            return;
        }
        else if (isEmail.trim() == '') {
            toast.warning("L'address email est obligatoire", {
                autoClose: 2000
            });
            setAnimationClassEmail('animate__animated animate__shakeX placeholder-shown:border-yellow-500')
            setTimeout(() => {
                setAnimationClassEmail(' ')
            }, 3000)

            return;
        }
        else if (!isEmail.trim().match(emailRegex)) {
            toast.error("L'address email est incorrect", {
                autoClose: 2000
            });
            setAnimationClassEmail('animate__animated animate__shakeX border-red-600 text-red-600')
            setTimeout(() => {
                setAnimationClassEmail(' ')
            }, 3000)

            return;
        }
        SetSpinnerButton(true);

        axios.post('https://irakoze.burundientempsreel.com/api/addcophysical', {
            adress: address,
            tel: tele,
            email: isEmail

        }).then((response) => {
            toast.success('adress added successfully');
        }).catch((error) => {
            toast.success(error.message);
        }).finally(() => {
            SetSpinnerButton(false);
        });;;
    }


    useEffect(() => {
        axios.get('https://irakoze.burundientempsreel.com/api/findcoordonne').then((response) => {
            setcoordonne(response.data);
            setTimeout(() => {
                setPending(false)
            }, 100)
        });
    }, [])


    return (
        <div className='w-full'>
            <NavBarsApropsAdmin />
            <div className='w-full h-[80vh]  overflow-x-hidden overflow-y-auto'>
                <div className='  flex justify-center items-center'>
                    <div className="m-3 p-2  w-full rounded-xl h-max border ">
                        <h2 className=' p-2 text-center  text-[30px] text-orange-500 animeBorder'>Modifier les coordonner physique</h2>
                        <form onSubmit={handleSubmit}>
                            <div className=" transition-all flex flex-col   p-1">
                                <div className="flex w-full justify-between flex-col my-3">
                                    <div className="rounded-lg w-full flex">
                                        <div class="w-1/2 mx-2 mb-5">
                                            <label
                                                class="block  tracking-wide  text-lg  mb-2"
                                                for="grid-Title"
                                            >
                                                L'adress physique
                                            </label>
                                            <input
                                                class={`block w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3 ${animationClassAddress} `}
                                                placeholder="L'adress physique"
                                                value={address} onInput={(e) => Setaddress(e.target.value)}

                                            />
                                        </div>
                                        <div class="w-1/2 mx-2 mb-5">
                                            <label
                                                class="block  tracking-wide  text-lg  mb-2"
                                                for="grid-Title"
                                            >
                                                Le téléphone
                                            </label>
                                            <input
                                                class={`block w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3 ${animationClassPrenom} `}
                                                placeholder="Le téléphone"
                                                value={tele} onInput={(e) => Settele(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="rounded-lg w-full">
                                        <div class="w-full mb-5">
                                            <label
                                                class="block  tracking-wide  text-lg  mb-2"
                                                for="grid-Title"
                                            >
                                                Email
                                            </label>
                                            <input
                                                class={`block w-full bg-transparent  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3 ${animationClassEmail} `}
                                                placeholder="Email"
                                                value={isEmail} onInput={(e) => SetisEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="rounded-lg w-full">
                                        <div class="w-full mb-5">
                                            <label
                                                class="block  tracking-wide  text-lg  mb-2"
                                                for="grid-Title"
                                            >
                                                Autre description
                                            </label>
                                            <textarea
                                                class={`block w-full bg-transparent min-h-[10em] resize-y  outline-none  focus:border focus:border-fuchsia-500   border border-red rounded py-3 px-4 mb-3 ${animationClassEmail} `}
                                                placeholder="Autre description"
                                                value={isEmail} onInput={(e) => SetisEmail(e.target.value)}
                                            >
                                            </textarea>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {spinnerButton ? (
                                <>
                                    <div className="flex justify-end items-center mt-4 relative pointer-events-none opacity-80">
                                        <div className='absolute bg-transparent  pt-3  w-full h-full flex justify-center items-center z-50'>
                                            <FadeLoader
                                                color="rgb(255, 255, 255)"
                                                height={10}
                                                margin={-9}
                                                radius={100}
                                                speedMultiplier={1}
                                                width={1}
                                            /></div>
                                        <input type="submit" id="send" value="Se connecter" class=" transition-all bg-gray-900 rounded  cursor-pointer px-5 py-1 text-gray-600"></input>
                                    </div>
                                </>
                            ) : (
                                <>

                                    <div className="flex justify-end items-center">
                                        <input type="submit" id="send" hidden></input>
                                        <label for="send" className="w-max  flex justify-end p-1 ">
                                            <i title="Modifier" class="bi bi-send bg-orange-600 rounded cursor-pointer px-5 py-1 text-white"></i></label>
                                    </div>

                                </>
                            )}
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ApropsAdminModifier