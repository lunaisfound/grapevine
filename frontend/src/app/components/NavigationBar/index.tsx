import Logo from './logo';
import NavItems from './NavItems';
import SearchBar from './SearchBar';
import Avatar from './Avatar';

export default function NavigationBar() {
  return (
    <div className="navbar-container">
      <Logo />
      <NavItems />
      <SearchBar />
      <Avatar />
    </div>
  );
}
