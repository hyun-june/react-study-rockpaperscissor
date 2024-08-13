import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faComputer } from '@fortawesome/free-solid-svg-icons';

export default class BoxClass extends Component {
  constructor(props) {
    super(props);
    this.defaultIcon =
      props.title === "User"
        ? <FontAwesomeIcon icon={faCircleUser} />
        : <FontAwesomeIcon icon={faComputer} />;
  }

  render() {
    const { item, result, title } = this.props;
    const defaultIcon = this.defaultIcon;

    return (
      <div className={`box ${title} ${result ? result : ''}`}>
        <h1>{title}</h1>
        <div className="item-icon">
          {item ? item.icon : defaultIcon}
        </div>
        <h2>{result}</h2>
      </div>
    );
  }
}
