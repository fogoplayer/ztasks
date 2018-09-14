let tasks = [{
        name: "task1",
        checked: false,
        dueDate:new Date("July 2"),
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
let dismissedTasks=[];
let taskBeingDragged;

//Initial render
if (window.location.pathname === "/") {
    window.onload = () => {renderTasks();};
}

//Register Service Worker (PWABuilder)
// if (navigator.serviceWorker.controller) {
//     console.log('[PWA Builder] active service worker found, no need to register');
// }
// else {
//     navigator.serviceWorker.register('service-worker.js', {
//         scope: './'
//     }).then(function(reg) {
//         console.log('Service worker has been registered for scope:' + reg.scope);
//     });
// }


//Functions
    
/**
 * Renders all tasks at a certain level in the list
 * @param id-the id of the collapsible-body where the tasks will be placed
 * @return null
**/
function renderTasks(id = "root") {
    document.getElementById("body_" + id).innerHTML="";
    if (id === "root" || id === "") {
        tasks.forEach(task => {
            createTaskNode(task, [tasks.findIndex(t => t.name === task.name)]);
        });
    }
    else {
        let tasksArray = tasks;
        const reference = id.split("_").map(Number);
        reference.forEach(ref => {
            tasksArray = tasksArray[ref].subtasks;
        });
        tasksArray.forEach(task => {
            createTaskNode(task, reference.concat([tasksArray.findIndex(t => t.name === task.name)]), id);
        });
    }
}



/**
 * Add task to database and update UI
 * @param id-the id of the parent, as an underscore-separated string
 * @return null
**/
function addTask(id = "root"){
    const newTask = {
            name: "",
            checked: false,
            dueDate: null,
            notes: "",
            subtasks: []
        };
    let tasksArray;
    let reference;
    if(id === "root"){
        tasksArray = tasks;
        reference = [];
    }else{
        tasksArray = tasks;
        reference = id.split("_").map(Number);
        reference.forEach(ref => {
            tasksArray = tasksArray[ref].subtasks;
        });
        
    }
    tasksArray.push(newTask);
    createTaskNode(newTask, reference.concat([tasksArray.length - 1]), id);
    document.getElementById("header_"+reference.join("_")+ (id !== "root" ? "_" : "") +(tasksArray.length - 1)).querySelector(".taskName").focus();
}

/**
 * Intent a task one way or the other
 * @param direction-string, either "left" or "right"
 * @param id-the id of the task being indented
 * @return null
**/
function moveTask(direction, id){
    //Set task objects as variables
    const twoLevelsUp = getTaskFromId(id.substring(0, id.length - 4));
    const oneLevelUp = getTaskFromId(id.substring(0, id.length - 2));
    const taskObject = getTaskFromId(id);
    const prevSibling = oneLevelUp.subtasks[oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name) - 1];
    const nextSibling = oneLevelUp.subtasks[oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name) + 1];
    taskBeingDragged=true;
    if(direction === "left" && oneLevelUp.name){
        const youngerSiblings = oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name) + 1);
        taskObject.subtasks = taskObject.subtasks.concat(youngerSiblings);
        oneLevelUp.subtasks.splice(oneLevelUp.subtasks.length - 1, 1);
        twoLevelsUp.subtasks.splice(twoLevelsUp.subtasks.findIndex(t => t.name === oneLevelUp.name) + 1, 0, taskObject);
        renderTasks(twoLevelsUp.name ? id.substring(0, id.length - 4) : "root");
        document.getElementById("header_" + (id.length > 3 ? id.substring(0, id.length - 4) + "_" : "") + (Number(id.substring(id.length - 3, id.length - 2)) + 1)).children[1].focus();
    }else if(direction === "right" && prevSibling){
        prevSibling.subtasks.push(taskObject);
        oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name), 1);
        renderTasks(oneLevelUp.name ? id.substring(0, id.length - 2) : "root");
        document.getElementById( "header_" + (id.length > 1 ? id.substring(0, id.length - 2) + "_" : "") + (prevSibling ? (oneLevelUp.subtasks.findIndex(t => t.name === prevSibling.name)) + "_" : "") + (prevSibling.subtasks.length - 1) ).children[1].focus();
    }else if(direction === "up" && prevSibling){
        oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name), 1);
        oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === prevSibling.name), 0, taskObject);
        renderTasks(oneLevelUp.name ? id.substring(0, id.length - 2) : "root");
        document.getElementById("header_" + (id.length > 1 ? id.substring(0, id.length - 2) + "_" : "") + (prevSibling ? oneLevelUp.subtasks.findIndex(t => t.name === prevSibling.name) - 1: "") ).children[1].focus();
    }else if(direction === "down" && nextSibling){
        oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name), 1);
        oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === nextSibling.name) + 1, 0, taskObject);
        renderTasks(oneLevelUp.name ? id.substring(0, id.length - 2) : "root");
        document.getElementById("header_" + (id.length > 1 ? id.substring(0, id.length - 2) + "_" : "") + (nextSibling ? oneLevelUp.subtasks.findIndex(t => t.name === nextSibling.name) + 1: "")).children[1].focus();
    }
    taskBeingDragged = false;
}

