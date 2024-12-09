import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Travail() {
  const [mobile, Setmobile] = useState(window.innerWidth < 1251);
  const [mobile1, Setmobile1] = useState(window.innerWidth < 804);
  useEffect(() => {
    const hundleSize = () => {
      Setmobile(window.innerWidth < 1251)
      Setmobile1(window.innerWidth < 804)
    }
    window.addEventListener('resize', hundleSize)
    return () => {
      window.removeEventListener('resize', hundleSize)
    }
  }, [])

  return (
    <div className={`flex sm:p-5 my-5 ${mobile1 ? 'flex-col' : 'items-center'}`}>
      <div className={`h-max p-2 ${mobile1 ? 'w-full' : 'w-1/2'} `}>
        <div className={`font-serif text-gray-400 ${mobile ? 'text-[16px]' : 'text-[20px]'} `}>Comment fonctionne ABAHS pour le travail à l'étrange</div>
        <div className={`font-serif text-orange-900 ${mobile ? 'text-[18px] text-center' : 'text-[30px]'} `}>Besoin des employés par les pays européens. </div>
        <div className="w-full h-full rounded-xl overflow-hidden">
          <img className="w-full h-full" src='image/Travails.avif' alt="    " />
        </div>
      </div>
      <div className={`h-max  ${mobile1 ? 'w-full p-3' : 'w-1/2 ml-5 p-2'} `}>
        <div className={`border-b pb-4 ${mobile ? 'text-[12px] ' : 'text-[25px]'}`}>
          Les pays membres de l’Union Européenne ont besoin de plus de 10 millions d’employés en
          provenance des pays non membres de l’UE. La plupart des employés nouvellement recrutés par
          les pays européens proviennent des pays asiatiques comme le Vietnam, le Bangladesh, l’Inde,
          etc. et très peu, les africains.
          L’AGENCE ABAHS veut offrir les opportunités d’emplois en Europe, au Canada, en Australie, etc
          aux Africains. Il est évident que beaucoup de jeunes africains sont bien formés et sont disposés à
          travailler, mais se retrouvent en chômage chez eux.
        </div>
        <div className='flex  max-sm:text-[14px] items-center flex-wrap w-full '>
          <div> Pour plus d’informations,</div>
          <Link to='/travail' className="w-max block ml-1 h-max px-2 py-1 cursor-pointer font-extrabold ">
            veuillez nous contacter !
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Travail
