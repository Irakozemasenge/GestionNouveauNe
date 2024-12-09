/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ClientNavBars from './ClientNavBars';
import { decryptData } from '../../../encryptionModule';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SpinnerDemarage from '../../SpinnerDemarage/SpinnerDemarage';
function DetailClientAdmin() {
    const { id } = useParams()
    const clientId = decryptData(id)
    const [nomComplet, GetnomComplet] = useState('')
    const [telephone, Gettelephone] = useState('')
    const [email, Getemail] = useState('')
    const [service, Getservice] = useState('')
    const [montant, Getmontant] = useState('')
    const [createdAt, GetcreatedAt] = useState('')
    const [updatedAt, GetupdateAt] = useState('')
    const [loadings, Setloadings] = useState(true)
    useEffect(() => {
        axios.get(`http://localhost:8005/client/ById/${clientId}`)
            .then(response => {
                GetnomComplet(response.data.nomcomplet)
                Gettelephone(response.data.tel)
                Getemail(response.data.email)
                Getservice(response.data.service)
                Getmontant(response.data.montant)
                GetcreatedAt(response.data.createdAt)
                GetupdateAt(response.data.updatedAt)
                Setloadings(false)
            })
            .catch(error => {
                console.error("Error fetching clients:", error);
                Setloadings(false)
            });
    }, [clientId])
    const formatDate = date => {
        return format(new Date(date), "'Le 'd, MMMM yyyy", { locale: fr });
    };
    return (
        <div className='w-full'>
            {loadings && <SpinnerDemarage />}
            <ClientNavBars />
            <div className='w-full overflow-y-auto overflow-x-hidden h-[87vh]'>
                <div className="flex items-center w-full justify-between">
                    <Link to='/Client' className="w-8 h-8 flex justify-center items-center text-green-500"
                    >    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                        </svg>
                    </Link>
                </div>
                <div className="w-[95%]  rounded-md max-sm:text-[13px] sm:mx-4 my-6 pl-1  sm:pl-3 h-max ">
                    <div className=' py-1 my-1'><span>Nom du client</span>: <span className=' font-semibold ml-2'>{nomComplet}</span></div>
                    <div className=' py-1 my-1'><span>Watsapp</span>: <span className=' font-semibold ml-2'>{telephone}</span></div>
                    <div className=' py-1 my-1'><span>Email</span>: <span className=' font-semibold ml-2'>{email}</span></div>
                    <div className=' py-1 my-1'><span>Montant</span>: <span className=' font-semibold ml-2'>{montant}</span></div>
                    <div className=' py-1 my-1'><span>service rendu</span>: <span className=' font-semibold ml-2'>{service}</span></div>
                    <div className=' py-1 my-1'><span>Date d'enregistrement</span>: <span className=' font-semibold ml-2'>{createdAt && formatDate(createdAt)}</span></div>
                    <div className=' py-1 my-1'><span>Date de modification</span>: <span className=' font-semibold ml-2'>{updatedAt && formatDate(updatedAt)}</span></div>
                </div>
            </div>
        </div>
    );
}

export default DetailClientAdmin;
