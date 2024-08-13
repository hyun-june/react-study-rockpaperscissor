import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faComputer } from '@fortawesome/free-solid-svg-icons'; // 기본 아이콘들

const Box = (props) => {
  const { item, result, title  } = props;
  const defaultIcon = title  === "User" ? <FontAwesomeIcon icon={faCircleUser}/> : <FontAwesomeIcon icon={faComputer} />;
    console.log("item",props)
  return (
    <div className={`box  ${title} ${result ? result : ''}`}>
      <h1>{props.title}</h1>
      <div className="item-icon">{item ? item.icon : defaultIcon}</div>
      <h2>{props.result}</h2>
    </div>
  );
};

export default Box;
