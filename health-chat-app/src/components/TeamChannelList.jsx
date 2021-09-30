import React from "react";
import { AddChannel } from "../assets";

// This is just a list
// WE have lots of variables that we will be working with and we
// are going to pass them using stream
// now we ca use the props passed from the ChannelListContainer
// the first prop every react component has is the children
// then the error which will be set to false ath the beginning
// then the loading and the type
// type: depends on are we in group chat o direct messages
const TeamChannelList = ({ children, error = false, loading, type }) => {
  if (error) {
    // If error we have to check if the type === team before returning
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error, please wait a moment ans try again
        </p>
      </div>
    ) : null;
  }
  if (loading) {
    <div className="team-channel-list">
      <p className="team-channel-list__message loading">
        {type === "team" ? "Chnnels" : "Meassages"} Loading...
      </p>
    </div>;
  }
  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === "team" ? "Channels" : "Direct Messages"}
        </p>
        {/* {Button to add channnel will be here} */}
      </div>
      {/* this is everyting that has ben passed to out team channel lit */}
      {children}
    </div>
  );
};

export default TeamChannelList;
