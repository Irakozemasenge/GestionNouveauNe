import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NavBarContrnat from './NavBarContrnat';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { decryptData } from '../../../encryptionModule';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
const pdfjsWorker = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function ContrantDetail() {
    const [numPages, setNumPages] = useState(null);
    const [redFile, setRedFile] = useState(false);
    const [contrat, setContrat] = useState({});
    const { id } = useParams();
    const contratId = decryptData(id);
    const [loadings, Setloadings] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:8005/contrat/OneById/${contratId}`)
            .then(response => {
                setContrat(response.data);
                Setloadings(false)
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du contrat :", error);
                Setloadings(false)
            });
    }, [id]);

    const formatDate = date => {
        return format(new Date(date), "'Le 'd MMMM yyyy", { locale: fr });
    };

    const handleDownloadFile = () => {
        const link = document.createElement('a');
        link.href = `http://localhost:8005/uploads/Contrat/${contrat.document}`;
        link.target = '_blank';
        link.download = 'document';
        link.click();
    };


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



    return (
        <div className='w-full'>
            {loadings && <SpinnerDemarage />}
            <NavBarContrnat />
            <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                <div className="flex items-center w-full justify-between">
                    <Link to='/contrant' className="w-8 h-8 flex justify-center items-center text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                        </svg>
                    </Link>
                </div>
                <div className="w-[95%] border border-[#5dca32] rounded-md mx-4 my-6 pl-3 h-max">
                    <div className=' py-1 my-1'><span>Nom</span>: <span className=' font-semibold ml-2'>{contrat.nomcomplet}</span></div>
                    <div className=' py-1 my-1'><span>Objet du contrat</span>: <span className=' font-semibold ml-2'>{contrat.objectif}</span></div>
                    <div className=' py-1 my-1'><span>Date de début du contrat</span>: <span className=' font-semibold ml-2'>{contrat.datedebut && formatDate(contrat.datedebut)}</span></div>
                    <div className=' py-1 my-1'><span>Date de fin du contrat</span>: <span className=' font-semibold ml-2'>{contrat.datefin && formatDate(contrat.datefin)}</span></div>
                    <div className='flex'>
                        <div onClick={() => setRedFile(!redFile)} className='mx-2 px-2 py-1 bg-blue-100 hover:bg-blue-300 text-blue-700 cursor-pointer m-3 '>Lire </div>
                        <div onClick={handleDownloadFile} className='mx-2 px-2 py-1 bg-green-100 hover:bg-green-300 text-green-700 cursor-pointer m-3 '>Télécharger</div>
                    </div>
                </div>

                {redFile &&
                    <>
                        <div onClick={() => setRedFile(false)} className='fixed bottom-5 z-[100] bg-red-300 transition-all text-white hover:bg-red-700 p-2 cursor-pointer rounded right-5'>
                            Fermer le fichier
                        </div>
                        <div className='p-2'>
                            {contrat.document && contrat.document.toLowerCase().endsWith('.pdf') ? (
                                <Document
                                    file={`http://localhost:8005/uploads/Contrat/${contrat.document}`}
                                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                    className="pdfViewer"
                                >
                                    {[...Array(numPages)].map((_, index) => (
                                        <Page
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                            className="pdfPage"
                                        />
                                    ))}
                                </Document>
                            ) : (
                                <img src={`http://localhost:8005/uploads/Contrat/${contrat.document}`} alt="Document" className="contractImage" />
                            )}
                            <p>Nombre de pages : {numPages}</p>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default ContrantDetail;
