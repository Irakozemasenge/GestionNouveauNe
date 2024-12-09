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
function BourseInvalidDetail() {
    const navigate = useNavigate();
    const [loadings, Setloadings] = useState(true);


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
                            })
                            .catch((error) => {
                                console.error('Erreur lors de la récupération des détails de la bourse :', error);
                                toast.error('Une erreur est survenue lors de la récupération des détails de la bourse.');
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
                            })
                            .catch(error => {
                                console.error('Erreur lors de la récupération des détails de la bourse après suppression :', error.message);
                                toast.error("Une erreur est survenue lors de la récupération des détails de la bourse après suppression.");
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
                            })
                            .catch((error) => {
                                console.error('Erreur lors de la récupération des détails de la bourse :', error);
                                toast.error('Une erreur est survenue lors de la récupération des détails de la bourse.');
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
                axios.delete(`https://speedreal.abahs-jobconnect.com/bourse/deleteBavantage/${avantageId}`)
                    .then(() => {
                        toast.success("L'avantage a été supprimé avec succès.");
                        // Mettre à jour les détails de la bourse après suppression
                        axios.get(`https://speedreal.abahs-jobconnect.com/bourse/getBourseById/${bourseId}`)
                            .then(response => {
                                setBourseDetails(response.data);
                            })
                            .catch(error => {
                                console.error('Erreur lors de la récupération des détails de la bourse après suppression :', error.message);
                                toast.error("Une erreur est survenue lors de la récupération des détails de la bourse après suppression.");
                            });
                    })
                    .catch(error => {
                        console.error('Erreur lors de la suppression de l\'avantage :', error.message);
                        toast.error("Une erreur est survenue lors de la suppression de l'avantage.");
                    });
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
            {loadings && <SpinnerDemarage />}
            <NavBarsBourse />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`w-full  overflow-hidden ${mobile1 ? 'min-h-[85vh]' : 'min-h-[80vh]'}`}>
                    <div className='flex flex-wrap'>
                        <div className='w-full g p-3 rounded-xl h-max m-2'>
                            <div className='text-orange-600 font-bold text-3xl'>{bourseDetails.titre}</div>
                            <div className='mt-2 text-lg'>
                                <div className="w-14 h-14">
                                    {bourseDetails.drapeux && (<img src={`https://flagcdn.com/w40/${bourseDetails.drapeux.toLowerCase()}.png`} alt="Drapeau" className="w-full md:max-w-[122px]" />)}
                                </div>
                                <div className='font-medium max-sm:text-[12px]'>Pays: {bourseDetails.pays}</div>
                                <div className='font-medium max-sm:text-[12px]'>Domaine: {bourseDetails.domaine}</div>
                                <div className='font-medium max-sm:text-[12px]'>Niveau: {bourseDetails.niveau}</div>
                                <div className='font-medium max-sm:text-[12px]'>Inscription: <span className='font-bold'>du {new Date(bourseDetails.createdAt).toLocaleDateString()} au {new Date(bourseDetails.fin).toLocaleDateString()}</span></div>
                            </div>


                            <div className="flex flex-col md:flex-row mt-4">
                                <Link to="/bourse/archive" className="bg-blue-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-0 md:mr-3 mb-2 md:mb-0 transition duration-300 ease-in-out">Retourner</Link>
                            </div>



                            <div className="text-base mt-4">
                                <div className="text-xl font-bold">Avantages</div>
                                <ul className="mt-4">
                                    {bourseDetails.bavantages && bourseDetails.bavantages.map((avantage, index) => (
                                        <li key={index} className="flex flex-col  items-start justify-between py-2 ">
                                            <span className="flex-1">{index + 1}. {avantage.av}</span>

                                        </li>
                                    ))}
                                </ul>
                            </div>


                            <div className='text-base mt-4'>
                                <div className='text-xl font-bold'>Critère d'éligibilité</div>
                                <ul className='list-none'>
                                    {bourseDetails.beligibres && bourseDetails.beligibres.map((critere, index) => (

                                        <li key={index} className="flex flex-col items-start  justify-between py-2  border-gray-200">
                                            <span className="flex-1">{index + 1}. {critere.crit}</span>
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

export default BourseInvalidDetail
