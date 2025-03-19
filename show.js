let id2='';
  const taskOwner = document.getElementById('inputtask');
  const taskName = document.getElementById('inputtaskname');
  const description = document.getElementById('desc');
  const startDate = document.getElementById('startdate');
  const endDate = document.getElementById('enddate');
  const dueDate = document.getElementById('duedate');
  const priority = document.getElementById('inputpriority');
  const statu = document.getElementById('inputstatus');

  document.addEventListener('DOMContentLoaded',async function() {
    try
    {
        let response = await fetch('https://backend-task-manager-1-zl34.onrender.com/api/task/view')
        let data= await response.json()
        const tableBody = document.querySelector('.showdata');
        tableBody.innerHTML = ''; // Clear any existing rows
  
        data.forEach((task, index) => {
          tableBody.innerHTML+=
          `<tr>
            <th class='data-item' scope="row">${index+1}</th>
            <td class='data-item'>${task.task_owner}</td>
            <td class='data-item'>${task.task_name}</td>
            <td class='data-item'>${task.task_detail}</td>
            <td class='data-item'>${task.start_date}</td>
            <td class='data-item'>${task.end_date}</td>
            <td class='data-item'>${task.reminder}</td>
            <td class='data-item'>${task.priority}</td>
            <td class='data-item'>${task.status}</td>
            <td><button type="button" class="btn btn-success btn-update"  data-bs-toggle="modal" data-updateid=${task.task_id} data-bs-target="#staticBackdrop">Update</button></td>

            <td> 
             <button class="btn btn-danger btn-delete liveToastBtn" data-deleteid=${task.task_id} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"> Delete </button>
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Task</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      Do you want to Delete ?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-danger innerdel">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr> `;
          });

        //Delete The task
        let del= document.querySelectorAll(".btn-delete");
        let del2= document.querySelector(".innerdel");
        
        del.forEach((item)=>{
          item.addEventListener('click',async()=>{
        // if (item.classList.contains('liveToastBtn')) {
        //   // let a=confirm("Do you want to delete")
          // console.log(a);
          
         del2.addEventListener('click',async()=>{

               const  TASK_id= {id:item.dataset.deleteid}
                let response = await fetch('https://backend-task-manager-1-zl34.onrender.com/api/task/delete',{
                  method:'DELETE',
                  headers:{
                    'Content-Type':'Application/json',
                  },
                  body:JSON.stringify(TASK_id)
                })
    
                  let data= await response.json();
                  console.log(data);
    
                if(data.error){
                  document.querySelector('#liveAlertPlaceholder').innerHTML=`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                      ${data.error}
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
                    reloading();
                  }
               else{
                  document.querySelector('#liveAlertPlaceholderr').innerHTML=`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                      ${data.message}
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
                    reloading();
                  }
                // }
          })
                
              // }
            });
          })
      
//Showing data to Update the task 
       let upd= document.querySelectorAll(".btn-update")
        upd.forEach((item)=>{
          item.addEventListener('click',async()=>{
              let upid={id:item.dataset.updateid}
              console.log(upid);
              let a= JSON.stringify(upid)
              console.log(typeof a)
              let response= await fetch('https://backend-task-manager-1-zl34.onrender.com/api/task/updateShow',{
                method:'POST',
                headers:{
                  'Content-Type':'Application/json',
                },
                body:JSON.stringify(upid)
              })

              let [data]= await response.json();
              console.log(data,typeof data);

              taskOwner.value=`${data.task_owner}`;
              taskName.value=`${data.task_name}`;
              description.value=`${data.task_detail}`;
              startDate.value=`${date_change(data.start_date)}`;              
              endDate.value=`${date_change(data.end_date)}`;
              dueDate.value=`${date_change(data.reminder,'datetime-local')}`;
              priority.value=`${data.priority}`;
              statu.value=`${data.status}`;

                id2=`${data.task_id}`;
                
                document.getElementById('taskForm').addEventListener('submit', async (event)=>{
                  event.preventDefault();
                  if (!validateForm()) {
                    return; // Stop submission if validation fails
                  }
                  
                  const taskOwner = document.getElementById('inputtask').value;
                  const taskName = document.getElementById('inputtaskname').value;
                  const description = document.getElementById('desc').value;
                  const startDate = document.getElementById('startdate').value;
                  const endDate = document.getElementById('enddate').value;
                  const dueDate = document.getElementById('duedate').value;
                  const priority = document.getElementById('inputpriority').value;
                  const status = document.getElementById('inputstatus').value;

                const taskData = {
                  id:id2,
                  task_owner: taskOwner,
                  task_name: taskName,
                  task_detail: description,
                  start_date: startDate,
                  end_date: endDate,
                  reminder: dueDate,
                  priority: priority,
                  status: status
                };

              let response = await fetch(`https://backend-task-manager-1-zl34.onrender.com/api/task/updatedata`,
                {
                  method:'PUT',
                  headers:{
                    'Content-Type':'application/json'
                },
                  body:JSON.stringify(taskData)
                })

                let data = await response.json()

                if(data.error){
                  document.querySelector('#liveAlertPlaceholder').innerHTML=`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                      ${data.error}
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
                    reloading();
                 }
                 else{
                  document.querySelector('#liveAlertPlaceholder').innerHTML=`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                      ${data.message}
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
                    reloading();
                }
             })

              function date_change(start_date, type = 'date') {
                const rawDate = new Date(start_date);
                
                if (type === 'datetime-local') {
                  // Format to 'YYYY-MM-DDTHH:MM' for datetime-local input
                  const formattedDateTimeLocal = rawDate.toISOString().slice(0, 16);
                  console.log(formattedDateTimeLocal);
                  return formattedDateTimeLocal;
                } else {
                  // Default to 'YYYY-MM-DD' for date input
                  const formattedDate = rawDate.toISOString().split('T')[0];
                  console.log(formattedDate);
                  return formattedDate;
                }
              }

          })
        })
    }
    catch(error)
    {
      console.error('Error fetching data:', error);
    }
    });
  
