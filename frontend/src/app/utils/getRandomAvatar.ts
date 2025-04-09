const avatarList = [
    "/3D Avatars/1.png", 
    "/3D Avatars/2.png",
    "/3D Avatars/3.png",
    "/3D Avatars/4.png",
    "/3D Avatars/5.png",
    "/3D Avatars/6.png",
    "/3D Avatars/7.png",
    "/3D Avatars/8.png",
    "/3D Avatars/9.png",
    "/3D Avatars/10.png",
    "/3D Avatars/11.png",
    "/3D Avatars/12.png",
    "/3D Avatars/13.png",
    "/3D Avatars/14.png",
    "/3D Avatars/15.png",
    "/3D Avatars/16.png",
    "/3D Avatars/17.png",
    "/3D Avatars/18.png",
    "/3D Avatars/19.png",
    "/3D Avatars/20.png",
    "/3D Avatars/21.png",
    "/3D Avatars/22.png",
    "/3D Avatars/23.png",
    "/3D Avatars/24.png",
    "/3D Avatars/25.png",
    "/3D Avatars/26.png",
    "/3D Avatars/27.png",
    "/3D Avatars/28.png",
    "/3D Avatars/29.png",
    "/3D Avatars/30.png",
  ];

  export const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarList.length);
    return avatarList[randomIndex];
  };

