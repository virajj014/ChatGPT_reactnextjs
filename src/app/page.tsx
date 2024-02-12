import Image from "next/image";
import styles from "./page.module.css";
import LeftSection from "@/components/LeftSection";
import RightSection from "@/components/RightSection";

export default function Home() {
  return (
    <div className={styles.mainpage}>
      <div className={styles.leftOut}>
        <LeftSection />
      </div>
      <div className={styles.rightOut}>
        <RightSection />
      </div>
    </div>
  );
}
