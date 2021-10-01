import logo from "./logo.svg";
import "./App.css";
import "stream-chat-react/dist/css/index.css";
// import ChannelListContainer from "./components/ChannelListContainer";
// import ChannelContainer from "./components/ChannelContainer";
import { StreamChat } from "stream-chat";
// the below is the chat component
import { ChannelList, Chat } from "stream-chat-react";
import { useState } from "react";
import { ChannelListContainer, ChannelContainer, Auth } from "./components";
import Cookies from "universal-cookie";
// the api key will be used to initialize the chat
const apiKey = "9qs7k56vc6jn";
// Note: for this chat to work we need to create an instance of a stream chat
const client = StreamChat.getInstance(apiKey);

// to set up our chat we are going to need an api key from our stream dashboard
// we have authToekn set to false so now how do we geth the data
const cookies = new Cookies();

// 1st prt
// client-side-auth-branch
// we have the authToken and if its not there show the auth component
// const authToken = false;
const authToken = cookies.get("token");

if (authToken) {
  // the connect user has two parameters
  client.connectUser(
    {
      // pwe have to pass everythign in the cookies
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
      phoneNumber: cookies.get("phoneNumber"),
    },
    authToken
  );
}
function App() {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        {/* chat will have the channel container and the channel list container */}
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />

        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}

export default App;
