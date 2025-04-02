import { Input } from 'antd';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';

export default function SearchBar() {
  return (
    <Input
      className="rounded-full"
      placeholder="Stores, stock available, idk :D"
      prefix={<MenuOutlined />}
      suffix={<SearchOutlined />}
      style={{ width: 280 }}
    />
  );
}
