import React from 'react';
import '../App.css';
import { useState } from 'react'
import { Layout, Breadcrumb } from 'antd';
import { InputNumber } from 'antd';
import { Button } from 'antd';
import axios from 'axios';

function Linear() {
  let [n, setn] = useState(0)
  let [x, setx] = useState(0)
  let [s, sets] = useState(0)
  const [size, setsize] = useState(0)
  const [xans, setxans] = useState(0)
  var temp, Inputx = [], Inputfx = []
  var [ch, setch] = useState({ Inputx: [], Inputfx: [] })

  const runcode = () => {
    console.log(Inputx)
    console.log(Inputfx)
    x = codelinearlsr(x, Inputx, Inputfx, s)
    setxans(x)
  }

  const create = () => {
    setch({ Inputx: Array(n).fill(0), Inputfx: Array(n).fill(0) })
    setsize(n)
  }

  const createInput = () => {
    temp = Array(size).fill(0)
    Inputx = ch.Inputx
    Inputfx = ch.Inputfx
    return (
      <div>
        <tr>
          X<sub>i</sub>
          {createInputx()}
        </tr>
        <tr>
          F<sub>x</sub>
          {createInputfx()}
        </tr>
      </div>
    );
  }

  const componentDidMount = () => {
    axios.get("http://192.168.99.100:9000/api/getlinear").then(res => {
      var ans = codelinearlsr(res.data.data[0].n, res.data.data[0].x, res.data.data[0].y,res.data.data[0].s)
      console.log(res.data.data[0].x)
      console.log(res.data.data[0].y)
      console.log(res.data.data[0].n)
      console.log(res.data.data[0].s)
      setx(res.data.data[0].n)
      sets(res.data.data[0].s)
      setxans(ans)
    })
  }

  const createInputx = () => {
    return temp.map((x, j) => (
      <td>
        <InputNumber defaultValue={0} size="small" onChange={value => Inputx[j] = value} />
      </td>
    ));
  }

  const createInputfx = () => {
    return temp.map((x, j) => (
      <td>
        <InputNumber defaultValue={0} size="small" onChange={value => Inputfx[j] = value} />
      </td>
    ));
  }
  const codelinearlsr = (xn, x, y, s) => {
    s++
    var A = Array.from(Array(s), _ => Array(s).fill(0))
    var B = Array(s).fill(0)
    var i,j

    const sum = (s, ...X) => {
        var sum = 0
        if (X.length === 1) {
            for (var i = 0; i < X[0].length; i++) {
                sum += Math.pow(X[0][i], s)
            }
        } else {
            for (i = 0; i < X[0].length; i++) {
                sum += (Math.pow(X[0][i], s) * X[1][i])
            }
        }
        return sum
    }

    const guess = (A, B) => {
        console.log(A)
        console.log(B)
        var X = Array(A.length).fill(0)
        var i, j, k, temp
        for (k = 0; k < A.length - 1; k++) {
            for (i = k + 1; i < A.length; i++) {
                temp = A[i][k]
                for (j = k; j < A.length; j++) {
                    A[i][j] = (A[i][j] - (A[k][j] / A[k][k]) * temp)
                }
                B[i] = (B[i] - (B[k] / A[k][k]) * temp)
            }
        }
        for (i = A.length - 1; i >= 0; i--) {
            X[i] = B[i] / A[i][i];
            for (j = i - 1; j >= 0; j--) {
                B[j] -= A[j][i] * X[i]
            }
        }
        console.log(X)
        return X
    }

    for (i = 0; i < s; i++) {
        B[i] = (!i) ? sum(1, y) : sum(i, x, y)
        for (j = 0; j < s; j++) {
            if (!i && !j) {
                A[i][j] = x.length
            } else {
                A[i][j] = sum((i + j), x)
            }
        }
    }

    console.table(A)
    console.table(B)
    var ax = guess(A, B)
    console.table(ax)
    var ans = 0
    for (i = 0; i < s; i++) {
        ans += ax[i] * Math.pow(xn, i)
    }
    return(ans.toFixed(6))
}

  return (
    <Layout >
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Numerical</Breadcrumb.Item>
        <Breadcrumb.Item>Least Squares Regression</Breadcrumb.Item>
        <Breadcrumb.Item>Linear Regression</Breadcrumb.Item>
      </Breadcrumb>
      <div >
        N <InputNumber style={{ marginLeft: 10 }} defaultValue={n} min={0} max={10} step={1} onChange={value => setn(value)} /><br></br><br></br>
        S <InputNumber style={{ marginLeft: 10 }} defaultValue={0} onChange={value => sets(value)} /><br></br><br></br>
        <Button onClick={create} style={{ width: 100 }} type="primary">Create</Button><br></br><br></br>
        {createInput(size)}<br></br>
        X <InputNumber style={{ marginLeft: 10 }} defaultValue={0} onChange={value => setx(value)} /><br></br><br></br>
        <Button onClick={componentDidMount} style={{ width: 100 }} type="primary">DB f ({x})</Button><br></br><br></br>
        <Button onClick={runcode} style={{ width: 100 }} type="primary">Summit</Button><br></br><br></br>
        <h2>f({x}) = {xans}</h2>
      </div>
    </Layout>
  );
}

export default Linear