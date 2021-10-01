// This is basically our sidebar
import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";
const cookies = new Cookies();
const SideBar = ({ logout }) => {
  return (
    <div className="channel-list__sidebar">
      <div className="channel-list__sidebar__icon1">
        <div className="icon1__inner">
          <img src={HospitalIcon} alt="hospital" width="30" />
        </div>
      </div>
      <div onClick={logout} className="channel-list__sidebar__icon2">
        <div className="icon1__inner">
          <img src={LogoutIcon} alt="logout" width="30" />
        </div>
      </div>
    </div>
  );
};
const CompanyHeader = () => {
  return (
    <div className="channel-list__header">
      <p className="channel-list__header__text">Medical Pager</p>
    </div>
  );
};
const ChannelListContainer = () => {
  const logout = () => {
    // to logout, we have to clear the cookies and also relod the window
    cookies.remove("token");

    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");
    window.location.reload();
  };
  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        {/* Note: ChennelList is a selfclosing compoent that accepts some props */}
        {/* e.g: filer: allows us filter some messages */}
        {/* channelRednderFilter */}
        {/* and finally the List the important thing, meaning we want to render a custom list */}
        {/* basically stream allows you to get a channelList component out of the box
        but we are still creating our own teamchannelList which means our channel list will get all the 
        props that the normalchannel list always get which is the listProps suing stream*/}
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => {
            return <TeamChannelList {...listProps} type="team" />;
          }}
          Preview={(previewProps) => {
            <TeamChannelPreview {...previewProps} type="team" />;
          }}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => {
            return <TeamChannelList {...listProps} type="messaging" />;
          }}
          Preview={(previewProps) => {
            <TeamChannelPreview {...previewProps} type="messaging" />;
          }}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
