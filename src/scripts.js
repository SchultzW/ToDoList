class ToDoList
{
    
    constructor()
    {
       
        /*
    PART 5 - Local Storage
    -   Load the task list from the 'TASKS' element from local storage
        at the top of the constructor.  
            You'll have to parse the json in order to put it in the task list
            You will also need to add an if statement to only load the default
            list of tasks when there's nothing in local storage
    -   Save the task list to the TASKS element in local storage in loadTasks
            You'll have to convert the json to a string to put it in local storage
            JSON.stringify is the opposite of JSON.parse
            may need default set of tasks so code doesnt blow up trying to go through a null array
    END OF PART 5 - TEST AND DEBUG YOUR CODE - You're done writing code
    */
   
        this.tasks= JSON.parse(localStorage.getItem('TASKS'))
        if(!this.tasks)
        {
            this.tasks=[{task:'a task',isComplete:false}];
        }
        this.loadTasks=this.loadTasks.bind(this);
        this.loadTasks();
        this.toggleTaskStatus=this.toggleTaskStatus.bind(this);
        this.deleteTask=this.deleteTask.bind(this);
        this.addTask=this.addTask.bind(this);
        //document.getElementsByClassName("btn").addEventListener("click", addTask);
        let addBtn=document.getElementById("add");
        addBtn.onclick=this.addTaskClick.bind(this);
        this.addTaskClick=this.addTaskClick.bind(this);
        document.getElementById('addTask').addEventListener('keypress',event=>
        {
            if(event.keyCode===13)
            {
                this.addTask(event.target.value)
                event.target.value="";
            }
        } )
    


    }
    //template to add the html boxes with the task and its status
    generateTaskHtml(task, index) 
    {
        return `
          <li class="list-group-item checkbox">
            <div class="row">
              <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onChange="toDo.toggleTaskStatus(${index})" value="" class=""
                    ${(task.isComplete)?"checked":" "}>
                </label>
              </div>
              <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${(task.isComplete)?"complete":" "}">
                ${task.task}
              </div>
              <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <a class="" href="/" onclick="toDo.deleteTask(event,${index})"><i id="deleteTask" class="delete-icon glyphicon glyphicon-trash"></i></a>               
              </div>
            </div>
          </li>
        `;
    }
    loadTasks()
    {
        //takes array and reduces it to 1 piece of data parameter is a function(generateTaskHtml) we need return value(html)
        //what value to use and what index to use
        //reduces array to one iteam and then preforms a function on each thing in the array?
        localStorage['tasks']=JSON.stringify(this.tasks);
        let tasksHtml= this.tasks.reduce(
            (html, task, index) => html += this.generateTaskHtml(task, index), 
            '')//html starts as an empty string generate html for one task at a time and concatenates it
    
        document.getElementById("taskList").innerHTML=tasksHtml;
    }
   //finds the task by the index and then uses the ! to switch it to its opposite, which is neat i stold from book
   toggleTaskStatus(taskIndex)
   {
       this.tasks[taskIndex].isComplete=!this.tasks[taskIndex].isComplete;
        
        this.loadTasks()
   }
  
    //passes onclick event from html and prevents it from working and then removes task from the list and refreshes
    deleteTask(event, index)
    {
        event.preventDefault();
        this.tasks.splice(index,1);
        this.loadTasks();
    }    
    
    addTask(task)
    {
        let parentDiv=document.getElementById('addTask').parentElement;
        //let text=document.getElementById("addtask").value;     
        if(task==="")
        {
            parentDiv.classList.add('has-error')
        }
        else
        {
            parentDiv.classList.remove('has-error')
            let newTask={task,isComplete:false};
            this.tasks.push(newTask);
            this.loadTasks();


        }
    }
    addTaskClick()
    {
        let target=document.getElementById('addTask');
        this.addTask(target.value);
        target.value="";
    } 

}




let toDo;
window.onload=()=>{toDo=new ToDoList();};
