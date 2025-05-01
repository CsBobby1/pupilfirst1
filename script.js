function isValidAge(dobStr) {
    const dob = new Date(dobStr);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 18 && age <= 55;
  }
  
  function loadEntries() {
    const entries = JSON.parse(localStorage.getItem("user-entries") || "[]");
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = "";
    entries.forEach(entry => {
      const row = `<tr>
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.acceptedTerms}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  }
  
  document.getElementById("registrationForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("acceptTerms").checked;
  
    if (!isValidAge(dob)) {
      alert("Age must be between 18 and 55.");
      return;
    }
  
    const entry = { name, email, password, dob, acceptedTerms };
  
    const entries = JSON.parse(localStorage.getItem("user-entries") || "[]");
    entries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(entries));
  
    loadEntries();
    this.reset();
  });
  
  window.addEventListener("load", loadEntries);
  