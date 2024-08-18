import React from "react";

import { toast } from 'react-toastify';

class TaggingManager {
  constructor(setProgress, navigate, getUserFromUsername, toast) {
    this.setProgress = setProgress;
    this.navigate = navigate;
    this.getUserFromUsername = getUserFromUsername;
    this.toast = toast;

    // Initialize URL map from localStorage
    this.urlMap = JSON.parse(localStorage.getItem("urlMap")) || {};
  }

  // Method to store URL mapping in localStorage
  storeUrlMap = () => {
    localStorage.setItem("urlMap", JSON.stringify(this.urlMap));
  };

  // Method to generate a random 7-character alphanumeric key
  generateShortKey = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortKey = "";
    const keyLength = 7; // Length of the short key
    for (let i = 0; i < keyLength; i++) {
      shortKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortKey;
  };

  shortenUrl = (url) => {
    let shortKey = Object.keys(this.urlMap).find(key => this.urlMap[key] === url);
    if (!shortKey) {
      shortKey = this.generateShortKey();
      this.urlMap[shortKey] = url; // Store mapping of short key to original URL
      this.storeUrlMap(); // Persist the updated URL map
    }
    return `https://skill/${shortKey}`; // Replace with your actual domain
  };

  openUsername = async (username) => {
    try {
      this.setProgress(30);
      const { data } = await this.getUserFromUsername(username);
      if (data.result) {
        this.navigate(`/public-profile/${data.result._id}`);
        this.setProgress(100);
      } else {
        this.toast.error(data.message);
        this.setProgress(100);
      }
    } catch (error) {
      this.toast.error(error.response.data.message);
      this.setProgress(100);
    }
  };

 
  openHashtag = (hashtag) => {
    try {
        this.setProgress(30);
        this.navigate(`/hashtag/${hashtag}`);
        this.setProgress(100);
    } catch (error) {
        toast.error(error);
        this.setProgress(100);
    }
};

  openLink = (shortUrl) => {
    const shortKey = shortUrl.split("/").pop(); // Extract short key from URL
    const originalUrl = this.urlMap[shortKey];
    if (originalUrl) {
      window.open(originalUrl, "_blank"); // Open original URL in a new tab
    } else {
      console.error("Original URL not found for short key:", shortKey);
    }
  };

  convert = (text) => {
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    let x = text.split(/(\s+)/).map((word) => {
      if (word.trim() === "") {
        return <span>{word}</span>;
      }

      if (urlPattern.test(word)) {
        const shortUrl = this.shortenUrl(word);
        return (
          <>
            <span> </span>
            <span
              onClick={() => this.openLink(shortUrl)}
              style={{
                color: "blue",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🔗Link: {shortUrl}
            </span>
          </>
        );
      }

      const trimmedWord = word.trim();
      const wordWithOutTag = trimmedWord.slice(1);

      if (word.startsWith("@") && word.slice(1).match(/^[a-z0-9]+$/i)) {
        return (
          <>
            <span> </span>
            <span
              onClick={() => this.openUsername(wordWithOutTag)}
              style={{
                color: "blue",
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: "#e6f2ff",
              }}
            >
              {word}
            </span>
          </>
        );
      } else if (word.startsWith("#") && word.slice(1).match(/^[a-z0-9]+$/i)) {
        return (
          <>
            <span> </span>
            <span
              onClick={() => this.openHashtag(wordWithOutTag)}
              className="hashTag"
              style={{
                color: "#2ecc71",
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: "#ffffff",
              }}
            >
              {word}
            </span>
          </>
        );
      } else {
        return <span> {word}</span>;
      }
    });

    return x;
  };
}

export default TaggingManager;
