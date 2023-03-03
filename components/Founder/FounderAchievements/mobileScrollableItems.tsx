import { useEffect } from "react";
import styles from "./styles.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Achievement } from "@/endpoints/fetchFounderData";

const achievementVariant = {
  visible: { opacity: 1, transition: { duration: 0.625 } },
  hidden: { opacity: 0.5 },
};

interface AchievementItemProps {
  achievement: Achievement;
  isLastItem: boolean;
}

const AchievementItem = ({ achievement, isLastItem }: AchievementItemProps) => {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const framerMotionProps = {
    variants: achievementVariant,
    initial: "hidden",
    animate: control,
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div className="box" ref={ref} {...framerMotionProps}>
      <motion.li
        className={`${styles["founder-achievements__container"]}`}
        key={achievement.description}
        data-testid="founder-achievement"
        {...framerMotionProps}
      >
        <motion.div
          className={`${styles["founder-achievements__achievement"]}`}
          {...framerMotionProps}
        >
          <motion.div
            className={`${styles["founder-achievements__dot"]}`}
            {...framerMotionProps}
          />
          {!isLastItem && (
            <motion.div
              className={styles["founder-achievements__dotted-line"]}
              {...framerMotionProps}
            />
          )}
        </motion.div>
        <motion.h4 {...framerMotionProps}>{achievement.year}</motion.h4>
        <motion.p {...framerMotionProps}>{achievement.description}</motion.p>
      </motion.li>
    </motion.div>
  );
};

const MobileScrollableItems = (achievements: Achievement[]) => {
  return (
    <ul>
      {achievements?.map((achievement, index) => (
        <AchievementItem
          key={index}
          achievement={achievement}
          isLastItem={achievements?.length <= index + 1}
        />
      ))}
    </ul>
  );
};

export default MobileScrollableItems;
