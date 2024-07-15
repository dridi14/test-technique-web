import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

const config = {
    apiKey: "AIzaSyAIId2ByN9c0RX9_R71EbJJoV-lB1RDADc",
    authDomain: "test-technique-beeldi.firebaseapp.com",
    databaseURL: "https://test-technique-beeldi.firebaseio.com",
    projectId: "test-technique-beeldi",
    storageBucket: "test-technique-beeldi.appspot.com",
    messagingSenderId: "937748581892"
};

const app = initializeApp(config);
const auth = getAuth(app);
const functions = getFunctions(app);
const database = getDatabase(app);
const storage = getStorage(app);

export {
    app,
    auth,
    functions,
    database,
    storage,
};
