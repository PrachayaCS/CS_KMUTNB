import React from 'react';
import '../App.css';
import { Layout, Breadcrumb } from 'antd';
import { parse, create, all } from 'mathjs'
import { Input, Button } from 'antd';
import axios from 'axios';

const mathjs = create(all)
const mathInt = require('mathjs-simple-integral');
mathjs.import(mathInt)

class compositesimson extends React.Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            e: 0,
            ans: 0,
            showOutput: false,
            showGraph: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.compositesimson = this.compositesimson.bind(this);
    }
    componentDidMount() {
        axios.get("http://192.168.99.100:9000/api/getsimson").then(res => {
            console.log(res.data);
            console.log(res.data.data.fx);
            for (var i = 0; i < res.data.data.length; i++) {
                this.setState({ fx: res.data.data[i].fx });
                this.setState({ a: res.data.data[i].a });
                this.setState({ b: res.data.data[i].b });
                this.setState({ n: res.data.data[i].n });
            }
        })
    }
    compositesimson(b, a, n) {
        console.log('b', b)
        console.log('a', a)
        this.setState({ans : 0})
        var i
        var x = a
        var h = (b - a) / n
        var ans = 0
        var e = 0
        for (i = 0; i <= n; i++) {
            if (i === 0 || i === n) {
                ans += this.func(x);
            } else {
                ans += (i%2 === 1) ? 4 * this.func(x) : 2 * this.func(x) ;
            }
            x += h
        }

        ans *= h / 3
        this.setState({ans : ans})
        console.log(ans);
        const inte = mathjs.integral(this.state.fx,'x');
        console.log(inte);
        const intes = inte.toString();
        console.log(intes);
        const real = mathjs.parse(intes).evaluate({x:b})-mathjs.parse(intes).evaluate({x:a})
        console.log(real)
        e = Math.abs((real - ans) / real).toFixed(6)
        this.setState({e : e})
        console.log(e)

    }
    //2/(x-4)
    //0.5 0 6
    //(4*x^5)-(3*x^4)+(x^3)-(6*x)+2
    //8 2 6
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    func(X) {
        return parse(this.state.fx).evaluate({ x: X });
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
                    <Breadcrumb.Item>Simson's rule</Breadcrumb.Item>
                </Breadcrumb>
                <div onChange={this.handleChange}>
                    <header>A&nbsp;&nbsp;&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="a" /></header><br></br>
                    <header>B&nbsp;&nbsp;&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="b" /></header><br></br>
                    <header>N&nbsp;&nbsp;&nbsp;&nbsp;<Input size="default" style={{ width: 50 }} name="n" /></header><br></br>
                    <Input size="default" style={{ width: 300 }} name="fx" placeholder="Function" /><br></br><br></br>
                    <Button onClick={() => this.compositesimson(parseFloat(this.state.b), parseFloat(this.state.a), parseFloat(this.state.n))} size="large" type="primary">SUMMIT  </Button>
                </div><br></br>
                <Button size="large" style={{ width: 500 }}>
                    FX : {this.state.fx}  Lower : {this.state.a}  Upper : {this.state.b} N : {this.state.n}
                </Button><br></br>
                <header><h2>ANS : {this.state.ans} ERROR : {this.state.e} </h2></header><br></br>
            </Layout>

        );
    }
}


export default compositesimson;
