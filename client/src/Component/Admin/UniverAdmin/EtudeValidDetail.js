/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import NavBarsEtude from './NavBarsEtude'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../Visiteurs/Footer/Footer'
import axios from 'axios'
import { decryptData } from '../../../encryptionModule'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage'
function EtudeValidDetail() {
    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    const [loadings, Setloadings] = useState(true);
    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 688)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    const navigate = useNavigate()

    const [postulation, setPostulationDetails] = useState({});
    const { id } = useParams()
    const postuleId = decryptData(id)
    useEffect(() => {
        const fetchBourseDetails = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/etude/getPostulationWithRelations/${postuleId}`);
                setPostulationDetails(response.data);
                Setloadings(false)

            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la bourse :', error);
                Setloadings(false)
            }
        };


        fetchBourseDetails();
    }, [id]);

    const handleDeletePostulation = async () => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas récupérer cette postulation!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://speedreal.abahs-jobconnect.com/etude/deletePostulation/${postuleId}`);
                toast.success('La postulation a été supprimée.');
                navigate("/etude/valid")
            } catch (error) {
                console.error('Erreur lors de la suppression de la postulation :', error);
                toast.error('Une erreur est survenue lors de la suppression de la postulation.');
            }
        }
    };
    return (
        <div className='w-full'>
            <NavBarsEtude />
            {loadings && <SpinnerDemarage />}
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`w-full  overflow-hidden ${mobile1 ? 'min-h-[85vh]' : 'min-h-[80vh]'}`}>
                    <div className='flex '>
                        <div className='w-full g p-3  rounded-xl h-max  m-2'>
                            <div className='text-orange-600 font-bold text-[18px] sm:text-[25px]'>{postulation.bourse && postulation.bourse.titre}</div>
                            <div className='mt-2 text-[20px]'>
                                <div className="w-14 h-14">
                                    {postulation.bourse && postulation.bourse.drapeux && (<img src={`https://flagcdn.com/w40/${postulation.bourse.drapeux.toLowerCase()}.png`} alt="Drapeau" className="w-full md:max-w-[122px]" />)}
                                </div>
                                <div className="font-medium max-sm:text-[12px]">Pays: {postulation.bourse && postulation.bourse.pays}</div>
                                <div className="font-medium max-sm:text-[12px]">Domaine: {postulation.bourse && postulation.bourse.domaine}</div>
                                <div className="font-medium max-sm:text-[12px]">Niveau: {postulation.bourse && postulation.bourse.niveau}</div>
                                <div className="font-medium max-sm:text-[12px]">
                                    Inscription: <div className="font-bold">du {postulation.bourse && new Date(postulation.bourse.createdAt).toLocaleDateString()} au {postulation.bourse && new Date(postulation.bourse.fin).toLocaleDateString()}</div>
                                </div>
                                <div className="font-medium max-sm:text-[12px]">Status: <span className="font-bold">{postulation.status === 1 ? 'En attente' : 'Autre statut'}</span></div>
                                <div className='font-medium max-sm:text-[12px]'>Client:
                                    <div className='font-bold max-sm:text-[12px]'> -{postulation.nom} {postulation.prenom}</div>
                                    <div className='font-bold max-sm:text-[12px]'> -Tel:  {postulation.tel}</div>
                                    <div className='font-bold max-sm:text-[12px]'> -Email: {postulation.email}</div>
                                </div>
                                <div className='font-medium max-sm:text-[12px]'>Date de commande:<span className='font-bold'>le {new Date(postulation.createdAt).toLocaleDateString()}</span></div>
                            </div>
                            <div className='text-gray-400 text-[17px]'>
                                {postulation.message}
                            </div>
                            <div className='text-[15px] sm:text-[17px]'>
                                <div className='text-[20px]'>Avantages</div>
                                <ul className='list-none'>

                                    {postulation.bourse && postulation.bourse.bavantages && postulation.bourse.bavantages.map((data, index) => (
                                        <li key={index} className='list-hyphen'>-{data.av}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className='text-[15px] sm:text-[17px]'>
                                <div className='text-[20px]'>Critere d'eligibilite</div>
                                <ul className='list-none'>
                                    {postulation.bourse && postulation.bourse.beligibres && postulation.bourse.beligibres.map((data, index) => (
                                        <li key={index} className='list-hyphen'>-{data.crit}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className='flex mt-4'>
                                <Link to='/etude/valid' className='w-max mx-1 px-2 block hover:text-white focus:text-white text-center cursor-pointer py-1.5 mt-1 bg-fuchsia-600 text-white rounded'>
                                    Retourner
                                </Link>
                                <button className='w-max mx-1 px-2 block hover:text-white focus:text-white text-center cursor-pointer py-1.5 mt-1 bg-red-400 hover:bg-red-600 transition-all duration-500 text-white rounded' onClick={handleDeletePostulation}>
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </div>

    )
}

export default EtudeValidDetail
