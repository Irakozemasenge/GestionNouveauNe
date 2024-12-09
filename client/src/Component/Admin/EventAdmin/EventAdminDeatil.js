import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import NavBarsEvemet from './NavBarsEvemet';
import Footer from '../../Visiteurs/Footer/Footer';
import axios from 'axios';
import { decryptData } from '../../../encryptionModule';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';


function EventAdminDeatil() {
    const [event, setEvent] = useState({});
    const { id } = useParams();
    const eventId = decryptData(id);
    const [loadings, Setloadings] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/event/getOneById/${eventId}`);
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
    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)


    const [loading, setLoading] = useState(true);

    const handleLoad = () => {
        setLoading(false);
    };


    return (
        <div className='w-full'>
            <NavBarsEvemet />
            {loadings && <SpinnerDemarage />}
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <Link to='/event' className='ml-1'>
                    Retour
                </Link>
                <div className='flex justify-center relative items-center w-full'>
                    <div className='w-full flex justify-center rounded overflow-hidden'>
                        <div className='w-[95%]  h-[75vh]'>
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
                                    <svg className="animate-spin h-8 w-8 text-orange-600" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.598A4.002 4.002 0 008 12H6v5.291z"></path>
                                    </svg>
                                </div>
                            )}
                            {
                                youtubeRegex.test(event.video) ? (
                                    <div className='h-full w-full'>
                                        <ReactPlayer url={event.video} onReady={handleLoad} controls className="overflow-hidden inline object-cover object-center w-full h-full" />
                                    </div>
                                ) : (
                                    <div>
                                        <img
                                            alt=''
                                            src={`https://speedreal.abahs-jobconnect.com/uploads/evenements/${event.photo}`}
                                            className="w-full h-auto object-cover"
                                            onLoad={handleLoad}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='sm:text-[20px] pl-1 sm:pl-10 text-[15px] w-full text-left mt-5'>
                    {event.titre}
                </div>
                <div className='flex justify-center items-center w-full'>
                    <div className='sm:text-[18px] text-[12px] text-gray-500 w-[90%]'>
                        {event.description}
                    </div>
                </div>
                <div className='my-2 w-full pl-1 sm:pl-10 text-[12px] sm:text-[18px]'>
                    <div>Organisé par: <span className='font-bold'>ABAHS</span></div>
                    <div className='font-medium'><span className='font-bold'>{formatDate(event.createdAt)}</span></div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default EventAdminDeatil;
