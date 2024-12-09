import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../Visiteurs/Footer/Footer';
import NabBarpartenaire from './NabBarpartenaire';
import { decryptData } from '../../../encryptionModule';
import axios from 'axios';

function DetailPartenaireAdmin() {
    const [mobile1, setMobile1] = useState(window.innerWidth < 688);
    useEffect(() => {
        const handleResize = () => {
            setMobile1(window.innerWidth < 688);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const { id } = useParams();
    const partenaireId = decryptData(id);
    const [partenaire, setPartenaire] = useState({});

    useEffect(() => {
        const fetchPartenaire = async () => {
            try {
                const response = await axios.get(`https://speedreal.abahs-jobconnect.com/partenaire/getOneById/${partenaireId}`);
                setPartenaire(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'événement :', error);
            }
        };
        fetchPartenaire();
    }, [partenaireId]);

    return (
        <div className="w-full font-sans">
            <NabBarpartenaire />
            <div className={`w-full  ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <Link to='/partenaire' className='ml-1  font-semibold'>
                    Retour
                </Link>
                <div className='flex flex-wrap h-full'>
                    <div className='w-full p-3 m-2  shadow-lg'>
                        <div className='font-serif text-3xl mb-3 text-purple-900'>Société : {partenaire.nom}</div>
                        <div className='font-serif text-xl mb-3 text-blue-600'>Site : <a href={partenaire.siteweb} className='underline' target='_blank' rel='noreferrer'>{partenaire.siteweb}</a></div>
                        <div className='font-serif text-xl mb-3 text-green-900'>Description : {partenaire.description}</div>
                        <div className='max-w-[30em] max-h-[30em] mb-3'>
                            <img src={`https://speedreal.abahs-jobconnect.com/uploads/partners/${partenaire.logo}`} alt='Logo' className='w-full h-full object-cover' />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default DetailPartenaireAdmin;
