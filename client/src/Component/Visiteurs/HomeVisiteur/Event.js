import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
function Event() {
    const [loadings, Setloadings] = useState(true)
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    const [pageSize, setPageSize] = useState(5);
    const [evenements, setevenements] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/event/getAllevents?size=${pageSize}`);
                setevenements(response.data.evenements);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des events :', error);
                Setloadings(false)
            }
        };

        fetchData();
    }, [pageSize]);
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
    }



    const [mobile, GetMobile] = useState(window.innerWidth < 773)
    const [mobil2, GetMobile2] = useState(window.innerWidth < 551)
    const [mobil4, GetMobile4] = useState(window.innerWidth < 400)
    useEffect(() => {
        const hundleSize = () => {
            GetMobile(window.innerWidth < 773)
            GetMobile2(window.innerWidth < 551)
            GetMobile4(window.innerWidth < 400)
        }
        window.addEventListener('resize', hundleSize)
        return () => window.removeEventListener('resize', hundleSize)
    }, [])


    return (
        <div className="w-full flex flex-col items-center  mt-5 ">
            {loadings && <SpinnerDemarage />}
            <div className="w-[97%] border flex flex-col  rounded-xl my-3  p-3 bg-gray-50">
                <div className="text-left w-full text-orange-700 text-[17px] max-sm:text-center  sm:text-[30px] font-serif border-b pb-2">
                    Parcourez nos évènement  populaire
                </div>
                <div className={`w-full  gap-2 ${mobile ? 'grid grid-cols-2' : 'flex flex-wrap justify-left'}`}>
                    {console.log('evenements', evenements.length)}
                    {evenements.map((data, index) => (
                        index < 5 && (
                            <div
                                data-position={index}
                                key={index}
                                className={`${mobil2 ? 'w-full min-h-[15em] rounded' : 'w-[18em] h-[20em] rounded-xl '} p-1   bg-white mx-auto  overflow-hidden flex flex-col items-center mt-2`}
                            >
                                <div
                                    className={`${mobil2 ? 'w-full  h-[10em] rounded' : 'w-[16em] h-[16em] rounded-xl'} relative  mt-2 overflow-hidden`}
                                >
                                    {youtubeRegex.test(data.video) ? (
                                        <div className={`relative `}>
                                            <ReactPlayer
                                                url={data.video}
                                                className="rounded-[100px] videoNomPlay overflow-hidden inline object-contain object-center w-full h-full"
                                                onReady={() => {
                                                    document.querySelector(`[data-position="${index}"] .spinners`).style.display = 'none';
                                                }}
                                            />

                                            <div className="absolute inset-0 flex items-center justify-center  bg-gray-200 spinners">
                                                <svg className="animate-spin h-8 w-8 text-orange-600" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="orange" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.598A4.002 4.002 0 008 12H6v5.291z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`relative `}>
                                            <img
                                                alt="       "
                                                src={`https://speedreal.abahs-jobconnect.com/uploads/evenements/${data.photo}`}
                                                className="w-full h-full object-cover object-center"
                                                onLoad={() => {
                                                    document.querySelector(`[data-position="${index}"] .spinners`).style.display = 'none';
                                                }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center  bg-gray-200 spinners">
                                                <svg className="animate-spin h-8 w-8 text-orange-600" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="orange" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="orange" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.598A4.002 4.002 0 008 12H6v5.291z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={`w-full text-left p-2 text-gray-700 overflow-hidden font-semibold ${mobil4 ? ' text-[12px]' : ' text-[18px]'}`}>
                                    {data.titre && (data.titre.length > 20 ? data.titre.slice(0, 20) + '...' : data.titre)}
                                </div>
                                <div className={`items-center  text-slate-500 justify-start w-full ${mobil4 ? 'hidden' : 'flex'} pl-2`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={mobil4 ? '10' : '16'}
                                        height={mobil4 ? '10' : '16'}
                                        fill="currentColor"
                                        className="bi bi-clock"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                    </svg>
                                    <div className="text-left w-full  text-slate-500 text-xs p-2 max-sm:text-[11px] ">
                                        {formatDate(data.createdAt)}
                                    </div>
                                </div>
                                <Link
                                    to="/evenement"
                                    className={`text-center block border border-orange-400 rounded-3xl max-sm:text-[11px] cursor-pointer hover:border-white hover:bg-orange-600 hover:text-white transition-all font-extrabold duration-500 text-orange-600 m-2 w-[90%] p-2`}
                                >
                                    En savoir plus
                                </Link>
                            </div>
                        )
                    ))}
                </div>
                <div className='w-full flex justify-between px-2'>
                    <Link to='/evenement' className="text-orange-700 mt-4  sm:text-[20px] border font-bold border-orange-500 hover:scale-105  px-4 py-2 rounded-md cursor-pointer transition-all duration-500 w-max">
                        Voir plus événement
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default Event
