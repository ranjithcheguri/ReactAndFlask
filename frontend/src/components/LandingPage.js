import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import '../../node_modules/react-linechart/dist/styles.css';
import './LandingPage.css'
import axios from "axios";
import queryString from 'query-string';


class LandingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //device_uuid:"0aa370cc-e6e4-4fdd-a401-bf9954137fa0"

        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount=async()=>{
        const params = queryString.parse(this.props.location.search)
        console.log(params)
        if(params.device_uuid){
            await  this.setState({
                ...params
            })
            console.log(this.state)
        this.getData();
        }
    }

    getData=async()=>{
        await axios.get(`http://localhost:5000/?device_uuid=${this.state.device_uuid}&end_time=${this.state.end_time}&window_time=${this.state.window_time}&num_windows=${this.state.num_windows}`)
        .then((response)=>{
            console.log(response.status,response.data)
            this.setState({
                dates : response.data.map(item=>(new Date(item[0] * 1000).toString().substring(4,24))),
                bytes_ts:response.data.map(item=>item[1]),
                bytes_fs:response.data.map(item=>item[2])
            })
            console.log(this.state)
        }).catch((err)=>{
            if(err && err.response){
                if(err.response.status==403){
                    alert("Invalid Input")
                }
            }else{
                alert("server down")
            }
            //console.log(err.response.status)
            
        })
    }

    handleClick = async(e) => {
        //e.preventDefault();
        //console.log("on click",this.state)
        //await this.getData(); //handled in componentDidMount()     
    }

    render() {

        const data = {
            labels: this.state.dates || [],
            datasets: [
                {
                    label: 'bytes to server',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#FB8C00',
                    borderColor: '#FB8C00',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#FB8C00',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#FB8C00',
                    pointHoverBorderColor: '#FB8C00',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.bytes_ts || []
                },
                {
                    label: 'bytes from server',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: '#1E88E5',
                    borderColor: '#1E88E5',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#1E88E5',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#1E88E5',
                    pointHoverBorderColor: '#1E88E5',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.bytes_fs || []
                }
            ]
        };


        return (
            <div className="container">
                <center>
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                            <form className="marginTop" onSubmit={this.handleClick.bind(this)}> 
                                <h2>CYLERA CHARTS PLOT</h2>
                                <div className="myInputDiv">
                                    <input className="myInput col-sm-12" onChange={this.handleChange.bind(this)} type="text" name="device_uuid" value={this.state.device_uuid} placeholder="enter device_uuid"></input>
                                </div>
                                <div className="myInputDiv">
                                    <input className="myInput col-sm-12" onChange={this.handleChange.bind(this)} type="text" name="end_time" value={this.state.end_time} placeholder="enter end_time timestamp"></input>
                                </div>
                                <div className="myInputDiv">
                                    <input className="myInput col-sm-12" onChange={this.handleChange.bind(this)} type="text" name="window_time" value={this.state.window_time} placeholder="enter window_time"></input>
                                </div>
                                <div className="myInputDiv">
                                    <input className="myInput col-sm-12" onChange={this.handleChange.bind(this)} type="text" name="num_windows" value={this.state.num_windows} placeholder="enter num_windows"></input>
                                </div>
                                <div className="myInputDiv marginTop30">
                                    <button type="submit"  className="btn btn-outline-dark myButton col-sm-12"><b>SUBMIT</b></button>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-6 col-sm-12 border border-primary">
                            <h2 className="">bytes_ts vs bytes_fs</h2>
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