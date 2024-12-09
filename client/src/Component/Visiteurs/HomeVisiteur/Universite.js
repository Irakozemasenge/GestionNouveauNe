import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Universite() {
    const [mobile, Setmobile] = useState(window.innerWidth < 1251);
    const [mobile1, Setmobile1] = useState(window.innerWidth < 804);
    useEffect(() => {
        const hundleSize = () => {
            Setmobile(window.innerWidth < 1251)
            Setmobile1(window.innerWidth < 804)
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
        <div className={`flex  flex-row-reverse  sm:p-5 my-5 ${mobile1 ? 'flex-col' : ''}`}>
            <div className={`h-max p-2 ${mobile1 ? 'w-full' : 'w-1/2'} `}>
                <div className={`font-serif text-gray-400 ${mobile ? 'text-[16px]' : 'text-[20px]'}   pointer-events-none`}>Comment fonctionne ABAHS</div>
                <div className={`font-serif text-orange-900 ${mobile ? 'text-[20px]' : 'text-[30px]'}  pointer-events-none `}>Poursuivez Vos Études à l'Université</div>
                <div className="w-full h-full rounded-xl relative overflow-hidden">
                    {loading && (
                        <div className="absolute inset-0 flex bg-white items-center justify-center">
                            <svg className="animate-spin h-8 w-8 text-gray-600" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.598A4.002 4.002 0 008 12H6v5.291z"></path>
                            </svg>
                        </div>
                    )}
                    <img
                        onLoad={handleLoad}
                        className="w-full h-full" src='image/etude etranger (2).jpg' alt="    "
                    />
                </div>
            </div>
            <div className={`h-max  ${mobile1 ? 'w-full p-3' : 'w-1/2 ml-5 p-2'} `}>
                <div className={`h-max w-full `}>
                    <div className={`border-b pb-4 ${mobile ? 'text-[15px] ' : 'text-[28px]'} pointer-events-none`}>
                        L'université offre une richesse de connaissances dans divers domaines, offrant
                        ainsi l'opportunité d'approfondir ses compétences et ses intérêts. Qu'il s'agisse
                        des sciences, des sciences humaines, des arts ou des affaires, l'université propose
                        des programmes spécialisés et des cours dispensés par des experts. Cette immersion
                        dans des disciplines variées expose à de nouvelles idées, des théories innovantes et des avancées récentes,
                        enrichissant ainsi la compréhension et renforçant l'expertise des étudiants.
                    </div>
                </div>
                <div className='flex items-center flex-wrap w-full'>
                    <div className='pointer-events-none'> Pour plus d’informations,</div>
                    <Link to='/universite' className="w-max block ml-1  h-max px-2 py-1 cursor-pointer font-extrabold ">
                        veuillez nous contacter !
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Universite
