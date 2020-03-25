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
var fx = " ";

class onepoint extends React.Component {
  constructor() {
    super();
    this.state = {
        fx: "",
        x: 0,
        showOutput: false,
        showGraph: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.onepoint = this.onepoint.bind(this);
  }
  componentDidMount() {
    axios.get("http://192.168.99.100:9000/api/getonepoint").then(res => {
      console.log(res.data);
      console.log(res.data.data.fx);
      for (var i = 0; i < res.data.data.length; i++) {
        this.setState({ fx: res.data.data[i].fx });
        this.setState({ x: res.data.data[i].x });
      }
    })
  }
  onepoint(x) {
      console.log(x)
      fx = this.state.fx;
      console.log(fx)
      var xm = 0;
      var i = 0;
      var data = []
      data['x'] = []
      data['error'] = []
      data['iteration'] = []
      do {

          xm = x;
          x = this.func(xm);
          console.log(x);
          console.log("error",this.error(x,xm));
          data['iteration'][i] = i;
          data['x'][i] = x.toFixed(6);
          data['error'][i] = this.error(x,xm).toFixed(6);
          i++;
      } while (i <= 1 || this.error(x,xm) > 0.000001);
      console.log(data);
      //2-(e^(x/4))
      //2
      this.createTable(data['x'], data['error']);
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
            <Breadcrumb.Item>Onepoint</Breadcrumb.Item>
          </Breadcrumb>
          <div onChange={this.handleChange}>
            <header>X&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="x"  /></header><br></br>
            <Input size="default" style={{ width: 300 }} name="fx" placeholder="Function" /><br></br><br></br>
            <Button onClick={() => this.onepoint(parseFloat(this.state.x))} size="large" type="primary">SUMMIT  </Button><br></br><br></br>

            <Button size="large" style={{ 
              width: 300 }}>FX : {this.state.fx}  X : {this.state.x}
            </Button><br></br>

          </div><br></br>
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


export default onepoint;