//Reloading Function
    function  reloading() {
      setTimeout(() => {
        location.reload()
      }, 1000);
    }
//Function for validation
function isValidDate(dateString , isDateTime = false) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/; // YYYY-MM-DDTHH:MM

  if (isDateTime ? !dateTimeRegex.test(dateString) : !dateRegex.test(dateString)) {
      return false; // Format is incorrect
  }

  const date = new Date(dateString);
  return !isNaN(date.getTime()); // Ensure it's a real date/time
}

// Form Validation Function
function validateForm() {
  let isValid = true;

  function showError(input, message) {
      input.classList.add("is-invalid");
      let feedback = input.nextElementSibling;
      if (!feedback || !feedback.classList.contains("invalid-feedback")) {
          feedback = document.createElement("div");
          feedback.className = "invalid-feedback";
          input.parentNode.appendChild(feedback);
      }
      feedback.textContent = message;
  }

  function removeError(input) {
      input.classList.remove("is-invalid");
      let feedback = input.nextElementSibling;
      if (feedback && feedback.classList.contains("invalid-feedback")) {
          feedback.textContent = "";
      }
  }

  const taskOwner = document.getElementById("inputtask");
  if (taskOwner.value.trim()==='') {
      showError(taskOwner, "Task Owneris required.");
      isValid = false;
  } else {
      removeError(taskOwner);
  }

  const taskName = document.getElementById("inputtaskname");
  if (taskName.value.trim()==='') {
      showError(taskName, "Task Name is required.");
      isValid = false;
  } else {
      removeError(taskName);
  }

  const desc = document.getElementById("desc");
  if (desc.value.trim() === "") {
      showError(desc, "Description is required.");
      isValid = false;
  } else {
      removeError(desc);
  }

  const startDate = document.getElementById("startdate");
  const endDate = document.getElementById("enddate");
  const reminder = document.getElementById("duedate");

  // Validate Start Date
  if (!isValidDate(startDate.value)) {
      showError(startDate, "Please enter a valid Start Date.");
      isValid = false;
    } else {
      removeError(startDate);
    }
    
  // Validate End Date
  if (!isValidDate(endDate.value)) {
      showError(endDate, "Please enter a valid End Date.");
      isValid = false;
  } else if (new Date(endDate.value) <= new Date(startDate.value)) {
      showError(endDate, "End Date must be after Start Date.");
      isValid = false;
  } else {
      removeError(endDate);
  }

  // Validate Reminder Date
  if (!isValidDate(reminder.value,true)) {
      showError(reminder, "Please enter a valid Reminder Date.");
      isValid = false;
  } else if (new Date(reminder.value) <= new Date()) {
      showError(reminder, "Reminder must be set for a future date.");
      isValid = false;
  } else {
      removeError(reminder);
  }

  const priority = document.getElementById("inputpriority");
  if (priority.value === "") {
      showError(priority, "Please select a Priority.");
      isValid = false;
  } else {
      removeError(priority);
  }

  const status = document.getElementById("inputstatus");
  if (status.value === "") {
      showError(status, "Please select a Status.");
      isValid = false;
    } else {
      removeError(status);
    }
    let submitBtn=document.querySelector('.sub')
    submitBtn.disabled = !isValid;
    document.querySelectorAll("input, select").forEach((input) => {
      input.addEventListener("input", validateForm);
  });
    return isValid;
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
