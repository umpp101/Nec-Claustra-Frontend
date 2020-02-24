import React, { Component } from "react";
// import UserContainer from "./UserContainer";
import ConvoCard from "./ConvoCard";
// import SearchBar from "../components/SearchBar";

export default class Inbox extends Component {
 


  render() {
    return (
      <div class="chat-container">
          <div class="chat">
              <div class="language-select-container">

                  <div class="form-group">
                      <label for="languageSelector">Please select a language</label>
                      <select class="form-control" id="languageSelector">
                      </select>
                  </div>
              </div>

              <ul class="row message-container" id="channel-status" ></ul>

              <div class="input-container">
                  <div class="row text-input-container">
                      <input type="text" class="text-input" id="input-field"/>
                      <input id="publish" class="input-button" type="submit" value="Send"/>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
