/* eslint-disable eqeqeq */
import React from 'react'
import { Link } from 'react-router-dom'

function NavBarsApropsAdmin() {
    const url = window.location.pathname;
    return (
        <div className='text-[20px]  h-[7vh] flex hidden justify-between items-end'>
            <Link className={`w-full border-b-2 pl-2 ${(url == "/propo" || url == "/propo/Modifier" || url == "/propo/AddMore" || url == "/propo/detailTitre" || url == "/propo/edit") && "border-fuchsia-600 hover:text-fuchsia-600 focus:text-fuchsia-600 text-fuchsia-600"}`} to='/propo'>Coordonner physique</Link>
            <Link className={`w-full border-b-2 ${(url == "/propo/ajouter") && "border-fuchsia-600 hover:text-fuchsia-600 focus:text-fuchsia-600 text-fuchsia-600"}`} to='/propo/ajouter' >Réseaux sociaux</Link>
        </div>
    )
}

export default NavBarsApropsAdmin