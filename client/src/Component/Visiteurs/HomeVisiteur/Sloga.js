import React, { useEffect, useState } from 'react'

function Sloga() {
    const [mobile, Setmobile] = useState(window.innerWidth < 570);
    const [mobile1, Setmobile1] = useState(window.innerWidth < 450);
    useEffect(() => {

        const hundleSize = () => {
            Setmobile(window.innerWidth < 570)
            Setmobile1(window.innerWidth < 450)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div
            className={`w-full  bg-transparent relative overflow-hidden ${mobile1 ? 'h-[30vh]' : mobile ? 'h-[35vh] ' : 'h-[60vh]'}`}>
            <div
                style={{
                    backgroundImage: 'url("image/sloger.jpg")',
                    backgroundAttachment: 'fixed',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: mobile1 ? 'contain' : 'cover',
                }}
                className={` h-[100vh]`}
            ></div>
            <div className={`${mobile1 ? 'top-1' : mobile ? 'top-5' : 'left-2'} absolute text-black flex top-3 w-full  rounded`}>
                <div className={`bg-[#ffffff69] rounded ${mobile ? 'w-[95%]' : 'w-[40em]'}  p-2 mx-2`}>
                    <div
                        className={` font-serif ${mobile1 ? 'text-[20px]' : mobile ? 'text-[50px] w-full text-center text-wrap' : 'text-[100px]'}`}
                    >ABAHS
                    </div>
                    <div className={` font-serif ${mobile1 ? 'text-center text-[10px]' : mobile ? 'text-center text-[12px]' : 'text-[27px]'}`}>
                        <span className={`text-orange-700 ml-2 italic ${mobile1 ? 'text-[11px]' : mobile ? '`text-[14px]' : '`text-[35px]'}`}>A</span>frican
                        <span className={`text-orange-700 ml-2 italic ${mobile1 ? 'text-[11px]' : mobile ? '`text-[14px]' : '`text-[35px]'}`}>B</span>rain
                        <span className={`text-orange-700 ml-2 italic ${mobile1 ? 'text-[11px]' : mobile ? '`text-[14px]' : '`text-[35px]'}`}>A</span>frican
                        <span className={`text-orange-700 ml-2 italic ${mobile1 ? 'text-[11px]' : mobile ? '`text-[14px]' : '`text-[35px]'}`}>H</span>and and
                        <span className={`text-orange-700 ml-2 italic ${mobile1 ? 'text-[11px]' : mobile ? '`text-[14px]' : '`text-[35px]'}`}>S</span>tudies
                    </div>
                    <div className={`text-orange-800 ${mobile1 ? 'text-[11px]' : ''} font-bold text-center`}>
                        ABAHS
                        une Agence spécialisée dans l'orientation et
                        assistance pour travailler à l'étranger e
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sloga
