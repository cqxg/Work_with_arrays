План таков :

1.  Задать правила разбиения строки из инпут файла
2.  Распарсить строку из инпут файла по правилам из первого пункта
2.1 Результат - массив объектов

[
	{
		type: "canvas"
		width: "1"
		height: "1"
	}
	...
]

3.  parsingResult.map(() => {
	применять разные функции в зависимости от type
  })

4.  функции последовательно заполняют какую-то переменную с результатом рисования
5.  Сохранить эту переменную в аутпут файл
6.  Нужны тесты на каждую из функция из пункта 3
6.1 Тест состоит в передаче нужной функции нужного объекта и сравнении резутата ееё выполнения с заранее определённым аутпутом
6.2 Ещё один тест функии, которая принимает массив объектов и выдаёт нужный конечный аутпут
7   Выполнение операций по рисованию возможен только при условии наличия в массиве объектов объекта типа канвас
7.1 Нужны дополнительные проверки на выход за канвас любой из операций