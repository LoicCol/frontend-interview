import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { useFetchApplications } from "../../network/useFetchApplications";
import { Button } from "../../ui/Button/Button";

const Applications = () => {
  const { applications, isLoading, loadMore } = useFetchApplications();

  console.log("coucou applications", applications);

  return (
    <div className={styles.Applications}>
      {applications.map((application) => (
        <SingleApplication key={application.guid} application={application} />
      ))}
      <Button onClick={loadMore} className={styles.ButtonPlace}>
        {isLoading ? "Loading..." : "Load more"}
      </Button>
    </div>
  );
};

export default Applications;
