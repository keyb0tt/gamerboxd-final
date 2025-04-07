
// JavaScript functionality can be added here
document.addEventListener('DOMContentLoaded', function() {
    // Example of adding event listeners to buttons
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        console.log('Button clicked:', this.textContent);
      });
    });
  });