import '../styles/main.scss';
import { Calculator } from './calculator';

document.addEventListener('DOMContentLoaded', () => {
  new Calculator('.calculator__input input', '.calculator__btns button');

  const themeBtn = document.querySelector('.btn-theme');
  const body = document.body;

  themeBtn.addEventListener('click', () => {
    body.classList.toggle('light');
  });
});
