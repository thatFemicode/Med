// First thing created after creating the sidebars
import React from "react";
import { useEffect, useState } from "react";
// we are going to need the context from stre-chat -react
import { useChatContext } from "stream-chat-react";
import { SearchIcon } from "../assets";
const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const getChannels = async (text) => {
    try {
      // Fetch CHannels
    } catch (err) {
      setQuery("");
    }
  };
  const onsSearch = (e) => {
    e.preventDefault();

    // the Loading can also be st to true
    setLoading(true);
    setQuery(e.target.value);
    // we also want to get chat channels by calling a new function
    // we also have to provide the searchQuery to it
    getChannels(e.target.value);
  };
  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          type="text"
          className="channel-search__input__text"
          placeholder="Search"
          value={query}
          onChange={onsSearch}
        />
      </div>
    </div>
  );
};

export default ChannelSearch;
