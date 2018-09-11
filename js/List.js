import Task from "./Task.js";

class List {
    constructor(){
        this.tasks=[
            {
                name:"task1",
                checked:false,
                subtasks:[
                    {
                        name:"subtask1",
                        subtasks:[]
                    },
                    {
                        name:"subtask2",
                        subtasks:[]
                    }
                ]
            },
            {
                name:"task2",
                checked:false,
                subtasks:[]
            }
        ];
        if (window.location.pathname === "/") {
            this.renderTasks("root");
            document.getElementById("newTask").onclick = () => {
                this.addTask()
            };
        }
        
    }
    
    /**
     * Renders all tasks at a certain level in the list
     * @param id-the id of the collapsible-body where the tasks will be placed
     * @return null
    **/
    renderTasks(id) {
        document.getElementById("body_" + id).innerHTML="";
        if (id === "root") {
            this.tasks.forEach(task => {
                this.createTaskNode(task, [this.tasks.indexOf(task)]);
            });
        }
        else {
            let tasksArray = this.tasks;
            const reference = id.split("_").map(Number);
            reference.forEach(ref => {
                tasksArray = tasksArray[ref].subtasks;
            });
            tasksArray.forEach(task => {
                this.createTaskNode(task, reference.concat([tasksArray.indexOf(task)]), id);
            });
        }
        M.Dropdown.init(document.querySelectorAll('.menu .dropdown-trigger'), {
            alignment: "right",
            constrainWidth: false,
            coverTrigger: false
        });
        M.Collapsible.init(document.querySelectorAll('.collapsible'), {
            accordion: false
        });
    }
    
    /**
     * Creates the HTML for a task
     * @param taskObject-the object representing the task to be rendered
     * @param reference-the array reference of the task
     * @param parent-the id of the parent node where the task is being inserted
     * @return-either null, or the task node
    **/
    createTaskNode(taskObject, reference, parent = "root") {

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
                collapsibleHeader.style.paddingLeft = (30 * (reference.length - 1)) + "px";
                collapsibleHeader.classList.add("collapsible-header");
                collapsibleHeader.id="header_"+id;
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
                    taskName.onblur= () => {
                        this.tasks = Task.deleteOrSaveOnBlur(document.getElementById("header_" + id).querySelector(".taskName").innerHTML, id, this);
                    };
                    taskName.onkeydown = (keypress) => {
                        switch(keypress.key){
                            case "Enter":
                                keypress.preventDefault();      //Don't create a new line
                                keypress.stopPropagation();     //Don't close/open collapsible
                                this.addTask(parent);
                                break;
                                
                            case "Escape":
                                document.blur();
                                break;
                                
                            default:
                                break;
                        }
                    };
                    collapsibleHeader.appendChild(taskName);
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
                const openTaskDetails = document.createElement("li");
                    const openTaskDetailsLink = document.createElement("a");
                        openTaskDetailsLink.innerHTML = "Open Task Details";
                        openTaskDetailsLink.onclick="";                                    //TODO
                        openTaskDetails.appendChild(openTaskDetailsLink);
                    menu.appendChild(openTaskDetails);
                const addSubtask = document.createElement("li");
                    const addSubtaskLink = document.createElement("a");
                        addSubtaskLink.innerHTML = "Add Subtask";
                        addSubtaskLink.onclick = () => { this.addTask(id) };
                        addSubtask.appendChild(addSubtaskLink);
                    menu.appendChild(addSubtask);
                const deleteTask = document.createElement("li");
                    const deleteTaskLink = document.createElement("a");
                        deleteTaskLink.innerHTML = "Delete Task";
                        deleteTaskLink.onclick = () => {Task.deleteTask(id, this);};
                        deleteTask.appendChild(deleteTaskLink);
                    menu.appendChild(deleteTask);
                li.appendChild(menu);
            document.getElementById("body_" + parent).appendChild(li);
            
            //Add subtasks, if they exist
            if(taskObject.subtasks && taskObject.subtasks.length){
                li.classList.add("active");
                taskObject.subtasks.forEach(subtask => {
                    this.createTaskNode(subtask, reference.concat([taskObject.subtasks.indexOf(subtask)]), id);
                });
            }
    }
    
    /**
     * Add task to database and update UI
     * @param id-the id of the parent, as an underscore-separated string
     * @return null
    **/
    addTask(id = "root"){
        const newTask = {
                name: "",
                checked: false,
                dueDate: null,
                details: "",
                subtasks: []
            };
        let tasksArray;
        let reference;
        if(id === "root"){
            tasksArray = this.tasks;
            reference = [];
        }else{
            tasksArray = this.tasks;
            reference = id.split("_").map(Number);
            reference.forEach(ref => {
                tasksArray = tasksArray[ref].subtasks;
            });
            
        }
        tasksArray.push(newTask);
        this.createTaskNode(newTask, reference.concat([tasksArray.length - 1]), id);
        document.getElementById("header_"+reference.join("_")+ (id !== "root" ? "_" : "") +(tasksArray.length - 1)).querySelector(".taskName").focus();
    }
}

export default List;