import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBarsEvemet from './NavBarsEvemet'
import { dataEvenent } from '../../Data/Data'
import ReactPlayer from 'react-player';
import { InView } from 'react-intersection-observer';
import { FadeLoader } from 'react-spinners';
import Footer from '../../Visiteurs/Footer/Footer';

function DetailTitreEvenet() {
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    const [mobile, GetMobile] = useState(window.innerWidth < 1046)
    const [mobil1, GetMobile1] = useState(window.innerWidth < 873)
    const [mobil2, GetMobile2] = useState(window.innerWidth < 650)
    const [mobil3, GetMobile3] = useState(window.innerWidth < 490)
    const [mobil4, GetMobile4] = useState(window.innerWidth < 350)

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

    return (
        <div className='w-full'>
            <NavBarsEvemet />
            <div className='w-full h-[80vh] overflow-x-hidden overflow-y-auto'>
                <Link to='/event' className='ml-1'>
                    Retour
                </Link>
                <div className="w-full h-max mb-5 p-1 flex flex-wrap justify-center">
                    <div className=' mx-2 my-4 w-[95%] border border-fuchsia-700 rounded-xl p-4'>
                        <Link to='/event' className='text-[30px]'>{dataEvenent[0].titre}</Link>
                        <div className='flex flex-wrap w-full'>
                            <div className='flex flex-wrap w-full'>
                                {dataEvenent && dataEvenent[0].sous.map((sousData, indexSousdata) => (
                                    <div data-position={indexSousdata} key={indexSousdata} className='w-[18em] mt-10 bloks mx-auto rounded-xl  overflow-hidden flex flex-col items-center'>
                                        <div className='w-[16em] relative rounded-xl  overflow-hidden h-[16em]'>
                                            {
                                                youtubeRegex.test(sousData.UrlData) ? (
                                                    <ReactPlayer url={sousData.UrlData}
                                                        controls
                                                        className="rounded-[100px] overflow-hidden inline object-cover object-center w-full h-full" />

                                                ) : (
                                                    <>
                                                        <img
                                                            alt='       '
                                                            src={sousData.UrlData}
                                                            className="w-full h-full object-cover"
                                                        />

                                                    </>
                                                )

                                            }

                                        </div>

                                        <Link to='/event/Detail' className='w-full block text-left p-2  font-semibold text-[18px]'>{sousData.sousTitre && (sousData.sousTitre.length > 20 ? sousData.sousTitre.slice(0, 20) + '...' : sousData.sousTitre)}</Link>

                                        <div className='text-left w-full p-2 text-slate-500 text-[14px]'>{sousData.description && (sousData.description.length > 70 ? sousData.description.slice(0, 90) + '...' : sousData.description)}</div>

                                        <div className='flex items-center text-slate-500 justify-start w-full'>
                                            <div className='text-left w-full  text-slate-500 text-xs p-2'>Lundi,le 15/09/2024 à 12h:54min</div>
                                        </div>
                                        <div className='flex justify-between items-center w-full border-t p-2 '>
                                            <div className='bg-blue-200 p-2 rounded flex justify-center items-center cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square w-5 h-5 text-blue-800 cursor-pointer" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg>
                                            </div>
                                            <Link to="/event/AddMore" className='bg-orange-200  p-2 rounded flex justify-center items-center cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-dotted w-5 h-5 text-orange-600" viewBox="0 0 16 16">
                                                    <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                                </svg>
                                            </Link>
                                            <div className='bg-red-200 p-2 rounded flex justify-center items-center cursor-pointer'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill w-5 h-5 text-red-600" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                </svg></div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default DetailTitreEvenet