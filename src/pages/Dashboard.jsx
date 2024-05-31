import React from "react";
import HorizontalNav from "../components/HorizontalNav";
import VerticalNav from "../components/VerticalNav";
import { useParams } from "react-router-dom";
import { useFetchActivityTypes } from "../utils/hooks/useFetchActivityTypes";
import { useFetchAverageSessions } from "../utils/hooks/useFetchAverageSessions";
import { useFetchActivity } from "../utils/hooks/useFetchActivity";
import { useFetchAllUserInfos } from "../utils/hooks/useFetchAllUserInfos";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";

function Dashboard() {
  const { id } = useParams();

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
    data: userActivityTypes,
    isLoading: userActivityTypesLoading,
    error: userActivityTypesError,
  } = useFetchActivityTypes(id);

  const {
    data: allUserData,
    isLoading: isAllUserDataLoading,
    error: allUserDataError,
  } = useFetchAllUserInfos(id);

  if (
    !userActivityLoading &&
    !userAverageSessionsLoading &&
    !userActivityTypesLoading &&
    !isAllUserDataLoading
  ) {
    console.log("User story 5 : ", allUserData.userInfos, allUserDataError);
    console.log("User story 6 : ", userActivity, userActivityError);
    console.log(
      "User story 7 : ",
      userAverageSessions,
      userAverageSessionsError
    );
    console.log(
      "User story 8 : ",
      allUserData.objectiveCompletion,
      allUserDataError
    );
    console.log("User story 9 : ", userActivityTypes, userActivityTypesError);
    console.log("User story 10 : ", allUserData.keyData, allUserDataError);
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

  function EndComponent() {
    if (isAllUserDataLoading) {
      return <p>Loading</p>;
    }
    return (
      <React.Fragment>
        <h1>
          Bonjour{" "}
          <span>
            {allUserData.userInfos.firstName
              ? allUserData.userInfos.firstName
              : "Oups, pas de prénom"}
          </span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        <div className="charts-container">
          <ChartSectionComponent />
        </div>
      </React.Fragment>
    );
  }

  function ChartSectionComponent() {
    return (
      <div id="charts-section">
        <div className="flex">
          <div className="flex-column charts-left-section">
            {!userActivityError && <BarChart data={userActivity} />}
            <div className="flex">
              {!userAverageSessionsError && (
                <LineChart data={userAverageSessions} />
              )}
              <div className="chart-container"></div>
              <div className="chart-container"></div>
            </div>
          </div>
          <div className="flex-column charts-right-section">
            <div className="chart-container"></div>
            <div className="chart-container"></div>
            <div className="chart-container"></div>
            <div className="chart-container"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <HorizontalNav />
      <main>
        <VerticalNav />
        {allUserDataError && <ErrorComponent />}
        {!allUserDataError && <EndComponent />}
      </main>
    </React.Fragment>
  );
}

export default Dashboard;
