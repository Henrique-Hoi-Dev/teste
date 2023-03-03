import styles from "./styles.module.scss";

export interface InfoCardProps {
  title: string;
  phoneNumber?: string;
  infoMessage?: string;
  email?: string;
  hours?: string;
  className?: string;
  deliveryArea?: string;
  type?: "delivery" | "phone";
}

export function InfoCard({
  title,
  phoneNumber,
  infoMessage,
  email,
  hours,
  deliveryArea,
  className,
  type = "phone"
}: InfoCardProps) {
  const information = {
    description: type === "phone" ? phoneNumber : hours,
    bottomText: type === "phone" ? email : deliveryArea
  };

  return (
    <div className={`${styles["info-card"]} ${className}`}>
      <h4>{title}</h4>
      <div></div>
      <span className={styles["info-card__phoneNumber"]}>
        {information["description"]}
      </span>
      {infoMessage && (
        <span className={styles["info-card__message"]}> {infoMessage} </span>
      )}
      {type === "phone" && email ? (
        <a href={`mailto:${email}`}> {email} </a>
      ) : (
        <span>{information["bottomText"]}</span>
      )}
    </div>
  );
}
