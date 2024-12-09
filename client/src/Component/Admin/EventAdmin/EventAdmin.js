/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import NavBarsEvemet from './NavBarsEvemet'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import Footer from '../../Visiteurs/Footer/Footer'
import axios from 'axios'
import { encryptData } from '../../../encryptionModule'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage'
function EventAdmin() {
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    const [loadings, Setloadings] = useState(true);
    const [mobile, GetMobile] = useState(window.innerWidth < 505)

    useEffect(() => {
        const hundleSize = () => {
            GetMobile(window.innerWidth < 505)
        }
        window.addEventListener('resize', hundleSize)
        return () => window.removeEventListener('resize', hundleSize)
    }, [])



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


    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0)
    const [evenements, setevenements] = useState([]);
    const [isrechercher, setisRechercher] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/event/getAllevents?page=${currentPage}&size=${pageSize}&search=${searchTerm}`);
                setevenements(response.data.evenements);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalEvenements);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des events :', error);
                Setloadings(false)
            }
        };

        fetchData();
    }, [pageSize, currentPage, isrechercher]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getRange = () => {
        const from = (currentPage - 1) * pageSize + 1;
        const to = Math.min(currentPage * pageSize, totalElements);
        return `${from} à ${to} events sur ${totalElements}`;
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    function handleSearch() {
        setisRechercher(isrechercher + 1)
    }

    const handleCancelSearch = () => {
        setSearchTerm('');
        setisRechercher(isrechercher + 1);
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    }


    const handleDeleteEvent = async (eventId) => {
        // Afficher la boîte de dialogue de confirmation
        const result = await Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer cet événement ?',
            text: 'Cette action est irréversible !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        });

        // Si l'utilisateur confirme la suppression
        if (result.isConfirmed) {
            // Effectuer la suppression via Axios
            axios.delete(`https://speedreal.abahs-jobconnect.com/event/delete/${eventId}`)
                .then(response => {
                    // Mettre à jour la liste des événements après la suppression
                    const updatedEvents = evenements.filter(event => event.id !== eventId);
                    setevenements(updatedEvents);
                    // Afficher un message de confirmation
                    toast.success('L\'événement a été supprimé avec succès.');
                })
                .catch(error => {
                    // En cas d'erreur lors de la suppression
                    console.error('Erreur lors de la suppression de l\'événement :', error);
                    toast.error('Une erreur est survenue lors de la suppression de l\'événement. Veuillez réessayer.');
                });
        }
    };


    return (
        <div className='w-full'>
            {loadings && <SpinnerDemarage />}
            <NavBarsEvemet />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`w-full  overflow-hidden ${mobile1 ? 'min-h-[85vh]' : 'min-h-[80vh]'}`}>
                    <div className={`flex  mt-2 ml-1 items-center`}>
                        <div className='flex'>
                            <div className='relative flex'>
                                <input
                                    type="text"
                                    placeholder="Nom du pay..."
                                    className='py-2 pl-2 pr-0.5  border border-gray-400 focus:border-r-white border-r-white rounded-l-md focus:border-orange-600 w-full h-full bg-transparent outline-none'
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <div className='right-1  top-2  absolute '>
                                    {searchTerm.trim() !== "" && <div onClick={handleCancelSearch} class=" flex hover:bg-gray-200 items-center rounded-sm text-red-500 cursor-pointer ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi w-5 h-5 bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </div>
                                    }
                                </div>
                            </div>
                            <div
                                onClick={handleSearch}
                                className={`py-2 pl-2 pr-1 bg-gray-200 border cursor-pointer border-gray-400  rounded-r-md text-orange-600 focus:outline-none ${searchTerm.trim() === "" ? 'opacity-60 pointer-events-none' : 'opacity-100 pointer-events-auto'} `}
                            >                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </div>
                        </div>
                        <select
                            className="py-2.5 px-2  cursor-pointer border border-gray-300 m-1 bg-transparent  rounded-md focus:outline-none"
                            value={pageSize}
                            onChange={(event) => {
                                setPageSize(parseInt(event.target.value));
                            }}
                        >
                            <option className="text-[black]" value="5">5</option>
                            <option className="text-[black]" value="10">10</option>
                            <option className="text-[black]" value="20">20</option>
                            <option className="text-[black]" value="30">30</option>
                            <option className="text-[black]" value="40">40</option>
                        </select>

                    </div>
                    <div className='w-full flex flex-wrap'>
                        <div className='flex flex-wrap  w-full'>
                            {evenements.length > 0 && evenements.map((data, index) => (
                                <div key={index} data-position={index} className={` blocks mt-10  mx-auto rounded-xl ${mobile ? 'w-full' : 'w-[18em]'}  overflow-hidden flex flex-col items-center`}>
                                    <div className={`${mobile ? 'h-full w-full' : 'w-[16em] h-[16em]'} relative rounded-xl border  overflow-hidden `}>
                                        {
                                            youtubeRegex.test(data.video) ? (
                                                <div className={`relative  h-[16em] `}>
                                                    <ReactPlayer url={data.video}
                                                        controls
                                                        onReady={() => {
                                                            document.querySelector(`[data-position="${index}"] .spinners`).style.display = 'none';
                                                        }}
                                                        className=" overflow-hidden inline object-cover  w-full h-full"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-white   spinners">
                                                        <svg className="animate-spin h-8 w-8 text-orange-600" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="orange" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="orange" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.598A4.002 4.002 0 008 12H6v5.291z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={`relative`}>
                                                    <img
                                                        alt='       '
                                                        src={`https://speedreal.abahs-jobconnect.com/uploads/evenements/${data.photo}`}
                                                        className="w-full h-full object-cover"
                                                        onLoad={() => {
                                                            document.querySelector(`[data-position="${index}"] .spinners`).style.display = 'none';
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-white    spinners">
                                                        <svg className="animate-spin h-8 w-8 text-orange-600" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="orange" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="orange" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.598A4.002 4.002 0 008 12H6v5.291z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            )

                                        }
                                    </div>
                                    <Link to={`/event/Detail/${encryptData(data.id.toString())}`} className='w-full block text-left p-2 font-semibold text-[18px]'>{data.titre && (data.titre.length > 20 ? data.titre.slice(0, 20) + '...' : data.titre)}</Link>
                                    <div className='text-left w-full p-2 text-slate-500 text-[14px]'>{data.description && (data.description.length > 70 ? data.description.slice(0, 90) + '...' : data.description)}</div>
                                    <div className='flex items-center text-slate-500 justify-start w-full'>
                                        <div className='text-left w-full  text-slate-500 text-xs p-2'>{formatDate(data.createdAt)}</div>
                                    </div>
                                    <div className='flex justify-between items-center w-full border-t p-2 '>
                                        <Link to={`/event/edit/${encryptData(data.id.toString())}`} className='bg-blue-200 p-2 rounded flex justify-center items-center cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square w-5 h-5 text-blue-800 cursor-pointer" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg>
                                        </Link>
                                        <butoon onClick={() => handleDeleteEvent(data.id)} className='bg-red-200 p-2 rounded flex justify-center items-center cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill w-5 h-5 text-red-600" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                            </svg>
                                        </butoon>
                                    </div>
                                </div>
                            ))}

                        </div>
                        {evenements.length > 0 && (
                            <>
                                <div className="w-full flex justify-center items-center">
                                    <div className="w-[25em] h-full flex justify-around items-center p-2">
                                        <button onClick={previousPage} disabled={currentPage === 1} className="transition-all flex cursor-pointer hover:p-2 rounded">
                                            <i className="bi bi-arrow-left-circle-fill"></i>
                                            <span>Précédent</span>
                                        </button>
                                        <button onClick={nextPage} disabled={currentPage === totalPages} className="transition-all flex cursor-pointer hover:p-2 rounded">
                                            <span>Suivant</span>
                                            <i className="bi bi-arrow-right-circle-fill"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-center">
                                    <p className="text-gray-600">{getRange()}</p>
                                </div>
                            </>
                        )}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default EventAdmin