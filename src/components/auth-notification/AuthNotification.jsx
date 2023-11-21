import styles from "./auth-notification.module.scss"

const AuthNotification = ({ onClose }) => {
  return (
    <div className={styles.authNotification}>
      <p>Please log in to access this feature.</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AuthNotification;
