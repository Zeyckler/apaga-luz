import './../css/styles.css';
import data from '../../public/price-postprocessed.json';
import { week, weekEnd } from './templates.js';
import { nextCheapHour, reloadPage, tablePrice } from './utils.js';

let userHour = new Date().getHours();
let userMinutes = new Date().getMinutes();
let userDay = new Date().getDay();

const [{ price, zone }] = data.filter(({ hour }) => +hour === userHour);
const filterDataByUserHour = data.filter(({ hour }) => +hour > userHour);

userHour = userHour < 10 ? `0${userHour}` : userHour;
userMinutes = userMinutes < 10 ? `0${userMinutes}` : userMinutes;

const priceElement = document.getElementById('price');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const calendar = document.getElementById('calendar');

priceElement.textContent = `${price}`;
hoursElement.textContent = userHour;
minutesElement.textContent = userMinutes;

const getZone = zone =>
  zone === 'valle' ? '#a2fcc1' : zone === 'llano' ? '#ffae3a' : '#ec1d2f';

const mainElement = document.getElementsByTagName('main')[0];

if (userDay > 0 && userDay <= 5) {
  calendar.innerHTML = week;
  mainElement.style.backgroundColor = getZone(zone);
} else {
  calendar.innerHTML = weekEnd;
  calendar.style.gridTemplateColumns = '1fr';
  mainElement.style.backgroundColor = '#a2fcc1';
}

reloadPage(userMinutes);

const filteredData = data.filter(({ hour }) => +hour > userHour);

let expensiveHours = data.sort((a, b) => b.price - a.price);
let reverseCheapHours = [...expensiveHours].reverse();

expensiveHours = expensiveHours.slice(0, 12);
reverseCheapHours = reverseCheapHours.slice(0, 12);

tablePrice(reverseCheapHours, 'cheap-element');
tablePrice(expensiveHours, 'expensive-element');
