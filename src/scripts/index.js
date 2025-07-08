import '../styles/main.scss';
import { Calculator } from './calculator/calculator.js';

document.addEventListener('DOMContentLoaded', () => {
  new Calculator('.calculator__input input', '.calculator__btns button');

  const themeBtn = document.getElementById('themeBtn');
  const body = document.body;

  themeBtn.addEventListener('click', () => {
    body.classList.toggle('light');
  });

  const scientificModeBtn = document.getElementById('scientificModeBtn');
  const calculator = document.querySelector('.calculator');

  scientificModeBtn.addEventListener('click', () => {
    calculator.classList.toggle('scientific');
  });
});
