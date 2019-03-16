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

  loadData() {
    const url = "http://api.open-notify.org/iss-now.json";
    const API = JSON.parse(url);
    fetch("http://api.open-notify.org/iss-now.json")
      .then(response => response.json())  // <= parse the JSON
      .then(json => {
        this.setState({
          data: json.result,  //tu powinny wchodzic zmienne dane z api
          isLoaded: true //powinno sie ladowac
        })
      }
      );
  }


  // loadData() {
  //   fetch("http://api.open-notify.org/iss-now.json")
  //     .then(results => results.json())
  //     .then(result => this.setState({ data: results, isLoaded: true }))
  // }

  componentDidMount() { //chyba ok
    setInterval(this.loadData.bind(this), 1000);
  }

  componentWillUnmount() { //chyba ok
    clearInterval(this.loadData);
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
            <li>
              Timestamp : { this.loadData }
              <h2>It is { this.state.data.timestamp }.</h2>
            </li>

          </ul>
        </div>
      );
    }
  }
}
ReactDOM.render(<App />, document.getElementById("application"));


// const timestamp = 'Ptaki latają kluczem';

//     return (
//       <div className='container'>
//         <ul>{ this.state.isLoaded ? timestamp : "Wait a second, data is uploading" }</ul>
//       </div>
//     );



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