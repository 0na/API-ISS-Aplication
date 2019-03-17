import React, { Component } from 'react';
import './App.css';

//intive zadanie : 
//"http://api.open-notify.org/iss-now.json"
//http://api.open-notify.org/iss-now.json?callback=CALLBACK
// Wykorzystaj dane udostępniane przez API
// http://open-notify.org/Open-Notify-API/ISS-Location-Now/
// • Przedstaw użytkownikowi następujące dane:
// prędkość ISS na podstawie dwóch odczytów,
// droga przebyta przez ISS od początku zapisanych odczytów.
// Program musi dać się łatwo skompilować i uruchomić na standardowym
// środowisku.

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Welcome to the ISS Position Application", //test this.state.text
      error: "",
      isloaded: false,
      preparedResponse: [],//dane z API
      issTime: [],
      issCords: [13, 45],
      time: "", //aktualna godzina
    }
  }

  // getCenter = () => {
  //   fetch('http://api.open-notify.org/iss-now.json')
  //     .then(d => d.json())
  //     .then(d => {
  //       this.setState({
  //         issLocation: [d.iss_position.latitude, + ', ' +
  //           d.iss_position.longitude]
  //       });
  //     });
  // }

  loadData = () => {
    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => {
        const preparedResponse = JSON.parse(response); //sparsowane dane
        this.setState({ //zmiana stanu
          issTime: preparedResponse.timestamp, //time from API
          issCords: preparedResponse.iss_position, //position from API
          isloaded: true, //powinno sie ladowac
        })
      }, 1000)
  };

  getDate = () => { //double check if time from .json is good. 
    setInterval(() => {
      this.setState({
        time: new Date().toLocaleString()
      })
    }, 1000)
  }

  issDistanse = () => { //iss distance from app started - use (cords) lat and land
  }

  readTime = () => { //convert unix_time to 'normal' format
    return timeConverter();
  }

  issSpeed = () => { //spedd iss. use distance() and convert time formula
  }


  componentDidMount() {
    this.loadData = this.loadData.bind(this);
    setInterval(this.getDate.bind(this), 1000);
    // this.getCenter = this.getCenter.bind(this);
    // this.interval = setInterval(this.getCenter, 1000);

  }

  render() {
    const { issTime, issCords, error, isloaded, text } = this.state;
    // const preparedResponse = this.state.preparedResponse.map(prepare => (
    //   <prepare timestamp={ preparedResponse.timestamp } />
    // ))


    return (
      <div className="app">
        <div className="container">
          <div className="checktime">Time check : { new Date().toLocaleTimeString() }</div>
          <div className="welcome">{ text } </div>
          <div className="startData">The time when you join my application was: { issTime.timestamp }
            <div> ISS was in position: </div>
            <div> Longitude: { issCords.longitude } </div>
            <div> Latitude: { issCords.latitude } </div>
          </div>
          <div className="calculated">
            <div className="speed">ISS is moving with speed: </div>
            <div className="distance">Defeated distance from time when you join:  </div>
          </div>
          <div className="currentData">
            <div>The time now is : </div>
            <div>ISS position is : </div>
            <div>Longitude: </div>
            <div>Latitude: </div>
          </div>
        </div >
      </div>
    );
  }
}
export default App;

function timeConverter(timestamp) {  //formula dziala !!!
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
//console.log(time);
console.log(timeConverter(624534233));


// function distance(lat1, lon1, lat2, lon2) {
//   var p = 0.017453292519943295;    // Math.PI / 180
//   var c = Math.cos;
//   var a = 0.5 - c((lat2 - lat1) * p) / 2 +
//     c(lat1 * p) * c(lat2 * p) *
//     (1 - c((lon2 - lon1) * p)) / 2;

//   return 12742 * Math.asin(Math.sqrt(a)) // 2 * R; R = 6371
