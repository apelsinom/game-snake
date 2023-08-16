// функция для автофекуса на кнопке "Начать игру" даже если были до этого нажату кнопки разворота настроек
const buttons = document.querySelectorAll('.collapse-button');
buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      if (this !== startButton) {
        this.blur();
      }
    });
  });

/* для эффекта collapse */
//ловим клик на всём теге body
document.body.addEventListener('click', collapseFunction);
function collapseFunction(event) {
    //если нажатие не по кнопке с классом collapse-button, то выходим из функции
    if (!event.target.classList.contains('collapse-button')) return;
    //если нажатие по кнопке с классом collapse-button, то добавляем ему класс для скрытия, если его нет и удаляем, если он есть
    //записываем в константу значение атрибута data-toggle нажатой кнопки
    const atr = event.target.getAttribute('data-toggle');
    
    // Этот код можно использовать, если нужно чтобы при клике для разворачивания блока на вторую кнопку, одновременно скрывался первый блок, если он к тому времени был раскрыт. То есть чтобы не было не экране одновременно два и более раскрытых блока.
    // Получить все блоки разворачивания
    const collapseBlocks = document.querySelectorAll('.collapse');
    // Пройтись по каждому блоку разворачивания
    collapseBlocks.forEach((block) => {
    // Если блок является кликнутым блоком, переключить его видимость
    if (block.id === atr) {
      block.classList.toggle('hide');
    } else {
      // Если блок не является кликнутым блоком, скрыть его
      block.classList.add('hide');
    }
  });
    // Этот код можно использовать взамен части вышестоящего, если необходимочтобы при клике оставались развёрнутыми ранее кликнутые блоки, т.е. чтобы они сворачивались только своей кнопкой 
    /*
    //записываем в константу id блока, который хотим скрывать, так как их атрибуты и id совпадают
    const collapseBody = document.querySelector('#' + atr);
    //проверка. если искомого элемента с id=('#' + atr) нет, то выходим из функции
    if (!collapseBody) return;
    //если нужный элемент (блок, который будем скрывать) найден, то присваиваем ему класс hide, который в CSS скрыт (и наоборот при повторном клике)
    collapseBody.classList.toggle('hide');
    */
}