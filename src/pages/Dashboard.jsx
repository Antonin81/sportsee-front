import React from "react";
import HorizontalNav from "../components/HorizontalNav";
import VerticalNav from "../components/VerticalNav";
import { useFetch } from "../utils/hooks";

function Dashboard() {
  const { data, isLoading, error } = useFetch("/user/12");
  return (
    <React.Fragment>
      <HorizontalNav />
      <main>
        <VerticalNav />
        {error ? (
          <p>Oups</p>
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
