/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import axios from 'axios'
import { encryptData } from '../../../encryptionModule'
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
import Footer from '../../Visiteur/FootentContent/Footer'
import NavBarsEvemet from './NavBarsPublicite'
import { enc } from 'crypto-js'
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage'
function Publicite() {
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



    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)

    useEffect(() => {
        const hundleSize = () => {
            SetMobile3(window.innerWidth < 342)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])




    const [pageInput, setPageInput] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0)
    const [publicites, setpublicites] = useState([]);
    const [isrechercher, setisRechercher] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8005/event/getAllevents?page=${currentPage}&size=${pageSize}&search=${searchTerm}`);
                setpublicites(response.data.publicites);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalpublicites);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des events :', error);
                Setloadings(false)
            }
        };

        fetchData();
    }, [pageSize, currentPage, isrechercher]);
    const handleSearch = () => {
        setCurrentPage(1);
        setisRechercher(isrechercher + 1);
    };
    const HundleClear = () => {
        setSearchTerm('');
        setCurrentPage(1);
        setTimeout(() => {
            setisRechercher(isrechercher + 1);
        }, 2000);
    };
    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(1);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const handlePageInputChange = (e) => {
        setPageInput(e.target.value);
    };

    const handleGoToPage = () => {
        const pageNumber = parseInt(pageInput);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const generatePageNumbers = () => {
        const maxPagesToShow = 5;
        const pages = [];
        let startPage = 1;
        let endPage = totalPages;

        if (totalPages > maxPagesToShow) {
            const offset = Math.floor(maxPagesToShow / 2);
            startPage = currentPage - offset;
            endPage = currentPage + offset;

            if (startPage < 1) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (endPage > totalPages) {
                endPage = totalPages;
                startPage = totalPages - maxPagesToShow + 1;
            }
        }

        // Ajout des points de suspension pour les premières pages
        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageClick(1)}
                    className={`py-2 px-3 mx-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg`}
                >
                    {1}
                </button>
            );
            if (startPage > 2) {
                pages.push(<span key="dots1">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`py-2 px-3 mx-1    font-semibold rounded-lg ${currentPage === i ? "bg-gray-700 text-white" : "hover:bg-gray-300 bg-gray-200 text-gray-800"}`}
                >
                    {i}
                </button>
            );
        }

        // Ajout des points de suspension pour les dernières pages
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="dots2">...</span>);
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageClick(totalPages)}
                    className={`py-2 px-3 mx-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg`}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };




    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    }


    const handleDeleteEvent = async (eventId) => {
        // Afficher la boîte de dialogue de confirmation
        const result = await Swal.fire({
            title: 'Êtes-vous sûr de voiloir supprimer cet enregistrement de vouloir supprimer cet événement ?',
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
            axios.delete(`http://localhost:8005/event/delete/${eventId}`)
                .then(response => {
                    // Mettre à jour la liste des événements après la suppression
                    const updatedEvents = publicites.filter(event => event.id !== eventId);
                    setpublicites(updatedEvents);
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
            <NavBarsEvemet />
            {loadings && <SpinnerDemarage />}
            <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>

                <div className=' mx-5 sm:text-2xl mt-2 text-[15px]'>Liste des publicités</div>
                <div className=' min-h-[80vh]'>
                    <div className='flex items-center mb-2 flex-wrap sm:mt-2 mt-1 w-full justify-between'>
                        <div className='flex  w-full max-sm:mt-2 mr-4'>
                            <div className={`w-full justify-between flex flex-wrap items-center`}>
                                <div className='flex items-center'>
                                    <div>
                                        <select
                                            value={pageSize}
                                            onChange={handlePageSizeChange}
                                            class="bg-transparent border border-[#5dca32] px-2 cursor-pointer h-10 sm:text-lg first-letter:uppercase rounded-lg   block"
                                        >
                                            <option className='text-black' value={1}>1 par page</option>
                                            <option className='text-black' value={5}>5 par page</option>
                                            <option className='text-black' value={10}>10 par page</option>
                                            <option className='text-black' value={20}>20 par page</option>
                                            <option className='text-black' value={50}>50 par page</option>
                                            <option className='text-black' value={100}>100 par page</option>
                                        </select>
                                    </div>

                                    <div class="flex items-center  mx-2 ">
                                        <input
                                            type="number"
                                            min='1'
                                            max={totalPages}
                                            value={pageInput}
                                            onChange={handlePageInputChange}
                                            class="bg-transparent text-center  outline-none border border-[#5dca32] h-10  sm:text-lg first-letter:uppercase rounded-lg  block w-20 mr-2"
                                            placeholder={`1 - ${totalPages}`}
                                        />
                                        <button
                                            onClick={handleGoToPage}
                                            class="py-2 px-4 bg-[#00800023] hover:bg-[#008000a1] text-[#5dca32] font-semibold rounded-lg"
                                        >
                                            Aller
                                        </button>
                                    </div>
                                </div>

                                <div className='flex items-center'>
                                    <div className='flex relative'>
                                        <input
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className={`w-full  border  pr-8 outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-200`}
                                            placeholder="Recherche le client" />

                                        {searchTerm &&
                                            <div onClick={HundleClear} className={` absolute cursor-pointer w-7 h-[95%] right-1  flex justify-center items-center`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="rounded  text-red-600  hover:bg-red-100" viewBox="0 0 16 16">
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                                </svg>
                                            </div>}
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        className='cursor-pointer bg-green-200 text-green-600 rounded-md p-3 border   text-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-wrap'>
                        <div className='flex flex-wrap  w-full'>
                            {publicites.length > 0 && publicites.map((data, index) => (
                                <div key={index} data-position={index} className={` blocks mt-10  mx-auto rounded-xl ${mobile ? 'w-full' : 'w-[18em]'}  overflow-hidden flex flex-col items-center`}>
                                    <div className={`${mobile ? 'h-full w-full' : 'w-[16em] h-[16em]'} relative rounded-xl border  overflow-hidden `}>
                                        {
                                            youtubeRegex.test(data.link) ? (
                                                <div className={`relative  h-[16em] `}>
                                                    <ReactPlayer url={data.link}
                                                        controls

                                                        className=" overflow-hidden inline object-cover  w-full h-full"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-white   spinners">
                                                        <svg className="animate-spin h-8 w-8 text-green-600" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="green" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="green" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.598A4.002 4.002 0 008 12H6v5.291z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={`relative`}>
                                                    <img
                                                        alt='       '
                                                        src={`http://localhost:8005/uploads/publicites/${data.photo}`}
                                                        className="w-full h-full object-cover"
                                                        onLoad={() => {
                                                            document.querySelector(`[data-position="${index}"] .spinners`).style.display = 'none';
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center bg-white    spinners">
                                                        <svg className="animate-spin h-8 w-8 text-green-600" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="green" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="green" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.598A4.002 4.002 0 008 12H6v5.291z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            )

                                        }
                                    </div>
                                    <Link to={`/Publicite/detail/${encryptData((data.id).toString())}`} className='w-full block text-left p-2 font-semibold text-[18px]'>{data.titre && (data.titre.length > 20 ? data.titre.slice(0, 20) + '...' : data.titre)}</Link>
                                    <div className='text-left w-full p-2 text-slate-500 text-[14px]'>{data.description && (data.description.length > 70 ? data.description.slice(0, 90) + '...' : data.description)}</div>
                                    <div className='flex items-center text-slate-500 justify-start w-full'>
                                        <div className='text-left w-full  text-slate-500 text-xs p-2'>{formatDate(data.createdAt)}</div>
                                    </div>
                                    <div className='flex justify-between items-center w-full border-t p-2 '>
                                        <Link to={`/Publicite/modifier/${encryptData((data.id).toString())}`} className='bg-blue-200 p-2 rounded flex justify-center items-center cursor-pointer'>
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
                        <div className="flex justify-between px-3 w-full mt-4 flex-wrap">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="py-2 px-4 bg-[#00800023] hover:bg-[#008000a1] text-[#5dca32] font-semibold rounded-lg disabled:opacity-50 mb-2 sm:mb-0"
                            >
                                Précédent
                            </button>
                            <div className="flex flex-wrap ">{generatePageNumbers()}</div>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="py-2 px-4 bg-[#00800023] hover:bg-[#008000a1] text-[#5dca32] font-semibold rounded-lg disabled:opacity-50 mb-2 sm:mb-0"
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Publicite