import React from "react";
// This is going to be the same as our team channel list getting a
//  lot of props passed into it  situation wise
// the first set of props we need is going to be the channel and the type
// we will also be usign a few more things from stream chat react
import { Avatar, useChatContext } from "stream-chat-react";
const TeamChannelPreview = ({ channel, type }) => {
  // the below channel and client are both coming from usechat context and are cboth called as hooks
  const { channel: activeChannel, client } = useChatContext();

  //   this is a preview for a channel with multiple users
  const ChannelPreview = () => {
    <p className="channel-preview__item">
      {/* this is doing something like checking if a channel has a name or an id */}
      #{channel?.data?.name || channel?.data?.id}
    </p>;
  };
  //   this is a preview for direct messages
  const DirectPreview = () => {
    // unfortunatle the data we get back is not an array
    // we might think we would get back an array of objects like the below
    // [{},{}]
    // what we actually get back is an object that looks likse the below
    // {
    //     "123":{}
    //     "123":{}
    //     "123":{}
    //     "123":{}
    // }
    // because each user has a specific key and based on that we will show the data
    // so what we need to do is turn an object to simply an array of object we can map through
    // we will be using the object .values givign us the values of all the values in the members object
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    // for the above we are mapping  over all the users and we are keeping
    // all the ones where the ID is not equal to the clientID which is ouR iD
    // SO BAsically we are throwing ourseleves outside the chat so we can get the uers we
    // are tlaking to
    return (
      <div className="channel-preview__item single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    );
  };

  //   the class for the div below is dynamic
  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__wrapper__selected"
          : "channel-preview-wrapper"
      }
      onClick={() => {
        console.log(channel);
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </div>
  );
};

export default TeamChannelPreview;
