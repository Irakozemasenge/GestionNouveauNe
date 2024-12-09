import React, { useEffect, useState } from "react";

function Whate() {
    const [mobile1, Setmobile1] = useState(window.innerWidth < 804);
    useEffect(() => {
        const hundleSize = () => {
            Setmobile1(window.innerWidth < 804)
        }
        window.addEventListener('resize', hundleSize)
        return () => {
            window.removeEventListener('resize', hundleSize)
        }
    }, [])

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-[95%] border flex flex-col items-end rounded-xl my-3  p-3 bg-gray-50">
                <div className={`text-center ${mobile1 ? 'text-[22px]' : 'text-[35px]'} w-full text-orange-700  strockText border-b pb-2`}>
                    Qu’est-ce que ABAHS ?
                </div>
                <div className={`${mobile1 ? 'text-[13px]' : 'text-[25px]'} sm:my-1 text-center`}>
                    ABAHS (African Brain-African Hand and Studies) est une Agence spécialisée dans l'orientation et
                    assistance pour travailler à l'étranger. Elle travaille en partenariat avec seize (16) pays d'Europe
                    ainsi que le Canada, l'Agence ABAHS fait la promotion des pays d'Europe qui non seulement ont
                    besoin de beaucoup d'employés, mais aussi qui payent un bon salaire.
                </div>
                <div className={`text-gray-500 ${mobile1 ? 'text-[12px] ' : 'text-[19px] '}  w-full text-center`}>
                    Pour en savoir plus, veuillez vous présenter à notre Agence située dans l’Immeuble de la Mairie de
                    Bujumbura au Burundi, rez-de-chaussée, N° 24 ou  nous contacter.
                </div>
            </div>
        </div>
    );
}

export default Whate;
