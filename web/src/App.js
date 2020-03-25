import React, { useState } from 'react';
import './App.css';
import Bisection from './Root/Bisection Method';
import Falseposition from './Root/Falseposition Method';
import Onepoint from './Root/Onepoint iteration';
import NewtonRaphson from './Root/Newton Raphson';
import Secant from './Root/Secant Method';
import NDD from './Interporation/NDD';
import Trapezoidal from './Integral/compositetrap'
import Simson from './Integral/compositesimson';
import Lagrange from './Interporation/lagrange';
import Fwoh from './Derivative/FWOH';
import Bwoh from './Derivative/BWOH';
import Central from './Derivative/Central';
import Cramer from './Linear/Cramer';
import Gausseli from './Linear/GaussElimination';
import GaussJordan from './Linear/GaussJordan';
import LU from './Linear/LU';
import Jacobi from './Linear/Jacobi';
import GaussSeidel from './Linear/GaussSeidel';
import LinearRegression from './LSR/Linear';

import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => setCollapsed(!collapsed);
  const [page, setpage] = useState();
  const bisectionpage = () => setpage(<Bisection />)
  const falsepositionpage = () => setpage(<Falseposition />)
  const onepointpage = () => setpage(<Onepoint />)
  const newtonpage = () => setpage(<NewtonRaphson />)
  const secantpage = () => setpage(<Secant />)
  const nddpage = () => setpage(<NDD />)
  const Lagrangepage = () => setpage(<Lagrange />)
  const compositetrappage = () => setpage(<Trapezoidal />)
  const compositesimsonpage = () => setpage(<Simson />)
  const forwardpage = () => setpage(<Fwoh />)
  const backwardpage = () => setpage(<Bwoh />)
  const centralpage = () => setpage(<Central />)
  const cramerpage = () => setpage(<Cramer />)
  const gausselipage = () => setpage(<Gausseli />)
  const gaussjordanpage = () => setpage(<GaussJordan />)
  const LUpage = () => setpage(<LU />)
  const Jacobipage = () => setpage(<Jacobi />)
  const gaussseidelpage = () => setpage(<GaussSeidel />)
  const LinearRegressionpage = () => setpage(<LinearRegression />)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="App" /><br></br>
        <header style={{ margin: '15px', textAlign: 'center', color: 'white', fontSize: '16px' }}>{(collapsed === false) ? "Numerical Method" : "Numer"} <Icon type="loading" /></header><br></br>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu
            
            title={
              <span>
                <Icon type="aliwangwang" />
                <span>Root of equations</span>
              </span>
            }
          >
            <Menu.Item onClick={bisectionpage}>Bisection Method</Menu.Item>
            <Menu.Item onClick={falsepositionpage}>False Position Method</Menu.Item>
            <Menu.Item onClick={onepointpage}>One-point Iteration</Menu.Item>
            <Menu.Item onClick={newtonpage}>Newton-raphson</Menu.Item>
            <Menu.Item onClick={secantpage}>Secant Method</Menu.Item>
          </SubMenu>
          <SubMenu
            
            title={
              <span>
                <Icon type="aliwangwang" />
                <span>Linear equations</span>
              </span>
            }
          >
            <Menu.Item onClick={cramerpage}>Cramer's rule</Menu.Item>
            <Menu.Item onClick={gausselipage}>Gauss elimination</Menu.Item>
            <Menu.Item onClick={gaussjordanpage}>Gauss Jordan</Menu.Item>
            <Menu.Item onClick={LUpage}>LU Decomposition</Menu.Item>
            <Menu.Item onClick={Jacobipage}>Jacobi method</Menu.Item>
            <Menu.Item onClick={gaussseidelpage}>Gauss Seidel</Menu.Item>
          </SubMenu>
          <SubMenu
            
            title={
              <span>
                <Icon type="aliwangwang" />
                <span>Interporation</span>
              </span>
            }
          >
            <Menu.Item  onClick={nddpage}>Newton Divided Derivation</Menu.Item>
            <Menu.Item  onClick={Lagrangepage}>Lagrange</Menu.Item>
            <Menu.Item >Spline</Menu.Item>
          </SubMenu>
          <SubMenu
            
            title={
              <span>
                <Icon type="aliwangwang" />
                <span>Least Square Regression</span>
              </span>
            }
          >
            <Menu.Item  onClick={LinearRegressionpage}>Linear Regression</Menu.Item>
            <Menu.Item >Multi Regression</Menu.Item>
          </SubMenu>
          <SubMenu
            
            title={
              <span>
                <Icon type="aliwangwang" />
                <span>Integral</span>
              </span>
            }
          >
            <Menu.Item  onClick={compositetrappage}>Composite Trapezoidal Rule</Menu.Item>
            <Menu.Item  onClick={compositesimsonpage}>Composite Simson's Rule</Menu.Item>
          </SubMenu>
          <SubMenu
            
            title={
              <span>
                <Icon type="aliwangwang" />
                <span>Derivative</span>
              </span>
            }
          >
            <Menu.Item  onClick={forwardpage}>Forward</Menu.Item>
            <Menu.Item  onClick={backwardpage}>Backward</Menu.Item>
            <Menu.Item  onClick={centralpage}>Central</Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {page}
        </Content>
      </Layout>
    </Layout>
  );

}


export default App;
