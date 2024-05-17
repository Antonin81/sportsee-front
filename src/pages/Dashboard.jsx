import React from "react";
import HorizontalNav from "../components/HorizontalNav";
import VerticalNav from "../components/VerticalNav";
import { useParams } from "react-router-dom";
import {
  useFetchInfos,
  useFetchActivity,
  useFetchAverageSessions,
  useFetchObjectiveCompletion,
  useFetchActivityTypes,
  useFetchKeyData,
} from "../utils/hooks";
import BarChart from "../components/BarChart";

function Dashboard() {
  const { id } = useParams();

  const {
    data: userInfos,
    isLoading: userInfosLoading,
    error: userInfosError,
  } = useFetchInfos(id);

  const {
    data: userActivity,
    isLoading: userActivityLoading,
    error: userActivityError,
  } = useFetchActivity(id);

  const {
    data: userAverageSessions,
    isLoading: userAverageSessionsLoading,
    error: userAverageSessionsError,
  } = useFetchAverageSessions(id);

  const {
    data: userObjectiveCompletion,
    isLoading: userObjectiveCompletionLoading,
    error: userObjectiveCompletionError,
  } = useFetchObjectiveCompletion(id);

  const {
    data: userActivityTypes,
    isLoading: userActivityTypesLoading,
    error: userActivityTypesError,
  } = useFetchActivityTypes(id);

  const {
    data: userKeyData,
    isLoading: userKeyDataLoading,
    error: userKeyDataError,
  } = useFetchKeyData(id);

  if (
    !userInfosLoading &&
    !userActivityLoading &&
    !userAverageSessionsLoading &&
    !userObjectiveCompletionLoading &&
    !userActivityTypesLoading &&
    !userKeyDataLoading
  ) {
    console.log("User story 5 : ", userInfos, userInfosError);
    console.log("User story 6 : ", userActivity, userActivityError);
    console.log(
      "User story 7 : ",
      userAverageSessions,
      userAverageSessionsError
    );
    console.log(
      "User story 8 : ",
      userObjectiveCompletion,
      userObjectiveCompletionError
    );
    console.log("User story 9 : ", userActivityTypes, userActivityTypesError);
    console.log("User story 10 : ", userKeyData, userKeyDataError);
  }

  function ErrorComponent() {
    if (id != null) {
      return (
        <h1>
          Aucun utilisateur portant l'identifiant "<span>{id}</span>" n'a été
          trouvé...
        </h1>
      );
    }
    return <h1>Votre url est incorrecte...</h1>;
  }

  function LoadingComponent() {
    if (userInfosLoading) {
      return <p>Loading</p>;
    }
    return (
      <h1>
        Bonjour{" "}
        <span>
          {userInfos.firstName ? userInfos.firstName : "Oups, pas de prénom"}
        </span>
      </h1>
    );
  }

  return (
    <React.Fragment>
      <HorizontalNav />
      <main>
        <VerticalNav />
        {userInfosError && <ErrorComponent />}
        {!userInfosError && <LoadingComponent />}
        <div id="charts-section">
          <BarChart />
        </div>
      </main>
    </React.Fragment>
  );
}

export default Dashboard;
