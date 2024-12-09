/* eslint-disable eqeqeq */
/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Popover, Whisper } from "rsuite";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { decryptData, encryptData } from "../../encryptionModule";

function DetailEnfantHospitali() {
  const [mobile, GetMobile] = useState(window.innerWidth < 772);
  const [mobile3, SetMobile3] = useState(window.innerWidth < 342);
  useEffect(() => {
    const HundleSize = () => {
      GetMobile(window.innerWidth < 772);
      SetMobile3(window.innerWidth < 342);
    };

    window.addEventListener("resize", HundleSize);
    return () => window.removeEventListener("resize", HundleSize);
  }, []);

  const { id } = useParams();
  const meducament_usageId = decryptData(id);
  const [data, getData] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://gestionnouveaune.abahs-jobconnect.online/hospitalisation/OneById/${meducament_usageId}`
      )
      .then((response) => {
        getData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching enfant hospitalisé:", error);
      });
  }, [meducament_usageId]);
  const formatDate = (date) => {
    return format(new Date(date), "'Le 'd, MMMM yyyy", { locale: fr });
  };
  return (
    <div className="flex flex-col h-[90vh] w-full overflow-hidden">
      <div className="flex w-full min-h-[82vh] overflow-x-hidden pb-5    overflow-y-auto  flex-col">
        <Whisper
          trigger="hover"
          placement="auto"
          speaker={<Popover className=" text-nowrap">Retour</Popover>}
        >
          <Link to="/hopit" className="m-4  w-max">
            Retour
          </Link>
        </Whisper>
        <div className="h-max">
          <div className="w-full pl-6">
            <div className="w-full  pb-3">
              <div className="text-[20px] mb-5">Détail</div>
              <div>
                <div className="flex mt-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#5dca32"
                    class="bi mr-2 bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                  </svg>
                  <div>
                    Médecin{" "}
                    <span className="font-bold pl-2">
                      {data.Personnel && data.Personnel.nom}{" "}
                      {data.Personnel && data.Personnel.prenom}
                    </span>
                  </div>
                </div>
                <div className="flex mt-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#5dca32"
                    class="bi mr-2 bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                  </svg>
                  <div>
                    Enfant
                    <span className="font-bold pl-2">
                      {data.NouveauNe && data.NouveauNe.nom}{" "}
                      {data.NouveauNe && data.NouveauNe.prenom}
                    </span>
                  </div>
                </div>
                <div className="flex mt-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#5dca32"
                    class="bi mr-2 bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                  </svg>
                  <div>
                    Date d'admission{" "}
                    <span className="font-bold pl-2">
                      {data.date_admission && formatDate(data.date_admission)}
                    </span>
                  </div>
                </div>
                <div className="flex mt-4 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#5dca32"
                    class="bi mr-2 bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                  </svg>
                  <div>
                    Date de sortie{" "}
                    <span className="font-bold pl-2">
                      {data.date_sortie && formatDate(data.date_sortie)}
                    </span>
                  </div>
                </div>
                <div className="flex mt-4 items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#5dca32"
                    class="bi mr-2 bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                  </svg>
                  <div>
                    Raison d'admission
                    <div className="font-bold pl-2 whitespace-break-spaces">
                      {data.raison_admission}
                    </div>
                  </div>
                </div>
                <div className="flex mt-4 items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#5dca32"
                    class="bi mr-2 bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                  </svg>
                  <div>
                    Traitement
                    <div className="font-bold pl-2 whitespace-break-spaces">
                      {data.traitement}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailEnfantHospitali;
