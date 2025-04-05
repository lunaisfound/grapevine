import { Avatar } from 'antd';
import AccountDropdown from './AccountDropdown';
import { UserOutlined } from '@ant-design/icons';

export default function AvatarComponent() {
  return <Avatar size={60} icon={<UserOutlined />} />;
}
