import React from "react";
import LoaderSpinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <LoaderSpinner type="Bars" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
