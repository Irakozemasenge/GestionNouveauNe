/* eslint-Delete eqeqeq */
import React, { useEffect, useState } from 'react'
import NavBarsVisaAdmin from './NavBarsVisaAdmin'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../Visiteurs/Footer/Footer'
import axios from 'axios';
import { decryptData } from "../../../encryptionModule"
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
function VisaAdminDeatil() {
    const navigate = useNavigate();
    const [visaDetails, setvisaDetails] = useState({});
    const { id } = useParams()
    const visaId = decryptData(id)
    const [loadings, Setloadings] = useState(true);
    useEffect(() => {
        const fetchvisaDetails = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/visa/getOneById/${visaId}`);
                setvisaDetails(response.data);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la visa :', error);
                Setloadings(false)
            }
        };
        fetchvisaDetails();
    }, [id]);

    const handleEdit = () => {
        const updatedData = {
            pays: visaDetails.pays,
            drapeaux: visaDetails.drapeaux,
            categorie: visaDetails.categorie,
        };
        navigate(`/visa/modifier/${id}`, { state: updatedData });

    };



    const handleDelete = async () => {
        // Afficher la boîte de dialogue de confirmation
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Effectuer la suppression si l'utilisateur confirme
                    await axios.delete(`https://speedreal.abahs-jobconnect.com/visa/deletevisa/${visaId}`);
                    toast.success("Le visa a été supprimé avec succès.");
                    navigate("/visa");
                } catch (error) {
                    console.error('Erreur lors de la suppression du visa :', error);
                    toast.error("Une erreur est survenue lors de la suppression du visa.");
                }
            }
        });
    };

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
            <NavBarsVisaAdmin />
            {loadings && <SpinnerDemarage />}
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`w-full  overflow-hidden ${mobile1 ? 'min-h-[85vh]' : 'min-h-[80vh]'}`}>
                    <div className='flex flex-wrap'>
                        <div className='w-full g p-3 rounded-xl h-max m-2'>
                            <div className='text-orange-600 font-bold text-3xl'>{visaDetails.titre}</div>
                            <div className='mt-2 text-lg'>
                                <div className="w-14 h-14">
                                    {visaDetails.drapeaux && (<img src={`https://flagcdn.com/w40/${visaDetails.drapeaux.toLowerCase()}.png`} alt="Drapeau" className="w-full md:max-w-[122px]" />)}
                                </div>
                                <div className='font-medium'>Pays: {visaDetails.pays}</div>
                                <div className='font-medium'>Categorie du visa: {visaDetails.categorie}</div>
                            </div>
                            <div className="flex flex-col md:flex-row mt-4">
                                <Link to="/visa" className="bg-blue-500 hover:bg-yellow-700 text-center text-white font-bold py-2 px-4 rounded mr-0 md:mr-3 mb-2 md:mb-0 transition duration-300 ease-in-out">Retourner</Link>
                                <button onClick={handleEdit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-0 md:mr-3 mb-2 md:mb-0 transition duration-300 ease-in-out">Modifier</button>
                                <button onClick={handleDelete} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-0 md:mr-3 mb-2 md:mb-0 transition duration-300 ease-in-out">Supprimer</button>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default VisaAdminDeatil
