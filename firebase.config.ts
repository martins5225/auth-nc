import 'firebase/auth';

import { Auth, getAuth } from 'firebase/auth';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyBNsXGA0T3gWFGS69f1YgtXMx83tiLp22A',
	authDomain: 'auth-nc-47ccc.firebaseapp.com',
	projectId: 'auth-nc-47ccc',
	storageBucket: 'auth-nc-47ccc.appspot.com',
	messagingSenderId: '221915830112',
	appId: '1:221915830112:web:53fc43831484aef76bb005',
};

const app = initializeApp(firebaseConfig);

export const authentication: Auth = getAuth(app);
