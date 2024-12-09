import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FadeLoader } from 'react-spinners';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';

function HoraireTravail() {
    const [horaire, sethoraire] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fonction pour récupérer les horaire depuis le backend
        const fetchhoraire = async () => {
            try {
                const response = await axios.get('http://localhost:8005/horaire');
                sethoraire(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des horaire :', error);
                setLoading(false);
            }
        };


        fetchhoraire();
    }, []);

    function formatHeure(heure) {
        const [hh, mm, ss] = heure.split(':');
        return `${hh}h ${mm}`;
    }


    const [mobile, GetMobile] = useState(window.innerWidth < 528)

    useEffect(() => {
        const HundleSize = () => {
            GetMobile(window.innerWidth < 528)
        }

        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, [])

    return (
        <div className='p-2 w-full'>
            {loading && <SpinnerDemarage />}
            <div className=' mt-10 text-[15px] sm:text-[22px]'>Nous sommes disponibles pour vous servir {`${horaire && horaire.length} jours / 7`}</div>
            <div className='w-full'>
                <table className='w-full border-2 border-[#5dca32] rounded-full'>
                    <thead>
                        <tr>
                            <th class={`border border-gray-300 text-start ${mobile ? 'text-[12px] text-center' : 'text-[20px]'} py-2 px-4 text-[#5dca32]`}>Jour</th>
                            <th class={`border border-gray-300 text-start ${mobile ? 'text-[12px] text-center' : 'text-[20px]'} py-2 px-4 text-[#5dca32]`}>Heure d'ouverture</th>
                            <th class={`border border-gray-300 text-start ${mobile ? 'text-[12px] text-center' : 'text-[20px]'} py-2 px-4 text-[#5dca32]`}>Heure de fermeture</th>
                        </tr>
                    </thead>

                    <tbody className='w-full'>
                        {loading ? (

                            <div className="flex justify-center items-center">
                                <FadeLoader color="#5dca42" loading={loading} size={15} />
                            </div>
                        ) : (
                            horaire.map((data, index) => (
                                <tr>
                                    <td class="border border-gray-300 py-2 px-4">{data.jours}</td>
                                    <td class="border border-gray-300 py-2 px-4">{formatHeure(data.heuredebut)}</td>
                                    <td class="border border-gray-300 py-2 px-4">{formatHeure(data.heurefin)}</td>
                                </tr>
                            ))
                        )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default HoraireTravail
