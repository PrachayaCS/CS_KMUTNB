import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class home extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="App" />
          <header style={{margin:'15px' ,textAlign: 'center', color: 'white',fontSize:'16px'}}>{(this.state.collapsed === false) ? "Numerical Method" : "Numer"}</header>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Root of equations</span>
                </span>
              }
            >
              <Menu.Item key="1">Bisection Method</Menu.Item>
              <Menu.Item key="2">False Position Method</Menu.Item>
              <Menu.Item key="3">One-point Iteration</Menu.Item>
              <Menu.Item key="4">Newton-raphson</Menu.Item>
              <Menu.Item key="5">Secant Method</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Linear equations</span>
                </span>
              }
            >
              <Menu.Item key="6">Cramer's rule</Menu.Item>
              <Menu.Item key="7">Gauss elimination</Menu.Item>
              <Menu.Item key="8">Gauss seidel</Menu.Item>
              <Menu.Item key="9">LU Decomposition</Menu.Item>
              <Menu.Item key="10">Jacobi method </Menu.Item>
              <Menu.Item key="11">Gauss Jordan </Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default home;
