import { EnvironmentOutlined, BookOutlined, BellOutlined } from '@ant-design/icons';

export default function NavItems() {
  return (
    <div className="nav-items flex gap-6 text-sm">
      <div className="flex flex-col items-center">
        <EnvironmentOutlined />
        Dashboard
      </div>
      <div className="flex flex-col items-center">
        <BookOutlined />
        Saved
      </div>
      <div className="flex flex-col items-center">
        <BellOutlined />
        Forum
      </div>
    </div>
  );
}
