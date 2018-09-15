import List from "./List.js";
import Task from "./Task.js";
import DismissedList from "./DismissedList.js"
window.List = List;
window.Task = Task;
window.DismissedList = DismissedList;

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

//Initial render
if (window.location.pathname === "/") {
    window.onload = () => {
        List.renderTasks("root");
        DismissedList.renderTasks();
        document.getElementById("newTask").onclick = () => Task.addTask('root');
    }
}