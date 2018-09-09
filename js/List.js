class List {
    constructor(){
        this.tasks=[
            {
                name:"task1",
                checked:false,
                subtasks:[
                    {
                        name:"subtask1"
                    }
                ]
            },
            {
                name:"task2",
                checked:false,
                subtasks:[]
            }
        ]
    }
    
    renderTasks(){
        this.tasks.forEach(task =>{
            this.createTaskNode(task, [this.tasks.indexOf(task)]);
        })
    }
    
    /**
     * Creates the HTML for a task
     * @param taskObject-the object representing the task to be rendered
     * @return-either null, or the task node
    **/
    createTaskNode(taskObject, reference, parent = "root"){
        const li = document.createElement("li");
            //Add header
            const collapsibleHeader = document.createElement("div");
                collapsibleHeader.style.paddingLeft = (30 * (reference.length - 1)) + "px";
                collapsibleHeader.classList.add("collapsible-header");
                collapsibleHeader.onclick = e => {
                    //Don't toggle subtasks unless chevron is clicked
                    if (!(e.target.innerText === "keyboard_arrow_down" || e.target.innerText === "keyboard_arrow_up" || e.target.classList.contains(".chevron"))) {
                        e.stopPropagation();
                    }else if (e.target.innerText === "keyboard_arrow_down"){
                        e.target.parentNode.querySelector(".material-icons").innerText = "keyboard_arrow_up";
                    }else{
                        e.target.parentNode.querySelector(".material-icons").innerText = "keyboard_arrow_down";
                    }
                }
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
                //Add taskk name
                const taskName = document.createElement("div");
                    taskName.classList.add("taskElement", "taskName");
                    taskName.contentEditable=true;
                    if(taskObject.name){ taskName.innerText = taskObject.name }
                    collapsibleHeader.appendChild(taskName);
                //Add dropdown chevron
                if (taskObject.subtasks && taskObject.subtasks.length){
                    const chevronContainer = document.createElement("div");
                        chevronContainer.classList.add("taskElement", "chevron")
                        //Add i tag
                        const i = document.createElement("i");
                            i.classList.add("material-icons");
                            // Add icon
                            const icon = document.createTextNode("keyboard_arrow_up");
                                i.appendChild(icon);
                            chevronContainer.appendChild(i);
                        collapsibleHeader.appendChild(chevronContainer);
                }
                //Add menu container
                const menuContainer = document.createElement("div");
                    menuContainer.classList.add("taskElement", "menu");
                    //Add dropdown trigger
                    const dropdownTrigger = document.createElement("a");
                        dropdownTrigger.classList.add("dropdown-trigger");
                        //Add i tag
                        const i = document.createElement("i");
                            i.classList.add("material-icons");
                            // Add icon
                            const icon = document.createTextNode("more_vert");
                                i.appendChild(icon);
                            dropdownTrigger.appendChild(i);
                        menuContainer.appendChild(dropdownTrigger);
                    collapsibleHeader.appendChild(menuContainer);
                li.appendChild(collapsibleHeader);
            //Add body
            const collapsibleBody = document.createElement("div");
                collapsibleBody.classList.add("collapsible-body");
                const subtasks = document.createElement("ul");
                    subtasks.classList.add("collapsible");
                    subtasks.id=reference.join("");
                    collapsibleBody.appendChild(subtasks);
                li.appendChild(collapsibleBody);    
            document.getElementById(parent).appendChild(li);
            
            //Add subtasks, if they exist
            if(taskObject.subtasks && taskObject.subtasks.length){
                li.classList.add("active");
                taskObject.subtasks.forEach(subtask => {
                    this.createTaskNode(subtask, reference.concat([taskObject.subtasks.indexOf(subtask)]), reference.join(""));
                });
            }
    }
}

export default List;