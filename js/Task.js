class Task {
    constructor() {}

    /**
     * When a task unfocuses, save it, or delete it if it's now blank
     * @param name-the current task name according to the HTML
     * @param id-the reference of the task, as an underscore-separated string
     * @param list-the List being edited
     * @return an updated task list
     **/
    static deleteOrSaveOnBlur(name, id, list) {
        let taskList;
        let reference;
        if (!name) {
            this.deleteTask(id, list);
            return list.tasks;
        }
        else {
            /*var*/
            taskList = list.tasks;
            /*let*/
            reference = id.split("_").map(Number);
            for (let i = 0; i < reference.length - 1; i++) {
                const ref = reference[i];
                taskList = taskList[ref].subTasks;
            }
            taskList[reference[reference.length - 1]].name = name;
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
        taskList.splice(taskList[reference[reference.length - 1]], 1);
        //If root
        if (reference.length === 1) {
            document.getElementById("header" + id).parentNode.remove();
        }
        //If not
        else {
            reference.pop();
            list.renderTasks(reference.join("_"));
            if (taskList.length === 0) {
                document.getElementById("header" + id).querySelector(".chevron").remove();
            }
        }
    }

}

export default Task;