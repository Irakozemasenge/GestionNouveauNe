import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Visa() {
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
        <div className='bg-[#ffa60015] w-full p-3'>
            <div className={`font-serif text-orange-900 ${mobile ? 'text-[20px] text-center mb-2' : 'text-[30px]'} `}> Les documents à obtenir et le processus de recherche de visa</div>
            <div className={`border-b pb-4 ${mobile ? 'text-[12px] ' : 'text-[20px]'}`}>
                <div>
                    Avant de la recherche du Visa, les employés potentiels reçoivent les documents suivants :
                </div>
                <ul>
                    <li> - Permis de travail livré par le gouvernement du pays d'accueil,</li>
                    <li> - Le contrat de travail précisant le salaire, la garantie du logement, l'assurance maladie,etc.</li>
                    <li>  - La garantie d'embauche, etc
                    </li>
                </ul>
                <p>
                    Le montant exigé pour la recherche de ces documents diffère selon les pays. Les modalités de
                    payement de ces montants différent aussi selon les pays
                    contacter.
                </p>
                <p>
                    Après l’obtention de ces documents, notre client s’engage à rechercher le visa et paye lui-même,
                    selon les exigences du pays d’accueil. C’est lui qui se rend, soit à l’Ambassade, soit au Consulat ou au
                    Service VFS Global pour la Norvège ou la Suède par exemple.
                </p>

                <p>
                    Cependant, il y a des pays qui n’exigent pas la présence physique du demandeur de Visa. Pour ces
                    pays, comme la Serbie par exemple, notre Agence envoie vos passeports par Courrier recommandé
                    et sécurisé et vous les récupérez au siège de l’Agence à Bujumbura.
                    Après l’obtention du Visa, notre client paye lui-même le billet d’avion.
                </p>
            </div>
            <div className='flex items-center flex-wrap w-full '>
                <div>Si vous voulez savoir les coûts y relatifs,</div>
                <Link to='/VisaVisiteur' className="w-max block ml-1 h-max px-2 py-1 cursor-pointer font-extrabold ">
                    veuillez nous contacter.
                </Link>
            </div>

        </div>
    )
}

export default Visa
