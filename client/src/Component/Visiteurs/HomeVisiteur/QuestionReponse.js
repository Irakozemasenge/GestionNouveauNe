import { Accordion, Placeholder } from 'rsuite';
import { FaAngleDoubleDown } from 'react-icons/fa';

const QuestionReponse = () => (
    <div className='w-full flex justify-center py-4'>
        <div className='w-[96%]  bg-green-50 rounded-lg'>
            <div className='sm:text-[30px] max-sm:text-center p-2 text-[15px] border-b pb-5 mb-1'>Question fréquemment posées sur les etudes à l'étrange </div>
            <Accordion bordered>
                <Accordion.Panel header={
                    <div className=' max-sm:text-[12px]  max-sm:text-center '>
                        Remboursement en cas de non octroi de visa
                    </div>
                } eventKey={1} caretAs={FaAngleDoubleDown}>
                    <div className=' max-sm:text-[12px] text-gray-400'>
                        Le remboursement du montant total n’est pas possible. Mais selon les cas, l’Agence
                        s’entretien avec le client pour déterminer le montant à rembourser. Pour certains cas, le
                        remboursement peut arriver à 60% du montant total convenu.
                    </div>
                </Accordion.Panel>
                <Accordion.Panel header={
                    <div className=' max-sm:text-[12px]'>
                        Délai du processus
                    </div>
                } eventKey={2} caretAs={FaAngleDoubleDown}>
                    <div className=' max-sm:text-[12px] text-gray-400'>

                        Le délai maximum d’obtention des documents est de trois mois. Mais le délai d’obtention
                        du Visa ne peut pas être déterminé par l’Agence. Il y a des Consulats rapides, il y en a qui sont lents,
                        voir très lents.
                    </div>
                </Accordion.Panel>
                <Accordion.Panel header={
                    <div className=' max-sm:text-[12px] '>
                        Délai du contrat
                    </div>
                } eventKey={3} caretAs={FaAngleDoubleDown}>
                    <div className=' max-sm:text-[12px] text-gray-400'>
                        Souvent les contrats donnés sont d’une année renouvelable. Généralement, si l’employé n’a pas
                        commis une faute lourde, le renouvellement du Contrat est automatique.
                    </div>
                </Accordion.Panel>
                <Accordion.Panel header={
                    <div className=' max-sm:text-[12px] '>
                        Délai du visa travail
                    </div>
                } eventKey={4} caretAs={FaAngleDoubleDown}>
                    <div className=' max-sm:text-[12px] text-gray-400'>
                        Le délai du Visa de travail est au même niveau que le contrat. Dès que vous obtenez un contrat
                        indéterminé, le visa est aussi indéterminé. En ce moment, vous avez le droit d’amenez votre famille
                        dans le pays d’accueil. Il y a des pays qui permettent d’amener vos enfants après 6 mois d’exécution
                        du contrat.
                    </div>
                </Accordion.Panel>
                <Accordion.Panel header={
                    <div className=' max-sm:text-[12px] '>
                        Délai du visa visite Canada
                    </div>
                } eventKey={5} caretAs={FaAngleDoubleDown}>
                    <div className=' max-sm:text-[12px] text-gray-400' >
                        Le visa Visite, tourisme ou conférence, dure entre 6 mois et une année
                    </div>
                </Accordion.Panel>

                <Accordion.Panel header={
                    <div className=' max-sm:text-[12px] '>
                        Comment séjourner au Canada après l’expiration du visa ?

                    </div>
                } eventKey={6} caretAs={FaAngleDoubleDown}>
                    <div className=' max-sm:text-[12px] text-gray-400' >
                        Selon la nouvelle loi canadienne, la personne qui obtient un visa visite, tourisme ou conférence, a
                        droit au travail. Dès qu’il trouve du travail dans le délai où son visa est encore valable, le Canada lui
                        offre un permis de travail et un séjour conséquent. Cette loi est valable jusqu’au 28 février 2025,
                        veuillez en profiter.

                    </div>
                </Accordion.Panel>

            </Accordion>
        </div>
    </div>
);

export default QuestionReponse
