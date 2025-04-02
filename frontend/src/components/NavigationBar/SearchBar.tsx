import { Input } from 'antd';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';

export default function SearchBar() {
  return (
    <Input
      placeholder="Stores, stock available, idk :D"
      prefix={<MenuOutlined />}
      suffix={<SearchOutlined />}
      style={{ borderRadius: 20, backgroundColor: '#f1eac2', width: 451, height: 56 }}
    />
  );
}
