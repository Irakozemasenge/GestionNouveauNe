/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Popover, Whisper } from "rsuite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { decryptData } from "../../encryptionModule";
import axios from "axios";

function ModifiePersone() {
  const navigate = useNavigate();
  const { id } = useParams();
  const personnelId = decryptData(id);

  const [nom, Getnom] = useState("");
  const inputRefsnom = useRef(null);

  const [prenom, Getprenom] = useState("");
  const elemenRefprenom = useRef(null);

  const [telephone, Gettelephone] = useState("");
  const elemenReftelephone = useRef(null);

  const [role, GetRole] = useState("");
  const elemenRefrole = useRef(null);

  const [email, GetEmail] = useState("");
  const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
  const elemenRefEmail = useRef(null);

  const [photo, Getphoto] = useState(null);
  const elemenRefphoto = useRef(null);

  const [orderphoto, Getorderphoto] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://gestionnouveaune.abahs-jobconnect.online/user/OneById/${personnelId}`
        );
        Getnom(response.data.nom);
        Getprenom(response.data.prenom);
        Gettelephone(response.data.telephone);
        GetRole(response.data.role);
        GetEmail(response.data.email);
        Getorderphoto(response.data.photo);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données : ",
          error.message
        );
        setLoading(false);
        // Gérer l'erreur ici
      }
    };

    fetchData();
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nom.trim() == "") {
      toast.warning("Le nom est obligatoire !!");
      inputRefsnom.current &&
        inputRefsnom.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      inputRefsnom.current && inputRefsnom.current.focus();
      return false;
    } else if (prenom.trim() == "") {
      toast.warning("Le prénom est obligatoire !!");
      elemenRefprenom.current &&
        elemenRefprenom.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefprenom.current && elemenRefprenom.current.focus();
      return false;
    } else if (telephone.trim() == "") {
      toast.warning("Le téléphone est obligatoire !!");
      elemenReftelephone.current &&
        elemenReftelephone.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenReftelephone.current && elemenReftelephone.current.focus();
      return false;
    } else if (role.value == "") {
      toast.warning("Le role est obligatoire !!");
      elemenRefrole.current &&
        elemenRefrole.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefrole.current && elemenRefrole.current.focus();
      return false;
    } else if (email.trim() == "") {
      toast.warning("L'email est obligatoire !!");
      elemenRefEmail.current &&
        elemenRefEmail.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefEmail.current && elemenRefEmail.current.focus();
      return false;
    } else if (!email.match(emailRegex)) {
      toast.error("L'email est incorrect !!");
      elemenRefEmail.current &&
        elemenRefEmail.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      elemenRefEmail.current && elemenRefEmail.current.focus();
      return false;
    } else {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("prenom", prenom);
      formData.append("telephone", telephone);
      formData.append("role", role);
      formData.append("email", email);
      if (photo) {
        formData.append("photo", photo);
      }

      setLoading(true);
      axios
        .put(
          `https://gestionnouveaune.abahs-jobconnect.online/user/UpdateOneById/${personnelId}`,
          formData
        )
        .then((response) => {
          setLoading(false);
          toast.success("La modification a été effectuée avec succès.");
          navigate("/pers");
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la modification des données : ",
            error.message
          );
          setLoading(false);
          // Afficher les erreurs du backend
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error(error.response.data.message);
          } else {
            toast.error(
              "Une erreur s'est produite lors de la modification des données."
            );
          }
        });
    }
  };
  return (
    <div className="flex flex-col h-[90vh] w-full overflow-hidden">
      <div className="flex w-full min-h-[82vh] overflow-x-hidden overflow-y-auto flex-col">
        <div className="flex w-full mt-2 ml-2 justify-start">
          <Link to="/pers">Retour</Link>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="text-[18px] pl-4 mb-2 w-full text-left mt-5">
            Modifier personne{" "}
          </div>
          <div className="p-2 relative flex flex-col gap-2 w-full sm:p-4">
            <div className="justify-center w-full  p-1 sm:p-2 mb-10  flex flex-col">
              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Nom du personne
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => Getnom(e.target.value)}
                  placeholder="Le  nom de personne"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={inputRefsnom}
                />
              </div>
              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Prénom du personne
                </label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => Getprenom(e.target.value)}
                  placeholder="Le  prenom  du personne"
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefprenom}
                />
              </div>
              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Téléphone
                </label>
                <input
                  type="text"
                  value={telephone}
                  placeholder="Le téléphone"
                  onChange={(e) => Gettelephone(e.target.value)}
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenReftelephone}
                />
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Role
                </label>
                <select
                  ref={elemenRefrole}
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  value={role}
                  onChange={(e) => GetRole(e.target.value)}
                >
                  <option value="">Selectionner le role</option>
                  <option value="Médecin">Médecin</option>
                  <option value="Infirmier">Infirmier</option>
                  <option value="Administratif">Administratif</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block mt-5 font-serif text-gray-500 first_letter:uppercase tracking_wide text-lg mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  placeholder="L'email"
                  onChange={(e) => GetEmail(e.target.value)}
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefEmail}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="photo"
                  className="mt-5 cursor-pointer w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                >
                  Photo de profil
                </label>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  id="photo"
                  onChange={(e) => {
                    Getorderphoto(null);
                    Getphoto(e.target.files[0]);
                  }}
                  className="w-full border bg-transparent border-gray-300 rounded-md px-2 py-3 outline-none focus:border-green-500"
                  ref={elemenRefphoto}
                />
                {photo && (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Profil de ${nom}`}
                    className="mt-3 w-20 h-20 object-cover rounded-full"
                  />
                )}
                {orderphoto && (
                  <img
                    src={`https://gestionnouveaune.abahs-jobconnect.online/uploads/Personnel/${orderphoto}`}
                    alt={`Profil de ${nom}`}
                    className="mt-3 w-20 h-20 object-cover rounded-full"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full px-10 mb-10">
            <div className="w-full flex justify-end mt-4">
              <button
                type="submit"
                className="text-white bg-green-500 rounded-md px-4 py-2"
              >
                Modifier
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifiePersone;
