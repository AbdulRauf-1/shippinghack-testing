import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ListItem(props) {
  return (
    <Link to={props?.navigate}>
      <li
        onClick={props?.onClick}
        className={`text-sm md:text-base px-5 font-light py-2.5 flex justify-between items-center font-switzer  duration-150 ${
          props.acitve === true
            ? "cursor-pointer rounded-md bg-theme text-themeText "
            : "hover:bg-theme hover:text-themeText cursor-pointer border-b border-b-borderColor text-themePlaceholder"
        } ${props?.rounded ? props?.rounded : "rounded-none"}`}
      >
        {props?.text} {props?.showIcon && props?.icon}
      </li>
    </Link>
  );
}
