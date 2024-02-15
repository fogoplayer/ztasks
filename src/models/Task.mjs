

export default class Task {
    /**
     * Creates a new Task object.
     *
     * @param {{ id: string,
     *  title: string,
     *  description?: string,
     *  complete?: boolean,
     *  dueDate?: Date,
     *  reminders?: Date[],
     *  subtasks?: Task[],
     *  owners?: string[] 
     * }} taskData - The task data.
     */
    constructor({ id,
        title,
        description = "",
        complete = false,
        dueDate = undefined,
        reminders = [],
        /* 
        labels,
        attachments,
        */
        subtasks = [],
        owners = ["current user"]
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.complete = complete;
        this.dueDate = dueDate;
        this.reminders = reminders;
        this.subtasks = subtasks;
        this.owners = owners;
    }
}