import React from 'react';
import '../App.css';
import { useState } from 'react'
import { Layout, Breadcrumb } from 'antd';
import { InputNumber } from 'antd';
import { Button } from 'antd';
import axios from 'axios';

function NDD() {
  let [n, setn] = useState(0)
  let [x, setx] = useState(0)
  const [size, setsize] = useState(0)
  const [xans, setxans] = useState(0)
  var temp, Inputx = [], Inputfx = []
  var [ch, setch] = useState({ Inputx: [], Inputfx: [] })

  const runcode = () => {
    console.log(Inputx)
    console.log(Inputfx)
    x = codeNDD(x, Inputx, Inputfx)
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
    axios.get("http://192.168.99.100:9000/api/getndd").then(res => {
      var ans = codeNDD(res.data.data[0].n, res.data.data[0].x, res.data.data[0].y)
      console.log(res.data.data[0].x)
      console.log(res.data.data[0].y)
      console.log(res.data.data[0].n)
      setx(res.data.data[0].n)
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
  const codeNDD = (xn, x, y) => {
    console.log(xn)
    console.log(x)
    console.log(y)
    const polynomail = (xn, x, temp) => {
      for (j = 1; j < x.length; j++) {
        for (i = 0; i < (x.length - j); i++) {
          temp[i][j] = (temp[i + 1][j - 1] - temp[i][j - 1]) / (x[i + j] - x[i])
        }
      }
      console.table(temp)
      return f(xn, x, temp)
    }

    const f = (xn, x, temp) => {
      var ans = 0
      for (i = 0; i < x.length; i++) {
        ans += (temp[0][i] * fx(xn, x, i))
        console.log(ans.toFixed(6))
      }

      return ans.toFixed(6)
    }

    const fx = (xn, x, i) => {
      var sx = 1
      for (j = 0; j < i; j++) {
        sx *= xn - x[j]
      }
      return sx
    }

    //var xn = 42000
    //var x = [0, 20000, 40000, 60000, 80000]
    //var y = [9.81, 9.7478, 9.6879, 9.6879, 9.5682]
    var temp = Array.from(Array(x.length), _ => Array(x.length).fill(0))
    var i, j
    for (i = 0; i < x.length; i++) {
      temp[i][0] = y[i]
    }
    return (polynomail(xn, x, temp))
  }

  return (
    <Layout >
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Numerical</Breadcrumb.Item>
        <Breadcrumb.Item>Interporation</Breadcrumb.Item>
        <Breadcrumb.Item>Newton Divided Difference</Breadcrumb.Item>
      </Breadcrumb>
      <div >
        N <InputNumber style={{ marginLeft: 10 }} defaultValue={n} min={0} max={10} step={1} onChange={value => setn(value)} /><br></br><br></br>
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

export default NDD