/**
 * Dismiss a task
 * @param id-The id of the task being dismissed
 * return null
**/
function dismissTask(id){
    const oneLevelUp = getTaskFromId(id.substring(0, id.length - 2));
    const taskObject = getTaskFromId(id);
    oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name), 1);
    dismissedTasks.push(taskObject);
    renderTasks(id.substring(0, id.length - 2));
}

/**
 * @param id-the id of the parent task
 * @return parent.subtasks
**/
function getTasksArrayFromId(id){
    let tasksArray = tasks;
    if (id !== "" && id !== "root") {
        const reference = id.split("_").map(Number);
        reference.forEach(ref => {
            tasksArray = tasksArray[ref].subtasks;
        });
    }
    return tasksArray;
}

/**
 * Convert ID to task object
 * @param id-the id of the parent task
 * @return task object
**/
function getTaskFromId(id){
    let tasksArray = tasks;
    let task;
    if (id !== "" && id !== "root") {
        const reference = id.split("_").map(Number);
        reference.forEach(ref => {
            task = tasksArray[ref];
            console.warn(ref, task);
            tasksArray = task.subtasks;
        });
    }else{
        task = {
            subtasks:tasks
        };
    }
    return task;
}


/**
 * When a task unfocuses, save it, or delete it if it's now blank
 * @param name-the current task name according to the HTML
 * @param id-the reference of the task, as an underscore-separated string
 * @param list-the List being edited
 * @return an updated task list
 **/
function deleteOrSaveOnKeyup(name, id) {
    let taskList;
    let reference;
    if (!name) {
        deleteTask(id, list);
        return tasks;
    }
    else if(!taskBeingDragged){
        taskList = tasks;
        reference = id.split("_").map(Number);
        for (let i = 0; i < reference.length - 1; i++) {
            const ref = reference[i];
            taskList = taskList[ref].subtasks;
        }
        taskList[reference[reference.length - 1]].name = name;
        return tasks;
    }else{
        return tasks;
    }
}

/**
 * Delete a task
 * @param reference-the reference of the task, as an underscore-separated string
 * @param list-the List being edited
 **/
function deleteTask(id) {
    let reference = id.split("_").map(Number);
    let taskList = tasks;
    for (let i = 0; i < reference.length - 1; i++) {
        const ref = reference[i];
        taskList = taskList[ref].subtasks;
    }
    taskList.splice(reference[reference.length - 1], 1);

    document.getElementById("header_" + id).parentNode.remove();

    if (taskList.length === 0) {
        document.getElementById("header_" + id.substring(0,id.length - 2)).querySelector(".chevron").remove();
    }
}

