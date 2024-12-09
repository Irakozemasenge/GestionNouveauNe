import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../../Visiteur/FootentContent/Footer";
import HoraireNavBars from "./HoraireNavBars";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { decryptData } from "../../../encryptionModule";
import SpinnerDemarage from "../../SpinnerDemarage/SpinnerDemarage";
import { FadeLoader } from "react-spinners";

function HoraireModifier() {
    const navigate = useNavigate();
    const { id } = useParams();
    const horaireId = decryptData(id);
    const [horaire, setHoraire] = useState({
        jours: "",
        heuredebut: "",
        heurefin: ""
    });
    const [loadings, Setloadings] = useState(true)
    const [spinnerButton, SetloadingButton] = useState(false)

    useEffect(() => {
        const fetchHoraire = async () => {
            try {
                const response = await axios.get(`http://localhost:8005/horaire/${horaireId}`);
                setHoraire(response.data);
                Setloadings(false)
            } catch (error) {
                Setloadings(false)
                console.error('Erreur lors de la récupération de l\'horaire:', error);
                toast.error('Erreur lors de la récupération de l\'horaire');
            }
        };
        fetchHoraire();
    }, [horaireId]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        SetloadingButton(true)
        try {
            await axios.put(
                `http://localhost:8005/horaire/${horaireId}`,
                horaire
            );
            SetloadingButton(false)
            navigate("/horaire")
            toast.success("Horaire mis à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'horaire:", error);
            toast.error("Erreur lors de la mise à jour de l'horaire");
            SetloadingButton(false)
        }
    };


    const [mobile3, SetMobile3] = useState(window.innerWidth < 342)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 407)

    useEffect(() => {
        const HundleSize = () => {
            SetMobile3(window.innerWidth < 342)
            SetMobile2(window.innerWidth < 407)
        }
        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, []
    )



    return (
        <div className='w-full'>
            {loadings && <SpinnerDemarage />}
            <div className='w-full'>
                <HoraireNavBars />
                <div className={`w-full overflow-y-auto  overflow-x-hidden  ${mobile3 ? 'h-[87vh]' : 'h-[79vh]'}`}>
                    <div className='flex justify-center w-full min-h-[80vh]'>
                        <div className="w-full m-3  sm:p-4 h-full ">
                            <div className='sm:text-[30px] text-[20px] text-[#5dca32] '>Modifier des horaires</div>
                            <form onSubmit={handleSubmit}>
                                <div className="">
                                    <div className=" ">
                                        <div className="w-full mx-1 relative mb-2 ">
                                            <label className="block  mb-2 text-sm font-medium">Jours</label>
                                            <select
                                                className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300}`}
                                                value={horaire.jours}
                                                onChange={(e) => setHoraire({ ...horaire, jours: e.target.value })}
                                            >
                                                <option hidden value="">Selectionnez le jours de travail</option>
                                                <option value="lundi">Lundi</option>
                                                <option value="mardi">Mardi</option>
                                                <option value="mercredi">Mercredi</option>
                                                <option value="jeudi">Jeudi</option>
                                                <option value="vendredi">Vendredi</option>
                                                <option value="samedi">Samedi</option>
                                                <option value="dimanche">Dimanche</option>
                                            </select>
                                        </div>
                                        <div className={`text-[20px flex  p-1 justify-between ${mobile2 ? 'flex-col' : ''} `}>
                                            <div className="w-full mx-1 relative mb-2 ">
                                                <label className="block  mb-2 text-sm font-medium">Heure d'ouvrir </label>
                                                <input
                                                    type='time'
                                                    className={`w-full  border  outline-none focus:border-green-500  rounded-md p-2.5  bg-transparent  border-gray-300`}
                                                    placeholder="Heure d'ouvrir'"
                                                    value={horaire.heuredebut}
                                                    onChange={(e) => setHoraire({ ...horaire, heuredebut: e.target.value })}
                                                />
                                            </div>
                                            <div className="w-full relative mx-1 mb-2">
                                                <label className="block  mb-2   text-sm font-medium"> Heure de fermeture</label>
                                                <input
                                                    type='time'
                                                    className={`w-full  border  outline-none   rounded-md p-2.5  bg-transparent  border-gray-300  focus:border-green-500`}
                                                    placeholder="Heure de fermeture"
                                                    value={horaire.heurefin}
                                                    onChange={(e) => setHoraire({ ...horaire, heurefin: e.target.value })}
                                                />
                                            </div>
                                        </div>


                                        {spinnerButton ? (
                                            <>
                                                <div className="flex justify-end items-center mt-4 relative pointer-events-none opacity-80">
                                                    <div className='absolute bg-transparent  pt-3  w-full h-full flex justify-center items-center z-50'>
                                                        <FadeLoader
                                                            color="rgb(255, 255, 255)"
                                                            height={10}
                                                            margin={-9}
                                                            radius={100}
                                                            speedMultiplier={1}
                                                            width={1}
                                                        /></div>
                                                    <input type="submit" id="send" value="Se connecter" class=" transition-all bg-gray-900 rounded  cursor-pointer px-5 py-1 text-gray-600"></input>
                                                </div>
                                            </>
                                        ) : (
                                            <>

                                                <div className="flex justify-end w-max items-center bg-[#5dca32] text-white rounded cursor-pointer px-5 py-1">
                                                    <input type="submit" value='Modifier' id="send" ></input>
                                                </div>
                                            </>
                                        )}

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default HoraireModifier;
