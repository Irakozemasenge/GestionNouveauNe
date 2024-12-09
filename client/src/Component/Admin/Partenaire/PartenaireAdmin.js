/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { InView } from 'react-intersection-observer'
import { FadeLoader } from 'react-spinners'
import ReactPlayer from 'react-player'
import Footer from '../../Visiteurs/Footer/Footer'
import NabBarpartenaire from './NabBarpartenaire'
import axios from 'axios'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { encryptData } from '../../../encryptionModule'

function PartenaireAdmin() {

    const [mobile, GetMobile] = useState(window.innerWidth < 1046)
    const [mobil1, GetMobile1] = useState(window.innerWidth < 873)
    const [mobil2, GetMobile2] = useState(window.innerWidth < 650)
    const [mobil3, GetMobile3] = useState(window.innerWidth < 490)
    const [mobil4, GetMobile4] = useState(window.innerWidth < 350)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 634)
    useEffect(() => {
        const hundleSize = () => {
            GetMobile(window.innerWidth < 1046)
            GetMobile1(window.innerWidth < 873)
            GetMobile2(window.innerWidth < 659)
            GetMobile3(window.innerWidth < 490)
            GetMobile4(window.innerWidth < 350)
        }
        window.addEventListener('resize', hundleSize)
        return () => window.removeEventListener('resize', hundleSize)
    }, [])

    const [visibleItems, setVisibleItems] = useState([]);
    const [loadedItems, setLoadedItems] = useState([]);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
        };

        const handleIntersection = (position) => {
            setVisibleItems((prev) => [...prev, position]);
        };
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const position = parseInt(entry.target.getAttribute('data-position'), 10);
                    handleIntersection(position);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.blocks');

        elements.forEach((element) => {
            if (element instanceof Element) {
                intersectionObserver.observe(element);
                return () => {
                    intersectionObserver.unobserve(element);
                };
            }
        });

        return () => {
            intersectionObserver.disconnect();
        };
    }, []);

    const handleImageLoad = (position) => {
        setLoadedItems((prev) => [...prev, position]);
    };



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
    const [partenaires, setpartenaires] = useState([]);
    const [isrechercher, setisRechercher] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/partenaire/getAllpartenaires?page=${currentPage}&size=${pageSize}&search=${searchTerm}`);
                setpartenaires(response.data.partenaires);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalpartenaires);
            } catch (error) {
                console.error('Erreur lors de la récupération des partenaires :', error);
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
        return `${from} à ${to} partenaires sur ${totalElements}`;
    };
    const handleSearchChange = (partenaire) => {
        setSearchTerm(partenaire.target.value);
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


    const handleDeletepartenaire = async (partenaireId) => {
        // Afficher la boîte de dialogue de confirmation
        const result = await Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer cet partenaire ?',
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
            axios.delete(`https://speedreal.abahs-jobconnect.com/partenaire/delete/${partenaireId}`)
                .then(response => {
                    // Mettre à jour la liste des partenaires après la suppression
                    const updatedpartenaires = partenaires.filter(partenaire => partenaire.id !== partenaireId);
                    setpartenaires(updatedpartenaires);
                    // Afficher un message de confirmation
                    toast.success('partenaire a été supprimé avec succès.');
                })
                .catch(error => {
                    // En cas d'erreur lors de la suppression
                    console.error('Erreur lors de la suppression de partenaire :', error);
                    toast.error('Une erreur est survenue lors de la suppression de partenaire. Veuillez réessayer.');
                });
        }
    };

    return (
        <div className='w-full'>
            <NabBarpartenaire />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>

                <div className={`flex  mt-4 ${mobile2 ? 'flex-col items-start' : 'items-center'}`}>
                    <div className='flex items-center m-1'>
                        <div className="flex items-center  overflow-hidden  border border-gray-300  rounded-l-md">
                            <input
                                type="text"
                                placeholder="Rechercher par nom pay..."
                                className='p-2 pr-0.5 w-full h-full bg-transparent outline-none'
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <div className='mr-0.5'>
                                {searchTerm.trim() != "" && <div onClick={handleCancelSearch} class=" flex text-white items-center rounded-full bg-red-700 cursor-pointer ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi w-5 h-5 bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </div>
                                }
                            </div>
                        </div>
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 text-white border bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none"

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>
                    </div>




                    <select
                        className="p-2 border border-gray-300 m-1 bg-transparent  rounded-md focus:outline-none"
                        value={pageSize}

                    >
                        <option className="text-[black]" value="5">5 par page</option>
                        <option className="text-[black]" value="10">10 par page</option>
                        <option className="text-[black]" value="20">20 par page</option>
                    </select>
                </div>
                <div className='w-full flex flex-wrap'>


                    <div className='flex flex-wrap w-full'>
                        {partenaires && partenaires.map((data, index) => (
                            <div key={index} data-position={index} className='w-[18em] blocks mt-10  mx-auto rounded-xl  overflow-hidden flex flex-col items-center'>
                                <div className='w-[16em] relative rounded-xl border  overflow-hidden h-[16em]'>
                                    <img src={`https://speedreal.abahs-jobconnect.com/uploads/partners/${data.logo}`} alt='  logo ' />
                                </div>
                                <Link to={`/partenaire/detail/${(encryptData(data.id.toString()))}`} className='w-full hover:no-underline focus:no-underline block text-left p-2  font-semibold text-[18px]'>{data.nom}</Link>
                                <div className='text-left w-full p-2 text-slate-500 text-[14px]'>{data.description && (data.description.length > 70 ? data.description.slice(0, 90) + '...' : data.description)}</div>
                                <div className='text-left w-full text-xs p-2'>
                                    Site:
                                    <a href={data.siteweb} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">{data.siteweb}</a>
                                </div>
                                <div className='flex justify-between items-center w-full border-t p-2 '>
                                    <Link to={`/partenaire/modifier/${(encryptData(data.id.toString()))}`} className='bg-blue-200 p-2 rounded flex justify-center items-center cursor-pointer'>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square w-5 h-5 text-blue-800 cursor-pointer" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </Link>
                                    <button onClick={() => handleDeletepartenaire(data.id)} className='bg-red-200 p-2 rounded flex justify-center items-center cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill w-5 h-5 text-red-600" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                    {partenaires.length > 0 && (
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
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default PartenaireAdmin