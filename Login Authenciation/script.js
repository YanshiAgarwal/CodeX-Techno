let isLogin = true; // default mode
const form = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const toggleLink = document.getElementById('toggle-link');
const toggleMsg = document.getElementById('toggle-msg');
const message = document.getElementById('message');
const securePage = document.getElementById('secure-page');
const logoutBtn = document.getElementById('logout');

// Toggle between Login/Register
toggleLink.addEventListener('click', () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? 'Login' : 'Register';
  toggleMsg.innerHTML = isLogin
    ? `Don't have an account? <a href="#" id="toggle-link">Register here</a>`
    : `Already have an account? <a href="#" id="toggle-link">Login here</a>`;
  message.textContent = '';
});

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    message.textContent = 'Please fill in both fields.';
    return;
  }

  if (isLogin) {
    // Login logic
    const stored = JSON.parse(localStorage.getItem(username));
    if (stored && stored.password === password) {
      message.textContent = '';
      form.style.display = 'none';
      toggleMsg.style.display = 'none';
      securePage.style.display = 'block';
    } else {
      message.textContent = 'Invalid username or password.';
    }
  } else {
    // Register logic
    if (localStorage.getItem(username)) {
      message.textContent = 'Username already exists.';
    } else {
      localStorage.setItem(username, JSON.stringify({ password }));
      message.style.color = 'green';
      message.textContent = 'Registration successful! Please login.';
      isLogin = true;
      formTitle.textContent = 'Login';
    }
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  form.style.display = 'block';
  toggleMsg.style.display = 'block';
  securePage.style.display = 'none';
  form.reset();
});
