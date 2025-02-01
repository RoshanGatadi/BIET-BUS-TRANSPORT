/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import signup from './components/signup'
import faculty from './components/faculty';
import admin from './components/admin';
import resgister from './components/register';
import Apps from './components/Apps'
import Drawer from './components/drawer';
import AppForm from './components/drawer';
import Profile from './components/Profile';
import Upload from './components/ProfileComponent/Upload';
import BusDetails from './components/ProfileComponent/BusDetails';
import ContactUs from './components/ProfileComponent/ContactUs';

AppRegistry.registerComponent(appName, () =>App);
