import { EnvironmentOutlined, BookOutlined, BellOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    key: 'dashboard',
    icon: <EnvironmentOutlined />,
    label: <span style={{ fontSize: 12 }}>Dashboard</span>,
  },
  {
    key: 'saved',
    icon: <BookOutlined />,
    label: <span style={{ fontSize: 12 }}>Saved</span>,
  },
  {
    key: 'forum',
    icon: <BellOutlined />,
    label: <span style={{ fontSize: 12 }}>Forum</span>,
  },
];
export default function NavItems() {
  return (
  <Menu
        mode="horizontal"
        items={items}
        style={{
          backgroundColor: 'transparent',
          borderBottom: 'none',
          display: 'flex',
          gap: '2rem', 
        }}
      />  
  );
}
