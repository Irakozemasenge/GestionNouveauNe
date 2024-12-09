import React, { useEffect, useRef, useState } from 'react'
import Remerciement from '../HomeVisitor/Remerciement'
import { useTheme } from '../UseContext/ThemeContext';
import ScrollReveal from 'scrollreveal'
import axios from 'axios';
function Service() {

    const [services, setservices] = useState([]);
    const fetchservices = async () => {
        axios.get("http://localhost:8005/service/AllforClients")
            .then(response => {
                setservices(response.data);

            })
            .catch(error => {
                console.error("Error fetching services:", error.message);
            });
    };
    useEffect(() => {
        fetchservices();
    }, []);

    const { dataServiceHomme } = useTheme();
    const [dataServciClicked, GetDataService] = useState(services[0]);

    useEffect(() => {
        if (dataServiceHomme) {
            GetDataService(dataServiceHomme);
            localStorage.setItem('data', JSON.stringify(dataServiceHomme));
        }
    }, [dataServiceHomme]);

    const updateDataService = (newValue) => {
        GetDataService(newValue);
        localStorage.setItem('data', JSON.stringify(newValue));
    };


    useEffect(() => {
        const savedDataServiceClicked = localStorage.getItem('data');
        if (savedDataServiceClicked) {
            GetDataService(JSON.parse(savedDataServiceClicked));
        }
    }, []);


    const rapide = useRef(null);
    const efficace = useRef(null);
    const sécurisé = useRef(null);
    const transparent = useRef(null);
    const expérimenté = useRef(null);
    const service = useRef(null);

    useEffect(() => {
        ScrollReveal().reveal(service.current, {
            duration: 1000,
            origin: 'top',
            distance: '30%',
            delay: 20,
            easing: 'ease',
            reset: true
        });

        ScrollReveal().reveal(rapide.current, {
            duration: 1000,
            origin: 'bottom',
            distance: '30%',
            delay: 20,
            easing: 'ease',
            reset: true
        });

        ScrollReveal().reveal(efficace.current, {
            duration: 1000,
            origin: 'bottom',
            distance: '60%',
            delay: 40,
            easing: 'ease',
            reset: true
        });
        ScrollReveal().reveal(sécurisé.current, {
            duration: 1000,
            origin: 'bottom',
            distance: '90%',
            delay: 60,
            easing: 'ease',
            reset: true
        });
        ScrollReveal().reveal(transparent.current, {
            duration: 1000,
            origin: 'bottom',
            distance: '120%',
            delay: 80,
            easing: 'ease',
            reset: true
        });
        ScrollReveal().reveal(expérimenté.current, {
            duration: 1000,
            origin: 'bottom',
            distance: '150%',
            delay: 100,
            easing: 'ease',
            reset: true
        });
    }, []);

    const [mobile, GetMobile] = useState(window.innerWidth < 1164)
    const [mobile1, GetMobile1] = useState(window.innerWidth < 564)
    const [mobile2, GetMobile2] = useState(window.innerWidth < 458)
    const [mobile3, GetMobile3] = useState(window.innerWidth < 398)

    useEffect(() => {
        const HundleSize = () => {
            GetMobile(window.innerWidth < 1164)
            GetMobile1(window.innerWidth < 564)
            GetMobile2(window.innerWidth < 458)
            GetMobile3(window.innerWidth < 398)
        }
        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, [])


    return (
        <div id='scroll'>
            <div className='relative'>
                <div className={`relative  overflow-hidden ${mobile2 ? 'h-[33vh]' : mobile1 ? 'h-[40vh]' : 'h-[35vh]'} `}>
                    <img src='../images/service.webp' className='w-full h-full object-cover' alt='   ' />
                    <div className={`absolute flex flex-col w-full items-center  ${mobile ? 'top-4' : 'top-10'} left-2`}>
                        <div ref={service} className={`stroketext1 ${mobile2 ? 'text-[30px]' : 'text-[60px]'} `}>Nos services sont</div>
                        <div className={`w-full  flex flex-wrap justify-around  ${mobile2 ? 'text-[20px] stroketext1 ' : 'text-[30px]'}`}>
                            <div ref={rapide} className={`stroketext12 text-nowrap ${mobile2 ? 'text-[20px] stroketext1 ' : 'text-[30px]'}`}>Plus rapides</div>
                            <div ref={efficace} className={`stroketext12 text-nowrap ${mobile2 ? 'text-[20px] stroketext1 ' : 'text-[30px]'}`}>Plus efficaces</div>
                            <div ref={sécurisé} className={`stroketext12 text-nowrap ${mobile2 ? 'text-[20px] stroketext1 ' : 'text-[30px]'}`}>Plus sécurisés</div>
                            <div ref={transparent} className={`stroketext12 text-nowrap ${mobile2 ? 'text-[20px] stroketext1 ' : 'text-[30px]'} `}>Plus transparents</div>
                            <div ref={expérimenté} className={`stroketext12 text-nowrap ${mobile2 ? 'text-[20px] stroketext1 ' : 'text-[30px]'} `}>Plus expérimentés </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10 p-2'>
                <div className='w-full  mb-4 text-gray-300 text-[13px] sm:text-[15px]'>
                    Parcourez notre service plus très intéressante à vous
                </div>
                <div>
                    <div className='w-full p-2'>
                        <div className="mb-2  text-green-500 text-[18px] sm:text-[30px]">{dataServciClicked && dataServciClicked.nom && dataServciClicked.nom}</div>
                        <div>
                        </div>
                    </div>
                    <div className='sm:ml-5'>
                        <div className='text-[#5dca32] text-[20px] sm:text-[23px]'>Voir autre service</div>
                        <div>
                            {services.map((data, index) => (
                                dataServciClicked && dataServciClicked.nom === data.nom ?

                                    <button disabled key={index} className='flex    text-[#5dca32]   transition-all  my-5 text-[18px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={mobile3 ? '16' : '25'} height={mobile3 ? '16' : '25'} fill="currentColor" class="bi bi-eye-fill mr-4" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                        </svg>
                                        <div key={index} className={`${mobile3 ? 'text-[15px]' : ''} text-nowrap text-ellipsis overflow-hidden`}>{data.nom}</div>
                                    </button>
                                    :
                                    <a onClick={() => updateDataService(data)} key={index} href='#scroll' className='flex cursor-pointer hover:border-l-4 hover:text-gray-400 border-[#5dca32] transition-all  my-5 text-[18px]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={mobile3 ? '16' : '25'} height={mobile3 ? '16' : '25'} fill="currentColor" class="bi bi-arrow-right mr-4" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                        </svg>
                                        <div className={`${mobile3 ? 'text-[15px]' : ''} text-nowrap text-ellipsis overflow-hidden`} key={index}>{data.nom}</div>
                                    </a>
                            ))}
                        </div>
                    </div>
                    <Remerciement />
                </div>
            </div>
        </div >
    )
}

export default Service