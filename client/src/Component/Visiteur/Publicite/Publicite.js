import React, { useEffect, useState } from 'react'
import Remerciement from '../HomeVisitor/Remerciement'
import { useTheme } from '../UseContext/ThemeContext'
import axios from 'axios'
import ReactPlayer from 'react-player'
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
function Publicite() {
    const [isloading, SetIsLoading] = useState(true)
    const hundleLoading = () => {
        SetIsLoading(false)
    }
    const [publicites, setpublicites] = useState([]);
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8005/event/getAllevents`);
                setpublicites(response.data.publicites);

            } catch (error) {
                console.error('Erreur lors de la récupération des events :', error);

            }
        };

        fetchData();
    }, []);


    const { datapublicitesHomme } = useTheme();
    const [dataServciClicked, GetDatapublicites] = useState(publicites[0]);

    useEffect(() => {
        if (datapublicitesHomme) {
            GetDatapublicites(datapublicitesHomme);
            localStorage.setItem('data', JSON.stringify(datapublicitesHomme));
        }
    }, [datapublicitesHomme]);

    const upcreatedAtDatapublicites = (newValue) => {
        GetDatapublicites(newValue);
        localStorage.setItem('data', JSON.stringify(newValue));
    };


    useEffect(() => {
        const savedDatapublicitesClicked = localStorage.getItem('data');
        if (savedDatapublicitesClicked) {
            GetDatapublicites(JSON.parse(savedDatapublicitesClicked));
        }
    }, []);

    const formatDate = date => {
        return format(new Date(date), "'Le 'd, MMMM yyyy", { locale: fr });
    };

    const [mobile, GetMobile] = useState(window.innerWidth < 655)
    const [mobile3, GetMobile3] = useState(window.innerWidth < 485)


    useEffect(() => {
        const HundleSize = () => {
            GetMobile(window.innerWidth < 655)
            GetMobile3(window.innerWidth < 485)
        }

        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, [])





    return (
        <div id='scroll' className='w-fullh-max p-2'>
            <div className='w-full  h-max'>
                <div className={`font-bold  text-[#5dca32] ${mobile ? 'text-[20px]' : 'text-[30px]'}`}>Les publicités</div>
                <div className='w-full mt-4'>
                    <div className={`font-bold ${mobile ? 'text-[20px] pl-5' : 'text-[27px pl-9 '}`}>{dataServciClicked && dataServciClicked.titre}</div>
                    <div className='text-[#5dca32] pl-9 text-[15px] '>Publié  {dataServciClicked && formatDate(dataServciClicked.createdAt)}</div>
                    <div className='flex justify-center w-full'>
                        <div className={`flex justify-center w-[95vw] ${mobile3 ? 'h-max' : 'h-[95vh]'}`}>
                            <div className='w-full h-full  flex justify-center items-center  relative rounded-md overflow-hidden'>
                                {dataServciClicked && dataServciClicked.link &&
                                    youtubeRegex.test(dataServciClicked.link) ? (

                                    <ReactPlayer
                                        url={dataServciClicked.link}
                                        controls
                                        className="w-full h-full  object-cover"
                                    />
                                ) : (
                                    <img
                                        src={`http://localhost:8005/uploads/publicites/${dataServciClicked && dataServciClicked.photo}`}
                                        onLoad={hundleLoading} className='w-full h-full object-contain object-center ' alt='   ' />
                                )
                                }

                                {isloading &&
                                    <div className="absolute top-0 w-full h-full left-0 flex items-center justify-center  bg-gray-50 spinners">
                                        <svg className="animate-spin h-8 w-8 text-[#5dca32]" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="green" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.598A4.002 4.002 0 008 12H6v5.291z"></path>
                                        </svg>
                                    </div>
                                    }

                            </div>
                        </div>
                    </div>
                    <div className='pl-9 text-[15px] sm:text-[18px] mt-3 whitespace-break-spaces leading-8'>{dataServciClicked && dataServciClicked.description}</div>
                </div>
            </div>
            <div className='sm:mt-5 sm:pl-9'>
                <div className='text-[20px] sm:text-[30px] font-bold text-[#5dca32]'>Voir aussi</div>
                <div>

                    <div>
                        {publicites.map((data, index) => (
                            dataServciClicked && dataServciClicked.titre === data.titre ?

                                <button disabled key={index} className='flex    text-[#5dca32]   transition-all  my-5 text-[18px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={mobile3 ? '16' : '25'} height={mobile3 ? '16' : '25'} fill="currentColor" class="bi bi-eye-fill mr-4" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                    </svg>
                                    <div className='max-sm:text-[13px] text-nowrap text-ellipsis overflow-hidden' key={index}>{data.titre}</div>
                                </button>
                                :
                                <a onClick={() => upcreatedAtDatapublicites(data)} key={index} href='#scroll' className='flex  hover:no-underline cursor-pointer  hover:border-l-4 hover:text-gray-400 border-[#5dca32] transition-all  my-5 text-[18px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={mobile3 ? '16' : '25'} height={mobile3 ? '16' : '25'} fill="currentColor" class="bi bi-arrow-right mr-4" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                    </svg>
                                    <div className='ml-2'>
                                        <div className='text-[20px] hover:no-underline w-max transition-all duration-100  cursor-pointer text-nowrap text-ellipsis overflow-hidden'>{data.titre}</div>
                                        <div className='text-[11px]'>Publié  {formatDate(data.createdAt)}</div>
                                    </div>
                                </a>
                        ))}
                    </div>
                </div>
            </div>
            <Remerciement />
        </div>
    )
}

export default Publicite