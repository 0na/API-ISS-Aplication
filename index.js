"use strict";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.isLoaded = false;
  }

  componentDidMount() {
    setInterval(this.loadData.bind(this), 1000);
  }

  loadData() {
    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => response.json())
      .then(data => {
        this.setState({
          timestamp: data.timestamp,
          longitude: data.longitude,
          latitude: data.latitude,
          isLoaded: true
        })
      }
      );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  format({ timestamp }) {
    return timeConverter(timestamp);
  }


  render() {

    const timestamp = 'Ptaki latają kluczem';

    return (
      <div className='container'>
        <ul>{ this.state.isLoaded ? timestamp : "Wait a second, data is uploading" }</ul>
        <div data={ this.timestamp } />
        <div data={ this.longitude } />
        <div data={ this.latitude } />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById("application"));



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

console.log(timeConverter(3244234)); 