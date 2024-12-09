import React, { useEffect, useState } from 'react'
import { useTheme } from '../UseContext/ThemeContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import ReactPlayer from 'react-player';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
function Publicite() {
    const { setDatapublicitesHomme } = useTheme();
    const [publicites, setpublicites] = useState([]);
    const [loadings, Setloadings] = useState(true)

    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8005/event/getAllevents`);
                setpublicites(response.data.publicites);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des events :', error);
                Setloadings(false)
            }
        };

        fetchData();
    }, []);
    const formatDate = date => {
        return format(new Date(date), "'Le 'd, MMMM yyyy", { locale: fr });
    };


    const [mobile1, Setmobile1] = useState(window.innerWidth < 1086);
    const [mobile2, Setmobile2] = useState(window.innerWidth < 698);
    const [mobile3, Setmobile3] = useState(window.innerWidth < 447);
    useEffect(() => {
        const hundleSize = () => {
            Setmobile1(window.innerWidth < 1086)
            Setmobile2(window.innerWidth < 698)
            Setmobile3(window.innerWidth < 447)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className='p-3 mt-5 w-full'>
            {loadings && <SpinnerDemarage />}
            <div className='sm:text-[25px] text-[17px] font-bold'>Publicités interressantes pour vous</div>
            <div className={`${mobile2 ? 'flex' : ''}`}>
                {publicites.map((data, index) => (
                    index < 4 && <div key={index} data-position={index} className={` flex py-5 ${mobile2 ? 'flex w-1/2  mx-0.5 flex-col' : 'border-b-[0.5em] border-green-500 border-dotted'}`}>
                        <div className={`relative rounded-lg overflow-hidden border  ${mobile3 ? 'h-[10em]' : mobile2 ? 'w-full h-[15em]' : 'w-[17em] h-[14em]'} `}>
                            {youtubeRegex.test(data.link) ? (
                                <ReactPlayer
                                    controls
                                    url={data.link}
                                    onReady={() => {
                                        document.querySelector(`[data-position="${index}"] .spinners`).style.display = 'none';
                                    }}
                                    className={`w-full h-full object-center ${mobile2 ? 'object-contain' : 'object-cover'}`} alt='    '
                                />
                            ) : (
                                <img
                                    src={`http://localhost:8005/uploads/publicites/${data.photo}`}
                                    onLoad={() => {
                                        document.querySelector(`[data-position="${index}"] .spinners`).style.display = 'none';
                                    }}
                                    className={`w-full h-full object-center  ${mobile2 ? 'object-contain' : 'object-cover'}`} alt='    '
                                />
                            )}

                            <div className="absolute top-0 w-full h-full left-0 flex items-center justify-center  bg-gray-50 spinners">
                                <svg className="animate-spin h-8 w-8 text-[#5dca32]" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="green" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.598A4.002 4.002 0 008 12H6v5.291z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className={`ml-2 w-[80%] ${mobile2 ? 'mt-5' : ''} `}>
                            <Link to='/Publicite' onClick={() => setDatapublicitesHomme(data)} className={`font-bold  cursor-pointer hover:no-underline  focus:no-underline  hover:text-[#5dca32] focus:text-[#5dca32] text-[#5dca32]   ${mobile2 ? 'mb-5 text-[13px]' : mobile1 ? 'text-[18px]' : 'text-[30px]'}  `}>{mobile3 ? data.titre && data.titre.length > 20 ? data.titre.slice(0, 15) + "..." : data.titre : data.titre}</Link>
                            <div className={`${mobile2 ? 'text-[11px]' : mobile1 ? 'text-[14px] ' : 'text-[18px]'}`}>
                                {mobile3 ? data.description && data.description.length > 50 ? data.description.slice(0, 50) + "...." : data.description : data.description && data.description.length > 594 ? data.description.slice(0, 590) + "...." : data.description}
                            </div>
                            <div className={`mt-4 text-[#5dca32] ${mobile1 ? 'text-[12px]' : ''}`}>Publié  {formatDate(data.createdAt)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Publicite