import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";

const formEl = document.querySelector('form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');
let formData = {
  email: '',
  message: ''
}

populateFormEl();

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onInput,500));

function onInput(event) {
    formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
    event.preventDefault();
    const formElements = event.currentTarget;
    const email = formElements.email.value;
    const message = formElements.message.value;
    const resultSubmit = {
       email,
       message
    };
    console.log(resultSubmit);

      if (email === '' || message === '') {
    return;
      }
     
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY)
    formData = {
      email: '',
      message: ''
    }
   
}


function populateFormEl() {
    const savedInfo = localStorage.getItem(STORAGE_KEY);
    const parsedSavedInfo = JSON.parse(savedInfo);
    if (parsedSavedInfo) {
    inputEl.value = parsedSavedInfo.email;
    textareaEl.value = parsedSavedInfo.message;
    formData.message = parsedSavedInfo.message;
    formData.email = parsedSavedInfo.email;
}

}
