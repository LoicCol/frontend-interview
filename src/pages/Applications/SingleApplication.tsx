import styles from "./SingleApplication.module.css";
import { format } from "date-fns";

const SingleApplication = ({ application }) => {
  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {application.company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {application.first_name} {application.last_name}
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        <a>{application.email}</a>
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        {`£${application.loan_amount?.toLocaleString()}`}
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        {format(application.date_created, "dd-MM-yyyy")}
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        {format(application.expiry_date, "dd-MM-yyyy")}
      </div>
    </div>
  );
};

export default SingleApplication;
