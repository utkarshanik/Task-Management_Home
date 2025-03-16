document.getElementById('taskForm').addEventListener('submit', async (event)=>{
  event.preventDefault();
  await AddData();
  // await reloading();
} )

async function  reloading() {
  setTimeout(() => {
    location.reload()
  }, 1500);
}

 async function AddData() {
  const taskOwner = document.getElementById('inputtask').value;
  const taskName = document.getElementById('inputtaskname').value;
  const description = document.getElementById('desc').value;
  const startDate = document.getElementById('startdate').value;
  const endDate = document.getElementById('enddate').value;
  const dueDate = document.getElementById('duedate').value;
  const priority = document.getElementById('inputpriority').value;
  const status = document.getElementById('inputstatus').value;
  
  console.log(dueDate,priority,status,endDate,startDate)

  const taskData = {
    task_owner: taskOwner,
    task_name: taskName,
    task_detail: description,
    start_date: startDate,
    end_date: endDate,
    reminder: dueDate,
    priority: priority,
    status: status
  };

  async function AddTask(taskData) {
let response= await fetch('https://backend-task-manager-1-zl34.onrender.com/api/task/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(taskData)
  })

  let data= await response.json()

  if(data.error)
  {
    console.log(data.error);
    document.querySelector('#liveAlertPlaceholder').innerHTML=`
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${data.error}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    reloading();
  }
  else
  {
    document.querySelector('#liveAlertPlaceholder').innerHTML=`
       <div class="alert alert-info" role="alert">
        ${data.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    reloading();
  }

}
AddTask(taskData)
}

(() => {
  'use strict'
const forms = document.querySelectorAll('.needs-validation')
// Loop over them and prevent submission
Array.from(forms).forEach(form => {
  form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    form.classList.add('was-validated')
  }, false)
})
})()

