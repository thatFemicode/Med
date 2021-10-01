import React from "react";
import { Channel, MessageTeam } from "stream-chat-react";
import { ChannelInner, CreateChannel, EditChannel, TeamMessage } from "./";
const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) => {
  // this gives the information about a specific channel
  // const { channel } = useChannelContext();
  // we need to know if  are we currently creating a channel then we have to show a specific message or a dahsboard for crating that channel
  // hence the isCreating

  if (isCreating) {
    // th isCreating must also be know in the channel list container
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }
  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }
  // THE BELOW IS FOR WHEN YOU CREATE  STATE AND IT IS EMPTY
  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">
        This is the beginning of your chat history.
      </p>
      <p className="channel-empty__second">
        Send messages, attachments, links, emojis, and more!
      </p>
    </div>
  );
  return (
    <div className=" channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
