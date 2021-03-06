import List from "./List.js";
import Task from "./Task.js";
import DismissedList from "./DismissedList.js"
window.List = List;
window.Task = Task;
window.DismissedList = DismissedList;
window.taskBeingDragged = false;

//Firebase
if (!firebase || !firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBbjO5GBmmydh3nkLqK9t9OxsvH_9OqYeQ",
        authDomain: "ztasks-1.firebaseapp.com",
        databaseURL: "https://ztasks-1.firebaseio.com",
        projectId: "ztasks-1",
        storageBucket: "ztasks-1.appspot.com",
        messagingSenderId: "628882993959"
    });
    firebase.firestore().settings({
        timestampsInSnapshots: true
    });
    firebase.firestore().enablePersistence()
        .catch(function(err) {
            if (err.code === 'failed-precondition') {
                alert("Warning: You have ZTasks open in another tab, so your data will not be available while offline in this tab.");
            }
            else if (err.code === 'unimplemented') {
                M.toast({
                    html: "Warning: your browser does not support saving your data offline. Please update your browser if you would like to use ZTasks without an internet connection"
                });
            }
        });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (!firebase.auth().currentUser && location.pathname !== "/") {
        location.pathname = "/";
    }
    else if (firebase.auth().currentUser) {
        if (location.pathname === "/") {
            location.href = "https://" + location.hostname + "/list.html#My_Tasks";
        }
        //Initial render
        if (window.location.pathname.includes("list")) {
            //Set up dom
            document.getElementById("newTask").onclick = () => Task.addTask('root');
            const user = firebase.auth().currentUser;
            document.getElementById("userImage").src=user.photoURL;
            document.getElementById("displayName").innerHTML=user.displayName;
            document.getElementById("email").innerHTML=user.email;
            firebase.firestore().collection(firebase.auth().currentUser.uid).get().then(docs => {
                console.log(docs.docs.map(doc => doc.id));
                docs = docs.docs.sort(function(a,b){
                    return a.id.toLowerCase() < b.id.toLowerCase();
                });
                docs.forEach(doc => {
                    const name = doc.id;
                    if (name === "My Tasks"){ return false; }
                    document.getElementById("myTasks").insertAdjacentHTML("afterend", `<li><a href="/list.html#${name.replace(" ", "_")}" onclick='location.reload()'>${name}</li>`);
                });
            });
            //Load data
            const ref = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(location.hash.substring(1).replace("_", " "));
            ref.get().then(doc => {
                window.tasks = doc.data() && doc.data().tasks ? doc.data().tasks : [];
                window.dismissedTasks = doc.data() && doc.data().dismissedTasks ? doc.data().dismissedTasks : [];
                window.oldTasks = tasks.slice(0);
                window.oldDismissedTasks = dismissedTasks.slice(0);
                List.renderTasks("root");
                DismissedList.renderTasks();
            }).catch(error => console.error(error));
            window.onbeforeunload = () => { ref.set({ tasks: tasks, dismissedTasks: dismissedTasks, }, { merge: true }); };
            setInterval(() => {
                let update = {};
                if(JSON.stringify(tasks) !== JSON.stringify(oldTasks)){ oldTasks = tasks.slice(0); update.tasks = tasks; }
                if(JSON.stringify(dismissedTasks) !== JSON.stringify(oldDismissedTasks)){ oldDismissedTasks = dismissedTasks.slice(0); update.dismissedTasks = dismissedTasks; }
                if(JSON.stringify(update) !== "{}"){ref.set(update, { merge: true });}
            }, 5000 * 60);
        }
    }
});