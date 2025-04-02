import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function AvatarComponent() {
  return (
    <Avatar size="large" icon={<UserOutlined />} />
  );
}
