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
            this.createTaskNode(task);
        })
    }
    
    createTaskNode(taskObject, parent = "root"){
        const li = document.createElement("li")
        //     collapsible.classList.add("collection-item", "collapsible");
            const collapsibleHeader = document.createElement("div")
                collapsibleHeader.classList.add("collapsible-header");
                const checkboxContainer = document.createElement("div")
                    checkboxContainer.classList.add("taskElement", "checkboxContainer");
                    const label = document.createElement("label");
                        const checkbox = document.createElement("input")
                            checkbox.classList.add("filled-in")
                            checkbox.setAttribute("type", "checkbox");
                            label.appendChild(checkbox);
                        const span = document.createElement("span");
                            label.appendChild(span);
                        checkboxContainer.appendChild(label);
                    collapsibleHeader.appendChild(checkboxContainer);
                const taskName = document.createElement("div")
                    taskName.classList.add("taskElement", "taskName")
                    taskName.contentEditable=true;
                    if(taskObject.name){ taskName.innerText = taskObject.name }
                    collapsibleHeader.appendChild(taskName);
                const menuContainer = document.createElement("div")
                    menuContainer.classList.add("taskElement", "menu");
                    const dropdownTrigger = document.createElement("a")
                        dropdownTrigger.classList.add("dropdown-trigger");
                        const i = document.createElement("i")
                            i.classList.add("material-icons");
                            const icon = document.createTextNode("more_vert");
                                i.appendChild(icon);
                            dropdownTrigger.appendChild(i);
                        menuContainer.appendChild(dropdownTrigger);
                    collapsibleHeader.appendChild(menuContainer);
                li.appendChild(collapsibleHeader);
            document.getElementById(parent).appendChild(li);
    }
}

export default List;