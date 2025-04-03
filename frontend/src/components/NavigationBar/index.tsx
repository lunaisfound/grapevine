'use client';

import Logo from './logo';
import NavItems from './NavItems';
import SearchBar from './SearchBar';
import AvatarComponent from './Avatar';
import { Layout, Space } from 'antd';

const { Header } = Layout

export default function NavigationBar() {
  return (
    <Header style={{ backgroundColor: '#FFF5B8', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 122 }}>
      <Logo />
      <Space size="large" style={{ display: 'flex', alignItems: 'center' }}>
        <NavItems />
        <SearchBar />
        <AvatarComponent />
      </Space>
    </Header>
  );
}
