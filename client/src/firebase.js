import firebase from "firebase";

const firebaseConfig = {
  // your firebase credentials go here
  // here
  //ok
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
