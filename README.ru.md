Плагин **Timetracker** представляет собой счетчик времени, который встраивается в веб-сайты. Он может использоваться в качестве таймера, трекера, а также для обратного отсчета и в любых других ситуациях, когда требуется контролировать затраченное время (например, при проведении онлайн-тестирования). 
Плагин **Timetracker** можно адаптировать под любой веб-ресурс, оформив счетчик времени в стиле самого сайта.

Инициализация счетчика выполняется командой:
```sh
$('.timetracker').timetracker();
```

# Формат Timetracker
По умолчанию интервал ставится в 1 секунду, формат отображения - в минутах и секундах. Отсчет времени будет отображаться в указанном элементе.
Установить формат времени при инициализации необходимо в поле “format”:
```sh
$('.timetracker').timetracker({'format': 'i:s'});
```

# Управление плагином
Чтобы указать, когда требуется остановить отсчет времени, нужно использовать настройку timestop, время - в секундах:
```sh
$('.timetracker').timetracker({'timestop': 15})
```
С помощью параметра countdown можно определить направление отсчета, а параметр timestop в секундах укажет, когда следует остановить отсчет, или с какого момента его начать.
```sh
$('.timetracker').timetracker({'countdown': true, 'timestop': 60});
```
Для руководства трекером существует ряд событий, которые позволяют начать или остановить отчет, а также вернуться к первоначальному состоянию.
```sh
$('.timetracker').timetracker('start');
$('.timetracker').timetracker('stop');
$('.timetracker').timetracker('reset');
```

Для обработки остановки счетчика можно назначить свой обработчик:
```sh
$('.timetracker').timetracker({
   'timestop': 5,
   'format': 'i:s',
   'stop': function() {
       alert('The timer stopped');
   }
});
```

# Пример работы плагина
Пример работы трекера:
```sh
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>Title</title>
   <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>
   <script src="../app/js/time-tracker.js"></script>
</head>
<body>
   <span class='timetracker'></span>
   <button onClick="javascript:$('.timetracker').timetracker('start');">start</button>
   <button onClick="javascript:$('.timetracker').timetracker('stop');">stop</button>
   <button onClick="javascript:$('.timetracker').timetracker('reset');">reset</button>
   <script>
       $('.timetracker').timetracker({'timestop': 15, 'format': 'i:s', 'countdown': true});
   </script>
</body>
</html>
```
