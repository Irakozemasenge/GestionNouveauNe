import React, { useEffect, useState } from 'react'
function Remerciement() {

    const [mobile, GetMobile] = useState(window.innerWidth < 528)

    useEffect(() => {
        const HundleSize = () => {
            GetMobile(window.innerWidth < 528)
        }

        window.addEventListener('resize', HundleSize)
        return () => window.removeEventListener('resize', HundleSize)
    }, [])

    return (
        <div className={`${mobile ? 'text-[13px]' : 'text-[17px]'}`}>
            <div className='w-full p-2 bg-inherit text-gray-500 mt-5 relative'>
                <div className='text-center my-2'>
                    Nous tenons à exprimer notre sincère gratitude pour votre visite sur notre site d'avocat spécialisé dans les affaires de tribunal. Votre présence sur notre site en ligne est très appréciée et nous sommes ravis de pouvoir vous offrir des informations et des services juridiques pertinents.
                </div>
                <div className='text-center my-10'>
                    Nous comprenons que l'accès à des conseils juridiques fiables et précis est essentiel lorsque vous êtes confrontés à des problèmes juridiques ou à des litiges en cours. Notre objectif est de vous fournir des ressources utiles et des informations claires pour vous aider à mieux comprendre vos droits et à prendre des décisions éclairées.
                </div>
                <div className='text-center my-2'>👍 Bien à vous,👍</div>
            </div>
        </div>
    )
}

export default Remerciement