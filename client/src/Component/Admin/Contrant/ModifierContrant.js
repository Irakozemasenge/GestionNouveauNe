/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { Popover, Whisper } from 'rsuite';
import { FadeLoader } from 'react-spinners'
import { Link, useNavigate, useParams } from 'react-router-dom'
import NavBarContrnat from './NavBarContrnat';
import Footer from '../../Visiteur/FootentContent/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { decryptData } from '../../../encryptionModule';
import { Document, Page, pdfjs } from 'react-pdf';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
const pdfjsWorker = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function ModifierContrant() {
    const [boutLoading, setboutLoading] = useState(false);
    const navigate = useNavigate()

    const [nomcomplet, Getnomcomplet] = useState('')
    const [nomcompletMessage, GetnomcompletMessage] = useState(false)
    const [nom_médicamenAnimate, GetAnimate] = useState('')
    const elemenRefnomcomplet = useRef(null)


    const [datedebut, Getdatedebut] = useState('')
    const [datedebutMessage, GetdatedebutMessage] = useState(false)
    const [datedebutAnimate, GetdatedebutAnimate] = useState('')
    const elemenRefdatedebut = useRef(null)

    const [datefin, Getdatefin] = useState('')
    const [informationdatefin, Getinformationdatefin] = useState('')
    const [datefinMessage, GetdatefinMessage] = useState(false)
    const [datefinAnimate, GetdatefinAnimate] = useState('')
    const elemenRefdatefin = useRef(null)





    const [objectif, Getobjectif] = useState('')
    const [objectifAnimate, GetobjectifAnimate] = useState('')
    const [objectifMessage, GetobjectifMessage] = useState(false)
    const elemenRefobjectif = useRef(null)


    const [file, setFile] = useState(null);
    const [uploadPdfAnimate, GetuploadPdfAnimate] = useState('')
    const [uploadPdfMessage, GetuploadPdfMessage] = useState(false)
    const elemenRefuploadPdf = useRef(null)



    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setOrderFile("")
        setFile(selectedFile);

    };
    const [loadings, Setloadings] = useState(true)
    const [numPages, setNumPages] = useState(null);
    const { id } = useParams();
    const contratId = decryptData(id);
    const [orderfile, setOrderFile] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:8005/contrat/OneById/${contratId}`)
            .then(response => {
                const { nomcomplet, document, datedebut, datefin, objectif } = response.data;
                Getnomcomplet(nomcomplet);
                Getdatedebut(new Date(datedebut).toISOString().split('T')[0]);
                Getdatefin(new Date(datefin).toISOString().split('T')[0]);
                Getobjectif(objectif);
                setOrderFile(document);
                Setloadings(false)
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du contrat :", error);
                Setloadings(false)
            });
    }, [contratId]);
    const HundlesSend = e => {
        e.preventDefault()
        if (nomcomplet.trim() == "") {
            GetnomcompletMessage(true)
            GetAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetnomcompletMessage(false)
                GetAnimate('')
            }, 4000);
            elemenRefnomcomplet.current && elemenRefnomcomplet.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefnomcomplet.current && elemenRefnomcomplet.current.focus()
            return false
        } else if (datedebut.trim() == "") {
            GetdatedebutMessage(true)
            GetdatedebutAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetdatedebutAnimate('')
                GetdatedebutMessage(false)
            }, 4000);
            elemenRefdatedebut.current && elemenRefdatedebut.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefdatedebut.current && elemenRefdatedebut.current.focus()
            return false
        }
        else if (datefin.trim() == "") {
            GetdatefinMessage(true)
            GetdatefinAnimate('animate__animated animate__shakeX border border-red-500')
            Getinformationdatefin('datefin du contrat est obligatoire !!')
            setTimeout(() => {
                GetdatefinAnimate('')
                GetdatefinMessage(false)
                Getinformationdatefin('')
            }, 4000);
            elemenRefdatefin.current && elemenRefdatefin.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefdatefin.current && elemenRefdatefin.current.focus()
            return false
        }

        else if (file == null) {
            GetuploadPdfMessage(true)
            GetuploadPdfAnimate('animate__animated animate__shakeX border border-red-500')

            setTimeout(() => {
                GetuploadPdfAnimate('')
                GetuploadPdfMessage(false)
            }, 4000);
            elemenRefuploadPdf.current && elemenRefuploadPdf.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefuploadPdf.current && elemenRefuploadPdf.current.focus()
            return false
        }
        else if (objectif.trim() == "") {
            GetobjectifMessage(true)
            GetobjectifAnimate('animate__animated animate__shakeX border border-red-500')
            setTimeout(() => {
                GetobjectifMessage(false)
                GetobjectifAnimate('')
            }, 4000);
            elemenRefobjectif.current && elemenRefobjectif.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefobjectif.current && elemenRefobjectif.current.focus()
            return false
        } else {
            setboutLoading(true)
            const formData = new FormData();
            formData.append("nomcomplet", nomcomplet);
            formData.append("datedebut", datedebut);
            formData.append("datefin", datefin);
            formData.append("objectif", objectif);
            if (file) { formData.append("document", file); }

            axios.put(`http://localhost:8005/contrat/modifier/${contratId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    toast.success('Contrat créé avec succès !');
                    navigate("/contrant")
                    setboutLoading(false)
                })
                .catch(error => {
                    if (error.response) {
                        const errorMessage = error.response.data.error;
                        toast.error(errorMessage[0]);
                        setboutLoading(false)
                    } else {
                        toast.error('Une erreur est survenue lors de la création du contrat.');
                        console.error('Erreur inattendue :', error.message);
                        setboutLoading(false)
                    }
                    setboutLoading(false)
                });


        }

    }

    const [mobile, GetMobile] = useState(window.innerWidth < 1133)
    const [mobile3, GetMobile3] = useState(window.innerWidth < 342)
    useEffect(() => {
        const HundleSize = () => {
            GetMobile(window.innerWidth < 1133)
            GetMobile3(window.innerWidth < 342)
        }

        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, [])
    return (
        <div className='w-full'>
            <NavBarContrnat />
            {loadings && <SpinnerDemarage />}
            <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                <div className="flex items-center w-full justify-between">
                    <Link to='/contrant' className="w-8 h-8 flex justify-center items-center text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                        </svg>
                    </Link>
                </div>
                <div className="  flex flex-col items-center rounded-lg shadow-lg w-[99%] ">
                    <div className="flex flex-col w-full  items-center justify-center p-2">
                        <div className='w-full flex justify-center'>
                            <div>
                                <div className="uppercase text-[17px] sm:text-[25px] mt-3 font-semibold">Modifier un contrant</div>
                            </div>
                        </div>
                        <div className="w-full  rounded-lg   h-full ">

                            <div className="p-3  overflow-y-auto overflow-x-hidden">
                                <form onSubmit={HundlesSend} className='w-full'>
                                    <div className={`w-full flex mt-4 ${mobile ? 'flex-col gap-4' : ''} items-center`}>
                                        <Whisper
                                            placement="bottomStart"

                                            open={nomcompletMessage}
                                            speaker={<Popover>
                                                <div className='text-red-700'>
                                                    Votre  nom complet ou de la societe est obligatoire !!
                                                </div>
                                            </Popover>}
                                        >
                                            <div className="w-full relative mx-1 mb-2">
                                                <label className="block  mb-2   text-sm font-medium">Nom complet</label>
                                                <input
                                                    value={nomcomplet}
                                                    ref={elemenRefnomcomplet}
                                                    onChange={(e) => Getnomcomplet(e.target.value)}
                                                    className={`w-full  border  outline-none   rounded-md p-2.5  bg-transparent  border-gray-300 ${nom_médicamenAnimate} focus:border-green-500`}
                                                    placeholder=" Votre  nom complet ou de la societe"
                                                />
                                            </div>
                                        </Whisper>
                                        <Whisper
                                            placement="bottomStart"

                                            open={datedebutMessage}
                                            speaker={<Popover>
                                                <div className='text-red-700'>
                                                    Date de début du contrant est obligatoire !!
                                                </div>
                                            </Popover>}
                                        >
                                            <div className="w-full mx-1 relative mb-2 ">
                                                <label className="block  mb-2 text-sm font-medium">   Date de début du contrant</label>
                                                <input
                                                    type='date'
                                                    value={datedebut}
                                                    ref={elemenRefdatedebut}
                                                    onChange={(e) => Getdatedebut(e.target.value)}
                                                    className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300 ${datedebutAnimate}`}
                                                    placeholder="Numéro de watsapp"
                                                />

                                            </div>
                                        </Whisper>
                                        <Whisper
                                            placement="bottomStart"

                                            open={datefinMessage}
                                            speaker={
                                                <Popover>
                                                    <div className='text-red-600'> Date de fin du contrant est obligatoire !!</div>
                                                </Popover>
                                            }
                                        >
                                            <div className="w-full mx-1 relative mb-2 ">
                                                <label className="block  mb-2 text-sm font-medium">Date de fin du contrant</label>
                                                <input
                                                    type='date'
                                                    value={datefin}
                                                    ref={elemenRefdatefin}
                                                    onChange={(e) => Getdatefin(e.target.value)}
                                                    className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300 ${datefinAnimate}`}

                                                    placeholder="datefin"
                                                />
                                            </div>
                                        </Whisper>
                                    </div>

                                    <Whisper
                                        placement="bottomStart"

                                        open={uploadPdfMessage}
                                        speaker={<Popover>
                                            <div className='text-red-700'>
                                                Votre  nom complet ou de la societe est obligatoire !!
                                            </div>
                                        </Popover>}
                                    >
                                        <div className="w-full mt-4 relative mx-1 mb-2">
                                            <label htmlFor='file'
                                                className={`w-full  border  outline-none  block cursor-pointer  rounded-md p-2.5  bg-transparent  border-gray-300 ${uploadPdfAnimate} focus:border-green-500`}
                                            >Televerser le  contrant</label>
                                            <input
                                                type='file' accept='.pdf,.png,.jpg,.jepg'
                                                hidden
                                                id='file'
                                                ref={elemenRefuploadPdf}
                                                onChange={onFileChange}
                                                placeholder=" Votre  nom complet ou de la societe"
                                            />
                                        </div>
                                    </Whisper>
                                    {file && (
                                        <div className="mt-4">
                                            {file.type === 'application/pdf' ? (
                                                <Document
                                                    file={file}
                                                    className="border border-gray-300"
                                                >
                                                    <Page pageNumber={1} className="p-4" />
                                                </Document>
                                            ) : (
                                                <img src={URL.createObjectURL(file)} alt='Uploaded' className="max-w-full h-auto border border-gray-300 rounded-md shadow-sm" />
                                            )}
                                        </div>
                                    )}

                                    {orderfile &&
                                        <>
                                            <div className='p-2'>
                                                {orderfile && orderfile.toLowerCase().endsWith('.pdf') ? (
                                                    <Document
                                                        file={`http://localhost:8005/uploads/Contrat/${orderfile}`}
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
                                                    <img src={`http://localhost:8005/uploads/Contrat/${orderfile}`} alt="Document" className="contractImage" />
                                                )}
                                                <p>Nombre de pages : {numPages}</p>
                                            </div>
                                        </>
                                    }
                                    <Whisper
                                        placement="bottomStart"

                                        open={objectifMessage}
                                        speaker={<Popover>
                                            <div className='text-red-700'>
                                                L'objectif du contrant  est obligatoire !!
                                            </div>
                                        </Popover>}
                                    >
                                        <div className="w-full relative mb-2">
                                            <label htmlFor="company" className="block mb-1 text-sm font-medium "> L'objectif du contrant </label>
                                            <textarea
                                                value={objectif}
                                                ref={elemenRefobjectif}
                                                onChange={(e) => Getobjectif(e.target.value)}
                                                className={`w-full  border  outline-none focus:border-green-500 min-h-[15em]  rounded-md p-2.5  bg-transparent  border-gray-300 ${objectifAnimate}`}
                                                placeholder=" L'objectif du contrant "
                                            >

                                            </textarea>
                                        </div>
                                    </Whisper>

                                    <div className=" flex justify-end  w-full">
                                        {boutLoading ? (
                                            <>
                                                <button disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center  bg-green-950    p-2 rounded  text-gray-400">
                                                    <input type="submit" id="send" value='Ajouter' className='pointer-events-none' />
                                                    <div disabled className='absolute pointer-events-none  bg-transparent pt-4  pl-4  w-full h-full flex justify-center items-center z-50'>
                                                        <FadeLoader
                                                            color="rgb(255, 255, 255)"
                                                            height={10}
                                                            margin={-9}
                                                            radius={100}
                                                            speedMultiplier={1}
                                                            width={1}
                                                        />
                                                    </div>
                                                </button>
                                            </>
                                        ) : (<>
                                            <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-green-600   p-2 rounded  text-white">
                                                <input type="submit" id="send" value="Ajouter" className='cursor-pointer'></input>
                                            </label>
                                        </>)}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ModifierContrant



