import React, { useState } from 'react';
import '../App.css';
import { Layout, InputNumber, Button, Breadcrumb } from 'antd';
import axios from 'axios';

function GaussElimination() {
    let [n, setn] = useState(2);
    var matrixA = [];
    var matrixB = [];
    var x = [];
    var ans = [];
    const [data, setdata] = useState(Array(n).fill(0));
    var temp;
    const codeGaussElimination = () => {
        var i = 0;
        var j = 0;
        var k = 0;
        var num = []
        x = [0, 0, 0]
        console.log(matrixA)
        console.log(matrixB)
        for (i = 0; i < matrixA.length - 1; i++) {
            for (j = i + 1; j < matrixA.length; j++) {
                num = matrixA[j][i]
                for (k = 0; k < matrixA.length; k++) {
                    matrixA[j][k] = matrixA[j][k] - ((matrixA[i][k] / matrixA[i][i]) * num).toFixed(6)
                }
                matrixB[j] = matrixB[j] - ((matrixB[i] / matrixA[i][i]) * num).toFixed(6)
            }
        }
        for (i = matrixA.length - 1; i >= 0; i--) {
            x[i] = matrixB[i] / matrixA[i][i]
            for (j = i - 1; j >= 0; j--) {
                matrixB[j] -= matrixA[j][i] * x[i]
            }
        }
        console.log(x)
        setdata(x)
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
        axios.get("http://192.168.99.100:9000/api/getgausseli").then(res => {
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
                <Breadcrumb.Item>Gauss Elimination</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 30 }}>
                <h1>Matrix</h1><InputNumber min={1} onChange={value => setn(value)} /><br></br><br></br>
                {createInput(n)}<br></br>
                <Button onClick={componentDidMount} style={{ width: 100 }} type="primary">DB</Button><br></br><br></br>
                <Button onClick={codeGaussElimination} type="primary">Summit</Button><br></br><br></br>
                <h2>ANS :</h2> {print(n)}
            </div>
        </Layout>
    )
}
export default GaussElimination

