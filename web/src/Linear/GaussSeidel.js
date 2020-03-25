import React, { useState } from 'react';
import '../App.css';
import { Layout, InputNumber, Button, Breadcrumb } from 'antd';
import axios from 'axios';

function GaussSeidel() {
    let [n, setn] = useState(2);
    var matrixA = [];
    var matrixB = [];
    var ans = [];
    const [data, setdata] = useState(Array(n).fill(0));
    var temp;
    const codeGaussSeidel = () => {
        console.log(matrixA)
        console.log(matrixB)
        const Eps = (X, Xo, epsilon) => {
            var Ex = new Array(matrixA.length).fill(false)
            for (i = 0; i < matrixA.length; i++) {
                Ex[i] = (Math.abs((X[i] - Xo[i]) / X[i]) > epsilon) ? true : false
            }
            for (i = 0; i < matrixA.length; i++) {
                if (Ex[i] === true) return true
            }
            return false
        }
        const epsilon = 0.000001
        var e = true
        var X = Array(matrixA.length).fill(0)
        var Xi = Array(matrixA.length).fill(0)
        var Xo = Array(matrixA.length).fill(0)
        var iter = 1
        var i, j
        while (e) {
            Xo = JSON.parse(JSON.stringify(X));
            X = JSON.parse(JSON.stringify(matrixB));
            for (i = 0; i < matrixA.length; i++) {
                for (j = 0; j < matrixA.length; j++) {
                    if (i !== j) {
                        X[i] -= Xi[j] * matrixA[i][j]
                    }
                }
                X[i] /= matrixA[i][i]
                X[i] = X[i].toFixed(6)
                Xi[i] = JSON.parse(JSON.stringify(X[i]));
            }
            if (iter > 1) {
                e = Eps(X, Xo, epsilon)
            }
            iter++
        }
        console.log(X)
        setdata(X)
    }
    const createInput = () => {
        temp = Array.from(Array(n), _ => Array(n + 1).fill(0))
        matrixA = Array.from(Array(n), _ => Array(n).fill(0))
        matrixB = Array(n).fill(0)
        return (
            <div>
                <tr>
                    <th></th>
                    {createHead()}
                    {(n > 0) ? <th>b</th> : ""}
                </tr>
                {createRow()}
            </div>
        );
    }

    const createHead = () => {
        return temp.map((x, j) => <th>x{j + 1}</th>);
    }

    const createRow = () => {
        return temp.map((x, i) => (
            <tr>
                <th>{i + 1}</th>
                {createCol(i)}
            </tr>
        ));
    }

    const createCol = (i) => {
        return temp[0].map((x, j) => (
            <td>
                <InputNumber defaultValue={0} size="small" onChange={value => {
                    if (j === n) {
                        matrixB[i] = value
                    } else {
                        matrixA[i][j] = value
                    }
                }}
                />
            </td>
        ));
    }
    const componentDidMount = () => {
        axios.get("http://192.168.99.100:9000/api/getjacobi").then(res => {
          n = res.data.data[0].n[0]
          matrixA = res.data.data[0].A
          matrixB = res.data.data[0].B
          setn(res.data.data[0].n[0])
          console.log(matrixA)
          console.log(matrixB)
          console.log(n)
        })
    }

    const print = () => {
        ans = Array(n).fill(0)
        return ans.map((x, j) => <p><h3>x{j + 1}={data[j]}</h3></p>)
    }
    return (
        <Layout>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Numerical</Breadcrumb.Item>
                <Breadcrumb.Item>Linear Equations</Breadcrumb.Item>
                <Breadcrumb.Item>Gauss Seidel</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 30 }}>
                <h1>Matrix</h1><InputNumber min={1} onChange={value => setn(value)} /><br></br><br></br>
                {createInput(n)}<br></br>
                <Button onClick={componentDidMount} style={{ width: 100 }} type="primary">DB</Button><br></br><br></br>
                <Button onClick={codeGaussSeidel} type="primary">Summit</Button><br></br><br></br>
                <h2>ANS :</h2> {print(n)}
            </div>
        </Layout>
    )
}
export default GaussSeidel