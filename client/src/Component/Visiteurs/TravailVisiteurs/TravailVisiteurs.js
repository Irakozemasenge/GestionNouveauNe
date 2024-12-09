/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Popover, Whisper } from 'rsuite';
import Adresse from '../Adresse/Adresse';
import axios from 'axios';
import { encryptData } from '../../../encryptionModule';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
function TravailVisiteurs() {
    const [loadings, Setloadings] = useState(true);
    const HundleSubmit = (e) => {
        e.preventDefault()
    }

    const [mobile, Setmobile] = useState(window.innerWidth < 1092);
    const [mobile1, Setmobile1] = useState(window.innerWidth < 889);
    const [mobile2, Setmobile2] = useState(window.innerWidth < 460);
    const [mobile3, Setmobile3] = useState(window.innerWidth < 355);
    const [mobile4, Setmobile4] = useState(window.innerWidth < 508);

    useEffect(() => {
        const hundleSize = () => {
            Setmobile(window.innerWidth < 1092)
            Setmobile1(window.innerWidth < 889)
            Setmobile2(window.innerWidth < 460)
            Setmobile3(window.innerWidth < 355)
            Setmobile4(window.innerWidth < 508)
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
    const [isrechercher, setisRechercher] = useState(0)

    const [travails, settravails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/travail/getAllTravails?page=${currentPage}&size=${pageSize}&search=${searchTerm}`);
                settravails(response.data.travails);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalTravails);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des travails :', error);
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
        return `${from} à ${to} travails sur ${totalElements}`;
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


    return (
        <>
            {loadings && <SpinnerDemarage />}
            <div className={`relative  bg-gray-50 flex p-2 ${mobile1 ? 'flex-col-reverse' : 'flex-row-reverse'}`}>
                <form onSubmit={HundleSubmit} className={`h-full w-ull ${mobile1 ? 'w-full mt-5' : 'w-1/2'}`}>
                    <div className={`mt-2 font-serif  ${mobile2 ? 'text-[25px] ' : mobile ? 'text-[40px] ' : 'text-[60px] '} w-full text-center`}>Travail à l'étranger</div>
                    <div className='w-full sm:pl-5'>
                        <div className={`mt-2 font-serif  ${mobile2 ? 'text-[16px] ' : mobile ? 'text-[18px] ' : 'text-[23px] '} w-full`} > Services de recherche d'emplois à l'étranger :</div>
                        <ul className='sm:text-[15px] text-[11px]'>
                            <li className='my-1'>
                                - L'Agence ABAHS est en collaboration avec d’autres Agences et Bureaux d’Immigration
                                d’Europe et du Canada ce qui génère un travail professionnel et de qualité</li>
                            <li className='my-1'>
                                - Notre Assistance permet à nos clients de profiter de leur savoir-faire pour sortir de la
                                pauvreté et soutenir financièrement les familles et les amis.
                            </li>
                        </ul>
                    </div>

                    <div className={`flex  mt-4 items-center`}>
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
                                    {searchTerm.trim() != "" && <div onClick={handleCancelSearch} class=" flex hover:bg-gray-200 items-center rounded-sm text-red-500 cursor-pointer ">
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
                            <option className="text-[black]" value="5">5 par page</option>
                            <option className="text-[black]" value="10">10 par page</option>
                            <option className="text-[black]" value="20">20 par page</option>
                            <option className="text-[black]" value="30">30 par page</option>
                            <option className="text-[black]" value="40">40 par page</option>
                        </select>
                    </div>
                </form>

                <div className={`h-max  ${mobile1 ? 'w-full p-0.5' : 'w-1/2 p-2'} flex`}>
                    <div className="w-full h-full rounded-xl overflow-hidden">
                        <img className="w-full h-full" src='image/Travails.avif' alt="    " />
                    </div>
                </div>
            </div>
            <div>

                <div className={` text-gray-600 w-full  ${mobile4 ? 'text-[18px] text-center' : 'text-[25px] pl-5'} mt-4`}>Pays partenaires</div>

                <div className={`grid  ${mobile4 ? 'grid-cols-3' : mobile3 ? 'grid-cols-2' : mobile ? 'grid-cols-3' : 'grid-cols-5 '}  m-2 rounded`}>
                    {travails.map((trav, index) => (
                        <Whisper
                            trigger='hover'
                            placement='auto'
                            speaker={
                                <Popover>
                                    <div className='flex items-center'>
                                        <img src={`https://flagcdn.com/w40/${trav.drapeux.toLowerCase()}.png`} alt={`${trav.pays} flag`} />
                                        <div className='ml-2 text-[20px]'>
                                            {trav.pays}
                                        </div>
                                    </div>
                                </Popover>
                            }
                        >
                            <Link to={`/travail/postuler/${encryptData((trav.id).toString())}`} className='m-3 w-max' key={index}>
                                <div className={`${mobile4 ? 'flex flex-col items-start' : 'flex items-center'}`}>
                                    <img src={`https://flagcdn.com/w40/${trav.drapeux.toLowerCase()}.png`} alt={`${trav.pays} flag`} />
                                    <div className={`${mobile4 ? 'ml-0.5 text-[11px]' : 'text-[20px] ml-2 '} `}>
                                        {trav.pays && (trav.pays.length > 10 ? trav.pays.slice(0, 10) + '..' : trav.pays)}
                                    </div>
                                </div>
                            </Link>
                        </Whisper>
                    ))}
                </div>
                {travails.length > 0 && (
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
            <Adresse />
        </>
    )
}

export default TravailVisiteurs




