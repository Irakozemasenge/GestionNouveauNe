/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import NavBarsTravail from './NavBarsTravail'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../Visiteurs/Footer/Footer'
import axios from 'axios';
import { decryptData } from "../../../encryptionModule"
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
function AdminTravailJobsDetail() {
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

    const handleEdit = () => {
        const updatedData = {
            pays: travailDetails.pays,
            drapeux: travailDetails.drapeux,
        };
        navigate(`/travail/modifier/${id}`, { state: updatedData });

    };

    const handleEditavantages = (avantageId, newAvantage) => {
        Swal.fire({
            title: 'Modifier l\'avantage',
            input: 'textarea',
            inputValue: newAvantage,
            showCancelButton: true,
            confirmButtonText: 'Enregistrer',
            cancelButtonText: 'Annuler',
            inputValidator: (value) => {
                if (!value) {
                    return 'Veuillez saisir un avantage';
                }
            }
        }).then((updatedAvantage) => {
            if (updatedAvantage.isConfirmed) {
                // Appel de la fonction de mise à jour de l'avantage
                // newAvantage contient la nouvelle valeur de l'avantage
                axios.put(`https://speedreal.abahs-jobconnect.com/travail/updateTavantage/${avantageId}`, { av: updatedAvantage.value })
                    .then(() => {
                        // Mettre à jour les détails de la travail après la modification
                        axios.get(`https://speedreal.abahs-jobconnect.com/travail/getTravailWithTavantage/${travailId}`)
                            .then((response) => {
                                settravailDetails(response.data);
                                toast.success('L\'avantage a été modifié avec succès.');
                            })
                            .catch((error) => {
                                console.error('Erreur lors de la récupération des détails de la travail :', error);
                                toast.error('Une erreur est survenue lors de la récupération des détails de la travail.');
                            });
                    })
                    .catch((error) => {
                        console.error('Erreur lors de la modification de l\'avantage :', error.message);
                        toast.error('Une erreur est survenue lors de la modification de l\'avantage.');
                    });
            }
        }).catch((error) => {
            console.error('Erreur lors de la modification de l\'avantage :', error.message);
            toast.error('Une erreur est survenue lors de la modification de l\'avantage.');
        });
    };
    const handleDeleteAvantage = (avantageId) => {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas récupérer cet avantage!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://speedreal.abahs-jobconnect.com/travail/deleteTavantage/${avantageId}`)
                    .then(() => {
                        toast.success("L'avantage a été supprimé avec succès.");
                        // Mettre à jour les détails de la travail après suppression
                        axios.get(`https://speedreal.abahs-jobconnect.com/travail/getTravailWithTavantage/${travailId}`)
                            .then(response => {
                                settravailDetails(response.data);
                            })
                            .catch(error => {
                                console.error('Erreur lors de la récupération des détails de la travail après suppression :', error.message);
                                toast.error("Une erreur est survenue lors de la récupération des détails de la travail après suppression.");
                            });
                    })
                    .catch(error => {
                        console.error('Erreur lors de la suppression de l\'avantage :', error.message);
                        toast.error("Une erreur est survenue lors de la suppression de l'avantage.");
                    });
            }
        });
    };
    const handleDisable = async () => {
        try {
            await axios.put(`https://speedreal.abahs-jobconnect.com/travail/updateTravailStatus/${travailId}`, { status: 2 });
            toast.success("Le travail a été désactivé avec succès.");
            navigate("/travail")
        } catch (error) {
            console.error('Erreur lors de la désactivation du travail :', error);
            toast.error("Une erreur est survenue lors de la désactivation du travail.");
        }
    };

    const [mobile1, SetMobile1] = useState(window.innerWidth < 540)
    const [mobile11, SetMobile11] = useState(window.innerWidth < 688)

    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 540)
            SetMobile11(window.innerWidth < 688)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className='w-full'>
            {loadings && <SpinnerDemarage />}
            <NavBarsTravail />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`w-full flex flex-wrap overflow-hidden ${mobile1 ? 'min-h-[85vh]' : 'min-h-[80vh]'}`}>
                    <div className='w-full g sm:p-3 p-0.5 rounded-xl h-max sm:m-2'>
                        <div className={`text-orange-600 font-bold ${mobile1 ? 'text-xl' : 'text-3xl'}`}>{travailDetails.titre}</div>
                        <div className={`mt-2 ${mobile1 ? 'text-sm' : 'text-lg'}`}>

                            <div className="w-14 h-14">
                                {travailDetails.drapeux && (<img src={`https://flagcdn.com/w40/${travailDetails.drapeux.toLowerCase()}.png`} alt="Drapeau" className="w-full md:max-w-[122px]" />)}
                            </div>
                            <div className='font-medium'>Pays: {travailDetails.pays}</div>
                        </div>

                        <div className="flex mt-4">
                            <Link to="/travail" className={`bg-blue-500 mr-0.5 hover:no-underline focus:no-underline hover:text-white focus:text-white hover:bg-blue-700 text-white font-bold py-2  rounded   mb-2  transition duration-300 ease-in-out ${mobile1 ? 'text-[10px] px-1' : 'px-4'} `}>Retourner</Link>
                            <button onClick={handleEdit} className={`bg-green-500 mx-0.5 hover:no-underline focus:no-underline hover:text-white focus:text-white hover:bg-green-700 text-white font-bold py-2  rounded   mb-2  transition duration-300 ease-in-out ${mobile1 ? 'text-[10px] px-1' : 'px-4'} `}>Modifier</button>
                            <button onClick={handleDisable} className={`bg-yellow-500 mr-0.5 hover:no-underline focus:no-underline hover:text-white focus:text-white hover:bg-yellow-700 text-white font-bold py-2  rounded   mb-2  transition duration-300 ease-in-out ${mobile1 ? 'text-[10px] px-1' : 'px-4'} `}>Desactiver</button>
                            <Link to={`/travail/ajoutavantages/${id}`} className={`bg-red-500 mx-0.5 hover:no-underline focus:no-underline hover:text-white focus:text-white hover:bg-red-700 text-white font-bold py-2  rounded   mb-2  transition duration-300 ease-in-out ${mobile1 ? 'text-[10px] px-1' : 'px-4'} `}>Ajouter Avantage</Link>
                        </div>

                        <div className="text-base mt-4">
                            <div className="text-xl font-bold">Avantages</div>
                            <ul className="mt-4">
                                {travailDetails.tavantages && travailDetails.tavantages.map((avantage, index) => (
                                    <li key={index} className="flex flex-col md:flex-row items-start md:items-center justify-between py-2 border-b border-gray-200">
                                        <span className="flex-1">{index + 1}. {avantage.av}</span>
                                        <div className="flex mt-2 md:mt-0 space-x-2">
                                            <button onClick={() => handleEditavantages(avantage.id, avantage.av)} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 ${mobile1 ? 'text-[10px] px-1' : 'px-4'} rounded border border-blue-700`}>Modifier</button>
                                            <button onClick={() => handleDeleteAvantage(avantage.id)} className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 ${mobile1 ? 'text-[10px] px-1' : 'px-4'} rounded border border-red-700`}>Supprimer</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
                <Footer />

            </div>
        </div>

    )
}

export default AdminTravailJobsDetail
