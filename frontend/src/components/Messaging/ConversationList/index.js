import React, { useState, useEffect, useContext } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";

import "./ConversationList.css";
import { ThemeContext } from "../../../utils/helper";

export default function ConversationList() {
  const { socket } = useContext(ThemeContext);

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    console.log("runn");
    socket.on("rooms", (data) => setConversations(data));
    // socket.on("rooms", (data) => console.log(data, "data"));

  }, [setConversations]);

  console.log("conversations", conversations);

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      />
      <ConversationSearch />
      {conversations.map((conversation) => (
        <ConversationListItem key={conversation?.id} data={conversation} />
      ))}
    </div>
  );
}
