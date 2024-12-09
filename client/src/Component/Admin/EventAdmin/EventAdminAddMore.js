/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import NavBarsEvemet from './NavBarsEvemet'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FadeLoader } from 'react-spinners';
import Footer from '../../Visiteurs/Footer/Footer';

function EventAdminAddMore() {
    const [spinnerButton, SetSpinnerButton] = useState(false)
    const [addUrlYoutube, SetaddUrlYoutube] = useState(false)


    const { id } = useParams();
    const History = useNavigate();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const handlePhotoChange = (event) => {
        const selectedPhotos = Array.from(event.target.files);
        const newPhotos = [...selectedFiles, ...selectedPhotos];
        setSelectedFiles(newPhotos);

    };

    const handleRemovePhoto = (index) => {
        const updatedPhotos = [...selectedFiles];
        updatedPhotos.splice(index, 1);
        setSelectedFiles(updatedPhotos)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        SetSpinnerButton(true);
        const formData = new FormData();
        selectedFiles.forEach((photo) => {
            formData.append('file', photo);
        });
        await axios.post(`https://irakoze.burundientempsreel.com/api/othereventfiles/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((Response) => {
            History('/AdminEvent/Evenement');
        }).catch((error) => {
            console.log(error.message);

        }).finally(() => {
            SetSpinnerButton(false);
        });;;
    }

    const [mobile2, Setmobile2] = useState(window.innerWidth < 1111.383939302)
    const [mobile1, Setmobile1] = useState(window.innerWidth < 630.383939302)


    useEffect(() => {
        const hundleSize = () => {
            Setmobile1(window.innerWidth < 630.383939302)
            Setmobile2(window.innerWidth < 1111.383939302)
        }
        window.addEventListener('resize', hundleSize)

        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    })

    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;


    return (
        <div className='w-full'>
            <NavBarsEvemet />
            <div className='w-full h-[80vh] overflow-x-hidden overflow-y-auto'>
                <Link to='/event' className='ml-1'>
                    Retour
                </Link>

                <div class={` ${mobile2 ? 'w-[90%] ' : 'min-w-[900px]  '} p-3 m-2 rounded-2xl flex flex-col h-max  z-0    border border-orange-600  `}>
                    <div
                        class="flex items-center space-x-2 font-semibold leading-8 text-gray-900"
                    >
                        <span class="text-orange-700">
                            <svg
                                class="h-7"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />

                            </svg>
                        </span>
                        <h2 class="my-1 text-[15px] sm:text-lg leading-3  text-center  tracking-wide text-orange-500">
                            Ajouter plus de Fichiers à l'événement
                        </h2>
                    </div>
                    <div class="flex flex-col w-full items-center  gap-4">
                        <div class={`file_upload  relative    border-4 border-dotted border-gray-300  ${mobile1 ? "w-full h-full p-1" : "w-[20em] p-5 min-w-[95%] min-h-[20em]"}   rounded-2xl `} >
                            {selectedFiles.length <= 0 ? (
                                <label htmlFor='SelectMore' className='w-full h-full flex justify-center items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" fill="currentColor" class="bi bi-cloud-plus text-gray-300" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z" />
                                        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                                    </svg>
                                </label>
                            ) : (
                                <div className={(selectedFiles.length > 0) ? "flex flex-wrap gap-6 items-center" : ""}>
                                    {(selectedFiles.length > 0) && selectedFiles.map((file, index) => {
                                        return (
                                            <div key={index} className={`rounded-2xl border relative  ${mobile1 ? 'w-full' : 'w-[10em]'} border-orange-600  overflow-hidden `}>
                                                <div className="w-full text-white absolute  z-30 rounded-2xl  p-1 flex flex-row items-end"  >
                                                    <button
                                                        onClick={() => handleRemovePhoto(index)}
                                                        className="bg-red-700   hover:bg-red-800 px-4 py-1 rounded-2xl cursor-pointer">
                                                        supprimer
                                                    </button>
                                                </div>
                                                <div className={`relative  ${mobile1 ? 'h-full' : 'h-30'} overflow-hidden z-10`}>
                                                    <div className={`${mobile1 ? 'w-full' : 'h-[10em]'}`}>
                                                        {
                                                            youtubeRegex.test(file) ?
                                                                <ReactPlayer url={file} controls className='w-full inline h-full object-cover' />
                                                                :
                                                                <div key={file.id} className='relative  h-full w-full '>
                                                                    <img
                                                                        src={URL.createObjectURL(file)} className="w-full h-full border-none object-cover"
                                                                    />
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <input type="file" id='file' hidden multiple accept='image/*' onChange={handlePhotoChange} />
                                    <div>
                                        {!addUrlYoutube && <> <label htmlFor='file' className='  bg-orange-500 cursor-pointer w-10 h-10 flex justify-center items-center text-white p-2 rounded-full'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                            </svg>
                                        </label>
                                            <div onClick={() => SetaddUrlYoutube(true)} className='bg-orange-500  mt-2 cursor-pointer w-10 h-10 flex justify-center items-center text-white p-2 rounded-full'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                </svg>
                                            </div>
                                        </>
                                        }
                                        {addUrlYoutube && <div className='flex p-1 border items-center rounded-lg overflow-hidden'>
                                            <div onClick={() => SetaddUrlYoutube(false)} className=' text-white cursor-pointer p-1 bg-red-600 text-[17px] mx-1'>X</div>
                                            <input className='px-2 py-2 outline-none border bg-transparent rounded focus:border-orange-500' placeholder='Url de video de Youtube' />
                                            <div className='p-1 bg-green-600 text-[17px] text-white mx-1 cursor-pointer'>Ok</div>
                                        </div>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>

                        {(selectedFiles.length > 0) ? (
                            null
                        ) : (
                            <label>
                                <input id='SelectMore' accept='image/*' onChange={handlePhotoChange} class="text-sm cursor-pointer w-36 hidden" type="file"  multiple name="file" />
                                <div class="flex sm:w-40 justify-center items-center h-11 bg-orange-600 text-white border border-gray-300 rounded-2xl  font-semibold cursor-pointer p-1 px-3 hover:bg-orange-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="h-6 w-6 fill-current mr-2" viewBox="0 0 16 16"><path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"></path></svg>
                                    Ajouter plus
                                </div>
                            </label>
                        )
                        }
                    </div>
                    {selectedFiles.length > 0 ? (<>
                        <div
                            class={`container-mr w-full mt-4 flex items-center border rounded-lg  ${mobile1 ? 'justify-end' : 'justify-between'} p-8 py-4 text-sm`}
                        >
                            <p class={`${mobile1 ? 'hidden' : 'block'} mr-3 text-base text-gray-500 md:mr-0`}>
                                Ajouter plus de photos à votre événement
                            </p>

                            <div className="flex justify-end items-center mt-2">



                                <div className="flex relative justify-end items-center">

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
                                                <input type="submit" id="send" value="Ajouter" class=" transition-all bg-gray-900 rounded  cursor-pointer px-5 py-1 text-gray-600"></input>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <label onClick={(event) => handleSubmit(event)} htmlFor='sende' className="w-max cursor-pointer  flex justify-end p-1 bg-orange-600 rounded  px-2 py-1 text-white">
                                                <input type="submit" className='pointer-events-none' id='sende' value="Ajouter" />
                                                <i title="Ajouter" class="bi bi-send ml-2 "></i>
                                            </label>
                                        </>
                                    )}

                                </div>
                            </div>

                        </div>
                    </>) : null}

                </div>
                <Footer />
            </div>
        </div>
    )
}

export default EventAdminAddMore