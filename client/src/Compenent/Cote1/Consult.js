/* eslint-disable eqeqeq */
/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { Component, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { useReactToPrint } from "react-to-print";
import { Popover, Whisper } from "rsuite";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { encryptData } from "../../encryptionModule";
import { toast } from "react-toastify";
function Consult() {
  const [loadings, Setloadings] = useState(true);
  const [IsPrinting, setIsPrinting] = useState(false);

  const [cahsPrintAll, SetPrintAll] = useState(false);
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
      console.error("Erreur d'impression :", error);
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

  const [mobile, GetMobile] = useState(window.innerWidth < 772);
  const [mobile3, SetMobile3] = useState(window.innerWidth < 342);
  useEffect(() => {
    const HundleSize = () => {
      GetMobile(window.innerWidth < 772);
      SetMobile3(window.innerWidth < 342);
    };

    window.addEventListener("resize", HundleSize);
    return () => window.removeEventListener("resize", HundleSize);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [consultations, setconsultations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [pageInput, setPageInput] = useState("");
  const HundleClear = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setTimeout(() => {
      fetchconsultations();
    }, 2000);
  };

  const fetchconsultations = async () => {
    axios
      .get(
        "https://gestionnouveaune.abahs-jobconnect.online/consultation/All",
        {
          params: { search: searchTerm, page: currentPage, size: pageSize },
        }
      )
      .then((response) => {
        setconsultations(response.data.consultations);
        setTotalPages(response.data.totalPages);
        Setloadings(false);
      })
      .catch((error) => {
        console.error("Error fetching consultations:", error);
        Setloadings(false);
      });
  };
  useEffect(() => {
    fetchconsultations();
  }, [currentPage, pageSize]);
  const handleSearch = () => {
    setCurrentPage(1);
    fetchconsultations();
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
          className={`py-2 px-3 mx-1    font-semibold rounded-lg ${
            currentPage === i
              ? "bg-gray-700 text-white"
              : "hover:bg-gray-300 bg-gray-200 text-gray-800"
          }`}
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

  const formatDate = (date) => {
    return format(new Date(date), "'Le 'd, MMMM yyyy", { locale: fr });
  };

  return (
    <div className="flex flex-col h-[90vh] w-full overflow-hidden">
      <div className="flex w-full min-h-[82vh] overflow-x-hidden   overflow-y-auto  flex-col">
        <div className="h-max">
          <div className="mb-2   p-2 sm:mt-2 mt-1 w-full flex">
            <div className="flex  w-full max-sm:mt-2 mr-4">
              <div
                className={`w-full pl-1 justify-between flex flex-wrap items-center`}
              >
                <div className="flex items-center">
                  <div>
                    <select
                      value={pageSize}
                      onChange={handlePageSizeChange}
                      class="bg-transparent border border-[#5dca32] px-2 cursor-pointer h-10 sm:text-lg first-letter:uppercase rounded-lg   block"
                    >
                      <option className="text-black" value={1}>
                        1 par page
                      </option>
                      <option className="text-black" value={5}>
                        5 par page
                      </option>
                      <option className="text-black" value={10}>
                        10 par page
                      </option>
                      <option className="text-black" value={20}>
                        20 par page
                      </option>
                      <option className="text-black" value={50}>
                        50 par page
                      </option>
                      <option className="text-black" value={100}>
                        100 par page
                      </option>
                    </select>
                  </div>

                  <div class="flex items-center  mx-2 ">
                    <input
                      type="number"
                      min="1"
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

                <div className="flex items-center">
                  <div className="flex relative">
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full  border  pr-8 outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-200`}
                      placeholder="Recherche la consultation"
                    />

                    {searchTerm && (
                      <div
                        onClick={HundleClear}
                        className={` absolute cursor-pointer w-7 h-[95%] right-1  flex justify-center items-center`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="rounded  text-red-600  hover:bg-red-100"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleSearch}
                    className="cursor-pointer bg-green-200 text-green-600 rounded-md p-3 border   text-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                  </button>

                  {IsPrinting ? (
                    <>
                      <div className="w-max flex justify-center relative py-2 px-4">
                        <div
                          onClick={() => {
                            SetPrintAll(true);
                            setTimeout(() => {
                              handlePrint();
                            }, 0);
                            setTimeout(() => {
                              SetPrintAll(false);
                            }, 0);
                          }}
                          className="text-green-600  block p-2 hover:bg-green-200 bg-green-100 transition-all m-0.5 cursor-pointer rounded-lg"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-printer-fill w-6 h-6"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                          </svg>
                        </div>
                        <div
                          disabled
                          className="absolute cursor-no-drop  bg-transparent pt-2  pl-8  w-full h-full flex justify-center items-center z-50"
                        >
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
                        trigger="hover"
                        placement="auto"
                        speaker={
                          <Popover>Imprimer la liste des consultations</Popover>
                        }
                      >
                        <div
                          onClick={() => {
                            SetPrintAll(true);
                            setTimeout(() => {
                              handlePrint();
                            }, 0);
                            setTimeout(() => {
                              SetPrintAll(false);
                            }, 0);
                          }}
                          className="text-green-600  block p-2 hover:bg-green-200 bg-green-100 transition-all m-0.5 cursor-pointer rounded-lg"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-printer-fill w-6 h-6"
                            viewBox="0 0 16 16"
                          >
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
          <div className="w-full pb-3  overflow-y-hidden px-2 overflow-x-auto">
            <div className="w-full  pb-3">
              <table
                className={`border  rounded-sm overflow-hidden ${
                  mobile ? "w-[50em]" : "w-full"
                } border-gray-200`}
              >
                <thead>
                  <tr>
                    <th
                      className={`border-2 p-2 relative border-r py-2 text-left border-gray-200 cursor-pointer `}
                    >
                      Nom
                    </th>
                    <th
                      className={`border-2 p-2 relative border-r py-2 text-left border-gray-200 cursor-pointer `}
                    >
                      Prenom
                    </th>
                    <th
                      className={`border-2 p-2 relative border-r py-2 text-left border-gray-200 cursor-pointer `}
                    >
                      Date de consultation
                    </th>
                    <th
                      className={`border-2 p-2 relative border-r py-2 text-left border-gray-200 cursor-pointer `}
                    >
                      Raison de consultation
                    </th>
                    <th
                      className={`border-2 p-2 relative border-r py-2 text-left border-gray-200 cursor-pointer `}
                    >
                      Diagnostic{" "}
                    </th>
                    <th
                      className={`border-2 p-2 relative border-r py-2 text-left border-gray-200 cursor-pointer w-7`}
                    >
                      Action{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {consultations &&
                    consultations.map((data) => {
                      return (
                        <tr className="border-b">
                          <td className="p-1 border-r">
                            {data.NouveauNe && data.NouveauNe.nom}
                          </td>
                          <td className="p-1 border-r">
                            {data.NouveauNe && data.NouveauNe.prenom}
                          </td>
                          <td className="p-1 border-r">
                            {formatDate(data.date_consultation)}
                          </td>
                          <td className="p-1 border-r">
                            {data.raison_consultation}
                          </td>
                          <td className="p-1 border-r">{data.diagnostic}</td>
                          <td className="p-1 border-r w-[5em]">
                            <div className="flex items-center justify-center w-full">
                              <Whisper
                                trigger="hover"
                                placement="auto"
                                speaker={
                                  <Popover>Detail du consultation</Popover>
                                }
                              >
                                <Link
                                  to={`/consult/detail/${encryptData(
                                    data.id.toString()
                                  )}`}
                                  className="text-blue-600 block p-2 hover:bg-blue-200 m-0.5 cursor-pointer rounded-lg"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-eye-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                  </svg>
                                </Link>
                              </Whisper>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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
        </div>
      </div>
      {cahsPrintAll && (
        <PrintAll
          ref={componentRef}
          formatDate={formatDate}
          consultations={consultations}
        />
      )}
    </div>
  );
}

export default Consult;

class PrintAll extends Component {
  render() {
    const { formatDate, consultations } = this.props;
    return (
      <div class="w-full m-1 ">
        <div className="w-full">
          <div className=" mx-5 text-2xl  mb-4 font-bold  text-center">
            Liste des enfants consultés
          </div>
          <table className="border w-full   border-gray-200">
            <thead>
              <tr>
                <th
                  className={`border-2 p-2 relative border-r py-2 text-left border-gray-200 cursor-pointer `}
                >
                  Nom
                </th>
                <th
                  className={`border-2 p-2 relative border-r py-2 text-left border-gray-200 cursor-pointer `}
                >
                  Prenom
                </th>
                <th
                  className={`border-2 p-2 relative border-r py-2 text-left border-gray-200 cursor-pointer `}
                >
                  Date de consultation
                </th>
                <th
                  className={`border-2 p-2 relative border-r py-2 text-left border-gray-200 cursor-pointer `}
                >
                  Raison de consultation
                </th>
                <th
                  className={`border-2 p-2 relative border-r py-2 text-left border-gray-200 cursor-pointer `}
                >
                  Diagnostic{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {consultations &&
                consultations.map((data) => {
                  return (
                    <tr className="border-b">
                      <td className="p-1 border-r">
                        {data.NouveauNe && data.NouveauNe.nom}
                      </td>
                      <td className="p-1 border-r">
                        {data.NouveauNe && data.NouveauNe.prenom}
                      </td>
                      <td className="p-1 border-r">
                        {formatDate(data.date_consultation)}
                      </td>
                      <td className="p-1 border-r">
                        {data.raison_consultation}
                      </td>
                      <td className="p-1 border-r">{data.diagnostic}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
