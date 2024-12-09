/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../Visiteurs/Footer/Footer'
import NavBarsTravail from './NavBarsTravail'
import axios from 'axios'
import { decryptData } from '../../../encryptionModule'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage'

function TravilValidDetail() {
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

    const [loadings, Setloadings] = useState(true);
    const [postulation, setPostulation] = useState({});
    const navigate = useNavigate()
    const { id } = useParams();
    const postuleId = decryptData(id)
    useEffect(() => {
        const fetchPostulation = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/travail/getPostulationWithRelations/${postuleId}`);
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
            <NavBarsTravail />
            {loadings && <SpinnerDemarage />}
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`w-full  overflow-hidden ${mobile1 ? 'min-h-[85vh]' : 'min-h-[80vh]'}`}>
                    {postulation && (
                        <div className='flex '>
                            <div className='w-full g p-3  rounded-xl h-max  m-2'>
                                <div className='text-orange-600 font-bold text-[25px]'>{postulation.travail && postulation.travail.pays}</div>
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
                                <div className='text-[15px] sm:text-[17px]'>
                                    <div className='text-[20px]'>Avantages</div>
                                    <ul className='list-none'>
                                        {postulation.travail && postulation.travail.tavantages && postulation.travail.tavantages.map((avantage, index) => (
                                            <li key={index} className='list-hyphen'>-{avantage.av}</li> // Utilisez avantage.av pour afficher l'avantage
                                        ))}
                                    </ul>
                                </div>
                                <div className=' flex mt-4'>
                                    <Link to='/travail/valid' className='w-max mx-3 px-2 block  hover:text-white focus:text-white text-center cursor-pointer py-1.5 mt-1 bg-fuchsia-600 text-white rounded'>
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

export default TravilValidDetail
