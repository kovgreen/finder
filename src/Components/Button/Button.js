import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ fetchImages }) => (
  <div className={styles.div}>
    <button type="button" className={styles.Button} onClick={fetchImages}>
      Load more...
    </button>
  </div>
);

Button.propTypes = {
  fetchImages: PropTypes.func.isRequired
};

export default Button;
