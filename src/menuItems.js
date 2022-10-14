export const menuItems = [
  {
    title: 'Home',
    url: '/home',
  },
  {
    title: 'Login',
    url: '/login',
  },
  {
    title: 'Register',
    url: '/register',
  },
  {
    title: 'Services',
    url: '/services',
    submenu: [
      {
        title: 'Forums',
        url: '/forums',
      },
      {
        title: 'web development',
        url: 'web-dev',
      },
      {
        title: 'SEO',
        url: 'seo',
      },
    ],
  },
  {
    title: 'About',
    url: '/about',
  },
  {
    title: 'Setting',
    url: '/setting',
    submenu: [
      {
        title: 'Profile',
        url: '/setting/profile',
      },
      {
        title: 'Setting board',
        url: '/setting/board',
      },
      {
        title: 'Logout',
        url: '',
      },
    ],
  },
];
