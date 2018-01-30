import getMenuItems from './menuItems'
import locales from './locales'
import routes from './routes'
import themes from './themes'
import grants from './grants'

const config = {
  firebase_config: {
    apiKey: "AIzaSyDmxBiBBSM8_lmZniNyVXoLEu9fcX5Z904",
    authDomain: "react-bolao-firebase.firebaseapp.com",
    databaseURL: "https://react-bolao-firebase.firebaseio.com",
    projectId: "react-bolao-firebase",
    storageBucket: "react-bolao-firebase.appspot.com",
    messagingSenderId: "513926736091"
  },
  firebase_config_dev: {
    apiKey: "AIzaSyDmxBiBBSM8_lmZniNyVXoLEu9fcX5Z904",
    authDomain: "react-bolao-firebase.firebaseapp.com",
    databaseURL: "https://react-bolao-firebase.firebaseio.com",
    projectId: "react-bolao-firebase",
    storageBucket: "react-bolao-firebase.appspot.com",
    messagingSenderId: "513926736091"
  },
  firebase_providers: [
    'google.com'
    // 'facebook.com',
    // 'twitter.com',
    // 'github.com',
    // 'password',
    // 'phone'
  ],
  initial_state: {
    theme: 'light',
    locale: 'br'
  },
  drawer_width: 256,
  locales,
  themes,
  grants,
  routes,
  getMenuItems,
  firebaseLoad: () => import('./firebase'),
}

export default config
