class Task {
    constructor() {}

    /**
     * When a task unfocuses, save it, or delete it if it's now blank
     * @param name-the current task name according to the HTML
     * @param id-the reference of the task, as an underscore-separated string
     * @param list-the List being edited
     * @return an updated task list
     **/
    static deleteOrSaveOnKeyup(name, id, list) {
        let taskList;
        let reference;
        if (!name) {
            this.deleteTask(id, list);
            return list.tasks;
        }
        else if(!list.taskBeingDragged){
            taskList = list.tasks;
            reference = id.split("_").map(Number);
            for (let i = 0; i < reference.length - 1; i++) {
                const ref = reference[i];
                taskList = taskList[ref].subtasks;
            }
            taskList[reference[reference.length - 1]].name = name;
            return list.tasks;
        }else{
            return list.tasks;
        }
    }
    /**
     * Delete a task
     * @param reference-the reference of the task, as an underscore-separated string
     * @param list-the List being edited
     **/
    static deleteTask(id, list) {
        let reference = id.split("_").map(Number);
        let taskList = list.tasks;
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