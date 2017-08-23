var validation = {
  email: true,
  password: true,
  confirmPassword: true
};
(function () {
  var sigupFormInputs = document.querySelectorAll('#signupSection input');
  var usernameInput = sigupFormInputs[0];
  var passwordInput = sigupFormInputs[3];
  var confirmPasswordInput = sigupFormInputs[4];
  var submitSignup = document.querySelector('#signupSub');
  var signupNoteDiv = document.getElementsByClassName('errNote')[1];
  var validationErrors = {username: '', password: '', confirmPassword: ''};
  usernameInput.addEventListener('focusout', function () {
    if (this.value.length < 4) {
      this.classList.add('wrongInput');
      validationErrors.username = 'Email is invalid';
      validation.email = false;
    } else {
      this.classList.remove('wrongInput');
      validation.email = true;
      validationErrors.username = '';
    }
    submitSignup.disabled = !(isFormValid(validation));
  });

  passwordInput.addEventListener('focusout', function () {
    if (!isValidPassword(this.value)) {
      this.classList.add('wrongInput');
      validationErrors.password = 'password is invalid , password must be at least 7 characters';
      validation.password = false;
    } else {
      this.classList.remove('wrongInput');
      validation.password = true;
      validationErrors.password = '';
    }
    submitSignup.disabled = !(isFormValid(validation));
  });

  confirmPasswordInput.addEventListener('focusout', function () {
    if (this.value !== passwordInput.value) {
      this.classList.add('wrongInput');
      validationErrors.confirmPassword = 'Password fields are not matched!!';
      validation.confirmPassword = false;
      console.log('walid');
    } else {
      this.classList.remove('wrongInput');
      validation.confirmPassword = true;
      validationErrors.confirmPassword = '';
    }
    submitSignup.disabled = !(isFormValid(validation));
  });
  // enable or disable submit button of signup

})();
function isFormValid (sourceOfTrue) {
  return Object.values(sourceOfTrue).reduce(function (acc, source) {
    acc = source ? acc : false;
    return acc;
  }, true);
}
function isValidPassword (password) {
  //  Minimum eight characters, at least one letter, one number and one special character:
  // var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  // return reg.test(password);
  return password.length > 6;
}
