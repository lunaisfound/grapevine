'use client';

import Logo from './logo';
import NavItems from './NavItems';
import SearchBar from './SearchBar';
import AvatarComponent from './Avatar';
import AccountDropdown from './AccountDropdown'; 
import { Layout, Space } from 'antd';

const { Header } = Layout

export default function NavigationBar() {
  return (
    <Header
      style={{
        backgroundColor: '#FFF5B8',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 122,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
        <Logo />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <NavItems />
        <SearchBar />
        <AccountDropdown username="HelloWorld123" isBusiness={false} />
        </div>
    </Header>
  );
}
