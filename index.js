document.addEventListener("DOMContentLoaded", function () {
  // Select the form element
  const form = document.querySelector("form");

  // Function to handle form submission
  const handleSubmit = function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const formData = new FormData(form);

    // Validate form fields
    if (!validateForm(formData)) {
      return; // Exit if form validation fails
    }

    // Prepare data for submission
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Send form data to server using AJAX
    sendFormData(data);
  };

  // Function to validate form fields
  const validateForm = function (formData) {
    // Example validation: Check if email is valid
    const email = formData.get("email");
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return false; // Return false to indicate validation failure
    }

    // Additional validations can be added here for other form fields

    return true; // Return true if all validations pass
  };

  // Function to validate email address
  const validateEmail = function (email) {
    // Simple email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Function to send form data to server using AJAX
  const sendFormData = function (data) {
    // Example: Send form data to a server endpoint using fetch API
    fetch("submit.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        // Handle success response from server
        alert("Your message has been sent successfully!");
        form.reset(); // Reset the form after successful submission
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  // Add event listener to form submit event
  form.addEventListener("submit", handleSubmit);
});
