import React from 'react';
import '../App.css';
import { useState } from 'react'
import { Layout, Breadcrumb } from 'antd';
import { InputNumber } from 'antd';
import { Button } from 'antd';
import axios from 'axios';

function Lagrange() {
  let [n, setn] = useState(0)
  let [x, setx] = useState(0)
  const [size, setsize] = useState(0)
  const [xans, setxans] = useState(0)
  var temp, Inputx = [], Inputfx = []
  var [ch, setch] = useState({ Inputx: [], Inputfx: [] })

  const runcode = () => {
    console.log(Inputx)
    console.log(Inputfx)
    x = codeLagrange(x, Inputx, Inputfx)
    setxans(x)
  }

  const create = () => {
    setch({ Inputx: Array.from(n).fill(0), Inputfx: Array.from(n).fill(0) })
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
    axios.get("http://192.168.99.100:9000/api/getlagrange").then(res => {
      var ans = codeLagrange(res.data.data[0].n, res.data.data[0].x, res.data.data[0].y)
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
  const codeLagrange = (xn, x, y) => {
    const L = (xn, x, i) => {
        var sx = 1
        for (j = 0; j < x.length; j++) {
            if (j !== i) {
                sx *= (x[j] - xn) / (x[j] - x[i])
            }
        }
        return sx
    }

    //var xn = 42000
    //var x = [0, 20000, 40000, 60000, 80000]
    //var y = [9.81, 9.7478, 9.6879, 9.6879, 9.5682]
    var i, j
    var ans = 0
    for (i = 0; i < x.length; i++) {
        ans += (y[i] * L(xn, x, i))
        console.log(ans.toFixed(6))
    }
    
    return ans.toFixed(6)
}

  return (
    <Layout >
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Numerical</Breadcrumb.Item>
          <Breadcrumb.Item>Interporation</Breadcrumb.Item>
          <Breadcrumb.Item>Lagrange</Breadcrumb.Item>
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

export default Lagrange