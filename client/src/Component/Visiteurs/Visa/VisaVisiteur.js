
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Adresse from '../Adresse/Adresse';
function VisaVisiteur() {

    const navig = useNavigate()

    const [mobile, Setmobile] = useState(window.innerWidth < 1092);
    const [mobile1, Setmobile1] = useState(window.innerWidth < 889);
    const [mobile2, Setmobile2] = useState(window.innerWidth < 460);
    const [mobile3, Setmobile3] = useState(window.innerWidth < 355);

    useEffect(() => {
        const hundleSize = () => {
            Setmobile(window.innerWidth < 1092)
            Setmobile1(window.innerWidth < 889)
            Setmobile2(window.innerWidth < 460)
            Setmobile3(window.innerWidth < 355)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    const [categorie, GetCategorie] = useState('')
    const HundleCategories = e => {
        GetCategorie(e.target.value)
    }

    categorie === 'travail' && navig('/travail')
    categorie === 'conférence' && navig('/VisaVisiteur/exist')
    categorie === 'visite' && navig('/VisaVisiteur/exist')
    categorie === 'tourisme' && navig('/VisaVisiteur/exist')
    categorie === 'affaire' && navig('/VisaVisiteur/exist')
    categorie === 'immigration' && navig('/VisaVisiteur/exist')
    return (
        <>

            <div className={`relative rounded-b-3xl border-b  bg-slate-50 flex p-2 items-center ${mobile1 ? 'flex-col-reverse' : 'flex-row-reverse'}`}>
                <div className={`h-full w-ull flex justify-center  ${mobile1 ? 'w-full mt-5' : 'w-1/2'}`}>
                    <div className='mt-5 max-sm:p-3 text-[14px] sm:text-[22px]  sm:p-4'>
                        <div className={`mt- font-serif  ${mobile2 ? 'text-[25px] ' : mobile ? 'text-[40px] ' : 'text-[60px] '} w-full text-center`}>VISA à l'étranger</div>

                        <div className='w-full sm:pl-5'>
                            <div className={`mt-2 font-serif  ${mobile2 ? 'text-[16px] ' : mobile ? 'text-[18px] ' : 'text-[23px] '} w-full`} >  Bienvenue sur le site ABAHS, votre partenaire de confiance pour les services de visa
                            </div>
                            <ul className='sm:text-[15px] text-[11px]'>
                                <li className='my-1'>
                                    -Visa travail.
                                </li>
                                <li className='my-1'>-Visa conférences.</li>
                                <li className='my-1'>-Visa visites.</li>
                                <li className='my-1'>-Visa visites.</li>
                                <li className='my-1'>-Visa tourisme.</li>
                                <li className='my-1'>-Visa affaire.</li>
                                <li className='my-1'>-Visa migration.</li>
                            </ul>
                            <div>Nous sommes là pour répondre à vos besoins.</div>
                        </div>
                    </div>
                </div>
                <div className={`h-max ${mobile1 ? 'w-full  p-0.5' : 'w-1/2   p-2'} flex`}>
                    <div className="w-full h-full rounded-xl overflow-hidden">
                        <img className="w-full h-full" src='./image/Vizaa.webp' alt="    " />
                    </div>
                </div>
            </div>


            <div className='mt-5 p-1 sm:p-3'>
                Nous comprenons l'importance d'obtenir un visa sans tracas et dans les délais pour réaliser vos projets professionnels, participer à des conférences internationales, explorer de nouvelles destinations, ou encore pour vous installer dans un nouveau pays. C'est pourquoi nous mettons à votre disposition notre expertise et notre expérience pour faciliter votre processus de demande de visa.
            </div>

            <div className='mx-2 mt-2'>
                Si vous êtes intéressé, inscrivez-vous ci-dessous.
            </div>

            <div className={`bg-white border rounded-md p-3 mx-1 sm:ml-10  w-[95%] sm:w-[85%] mt-5`}>
                <div className='text-gray-500 max-sm:text-center'>Pour faciliter votre processus de demande de visa, veuillez sélectionner la catégorie appropriée parmi les options</div>
                <div className={``}>
                    <div className='w-full flex mt-3'>
                        <div className={` w-full mr-0.5`}>
                            <div className={`${mobile2 ? 'text-[15px] ' : 'text-[20px]'}`}>Catégorie</div>
                            <select onChange={HundleCategories} className={` ${mobile3 ? 'px-1 py-2' : 'py-3  px-2'} bg-transparent border  border-gray-300 cursor-pointer rounded outline-none focus:border focus:border-orange-700 w-full mt-1`}>
                                <option className="text-black cursor-pointer hidden" value="">Séléctionez le VISA</option>
                                <option className="text-black cursor-pointer" value="travail"> VISA  travail</option>
                                <option className="text-black cursor-pointer" value="conférence"> VISA conférence</option>
                                <option className="text-black cursor-pointer" value="visite"> VISA  visite</option>
                                <option className="text-black cursor-pointer" value="tourisme"> VISA  tourisme</option>
                                <option className="text-black cursor-pointer" value="affaire"> VISA affaire</option>
                                <option className="text-black cursor-pointer" value="immigration"> VISA immigration</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <Adresse />
        </>
    )
}

export default VisaVisiteur
