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
const resetBtn = document.getElementById('reset-btn');

let isImageValid = false;
let isNameValid = false;
let isEmailValid = false;
let isGitHubValid = false;
generateTicketBtn.disabled = true;
let previousObjectURL = null;

// FUNCTIONS 
function toggleSubmitButton() {
  generateTicketBtn.disabled = !(isNameValid && isEmailValid && isGitHubValid && isImageValid);
}

function validateFile(file) {
  if (!file.type.startsWith('image/')) {
    errorMsg.textContent = 'Please upload an image file.';
    return false;
  }
  if (file.size > 500 * 1024) {
    errorMsg.textContent = 'File too large. Please upload a photo under 500KB.';
    return false;
  }
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    errorMsg.textContent = 'File format not supported. Only JPG, PNG or WEBP allowed.';
    return false;
  }
  return true;
}

function showImage(file) {
  uploadWrapper.classList.add('hide');
  uploadedWrapper.classList.remove('hide');

  if (previousObjectURL) {
    URL.revokeObjectURL(previousObjectURL);
  }
  const tempURL = URL.createObjectURL(file);
  previousObjectURL = tempURL;

  avatarUploaded.src = tempURL;
  const userDataImg = document.querySelector('.user-data img')
  if (userDataImg) {
    userDataImg.src = tempURL;
  }
}

// EVENT LISTENERS
customUpload.addEventListener('click', () => {
  fileInput.click();
});

uploadWrapper.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fileInput.click();
  }
});

uploadWrapper.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadWrapper.classList.add('dragover');
});

uploadWrapper.addEventListener('dragleave', () => {
  uploadWrapper.classList.remove('dragover');
});

uploadWrapper.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadWrapper.classList.remove('dragover');

  const files = e.dataTransfer.files;
  if (files.length) {
    const file = files[0];
    uploadInfoMsg.classList.add('hide');
    if (validateFile(file)) {
      errorWrapper.classList.add('hide');
      fileInput.files = files;
      showImage(file);
      isImageValid = true;
    } else {
      errorWrapper.classList.remove('hide');
      fileInput.value = '';
      isImageValid = false;
    }
    toggleSubmitButton();
  }
});

fileInput.addEventListener('change', (e) => {
  uploadInfoMsg.classList.remove('hide');
  errorWrapper.classList.add('hide');

  const file = fileInput.files[0];
  if (!file) return;

  if (validateFile(file)) {
    showImage(file);
    isImageValid = true;
  } else {
    uploadInfoMsg.classList.add('hide');
    errorWrapper.classList.remove('hide');

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      errorMsg.textContent = 'File format not supported. Only JPG, PNG or WEBP allowed.';
    } else if (file.size > 500 * 1024) {
      errorMsg.textContent = 'File too large. Please upload a photo under 500KB.';
    }
    fileInput.value = '';
    isImageValid = false;
  }
  toggleSubmitButton();
});

removeImgBtn.addEventListener('click', () => {
  fileInput.value = '';
  uploadedWrapper.classList.add('hide');
  uploadWrapper.classList.remove('hide');
  isImageValid = false;
  toggleSubmitButton();

  if (previousObjectURL) {
    URL.revokeObjectURL(previousObjectURL);
    previousObjectURL = null;
  }

  avatarUploaded.src = ''; 
  document.querySelector('.user-data img').src = ''; 
});

changeImgBtn.addEventListener('click', () => {
  fileInput.click();
});

// Name input validation and formatting
inputName.addEventListener('blur', () => {
  const cleanedName = inputName.value.trim().replace(/\s+/g, ' ');
  const words = cleanedName.split(' ');

  if (words.length !== 2) {
    nameErrorMsg.classList.remove('hide');
    inputName.classList.add('error');
    isNameValid = false;
    toggleSubmitButton();
    return;
  }
  const nameRegex = /^[A-Za-zÀ-ÿ'’\- ]+$/;
  if (!nameRegex.test(cleanedName)) {
    nameErrorMsg.classList.remove('hide');
    inputName.classList.add('error');
    nameErrorPar.textContent = 'Numbers or special characters are not allowed.';
    isNameValid = false;
    toggleSubmitButton();
    return;
  }
  nameErrorMsg.classList.add('hide');
  inputName.classList.remove('error');

  const firstName = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  const secondName = words[1].charAt(0).toUpperCase() + words[1].slice(1).toLowerCase();

  inputName.value = `${firstName} ${secondName}`;

  isNameValid = true;
  toggleSubmitButton();

  document.querySelector('.print-name1').textContent = firstName;
  document.querySelector('.print-name2').textContent = ' ' + secondName;
  userName.textContent = inputName.value;
});

// Email input validation
inputEmail.addEventListener('blur', () => {
  const cleanedEmail = inputEmail.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleanedEmail)) {
    emailErrorMsg.classList.remove('hide');
    inputEmail.classList.add('error');
    isEmailValid = false;
    toggleSubmitButton();
    return;
  }
  emailErrorMsg.classList.add('hide');
  inputEmail.classList.remove('error');
  isEmailValid = true;
  toggleSubmitButton();

  document.querySelector('.print-email').textContent = cleanedEmail;
});

// GitHub input validation
inputGitHub.addEventListener('input', () => {
  const cleanedGit = inputGitHub.value.replace(/\s+/g, '');

  if (!cleanedGit || cleanedGit[0] !== '@') {
    gitHubErrorMsg.classList.remove('hide');
    inputGitHub.classList.add('error');
    isGitHubValid = false;
    toggleSubmitButton();
    return;
  }
  gitHubErrorMsg.classList.add('hide');
  inputGitHub.classList.remove('error');
  isGitHubValid = true;
  toggleSubmitButton();

  userGitHub.textContent = cleanedGit;
});

// Form submit
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

  const random = Math.floor(10000 + Math.random() * 90000);
  randomTicketNum.textContent = `#${random}`;
});

resetBtn.addEventListener('click', () => {
  if (previousObjectURL) {
    URL.revokeObjectURL(previousObjectURL);
    previousObjectURL = null;
  }

  form.reset();
  avatarUploaded.src = '';
  document.querySelector('.user-data img').src = '';
  const ticketAvatarImg = completedTicketSection.querySelector('.ticket-avatar-img');
  if (ticketAvatarImg) ticketAvatarImg.src = '';

  isImageValid = false;
  isNameValid = false;
  isEmailValid = false;
  isGitHubValid = false;
  generateTicketBtn.disabled = true;
  uploadedWrapper.classList.add('hide');
  uploadWrapper.classList.remove('hide');
  inputFormSection.classList.remove('hide');
  completedTicketSection.classList.add('hide');
});

  