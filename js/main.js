import List from "./List.js";
import Task from "./Task.js";
import DismissedList from "./DismissedList.js"
window.List = List;
window.Task = Task;
window.DismissedList = DismissedList;

//Setup dummy data
window.tasks = [{
        name: "task1",
        checked: false,
        dueDate: new Date("July 2"),
        notes: "Blah blah blah",
        subtasks: [{
                name: "subtask3",
                subtasks: [{
                        name: "subtask1",
                        subtasks: []
                    },
                    {
                        name: "subtask2",
                        checked: true,
                        subtasks: []
                    }
                ]
            },
            {
                name: "subtask0",
                checked: true,
                subtasks: []
            }
        ]
    },
    {
        name: "task2",
        checked: false,
        randomProp: "asdf",
        subtasks: []
    }
];
window.dismissedTasks = [{
    name: "dismissed",
    checked: false,
    dueDate: new Date("July 2"),
    notes: "Blah blah blah",
    subtasks: [{
        name: "dismissed",
        checked: false,
        dueDate: new Date("July 2"),
        notes: "Blah blah blah",
        subtasks: []
    }, {
        name: "dismissed",
        checked: false,
        dueDate: new Date("July 2"),
        notes: "Blah blah blah",
        subtasks: []
    }]
}];

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
                alert("Warning: You have LDS Youth open in another tab, so your data will not be available while offline in this tab. You will still be able to access site content, but if you would like your content to sync offline please close the app elsewhere.");
            }
            else if (err.code === 'unimplemented') {
                M.toast({
                    html: "Warning: your browser does not support saving your data offline. Please update your browser if you would like to use LDS Youth without an internet connection"
                });
            }
        });
}

//Initial render
if (window.location.pathname === "/") {
    window.onload = () => {
        List.renderTasks("root");
        DismissedList.renderTasks();
        document.getElementById("newTask").onclick = () => Task.addTask('root');
    }
}