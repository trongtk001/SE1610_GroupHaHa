import React, { useEffect } from "react";
import SectionContainer from "../SectionContainer";
import styles from "./CallToAction.module.css";
import { ImGoogle } from "react-icons/im";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "aos/dist/aos.js";

const CallToAction = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
    Aos.refresh();
  }, []);
  return (
    <section data-aos={"fade-right"}>
      <SectionContainer>
        <div className={styles["card"]}>
          <div className={styles["card-inner"]}>
            <div className={styles["card-image"]}>
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/bakery-9a92d.appspot.com/o/images%2F62a292.jpg?alt=media&token=71193609-bc3b-4994-af70-6bc7a4471e52`}
                alt=""
              />
            </div>
            <div className={styles["card-action"]}>
              <div className={styles["action-inner"]}>
                <h3>Share your Cake Recipe with BAKERY</h3>
                <p>Create your FREE and secured account in seconds</p>

                <div className={styles["action-btns"]}>
                  <Link to="/signUp">
                    <div className={`${styles["action-btn"]} ${styles.google}`}>
                      <ImGoogle />
                      <span>With Google</span>
                    </div>
                  </Link>
                  <Link to="/signUp">
                    <div className={`${styles["action-btn"]} ${styles.email}`}>
                      <SiGmail />
                      <span>With Email</span>
                    </div>
                  </Link>
                </div>

                <p className={styles["action-note"]}>
                  By registering I agree to the processing of{" "}
                  <a href="/">Personal data</a> and <a href="/">Terms of Use</a>{" "}
                  of the app.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default CallToAction;
