/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom';
import axios from 'axios';

function FootentContent() {
    const [mobile, Setmobile] = useState(window.innerWidth < 617);
    useEffect(() => {
        const hundleSize = () => {
            Setmobile(window.innerWidth < 617)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    const [socialMediaList, setSocialMediaList] = useState([]);

    useEffect(() => {
        const fetchSocialMedia = async () => {
            try {
                const response = await axios.get('http://localhost:8005/socialmedia');
                setSocialMediaList(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des réseaux sociaux:', error);
                //toast.error('Erreur lors de la récupération des réseaux sociaux');
            }
        };
        fetchSocialMedia();
    }, []);
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <svg className=" relative  " preserveAspectRatio="none" viewBox="0 0 100 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,10  C20,35 40,5 60,15 C80,25 90.5,0 100,15 L100,30 L0,30 Z" fill="#5dca32"></path>
            </svg>

            <div className={`bg-[#5dca32] w-full text-white h-max p-2 flex ${mobile ? 'flex-col' : 'justify-around items-center'}  z-10 font-medium `}>
                {/* <div className="flex flex-col  p-2 items-start leading-[1.6em] max-w rounded ">
                    <div className='font-bold font-sans underline cursor-default'>Branche</div>
                    <Link to='/bourse' className='flex text-white w-full p-1 transition-all hover:underline'>Recherche de bourse</Link>
                    <Link to='/universite' className='flex text-white w-full p-1 transition-all hover:underline'>Recherche d'Etudes</Link>
                    <Link to='/travail' className='flex text-white w-full p-1 transition-all hover:underline'>Recherche de travail</Link>
                    <Link to='/evenement' className='flex text-white w-full p-1 transition-all rounded hover:underline'>Evenement</Link>
                </div> */}

                <div className="flex flex-col  p-2 items-start leading-[1.6em] max-w rounded ">
                    <div className='font-bold font-sans underline cursor-default'>Reseaux Sociaux</div>

                    {socialMediaList.map((socialMedia, index) => (
                        <div key={index} className='flex items-center '>
                            <div>
                                <a href={socialMedia.link} className='flex my-2 items-center text-blue-950' target='_blank'>
                                    <div dangerouslySetInnerHTML={{ __html: socialMedia.icon }}></div>

                                    <div className='ml-1 text-blue-950'>
                                        {socialMedia.nom}
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FootentContent
