import Image from 'next/image';

export default function Logo() {
  return (
    <div>
      <Image src="/logo-navbar.png" alt="logo" width={215} height={215} 
        style={{  marginTop: 18 }}/>
    </div>
  );
}
