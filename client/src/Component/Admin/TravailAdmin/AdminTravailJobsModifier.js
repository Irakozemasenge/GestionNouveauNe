import React, { createRef, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FadeLoader } from 'react-spinners'
import { countries } from "../../Data/Data";
import Footer from "../../Visiteurs/Footer/Footer";
import NavBarsTravail from "./NavBarsTravail";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { decryptData } from "../../../encryptionModule";
function AdminTravailJobsModifier() {
    const [mobile11, SetMobile11] = useState(window.innerWidth < 501)
    useEffect(() => {
        const hundlesSize = () => {
            SetMobile11(window.innerWidth < 501)
        }
        window.addEventListener('resize', hundlesSize)
        return () => {
            window.removeEventListener('resize', hundlesSize)
        }
    }, [])


    const [boutLoading, setboutLoading] = useState(false)

    useEffect(() => {
        const hundleSize = () => {
            SetMobile(window.innerWidth <= 640)
        }
        window.addEventListener('resize', hundleSize)

        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])



    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState('');


    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedCountryCode(e.target.options[e.target.selectedIndex].getAttribute('codes'));

    };


    const { id } = useParams()
    const bId = decryptData(id)
    const navigate = useNavigate()

    const location = useLocation();
    useEffect(() => {
        const bourseDetails = location.state;
        if (bourseDetails) {
            setSelectedCountry(bourseDetails.pays)
            setSelectedCountryCode(bourseDetails.drapeux)

        }
    }, [location.state]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setboutLoading(true)

        axios.put(`https://speedreal.abahs-jobconnect.com/travail/updateTravail/${bId}`, {
            pays: selectedCountry,
            drapeux: selectedCountryCode,

        }).then((resp) => {
            toast.success(resp.data);
            setSelectedCountryCode("")
            setSelectedCountry("")
            setboutLoading(false)
            navigate(`/travail/detail/${id}`);
        })
            .catch((err) => {
                if (err.response) {
                    // Le serveur a répondu avec un code d'erreur
                    console.error("Erreur lors de la mise à jour de la bourse :", err.response.data);
                    toast.error(err.response.data);
                    setboutLoading(false)
                } else if (err.request) {
                    // La requête a été envoyée, mais aucune réponse n'a été reçue
                    console.error("Aucune réponse du serveur lors de la mise à jour de la bourse :", err.request);
                    toast.error("Aucune réponse du serveur lors de la mise à jour de la bourse");
                    setboutLoading(false)
                } else {
                    // Une erreur s'est produite lors de la configuration de la requête
                    console.error("Erreur lors de la mise à jour de la bourse :", err.message);
                    toast.error("Erreur lors de la mise à jour de la bourse :)");
                    setboutLoading(false)
                }
            });
    };

    const [mobile1, SetMobile1] = useState(window.innerWidth < 688)
    const [mobile, SetMobile] = useState(window.innerWidth < 560)
    const [mobile2, SetMobile2] = useState(window.innerWidth < 634)
    const [mobile3, SetMobile3] = useState(window.innerWidth < 850)
    useEffect(() => {
        const hundleSize = () => {
            SetMobile1(window.innerWidth < 688)
            SetMobile(window.innerWidth < 560)
            SetMobile2(window.innerWidth < 634)
            SetMobile3(window.innerWidth < 850)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className={`w-full`}>
            <NavBarsTravail />
            <div className={`w-full overflow-y-auto overflow-x-hidden ${mobile1 ? 'h-[85vh]' : 'h-[80vh]'}`}>
                <div className={`w-full  overflow-hidden ${mobile1 ? 'min-h-[85vh]' : 'min-h-[80vh]'}`}>
                    <form onSubmit={handleSubmit} className="flex mb-4 flex-col items-center">
                        <div className="rounded-lg p-2 relative  flex flex-wrap   w-[95%] sm:p-4">

                            <div className="justify-center overflow-hidden rounded-xl w-full h-max p-1 sm:p-2 mb-10  border-[1px] flex flex-col">
                                <div className="w-full">
                                    <div className="h-max w-full">
                                        <div className="px-3  w-full">
                                            <div className="w-full flex items_center justify-between">
                                                <label className="block  mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide  text-lg  mb-1">
                                                    Modifier travail
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-2 h-max">
                                    <div className="rounded-xl p-2 w-full">
                                        <div className="flex flex-col">
                                            <div className="rounded-lg w-full">
                                                <div class="w-full mb-5">
                                                    <label
                                                        class="block  tracking-wide  text-lg  mb-2"
                                                        for="grid-Title"
                                                    >
                                                        Selectionnez le pay de bourse
                                                    </label>
                                                    <div className="w-full flex bg-transparent  outline-none  focus:border focus:border-orange-500   border border-red rounded mb-3">
                                                        <div className="py-3 px-2 w-[5em]  p-2  border-r" >
                                                            <img src={`https://flagcdn.com/w40/${selectedCountryCode.toLowerCase()}.png`} alt="Drapeau" />
                                                        </div>
                                                        <select
                                                            className="py-3 px-4 w-full bg-transparent"
                                                            value={selectedCountry}
                                                            name="pays"
                                                            onInput={(e) => { handleCountryChange(e) }}

                                                        >
                                                            <option value="" className="text-black">Sélectionnez un pays</option>
                                                            {Object.entries(countries).map(([code, name], index) => (
                                                                <option key={index} className="text-black" value={name} codes={code}>
                                                                    {name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className=" flex justify-end  w-[95%]">

                            {boutLoading ? (
                                <>
                                    <label disabled className="cursor-no-drop w-max relative  mt-3 flex justify-center  items-center   bg-orange-950    p-2 rounded  text-gray-400">
                                        <input type="submit" id="send" value='Modifier' className='pointer-events-none' />
                                        <i class="bi bi-send ml-2  pointer-events-none "></i>
                                        <div disabled className='absolute pointer-events-none  bg-transparent pt-4  pl-4  w-full h-full flex justify-center items-center z-50'>
                                            <FadeLoader
                                                color="rgb(255, 255, 255)"
                                                height={10}
                                                margin={-9}
                                                radius={100}
                                                speedMultiplier={1}
                                                width={1}
                                            />
                                        </div>
                                    </label>
                                </>
                            ) : (<>
                                <label for="send" className=" mt-3 cursor-pointer w-max  flex justify-end  bg-orange-600   p-2 rounded  text-white">
                                    <input type="submit" id="send" value='Modifier' className='cursor-pointer'></input>
                                    <i class="bi bi-send ml-2 "></i>
                                </label>
                            </>)}
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </div>

    );
}


export default AdminTravailJobsModifier;
