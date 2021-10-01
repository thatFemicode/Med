import logo from "./logo.svg";
import "./App.css";
// import ChannelListContainer from "./components/ChannelListContainer";
// import ChannelContainer from "./components/ChannelContainer";
import { StreamChat } from "stream-chat";
// the below is the chat component
import { ChannelList, Chat } from "stream-chat-react";

import { ChannelListContainer, ChannelContainer, Auth } from "./components";
import Cookies from "universal-cookie";
// Note: for this chat to work we need to create an instance of a stream chat

// the api key will be used to initialize the chat
const apiKey = "9qs7k56vc6jn";
// to set up our chat we are going to need an api key from our stream dashboard

// client-side-auth-branch
// we have the authToken and if its not there show the auth component
const authToken = false;
const client = StreamChat.getInstance(apiKey);
function App() {
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        {/* chat will have the channel container and the channel list container */}
        <ChannelListContainer />

        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
