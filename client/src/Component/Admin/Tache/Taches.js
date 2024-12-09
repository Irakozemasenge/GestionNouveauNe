import React, { Component, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Popover, Whisper } from "rsuite";
import Footer from '../../Visiteur/FootentContent/Footer';
import { useReactToPrint } from "react-to-print";
import { FadeLoader } from 'react-spinners';
import TachesNavBars from './TachesNavBars';
import axios from 'axios'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { encryptData } from '../../../encryptionModule';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
function Taches() {

  const [loadings, Setloadings] = useState(true)
  const [searchTerm, setSearchTerm] = useState("");
  const [taches, settaches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [pageInput, setPageInput] = useState("");
  const HundleClear = () => {
    setSearchTerm('');
    setCurrentPage(1);
    setTimeout(() => {
      fetchtaches();
    }, 2000);
  };

  const [IsPrinting, setIsPrinting] = useState(false);

  const [cahsPrintAll, SetPrintAll] = useState(false)
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforePrint: () => {
      setIsPrinting(true);
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
    onPrintError: (error) => {
      console.error('Erreur d\'impression :', error);
    },
  });


  useEffect(() => {
    window.onafterprint = () => {
      setIsPrinting(false);
    };
    return () => {
      window.onafterprint = null;
    };
  }, []);

  const fetchtaches = async () => {
    axios.get("http://localhost:8005/tache/Actifs", {
      params: { searchTerm: searchTerm, page: currentPage, itemsPerPage: pageSize }
    })
      .then(response => {
        settaches(response.data.tasks);
        setTotalPages(response.data.totalPages);
        Setloadings(false)
      })
      .catch(error => {
        console.error("Error fetching taches:", error);
        Setloadings(false)
      });
  };
  useEffect(() => {
    fetchtaches();
  }, [currentPage, pageSize]);
  const handleSearch = () => {
    setCurrentPage(1);
    fetchtaches();
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

  const formatDate = date => {
    return format(new Date(date), "'Le 'd, MMMM yyyy", { locale: fr });
  };
  function formatHeure(heure) {
    const [hh, mm, ss] = heure.split(':');
    return `${hh}h ${mm}`;
  }
  // Fonction pour gérer la suppression
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
        axios.delete(`http://localhost:8005/tache/${itemId}`)
          .then((response) => {
            toast.success('Votre tache a été supprimé.');
            settaches(taches.filter(tache => tache.id !== itemId));
          })
          .catch((error) => {
            // En cas d'erreur lors de la suppression, afficher un message d'erreur
            toast.error('Une erreur s\'est produite lors de la suppression de le tache.');
            console.error('Erreur lors de la suppression de le tache :', error);
          });
      }
    });
  };


  const [mobile, GetMobile] = useState(window.innerWidth < 772)
  const [mobile3, SetMobile3] = useState(window.innerWidth < 342)
  useEffect(() => {
    const HundleSize = () => {
      GetMobile(window.innerWidth < 772)
      SetMobile3(window.innerWidth < 342)
     
    }

    window.addEventListener('resize', HundleSize)
    return () => window.removeEventListener('resize', HundleSize)
  }, [])




  return (
    <div className='w-full'>
      <TachesNavBars />
      {loadings && <SpinnerDemarage />}
      <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
        <div className=' mx-5 sm:text-2xl mt-2 text-[15px]'>Liste des taches</div>
        <div className='flex items-center mb-2 mt-5 w-full justify-between'>
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

                  {IsPrinting ? (
                    <>
                      <div className="w-max flex justify-center relative py-2 px-4">
                        <div onClick={() => { SetPrintAll(true); setTimeout(() => { handlePrint() }, 0); setTimeout(() => { SetPrintAll(false); }, 0); }} className='text-green-600  block p-2 hover:bg-green-200 bg-green-100 transition-all m-0.5 cursor-pointer rounded-lg'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill w-6 h-6" viewBox="0 0 16 16">
                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                          </svg>
                        </div>
                        <div disabled className='absolute cursor-no-drop  bg-transparent pt-2  pl-8  w-full h-full flex justify-center items-center z-50'>
                          <FadeLoader
                            color="rgb(255, 255, 255)"
                            height={10}
                            margin={-9}
                            radius={100}
                            speedMultiplier={1}
                            width={1}
                          />
                        </div>
                      </div>

                    </>
                  ) : (
                    <>
                      <Whisper
                        trigger='hover'
                        placement='auto'
                        speaker={
                          <Popover>
                            Imprimer la liste des clients
                          </Popover>
                        }
                      >
                        <div onClick={() => { SetPrintAll(true); setTimeout(() => { handlePrint() }, 0); setTimeout(() => { SetPrintAll(false); }, 0); }} className='text-green-600  block p-2 hover:bg-green-200 bg-green-100 transition-all m-0.5 cursor-pointer rounded-lg'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill w-6 h-6" viewBox="0 0 16 16">
                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                          </svg>
                        </div>
                      </Whisper>
                    </>
                  )}
                </div>
              </div>


            </div>
          </div>
        </div>
        <div className='w-full pb-3 overflow-x-auto min-h-[70vh]'>
          <div className='w-full overflow-x-auto pb-3'>
            <table className={`border  rounded-sm overflow-hidden ${mobile ? 'w-[50em]' : 'w-full'} border-gray-200`}>
              <thead>
                <tr>
                  <th className='border-b-2 p-2 border-r py-2 text-left border-gray-200'>Activites prevus</th>
                  <th className='border-b-2 p-2 border-r py-2 text-left border-gray-200'>Date d'activite</th>
                  <th className='border-b-2 p-2 border-r py-2 text-left border-gray-200'>Heure de debut</th>
                  <th className='border-b-2 p-2 border-r py-2 text-left border-gray-200'>Heure de fin</th>
                  <th className='border-b-2 p-2 border-r py-2 text-left border-gray-200'>Action</th>
                </tr>
              </thead>
              <tbody>
                {taches.map((datas, index) => (
                  <tr key={index} className='border-b'>
                    <td className='p-1 border-r'>{datas.activite}</td>
                    <td className='p-1 border-r'>{formatDate(datas.date)}</td>
                    <td className='p-1 border-r'>{formatHeure(datas.heuredebut)}</td>
                    <td className='p-1 border-r'>{formatHeure(datas.heurefin)}</td>
                    <td className='p-1 border-r w-[5em]'>
                      <div className='flex items-center justify-center w-full'>
                        <Whisper
                          trigger='hover'
                          placement='auto'
                          speaker={<Popover>
                            Modifier la tache
                          </Popover>}
                        >
                          <Link to={`/tache/modifier/${encryptData((datas.id).toString())}`} className='text-green-600  block p-2 hover:bg-green-200 m-0.5 cursor-pointer rounded-lg'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-down-left" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M7.364 12.5a.5.5 0 0 0 .5.5H14.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 14.5 0h-10A1.5 1.5 0 0 0 3 1.5v6.636a.5.5 0 1 0 1 0V1.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H7.864a.5.5 0 0 0-.5.5" />
                              <path fill-rule="evenodd" d="M0 15.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1H1.707l8.147-8.146a.5.5 0 0 0-.708-.708L1 14.293V10.5a.5.5 0 0 0-1 0z" />
                            </svg>
                          </Link>
                        </Whisper>
                        <Whisper
                          trigger='hover'
                          placement='auto'
                          speaker={<Popover>
                            Supprimer la tache
                          </Popover>}
                        >
                          <div
                            onClick={() => handleDelete(datas.id)}
                            className='text-red-600 p-2 hover:bg-red-200 m-0.5 cursor-pointer rounded-lg'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                          </div>
                        </Whisper>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {taches.length === 0 &&
              <div className='w-full'>
                <span colSpan="7" className='min-h-[60vh]   w-full flex justify-center items-center font-bold text-gray-400'>Pas des taches existé</span>
              </div>
            }
          </div>
          <div className="flex justify-between px-3 mt-4 flex-wrap">
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
        {cahsPrintAll && <PrintAll ref={componentRef} taches={taches} formatDate={formatDate} formatHeure={formatHeure} />}
        <Footer />
      </div></div>
  )
}

export default Taches




class PrintAll extends Component {
  render() {
    const { taches, formatDate, formatHeure } = this.props;
    return (
      <div class="w-full m-1 ">
        <div className='w-full'>
          <div className=' mx-5 text-2xl  mb-4 font-bold  text-center'>Liste des tâches qui n'ont pas encore été exécutées</div>
          <table className='border w-full   border-gray-200'>
            <thead>
              <tr>
                <th className='border-b-2 p-2 border-r py-2 text-left border-gray-200'>Activites prevus</th>
                <th className='border-b-2 p-2 border-r py-2 text-left border-gray-200'>Date d'activite</th>
                <th className='border-b-2 p-2 border-r py-2 text-left border-gray-200'>Heure de debut</th>
                <th className='border-b-2 p-2 border-r py-2 text-left border-gray-200'>Heure de fin</th>
              </tr>
            </thead>
            <tbody>
              {taches.map((datas, index) => (
                <tr key={index} className='border-b'>
                  <td className='p-1 border-r'>{datas.activite}</td>
                  <td className='p-1 border-r'>{formatDate(datas.date)}</td>
                  <td className='p-1 border-r'>{formatHeure(datas.heuredebut)}</td>
                  <td className='p-1 border-r'>{formatHeure(datas.heurefin)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}