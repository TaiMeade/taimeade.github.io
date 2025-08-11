function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}


emailjs.init({
  publicKey: '1AkByoDhGNFhkKR8P',
  // Do not allow headless browsers
  blockHeadless: true,
//   blockList: {
//     // Block the suspended emails
//     list: ['foo@emailjs.com', 'bar@emailjs.com'],
//     // The variable contains the email address
//     watchVariable: 'userEmail',
//   },
  limitRate: {
    // Set the limit rate for the application
    id: 'app',
    // Allow 1 request per 10s
    throttle: 10000,
  },
});
function sendMail(event) {
    event.preventDefault();

    emailjs.sendForm('service_o1nb8bf', 'template_7x07rj7', event.target)
      .then(() => {
        alert('Message sent!');
      }, (error) => {
        console.error(error);
        alert('Failed to send message');
      });
  }

