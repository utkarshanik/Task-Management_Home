document.getElementById("taskForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return; // Stop submission if validation fails
  }

  await AddData();
});

async function reloading() {
  setTimeout(() => {
      location.reload();
  }, 2000);
}

async function AddData() {
  const taskOwner = document.getElementById("inputtask").value.trim();
  const taskName = document.getElementById("inputtaskname").value.trim();
  const description = document.getElementById("desc").value.trim();
  const startDate = document.getElementById("startdate").value;
  const endDate = document.getElementById("enddate").value;
  const dueDate = document.getElementById("duedate").value;
  const priority = document.getElementById("inputpriority").value;
  const status = document.getElementById("inputstatus").value;

  console.log(dueDate, priority, status, endDate, startDate);

  const taskData = {
      task_owner: taskOwner,
      task_name: taskName,
      task_detail: description,
      start_date: startDate,
      end_date: endDate,
      reminder: dueDate,
      priority: priority,
      status: status,
  };

  async function AddTask(taskData) {
      let response = await fetch(
          "https://backend-task-manager-1-zl34.onrender.com/api/task/add",
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(taskData),
          }
      );

      let data = await response.json();

      if (data.error) {
          console.log(data.error);
          document.querySelector("#liveAlertPlaceholder").innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
              ${data.error}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
          reloading();
      } else {
          document.querySelector("#liveAlertPlaceholder").innerHTML = `
          <div class="alert alert-info" role="alert">
              ${data.message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
          reloading();
      }
  }
  AddTask(taskData);
}


function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  return !isNaN(date.getTime()); // Ensure it's a real date
}

// Example Usage:



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
  if (!new Date(reminder.value)) {
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

  return isValid;
}

// Bootstrap Form Validation (Needed for Bootstrap Styling)
(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
      form.addEventListener(
          "submit",
          (event) => {
              if (!form.checkValidity()) {
                  event.preventDefault();
                  event.stopPropagation();
              }
              form.classList.add("was-validated");
          },
          false
      );
  });
})();
