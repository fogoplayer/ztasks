class Task {
    /**
     * Add task to database and update UI
     * @param id-the id of the parent, as an underscore-separated string
     * @return null
    **/
    static addTask(id = "root"){
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
        List.createTaskNode(newTask, reference.concat([tasksArray.length - 1]), id);
        document.getElementById("header_"+reference.join("_")+ (id !== "root" ? "_" : "") +(tasksArray.length - 1)).querySelector(".taskName").focus();
    }
    
    /**
     * Intent a task one way or the other
     * @param direction-string, either "left" or "right"
     * @param id-the id of the task being indented
     * @return null
    **/
    static moveTask(direction, id){
        //Set task objects as variables
        const twoLevelsUp = List.getTaskFromId(id.substring(0, id.length - 4));
        const oneLevelUp = List.getTaskFromId(id.substring(0, id.length - 2));
        const taskObject = List.getTaskFromId(id);
        const prevSibling = oneLevelUp.subtasks[oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name) - 1];
        const nextSibling = oneLevelUp.subtasks[oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name) + 1];
        taskBeingDragged=true;
        if(direction === "left" && oneLevelUp.name){
            const youngerSiblings = oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name) + 1);
            taskObject.subtasks = taskObject.subtasks.concat(youngerSiblings);
            oneLevelUp.subtasks.splice(oneLevelUp.subtasks.length - 1, 1);
            twoLevelsUp.subtasks.splice(twoLevelsUp.subtasks.findIndex(t => t.name === oneLevelUp.name) + 1, 0, taskObject);
            List.renderTasks(twoLevelsUp.name ? id.substring(0, id.length - 4) : "root");
            document.getElementById("header_" + (id.length > 3 ? id.substring(0, id.length - 4) + "_" : "") + (Number(id.substring(id.length - 3, id.length - 2)) + 1)).children[1].focus();
        }else if(direction === "right" && prevSibling){
            prevSibling.subtasks.push(taskObject);
            oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name), 1);
            List.renderTasks(oneLevelUp.name ? id.substring(0, id.length - 2) : "root");
            document.getElementById( "header_" + (id.length > 1 ? id.substring(0, id.length - 2) + "_" : "") + (prevSibling ? (oneLevelUp.subtasks.findIndex(t => t.name === prevSibling.name)) + "_" : "") + (prevSibling.subtasks.length - 1) ).children[1].focus();
        }else if(direction === "up" && prevSibling){
            oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name), 1);
            oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === prevSibling.name), 0, taskObject);
            List.renderTasks(oneLevelUp.name ? id.substring(0, id.length - 2) : "root");
            document.getElementById("header_" + (id.length > 1 ? id.substring(0, id.length - 2) + "_" : "") + (prevSibling ? oneLevelUp.subtasks.findIndex(t => t.name === prevSibling.name) - 1: "") ).children[1].focus();
        }else if(direction === "down" && nextSibling){
            oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name), 1);
            oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === nextSibling.name) + 1, 0, taskObject);
            List.renderTasks(oneLevelUp.name ? id.substring(0, id.length - 2) : "root");
            document.getElementById("header_" + (id.length > 1 ? id.substring(0, id.length - 2) + "_" : "") + (nextSibling ? oneLevelUp.subtasks.findIndex(t => t.name === nextSibling.name) + 1: "")).children[1].focus();
        }
        taskBeingDragged = false;
    }
    
    /**
     * Dismiss a task
     * @param id-The id of the task being dismissed
     * return null
    **/
    static dismissTask(id){
        const oneLevelUp = List.getTaskFromId(id.substring(0, id.length - 2));
        const taskObject = List.getTaskFromId(id);
        oneLevelUp.subtasks.splice(oneLevelUp.subtasks.findIndex(t => t.name === taskObject.name), 1);
        dismissedTasks.push(taskObject);
        List.renderTasks(id.substring(0, id.length - 2));
    }
    
    /**
     * On keyup in a task, save it, or delete it if it's now blank
     * @param name-the current task name according to the HTML
     * @param id-the reference of the task, as an underscore-separated string
     * @param list-the List being edited
     * @return an updated task list
     **/
    static deleteOrSave(name, id) {
        let taskList;
        let reference;
        if (!name) {
            Task.deleteTask(id);
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
    
    static deleteTask(id) {
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
}

export default Task;