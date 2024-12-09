import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Popover, Whisper } from 'rsuite';
import Swal from 'sweetalert2';
import { decryptData } from '../../../encryptionModule';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
function DetaillMessage() {
    const { id } = useParams()
    const messageId = decryptData(id)

    const [data, setData] = useState()
    const navigate = useNavigate()
    const [loadings, Setloadings] = useState(true)
    useEffect(() => {
        axios.get(`http://localhost:8005/demande/${messageId}`)
            .then((response) => {
                setData(response.data)
                Setloadings(false)
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du message :', error);
                Setloadings(false)
            });
    }, [messageId, setData])
    const handleDelete = () => {
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
                axios.delete(`http://localhost:8005/demande/${messageId}`)
                    .then((response) => {
                        toast.success('Votre message a été supprimé.');
                        navigate("/message")
                    })
                    .catch((error) => {
                        // En cas d'erreur lors de la suppression, afficher un message d'erreur
                        toast.error('Une erreur s\'est produite lors de la suppression de le message.');
                        console.error('Erreur lors de la suppression du message :', error);
                    });
            }
        });
    };

    const formatDate = date => {
        return format(new Date(date), "'Le 'd, MMMM yyyy", { locale: fr });
    };
    return (
        <div className='w-full'>
            {loadings && <SpinnerDemarage />}
            <div className='w-full overflow-y-auto overflow-x-hidden h-[87vh]'>
                <div className="flex items-center w-full justify-between">
                    <Link to='/message' className="w-8 h-8 flex justify-center items-center text-green-500"
                    >    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                        </svg>
                    </Link>
                </div>
                <div className="w-[95%]  rounded-md mx-4 my-6  pl-3 h-max ">
                    <div className=' py-1 my-1'><span>Nom du client</span>: <span className=' font-semibold ml-2'>{data && data.nomcomplet}</span></div>
                    <div className=' py-1 my-1'><span>Watsapp</span>: <span className=' font-semibold ml-2'>{data && data.tel}</span></div>
                    <div className=' py-1 my-1'><span>Email</span>: <span className=' font-semibold ml-2'>{data && data.email}</span></div>
                    <div className=' py-1 my-1'><span>Catégorie de demande</span>: <span className=' font-semibold ml-2 whitespace-break-spaces'>{data && data.categoei}</span></div>
                    <div className=' py-1 my-1'><span>{data && data.description}</span></div>
                    <div className=' py-1 my-1'><span>Date d'enregistrement</span>: <span className=' font-semibold ml-2'>{data && formatDate(data.createdAt)}</span></div>
                </div>
                <div className='flex  pl-3'>
                    <Whisper
                        trigger='click'
                        placement='auto'
                        speaker={
                            <Popover>
                                <div>
                                    <div className='text-[15px] font-bold mb-2'>Repondrez via:</div>
                                    <div>
                                        <a target='_blank' href={`whatsapp://send?phone=${data && data.tel}`} rel='noreferrer' className='flex hover:no-underline focus:no-underline  mb-2 items-center'>
                                            <div className='mr-1 text-[#5DCA32]'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className='text-[16px]'>Watsapp</div>
                                            </div>
                                        </a>
                                        <a target='_blank' className='flex hover:no-underline focus:no-underline items-center' rel='noreferrer' href={`mailto:${data && data.email}`}>
                                            <div className='mr-1  my-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className='text-[16px]' >Mail</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </Popover>
                        }
                    >
                        <div className='py-1 px-2 bg-green-50 text-[#5dca32] hover:bg-green-200 transition-all cursor-pointer rounded m-1 w-max'>Repondre</div>
                    </Whisper>
                    <div
                        onClick={() => handleDelete()}
                        className='py-1 px-2  text-red-600 cursor-pointer bg-red-100 hover:bg-red-300 rounded m-1 w-max'>Supprimer</div>
                </div>
            </div>
        </div>
    );
}

export default DetaillMessage;

