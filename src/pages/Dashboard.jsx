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
import RadarChart from "../components/RadarChart";
import RadialBarChart from "../components/RadialBarChart";
import KeyDataCard from "../components/KeyDataCard";

/**
 * Creates the Dashboard Page element
 *
 * @returns {React.JSX.Element}
 */
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

  /**
   * Creates an element to display in case of failed data fetching
   *
   * @returns {React.JSX.Element}
   */
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

  /**
   * Creates the content page element
   *
   * @returns {React.JSX.Element}
   */
  function EndComponent() {
    if (
      isAllUserDataLoading ||
      userActivityLoading ||
      userAverageSessionsLoading ||
      userActivityTypesLoading
    ) {
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

  /**
   * Creates the charts section element
   *
   * @returns {React.JSX.Element}
   */
  function ChartSectionComponent() {
    return (
      <div id="charts-section">
        <div className="flex">
          <div className="flex-column charts-left-section">
            <BarChart data={userActivity} />
            <div className="flex">
              <LineChart data={userAverageSessions} />
              <RadarChart data={userActivityTypes} />
              <RadialBarChart data={allUserData.objectiveCompletion} />
            </div>
          </div>
          <div className="flex-column charts-right-section">
            <KeyDataCard
              data={allUserData.keyData.calorieCount}
              dataName={"Calories"}
            />
            <KeyDataCard
              data={allUserData.keyData.proteinCount}
              dataName={"Proteines"}
            />
            <KeyDataCard
              data={allUserData.keyData.carbohydrateCount}
              dataName={"Glucides"}
            />
            <KeyDataCard
              data={allUserData.keyData.lipidCount}
              dataName={"Lipides"}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <HorizontalNav />
      <VerticalNav />
      <main>
        {(allUserDataError ||
          userActivityError ||
          userActivityTypesError ||
          userAverageSessionsError) && <ErrorComponent />}
        {!allUserDataError &&
          !userActivityError &&
          !userActivityTypesError &&
          !userAverageSessionsError && <EndComponent />}
      </main>
    </React.Fragment>
  );
}

export default Dashboard;
