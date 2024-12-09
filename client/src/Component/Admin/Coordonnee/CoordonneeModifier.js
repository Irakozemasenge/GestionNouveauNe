import React, { useEffect, useRef, useState } from 'react'
import Footer from '../../Visiteur/FootentContent/Footer';
import CoordonneNavBars from './CoordonneNavBars';
import { toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Popover, Whisper } from 'rsuite';
import axios from 'axios';
import { decryptData } from '../../../encryptionModule';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';

function CoordonneeModifier() {

    const [spinnerButton, SetSpinnerButton] = useState(false)
    const { id } = useParams()
    const coordId = decryptData(id)
    const navigate = useNavigate()
    const [address, Setaddress] = useState('')

    const [animationClassAddress, setanimationClassAddress] = useState('');
    const [animationClassAddressMessage, setanimationClassAddressMessage] = useState(false);
    const elememtRefAddress = useRef(null)

    const [tele, Settele] = useState('')
    const [teleMessage, SetteleMessage] = useState(false)
    const [animationClasstel, setAnimationClassTel] = useState('');
    const elememtRefTel = useRef(null)


    const [isEmail, SetisEmail] = useState('')
    const [isEmailMessage, SetisEmailMessage] = useState(false)
    const [animationClassEmail, setAnimationClassEmail] = useState('');
    const [infoEmail, GetInfoEmail] = useState('');
    const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    const elememtRefEmail = useRef(null)


    const handleSubmit = (e) => {
        e.preventDefault()
        if (address.trim() == '') {
            setanimationClassAddress('animate__animated animate__shakeX placeholder-shown:border-yellow-500')
            setanimationClassAddressMessage(true)
            setTimeout(() => {
                setanimationClassAddress(' ')
                setanimationClassAddressMessage(false)
            }, 3000)
            elememtRefAddress.current && elememtRefAddress.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elememtRefAddress.current && elememtRefAddress.current.focus()
            return false;
        } else if (tele.trim() == '') {
            SetteleMessage(true)
            setAnimationClassTel('animate__animated animate__shakeX placeholder-shown:border-yellow-500')
            setTimeout(() => {
                setAnimationClassTel(' ')
                SetteleMessage(false)
            }, 3000)
            elememtRefTel.current && elememtRefTel.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elememtRefTel.current && elememtRefTel.current.focus()
            return false;
        }
        else if (isEmail.trim() == '') {
            SetisEmailMessage(true)
            setAnimationClassEmail('animate__animated animate__shakeX placeholder-shown:border-yellow-500')
            GetInfoEmail('Addresse email est obligatoire !!')
            setTimeout(() => {
                setAnimationClassEmail(' ')
                SetisEmailMessage(false)

            }, 3000)
            elememtRefEmail.current && elememtRefEmail.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elememtRefEmail.current && elememtRefEmail.current.focus()
            return false;
        }
        else if (!isEmail.trim().match(emailRegex)) {
            SetisEmailMessage(true)
            setAnimationClassEmail('animate__animated animate__shakeX border-red-600 text-red-600')
            GetInfoEmail('Addresse email est incorrect !!')
            setTimeout(() => {
                setAnimationClassEmail(' ')
                SetisEmailMessage(false)
            }, 3000)
            elememtRefEmail.current && elememtRefEmail.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elememtRefEmail.current && elememtRefEmail.current.focus()
            return false;
        }


        const data = {
            email: isEmail,
            tel: tele,
            address: address
        }
        SetSpinnerButton(true)

        axios.put(`http://localhost:8005/coord/modifier/${coordId}`, data)
            .then(response => {
                toast.success('Coordonnée modifiée avec succès');
                navigate("/coordonne")
                SetSpinnerButton(false)
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    toast.info(error.response.data.error);
                    SetSpinnerButton(false)
                } else {
                    toast.error('Erreur lors de la modification de la coordonnée');
                    SetSpinnerButton(false)
                }
            });
    }

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:8005/coord')
            .then(response => {
                SetisEmail(response.data.email);
                Settele(response.data.tel);
                Setaddress(response.data.address);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des coordonnées: ", error);
                setLoading(false);
            });
    }, []);

    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)

    useEffect(() => {
        const HundleSize = () => {
            SetMobile3(window.innerWidth < 342)
        }
        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, []
    )

    return (
        <div className='w-full'>
            <CoordonneNavBars />
            {loading && (
                <SpinnerDemarage />
            )
            }
            <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                <div className='w-full  min-h-[80vh]'>
                    <div className="flex items-center w-full justify-between">
                        <Link to='/coordonne' className="w-8 h-8 flex justify-center items-center text-green-500"
                        >    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                            </svg>
                        </Link>
                    </div>
                    <div className='w-full pb-3'>
                        <div className='w-full'>
                            <div className='  h-max flex justify-center items-center'>
                                <div className="m-3 p-2  w-full rounded-xl h-max border ">
                                    <h2 className=' p-2 text-center text-[20px]  sm:text-[30px] text-[#5dca32] animeBorder'>Modifier les coordonées physiques</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className=" transition-all flex flex-col mb-6  p-1">
                                            <div className="flex w-full justify-between flex-col my-3">
                                                <div className="rounded-lg w-full">
                                                    <div class="w-full mb-5">
                                                        <label
                                                            class="block  tracking-wide  text-lg  mb-2"
                                                            for="grid-Title"
                                                        >
                                                            L'adress physique
                                                        </label>
                                                        <Whisper trigger='none'
                                                            open={animationClassAddressMessage}
                                                            placement='bottomStart'
                                                            speaker={
                                                                <Popover>
                                                                    <span className='text-red-600'> L'adress physique est obligatoire !!</span>
                                                                </Popover>
                                                            }
                                                        >
                                                            <input
                                                                ref={elememtRefAddress}
                                                                class={`block w-full bg-transparent  outline-none  focus:border focus:border-[#5dca32]  border border-red rounded py-3 px-4 mb-3 ${animationClassAddress} `}
                                                                placeholder="L'adress physique"
                                                                value={address} onInput={(e) => Setaddress(e.target.value)}

                                                            />
                                                        </Whisper>
                                                    </div>
                                                </div>

                                                <div className="rounded-lg w-full">
                                                    <div class="w-full mb-5">
                                                        <label
                                                            class="block  tracking-wide  text-lg  mb-2"
                                                            for="grid-Title"
                                                        >
                                                            Le téléphone
                                                        </label>
                                                        <Whisper trigger='none'
                                                            open={teleMessage}
                                                            placement='bottomStart'
                                                            speaker={
                                                                <Popover>
                                                                    <span className='text-red-600'> Numéro de téléphone est obligatoire !!</span>
                                                                </Popover>
                                                            }
                                                        >
                                                            <input
                                                                ref={elememtRefTel}
                                                                class={`block w-full bg-transparent  outline-none  focus:border focus:border-[#5dca32]  border border-red rounded py-3 px-4 mb-3 ${animationClasstel} `}
                                                                placeholder="Le téléphone"

                                                                value={tele} onInput={(e) => Settele(e.target.value)}
                                                            />
                                                        </Whisper>
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
                                                        <Whisper trigger='none'
                                                            open={isEmailMessage}
                                                            placement='bottomStart'
                                                            speaker={
                                                                <Popover>
                                                                    <span className='text-red-600'>{infoEmail}</span>
                                                                </Popover>
                                                            }
                                                        >
                                                            <input
                                                                class={`block w-full bg-transparent  outline-none  focus:border focus:border-[#5dca32]  border border-red rounded py-3 px-4 mb-3 ${animationClassEmail} `}
                                                                placeholder="Email"
                                                                ref={elememtRefEmail}
                                                                value={isEmail} onInput={(e) => SetisEmail(e.target.value)}
                                                            />
                                                        </Whisper>
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

                                                <div className="flex justify-end w-max items-center bg-[#5dca32] text-white rounded cursor-pointer px-5 py-1">
                                                    <input type="submit" value='Modifier' id="send" ></input>
                                                </div>
                                            </>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default CoordonneeModifier
