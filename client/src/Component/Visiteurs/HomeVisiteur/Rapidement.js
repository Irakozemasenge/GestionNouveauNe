/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';

function Rapidement() {
    const [mobile1, Setmobile1] = useState(window.innerWidth < 804);
    const [loadings, Setloadings] = useState(true);

    useEffect(() => {
        const hundleSize = () => {
            Setmobile1(window.innerWidth < 804)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])


    const [pageSize, setPageSize] = useState(5);
    const [bourses, setBourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/bourse/getAllBourses?size=${pageSize}`);
                setBourses(response.data.bourses);
                Setloadings(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des bourses :', error);
                Setloadings(false)
            }
        };

        fetchData();
    }, [pageSize]);
    return (
        <div className='w-full p-2 sm:px-4'>
            {loadings && <SpinnerDemarage />}
            <div className='w-[95%]'>
                <div className={`${mobile1 ? 'text-[11px] text-center' : 'text-[20px]'}`}>  ABAHS-Jobconnect annonce les nouvelles bourses disponibles à partir du 10 mars 2024 à la fin de cette  année :</div>
                <div className={`flex gap-1 flex-wrap  justify-around w-full`}>
                    {bourses.map((bourse, index) => (
                        <div className={` p-3  ${mobile1 ? 'w-full' : 'w-[20em]'} border-[#ca3232] bg-[#ffa60000] rounded-xl border h-max  m-2`}>
                            <div className={`text-[#ca3232] font-bold ${mobile1 ? 'text-[13px]' : 'text-[20px]'}`}>{bourse.titre && (bourse.titre.length > 20 ? bourse.titre.slice(0, 18) + '..' : bourse.titre)}</div>
                            <div className='mt-2'>
                                <div className={`${mobile1 ? 'text-[11px] ' : 'text-[15px]'} my-0.5`}>Pays: {bourse.pays}</div>
                                <div className={`${mobile1 ? 'text-[11px] ' : 'text-[15px]'} my-0.5`}>Domaine: {bourse.domaine}</div>
                                <div className={`${mobile1 ? 'text-[11px] ' : 'text-[15px]'} my-0.5`}>Niveau: {bourse.niveau}</div>
                                <div className={`${mobile1 ? 'text-[11px] ' : 'text-[15px]'} my-0.5`}>Fin d'inscription:<span className='font-bold'>
                                    {new Date(bourse.fin).toLocaleDateString()}
                                </span></div>
                            </div>
                        </div>
                    ))}
                </div>
                <span className={`text-yellow-600 font-bold underline ${mobile1 ? 'text-[15px] ' : 'text-[18px]'}`}> N.B</span>:
                <span className={`${mobile1 ? 'text-[11px]' : 'text-[17px]'} italic`}>
                    Beaucoup d'autres bourses d'études sont disponibles, inscrivez-vous à notre plateforme ABAHS, pour rester informés des bourses disponibles.
                    .C'est n'est pas demain c'est maintenant <Link to='/bourse' >Voir plus</Link>
                </span>
            </div>
        </div>
    )
}

export default Rapidement
