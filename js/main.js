var numbers = document.querySelectorAll('.number'), 
    operations = document.querySelectorAll('.operation'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear_btn'),
    howWorkBtn = document.getElementById('howWorkBtn'),
    display = document.getElementById('display'),
    MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';
    operationsList = document.getElementById('operationsList');
    var liList = true;

for (var i=0; i<numbers.length; i++) {
    var number = numbers[i];
    // Установка обработчика щелчка мышью на числовой кнопке
    number.addEventListener('click', function (e) {
        //Вызов обработчика и передача ему текстового содержимого кнопки, на которой щелкнули
        numberPress(e.target.textContent);
    });
};

for (var i=0; i<operations.length; i++) {
    var operationBtn = operations[i];
    // Обработчик щелчка мышью на кнопке с операцией
    operationBtn.addEventListener('click', function (e) {
        //Вызов обработчика и передача ему текстового содержимого кнопки, на которой щелкнули
        operation(e.target.textContent);
    });
};

// Очистка дисплея
for (var i=0; i<clearBtns.length; i++) {
    var clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
        clear(e.srcElement.id);
    });
};

howWorkBtn.addEventListener('click', howWork);
decimalBtn.addEventListener('click', decimal);

// Клавиши с цифрами
function numberPress(number) {
    if (MemoryNewNumber) {
        display.value = number;
        MemoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        };
    };
};

//Арифметические операции
function operation(op) {
    var localOperationMemory = display.value;

    if (MemoryNewNumber && MemoryPendingOperation !== '='){
        // Если должен начаться ввод нового числа и имеется отложенная арифметическая операция,
        // то ничего вычислять не нужно, просто выходим из функции
        display.value = MemoryCurrentNumber;
    } else {
        // Предварительно уже было введено число
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
            // Есть отложенная операция сложения - вычисляем новое значение MemoryCurrentNumber
            MemoryCurrentNumber += parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '-') {
            // Есть отложенная операция сложения - вычисляем новое значение MemoryCurrentNumber
            MemoryCurrentNumber -= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '*') {
            // Есть отложенная операция сложения - вычисляем новое значение MemoryCurrentNumber
            MemoryCurrentNumber *= parseFloat(localOperationMemory);
        } else if (MemoryPendingOperation === '/') {
            // Есть отложенная операция сложения - вычисляем новое значение MemoryCurrentNumber
            MemoryCurrentNumber /= parseFloat(localOperationMemory);
        } else {
            // Нет отложенной арифметической операции, которую нужно вычислять
            MemoryCurrentNumber = parseFloat(localOperationMemory);
        };

        // Выводим на дисплей калькулятора текущее значение
        display.value = MemoryCurrentNumber;
        // Сохраняем новую отложенную операцию
        MemoryPendingOperation = op;
    };
};

function decimal() {
    var localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }

    display.value = localDecimalMemory;
};

// Десятичная точка
function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        MemoryNewNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
    };
};

// Кнопка "Как это работает"
function howWork() {
    if (liList) {
        for (var i=0; i<operations.length; i++) {
            var newLi = document.createElement('li');
            var operationText = operations[i].value;
            newLi.innerText = operationText;
            operationsList.appendChild(newLi);
            liList = false;
        }
        liList = false;
    }
};