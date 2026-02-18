const navLinks = document.querySelectorAll('.nav-links li a');
const menuCheck = document.getElementById('check');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuCheck.checked = false;
  });
});

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  e.stopPropagation(); 

  const data = new FormData(form);
  const btn = document.getElementById('submit-btn');
  
  btn.innerText = "Sending...";
  btn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.innerHTML = "Success! Message sent.";
      status.style.color = "#28a745";
      form.reset();
    } else {
      status.innerHTML = "Error: Please check your Formspree ID.";
      status.style.color = "#dc3545";
    }
  } catch (error) {
    status.innerHTML = "Connection error. Try again.";
    status.style.color = "#dc3545";
  } finally {
    btn.innerText = "Send Message";
    btn.disabled = false;
  }
});