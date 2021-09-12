import React, { useContext, useEffect } from "react";
import shave from "shave";
import { ThemeContext } from "../../../utils/helper";

import "./ConversationListItem.css";

export default function ConversationListItem(props) {
  const { user } = useContext(ThemeContext);

  const { users } = props.data;

  const _getReciever = () => {
    const reciever = users?.find((u) => u?.id !== user?.id);
    return reciever;
  };

  return (
    <div className="conversation-list-item">
      <img
        className="conversation-photo"
        src={_getReciever().image}
        alt="conversation"
      />
      <div className="conversation-info">
        <h1 className="conversation-title">{_getReciever().username}</h1>
        <p className="conversation-snippet">Hi Buddy</p>
      </div>
    </div>
  );
}
