import HashtagPage from "../api/hashtag";
import React from "react";
import ReactDOM from "react-dom";
class TaggingManager {
  constructor(setProgress, navigate, getUserFromUsername, toast) {
    this.setProgress = setProgress;
    this.navigate = navigate;
    this.getUserFromUsername = getUserFromUsername;
    this.toast = toast;
  }
  openUsername = async (username) => {
    try {
      this.setProgress(30);
      const { data } = await this.getUserFromUsername(username);
      console.log(data);
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
  openHashtag = async (hashtag) => {
    console.log("#" + hashtag);
    // try {
    //     this.setProgress(30);
    //     // Render the HashtagPage component directly
    //     ReactDOM.render(<HashtagPage hashtag={hashtag} />, document.getElementById('root'));
    //     this.setProgress(100);
    // } catch (error) {
    //     this.toast.error(error.message);
    //     this.setProgress(100);
    // }
  };

   convert = (text) => {
    const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  
    let x = text.split(/(\s+)/).map((word) => {
      // Check if the word is a space or newline
      if (word.trim() === "") {
        return <span>{word}</span>;
      }
  
      // Check for URLs
      if (urlPattern.test(word)) {
        return (
          <>
            <span> </span>
            <span
              onClick={() => this.openLink(word)} // Assuming you have a function to handle link opening
              style={{
                color: "blue",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🔗Link: {word}
            </span>
          </>
        );
      }
  
      // Check for mentions and hashtags
      const trimmedWord = word.trim();
      const wordWithOutTag = trimmedWord.slice(1);
  
      if (word.startsWith("@") && word.slice(1).match(/^[a-z0-9]+$/i)) {
        word = (
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
        word = (
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
        word = <span> {word}</span>;
      }
      return word;
    });
    return x;
  };
  
}  

export default TaggingManager;
