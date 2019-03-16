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
    return timeConverter(this.data.timestamp);
  }

  // loadData() {
  //   fetch("http://api.open-notify.org/iss-now.json")
  //     .then(response => {
  //       const preparedResponse = JSON.parse(response);
  //       this.setState({
  //         data: preparedResponse,  //tu powinny wchodzic zmienne dane z api
  //         isLoaded: true //powinno sie ladowac
  //       })
  //     }
  //     );
  //}

  componentDidMount() { //chyba ok
    //  setInterval(this.loadData.bind(this), 1000);
    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => {
        const preparedResponse = JSON.parse(response);
        console.log("response:" + response)
        this.setState({
          data: preparedResponse,  //tu powinny wchodzic zmienne dane z api
          isLoaded: true //powinno sie ladowac
        })
      }
      );
  }

  // componentWillUnmount() { //chyba ok
  //   clearInterval(this.loadData);
  // }

  render() {
    var { isLoaded, data } = this.state

    if (!isLoaded) {
      return <div> Wait a second, data is loading ..
        <div>
          Timestamp : { data.timestamp };
      </div>
      </div>
    }
    else {
      return (
        <div className="Container">
          <ul>
            { this.state.datas.map(data => {
              return (<li key={ data.iss_position }>
                Longitude: { data.iss_position.longitude }
                Latitude: { data.iss_position.latitude }
              </li>);
            }) }
            <li>
              Timestamp : { this.loadData }
              <h2>It is { this.data.timestamp }.</h2>
            </li>

          </ul>
        </div>
      );
    }
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

console.log(timeConverter(3244234))