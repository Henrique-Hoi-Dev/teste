/* eslint-disable @next/next/no-img-element */
import { Achievement } from "@/endpoints/fetchFounderData";
import styles from "./styles.module.scss";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import MobileScrollableItems from "./mobileScrollableItems";

export interface FounderAchievementsProps {
  achievements: Achievement[];
}

export function FounderAchievements({
  achievements,
}: FounderAchievementsProps) {
  const screen = GetScreenType();

  const renderAchievementsItems = () => {
    if (screen === "mobile") return MobileScrollableItems(achievements);

    return (
      <ul>
        {achievements?.map((achievement, index) => (
          <li
            className={`${styles["founder-achievements__container"]}`}
            key={achievement.description}
            data-testid="founder-achievement"
          >
            <div className={`${styles["founder-achievements__achievement"]}`}>
              <div className={`${styles["founder-achievements__dot"]}`} />
              {achievements?.length > index + 1 && (
                <div className={styles["founder-achievements__dotted-line"]} />
              )}
            </div>

            <h4>{achievement.year}</h4>
            <p>{achievement.description}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section
      aria-labelledby="founder-achievements"
      className={styles["founder-achievements"]}
    >
      <h3 id="founder-achievements" className="d-none">
        Founder Achievements
      </h3>
      {renderAchievementsItems()}
    </section>
  );
}
