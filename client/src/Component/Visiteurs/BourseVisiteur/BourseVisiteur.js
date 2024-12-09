/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Adresse from '../Adresse/Adresse';
import axios from 'axios';
import { encryptData } from '../../../encryptionModule';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';

function BourseVisiteur() {

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
    const [bourses, setBourses] = useState([]);
    const [loadings, Setloadings] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/bourse/getAllBourses?page=${currentPage}&size=${pageSize}&search=${searchTerm}`);
                setBourses(response.data.bourses);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalBourses);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des bourses :', error);
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
        return `${from} à ${to} bourses sur ${totalElements}`;
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
            <div className={`relative  min-h-[80vh] bg-gray-50 flex p-2 ${mobile1 ? 'flex-col-reverse' : ''}`}>
                <div className={`h-full w-ull flex flex-col items-center ${mobile1 ? 'w-full mt-5' : 'w-1/2'}`}>
                    <div className={`mt-2 font-serif  ${mobile2 ? 'text-[25px] ' : mobile ? 'text-[40px] ' : 'text-[60px] '} w-full`}>Bourses d'études</div>
                    <div className='w-full sm:pl-5'>
                        <div className={`mt-2 font-serif  ${mobile2 ? 'text-[16px] ' : mobile ? 'text-[18px] ' : 'text-[23px] '} w-full`} > Services de recherche de bourses d'études :</div>
                        <ul className='sm:text-[15px] text-[11px]'>
                            <li className='my-1'>  - L’Agence fait des recherches sur la disponibilité des différentes bourses d’études.</li>
                            <li className='my-1'>  - Elle aide les étudiants et chercheurs à postuler pour maximiser les chances.
                            </li>
                            <li className='my-1'>
                                - Comme les opportunités sur les bourses ne sont pas à la portée de tous bien que
                                disponibles sur le Web, l’Agence fait la recherche profonde, et fait la promotion des
                                bourses disponibles en les rendant publiques pour que les intéressés en profitent.</li>
                            <li className='my-1'>
                                - L’Agence assiste les étudiants à confectionner les bons CV, les bonnes lettres de
                                motivation suivant les normes voulus par les pays d’accueil, aide à remplir les
                                formulaires en ligne, à scanner les documents selon la taille exigée, etc. justes pour
                                maximiser les chances.</li>
                            <li className='my-1'>
                                - Le délai maximal d’attente des résultats est annoncé dans les TDR de chaque bourse, les
                                avantages aussi.
                            </li>
                            <li className='my-1'>  - Il y des universités et pays qui offrent des bourses mensuelles supérieures à mille dollars
                                (1000USD) et qui offrent des billets d’avion aller et retour.
                                Pour accéder à ces opportunités.
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
                </div>
                <div className={`h-max  ${mobile1 ? 'w-full p-0.5' : 'w-1/2 p-2'} flex`}>
                    <div className="w-full h-full rounded-xl overflow-hidden">
                        <img className="w-full h-full" src='image/bourse etranger.jpg' alt="    " />
                    </div>
                </div>
            </div>
            <div>
                <div className={` text-gray-600 w-full  ${mobile4 ? 'text-[20px] text-center' : 'text-[25px] pl-5'} mt-4`}>Decouvrir les nouvelles bourses d'études disponibles</div>
                <div className='flex flex-wrap'>
                    {bourses.length > 0 && bourses.map((bourse, index) => (
                        index < 10 &&
                        <div className={` p-3 ${mobile4 ? 'w-[95%]' : 'w-[17em]'} rounded-xl h-max  m-2`}>
                            <div className='text-[#ca3232] font-bold text-[20px]'>{bourse.titre}</div>
                            <div className='mt-2'>
                                <div className='font-medium'><b>Pays</b>: {bourse.pays}</div>
                                <div className='font-medium'><b>Domaine</b>: {bourse.domaine}</div>
                                <div className='font-medium'><b>Niveau</b>: {bourse.niveau}</div>
                                <div className='font-medium'><b>Fin d'inscription</b>:<span className='font-bold'>
                                    {new Date(bourse.fin).toLocaleDateString()}
                                </span></div>
                            </div>
                            <Link to={`/bourse/postuler/${encryptData((bourse.id).toString())}`} className='w-full text-center block focus:text-white hover:text-white cursor-pointer py-1.5 mt-1 bg-orange-600 text-white rounded'>
                                Postuler
                            </Link>
                        </div>
                    ))}
                    {bourses.length == 0 &&
                        <div className='w-full text-center mt-5 text-gray-500  sm:text-lg'>
                            Le pay <b className='italic'>{searchTerm}</b> n'existe pas dans notre système
                        </div>
                    }
                </div>

                {bourses.length > 0 && (
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

export default BourseVisiteur

