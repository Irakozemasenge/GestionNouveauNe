/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from "react";
import { useThemes } from "../../UserContext/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Popover, Whisper } from "rsuite";
import { toast } from "react-toastify";
import { decryptData } from "../../encryptionModule";
import axios from "axios";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
function MedicamentCart() {
  const {
    cart,
    increaseAmount,
    decreaseAmount,
    removeOnByOneMedi,
    nombreMedic,
    effaceCart,
  } = useThemes();
  const navig = useNavigate();
  const { id } = useParams();
  const enfantId = decryptData(id);
  useEffect(() => {
    if (nombreMedic === 0) {
      navig(`/consult/enfConsult/${id}`);
    }
  }, [nombreMedic]);
  const navigate = useNavigate();

  const [raison, Getraison] = useState("");
  const elemenRefraison = useRef(null);

  const [diagnostic, Getdiagnostic] = useState("");
  const elemenRefdiagnostic = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (raison.trim() === "") {
      toast.warning("Le raison de consultion est obligatoire !!");
      elemenRefraison.current &&
        elemenRefraison.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefraison.current && elemenRefraison.current.focus();
      return false;
    }
    if (diagnostic.trim() === "") {
      toast.warning("Le Diagnostic est obligatoire !!");
      elemenRefdiagnostic.current &&
        elemenRefdiagnostic.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefdiagnostic.current && elemenRefdiagnostic.current.focus();
      return false;
    }
    const UsageMedicaments = cart.map((medicament) => ({
      quantite_utilisee: medicament.amount,
      StockMedicamentId: medicament.id,
    }));

    // Créer un nouvel objet Date pour obtenir la date d'aujourd'hui
    const dateAujourdhui = new Date();
    // Formater la date au format souhaité (par exemple, YYYY-MM-DD)
    const dateFormatee = `${dateAujourdhui.getFullYear()}-${(
      dateAujourdhui.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateAujourdhui
      .getDate()
      .toString()
      .padStart(2, "0")} `;

    const data = {
      NouveauNeId: enfantId,
      PersonnelId: 1,
      date_consultation: dateFormatee,
      raison_consultation: raison,
      diagnostic: diagnostic,
      UsageMedicaments: UsageMedicaments,
    };

    axios
      .post(
        "https://gestionnouveaune.abahs-jobconnect.online/consultation/Add",
        data
      )
      .then((response) => {
        toast.success("L'insertion a été faite avec succès");
        navigate("/consult");
        effaceCart();
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(`Erreur : ${error.response.data.message}`);
        } else {
          toast.error("Une erreur est survenue lors de l'envoi des données");
        }
        console.error(error);
      });
  };
  const formatDate = (date) => {
    return format(new Date(date), "'Le 'd, MMMM yyyy", { locale: fr });
  };

  return (
    <div className="flex flex-col h-[90vh] w-full overflow-hidden">
      <div className="flex w-full min-h-[82vh] overflow-x-hidden   overflow-y-auto  flex-col">
        <div className="flex w-full mt-2 ml-2 justify-start">
          <Link to={`/consult/enfConsult/${id}`}>Retour</Link>
        </div>
        <div className=" mx-5 text-2xl  mb-4 font-bold  text-left mt-5">
          Liste des médicament à utiliser
        </div>
        <div className="h-max">
          <div className="w-full pb-5 overflow-hidden px-2">
            <div className="w-full flex  flex-wrap border-b-2 border-[#5dca32]  pb-3">
              {cart &&
                cart.map((data, index) => (
                  <div
                    key={index}
                    className="border w-[15em] relative  m-3 overflow-hidden rounded-lg p-2"
                  >
                    <div className="flex justify-end top-0 w-full absolute">
                      <div
                        onClick={() => removeOnByOneMedi(data.id)}
                        className="bg-red-400 cursor-pointer p-1.5 text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-x"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-2">
                      Nom{" "}
                      <span className="font-bold flex-1 text-nowrap text-ellipsis overflow-hidden">
                        {data.nom_medicament && data.nom_medicament.length > 20
                          ? data.nom_medicament.slice(0, 15) + "..."
                          : data.nom_medicament}
                      </span>
                    </div>
                    <div className="mt-2">
                      Quantité{" "}
                      <span className="font-bold">{data.quantite}</span>
                    </div>
                    <div className="mt-2">
                      Date d'expiration{" "}
                      <span className="font-bold">
                        {data.date_peremption &&
                          formatDate(data.date_peremption)}
                      </span>
                    </div>
                    <div className="flex mt-2">
                      <div
                        onClick={() => decreaseAmount(data.id)}
                        className="w-10 cursor-pointer  h-8 flex justify-center items-center border"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-dash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                        </svg>
                      </div>
                      <div className="w-10  h-8 flex justify-center items-center border">
                        {data.amount}
                      </div>
                      <button
                        disabled={data.quantite == data.amount}
                        onClick={() => increaseAmount(data.id)}
                        className={`w-10 cursor-pointer h-8 flex justify-center items-center border ${
                          data.quantite == data.amount
                            ? "opacity-50 bg-gray-300"
                            : "opacity-100"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-between  my-5 items-center">
              <div className="flex items-center">
                <div> Nombre total des médicament à utiliser</div>
                <div className="text-lg ml-2"> {nombreMedic}</div>
              </div>
              <Whisper
                trigger="hover"
                placement="left"
                speaker={
                  <Popover>
                    Click pour effacer les médicaments dans le card
                  </Popover>
                }
              >
                <div
                  onClick={effaceCart}
                  className="bg-red-600 text-white p-2 cursor-pointer rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash3-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
                </div>
              </Whisper>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col mb-5 items-center"
            >
              <div className="flex flex-col    w-full ">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Raison de consultation
                </label>
                <textarea
                  type="text"
                  value={raison}
                  onChange={(e) => Getraison(e.target.value)}
                  placeholder="Raison de consultation..."
                  className="w-full border min-h-[10em] bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefraison}
                ></textarea>
              </div>
              <div className="flex flex-col    w-full ">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Diagnostic
                </label>
                <textarea
                  type="text"
                  value={diagnostic}
                  onChange={(e) => Getdiagnostic(e.target.value)}
                  placeholder="Diagnostic..."
                  className="w-full border min-h-[10em] bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefdiagnostic}
                ></textarea>
              </div>
              <div className="flex justify-end w-full mt-5 items-center">
                <button className="border border-[#5dca32] rounded-md text-[#5dca32] px-4 py-2 font-bold">
                  Consulter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicamentCart;
