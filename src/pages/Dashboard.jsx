import React from "react";
import HorizontalNav from "../components/HorizontalNav";
import VerticalNav from "../components/VerticalNav";
import { useFetch } from "../utils/hooks";
import { useParams } from "react-router-dom";

function Dashboard() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(`/user/${id}`);
  return (
    <React.Fragment>
      <HorizontalNav />
      <main>
        <VerticalNav />
        {error || data.data === undefined ? (
          id != null ? (
            <h1>
              Aucun utilisateur portant l'identifiant "<span>{id}</span>" n'a
              été trouvé...
            </h1>
          ) : (
            <h1>Votre url est incorrecte...</h1>
          )
        ) : isLoading ? (
          <p>Loading</p>
        ) : (
          <h1>
            Bonjour{" "}
            <span>
              {data.data.userInfos.firstName
                ? data.data.userInfos.firstName
                : "Oups, pas de prénom"}
            </span>
          </h1>
        )}
      </main>
    </React.Fragment>
  );
}

export default Dashboard;
