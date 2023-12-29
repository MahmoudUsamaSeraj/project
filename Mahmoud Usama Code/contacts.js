

function validateUserName() {
    var myName = document.getElementById("username").value;
    var nameError = document.getElementById("nameError");
    nameError.innerHTML = "";
    if (myName.trim() === "") {
        nameError.innerHTML = "Name is required";
        return false;
    }
    var regex = /^[a-zA-Z\s]+$/; 
    if (!regex.test(myName)) {
        nameError.innerHTML = "Please use only alphabetic characters and spaces.";
        return false;
    }
    return true;
}
function validateEmail() {
    var userEmail = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    emailError.innerHTML = "";
    if (userEmail === "") {
        emailError.innerHTML = "Email is required";
        localStorage.setItem("emailError", "Email is required");
        return false;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(userEmail)) {
        emailError.innerHTML = "Please enter a valid email address.";
        localStorage.setItem("emailError", "Please enter a valid email address.");
        return false;
    }
    if (!userEmail.endsWith(".com")) {
      emailError.innerHTML = "Email must end with '.com'";
      localStorage.setItem("emailError", "Email must end with '.com'");
      return false;
  }
    localStorage.removeItem("emailError");
    return true;
}
function validatePhoneNumber() {
    var userPhoneNumber = document.getElementById("phone").value;
    var phoneError = document.getElementById("phoneError");
    phoneError.innerHTML = "";
    if (userPhoneNumber === "") {
        phoneError.innerHTML = "Phone number is required";
        return false;
    }
    var phoneRegex = /^(011|010|012)\d{8}$/;
    if (!phoneRegex.test(userPhoneNumber)) {
        phoneError.innerHTML = "Please enter a valid phone number starting with 011, 010, or 012 followed by 8 digits.";
        return false;
    }
    return true;
}

function validation(){

    validateUserName();
    validateEmail();
    validatePhoneNumber();

}
function validateForm() {
    var isNameValid = validateUserName();
    var isEmailValid = validateEmail();
    var isPhoneValid = validatePhoneNumber();

    
    if (isNameValid && isEmailValid && isPhoneValid) {
  
      alert("Your Message Submitted Successfully!");
      document.getElementById("myForm").submit();
      return true;
    } else {
  
      alert("Form submission failed. Please check the errors.");
      return false;
    }
  }

  function submitForm() {
    validateForm();
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  window.onscroll = function() {
    var scrollToTopLink = document.getElementById('scrollToTopLink');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopLink.style.display = 'block';
    } else {
      scrollToTopLink.style.display = 'none';
    }
  };
