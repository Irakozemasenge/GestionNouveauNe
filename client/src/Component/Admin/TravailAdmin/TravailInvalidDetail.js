/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import NavBarsTravail from './NavBarsTravail'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../Visiteurs/Footer/Footer'
import axios from 'axios';
import { decryptData } from "../../../encryptionModule"

import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
function TravailInvalidDetail() {
    const navigate = useNavigate();
    const [loadings, Setloadings] = useState(true);




    const [travailDetails, settravailDetails] = useState({});
    const { id } = useParams()
    const travailId = decryptData(id)
    useEffect(() => {
        const fetchtravailDetails = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/travail/getTravailWithTavantage/${travailId}`);
                settravailDetails(response.data);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la travail :', error);
                Setloadings(false)
            }
        };
        fetchtravailDetails();
    }, [id]);

    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    const [mobile, SetMobile] = useState(window.innerWidth < 448)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 634)
    const [mobile3, SetMobile3] = useState(window.innerWidth < 850)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 688)
            SetMobile(window.innerWidth < 448)
            SetMobile2(window.innerWidth < 634)
            SetMobile3(window.innerWidth < 850)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])


    return (
        <div className='w-full'>
            <NavBarsTravail />
            {loadings && <SpinnerDemarage />}
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`w-full  overflow-hidden ${mobile1 ? 'min-h-[85vh]' : 'min-h-[80vh]'}`}>
                    <div className='flex flex-wrap'>
                        <div className='w-full g p-3 rounded-xl h-max m-2'>
                            <div className='text-orange-600 font-bold text-3xl'>{travailDetails.titre}</div>
                            <div className='mt-2 text-lg'>
                                <div className="w-14 h-14">
                                    {travailDetails.drapeux && (<img src={`https://flagcdn.com/w40/${travailDetails.drapeux.toLowerCase()}.png`} alt="Drapeau" className="w-full md:max-w-[122px]" />)}
                                </div>
                                <div className='font-medium'>Pays: {travailDetails.pays}</div>
                            </div>
                            <div className="flex flex-col md:flex-row mt-4">
                                <Link to="/travail/archive" className="bg-blue-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-0 md:mr-3 mb-2 md:mb-0 transition duration-300 ease-in-out">Retourner</Link>
                            </div>



                            <div className="text-base mt-4">
                                <div className="text-xl font-bold">Avantages</div>
                                <ul className="mt-4">
                                    {travailDetails.tavantages && travailDetails.tavantages.map((avantage, index) => (
                                        <li key={index} className="flex flex-col md:flex-row items-start md:items-center justify-between py-2 ">
                                            <span className="flex-1">{index + 1}. {avantage.av}</span>

                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default TravailInvalidDetail
