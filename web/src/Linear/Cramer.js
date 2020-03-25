import React, { useState } from 'react';
import '../App.css';
import { Layout, InputNumber, Button, Breadcrumb } from 'antd';
import axios from 'axios';
const { det } = require("mathjs");

function Cramer() {
  var x = []
  let [n, setn] = useState(2)
  var matrixA = []
  var matrixB = []
  var ans = []
  const [data, setdata] = useState(Array(n).fill(0))
  var temp

  const codecramer = () => {
    var i = 0
    var j = 0
    console.log(matrixA)
    console.log(matrixB)
    var detA = det(matrixA)
    for (i = 0; i < matrixA.length; i++) {
      var temp = JSON.parse(JSON.stringify(matrixA))
      for (j = 0; j < matrixA.length; j++) {
        temp[j][i] = matrixB[j]
      }
      x.push((det(temp) / detA).toFixed(6))
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
    )
  }

  const createHead = () => {
    return temp.map((x, j) => <th>x{j + 1}</th>)
  }

  const createRow = () => {
    return temp.map((x, i) => (
      <tr>
        <th>{i + 1}</th>
        {createCol(i)}
      </tr>
    ))
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
    ))
  }

  const componentDidMount = () => {
    axios.get("http://192.168.99.100:9000/api/getcramer").then(res => {
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
        <Breadcrumb.Item>Cramer's rule</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 24, minHeight: 30 }}>
        <h1>Matrix</h1><InputNumber min={1} onChange={value => setn(value)} /><br></br><br></br>
        {createInput(n)}<br></br>
        <Button onClick={componentDidMount} style={{ width: 100 }} type="primary">DB</Button><br></br><br></br>
        <Button onClick={codecramer} type="primary">Summit</Button><br></br><br></br>
        <h2>ANS :</h2> {print(n)}
      </div>
    </Layout>
  )
}
export default Cramer

