import React from 'react';
import '../App.css';
import { Layout, Breadcrumb, Radio } from 'antd';
import { parse, derivative } from 'mathjs'
import { Input, Button } from 'antd';
import axios from 'axios';
const RadioGroup = Radio.Group;

class ForwardOH extends React.Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            d: 0,
            h: 0,
            x: 0,
            e: 0,
            pow: 1,
            ans: 0,
            value: 1,
            showOutput: false,
            showGraph: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.ForwardOH = this.ForwardOH.bind(this);
    }

    componentDidMount() {
        axios.get("http://192.168.99.100:9000/api/getfwoh").then(res => {
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

    ForwardOH(d, h, x) {
        this.setState({ ans: 0 })
        var ans = 0
        var e = 0
        var real = 0
        if(this.state.pow === 1){
            if (d === 1) {
                ans = (this.func(x + h) - this.func(x)) / h
                real = this.funcd(x)
            } else if (d === 2) {
                ans = (this.func(x + (2 * h)) - 2 * this.func(x + h) + this.func(x)) / Math.pow(h, 2)
                real = this.funcd2(x)
            } else if (d === 3) {
                ans = (this.func(x + (3 * h)) - 3 * this.func(x + (2 * h)) + 3 * this.func(x + h) - this.func(x)) / Math.pow(h, 3)
                real = this.funcd3(x)
            } else if (d === 4) {
                ans = (this.func(x + (4 * h)) - 4 * this.func(x + (3 * h)) + 6 * this.func(x + (2 * h)) - 4 * this.func(x + h) + this.func(x)) / Math.pow(h, 4)
                real = this.funcd4(x)
            }
        }else{
            if (d === 1) {
                ans = (-(this.func(x + (2 * h))) + 4 * (this.func(x + h)) - 3 * (this.func(x))) / (2 * h)
                real = this.funcd(x)
            } else if (d === 2) {
                ans = (-(this.func(x + (3 * h))) + 4 * (this.func(x + (2 * h))) - 5 * (this.func(x + h)) + 2 * (this.func(x))) / Math.pow(h, 2)
                real = this.funcd2(x)
            } else if (d === 3) {
                ans = (-3 * (this.func(x + (4 * h))) + 14 * (this.func(x + (3 * h))) - 24 * (this.func(x + (2 * h))) + 18 * (this.func(x + h)) - 5 * (this.func(x))) / (2 * (Math.pow(h, 3)))
                real = this.funcd3(x)
            } else if (d === 4) {
                ans = (-2 * (this.func(x + (5 * h))) + 11 * (this.func(x + (4 * h))) - 24 * (this.func(x + (3 * h))) + 26 * (this.func(x + (2 * h))) - 14 * (this.func(x + h)) + 3 * this.func(x)) / (Math.pow(h, 4))
                real = this.funcd4(x)
            }
        }
        
        console.log("cal :", ans)
        console.log("real :", real)
        this.setState({ ans: ans })
        e = Math.abs((real - ans) / real).toFixed(6)
        this.setState({ e: e })
    }
    //e^x
    //1 0.25 2
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
            pow : e.target.value,
        });
    }

    render() {
        return (
            <Layout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Numerical</Breadcrumb.Item>
                    <Breadcrumb.Item>Derivative</Breadcrumb.Item>
                    <Breadcrumb.Item>Forward OH</Breadcrumb.Item>
                </Breadcrumb>
                <div onChange={this.handleChange}>
                    <Input size="default" style={{ width: 300 }} name="fx" placeholder="Function" /><br></br><br></br>
                    <header>D&nbsp;&nbsp;&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="d" /></header><br></br>
                    <header>H&nbsp;&nbsp;&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="h" /></header><br></br>
                    <header>X&nbsp;&nbsp;&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="x" /></header><br></br>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>O(h)</Radio>
                        <Radio value={2}>O(h^2)</Radio>
                    </RadioGroup><br></br><br></br>
                    <Button onClick={() => this.ForwardOH(parseFloat(this.state.d), parseFloat(this.state.h), parseFloat(this.state.x))} size="large" type="primary">SUMMIT  </Button>
                </div><br></br>
                <Button size="large" style={{ width: 500 }} onClick={console.log(this.state.fx)}>
                    FX : {this.state.fx}  D : {this.state.d}  H : {this.state.h} X : {this.state.x} POW : {this.state.pow}
                </Button><br></br>
                <header><h2> ANS : {this.state.ans} ERROR : {this.state.e} </h2></header><br></br>
            </Layout>

        );
    }
}


export default ForwardOH;
