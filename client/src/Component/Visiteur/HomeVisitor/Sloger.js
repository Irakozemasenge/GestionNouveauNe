import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal'
function Sloga({ HundlwScrollTop }) {
    const [mobile2, Setmobile2] = useState(window.innerWidth < 829);
    const [mobile1, Setmobile1] = useState(window.innerWidth < 826);
    const [mobile, Setmobile] = useState(window.innerWidth < 418);
    const [mobile3, Setmobile3] = useState(window.innerWidth < 324);

    useEffect(() => {
        const hundleSize = () => {
            Setmobile2(window.innerWidth < 829)
            Setmobile(window.innerWidth < 418)
            Setmobile1(window.innerWidth < 826)
            Setmobile3(window.innerWidth < 324)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])


    const revealRefWhite = useRef(null);
    const revealRefDescripts = useRef(null);

    useEffect(() => {


        ScrollReveal().reveal(revealRefWhite.current, {
            duration: 1000,
            origin: 'left',
            distance: '30%',
            delay: 200,
            easing: 'ease',
            reset: true
        });

        ScrollReveal().reveal(revealRefDescripts.current, {
            duration: 1000,
            origin: 'bottom',
            distance: '30%',
            delay: 400,
            easing: 'ease',
            reset: true
        });
    }, []);

    return (
        <div className={`w-full  bg-transparent relative overflow-hidden ${mobile ? 'h-[40vh]' : mobile2 ? 'h-[50vh]' : mobile1 ? 'h-[100vh] ' : 'h-[90vh]'}`}>
            <div className='w-full h-full '>
                <img className='w-full h-full  object-fill animation bg-white' alt='   ' src='images/avocat-juge-marteau-echelle-justice-table-bois-dans-concept-droit-justice-salle-audience_795422-8718.avif' />
            </div>
            <div className='absolute  top-0.5 sm:top-2  items-center w-full '>
                <div ref={revealRefWhite} className={` text-center  text-green-600 strockText ${mobile ? 'text-[18px]' : mobile2 ? "text-[26px] w-[90%]" : 'text-[60px] w-[89%]'} `}>Avocat spécialisé en droit pénal et défense juridique en tribunal</div>
                <div ref={revealRefDescripts} className={` text-white stroke-text  text-center ${mobile ? 'text-[15px]' : mobile2 ? 'text-[20px]  mt-2' : 'text-[30px] mt-10 '}`}>
                    Nous avons une expertise dans le domaine du droit pénal et
                    la capacité de l'avocat à fournir une représentation et une défense efficaces devant un tribunal lors de procédures judiciaires.
                </div>

                <div className="flex justify-center items-center mt-5">

                    <Link onClick={HundlwScrollTop} to="/demandServer" className={`w-max   animate-pulse cursor-pointer  hover:scale-105 transition-all duration-500 border border-green-600 bg-white text-green-600 font-bold  rounded-3xl text-center ${mobile2 ? 'text-[15px] mt-5 px-3 py-2' : 'text-[20px] mt-[30px] p-3'} `}>
                        Prenez un premier rendez-vous
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sloga
