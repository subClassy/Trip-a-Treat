import React, {Component} from 'react';
import axios from 'axios';

class Savedtrips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: []
        }
    }

    componentDidMount() {
        let self = this;
        axios.get('http://d3ec937a.ngrok.io/get-trips', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log(response);
            // self.setState({
            //     trips: response.data
            // })
            let box = document.getElementById('trips');
            for (let i = 0; i < response.data.length; i++) {
                let response_data = response.data[i].route;
                var date = document.createElement("P");
                var date_t = document.createTextNode(response_data.date);
                var source = document.createElement("P");
                var source_t = document.createTextNode(response_data.legs[0].distance.text);
                var duration = document.createElement("P");
                var duration_t = document.createTextNode(response_data.legs[0].duration.text);
                var end = document.createElement("P");
                var end_t = document.createTextNode(response_data.legs[0].end_address);
                var start = document.createElement("P");
                var start_t = document.createTextNode(response_data.legs[0].start_address);
                
                date.appendChild(date_t);
                source.appendChild(source_t);
                duration.appendChild(duration_t);
                end.appendChild(end_t);
                start.appendChild(start_t);

                box.appendChild(start);
                box.appendChild(end);
                box.appendChild(duration);
                box.appendChild(source);
                box.appendChild(date);
            }
        })

    }

    render() {
        return (
            <div id="trips" className="profile-labels"  style={{marginLeft:5+ 'em'}}><p className = "headers-poi">My Saved Trips</p>

            </div>
        )
    }
}

export default Savedtrips;