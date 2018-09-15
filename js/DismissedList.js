class DismissedList {
    /**
     * Renders all tasks at a certain level in the DismissedList
     * @param id-the id of the collapsible-body where the tasks will be placed
     * @return null
    **/
    static renderTasks(id = "root") {
        document.getElementById("dismissed_body_" + id).innerHTML="";
        document.getElementById("dismissed_body_root").style.paddingTop="19px";
        if (id === "root" || id === "") {
            dismissedTasks.forEach(task => {
                DismissedList.createTaskNode(task, [dismissedTasks.findIndex(t => t.name === task.name)]);
            });
        }
        else {
            let tasksArray = tasks;
            const reference = id.split("_").map(Number);
            reference.forEach(ref => {
                tasksArray = tasksArray[ref].subtasks;
            });
            tasksArray.forEach(task => {
                DismissedList.createTaskNode(task, reference.concat([tasksArray.findIndex(t => t.name === task.name)]), id);
            });
        }
    }
    
    /**
     * Creates the HTML for a task
     * @param taskObject-the object representing the task to be rendered
     * @param reference-the array reference of the task
     * @param parent-the id of the parent node where the task is being inserted
     * @return-either null, or the task node
    **/
    static createTaskNode(taskObject, reference, parent = "root") {
        const id = reference.join("_");
        const li = document.createElement("li");
            //Add header
            const collapsibleHeader = document.createElement("div");
                collapsibleHeader.style.paddingLeft = (38 * (reference.length - 1) - 8) + "px";
                collapsibleHeader.classList.add("collapsible-header");
                collapsibleHeader.id = "dismissed_header_" + id;
                collapsibleHeader.onclick = e => { e.stopPropagation(); DismissedList.restoreTask(taskObject, id)};
                collapsibleHeader.style.backgroundColor="inherit";
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
                                e.preventDefault();
                                e.stopPropagation();
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
                    if(taskObject.name){ taskName.innerText = taskObject.name }
                    collapsibleHeader.appendChild(taskName);
                li.appendChild(collapsibleHeader);
            
            //Add body
            const collapsibleBody = document.createElement("div");
                collapsibleBody.classList.add("collapsible-body");
                const subtasks = document.createElement("ul");
                    subtasks.classList.add("collapsible");
                    subtasks.id="dismissed_body_" + id;
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
            document.getElementById("dismissed_body_" + parent).appendChild(li);
            
            //Add subtasks, if they exist
            if(taskObject.subtasks && taskObject.subtasks.length){
                li.classList.add("active");
                taskObject.subtasks.forEach(subtask => {
                    DismissedList.createTaskNode(subtask, reference.concat([taskObject.subtasks.findIndex(t => t.name === subtask.name)]), id);
                });
            }
            M.Collapsible.init(document.querySelectorAll('.collapsible'), {
                accordion: false
            });
    }
    
    static getTaskFromId(id){
        let tasksArray = dismissedTasks;
        let task;
        if (id !== "" && id !== "root") {
            const reference = id.split("_").map(Number);
            reference.forEach(ref => {
                task = tasksArray[ref];
                tasksArray = task.subtasks;
            });
        }else{
            task = {
                subtasks:dismissedTasks
            };
        }
        return task;
    }
    
    /**
     * Restore task to main task list
     * @param taskObject-the task object
     * @param id-the id of the task
     * return null
    **/
    static restoreTask(taskObject, id) {
        const oneLevelUp = DismissedList.getTaskFromId(id.substring(0, id.length - 2));
        oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name), 1);
        tasks.push(taskObject);
        List.renderTasks();
        DismissedList.renderTasks();
    }
}

export default DismissedList;