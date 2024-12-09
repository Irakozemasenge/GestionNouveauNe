import React from 'react'
import { Link } from 'react-router-dom'

function Profil() {
    return (
        <div className='w-full  flex justify-start flex-col items-center'>
            <div className='w-full flex justify-start p-3'>
                <Link to='/'>
                    Aller à la page d'accueil
                </Link>
            </div>
            <div className="flex flex-col mt-4 items-center border border-orange-600 rounded-xl p-2 w-[30em] h-max ">
                <div className='text-[23px]'>Votre donner de compte</div>
                <div className="  p-2 rounded-xl overflow-hidden  m-1 w-[25em] h-[25em]" >
                    <img src="https://irakoze.burundientempsreel.com/uploads/Photo/LENGA2.png" alt="" className=' w-full object-contain h-full' />
                </div>
                <div className="w-full">
                    <div className='text-[18px] font-sans'>
                        <p>Nom: NDAYIZEYE</p>
                        <p>Prenom: Telesphore</p>
                        <p>Tel: +209 790 322 829</p>
                        <p>Email: telecomtelesphore@gmail.com</p>
                    </div>
                </div>
                <div className="w-full flex justify-end ">
                    <Link to='/' className='bg-green-400 mr-6 text-white p-1 rounded hover:bg-green-600 transition-all'>Retour</Link>
                    <Link to="/Profil/modifier" className='bg-orange-400 text-white p-1 rounded hover:bg-orange-600 transition-all'>Modifier</Link>
                </div>
            </div>
        </div>
    )
}

export default Profil


