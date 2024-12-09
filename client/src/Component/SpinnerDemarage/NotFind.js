/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function NotFind() {
    const [size, setSize] = useState(window.innerWidth < 354.903938488933);
    const [text, setText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(false);
    const [started, setStarted] = useState(false);
    const content = "African Brain African Hand and Studies";
    const typingSpeed = 15;
    const cursorBlinkSpeed = 500;
    useEffect(() => {
        if (started) {
            if (currentIndex < content.length) {
                setTimeout(() => {
                    setText(prevText => prevText + content.charAt(currentIndex));
                    setCurrentIndex(prevIndex => prevIndex + 1);
                }, typingSpeed);
            } else {
                setTimeout(() => {
                    setShowCursor(prevShowCursor => !prevShowCursor);
                }, cursorBlinkSpeed);
            }
        }
    }, [currentIndex, started]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStarted(true);
        }, 0);
        const hundleRiesize = () => {
            setSize(window.innerWidth < 354.903938488933)

        }

        window.addEventListener('resize', hundleRiesize)
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', hundleRiesize)
        };
    }, []);
    const [imageLoading, SetImageLoading] = useState(true)


    return (
        <div className={`fixed w-full  h-full bg-white  top-0 left-0  z-[100]`}>
            <div className="flex flex-col items-center mr-1">
                <div className="w-full flex justify-center items-center">
                    <div className="h-max w-[30em]  transition-all  relative overflow-hidden ml-3 rounded ">
                        {imageLoading && <div className="absolute w-full h-full "><img src="https://www.eliananunes.com/images/lazy_loader.gif" className="w-full h-full object-cover" /></div>}
                        <img draggable='false' onLoad={() => {
                            setTimeout(() => {
                                SetImageLoading(false)
                            }, 1000)
                        }} src={`https://speedreal.abahs-jobconnect.com/uploads/Logo/abahs.jpg`} alt="" className='h-full w-full  object-contain object-center' />
                    </div>
                </div>
                <div className={`text-[#ca3232] ${size ? 'text-[10px]' : 'text-[15px]'}  font-serif`}>
                    <p className="typing-text">{text}<span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>|</span></p>  </div>
            </div>
            <div className='flex justify-start  items-center flex-col'>
                <div className='text-[15em]'>404</div>
                <div>
                    Page non trouve !!
                </div>
            </div>
            <div className='flex w-full justify-center items-center mt-10 flex-col'>
                <Link to='/' className="text-gray-600 font-serif text-[20px] sm:text-[30px]">Retourner à  la page d'acceuil</Link>
            </div>
        </div>
    )
}

export default NotFind;
