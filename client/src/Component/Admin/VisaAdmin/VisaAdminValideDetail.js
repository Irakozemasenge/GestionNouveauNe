/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../Visiteurs/Footer/Footer'
import NavBarsVisaAdmin from './NavBarsVisaAdmin'

function VisaAdminValideDetail() {
    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 688)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    const allAvantages = [
        'Premier élément',
        'Deuxième élément',
        'Troisième élément',
        'Quatrième élément',
        'Cinquième élément',
        'Sixième élément',
        'Septième élément',
        'Huitième élément',
        'Neuvième élément',
        'Dixième élément',
        'Onzième élément',
        'Douzième élément',
    ];


    return (
        <div className='w-full'>
            <NavBarsVisaAdmin />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className='flex '>
                    <div className='w-full g p-3  rounded-xl h-max  m-2'>
                        <div className='text-orange-600 font-bold text-[25px]'>Rwanda</div>
                        <div className='text-orange-600 font-bold text-[20px]'>Visa conférence</div>
                        <div className='mt-2'>
                            <div className='font-medium'>Nom complet:<span className='font-bold'>MUGISHA Elias</span> </div>
                            <div className='font-medium'>Tel:<span className='font-bold'>3830049393</span> </div>
                            <div className='font-medium'>Adresse:<span className='font-bold'>Kirunndo Vumbi</span> </div>
                            <div className='font-medium'>Email:<span className='font-bold'>KirunndoVumbi@gmail.com</span> </div>
                            <div className='font-medium'>Description:<span className='font-bold'>dhhhd dhhddhd jfjfjf</span> </div>
                            <div className='font-medium'>Date de commande:<span className='font-bold'>le 24 janvier 2024</span></div>
                            <div className='font-medium'>Status:<span className='font-bold text-blue-600 cursor-none '>En attente</span></div>
                        </div>
                        <div className='text-[15px] sm:text-[17px] mt-5'>
                            <div className='text-[20px]'>Avantages</div>
                            <ul className='list-none'>
                                {allAvantages.map((data, index) => (
                                    <li key={index} className='list-hyphen'>-{data}</li>
                                ))}
                            </ul>
                        </div>
                        <div className=' flex mt-4'>
                            <Link to='/visa/valid' className='w-max mx-3 px-2 block  hover:text-white focus:text-white text-center cursor-pointer py-1.5 mt-1 bg-fuchsia-600 text-white rounded'>
                                Retourner
                            </Link>
                            <div className='w-max mx-3 px-2 block  hover:text-white focus:text-white text-center cursor-pointer py-1.5 mt-1 bg-red-400 hover:bg-red-600 transition-all duration-500  text-white rounded'>
                                Supprimer
                            </div>
                        </div>
                    </div>

                </div>

                <Footer />
            </div>
        </div>
    )
}

export default VisaAdminValideDetail
