const form = document.getElementById('form');
const input = form.querySelector('input');
const subjectList = document.querySelector('.subjects');
const addButton = document.getElementById('add');
const clearButton = document.getElementById('clear');
let items = JSON.parse(localStorage.getItem('items')) || [];
const mainDiv = document.querySelector('.wrapper');
const monthNum = [1,2,3,4,5,6,7,8,9,10,11,12]
const date = new Date();
const day = date.getDate();
const month = monthNum[date.getMonth()];
const year = date.getFullYear();

const div = document.createElement('div');
div.textContent = `${month}/${day}/${year}`;
mainDiv.insertBefore(div,subjectList);


const addSubject = e => {
  e.preventDefault();
  const text = input.value;
  input.value ='';
  const item = {
    text,
    done: false
  };

  items.push(item);
  populateList(items,subjectList);
  localStorage.setItem('items', JSON.stringify(items));

};

const populateList = (subjects = [], subjexList) => {
  subjexList.innerHTML = subjects.map((subject, i=0) => {
    if (i !== 0) {
    return `
      <li>
      <input type = "checkbox" data-index =${i} id="item${i}" ${subject.done ? 'checked' : ''} />
      <label for ="item${i}">${subject.text}</label>
      </li>
    `;
  }
}).join('');
};

const toggleDone = e => {
  if(!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, subjectList);
};

const clearList = e => {

  items = [];
  localStorage.removeItem(items);
  localStorage.clear();
  subjectList.remove(items);
  location.reload();

};



clearButton.addEventListener('click', clearList);
form.addEventListener('submit', addSubject);
subjectList.addEventListener('click', toggleDone);

populateList(items, subjectList);
