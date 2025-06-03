// VARIABLES
const customUpload = document.querySelector('.custom-upload');
const fileInput = document.getElementById('file-upload');
const errorWrapper = document.getElementById('upload-error-msg');
const uploadInfoMsg = document.getElementById('upload-info-msg');
const errorMsg = document.getElementById('error-msg');
const uploadWrapper = document.getElementById('upload-wrapper');
const uploadedWrapper = document.getElementById('uploaded-wrapper');
const avatarUploaded = document.getElementById('avatar-uploaded');
const removeImgBtn = document.getElementById('remove-img-btn');
const changeImgBtn = document.getElementById('change-img-btn');
const inputName = document.getElementById('name');
const nameErrorMsg = document.getElementById('name-error-msg');
const nameErrorPar = document.querySelector('#name-error-msg p');
const inputEmail = document.getElementById('email');
const emailErrorMsg = document.getElementById('email-error-msg');
const inputGitHub = document.getElementById('github-username');
const gitHubErrorMsg = document.getElementById('github-error-msg');
const generateTicketBtn = document.getElementById('generate-ticket-btn');
const form = document.getElementById('ticket-form');
const inputFormSection = document.querySelector('.input-form-section');
const completedTicketSection = document.querySelector('.completed-ticket-section');
const userName = document.querySelector('.user-info h3');
const userGitHub = document.querySelector('.user-info p');
const randomTicketNum = document.getElementById('random-num');


let isImageValid = false;
let isNameValid = false;
let isEmailValid = false;
let isGitHubValid = false;
generateTicketBtn.disabled = true;

// FUNCTIONS 
function toggleSubmitButton() {
  generateTicketBtn.disabled = !(isNameValid && isEmailValid && isGitHubValid && isImageValid);
}

// ADD EVENT LISTENER
customUpload.addEventListener('click', () => {
  fileInput.click();
});

uploadWrapper.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fileInput.click();
  }
});

// Upload control - size and format
fileInput.addEventListener('change', () => {
  uploadInfoMsg.classList.remove('hide');
  errorWrapper.classList.add('hide');

  const file = fileInput.files[0];
  if(!file) return;

  if (file.size > (500*1024)) {
    uploadInfoMsg.classList.add('hide');
    errorWrapper.classList.remove('hide');
    fileInput.value = '';
    isImageValid = false;
    toggleSubmitButton();
    return;
  };

  if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp') {
    uploadInfoMsg.classList.add('hide');
    errorMsg.textContent = 'File format not supported. Only JPG, PNG or WEBP allowed.'
    errorWrapper.classList.remove('hide');
    fileInput.value = '';
    isImageValid = false;
    toggleSubmitButton();
    return;
  };

  // If file is valid...
  uploadWrapper.classList.add('hide');
  uploadedWrapper.classList.remove('hide');
    // Show img
  const tempURL = URL.createObjectURL(file);
  avatarUploaded.src = tempURL;

  isImageValid = true;
  toggleSubmitButton();
  
  // Print ticket
  document.querySelector('.user-data img').src = tempURL;

  avatarUploaded.onload = () => {
    URL.revokeObjectURL(tempURL);
  };
});

// Remove image button
removeImgBtn.addEventListener('click', () => {
  fileInput.value = '';
  uploadedWrapper.classList.add('hide');
  uploadWrapper.classList.remove('hide');
  isImageValid = false;
  toggleSubmitButton();
});

// Change image button
changeImgBtn.addEventListener('click', () => {
  fileInput.click();
});

// Full name input controls
inputName.addEventListener('blur', () => {
  const cleanedName = inputName.value.trim().replace(/\s+/g, ' ');
  const words = cleanedName.split(' ');
  
  // First and last name
  if (words.length !== 2) {
    nameErrorMsg.classList.remove('hide');
    inputName.classList.add('error');
    isNameValid = false;
    toggleSubmitButton();
    return;
  };
  // No numbers or special characters
  const nameRegex = /^[A-Za-zÀ-ÿ'’\- ]+$/;
  if (!nameRegex.test(cleanedName)) {
    nameErrorMsg.classList.remove('hide');
    inputName.classList.add('error');
    nameErrorPar.textContent = 'Numbers or special characters are not allowed.'
    isNameValid = false;
    toggleSubmitButton();
    return;
  }
   // Formatted name
  nameErrorMsg.classList.add('hide');
  inputName.classList.remove('error');
  const firstName = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  const secondName = words[1].charAt(0).toUpperCase() + words[1].slice(1).toLowerCase();

  inputName.value = `${firstName} ${secondName}`;

  isNameValid = true;
  toggleSubmitButton();

  // Print ticket
  document.querySelector('.print-name1').textContent = firstName; 
  document.querySelector('.print-name2').textContent = ' ' + secondName; 
  userName.textContent = inputName.value;
});

//Email input controls
inputEmail.addEventListener('blur', () => {
  const cleanedEmail = inputEmail.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(cleanedEmail)) {
    emailErrorMsg.classList.remove('hide');
    inputEmail.classList.add('error');
    isEmailValid = false;
    toggleSubmitButton();
    return;
  } else {
    emailErrorMsg.classList.add('hide');
    inputEmail.classList.remove('error');
    isEmailValid = true;
    toggleSubmitButton();
    // Print ticket
    document.querySelector('.print-email').textContent = cleanedEmail;
  };
});

//GitHub input controls 
inputGitHub.addEventListener('input', () => {
    const cleanedGit = inputGitHub.value.replace(/\s+/g, '');

    if(!cleanedGit || cleanedGit[0] !== '@') {
      gitHubErrorMsg.classList.remove('hide');
      inputGitHub.classList.add('error');
      isGitHubValid = false;
      toggleSubmitButton();
      return;
    } else {
      gitHubErrorMsg.classList.add('hide');
      inputGitHub.classList.remove('error');
      isGitHubValid = true;
      toggleSubmitButton();
      // Print ticket
      userGitHub.textContent = cleanedGit;
    };
});

// Sumbit controls 
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = fileInput.files[0];

  if (!file) {
    errorMsg.textContent = 'Upload Avatar is required.';
    errorWrapper.classList.remove('hide');
    return;
  }

  inputFormSection.classList.add('hide');
  completedTicketSection.classList.remove('hide');

  //Print random number
  const random = Math.floor(10000 + Math.random() * 90000);
  randomTicketNum.textContent = `#${random}`;

  form.reset();
  uploadedWrapper.classList.add('hide');
  uploadWrapper.classList.remove('hide');
  isImageValid = false;
  isNameValid = false;
  isEmailValid = false;
  isGitHubValid = false;
  generateTicketBtn.disabled = true;
});



