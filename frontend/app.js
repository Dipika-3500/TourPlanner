const BASE_URL = "http://localhost:5000";
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message);
}
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    alert("Login Successful");
    loadDoctors();
  } else {
    alert(data.message);
  }
}
async function loadDoctors() {
  const res = await fetch("http://localhost:5000/api/doctor");
  const doctors = await res.json();

  const container = document.getElementById("doctorList");
  container.innerHTML = "";

  doctors.forEach(doc => {
    container.innerHTML += `
      <div class="doctor-card">
        <h3>${doc.name}</h3>
        <p><b>Category:</b> ${doc.category}</p>
        <p><b>Specialization:</b> ${doc.specialization}</p>
        <p><b>Address:</b> ${doc.address}</p>
        <p><b>Available:</b> ${doc.availableTime}</p>
        <button onclick="showBooking('${doc._id}')">Book</button>
        <hr>
      </div>
    `;
  });
}

let selectedDoctor = "";

function showBooking(id) {
  selectedDoctor = id;
  document.getElementById("booking").style.display = "block";
}

async function book() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("slot").value;

  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/bookings/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      doctorId: selectedDoctor,
      date,
      time
    })
  });

  const data = await res.json();
  alert(data.message);
}
loadDoctors();
async function loadMyBookings() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/bookings/my`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();

  const container = document.getElementById("myBookings");
  container.innerHTML = "<h2>My Bookings</h2>";

  data.forEach(b => {
    container.innerHTML += `
      <div>
        <h4>${b.doctor.name}</h4>
        <p>Date: ${b.date}</p>
        <p>Time: ${b.time}</p>
        <hr>
      </div>
    `;
  });
}
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";  // redirect
  } else {
    alert(data.message);
  }
}
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

