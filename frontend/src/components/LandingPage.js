import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import '../../node_modules/react-linechart/dist/styles.css';
import './LandingPage.css'
import axios from "axios";

const data = {
    labels: [100, 200, 300, 400],
    datasets: [
        {
            label: 'bytes to server',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [143, 131, 157, 130]
        },
        {
            label: 'bytes from server',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [100, 122, 167, 190]
        }
    ]
};

class LandingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log("on click")
        this.setState({
            [e.target.name]: e.target.value
        })

        axios.get('http://localhost:5000/getData', {
            params: {
                foo: 'bar'
            }
        }).then((response)=>{
            console.log(response)
        })
    }

    render() {

        return (
            <div className="container">
                <center>
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                            <form className="marginTop">
                                <h2>CYLERA CHARTS PLOT</h2>
                                <div className="myInputDiv">
                                    <input className="myInput col-sm-12" type="text" name="device_uuid" placeholder="device_uuid"></input>
                                </div>
                                <div className="myInputDiv">
                                    <input className="myInput col-sm-12" type="text" name="end_time" placeholder="end_time"></input>
                                </div>
                                <div className="myInputDiv">
                                    <input className="myInput col-sm-12" type="text" name="window_time" placeholder="window_time"></input>
                                </div>
                                <div className="myInputDiv">
                                    <input className="myInput col-sm-12" type="text" name="num_windows" placeholder="num_windows"></input>
                                </div>
                                <div className="myInputDiv marginTop30">
                                    <button type="button" onClick={this.handleClick.bind(this)} className="btn btn-outline-dark myButton col-sm-12"><b>SUBMIT</b></button>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-6 col-sm-12 border border-primary">
                            <h2>bytes_ts vs bytes_fs</h2>
                            <Line
                                data={data}
                                width={600}
                                height={400}
                                options={{ maintainAspectRatio: true }}
                            />
                        </div>
                    </div>
                </center>
            </div>
        );
    }
}

export default LandingPage;