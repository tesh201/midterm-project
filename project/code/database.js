// signup.js

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOAIzaSyCLyDQJu4_RB2KcscLq0z43aoubCf2RP_k",
    authDomain: "database-119de.firebaseapp.com",
    projectId: "https://database-119de-default-rtdb.firebaseio.com",
    storageBucket: "database-119de",
    messagingSenderId: "276111639984",
    appId: "1:276111639984:web:b4066aeee5c1cf70538275"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Sign up function
document.getElementById("signup").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Add user to Firestore
            return db.collection("users").doc(user.uid).set({
                name: name,
                email: email
            });
        })
        .then(() => {
            alert("User signed up successfully!");
            // Redirect to login page
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});
