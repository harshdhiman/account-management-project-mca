import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDErMjAUIcplBvKu54gRWsDGgin6GzjBB4",
  authDomain: "accountmanagementprojectmca.firebaseapp.com",
  projectId: "accountmanagementprojectmca",
  storageBucket: "accountmanagementprojectmca.appspot.com",
  messagingSenderId: "933763475373",
  appId: "1:933763475373:web:e590420bbd90af3dbaa324",
};

export function initFirebaseApp() {
  initializeApp(firebaseConfig);
}
