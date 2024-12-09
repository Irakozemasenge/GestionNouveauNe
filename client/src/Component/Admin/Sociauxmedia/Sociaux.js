/* eslint-disable react/jsx-no-target-blank */

import React, { useEffect, useState } from 'react';
import Footer from '../../Visiteur/FootentContent/Footer';
import { Link } from 'react-router-dom';
import SociauxmediaNavBars from './SociauxmediaNavBars';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { encryptData } from '../../../encryptionModule';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';


function Sociaux() {
    const [socialMediaList, setSocialMediaList] = useState([]);
    const [loadings, Setloadings] = useState(true)

    useEffect(() => {
        const fetchSocialMedia = async () => {
            try {
                const response = await axios.get('http://localhost:8005/socialmedia');
                setSocialMediaList(response.data);
                Setloadings(false)
            } catch (error) {
                Setloadings(false)
                console.error('Erreur lors de la récupération des réseaux sociaux:', error);
                //toast.error('Erreur lors de la récupération des réseaux sociaux');
            }
        };
        fetchSocialMedia();
    }, []);
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
                axios.delete(`http://localhost:8005/socialmedia/supprimer/${itemId}`)
                    .then((response) => {
                        toast.success('Votre reseau social a été supprimé.');
                        setSocialMediaList(socialMediaList.filter(reseau => reseau.id !== itemId));
                    })
                    .catch((error) => {
                        // En cas d'erreur lors de la suppression, afficher un message d'erreur
                        toast.error('Une erreur s\'est produite lors de la suppression de le reseau social.');
                        console.error('Erreur lors de la suppression de le reseau social :', error);
                    });
            }
        });
    };

    const [mobile, GetMobile] = useState(window.innerWidth < 427)
    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)

    useEffect(() => {
        const HundleSize = () => {
            GetMobile(window.innerWidth < 427)
            SetMobile3(window.innerWidth < 243)

        }
        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, []
    )


    return (
        <div className='w-full'>
            <div className='w-full'>
                <SociauxmediaNavBars />
                {loadings && <SpinnerDemarage />}
                <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                    <div className='w-full pb-3 min-h-[80vh]'>
                        <div className='flex justify-center w-full items-center h-full'>
                            <div className="w-full  sm:p-4 m-3">
                                <h2 className='sm:text-[30px] text-[20px] text-[#5dca42]'>Listes les réseaux  social</h2>
                                {socialMediaList.map((socialMedia, index) => (
                                    <div key={index} className={`flex items-center mb-4 ${mobile ? 'flex-col my-3' : ''} `}>
                                        <div>
                                            <a href={socialMedia.link} className='flex my-2 items-center' target='_blank'>
                                                <div dangerouslySetInnerHTML={{ __html: socialMedia.icon }}></div>
                                                <div className='ml-1'>
                                                    {socialMedia.nom}
                                                </div>
                                            </a>
                                        </div>
                                        <div className='flex ml-1 items-center'>
                                            <Link to={`/sociauxmedia/Modifier/${encryptData((socialMedia.id).toString())}`} className="mx-1 p-1 hover:no-underline hover:text-[#5dca32] bg-[#00800010]  cursor-pointer rounded text-[#5dca32]">Modifier</Link>
                                            <div onClick={() => handleDelete(socialMedia.id)} className="mx-1 p-1 bg-[#ff00000e]  cursor-pointer rounded text-red-700">Supprimer</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div >
        </div >
    );
}

export default Sociaux;
