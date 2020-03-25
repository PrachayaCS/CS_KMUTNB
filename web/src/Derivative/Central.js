import React from 'react';
import '../App.css';
import { Layout, Breadcrumb, Radio } from 'antd';
import { parse, derivative } from 'mathjs'
import { Input, Button } from 'antd';
import axios from 'axios';
const RadioGroup = Radio.Group;

class CentralOH2 extends React.Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            d: 0,
            h: 0,
            x: 0,
            e: 0,
            pow: 2,
            ans: 0,
            value: 1,
            showOutput: false,
            showGraph: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.CentralOH2 = this.CentralOH2.bind(this);
    }

    componentDidMount() {
        axios.get("http://192.168.99.100:9000/api/getcentral").then(res => {
            console.log(res.data);
            console.log(res.data.data.fx);
            for (var i = 0; i < res.data.data.length; i++) {
                this.setState({ fx: res.data.data[i].fx });
                this.setState({ d: res.data.data[i].d });
                this.setState({ h: res.data.data[i].h });
                this.setState({ x: res.data.data[i].x });
            }
        })
    }

    CentralOH2(d, h, x) {
        this.setState({ ans: 0 })
        var ans = 0
        var e = 0
        var real = 0
        if (this.state.pow === 1) {
            if (d === 1) {
                ans = (this.func(x + h) - this.func(x - h)) / (2 * h)
                real = this.funcd(x)
            } else if (d === 2) {
                ans = (this.func(x + h) - 2 * this.func(x) + this.func(x - h)) / Math.pow(h, 2)
                real = this.funcd2(x)
            } else if (d === 3) {
                ans = (this.func(x + 2 * h) - 2 * this.func(x + h) + 2 * this.func(x - h) - this.func(x - 2 * h)) / (2 * (Math.pow(h, 3)))
                real = this.funcd3(x)
            } else if (d === 4) {
                ans = (this.func(x + 2 * h) - 4 * this.func(x + h) + 6 * this.func(x) - 4 * this.func(x - h) + this.func(x - 2 * h)) / (Math.pow(h, 4))
                real = this.funcd4(x)
            }
        }else{
            if (d === 1) {
                ans = (-(this.func(x + (2 * h))) + 8 * this.func(x + h) - 8 * this.func(x - h) + this.func(x - (2 * h))) / (12 * h)
                real = this.funcd(x)
            } else if (d === 2) {
                ans = (-(this.func(x + (2 * h))) + 16 * this.func(x + h) - 30 * this.func(x) + 16 * this.func(x - h) - this.func(x - (2 * h))) / (12 * (Math.pow(h, 2)))
                real = this.funcd2(x)
            } else if (d === 3) {
                ans = (-(this.func(x + (3 * h))) + 8 * this.func(x + (2 * h)) - 13 * this.func(x + h) + 13 * this.func(x - h) - 8 * this.func(x - (2 * h)) + this.func(x - (3 * h))) / (8 * (Math.pow(h, 3)))
                real = this.funcd3(x)
            } else if (d === 4) {
                ans = (-(this.func(x + (3 * h))) + 12 * this.func(x + (2 * h)) - 39 * this.func(x + h) + 56 * this.func(x) - 39 * this.func(x - h) + 12 * this.func(x - (2 * h)) - this.func(x - (3 * h))) / (6 * (Math.pow(h, 4)))
                real = this.funcd4(x)
            }
        }
        console.log("cal :", ans)

        console.log("real :", real)
        this.setState({ ans: ans })
        e = Math.abs((real - ans) / real).toFixed(6)
        console.log("error :", e)
        this.setState({ e: e })
    }
    //e^(x/3)+x^2
    //2 0.1 -2.5
    func(X) {
        return parse(this.state.fx).evaluate({ x: X });
    }
    funcd(X) {
        return derivative(this.state.fx, 'x').evaluate({ x: X });
    }
    funcd2(X) {
        return derivative(derivative(this.state.fx, 'x'), 'x').evaluate({ x: X });
    }
    funcd3(X) {
        return derivative(derivative(derivative(this.state.fx, 'x'), 'x'), 'x').evaluate({ x: X });
    }
    funcd4(X) {
        return derivative(derivative(derivative(derivative(this.state.fx, 'x'), 'x'), 'x'), 'x').evaluate({ x: X });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
            pow: e.target.value,
        });
    }
    render() {
        return (
            <Layout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Numerical</Breadcrumb.Item>
                    <Breadcrumb.Item>Derivative</Breadcrumb.Item>
                    <Breadcrumb.Item>Central OH2</Breadcrumb.Item>
                </Breadcrumb>
                <div onChange={this.handleChange}>
                    <Input size="default" style={{ width: 300 }} name="fx" placeholder="Function" /><br></br><br></br>
                    <header>D&nbsp;&nbsp;&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="d" /></header><br></br>
                    <header>H&nbsp;&nbsp;&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="h" /></header><br></br>
                    <header>X&nbsp;&nbsp;&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="x" /></header><br></br>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>O(h^2)</Radio>
                        <Radio value={2}>O(h^4)</Radio>
                    </RadioGroup><br></br><br></br>
                    <Button onClick={() => this.CentralOH2(parseFloat(this.state.d), parseFloat(this.state.h), parseFloat(this.state.x))} size="large" type="primary">SUMMIT  </Button>
                </div><br></br>
                <Button size="large" style={{ width: 500 }} onClick={console.log(this.state.fx)}>
                    FX : {this.state.fx}  D : {this.state.d}  H : {this.state.h} X : {this.state.x}
                </Button><br></br>
                <header><h2> ANS : {this.state.ans} ERROR : {this.state.e} </h2></header><br></br>
            </Layout>

        );
    }
}


export default CentralOH2;
