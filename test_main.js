window.addEventListener('unhandledrejection', function(event) {
  if (event.reason && event.reason.type === 'cancelation' && event.reason.msg === 'operation is manually canceled') {
    event.preventDefault();
  }
});
