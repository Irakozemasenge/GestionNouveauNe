import React, { useState, useEffect } from 'react';
import Footer from '../../Visiteur/FootentContent/Footer';
import HoraireNavBars from './HoraireNavBars';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { encryptData } from '../../../encryptionModule';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';

function Horaire() {
    const [horaire, sethoraire] = useState([]);
    const [loadings, Setloadings] = useState(true)
    useEffect(() => {
        // Fonction pour récupérer les horaire depuis le backend
        const fetchhoraire = async () => {
            try {
                const response = await axios.get('http://localhost:8005/horaire');
                sethoraire(response.data);
                Setloadings(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des horaire :', error);
                Setloadings(false);
            }
        };


        fetchhoraire();
    }, []);

    function formatHeure(heure) {
        const [hh, mm, ss] = heure.split(':');
        return `${hh}h ${mm}`;
    }
    const handleDelete = (itemId) => {
        // Afficher la boîte de dialogue de confirmation
        Swal.fire({
            title: 'Êtes-vous sûr de voiloir supprimer cet enregistrement?',
            text: "Attention! : Vous ne pourrez pas annuler la suppresion après l'avoir faite!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui', cancelButtonText: 'Non'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si l'utilisateur confirme, exécuter la suppression en appelant l'API avec Axios
                axios.delete(`http://localhost:8005/horaire/${itemId}`)
                    .then((response) => {
                        toast.success('Votre horaire a été supprimé.');
                        sethoraire(horaire.filter(horaire => horaire.id !== itemId));
                    })
                    .catch((error) => {
                        // En cas d'erreur lors de la suppression, afficher un message d'erreur
                        toast.error('Une erreur s\'est produite lors de la suppression de le horaire.');
                        console.error('Erreur lors de la suppression de le horaire :', error);
                    });
            }
        });
    };



    const [mobile, GetMobile] = useState(window.innerWidth < 427)
    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)

    useEffect(() => {
        const HundleSize = () => {
            GetMobile(window.innerWidth < 427)
            SetMobile3(window.innerWidth < 342)

        }
        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, []
    )







    return (
        <div className='w-full'>
            <div className='w-full'>
                <HoraireNavBars />
                <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                    <div className='w-full pb-3 min-h-[80vh]'>
                        <div className='flex justify-center w-full items-center h-full'>
                            <div className="w-full  sm:p-4 m-3">
                                <h2 className='sm:text-[30px] text-[18px] text-[#5dca42]'>Horaire d'ouverture</h2>
                                {loadings ? (
                                    <SpinnerDemarage />
                                ) : (
                                    <div>
                                        {horaire.map((horaire, index) => (
                                            <div key={index} className={`flex items-center ${mobile ? 'flex-col my-3' : ''} `}>
                                                <p className="text-[15px] leading-[2em] my-3 font-sans">
                                                    <b>{horaire.jours}</b>: De {formatHeure(horaire.heuredebut)} à {formatHeure(horaire.heurefin)}
                                                </p>
                                                <div className='flex ml-2 items-center'>
                                                    <Link to={`/horaire/Modifier/${encryptData((horaire.id).toString())}`} className="mx-1 p-1 hover:no-underline hover:text-[#5dca32] bg-[#00800018]  cursor-pointer rounded text-[#5dca32]">Modifier</Link>
                                                    <div onClick={() => handleDelete(horaire.id)} className="mx-1 p-1 bg-[#ff00000e]  cursor-pointer rounded text-red-700">Supprimer</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Horaire;
