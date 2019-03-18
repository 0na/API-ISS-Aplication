import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      isloaded: false,
      startISS: {
        cords: {
          latitude: null,
          longitude: null,
        },
        timestamp: null
      },
      currentISS: {
        cords: {
          latitude: null,
          longitude: null,
        },
        timestamp: null
      }
    }
  }

  currentDataISS = () => {
    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => response.json())
      .then(preparedResponse => {
        const state = {
          cords: preparedResponse.iss_position,
          timestamp: preparedResponse.timestamp
        }
        if (this.state.startISS.timestamp !== null) {
          this.setState({
            currentISS: {
              ...state
            }
          })
        } else {
          this.setState({
            currentISS: {
              ...state
            }, startISS: {
              ...state
            }
          })
        }
      })
  }

  componentDidMount() {
    setInterval(this.currentDataISS.bind(this), 1000);
  }

  render() {
    const { timestamp: startTimestamp, cords: startCords } = this.state.startISS;
    const { timestamp: currentTimestamp, cords: currentCords } = this.state.currentISS;
    const velocity = Math.floor(((getDistance(startCords.latitude, startCords.longitude, currentCords.latitude, currentCords.longitude)) / (currentTimestamp - startTimestamp) * 3600) / 1.609344);
    const distance = Math.floor(getDistance(startCords.latitude, startCords.longitude, currentCords.latitude, currentCords.longitude))

    return (
      <div className="app">
        <div className="container">
          <div className="welcome">Welcome to the ISS Position Application </div>
          <div className="startData"> Actual ISS info:
            <div> Time: { timeConverter(currentTimestamp) + "°E" } </div>
            <div> Longitude: { currentCords.longitude + "°E" } </div>
            <div> Latitude: { currentCords.latitude + "°N" } </div>
          </div>

          <div className="calculated">
            <div className="velocity">ISS is moving with velocity: { velocity }km/h </div>
            <div className="distance">Defeated distance from time when you join:{ distance }km! </div>
          </div>

          <div className="currentData">
            <div> Time when you join app: { timeConverter(startTimestamp) } </div>
            <div>ISS position: { } </div>
            <div>Longitude:{ startCords.longitude + "°E" }</div>
            <div>Latitude: { startCords.latitude + "°N" }</div>
          </div>
        </div >
      </div>
    );
  }
}
export default App;

function timeConverter(timestamp) {
  var a = new Date(timestamp * 1000);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

function getDistance(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180)
};
