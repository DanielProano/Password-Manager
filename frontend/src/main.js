function login() {
    const user = document.getElementById('Email').value;
    const pass = document.getElementById('Password').value;
    console.log('Email:', user);
    console.log('Password:', pass);
}

function sayHello() {
    fetch('/api/hello')
      .then(response => response.text())
      .then(data => {
        document.getElementById('output').innerText = data;
      })
      .catch(error => {
        console.error('Error fetching hello:', error);
        document.getElementById('output').innerText = 'Error calling backend';
      });
}

// Expose to global so buttons can call them
window.login = login;
window.sayHello = sayHello;

