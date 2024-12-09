import React, { useEffect, useState } from 'react';
import Remerciement from '../HomeVisitor/Remerciement';
import axios from 'axios';
import HoraireTravail from '../HoraireTravail/HoraireTravail';

const Propos = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get('http://localhost:8005/coord')
            .then(response => {
                setData(response.data);

            })
            .catch(error => {
                console.error("Erreur lors de la récupération des coordonnées: ", error);

            });
    }, []);

    const [mobile2, Setmobile2] = useState(window.innerWidth < 584);
    useEffect(() => {
        const hundleSize = () => {
            Setmobile2(window.innerWidth < 584)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className=" py-2 sm:py-10">
            <div className="container mx-auto px-0.5 sm:px-4">
                <h2 className="sm:text-3xl text-[20px] font-bold mb-6 text-[#5dca32]">À propos de Notre Cabinet</h2>
                <p className="sm:text-[25px] text-[15px]  leading-relaxed">
                    Bienvenue chez <span className="font-bold text-[#5dca32]">HATHA S.U</span> ! Nous sommes un cabinet d'avocats spécialisé dans les affaires de tribunal, offrant une expertise juridique approfondie et un service personnalisé à nos clients. Notre équipe dévouée est composée d'avocats expérimentés qui se consacrent à la défense des intérêts de nos clients dans les litiges civils, pénaux et commerciaux.
                </p>
                <p className="sm:text-lg text-[15px]  leading-relaxed mt-4">
                    À <span className="font-bold text-[#5dca32]">HATHA S.U</span>, nous comprenons l'importance des enjeux juridiques auxquels nos clients sont confrontés. Que vous ayez besoin d'une représentation lors de procédures judiciaires, de conseils juridiques stratégiques ou de services de négociation de plaidoyer, nous sommes là pour vous guider à chaque étape du processus.
                </p>
                <p className="sm:text-lg text-[15px]  leading-relaxed mt-4">
                    Notre cabinet se distingue par son engagement envers l'excellence juridique, l'intégrité professionnelle et la recherche de résultats positifs pour nos clients. Nous croyons fermement à la défense éclairée et efficace des droits de nos clients, tout en étant attentifs à leurs besoins et préoccupations spécifiques.
                </p>
                <p className="sm:text-lg text-[15px]  leading-relaxed mt-4">
                    Que vous soyez confronté à un litige complexe, à des poursuites judiciaires ou à des négociations de plaidoyer, notre équipe est prête à vous représenter avec détermination et compétence. Nous nous engageons à fournir des services juridiques de haute qualité et à construire des relations durables avec nos clients basées sur la confiance et le professionnalisme.
                </p>
                <p className="sm:text-lg text-[15px]  leading-relaxed mt-4">
                    Explorez notre site pour en savoir plus sur nos services spécialisés en matière de tribunal et sur la manière dont nous pouvons vous assister dans vos affaires juridiques. N'hésitez pas à nous contacter pour discuter de votre situation spécifique et découvrir comment nous pouvons vous aider à atteindre vos objectifs juridiques.
                </p>
                <div className='mt-5 mb-3   text-[15px] text-[#5dca32]'>
                    Prenez contact et exprimez vos besoins
                </div>
                <div className='w-full flex flex-col  justify-around'>
                    <a href={`whatsapp://send?phone=${data.tel}`} className='flex hover:no-underline  w-max mb-5 focus:no-underline'>
                        <div className={`bg-green-100   rounded-full flex justify-center bi text-[#5dca32] items-center ${mobile2 ? ' w-[3em] my-2 h-[3em]' : ' p-3 w-[4em] h-[4em]'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                            </svg>
                        </div>
                        <div className=' ml-1'>
                            <div className='text-gray-400 flex hover:no-underline focus:no-underline'>WhatsApp</div>
                            <div className='mt-2 text-[#5dca32] flex hover:no-underline focus:no-underline'>{data.tel}</div>
                        </div>
                    </a>
                    <a target='_blank' href={`mailto:${data.email}`} className='flex w-max mb-5 hover:no-underline focus:no-underline' rel="noreferrer">
                        <div className={`bg-green-100   rounded-full flex justify-center bi text-[#5dca32] items-center ${mobile2 ? ' w-[3em] my-2 h-[3em]' : ' p-3 w-[4em] h-[4em]'}`}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi text-[#5dca32] bi-telephone-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                            </svg>
                        </div>
                        <div className=' ml-1'>
                            <div className='text-gray-400 flex hover:no-underline focus:no-underline'>Email</div>
                            <div className='mt-2 text-[#5dca32] flex hover:no-underline focus:no-underline'>{data.email}</div>
                        </div>
                    </a>
                    <div className='flex hover:no-underline focus:no-underline'>
                        <div className={`bg-green-100 p-3  rounded-full flex justify-center items-center ${mobile2 ? ' w-[3em] my-2 h-[3em]' : ' p-3 w-[4em] h-[4em]'} `}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi text-[#5dca32] bi-telephone-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                            </svg>
                        </div>
                        <div className=' ml-1'>
                            <div className='text-gray-400 flex hover:no-underline focus:no-underline'>Addresse</div>
                            <div className='mt-2 text-[#5dca32] flex hover:no-underline focus:no-underline'>{data.address}</div>
                        </div>
                    </div>
                </div>
                <HoraireTravail />
                <p className="sm:text-lg  leading-relaxed mt-4">
                    Faites confiance à <span className="font-bold text-[#5dca32]">HATHA S.U</span> pour une représentation légale compétente et engagée dans les affaires de tribunal. Nous sommes là pour défendre vos droits et protéger vos intérêts avec détermination.
                </p>
            </div>
            <Remerciement />
        </div>
    );
};

export default Propos;
