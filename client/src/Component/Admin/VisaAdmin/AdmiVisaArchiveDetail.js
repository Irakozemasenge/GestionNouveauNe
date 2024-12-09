/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../Visiteurs/Footer/Footer'
import NavBarsVisaAdmin from './NavBarsVisaAdmin'
import axios from 'axios'
import { decryptData } from '../../../encryptionModule'
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage'


function AdmiVisaArchiveDetail() {
    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 688)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    const [postulation, setPostulation] = useState({});
    const navigate = useNavigate()
    const { id } = useParams();
    const postuleId = decryptData(id)
    const [loadings, Setloadings] = useState(true);
    useEffect(() => {
        const fetchPostulation = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/visa/getPostulationWithRelations/${postuleId}`);
                setPostulation(response.data);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération de la postulation avec ses relations :', error);
                Setloadings(false)
            }
        };
        fetchPostulation();
    }, [id]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className='w-full'>
            <NavBarsVisaAdmin />
            {loadings && <SpinnerDemarage />}
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`w-full  overflow-hidden ${mobile1 ? 'min-h-[85vh]' : 'min-h-[80vh]'}`}>
                    {postulation && (
                        <div className='flex '>
                            <div className='w-full g p-3  rounded-xl h-max  m-2'>
                                <div className="font-bold text-lg">
                                    <span className="text-orange-600">
                                        {postulation.visa && postulation.visa.categorie}
                                    </span>
                                    <span className="text-gray-600"> en </span>
                                    <span className="text-blue-600">
                                        {postulation.visa && postulation.visa.pays}
                                    </span>
                                </div>
                                <div className='mt-2'>
                                    <div className='font-medium'>Nom complet:<span className='font-bold'> {postulation.nom} {postulation.prenom}</span> </div>
                                    <div className='font-medium'>Tel:<span className='font-bold'> {postulation.tel}</span> </div>
                                    <div className='font-medium'>Adresse:<span className='font-bold'> {postulation.adresse}</span> </div>
                                    <div className='font-medium'>Email:<span className='font-bold'> {postulation.email}</span> </div>
                                    <div className='font-medium'>Message:<span className='font-bold'> {postulation.message}</span> </div>
                                    <div className='font-medium'>Date de commande:<span className='font-bold'> {formatDate(postulation.createdAt)}</span></div>
                                    <div className='font-medium'>
                                        Status:
                                        <span className={`font-bold ${postulation.status === 1 ? 'text-blue-600 cursor-none' : 'text-green-600'}`}>
                                            {postulation.status === 1 ? 'En attente' : 'Valide'}
                                        </span>
                                    </div>

                                </div>
                                <div className=' flex mt-4'>
                                    <Link to='/visa/archive' className='w-max mx-3 px-2 block  hover:text-white focus:text-white text-center cursor-pointer py-1.5 mt-1 bg-fuchsia-600 text-white rounded'>
                                        Retourner
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AdmiVisaArchiveDetail