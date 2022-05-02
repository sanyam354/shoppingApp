import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

export const Rating = ({ value, text }) => {
 
  const starCount = () => {
    if (value === 0.5) {
      return (
        <span style={{ color: "yellow" }}>
          <FontAwesomeIcon icon={faStarHalf} className="mx-2" />
        </span>
      );
    } else if (value === 1) {
      return (
        <span style={{ color: "yellow" }}>
          <FontAwesomeIcon icon={faStar} className="mx-2" />
        </span>
      );
    } else if (value === 1.5) {
      return (
        <span style={{ color: "yellow" }}>
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStarHalf} className="mx-2" />
        </span>
      );
    } else if (value === 2) {
      return (
        <span style={{ color: "yellow" }}>
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
        </span>
      );
    } else if (value === 2.5) {
      return (
        <span style={{ color: "yellow" }}>
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStarHalf} className="mx-2" />
        </span>
      );
    } else if (value === 3) {
      return (
        <span style={{ color: "yellow" }}>
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
        </span>
      );
    } else if (value === 3.5) {
      return (
        <span style={{ color: "yellow" }}>
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStarHalf} className="mx-2" />
        </span>
      );
    } else if (value === 4) {
      return (
        <span style={{ color: "yellow" }}>
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
        </span>
      );
    } else if (value === 4.5) {
      return (
        <span style={{ color: "yellow" }}>
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStarHalf} className="mx-2" />
        </span>
      );
    } else if (value === 5) {
      return (
        <span style={{ color: "yellow" }}>
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
          <FontAwesomeIcon icon={faStar} className="mx-2" />
        </span>
      );
    }
  };
  return (
    <span className="Rating">
      {starCount()}
      <span>{text}</span>
    </span>
  );
};
