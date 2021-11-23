import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../utils/helper";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import "./Messenger.css";
import io from "socket.io-client";
import { useSocket } from "../../SocketProvider";

export default function Messenger(props) {
  // const { socket } = useContext(ThemeContext);

  const socket = useSocket();

  console.log("socketsss", socket)

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    console.log("runn", socket);
    socket.on("rooms", (data) => setConversations(data));
  }, []);

  return (
    <div className="messenger">
      {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

      {/* <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

      <div className="scrollable sidebar">
        <ConversationList conversations={conversations} />
      </div>

      <div className="scrollable content">
        <MessageList />
      </div>
    </div>
  );
}
