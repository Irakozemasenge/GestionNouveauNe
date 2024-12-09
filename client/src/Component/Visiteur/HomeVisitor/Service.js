import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../UseContext/ThemeContext';
import axios from 'axios';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';


const ServicesList = () => {
    const { setDataServiceHomme } = useTheme();
    const [services, setservices] = useState([]);
    const [loadings, Setloadings] = useState(true)
    const fetchservices = async () => {
        axios.get("http://localhost:8005/service/All")
            .then(response => {
                setservices(response.data.services);
                Setloadings(false)
            })
            .catch(error => {
                console.error("Error fetching services:", error);
                Setloadings(false)
            });
    };
    useEffect(() => {
        fetchservices();
    }, []);

    const [mobile, GetMobile] = useState(window.innerWidth < 1292)
    const [mobile1, GetMobile1] = useState(window.innerWidth < 835)

    useEffect(() => {
        const HundleSize = () => {
            GetMobile(window.innerWidth < 1292)
            GetMobile1(window.innerWidth < 835)
        }

        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, [])

    return (
        <div className="sm:p-6 p-2 mt-2 sm:mt-10 rounded-lg">
            {loadings && <SpinnerDemarage />}
            <h2 className="sm:text-2xl text-lg font-bold mb-4">Services Offerts</h2>
            <div className={`sm:ml-6 ${mobile1 ? 'flex flex-col' : 'grid grid-cols-5 gap-5'}`}>
                {services.map((data, index) => (
                    index < 5 && <div key={index} className={`w-full  border-green-500  ${mobile1 ? `mb-5 border-b` : `${index === 4 ? null : 'border-r-2'}`} `}>
                        <div className={`mb-2   ${mobile ? 'text-[18px] ' : 'text-[25px] text-wrap overflow-hidden'}`}>{data.nom}</div>
                        <div>
                            <Link to='/demandServer' onClick={() => setDataServiceHomme(data)} href='#scroll' className='flex hover:text-green-700 font-bold text-[15px] sm:text-[20px]  hover:leading-loose transition-all hover:no-underline focus:no-underline mt-2 text-green-600 items-center'>
                                <span className={`${mobile ? 'text-[]' : ''}`} >Contactez-nous</span>
                                <span className='ml-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </div>
                ))}
                <Link to='/service' className='flex hover:text-green-700 font-bold text-[15px] sm:text-[20px]  hover:leading-loose transition-all hover:no-underline focus:no-underline mt-2 text-green-600 items-center'>
                    <span className={`${mobile ? 'text-[]' : ''}`} >Voir plus</span>
                    <span className='ml-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default ServicesList;
