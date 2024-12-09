/* eslint-disable eqeqeq */
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function ModifConsult2() {
    const [med, Getmed] = useState('')
    const inputRefsmed = useRef(null)

    const [enf, Getenf] = useState('')
    const inputRefsenf = useRef(null)



    const [date, Getdate] = useState('')
    const elemenRefdate = useRef(null)

    const [raison, Getraison] = useState('')
    const elemenRefraison = useRef(null)

    const [diagnistic, Getdiagnistic] = useState('')
    const elemenRefdiagnistic = useRef(null)


    const dataAll = {
        med: med,
        enf: enf,
        raison: raison,
        date: date,
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (med.trim() == "") {
            toast.warning('Le medecin de condultation est obligatoire !!')
            inputRefsmed.current && inputRefsmed.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            inputRefsmed.current && inputRefsmed.current.focus()
            return false
        }
        else if (enf.trim() == "") {
            toast.warning('Le nom d\'enfant  est obligatoire !!')
            inputRefsenf.current && inputRefsenf.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            inputRefsenf.current && inputRefsenf.current.focus()
            return false
        }

        else if (raison.trim() === "") {
            toast.warning('L\'raison de condultation est obligatoire !!')
            elemenRefraison.current && elemenRefraison.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefraison.current && elemenRefraison.current.focus()
            return false
        }
        else if (diagnistic.trim() === "") {
            toast.warning('L\'raison de condultation est obligatoire !!')
            elemenRefdiagnistic.current && elemenRefdiagnistic.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefdiagnistic.current && elemenRefdiagnistic.current.focus()
            return false
        }
        else if (date === "") {
            toast.warning('Le date de condultation est obligatoire !!')
            elemenRefdate.current && elemenRefdate.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            elemenRefdate.current && elemenRefdate.current.focus()
            return false
        }


        console.log("dataAll", dataAll)
        toast.success('data envoyer')


    }

    return (
        <div className="flex flex-col h-[90vh] w-full overflow-hidden">
            <div className='flex w-full min-h-[82vh] overflow-x-hidden overflow-y-auto flex-col'>
                <div className="flex w-full mt-2 ml-2 justify-start">
                    <Link to="/consult">Retour</Link>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="text-[18px] pl-4 mb-2 w-full text-left mt-5">Modifier consultation </div>
                    <div className="p-2 relative flex flex-col gap-2 w-full sm:p-4">
                        <div className="justify-center w-full  p-1 sm:p-2 mb-10  flex flex-col">
                            <div className="flex flex-col">
                                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">med  du parent</label>
                                <input
                                    type="text"
                                    value={med}
                                    onChange={(e) => Getmed(e.target.value)}
                                    placeholder="med d'enfant"
                                    className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                                    ref={inputRefsmed}
                                />
                            </div>


                            <div className="flex flex-col">
                                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">enf  du parent</label>
                                <input
                                    type="text"
                                    value={enf}
                                    onChange={(e) => Getenf(e.target.value)}
                                    placeholder="enf d'enfant"
                                    className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                                    ref={inputRefsenf}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">Raison de consultation</label>
                                <textarea
                                    type="text"
                                    value={raison}
                                    onChange={(e) => Getraison(e.target.value)}
                                    placeholder="Raison ... "
                                    className="w-full border min-h-[10em] bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                                    ref={elemenRefraison}
                                >
                                </textarea>
                            </div>

                            <div className="flex flex-col">
                                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">Diagnistic</label>
                                <textarea
                                    type="text"
                                    value={diagnistic}
                                    onChange={(e) => Getdiagnistic(e.target.value)}
                                    placeholder="diagnistic ... "
                                    className="w-full border min-h-[10em] bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                                    ref={elemenRefdiagnistic}
                                >
                                </textarea>
                            </div>

                            <div className="flex flex-col">
                                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => Getdate(e.target.value)}
                                    placeholder="date  du parent"
                                    className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                                    ref={elemenRefdate}
                                />
                            </div>

                        </div>

                        <div className="flex w-full px-10 mb-10">
                            <div className="w-full flex justify-end mt-4">
                                <button type="submit" className={`text-white bg-green-500  rounded-md px-4 py-2`}>
                                    Modifier
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModifConsult2