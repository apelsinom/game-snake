const startButton = document.getElementById("startButton")
startButton.focus();

// Получаем элемент canvas и его контекст
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Размер одной клетки
let cellSize = 20;

// Переменная для хранения счёта
let score = 0;
// Отображаем счёт в окне слева
document.querySelector('#check').innerHTML = score;

// Переменные для хранения состояния змейки
let snake = [{ x: Math.floor(canvas.width/cellSize/2), y: Math.floor(canvas.height/cellSize/2) }];
let dx = 0;
let dy = -1;

// Переменная для хранения позиции еды
let food = { 
  x: Math.floor(Math.random() * (canvas.width / cellSize)), 
  y: Math.floor(Math.random() * (canvas.height / cellSize)) 
};

// Массив с путями к картинкам еды
const foodImages = [
  "img/blackberry.png", 
  "img/blueberry.png", 
  "img/cherry.png", 
  "img/raspberries.png", 
  "img/strawberry.png", 
  "img/watermelon.png"
];

// Переменная для хранения пути к текущей картинке еды
let currentFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];

// Загрузка картинки еды
const foodImage = new Image();
foodImage.src = currentFoodImage;
foodImage.onload = draw; // После загрузки картинки, вызываем функцию draw()

// Функция для отрисовки змейки и еды
function draw() {
  // Очищаем canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Рисуем змейку
  snake.forEach((segment, index) => {
    if (index === 0) {
      // Отрисовываем каждый сегмент змейки как круг
      ctx.beginPath();
      ctx.arc(
        segment.x * cellSize + cellSize / 2, // X-координата центра круга
        segment.y * cellSize + cellSize / 2, // Y-координата центра круга
        cellSize / 2, // Радиус круга (половина размера клетки)
        0, // Начальный угол в радианах
        2 * Math.PI // Конечный угол в радианах (полный круг)
      );
      ctx.fillStyle = "brown";// Голова змейки будет коричневого цвета
      ctx.fill(); // Заливаем круг текущим цветом 
    } else {
      // Остальные сегменты змейки будут зелёного цвета
      ctx.fillStyle = "green";
      ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    }
  });

  // Рисуем еду (картинка)
  ctx.drawImage(foodImage, food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

// Функция для обновления состояния змейки и игры
function update() {
  // Обновляем позицию головы змейки
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  
  // Проверяем, не столкнулась ли змейка с границами поля, если это выбрано в настройках
  formData = new FormData(form);//забираем значения из всех элементов формы
  borders = formData.get('borders');//получаем выбранное в радиокнопке значение borders
  switch (borders) {
    case "bordersNo":
      if (
        head.x < 0 ||
        head.x >= canvas.width / cellSize ||
        head.y < 0 ||
        head.y >= canvas.height / cellSize
      ) {
        // Если столкнулась, завершаем игру
        clearInterval(gameLoop);
        alert("Игра окончена!");
        startButton.style.display = 'block';
        startButton.focus();
        return;
      }
      break;
    case "borderYes":
      //Дописываем код для возможности змейки пересекать границы игрового поля, если это выбрано в настройках
      if (head.x < 0) {
        head.x = canvas.width/cellSize;
      } else if (head.x >= canvas.width/cellSize) {
        head.x = 0;
      }
      if (head.y < 0) {
        head.y = canvas.height/cellSize;
      } else if (head.y >= canvas.height/cellSize) {
        head.y = 0;
      }
      break;
  }
  // Проверяем, не столкнулась ли змейка с самой собой, если это выбрано в настройках
  formData = new FormData(form);//забираем значения из всех элементов формы
  cross = formData.get('cross');//получаем выбранное в радиокнопке значение cross
  switch (cross) {
    case "crossNo":
      if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        // Если столкнулась, завершаем игру
        alert("Игра окончена!");
        clearInterval(gameLoop);
        startButton.style.display = 'block';
        startButton.focus();
        return;
      }
  }

  // Проверяем, не съела ли змейка еду
  if (head.x === food.x && head.y === food.y) {
    // Если съела, увеличиваем счёт
    score++;
    // Отображаем счёт в окне слева
    document.querySelector('#check').innerHTML = score;
    // Если съела, добавляем новый сегмент к змейке
    snake.unshift({ ...head });
    // Выбираем случайное изображение еды из массива (не повторяющееся с предыдущим)
    let newFoodImage;
    do {
      newFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];
    } while (newFoodImage === currentFoodImage);
    currentFoodImage = newFoodImage;
    // Загружаем выбранное изображение еды
    foodImage.src = currentFoodImage;
    // Создаем новую еду в случайной позиции
    food = {
      x: Math.floor(Math.random() * (canvas.width / cellSize)),
      y: Math.floor(Math.random() * (canvas.height / cellSize)),
    };
  } else {
    // Если не съела, просто перемещаем змейку (удаляем последний сегмент и добавляем голову)
    snake.pop();
    snake.unshift({ ...head });
  }

  // Обновляем отрисовку
  draw();
}

// Функция для обработки событий клавиатуры
function handleKeyPress(event) {

  // Получаем выбранное значение из настроек. Может ли двигаться змейка в противоположном направлении, если это выбрано в настройках
  formData = new FormData(form);
  cross = formData.get('cross');
  
  //  Если не может двигаться змейка в противоположном направлении
  switch (cross) {
    case "crossNo":
      if (event.key=="ArrowUp" && dy!=1) {
        dx = 0;
        dy = -1;
      } else if (event.key=="ArrowDown" && dy!=-1) {
        dx = 0;
        dy = 1;
      } else if (event.key=="ArrowLeft" && dx!=1) {
        dx = -1;
        dy = 0;
      } else if (event.key=="ArrowRight" && dx!=-1) {
        dx = 1;
        dy = 0;
      }
      break;
    //  Если может двигаться змейка в противоположном направлении
    case "crossYes":
      if (event.key=="ArrowUp") {
        dx = 0;
        dy = -1;
      } else if (event.key=="ArrowDown") {
        dx = 0;
        dy = 1;
      } else if (event.key=="ArrowLeft") {
        dx = -1;
        dy = 0
      } else if (event.key=="ArrowRight") {
        dx = 1;
        dy = 0;
      }
      break
  }
}

// Добавляем обработчик события клавиатуры
document.addEventListener("keydown", handleKeyPress);

// Функция для начала игры
let gameLoop;
function startGame() {
  // Очищаем переменную gameLoop, если она была уже определена
  if (gameLoop) {
    clearInterval(gameLoop);
  }
  // Сбрасываем позицию змейки
  snake = [{ x: Math.floor(canvas.width/cellSize/2), y: Math.floor(canvas.height/cellSize/2) }];
  dx = 0;
  dy = -1;

  // Сбрасываем позицию змейки
  food = { 
    x: Math.floor(Math.random() * (canvas.width / cellSize)), 
    y: Math.floor(Math.random() * (canvas.height / cellSize)) 
  };

  // Запускаем игровой цикл
  gameLoop = setInterval(update, 200);
  // Скрываем кнопку после начала игры
  startButton.style.display = 'none';
} 
startButton.addEventListener('click', startGame);