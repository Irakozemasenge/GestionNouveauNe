/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useRef, useState } from 'react'
import Contact from '../HomeVisitor/Contact'
import Remerciement from '../HomeVisitor/Remerciement'
import ScrollReveal from 'scrollreveal'
import axios from 'axios';

function DemandServer() {

    const Demande = useRef(null);
    const WhatsApp = useRef(null);
    const Email = useRef(null);
    const Addresse = useRef(null);


    useEffect(() => {
        ScrollReveal().reveal(Demande.current, {
            duration: 1000,
            origin: 'top',
            distance: '30%',
            delay: 20,
            easing: 'ease',
            reset: true
        });




        ScrollReveal().reveal(WhatsApp.current, {
            duration: 1000,
            origin: 'top',
            distance: '90%',
            delay: 60,
            easing: 'ease',
            reset: true
        });
        ScrollReveal().reveal(Email.current, {
            duration: 1000,
            origin: 'left',
            distance: '120%',
            delay: 80,
            easing: 'ease',
            reset: true
        });
        ScrollReveal().reveal(Addresse.current, {
            duration: 1000,
            origin: 'bottom',
            distance: '150%',
            delay: 100,
            easing: 'ease',
            reset: true
        });
    }, []);
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get('http://localhost:8005/coord')
            .then(response => {
                setData(response.data);

            })
            .catch(error => {
                console.error("Erreur lors de la récupération des coordonnées: ", error);

            });
    }, []);


    const [mobile1, Setmobile1] = useState(window.innerWidth < 777);
    const [mobile2, Setmobile2] = useState(window.innerWidth < 584);
    useEffect(() => {
        const hundleSize = () => {
            Setmobile1(window.innerWidth < 777)
            Setmobile2(window.innerWidth < 584)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])



    return (
        <div className='relative'>
            <div className='relative h-[35vh] overflow-hidden'>
                <img src='images/contact-us.png' className='w-full object-cover object-bottom' alt='   ' />
                <div className='absolute flex flex-col w-full items-center top-12 left-2'>
                    <div ref={Demande} className={`${mobile1 ? 'text-[27px]' : 'text-[60px]'} stroketext1`}>Demande maintenant</div>
                </div>
            </div>

            <div className={`mt-5 p-4  text-[#5dca32] ${mobile1 ? 'text-[20px]' : 'text-[25px]'} `}>
                Prenez contact et exprimez vos besoins
            </div>

            <div className={`w-full flex ${mobile2 ? 'flex-col gap-2' : ''} justify-around`}>
                <a ref={WhatsApp} href={`whatsapp://send?phone=${data.tel}`} className='flex hover:no-underline focus:no-underline'>
                    <div className={`bg-green-100   rounded-full flex justify-center bi text-[#5dca32] items-center ${mobile2 ? ' w-[3em] my-2 h-[3em]' : ' p-3 w-[4em] h-[4em]'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                        </svg>
                    </div>
                    <div className=' ml-1'>
                        <div className='text-gray-400 flex hover:no-underline focus:no-underline'>WhatsApp</div>
                        <div className='mt-2 text-[#5dca32] flex hover:no-underline focus:no-underline'>{data.tel}</div>
                    </div>
                </a>
                <a ref={Email} target='_blank' href={`mailto:${data.email}`} className='flex hover:no-underline focus:no-underline'>
                    <div className={`bg-green-100 rounded-full flex justify-center items-center ${mobile2 ? ' w-[3em] my-2 h-[3em]' : ' p-3 w-[4em] h-[4em]'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi text-[#5dca32] bi-telephone-fill" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                        </svg>
                    </div>
                    <div className=' ml-1'>
                        <div className='text-gray-400 flex hover:no-underline focus:no-underline'>Email</div>
                        <div className='mt-2 text-[#5dca32] flex hover:no-underline focus:no-underline'>{data.email}</div>
                    </div>
                </a>
                <div ref={Addresse} className='flex hover:no-underline focus:no-underline'>
                    <div className={`bg-green-100 p-3  rounded-full flex justify-center items-center ${mobile2 ? ' w-[3em] my-2 h-[3em]' : ' p-3 w-[4em] h-[4em]'} `}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi text-[#5dca32] bi-telephone-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                        </svg>
                    </div>
                    <div className=' ml-1'>
                        <div className='text-gray-400 flex hover:no-underline focus:no-underline'>Addresse</div>
                        <div className='mt-2 text-[#5dca32] flex hover:no-underline focus:no-underline'>{data.address}</div>
                    </div>
                </div>
            </div>

            <Contact />
            <Remerciement />
        </div >
    )
}

export default DemandServer