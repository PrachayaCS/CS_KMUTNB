import React from 'react';
import '../App.css';
import { Layout, Breadcrumb } from 'antd';
import { parse } from 'mathjs'
import { Input, Table, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios';

var dataT = []
var dataX = []
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration"
  },
  {
    title: "X",
    dataIndex: "x",
    key: "x"
  },
  {
    title: "Error",
    key: "error",
    dataIndex: "error"
  }
];

class secant extends React.Component {
  constructor() {
    super();
    this.state = {
      fx: "",
      x: 0,
      showOutput: false,
      showGraph: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.secant = this.secant.bind(this);
  }
  componentDidMount() {
    axios.get("http://192.168.99.100:9000/api/getsecant").then(res => {
      console.log(res.data);
      console.log(res.data.data.fx);
      for (var i = 0; i < res.data.data.length; i++) {
        this.setState({ fx: res.data.data[i].fx });
        this.setState({ xo: res.data.data[i].xi1 });
        this.setState({ xi: res.data.data[i].xi });
      }
    })
  }

  secant(xo, xi) {
    console.log('xo', xo)
    console.log('xi', xi)
    var xd = 0;
    var i = 0;
    var data = []
    data['x'] = []
    data['error'] = []
    data['iteration'] = []
    do {
      xd = this.funcd(xo, xi)
      xo = xi
      xi = xo - (this.func(xo) / xd)
      console.log(xi);
      console.log("error", this.error(xi, xo));
      data['iteration'][i] = i;
      data['x'][i] = xi.toFixed(6);
      data['error'][i] = this.error(xi, xo).toFixed(6);
      i++;
    } while (i <= 1 || this.error(xi, xo) > 0.000001);
    console.log(data);
    //x^2-7
    this.createTable(data['x'], data['error']);
    this.setState({
      showOutput: true,
      showGraph: true

    })

  }
  //x^2-7
  //2 3
  error(xnew, xold) {
    return Math.abs((xnew - xold) / xnew);
  }
  func(X) {
    return parse(this.state.fx).evaluate({ x: X });
  }
  funcd(xo, xi) {
    return (this.func(xo) - this.func(xi)) / (xo - xi)
  }
  createTable(x, error) {
    dataT = []
    dataX = []
    for (var i = 0; i < x.length; i++) {
      dataT.push({
        iteration: i + 1,
        x: x[i],
        error: error[i],
      });
      dataX.push({
        iteration: i + 1,
        x: x[i],
        fx: this.func(x[i]),
        error: error[i],
      });
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    return (
      <Layout>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Numerical</Breadcrumb.Item>
          <Breadcrumb.Item>Root of equations</Breadcrumb.Item>
          <Breadcrumb.Item>Secant</Breadcrumb.Item>
        </Breadcrumb>
        <div onChange={this.handleChange}>
          <header>X <sub>i-1</sub>&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="xo" /></header><br></br>
          <header>X <sub>i</sub>&nbsp;&nbsp;&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="xi" /></header><br></br>
          <Input size="default" style={{ width: 300 }} name="fx" placeholder="Function" /><br></br><br></br>
          <Button onClick={() => this.secant(parseFloat(this.state.xo), parseFloat(this.state.xi))} size="large" type="primary">SUMMIT  </Button>
        </div><br></br>
        <Button size="large" style={{ width: 300 }}>
          FX : {this.state.fx}  X <sub>i-1 </sub> : {this.state.xo}  X <sub>i </sub> : {this.state.xi}
        </Button><br></br>
        {this.state.showGraph &&
          <LineChart
            width={1000}
            height={400}
            data={dataX}
            margin={{ top: 30, bottom: 10 }}
            style={{ backgroundColor: "#fff" }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis
              type="number"
              dataKey="fx"
              domain={["auto", "auto"]}
              allowDataOverflow="true"
            />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="fx" stroke="#8884d8" />
          </LineChart>
        }<br></br><br></br>
        {this.state.showOutput &&
          <Table style={{ width: 1000 }} columns={columns} dataSource={dataT} pagination={{ pageSize: 10 }} ></Table>
        }

      </Layout>

    );
  }
}


export default secant;
