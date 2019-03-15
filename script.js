"use strict";


class App extends React.Component { //jest chyba ok
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
    };
  }

  format({ timestamp }) {
    return timeConverter(timestamp);
  }

  loadData() { //ok
    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json.result,
          isLoaded: true
        })
      }
      );
  }
  componentDidMount() { //chyba ok
    setInterval(this.loadData.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }




  render() {
    var { isLoaded, data } = this.state
    if (!isLoaded) {
      return <div> Wait a second, data is loading ..</div>
    }
    else {
      return (
        <div className="Container">
          <ul>
            { data.map(data => (
              <li key={ data.iss_position }>
                Longitude : { data.iss_position.longitude }
                Latitude : { data.iss_position.latitude }
              </li>
            )) }
          </ul>
        </div>
      );

    }
    // const data = this.state.data
    // const longitude = data.iss_position.longitude;
    // const latitude = data.iss_position.latitude;
    // const { latitude, longitude } = data.iss_position;
    // const timestamp = data.timestamp;
    // const timestamp = 'Ptaki latają kluczem';

    //     return (
    //       <div className='container'>
    //         <ul>{ this.state.isLoaded ? timestamp : "Wait a second, data is uploading" }</ul>
    //         <ul>{ this.state.data }</ul>
    //         <div data={ this.data } />
    //       </div>
    //     );
    //   }

    // }

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
    console.log(data.iss_position)