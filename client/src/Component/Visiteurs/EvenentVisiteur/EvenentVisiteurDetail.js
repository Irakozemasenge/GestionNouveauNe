import React from 'react'
import { Link } from 'react-router-dom'
import { dataEvenent } from '../../Data/Data'
import ReactPlayer from 'react-player'
function EvenentVisiteurDetail() {
    const UrVideo = dataEvenent[1]

    return (
        <div className='p-3 '>
            <Link to='/evenement' className='my-1'>
                Retour
            </Link>
            <div className='w-full h-full flex flex-col items-center'>
                <div className='h-[87vh] w-[90%] overflow-hidden rounded-xl'>
                    <div className='w-full h-full'>
                        {/* <img src='../image/Heidelberg_en_Allemagne.jpg' alt='      ' className='w-full h-full object-cover object-center' /> */}
                        <ReactPlayer url={dataEvenent[1].UrlData}
                            controls
                            className="overflow-hidden inline object-cover object-center w-full h-full"
                        />
                    </div>
                </div>
                <div className='sm:text-[30px] text-[22px] w-full text-left mt-5'>{dataEvenent[1].titre}</div>
                <div className='text-[18px] text-gray-500'>
                    Parce que contrairement à des croyances souvent répandues, la science n’a pas pour but de fournir des vérités universelles, mais des vérités “vraies”.
                    Pour cela, chaque théorie a un domaine d’application précisément défini, et des modes opératoires extrêmement bien documentés.
                    Cela signifie donc, que n’importe qui doit pouvoir à partir de la description de la théorie, et en l’appliquant correctement, reproduire ses résultats.
                    Une théorie non reproductible sera peut-être utile à Madame Irma, mais pas à un scientifique.
                    Parce que contrairement à des croyances souvent répandues, la science n’a pas pour but de fournir des vérités universelles, mais des vérités “vraies”.
                    Pour cela, chaque théorie a un domaine d’application précisément défini, et des modes opératoires extrêmement bien documentés.
                    Cela signifie donc, que n’importe qui doit pouvoir à partir de la description de la théorie, et en l’appliquant correctement, reproduire ses résultats.
                    Une théorie non reproductible sera peut-être utile à Madame Irma, mais pas à un scientifique.
                </div>
                <div className='mt-2 w-full text-[18px]'>
                    <div>Organisé par: <span className='font-bold'>Ir Masenge</span></div>
                    <div className='font-medium'>à <span className='font-bold'>Lundi,le 15/09/2024 à 12h:54min</span></div>
                </div>
            </div>
            <div className='w-full flex justify-center mt-5'>
                <div className='sm:w-[70em] h-max'>
                    <div className='w-full text-center text-[17px] text-gray-400'>
                        ABAHS est le meilleur site Web de bourses pour les étudiants internationaux,de recherche d'études et de recherche de travail à l'étrange cherchant à répondre à leurs besoins financiers.
                        <br />                        <br /> Parcourez les listes complètes de bourses disponibles pour une grande variété de destinations à l’étranger. Commencez votre recherche de bourse en choisissant un lieu d'étude et en sélectionnant l'une des plus de 1000 opportunités d'aide financière aux étudiants disponibles au Royaume-Uni, en Allemagne, en Finlande, en France, en Espagne, aux Pays-Bas, en Chine, aux États-Unis, en Australie et bien d'autres.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EvenentVisiteurDetail
