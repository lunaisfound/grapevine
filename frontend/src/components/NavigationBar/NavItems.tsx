import { EnvironmentOutlined, BookOutlined, BellOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import React from 'react';

const navItems = [
  { key: 'dashboard', icon: <EnvironmentOutlined style={{ fontSize: 30 }} />, label: 'Dashboard' },
  { key: 'saved', icon: <BookOutlined style={{ fontSize: 30 }} />, label: 'Saved' },
  { key: 'forum', icon: <BellOutlined style={{ fontSize: 30 }} />, label: 'Forum' },
];

export default function NavItems() {
  const [current, setCurrent] = useState('dashboard');

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
      onClick={(e) => setCurrent(e.key)}
      style={{
        background: 'transparent',
        borderBottom: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '32px',
        padding: 0,
      }}
    >
      {navItems.map((item) => (
        <Menu.Item
          key={item.key}
          style={{
            borderRadius: 20,
            padding: '8px 16px',
            backgroundColor: current === item.key ? '#e7dfb9' : 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 72, 
            height: 60,
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {React.cloneElement(item.icon, {
            style: {
              fontSize: 20,
              color: current === item.key ? '#61572D' : '#3d361c',
            },
          })}
            <span
              style={{
                fontSize: 12,
                lineHeight: '16px',
                fontWeight: 500,
                color: '#3d361c',
                marginTop: 4,
              }}
            >
              {item.label}
            </span>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );
}
