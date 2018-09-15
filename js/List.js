class List {
    /**
     * Renders all tasks at a certain level in the list
     * @param id-the id of the collapsible-body where the tasks will be placed
     * @return null
    **/
    static renderTasks(id = "root") {
        document.getElementById("body_" + id).innerHTML="";
        if (id === "root" || id === "") {
            tasks.forEach(task => {
                List.createTaskNode(task, [tasks.findIndex(t => t.name === task.name)]);
            });
        }
        else {
            let tasksArray = tasks;
            const reference = id.split("_").map(Number);
            reference.forEach(ref => {
                tasksArray = tasksArray[ref].subtasks;
            });
            tasksArray.forEach(task => {
                List.createTaskNode(task, reference.concat([tasksArray.findIndex(t => t.name === task.name)]), id);
            });
        }
    }
    
    /**
     * @param id-the id of the parent task
     * @return parent.subtasks
    **/
    static getSubtasksFromId(id){
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
     * Finds all checked tasks and dismisses them
     * return null
    **/
    static dismissAllCheckedTasks() {
        const node = document.getElementById("body_root").querySelector(":checked");
        Task.dismissTask(node.parentNode.parentNode.parentNode.id.substring(7));
        if(document.getElementById("body_root").querySelector(":checked")){ List.dismissAllCheckedTasks() }
    }
    
    /**
     * Convert ID to task object
     * @param id-the id of the parent task
     * @return task object
    **/
    static getTaskFromId(id){
        let tasksArray = tasks;
        let task;
        if (id !== "" && id !== "root") {
            const reference = id.split("_").map(Number);
            reference.forEach(ref => {
                task = tasksArray[ref];
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
     * Creates the HTML for a task
     * @param taskObject-the object representing the task to be rendered
     * @param reference-the array reference of the task
     * @param parent-the id of the parent node where the task is being inserted
     * @return-either null, or the task node
    **/
    static createTaskNode(taskObject, reference, parent = "root") {
    
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
                            checkbox.onclick = (e) => {
                                if(e.shiftKey){
                                    taskObject.checked = true;
                                    Task.dismissTask(id);
                                }else{
                                    taskObject.checked = checkbox.checked;
                                }
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
                    taskName.onkeyup = (e) => { Task.deleteOrSave(document.getElementById("header_" + id).querySelector(".taskName").innerHTML, id); };
                    taskName.onblur = (e) => { Task.deleteOrSave(document.getElementById("header_" + id).querySelector(".taskName").innerHTML, id); };
                    taskName.onkeydown = (keypress) => {
                        switch(keypress.key){
                            case "Enter":
                                keypress.preventDefault();      //Don't create a new line
                                keypress.stopPropagation();     //Don't close/open collapsible
                                if(keypress.ctrlKey){
                                    location.pathname = "/task-details#" + id;
                                }else
                                {
                                    Task.addTask(parent);
                                }
                                break;
                                
                            case "Escape":
                                taskName.blur();    
                                break;
                                
                            case "ArrowLeft":
                                if(keypress.ctrlKey){ Task.moveTask("left",id); }
                                break;
                                
                            case "ArrowRight":
                                if(keypress.ctrlKey){ Task.moveTask("right",id); }
                                break;
                                
                            case "ArrowUp":
                                if(keypress.ctrlKey){ Task.moveTask("up",id); }
                                break;
                            
                            case "ArrowDown":
                                if(keypress.ctrlKey){ Task.moveTask("down",id); }
                                break;
                                
                            default:
                                break;
                        }
                    };
                    collapsibleHeader.appendChild(taskName);
                
                //Add Due Date
                if(taskObject.dueDate){
                    const dueDateContainer = document.createElement("a");
                        dueDateContainer.classList.add("taskElement", "iconContainer", "dueDateContainer");
                        dueDateContainer.href="/task-details#"+id;
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
                        addSubtaskLink.onclick = () => { Task.addTask(id) };
                        addSubtaskContainer.appendChild(addSubtaskLink);
                    menu.appendChild(addSubtaskContainer);
                const deleteTaskContainer = document.createElement("li");
                    const deleteTaskLink = document.createElement("a");
                        deleteTaskLink.innerHTML = "Delete Task";
                        deleteTaskLink.onclick = () => {Task.deleteTask(id);};
                        deleteTaskContainer.appendChild(deleteTaskLink);
                    menu.appendChild(deleteTaskContainer);
                li.appendChild(menu);
                
            //Set up drag/drop
            li.draggable = "true";
            li.ondragstart = (e) => { e.stopPropagation(); setTimeout(() => { li.remove(); }, 1); collapsibleHeader.style.paddingLeft = "0"; e.dataTransfer.setDragImage(li, 0, 15); taskBeingDragged = taskObject; let parentArray = (parent === "root") ? tasks : List.getSubtasksFromId(parent); parentArray.splice(parentArray.findIndex(t => t.name === taskObject.name), 1); };
            li.ondragover = (e) => { e.stopPropagation(); li.style.marginBottom="38px"; return false };
            li.ondragleave = (e) => { e.stopPropagation(); li.style.marginBottom=0 };
            li.ondrop = (e) =>{ e.stopPropagation(); const mouseDepth = Math.round((e.clientX - 8)/ 30 ); let tempRef = reference.slice(0,mouseDepth); const tasksArray = List.getSubtasksFromId(tempRef.join("_")); tasksArray.push(taskBeingDragged); List.renderTasks(); };
            document.getElementById("body_" + parent).appendChild(li);
            
            //Add subtasks, if they exist
            if(taskObject.subtasks && taskObject.subtasks.length){
                li.classList.add("active");
                taskObject.subtasks.forEach(subtask => {
                    List.createTaskNode(subtask, reference.concat([taskObject.subtasks.findIndex(t => t.name === subtask.name)]), id);
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
}

export default List;