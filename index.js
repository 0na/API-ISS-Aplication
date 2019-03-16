
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            items: [],
            // data: [
            //     timestamp = [],
            //     iss_position = {
            //         latitude=[],
            //         longitude=[],
            //     }
            // ],
        };
    }
    componentDidMount() {
        //const preparedResponse = JSON.parse(response);
        fetch('http://api.open-notify.org/iss-now.json')
            .then(results => {
                return results.json();
            }).then(data => {
                let preparedResponse = data.results.map((item) => {
                    return (
                        <div timestamp={ item.results }>
                            <div longitude={ item.iss_position.longitude }></div>
                            <div latitude={ item.iss_position.latitude }></div>
                        </div>
                    )
                })
                    .this.setState({ items: preparedResponse });
                console.log("The time is: ", this.state.items);
            })
    }

    render() {
        return (
            <div className="container">
                <div>
                    { this.state.preparedResponse }
                </div>
            </div>
        )
    };
}
ReactDOM.render(<App />, document.getElementById("application"));
