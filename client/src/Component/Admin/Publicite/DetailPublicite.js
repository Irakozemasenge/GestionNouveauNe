import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NavBarsEvemet from './NavBarsPublicite'
// import { dataEvenent } from '../../Data/Data'
import ReactPlayer from 'react-player';
import Footer from '../../Visiteur/FootentContent/Footer';
import { decryptData } from '../../../encryptionModule';
import axios from 'axios';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';

function DetailTitreEvenet() {
    const [event, setEvent] = useState({});
    const { id } = useParams();
    const eventId = decryptData(id);
    const [loadings, Setloadings] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8005/event/getOneById/${eventId}`);
                setEvent(response.data);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'événement :', error);
                Setloadings(false)
            }
        };

        fetchEvent();
    }, [eventId]);

    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    }


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






    const [loading, setLoading] = useState(true);

    const handleLoad = () => {
        setLoading(false);
    };


    return (
        <div className='w-full'>
            {loadings && <SpinnerDemarage />}
            <NavBarsEvemet />
            <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                <div className="flex items-center w-full justify-between">
                    <Link to='/Publicite' className="w-8 h-8 flex justify-center items-center text-green-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                        </svg>
                    </Link>
                </div>

                <div className="w-full h-max mb-5 p-1 min-h-[80vh] flex flex-wrap justify-center">
                    <div className=' mx-2 my-4 w-[95%]  p-4'>

                        <div className='flex flex-wrap w-full'>
                            <div className='flex justify-center relative items-center w-full'>
                                <div className='w-full flex justify-center rounded overflow-hidden'>
                                    <div className='w-[99%]  h-[80vh]'>
                                        {loading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
                                                <svg className="animate-spin h-8 w-8 text-[#5dca32]" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.598A4.002 4.002 0 008 12H6v5.291z"></path>
                                                </svg>
                                            </div>
                                        )}
                                        {
                                            youtubeRegex.test(event.link) ? (

                                                <ReactPlayer url={event.link} onReady={handleLoad} controls className="overflow-hidden inline object-cover object-center w-full h-full" />

                                            ) : (

                                                <img
                                                    alt=''
                                                    src={`http://localhost:8005/uploads/publicites/${event.photo}`}
                                                    className="w-full h-auto object-contain"
                                                    onLoad={handleLoad}
                                                />

                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='sm:text-[20px] pl-1 sm:pl-10 text-[15px] w-full text-left mt-5'>
                                {event.titre}
                            </div>
                            <div className='flex justify-center items-center w-full'>
                                <div className='sm:text-[18px] whitespace-pre text-[12px] text-gray-500 w-[90%]'>
                                    {event.description}
                                </div>
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