/**
 * Creates the HTML for a task
 * @param taskObject-the object representing the task to be rendered
 * @param reference-the array reference of the task
 * @param parent-the id of the parent node where the task is being inserted
 * @return-either null, or the task node
**/
function createTaskNode(taskObject, reference, parent = "root") {

    //Add chevron to parent if not root and parent doesn't already have one
    if (parent !== "root" && !document.getElementById("header_" + parent).querySelector(".chevron")) {
        const chevronContainer = document.createElement("div");
            chevronContainer.classList.add("taskElement", "chevron", "iconContainer");
            //Add i tag
            const i = document.createElement("i");
            i.classList.add("material-icons");
            // Add icon
            const icon = document.createTextNode("keyboard_arrow_up");
            i.appendChild(icon);
            chevronContainer.appendChild(i);
            document.getElementById("header_" + parent).appendChild(chevronContainer);
    }
    //Make sure parent is active
    if (parent !== "root" && !document.getElementById("header_" + parent).parentNode.classList.contains("active")) {
        document.getElementById("header_" + parent).querySelector(".chevron").click();
    }

    const id = reference.join("_");
    const li = document.createElement("li");
        //Add header
        const collapsibleHeader = document.createElement("div");
            collapsibleHeader.style.paddingLeft = (38 * (reference.length - 1) - 8) + "px";
            collapsibleHeader.classList.add("collapsible-header");
            collapsibleHeader.id = "header_" + id;
            collapsibleHeader.onclick = e => {
                //Don't toggle subtasks unless chevron is clicked
                if (!(e.target.innerText === "keyboard_arrow_down" || e.target.innerText === "keyboard_arrow_up" || e.target.classList.contains(".chevron"))) {
                    e.stopPropagation();
                }else if (e.target.innerText === "keyboard_arrow_down"){
                    e.target.parentNode.querySelector(".chevron .material-icons").innerText = "keyboard_arrow_up";
                }else{
                    e.target.parentNode.querySelector(".chevron .material-icons").innerText = "keyboard_arrow_down";
                }
            };
            //Add checkbox
            const checkboxContainer = document.createElement("div");
                checkboxContainer.classList.add("taskElement", "checkboxContainer");
                //Add label
                const label = document.createElement("label");
                    //Add checkbox
                    const checkbox = document.createElement("input");
                        checkbox.classList.add("filled-in");
                        checkbox.setAttribute("type", "checkbox");
                        if(taskObject.checked){checkbox.setAttribute("checked", taskObject.checked); }
                        checkbox.onclick = () => {
                            taskObject.checked = checkbox.checked;
                        };
                        label.appendChild(checkbox);
                    //Add span
                    const span = document.createElement("span");
                        label.appendChild(span);
                    checkboxContainer.appendChild(label);
                collapsibleHeader.appendChild(checkboxContainer);
            //Add task name
            const taskName = document.createElement("div");
                taskName.classList.add("taskElement", "taskName");
                taskName.contentEditable=true;
                if(taskObject.name){ taskName.innerText = taskObject.name }
                taskName.onkeyup= (e) => {
                    tasks = deleteOrSaveOnKeyup(document.getElementById("header_" + id).querySelector(".taskName").innerHTML, id);
                };
                taskName.onkeydown = (keypress) => {
                    switch(keypress.key){
                        case "Enter":
                            keypress.preventDefault();      //Don't create a new line
                            keypress.stopPropagation();     //Don't close/open collapsible
                            if(keypress.ctrlKey){
                                location.pathname = "/task-details#" + id;
                            }else
                            {
                                addTask(parent);
                            }
                            break;
                            
                        case "Escape":
                            taskName.blur();    
                            break;
                            
                        case "ArrowLeft":
                            if(keypress.ctrlKey){ moveTask("left",id); }
                            break;
                            
                        case "ArrowRight":
                            if(keypress.ctrlKey){ moveTask("right",id); }
                            break;
                            
                        case "ArrowUp":
                            if(keypress.ctrlKey){ moveTask("up",id); }
                            break;
                        
                        case "ArrowDown":
                            if(keypress.ctrlKey){ moveTask("down",id); }
                            break;
                            
                        default:
                            break;
                    }
                };
                collapsibleHeader.appendChild(taskName);
            
            //Add Due Date
            if(taskObject.dueDate){
                const dueDateContainer = document.createElement("div");
                    dueDateContainer.classList.add("taskElement", "iconContainer", "dueDateContainer");
                    //Add badge
                    const dueDate = document.createElement("span");
                        dueDate.classList.add("new","badge","dueDate");
                        dueDate.setAttribute("data-badge-caption", "");
                        dueDate.innerText=taskObject.dueDate.toLocaleDateString("nu-arab",{month:"long", day:"numeric"});
                        dueDateContainer.appendChild(dueDate);
                    collapsibleHeader.appendChild(dueDateContainer);
            }
            
            //Add menu container
            const menuContainer = document.createElement("div");
                menuContainer.classList.add("taskElement", "menu", "iconContainer");
                //Add dropdown trigger
                const dropdownTrigger = document.createElement("a");
                    dropdownTrigger.classList.add("dropdown-trigger");
                    dropdownTrigger.setAttribute("data-target", "menu" + id);
                    //Add i tag
                    const i = document.createElement("i");
                        i.classList.add("material-icons");
                        // Add icon
                        const icon = document.createTextNode("more_vert");
                            i.appendChild(icon);
                        dropdownTrigger.appendChild(i);
                    menuContainer.appendChild(dropdownTrigger);
                collapsibleHeader.appendChild(menuContainer);
            //Add dropdown chevron
            if (taskObject.subtasks && taskObject.subtasks.length){
                const chevronContainer = document.createElement("div");
                    chevronContainer.classList.add("taskElement", "chevron", "iconContainer");
                    //Add i tag
                    const i = document.createElement("i");
                        i.classList.add("material-icons");
                        // Add icon
                        const icon = document.createTextNode("keyboard_arrow_up");
                            i.appendChild(icon);
                        chevronContainer.appendChild(i);
                    collapsibleHeader.appendChild(chevronContainer);
            }
            li.appendChild(collapsibleHeader);
        
        //Add body
        const collapsibleBody = document.createElement("div");
            collapsibleBody.classList.add("collapsible-body");
            const subtasks = document.createElement("ul");
                subtasks.classList.add("collapsible");
                subtasks.id="body_" + id;
                collapsibleBody.appendChild(subtasks);
            li.appendChild(collapsibleBody);    
        
        //Add menu
        const menu = document.createElement("ul");
            menu.id = "menu" + id;
            menu.classList.add("dropdown-content");
            const openTaskDetailsContainer = document.createElement("li");
                const openTaskDetailsLink = document.createElement("a");
                    openTaskDetailsLink.innerHTML = "Open Task Details";
                    openTaskDetailsLink.href="/task-details#"+id;
                    openTaskDetailsContainer.appendChild(openTaskDetailsLink);
                menu.appendChild(openTaskDetailsContainer);
            const addSubtaskContainer = document.createElement("li");
                const addSubtaskLink = document.createElement("a");
                    addSubtaskLink.innerHTML = "Add Subtask";
                    addSubtaskLink.onclick = () => { addTask(id) };
                    addSubtaskContainer.appendChild(addSubtaskLink);
                menu.appendChild(addSubtaskContainer);
            const deleteTaskContainer = document.createElement("li");
                const deleteTaskLink = document.createElement("a");
                    deleteTaskLink.innerHTML = "Delete Task";
                    deleteTaskLink.onclick = () => {deleteTask(id);};
                    deleteTaskContainer.appendChild(deleteTaskLink);
                menu.appendChild(deleteTaskContainer);
            li.appendChild(menu);
            
        //Set up drag/drop
        li.draggable = "true";
        li.ondragstart = (e) => { e.stopPropagation(); setTimeout(() => { li.remove(); }, 1); collapsibleHeader.style.paddingLeft = "0"; e.dataTransfer.setDragImage(li, 0, 15); taskBeingDragged = taskObject; let parentArray = (parent === "root") ? tasks : getTasksArrayFromId(parent); parentArray.splice(parentArray.findIndex(t => t.name === taskObject.name), 1); };
        li.ondragover = (e) => { e.stopPropagation(); li.style.marginBottom="38px"; return false };
        li.ondragleave = (e) => { e.stopPropagation(); li.style.marginBottom=0 };
        li.ondrop = (e) =>{ e.stopPropagation(); const mouseDepth = Math.round((e.clientX - 8)/ 30 ); let tempRef = reference.slice(0,mouseDepth); const tasksArray = getTasksArrayFromId(tempRef.join("_")); tasksArray.push(taskBeingDragged); renderTasks(); };
        document.getElementById("body_" + parent).appendChild(li);
        
        //Add subtasks, if they exist
        if(taskObject.subtasks && taskObject.subtasks.length){
            li.classList.add("active");
            taskObject.subtasks.forEach(subtask => {
                createTaskNode(subtask, reference.concat([taskObject.subtasks.findIndex(t => t.name === subtask.name)]), id);
            });
        }
        //Init Materialize
        M.Dropdown.init(document.querySelectorAll('.menu .dropdown-trigger'), {
            alignment: "right",
            constrainWidth: false,
            coverTrigger: false
        });
        M.Collapsible.init(document.querySelectorAll('.collapsible'), {
            accordion: false
        });
}