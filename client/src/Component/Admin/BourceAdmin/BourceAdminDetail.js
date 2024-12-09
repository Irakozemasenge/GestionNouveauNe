/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import NavBarsBourse from './NavBarsBourse'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../../Visiteurs/Footer/Footer'
import axios from 'axios';
import { decryptData } from "../../../encryptionModule"
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
function BourceAdminDetail() {
    const [loadings, Setloadings] = useState(true);
    const navigate = useNavigate();
    const [mobile1, SetMobile1] = useState(window.innerWidth < 540)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 688)

    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 540)
            SetMobile2(window.innerWidth < 688)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])



    const [bourseDetails, setBourseDetails] = useState({});
    const { id } = useParams()
    const bourseId = decryptData(id)
    useEffect(() => {
        const fetchBourseDetails = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/bourse/getBourseById/${bourseId}`);
                setBourseDetails(response.data);
                Setloadings(false)

            } catch (error) {
                console.error('Erreur lors de la récupération des détails de la bourse :', error);
                Setloadings(false)
            }
        };


        fetchBourseDetails();
    }, [id]);

    const handleEdit = () => {
        const updatedData = {
            pays: bourseDetails.pays,
            titre: bourseDetails.titre,
            domaine: bourseDetails.domaine,
            niveau: bourseDetails.niveau,
            fin: bourseDetails.fin,
            drapeux: bourseDetails.drapeux,
        };
        navigate(`/bourse/modifier/${id}`, { state: updatedData });
    };

    const handleEditCritere = (avantageId, newAvantage) => {
        Swal.fire({
            title: 'Modifier le critère d\'éligibilité',
            input: 'textarea',
            inputValue: newAvantage,
            showCancelButton: true,
            confirmButtonText: 'Enregistrer',
            cancelButtonText: 'Annuler',
            inputValidator: (value) => {
                if (!value.trim()) {
                    return 'Veuillez saisir un critère d\'éligibilité';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`https://speedreal.abahs-jobconnect.com/bourse/updateBeligibre/${avantageId}`, { crit: result.value })
                    .then(() => {
                        // Mettre à jour les détails de la bourse après la modification
                        axios.get(`https://speedreal.abahs-jobconnect.com/bourse/getBourseById/${bourseId}`)
                            .then((response) => {
                                setBourseDetails(response.data);
                                toast.success('Le critère d\'éligibilité a été modifié avec succès.');
                                Setloadings(false)
                            })
                            .catch((error) => {
                                console.error('Erreur lors de la récupération des détails de la bourse :', error);
                                toast.error('Une erreur est survenue lors de la récupération des détails de la bourse.');
                                Setloadings(false)
                            });
                    })
                    .catch((error) => {
                        console.error('Erreur lors de la modification du critère d\'éligibilité :', error.message);
                        toast.error('Une erreur est survenue lors de la modification du critère d\'éligibilité.');
                    });
            }
        }).catch((error) => {
            console.error('Erreur lors de la modification du critère d\'éligibilité :', error.message);
            toast.error('Une erreur est survenue lors de la modification du critère d\'éligibilité.');
        });
    };

    const handleDeleteCritere = (avantageId) => {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas récupérer ce critère d'éligibilité!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://speedreal.abahs-jobconnect.com/bourse/deleteBeligibre/${avantageId}`)
                    .then(() => {
                        toast.success("Le critère d'éligibilité a été supprimé avec succès.");
                        // Mettre à jour les détails de la bourse après suppression
                        axios.get(`https://speedreal.abahs-jobconnect.com/bourse/getBourseById/${bourseId}`)
                            .then(response => {
                                setBourseDetails(response.data);
                                Setloadings(false)
                            })
                            .catch(error => {
                                console.error('Erreur lors de la récupération des détails de la bourse après suppression :', error.message);
                                toast.error("Une erreur est survenue lors de la récupération des détails de la bourse après suppression.");
                                Setloadings(false)
                            });
                    })
                    .catch(error => {
                        console.error('Erreur lors de la suppression du critère d\'éligibilité :', error.message);
                        toast.error("Une erreur est survenue lors de la suppression du critère d'éligibilité.");
                    });
            }
        });
    };






    const handleEditAvantage = (avantageId, newAvantage) => {
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
                axios.put(`https://speedreal.abahs-jobconnect.com/bourse/updateBavantage/${avantageId}`, { av: updatedAvantage.value })
                    .then(() => {
                        // Mettre à jour les détails de la bourse après la modification
                        axios.get(`https://speedreal.abahs-jobconnect.com/bourse/getBourseById/${bourseId}`)
                            .then((response) => {
                                setBourseDetails(response.data);
                                toast.success('L\'avantage a été modifié avec succès.');
                                Setloadings(false)
                            })
                            .catch((error) => {
                                console.error('Erreur lors de la récupération des détails de la bourse :', error);
                                toast.error('Une erreur est survenue lors de la récupération des détails de la bourse.');
                                Setloadings(false)
                            });
                    })
                    .catch((error) => {
                        console.error('Erreur lors de la modification de l\'avantage :', error.message);
                        toast.error('Une erreur est survenue lors de la modification de l\'avantage.');
                        Setloadings(false)
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
            background: '#00ff00',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://speedreal.abahs-jobconnect.com/bourse/deleteBavantage/${avantageId}`)
                    .then(() => {
                        toast.success("L'avantage a été supprimé avec succès.");
                        // Mettre à jour les détails de la bourse après suppression
                        axios.get(`https://speedreal.abahs-jobconnect.com/bourse/getBourseById/${bourseId}`)
                            .then(response => {
                                setBourseDetails(response.data);
                                Setloadings(false)
                            })
                            .catch(error => {
                                console.error('Erreur lors de la récupération des détails de la bourse après suppression :', error.message);
                                toast.error("Une erreur est survenue lors de la récupération des détails de la bourse après suppression.");
                                Setloadings(false)
                            });
                    })
                    .catch(error => {
                        console.error('Erreur lors de la suppression de l\'avantage :', error.message);
                        toast.error("Une erreur est survenue lors de la suppression de l'avantage.");
                    });
            }
        });
    };
    return (
        <div className='w-full'>
            {loadings && <SpinnerDemarage />}
            <NavBarsBourse />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile2 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`w-full  overflow-hidden ${mobile2 ? 'min-h-[85vh]' : 'min-h-[80vh]'}`}>
                    <div className='flex flex-wrap'>
                        <div className='w-full  p-1 rounded-xl h-max m-1'>
                            <div className={`text-orange-600 font-bold ${mobile1 ? 'text-xl' : 'text-3xl'}`}>{bourseDetails.titre}</div>
                            <div className={`mt-2 ${mobile1 ? 'text-sm' : 'text-lg'}`}>
                                <div className="w-10 h-10">
                                    {bourseDetails.drapeux && (<img src={`https://flagcdn.com/w40/${bourseDetails.drapeux.toLowerCase()}.png`} alt="Drapeau" className="w-full h-full object-contain" />)}
                                </div>
                                <div className='font-medium'>Pays: {bourseDetails.pays}</div>
                                <div className='font-medium'>Domaine: {bourseDetails.domaine}</div>
                                <div className='font-medium'>Niveau: {bourseDetails.niveau}</div>
                                <div className='font-medium'>Inscription: <span className='font-bold'>du {new Date(bourseDetails.createdAt).toLocaleDateString()} au {new Date(bourseDetails.fin).toLocaleDateString()}</span></div>
                            </div>
                            <div className="flex mt-4">
                                <Link to="/bourse" className={`bg-blue-500 mr-0.5 hover:no-underline focus:no-underline hover:text-white focus:text-white hover:bg-blue-700 text-white font-bold py-2  rounded   mb-2  transition duration-300 ease-in-out ${mobile1 ? 'text-[10px] px-1' : 'px-4'} `}>Retourner</Link>
                                <button onClick={handleEdit} className={`bg-green-500 mx-0.5 hover:no-underline focus:no-underline hover:text-white focus:text-white hover:bg-green-700 text-white font-bold py-2  rounded   mb-2  transition duration-300 ease-in-out ${mobile1 ? 'text-[10px] px-1' : 'px-4'} `}>Modifier</button>
                                <Link to={`/bourse/ajoutcritere/${id}`} className={`bg-yellow-500 mx-0.5 hover:no-underline focus:no-underline hover:text-white focus:text-white hover:bg-yellow-700 text-white font-bold py-2  rounded   mb-2  transition duration-300 ease-in-out ${mobile1 ? 'text-[10px] px-1' : 'px-4'} `}>Ajouter critere</Link>
                                <Link to={`/bourse/ajoutavantage/${id}`} className={`bg-red-500 mx-0.5 hover:no-underline focus:no-underline hover:text-white focus:text-white hover:bg-red-700 text-white font-bold py-2  rounded   mb-2  transition duration-300 ease-in-out ${mobile1 ? 'text-[10px] px-1' : 'px-4'} `}>Ajouter Avantage</Link>
                            </div>
                            <div className="text-base mt-4">
                                <div className="text-xl font-bold">Avantages</div>
                                <ul className="mt-4">
                                    {bourseDetails.bavantages && bourseDetails.bavantages.map((avantage, index) => (
                                        <li key={index} className="flex flex-col md:flex-row items-start md:items-center justify-between py-2 border-b border-gray-200">
                                            <span className="flex-1">{index + 1}. {avantage.av}</span>
                                            <div className="flex mt-2 md:mt-0 space-x-2">
                                                <button onClick={() => handleEditAvantage(avantage.id, avantage.av)} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 ${mobile1 ? 'text-[10px] px-1' : 'px-4'} rounded border border-blue-700`}>Modifier</button>
                                                <button onClick={() => handleDeleteAvantage(avantage.id)} className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 ${mobile1 ? 'text-[10px] px-1' : 'px-4'} rounded border border-red-700`}>Supprimer</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>


                            <div className='text-base mt-4'>
                                <div className='text-xl font-bold'>Critère d'éligibilité</div>
                                <ul className='list-none'>

                                    {bourseDetails.beligibres && bourseDetails.beligibres.map((critere, index) => (
                                        <li key={index} className="flex flex-col md:flex-row items-start md:items-center justify-between py-2 border-b border-gray-200">
                                            <span className="flex-1">{index + 1}. {critere.crit}</span>

                                            <div className="flex mt-2 md:mt-0 space-x-2">
                                                <button onClick={() => handleEditAvantage(critere.id, critere.crit)} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 ${mobile1 ? 'text-[10px] px-1' : 'px-4'} rounded border border-blue-700`}>Modifier</button>
                                                <button onClick={() => handleDeleteAvantage(critere.id)} className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 ${mobile1 ? 'text-[10px] px-1' : 'px-4'} rounded border border-red-700`}>Supprimer</button>
                                            </div>
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

export default BourceAdminDetail
