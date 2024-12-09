import React, { useEffect, useState } from 'react';
import Footer from '../../Visiteur/FootentContent/Footer';
import CoordonneNavBars from './CoordonneNavBars';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { encryptData } from '../../../encryptionModule';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';

function Coordonnee() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8005/coord')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des coordonnées: ", error);
                setLoading(false);
            });
    }, []);


    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)

    useEffect(() => {
        const hundleSize = () => {
            SetMobile3(window.innerWidth < 342)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])




    return (
        <div className='w-full'>
            <CoordonneNavBars />
            <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                <div className='w-full pb-3 min-h-[80vh]'>
                    {loading ? (
                        <SpinnerDemarage />
                    ) : (
                        <div className='w-full h-full flex justify-center items-center p-2'>
                            <div className="pl-6 w-full h-max border border-[#5dca32] rounded-2xl">
                                <div className='sm:text-[25px] text-[20px]  text-center text-[#5dca32]'>Coordonne physique</div>
                                <div className="w-full h-max">
                                    <p className='text-[18px] leading-[3em]'><b>Adresse physique</b>: {data.address}</p>
                                    <p className='text-[18px] leading-[3em]'><b>Téléphone</b>: {data.tel}</p>
                                    <p className='text-[18px] leading-[3em]'><b>Email</b>: {data.email}</p>
                                </div>

                                <div className="w-full flex rounded justify-end pb-2 pr-2">
                                    <Link to={`/coordonne/Modifier/${encryptData((data.id).toString())}`} className='p-1 bg-[#5dca32] text-white hover:no-underline hover:text-white rounded transition-all cursor-pointer w-max'> Modifier</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Coordonnee;
