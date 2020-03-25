import React from 'react';
import '../App.css';
import { Layout, Breadcrumb } from 'antd';
import { parse } from 'mathjs'
import { Input, Table, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios';
// import d3 from "d3";
// window.d3 = d3;

// const functionPlot = require("function-plot");
// const chart = useRef(null)

var dataT = []
var dataX = []

const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration"
  },
  {
    title: "Xl",
    dataIndex: "xl",
    key: "xl"
  },
  {
    title: "Xr",
    dataIndex: "xr",
    key: "xr"
  },
  {
    title: "Xm",
    dataIndex: "x",
    key: "x"
  },
  {
    title: "Error",
    key: "error",
    dataIndex: "error"
  }
];

var fx = " ";

class Bisection extends React.Component {
  constructor() {
    super();
    this.state = {
      fx: "",
      xl: 0,
      xr: 0,
      showOutput: false,
      showGraph: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.bisection = this.bisection.bind(this);
  }
  
  componentDidMount() {
    axios.get("http://192.168.99.100:9000/api/getbisection").then(res => {
      console.log(res.data);
      console.log(res.data.data.fx);
      for (var i = 0; i < res.data.data.length; i++) {
        this.setState({ fx: res.data.data[i].fx });
        this.setState({ xl: res.data.data[i].xl });
        this.setState({ xr: res.data.data[i].xr });
      }
    })
  }

  bisection(xl, xr) {
    
    console.log(xl)
    console.log(xr)
    fx = this.state.fx;
    console.log(fx)
    var xm = 0;
    var sum = parseFloat(0.000000);
    var i = 0;
    var data = []
    data['xl'] = []
    data['xr'] = []
    data['x'] = []
    data['error'] = []
    data['iteration'] = []
    do {
      xm = (xl + xr) / 2;
      if (this.func(xm) * this.func(xr) < 0) {
        sum = this.error(xm, xl);
        if (this.func(xm) * this.func(xl) > 0) {
          xl = xm;
        }
        else {
          xr = xm;
        }
      }
      else {
        sum = this.error(xm, xr);
        if (this.func(xm) * this.func(xl) < 0) {
          xr = xm;
        }
        else {
          xl = xm;
        }
      }
      data['iteration'][i] = i;
      data['xl'][i] = xl.toFixed(6);
      data['xr'][i] = xr.toFixed(6);
      data['x'][i] = xm.toFixed(6);
      data['error'][i] = Math.abs(sum).toFixed(6);
      i++;
    } while ( i<=1 || Math.abs(sum) > 0.000001);
    this.createTable(data['xl'], data['xr'], data['x'], data['error']);
    this.setState({
      showOutput: true,
      showGraph: true

    })

  }
  error(xnew, xold) {
    return Math.abs((xnew - xold) / xnew);
  }
  func(X) {
    return parse(this.state.fx).evaluate({ x: X });
  }
  createTable(xl, xr, x, error) {
    dataT = []
    dataX = []
    for (var i = 0; i < xl.length; i++) {
      dataT.push({
        iteration: i + 1,
        xl: xl[i],
        xr: xr[i],
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
          <Breadcrumb.Item>Bisection</Breadcrumb.Item>
        </Breadcrumb>
        <div onChange={this.handleChange}>
          <header>X <sub>L</sub>&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="xl" /></header><br></br>
          <header>X <sub>R</sub>&nbsp;<Input size="default" style={{ width: 50 }} name="xr" /></header><br></br>
          <Input size="default" style={{ width: 300 }} name="fx" placeholder="Function" /><br></br><br></br>
          <Button onClick={() => this.bisection(parseFloat(this.state.xl), parseFloat(this.state.xr))} size="large" type="primary">SUMMIT  </Button>
        </div><br></br>
        
        <Button size="large" style={{ width: 300 }}>
          FX : {this.state.fx}  X <sub>L </sub> : {this.state.xl}  X <sub>R </sub> : {this.state.xr}
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
          // functionPlot({
          //   target: chart.current,
          //   width: 700 ,
          //   height: 600,
          //   yAxis: { domain: [-1, 9] },
          //   tip: {
          //     renderer: function () { }
          //   },
          //   grid: false,
          //   data: [
          //     {
          //       fn: this.state.fx
      
          //     }
          //   ],
          // })
          // <div ref={chart}></div>
        }<br></br><br></br>
        {this.state.showOutput &&
          <Table style={{ width: 1000 }} columns={columns} dataSource={dataT} pagination={{ pageSize: 10 }} ></Table>
        }

      </Layout>

    );
  }
}


export default Bisection;
