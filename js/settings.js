//переменные для записи параметров настроек
let language;//Язык
let size;//Размер поля (количество ячеек)
let complexity;//Сложность (первоначальная скорость)
let speed;//Управление скоростью
let borders;//Границы игрового поля
let cross;//Управление змейкой

// Обрабатываем выбор параметров из настроек
const form = document.querySelector('form');
let formData = new FormData(form);

// Эта часть кода если будет необходима кнопка сброса настроек до "по умолчанию". В HTML эта часть кода то же скрыта
// // для сброса выбранных значений формы до первоначального состояния по умолчанию
// const resetButton = document.querySelector('#resetButton');
// // Обработчик события для кнопки сброса
// resetButton.addEventListener('click', function() {
//   form.reset(); // Сбросить значения формы до первоначального состояния
//   startButton.focus();
// });

// Для фона в поле игры. Получаем ссылку на элементы
const imageInput = document.getElementById('imageInput');

// imageInput.addEventListener('click', function() {
//   const collapseBlocks = document.querySelectorAll('.collapse');
//   collapseBlocks.classList.add('hide');
// })

// Обработчик события изменения input[type="file"]
imageInput.addEventListener('change', function () {

  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    // Устанавливаем прочитанный файл как фоновое изображение для контейнера
    canvas.style.backgroundImage = `url(${event.target.result})`;
  };

  // Читаем выбранный файл в формате Data URL (Base64)
  reader.readAsDataURL(file);
});