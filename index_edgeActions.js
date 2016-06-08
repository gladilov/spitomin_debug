/* global function-----------*/
var questionsABC = "ABCD",
	  timeLinePointer,
    serverIp = '212.44.150.83';

var questionsHeaders = [
"Как можно получить 5 мг Спитомина для подбора индивидуальной дозы?",
"Как необходимо назначать Спитомин?",
"Какова схема приема Спитомина в начале лечения?",
"Как быстро можно наблюдать развитие терапевтического эффекта Спитомина?",
"Какая максимальная продолжительность курса лечения Спитомином?",
"Для терапии какого типа психоневрологических расстройств применяется Спитомин?",
"Какой эффект на основные психомоторные функции оказывает Спитомин?",
"Каким эффектом может сопровождаться курсовой прием Спитомина?",
"Какие рецептурные бланки используются для выписки Спитомина?",
"Какой эффект Спитомин оказывает при совместном применении с антидепрессантами группы СИОЗС?",
"Какой эффект Спитомин оказывает на побочное действие антидепрессантов группы СИОЗС при совместном применении с ними?",
"Оцените степень выраженности противотревожного действия Спитомина?",
"Есть ли ограничения на вождение транспортных средств и управление механизмами при  <i>монотерапии</i> Спитомином?",
"Есть ли ограничения на вождение транспортных средств и управление механизмами при <i>комбинированной</i> терапии со Спитомином?",
"О каких ограничениях в рационе питания при приеме Спитомина следует знать пациенту?"
];

var gratHeaders = [
"Очень хорошо!",
"Отлично!",
"Великолепно!",
"Превосходно!",
"Замечательно!",
"Супер!",
"Вы на правильном пути!", 
"Так держать!", 
"Вы настоящий профессионал!", 
"Гордимся Вами!", 
"Именно так!", 
"В яблочко!", 
"Гениально!",
"Класс!",
"Вы эксперт!"
]

var questionsABCText = [
[
"!Таблетка Спитомина 10 мг имеет риску и является делимой. 1⁄2 таблетки = 5 мг",
"Порекомендовать пациенту растолочь таблетку 10 мг в ступке и принять половину полученного порошка",
"Невозможно получить дозу 5 мг, так как в продаже имеются только таблетки Спитомина по 10 мг"],
[
"!Только курсовой прием",
"Только эпизодический прием",
"Курсовой и эпизодический прием"
],
[
"Прием определенной врачом максимальной курсовой суточной дозы в два-три приема в день с первого дня лечения",
"!Доза должна подбираться для каждого больного индивидуально. Рекомендуемая начальная суточная доза – 15 мг (5 мг утром и 10 мг вечером); ее можно повышать по 5 мг в сутки каждые два или три дня. Обычная суточная доза 20-30 мг в день"
],
[
"Через 60 минут от начала лечения",
"!Через 7-14 дней от начала лечения",
"Через 60 часов от начала лечения",

],
[
"1 месяц",
"2 месяца",
"!Максимальная продолжительность курса лечения не ограничена"
],
[
"Для лечения только тревожных расстройств",
"!Для лечения как тревожных, так и вспомогательной терапии депрессивных расстройств",
"Для лечения только депрессивных расстройств"
],
[
"Избыточная седация",
"Снижение скорости психомоторных реакций",
"!Спитомин не обладает отрицательным влиянием на психомоторные функции",
"Избыточная сонливость"
],
[
"Развитие толерантности",
"Развитие лекарственной зависимости",
"Развитие синдрома «отмены»",
"!Спитомин не обладает аддиктивным потенциалом: не вызывает толерантности, лекарственной зависимости и синдрома «отмены»"
],
[
"!Обычные рецептурные бланки 107-1/У",
"Бланки для сильнодействующих препаратов формы 148-1/У-88",
"Специальный рецептурный бланк для сильнодействующих и психотропных препаратов (розовый бланк)"
],
[
"Ослабляет антидепрессивный эффект СИОЗС",
"!Усиливает антидепрессивный эффект СИОЗС",
],
[
"!Уменьшает сексуальные расстройства, вызванные СИОЗС",
"Усиливает сексуальные расстройства, вызванные СИОЗС"
],
[
"Противотревожная активность Спитомина уступает по силе бензодиазепинам",
"!Противотревожная активность Спитомина примерно равна или превосходит активность бензодиазепинов"
],
[
"Водить автомобиль нельзя",
"!Управление транспортными средствами и механизмами возможно при полной уверенности пациента в своих психомоторных функциях"
],
[
"Водить автомобиль нельзя",
"!Способность пациента управлять транспортными средствами и механизмами следует определять индивидуально"
],
[
"Не употреблять в значительных количествах томаты и томатный сок",
"!Не употреблять в значительных количествах грейпфруты и грейпфрутовый сок",
"Не употреблять в значительных количествах любые овощи и фрукты и соки из них"
]
];

var currentQuestion = 1,
    errorQuestions = [],
    errorCorrectionMode = false,
    totalQuestions = 15;

function showHint() {
	timeLinePointer.$("Buzzer")[0].currentTime = 0;
	timeLinePointer.$("Buzzer")[0].play();
	timeLinePointer.getSymbol("Hint").stop((currentQuestion-1)*500);
	timeLinePointer.$("Hint").show();
}

function showCongratulation() {
	timeLinePointer.$("Applods")[0].currentTime = 0;
	timeLinePointer.$("Applods")[0].play();
	timeLinePointer.getSymbol("Grati").stop((currentQuestion-1)*500);
	timeLinePointer.getSymbol("Grati").$("header").html(gratHeaders[currentQuestion-1]);
	timeLinePointer.$("Grati").show();
}

function showDialog(pointer) {
	timeLinePointer.getSymbol("Dialog").stop(pointer);
	timeLinePointer.$("Dialog").show();
}

function validateAnswer(answer) {	
	if (answer == 'yes') {
		totalQuestions--;
		timeLinePointer.getSymbol("Peoples").play((15 - totalQuestions - 1)*1000+2000+1);
		showCongratulation();
	}
	else if (answer == 'no') {
    errorQuestions.push(currentQuestion);
		showHint();
	}
}

function nextQuestion() {
	timeLinePointer.$("Grati").hide();
	timeLinePointer.$("Hint").hide();
	
	if (errorCorrectionMode !== true) currentQuestion++;
	
	if (currentQuestion == 16 && errorQuestions.length > 0) {
    errorCorrectionMode = true;
    
    /* Game statistic */
    storage = $.localStorage;
    var usersTmp = storage.get('users_tmp');
    storage.set('users_tmp.stats.game_errors', errorQuestions);
	}
	
	if (totalQuestions > 0) {
    if (errorCorrectionMode === true) {
      currentQuestion = errorQuestions.shift();
      if (errorQuestions.length == 0) errorCorrectionMode = false;
    }
    
    timeLinePointer.stop(currentQuestion*500);
    nameQuestionsABC();
	}
	else endGame();
}

function endGame() {
	timeLinePointer.$("Applods")[0].currentTime = 0;
	timeLinePointer.$("Applods")[0].play();
	
	// Empty vars
	currentQuestion = 1;
	errorQuestions = [];
	errorCorrectionMode = false;
	totalQuestions = 15;
  
	// Save game result into storage
	storage = $.localStorage;
  storage.set('users_tmp.stats.game_end', $.now());
  storage.set('users_tmp.stats.game_end_tz_offset', (new Date()).getTimezoneOffset());
	var usersTmp = storage.get('users_tmp');
	
	if (storage.isSet('users')) {
		var users = storage.get('users'),
			 count = parseInt(users.count) + 1;

		storage.set('users.count', count);
		storage.set('users.items.' + count, usersTmp);
	}
	else {
		storage.set({'users':{
			'count':1,
			'items':{1:usersTmp}
		}});
	}
	
	storage.remove('users_tmp');
  
	timeLinePointer.stop("endGame");
}

function nameQuestionsABC() {
	var timelineName = timeLinePointer;

	// Set question info (заголовок вопроса, пациентов в очереди, правильных ответов)
	timelineName.$("curQuestionHead").html(questionsHeaders[currentQuestion-1]);
	timelineName.$("queueCounter").html("Пациентов в очереди <b>" + totalQuestions + "</b>");
	timelineName.$("totalGoodAnswrs").html("Отвечайте правильно, чтобы уменьшить очередь. Всего правильных ответов <b>" + (15-totalQuestions) + " из 15</b>");
	
	for (var i = 0; i < questionsABCText[currentQuestion-1].length; i++) {
		var curAnswerInList = timelineName.getSymbol("q1"+(i+1));
		var questionABCTitle = curAnswerInList.$("TitleABC");
		var questionABCText = curAnswerInList.$("QestionText");
		
		//проставка правильны ответов
		//спецфикс для 3го ответа
		timelineName.getSymbol("q_large").setVariable("title", "yes");
		
		if (questionsABCText[currentQuestion-1][i].charAt(0) == "!") {
			curAnswerInList.setVariable("title" , "yes");
			//тексты ответов
			questionABCText.html(questionsABCText[currentQuestion-1][i].substring(1));
		}
		else {
			curAnswerInList.setVariable("title" , "no");
			//тексты ответов
			questionABCText.html(questionsABCText[currentQuestion-1][i]);
		}
		//варианты АБС
		questionABCTitle.html((questionsABC.charAt(i)));
		
		//выравнивание по высоте ответа вопроса
		if (questionsABCText[currentQuestion-1][i].length < 68) {
      	questionABCText.css({"padding": "0.7em 0"});
		}
		else {
      	questionABCText.css({"padding": "0em 0"});
		}
	}
}

/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/

(function($, Edge, compId){


var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      Symbol.bindElementAction(compId, symbolName, "${Rectangle2}", "click", function(sym, e) {
         if (sym.$("check").is(":visible")) {
         	sym.$("check").hide();
         } else {
         	sym.$("RoundRect").removeClass('error');
         	sym.$("check").show();
         }
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "document", "compositionReady", function(sym, e) {
         //----------------------------!! ОНА ВИДНА В FullCode !! function nameQuestionsABC(timelineName)
         
         //AdobeEdge.Symbol.bindElementAction("EDGE-3961720", "Button_Start", "Rectangle", "click", function(sym, e) {    window.open("http://www.mysite.com", "_self"); });
         
         yepnope({
           load: ["css/style.css", "fonts/fonts.css"],
         });
         
         storage = $.localStorage;
         
         // Representative code check
         if (typeof representativeCode == "undefined") { // Type: APP
           if (storage.isSet('representativeCode') === false) {
            sym.getComposition().getStage().stop("verification");
           }
         }
         else { // Type: WEB
          if (storage.isSet('representativeCode')) {
            if (storage.get('representativeCode') != representativeCode && storage.isSet('users')) {
              storage.remove('users');
            }
            
            storage.remove('representativeCode');
          }
          
          storage.set('representativeCode', representativeCode);
         }
         
         
         Symbol.bindElementAction(compId, "Button_Verify", "Rectangle", "click", function(sym, e) {
         	if ($(".input-code").val() === '') {
         		$(".input-code").addClass('error');
         	}
         	else {
         		$(".input-code").removeClass('error');
         
         		storage = $.localStorage;
         		var representativeCode = $(".input-code").val();
         
               var xmlhttp = new XMLHttpRequest();
               var xmlhttpUrl = 'http://' + serverIp + '/api/submitall/' + representativeCode + '/';
         
               xmlhttp.open('POST', xmlhttpUrl, true);
               xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
         
               xmlhttp.onreadystatechange = function() {
                  if (this.readyState === 4) {
                    /* DEBUG */
                    if (app) {
                      navigator.notification.alert(
                          'Запрос на сервер успешно завершен (readyState = 4).',
                          null,
                          'Test request to server',
                          'Done'
                      );
                    }
                    else if (msie) {
                      alert('Запрос на сервер успешно завершен (readyState = 4).');
                    }
                    
                    if (this.status === 200) {
                      /* DEBUG */
                      if (app) {
                        navigator.notification.alert(
                            'HTTP-код ответа сервера: 200 (status = 200).',
                            null,
                            'Test request to server 2',
                            'Done'
                        );
                      }
                      else if (msie) {
                        alert('HTTP-код ответа сервера: 200 (status = 200).');
                      }
                    
                      if (this.responseText && $.trim(this.responseText)) {
                        var responseText = JSON.parse(this.responseText);
                        
                        if (responseText.success && responseText.success === true) {
                          /* DEBUG */
                          if (app) {
                            navigator.notification.alert(
                                'Ответ сервера на отправку данных: true (responseText.success = true).',
                                null,
                                'Test request to server 3',
                                'Done'
                            );
                          }
                          else if (msie) {
                            alert('Ответ сервера на отправку данных: true (responseText.success = true).');
                            console.log(responseText);
                          }
                          
                          storage.set('representativeCode', representativeCode);
                          sym.getComposition().getStage().stop("intro");
                        }
                        else {
                          /* DEBUG */
                          if (app) {
                            navigator.notification.alert(
                                'Ответ сервера на отправку данных: false (responseText.success = false).',
                                null,
                                'Test request to server 3',
                                'Done'
                            );
                            navigator.notification.alert(
                                responseText.errors,
                                null,
                                'Test request to server 4 (errors)',
                                'Done'
                            );
                          }
                          else if (msie) {
                            alert('Ответ сервера на отправку данных: false (responseText.success = false).');
                            alert(responseText.errors);
                            console.log(responseText);
                          }
                          
                          showDialog("representativeCodeError");
                        }
                      }
                      else {
                        /* DEBUG */
                        if (app) {
                          navigator.notification.alert(
                              'Сервер не прислал ответ на отправку данных (responseText = false).',
                              null,
                              'Test request to server 3 (errors)',
                              'Done'
                          );
                        }
                        else if (msie) {
                          alert('Сервер не прислал ответ на отправку данных (responseText = false).');
                        }
                        
                        showDialog("representativeCodeError");
                      }
                    }
                    else {
                      /* DEBUG */
                      if (app) {
                        navigator.notification.alert(
                            'HTTP-код ответа сервера: ' + this.status + ' (status = ' + this.status + ').',
                            null,
                            'Test request to server 2 (errors)',
                            'Done'
                        );
                      }
                      else if (msie) {
                        alert('HTTP-код ответа сервера: ' + this.status + ' (status = ' + this.status + ').');
                      }
                      
                      showDialog("representativeCodeError");
                    }
                  }
               }
         
         		xmlhttp.send(JSON.stringify({}));
         	}
         
         });
         
         Symbol.bindElementAction(compId, "Button_Start", "Rectangle", "click", function(sym, e) {
         	// Goto question №1
         	sym.getComposition().getStage().stop("q1");
         });
         
         Symbol.bindElementAction(compId, "Button_Question_Start", "Rectangle", "click", function(sym, e) {
         	// Validation of the registration form
         	var error = false;
         
         	$(".input-reg").each(function(i, e){
         		if ($(this).val() === '') $(this).addClass('error');
         		else $(this).removeClass('error');
         	});
         
         	if ($(".input-reg.error").length > 0 
         		|| sym.getComposition().getStage().$("check").is(':hidden')
         	) { error = true; }
         	else { error = false; }
         
         	if (sym.getComposition().getStage().$("check").is(':hidden')) {
         		sym.getComposition().getStage().$("RoundRect").addClass('error');
         	}
         
         	if (error === false) {
         		// Save new user into storage
         		var new_user = {
         			'last_name':$('#user_last_name').val(),
         			'name':$('#user_name').val(),
         			'sername':$('#user_second_name').val(),
         			'lpu_name':$('#lpu_name').val(),
         			'lpu_num':$('#lpu_number').val(),
         			'city':$('#user_city').val(),
         			'stats': {
                        'game_start': $.now(),
                        'game_start_tz_offset': (new Date()).getTimezoneOffset()
                    },
         		};
         
         		storage = $.localStorage;
         		if (storage.isSet('users_tmp')) storage.remove('users_tmp');
         		storage.set('users_tmp', new_user);
         
         		// Goto question №1
         		sym.getComposition().getStage().stop("q1");
         	}
         });
         
         Symbol.bindElementAction(compId, "Button_Stop", "Rectangle", "click", function(sym, e) {
         	$(".input-reg").val('');
         
         	sym.getComposition().getStage().stop("intro");
         });
         
         Symbol.bindElementAction(compId, "Button_Intro_Start", "Rectangle", "click", function(sym, e) {
         	sym.getComposition().getStage().stop("register");
         });
         
         Symbol.bindElementAction(compId, "Button_Intro_Result", "Rectangle", "click", function(sym, e) {
            /* DEBUG */
            if (app) {
              navigator.notification.alert(
                  'Connection: ' + navigator.connection.type,
                  null,
                  'Test connection',
                  'Done'
              );
            }
           
         	storage = $.localStorage;
         	sym.getComposition().getStage().getSymbol("Table_Result").$("Table_Result_Items").empty();
         	sym.getComposition().getStage().getSymbol("Table_Result").$("Table_Result_Items").css({'padding':'10px', 'box-sizing':'border-box', '-webkit-box-sizing':'border-box', '-moz-box-sizing':'border-box'});
         	var tableItems = $('<table />').attr({'cellpadding':0, 'cellspacing':0, 'width':'100%', 'id':'table-result-items'});
         
         	// Если в таблице есть данные
         	if (storage.isSet('users')) {
            var users = storage.get('users');
         
            sym.getComposition().getStage().getSymbol("Button_Result_Submit").stop('normal');
         
         		$.each(users.items, function(i, item) {
         			var tableItemsTr = $('<tr />'),
         				 fio = item.last_name + ' ' + item.name + ' ' + item.sername,
         				 lpu = item.lpu_name + ' №' + item.lpu_num,
         				 city = item.city,
         				 //mail = '{{ mail }}', // old field
         				 //phone = '{{ phone }}', // old field
         				 tableItemsTdNum = $('<td />').addClass('num').html(i).appendTo(tableItemsTr),
         				 tableItemsTdFio = $('<td />').addClass('fio').html(fio).appendTo(tableItemsTr),
         				 tableItemsTdLpu = $('<td />').addClass('lpu').html(lpu).appendTo(tableItemsTr),
         				 tableItemsTdCity = $('<td />').addClass('city').html(city).appendTo(tableItemsTr);
         				 //tableItemsTdMail = $('<td />').addClass('mail').html(mail).appendTo(tableItemsTr),
         				 //tableItemsTdPhone = $('<td />').addClass('phone').html(phone).appendTo(tableItemsTr);
         
         			tableItemsTr.appendTo(tableItems);
         		});
         
         		sym.getComposition().getStage().getSymbol("Table_Result").$("Table_Result_Items").append(tableItems);
         	}
         	// Иначе: нет данных в таблице
         	else {
         		sym.getComposition().getStage().getSymbol("Button_Result_Submit").stop('disable');
         
         		// Add empty field to Table Result
         		var tableItemsTr = $('<tr />'),
         			 tableItemsTdEmpty = $('<td />').addClass('empty').html('Нет данных для отображения').appendTo(tableItemsTr);
         
         		tableItemsTr.appendTo(tableItems);
         		sym.getComposition().getStage().getSymbol("Table_Result").$("Table_Result_Items").append(tableItems);
         	}
         
         	sym.getComposition().getStage().stop("result");
         });
         
         Symbol.bindElementAction(compId, "Button_Result_Prev", "Rectangle", "click", function(sym, e) {
         	sym.getComposition().getStage().stop("intro");
         });
         
         Symbol.bindElementAction(compId, "Button_Result_Submit", "Rectangle", "click", function(sym, e) {
         	// Если в таблице есть данные
         	if (storage.isSet('users')) {
            
            /* DEBUG */
            if (app) {
              navigator.notification.alert(
                  'Connection: ' + navigator.connection.type,
                  null,
                  'Test connection',
                  'Done'
              );
            }
            

         		var users = storage.get('users'),
         			 representativeCode = storage.get('representativeCode'),
         			 xmlhttp = new XMLHttpRequest(),
         			 xmlhttpUrl = 'http://' + serverIp + '/api/submitall/' + representativeCode + '/';
         
               xmlhttp.open('POST', xmlhttpUrl);
               xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
         
               xmlhttp.onreadystatechange = function() {
                  if (this.readyState === 4) {
                    /* DEBUG */
                    if (app) {
                      navigator.notification.alert(
                          'Запрос на сервер успешно завершен (readyState = 4).',
                          null,
                          'Test request to server',
                          'Done'
                      );
                    }
                    else if (msie) {
                      alert('Запрос на сервер успешно завершен (readyState = 4).');
                    }
                    
                    
                     if (this.status === 200) {
                      /* DEBUG */
                      if (app) {
                        navigator.notification.alert(
                            'HTTP-код ответа сервера: 200 (status = 200).',
                            null,
                            'Test request to server 2',
                            'Done'
                        );
                      }
                      else if (msie) {
                        alert('HTTP-код ответа сервера: 200 (status = 200).');
                      }
                      
                      if (this.responseText && $.trim(this.responseText)) {
                        var responseText = JSON.parse(this.responseText);
             
                        if (responseText.success && responseText.success === true) {
                          /* DEBUG */
                          if (app) {
                            navigator.notification.alert(
                                'Ответ сервера на отправку данных: true (responseText.success = true). Данные приняты сервером и записаны в базу данных.',
                                null,
                                'Test request to server 3',
                                'Done'
                            );
                          }
                          else if (msie) {
                            alert('Ответ сервера на отправку данных: true (responseText.success = true). Данные приняты сервером и записаны в базу данных.');
                            console.log(responseText);
                          }
                              
                          showDialog("tableResultSubmitSuccessful");
                          sym.getComposition().getStage().getSymbol("Button_Result_Submit").stop('disable');
                          sym.getComposition().getStage().getSymbol("Table_Result").$("Table_Result_Items").empty();
                          // Add empty field to Table Result
                          var tableItems = $('<table />').attr({'cellpadding':0, 'cellspacing':0, 'width':'100%', 'id':'table-result-items'}),
                             tableItemsTr = $('<tr />'),
                             tableItemsTdEmpty = $('<td />').addClass('empty').html('Нет данных для отображения').appendTo(tableItemsTr);
             
                          tableItemsTr.appendTo(tableItems);
                          sym.getComposition().getStage().getSymbol("Table_Result").$("Table_Result_Items").css({'padding':'10px', 'box-sizing':'border-box', '-webkit-box-sizing':'border-box', '-moz-box-sizing':'border-box'});
                          sym.getComposition().getStage().getSymbol("Table_Result").$("Table_Result_Items").append(tableItems);
             
                          //storage.remove('users');
                        }
                        else {
                          /* DEBUG */
                          if (app) {
                            navigator.notification.alert(
                                'Ответ сервера на отправку данных: false (responseText.success = false).',
                                null,
                                'Test request to server 3',
                                'Done'
                            );
                            navigator.notification.alert(
                                responseText.errors,
                                null,
                                'Test request to server 4 (errors)',
                                'Done'
                            );
                          }
                          else if (msie) {
                            alert('Ответ сервера на отправку данных: false (responseText.success = false).');
                            alert(responseText.errors);
                            console.log(responseText);
                          }
                          
                          showDialog("tableResultSubmitFailure");
                        }
                      }
                      else {
                        /* DEBUG */
                        if (app) {
                          navigator.notification.alert(
                              'Сервер не прислал ответ на отправку данных (responseText = false).',
                              null,
                              'Test request to server 3 (errors)',
                              'Done'
                          );
                        }
                        else if (msie) {
                          alert('Сервер не прислал ответ на отправку данных (responseText = false).');
                        }
                        
                        showDialog("tableResultSubmitFailure");
                      }
                     }
                     else {
                        /* DEBUG */
                        if (app) {
                          navigator.notification.alert(
                              'HTTP-код ответа сервера: ' + this.status + ' (status = ' + this.status + ').',
                              null,
                              'Test request to server 2 (errors)',
                              'Done'
                          );
                        }
                        else if (msie) {
                          alert('HTTP-код ответа сервера: ' + this.status + ' (status = ' + this.status + ').');
                        }
                       
                       showDialog("tableResultSubmitFailure");
                     }
                  }
               }
         
               xmlhttp.send(JSON.stringify(users));
            }
         });
         
         var user_last_name = sym.$("last_name");
         user_last_name.html("Фамилия*</br>");
         inputText = $('<input />').attr({'type':'text', 'value':'', 'class':'input-reg', 'id':'user_last_name'});
         inputText .css ('font-family', 'open-sans-condensed, sans-serif');
         inputText .css ('font-size', 21);
         inputText .css ('color', '#005098');
         inputText .css ('width', 180);
         inputText .css ('padding',6);
         inputText .css('border' , '2px solid #e2e2e2');
         inputText .css('box-shadow', 'inset 1px 1px 4px 0 #878787');
         inputText .css('-moz-border-radius', 6); /* Firefox */
         inputText .css('-webkit-border-radius', 6); /* Safari, Chrome */
         inputText .css('-khtml-border-radius', 6); /* KHTML */
         inputText .css('border-radius', 6); /* CSS3 */
         inputText .appendTo(user_last_name);
         
         var user_name = sym.$("user_name");
         user_name.html("Имя*</br>");
         inputText = $('<input />').attr({'type':'text', 'value':'', 'class':'input-reg', 'id':'user_name'});
         inputText .css ('font-family', 'open-sans-condensed, sans-serif');
         inputText .css ('font-size', 21);
         inputText .css ('color', '#005098');
         inputText .css ('width', 180);
         inputText .css ('padding',6);
         inputText .css('border' , '2px solid #e2e2e2');
         inputText .css('box-shadow', 'inset 1px 1px 4px 0 #878787');
         inputText .css('-moz-border-radius', 6); /* Firefox */
         inputText .css('-webkit-border-radius', 6); /* Safari, Chrome */
         inputText .css('-khtml-border-radius', 6); /* KHTML */
         inputText .css('border-radius', 6); /* CSS3 */
         inputText .appendTo(user_name);
         
         
         var user_second_name = sym.$("sername");
         user_second_name.html("Отчество*</br>");
         inputText = $('<input />').attr({'type':'text', 'value':'', 'class':'input-reg', 'id':'user_second_name'});
         inputText .css ('font-family', 'open-sans-condensed, sans-serif');
         inputText .css ('font-size', 21);
         inputText .css ('color', '#005098');
         inputText .css ('width', 180);
         inputText .css ('padding',6);
         inputText .css('border' , '2px solid #e2e2e2');
         inputText .css('box-shadow', 'inset 1px 1px 4px 0 #878787');
         inputText .css('-moz-border-radius', 6); /* Firefox */
         inputText .css('-webkit-border-radius', 6); /* Safari, Chrome */
         inputText .css('-khtml-border-radius', 6); /* KHTML */
         inputText .css('border-radius', 6); /* CSS3 */
         inputText .appendTo(user_second_name);
         
         
         var lpu_name = sym.$("lpu_name");
         lpu_name.html("Название ЛПУ*</br>");
         inputText = $('<input />').attr({'type':'text', 'value':'', 'class':'input-reg', 'id':'lpu_name'});
         inputText .css ('font-family', 'open-sans-condensed, sans-serif');
         inputText .css ('font-size', 21);
         inputText .css ('color', '#005098');
         inputText .css ('width', 180);
         inputText .css ('padding',6);
         inputText .css('border' , '2px solid #e2e2e2');
         inputText .css('box-shadow', 'inset 1px 1px 4px 0 #878787');
         inputText .css('-moz-border-radius', 6); /* Firefox */
         inputText .css('-webkit-border-radius', 6); /* Safari, Chrome */
         inputText .css('-khtml-border-radius', 6); /* KHTML */
         inputText .css('border-radius', 6); /* CSS3 */
         inputText .appendTo(lpu_name);
         
         
         var lpu_number = sym.$("lpu_number");
         lpu_number.html("Номер ЛПУ*</br>");
         inputText = $('<input />').attr({'type':'tel', 'value':'', 'class':'input-reg', 'id':'lpu_number'});
         inputText .css ('font-family', 'open-sans-condensed, sans-serif');
         inputText .css ('font-size', 21);
         inputText .css ('color', '#005098');
         inputText .css ('width', 80);
         inputText .css ('padding',6);
         inputText .css('border' , '2px solid #e2e2e2');
         inputText .css('box-shadow', 'inset 1px 1px 4px 0 #878787');
         inputText .css('-moz-border-radius', 6); /* Firefox */
         inputText .css('-webkit-border-radius', 6); /* Safari, Chrome */
         inputText .css('-khtml-border-radius', 6); /* KHTML */
         inputText .css('border-radius', 6); /* CSS3 */
         inputText .appendTo(lpu_number);
         
         
         
         var user_city = sym.$("user_city");
         user_city.html("Город / нас. пункт*</br>");
         inputText = $('<input />').attr({'type':'text', 'value':'', 'class':'input-reg', 'id':'user_city'});
         inputText .css ('font-family', 'open-sans-condensed, sans-serif');
         inputText .css ('font-size', 21);
         inputText .css ('color', '#005098');
         inputText .css ('width', 380);
         inputText .css ('padding',6);
         inputText .css('border' , '2px solid #e2e2e2');
         inputText .css('box-shadow', 'inset 1px 1px 4px 0 #878787');
         inputText .css('-moz-border-radius', 6); /* Firefox */
         inputText .css('-webkit-border-radius', 6); /* Safari, Chrome */
         inputText .css('-khtml-border-radius', 6); /* KHTML */
         inputText .css('border-radius', 6); /* CSS3 */
         inputText .appendTo(user_city);
         
         
         var verify_code = sym.$("verify_text");
         //sym.getComposition().getStage().$("verify_text");
         inputCode = $('<input />').attr({'type':'text', 'value':'', 'placeholder':'Введите код', 'class':'input-code', 'id':'verify_code'});
         inputCode .css ('font-family', 'open-sans-condensed, sans-serif');
         inputCode .css ('font-size', 21);
         inputCode .css ('text-align', 'center');
         inputCode .css ('color', '#005098');
         inputCode .css ('width', '200px');
         inputCode .css ('margin', '20px auto 0');
         inputCode .css ('padding','6px');
         inputCode .css('border' , '2px solid #e2e2e2');
         inputCode .css('box-shadow', 'inset 1px 1px 4px 0 #878787');
         inputCode .css('-moz-border-radius', 6); /* Firefox */
         inputCode .css('-webkit-border-radius', 6); /* Safari, Chrome */
         inputCode .css('-khtml-border-radius', 6); /* KHTML */
         inputCode .css('border-radius', 6); /* CSS3 */
         inputCode .appendTo(verify_code);
         
         
         sym.$("Law_Text").html("Подтверждаю, что я являюсь медицинским или фармацевтическим работником и даю добровольное согласие на сбор моих персональных данных,  в соответствии с требованием <span><a href='http://www.consultant.ru/popular/o-personalnyh-dannyh/250_2.html#p93' class='law-article-link' target='_blank'>п.1 ст. 6 Федерального закона от 27 июля 2006 г. № 152-ФЗ</a></span>");
         
         $('.law-article-link').on('click', function(e){
         	e.preventDefault();
         	showDialog('lawArticle');
         });
         
         $('.input-reg').on('change keyup', function(e) {
         	if ($(this).val() === '') $(this).addClass('error');
         	else $(this).removeClass('error');
         });
         
         $('.input-code').on('change keyup', function(e) {
         	if ($(this).val() === '') $(this).addClass('error');
         	else $(this).removeClass('error');
         });
         
         //$(document).on("online", function(){ alert("You're online / on") });
         //$(document).on("offline", function(){ alert("You're offline / on") });
         //document.addEventListener("online", function(){ alert("You're online") }, false);
         //document.addEventListener("offline", function(){ alert("You're offline") }, false);

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 250, function(sym, e) {
         timeLinePointer = sym;
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 500, function(sym, e) {
         nameQuestionsABC();

      });
      //Edge binding end

      

      

      

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         timeLinePointer = sym;
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 10000, function(sym, e) {
         timeLinePointer = sym;
         sym.stop();

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'anim_for_button_symbol_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 5958, function(sym, e) {
         // insert code here
         // Play the timeline at a label or specific time. For example:
         // sym.play(500); or sym.play("myLabel");
         sym.play(0);

      });
      //Edge binding end

   })("anim_for_button_symbol_1");
   //Edge symbol end:'anim_for_button_symbol_1'

   //=========================================================
   
   //Edge symbol: 'Button_Start'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop(0);
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mousedown", function(sym, e) {
         // insert code to be run when the mouse button is down
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("down");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseup", function(sym, e) {
         // insert code to be run when the mouse button is released
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
      //Edge binding end

   })("Button_Start");
   //Edge symbol end:'Button_Start'

   //=========================================================
   
   //Edge symbol: 'Button_Start_2'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
         //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
         //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop(0);
         

      });
         //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mousedown", function(sym, e) {
         // insert code to be run when the mouse button is down
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("down");
         

      });
         //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseup", function(sym, e) {
         // insert code to be run when the mouse button is released
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
         //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "click", function(sym, e) {
         // insert code for mouse click here
         nextQuestion();

      });
      //Edge binding end

      })("Button_Continue");
   //Edge symbol end:'Button_Continue'

   //=========================================================
   
   //Edge symbol: 'Symbol_3'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${Rectangle3}", "click", function(sym, e) {
         validateAnswer(sym.getVariable("title"));

      });
      //Edge binding end

      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
      });
      //Edge binding end

      

      })("Answer_Template_Small");
   //Edge symbol end:'Answer_Template_Small'

   //=========================================================
   
   //Edge symbol: 'Button_Start_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
            //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
            //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop(0);
         

      });
            //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mousedown", function(sym, e) {
         // insert code to be run when the mouse button is down
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("down");
         

      });
            //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseup", function(sym, e) {
         // insert code to be run when the mouse button is released
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
            //Edge binding end

         })("Button_Start_1");
   //Edge symbol end:'Button_Start_1'

   //=========================================================
   
   //Edge symbol: 'Hint1'
   (function(symbolName) {   
   
   })("Hint1_1");
   //Edge symbol end:'Hint1_1'

   //=========================================================
   
   //Edge symbol: 'anim_hint_symbol_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 5750, function(sym, e) {
         
         // Play the timeline at a label or specific time. For example:
         // sym.play(500); or sym.play("myLabel");
         sym.play(0);
         

      });
      //Edge binding end

   })("anim_hint_symbol_1");
   //Edge symbol end:'anim_hint_symbol_1'

   //=========================================================
   
   //Edge symbol: 'Answer_Template_Small_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
      });
         //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle3}", "click", function(sym, e) {
         
         validateAnswer(sym.getVariable("title"));

      });
         //Edge binding end

         })("Answer_Template_Large");
   //Edge symbol end:'Answer_Template_Large'

   //=========================================================
   
   //Edge symbol: 'Hint1_1'
   (function(symbolName) {   
   
      })("Hint1_2");
   //Edge symbol end:'Hint1_2'

   //=========================================================
   
   //Edge symbol: 'Hint1_2'
   (function(symbolName) {   
   
      })("Hint1_3");
   //Edge symbol end:'Hint1_3'

   //=========================================================
   
   //Edge symbol: 'Hint1_3'
   (function(symbolName) {   
   
      })("Hint1_4");
   //Edge symbol end:'Hint1_4'

   //=========================================================
   
   //Edge symbol: 'Hint1_5'
   (function(symbolName) {   
   
      })("Hint1_5");
   //Edge symbol end:'Hint1_5'

   //=========================================================
   
   //Edge symbol: 'Hint1_6'
   (function(symbolName) {   
   
      })("Hint1_6");
   //Edge symbol end:'Hint1_6'

   //=========================================================
   
   //Edge symbol: 'Hint1_7'
   (function(symbolName) {   
   
      })("Hint1_7");
   //Edge symbol end:'Hint1_7'

   //=========================================================
   
   //Edge symbol: 'Hint1_8'
   (function(symbolName) {   
   
      })("Hint1_8");
   //Edge symbol end:'Hint1_8'

   //=========================================================
   
   //Edge symbol: 'Hint1_9'
   (function(symbolName) {   
   
      })("Hint1_9");
   //Edge symbol end:'Hint1_9'

   //=========================================================
   
   //Edge symbol: 'Hint1_10'
   (function(symbolName) {   
   
      })("Hint1_10");
   //Edge symbol end:'Hint1_10'

   //=========================================================
   
   //Edge symbol: 'Hint1_11'
   (function(symbolName) {   
   
      })("Hint1_11");
   //Edge symbol end:'Hint1_11'

   //=========================================================
   
   //Edge symbol: 'Hint1_12'
   (function(symbolName) {   
   
      })("Hint1_12");
   //Edge symbol end:'Hint1_12'

   //=========================================================
   
   //Edge symbol: 'Hint1_13'
   (function(symbolName) {   
   
      })("Hint1_13");
   //Edge symbol end:'Hint1_13'

   //=========================================================
   
   //Edge symbol: 'Hint1_14'
   (function(symbolName) {   
   
      })("Hint1_14");
   //Edge symbol end:'Hint1_14'

   //=========================================================
   
   //Edge symbol: 'Hint1_15'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         //console.log(sym.$("Text4"))
         sym.$("Text4").html("Инструкция по медицинскому применению не запрещает употреблять любые овощи и фрукты, а также соки из них при приеме Спитомина, но ограничивает употребление в <i>значительных</i> количествах грейпфрутов и грейпфрутового сока.")

      });
      //Edge binding end

      })("Hint1_15");
   //Edge symbol end:'Hint1_15'

   //=========================================================
   
   //Edge symbol: 'Hint'
   (function(symbolName) {   
   
   })("Hint");
   //Edge symbol end:'Hint'

   //=========================================================
   
   //Edge symbol: 'Hint1_16'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 7000, function(sym, e) {
         sym.$("Text15").html("Инструкция по медицинскому применению не запрещает употреблять любые овощи и фрукты, а также соки из них при приеме Спитомина, но ограничивает употребление в <i>значительных</i> количествах грейпфрутов и грейпфрутового сока.")

      });
      //Edge binding end

      })("Grati");
   //Edge symbol end:'Grati'

   //=========================================================
   
   //Edge symbol: 'anim_congratulation_symbol_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3000, function(sym, e) {
         sym.play(0);

      });
      //Edge binding end

   })("anim_congratulation_symbol_1");
   //Edge symbol end:'anim_congratulation_symbol_1'

   //=========================================================
   
   //Edge symbol: 'pepl1_symbol_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2666, function(sym, e) {
         // insert code here
         // Play the timeline at a label or specific time. For example:
         // sym.play(500); or sym.play("myLabel");
         sym.play(0);

      });
      //Edge binding end

   })("pepl1_symbol_1");
   //Edge symbol end:'pepl1_symbol_1'

   //=========================================================
   
   //Edge symbol: 'pepl2_symbol_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1466, function(sym, e) {
         sym.play(0);

      });
      //Edge binding end

   })("pepl2_symbol_1");
   //Edge symbol end:'pepl2_symbol_1'

   //=========================================================
   
   //Edge symbol: 'pepl3_symbol_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1800, function(sym, e) {
         sym.play(0);

      });
      //Edge binding end

   })("pepl3_symbol_1");
   //Edge symbol end:'pepl3_symbol_1'

   //=========================================================
   
   //Edge symbol: 'pepl4_symbol_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2966, function(sym, e) {
         sym.play(0);

      });
      //Edge binding end

   })("pepl4_symbol_1");
   //Edge symbol end:'pepl4_symbol_1'

   //=========================================================
   
   //Edge symbol: 'pepl5_symbol_1'
   (function(symbolName) {   
   
   })("pepl5_symbol_1");
   //Edge symbol end:'pepl5_symbol_1'

   //=========================================================
   
   //Edge symbol: 'pepl6_symbol_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1933, function(sym, e) {
         sym.play(0);

      });
      //Edge binding end

   })("pepl6_symbol_1");
   //Edge symbol end:'pepl6_symbol_1'

   //=========================================================
   
   //Edge symbol: 'pepl7_symbol_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1600, function(sym, e) {
         sym.play(0);

      });
      //Edge binding end

   })("pepl7_symbol_1");
   //Edge symbol end:'pepl7_symbol_1'

   //=========================================================
   
   //Edge symbol: 'pepl8_symbol_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2466, function(sym, e) {
         sym.play(0);

      });
      //Edge binding end

   })("pepl8_symbol_1");
   //Edge symbol end:'pepl8_symbol_1'

   //=========================================================
   
   //Edge symbol: 'pepl9_symbol_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1466, function(sym, e) {
         sym.play(0);

      });
      //Edge binding end

   })("pepl9_symbol_1");
   //Edge symbol end:'pepl9_symbol_1'

   //=========================================================
   
   //Edge symbol: 'Peoples'
   (function(symbolName) {   
      
      
      
      
      
      

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 5000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 6000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 7000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 8000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 9000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 10000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 11000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 12000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 13000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 14000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 15000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 16000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 17000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 4000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

   })("Peoples");
   //Edge symbol end:'Peoples'

   //=========================================================
   
   //Edge symbol: 'Symbol_1'
   (function(symbolName) {   
   
   })("Symbol_1");
   //Edge symbol end:'Symbol_1'

   //=========================================================
   
   //Edge symbol: 'Button_Start_2'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
               //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
               //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop(0);
         

      });
               //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mousedown", function(sym, e) {
         // insert code to be run when the mouse button is down
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("down");
         

      });
               //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseup", function(sym, e) {
         // insert code to be run when the mouse button is released
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
               //Edge binding end

            })("Button_Stop");
   //Edge symbol end:'Button_Stop'

   //=========================================================
   
   //Edge symbol: 'Table_Result'
   (function(symbolName) {   
   
   })("Table_Result");
   //Edge symbol end:'Table_Result'

   //=========================================================
   
   //Edge symbol: 'Button_Result_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
               //Edge binding end

      

      

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mousedown", function(sym, e) {
         sym.stop("down");
         

      });
               //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseup", function(sym, e) {
         sym.stop("normal");
         

      });
               //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3000, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

            })("Button_Result_Submit_old");
   //Edge symbol end:'Button_Result_Submit_old'

   //=========================================================
   
   //Edge symbol: 'Button_Result_Submit_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
               //Edge binding end

      

      

      

      

            })("Button_Result_Prev");
   //Edge symbol end:'Button_Result_Prev'

   //=========================================================
   
   //Edge symbol: 'Button_Result_Submit_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
                  //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
                  //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop(0);
         

      });
                  //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mousedown", function(sym, e) {
         // insert code to be run when the mouse button is down
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("down");
         

      });
                  //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseup", function(sym, e) {
         // insert code to be run when the mouse button is released
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
                  //Edge binding end

               })("Button_Intro_Result");
   //Edge symbol end:'Button_Intro_Result'

   //=========================================================
   
   //Edge symbol: 'Button_Result_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
                  //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
                  //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop(0);
         

      });
                  //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mousedown", function(sym, e) {
         // insert code to be run when the mouse button is down
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("down");
         

      });
                  //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseup", function(sym, e) {
         // insert code to be run when the mouse button is released
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
                  //Edge binding end

               })("Button_Intro_Start");
   //Edge symbol end:'Button_Intro_Start'

   //=========================================================
   
   //Edge symbol: 'Grati_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 2000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

         })("Dialog");
   //Edge symbol end:'Dialog'

   //=========================================================
   
   //Edge symbol: 'Button_Continue_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
            //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseover", function(sym, e) {
         // insert code to be run when the mouse hovers over the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
            //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseout", function(sym, e) {
         // insert code to be run when the mouse is moved off the object
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop(0);
         

      });
            //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mousedown", function(sym, e) {
         // insert code to be run when the mouse button is down
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("down");
         

      });
            //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseup", function(sym, e) {
         // insert code to be run when the mouse button is released
         // Go to a label or specific time and stop. For example:
         // sym.stop(500); or sym.stop("myLabel");
         sym.stop("over");
         

      });
            //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "click", function(sym, e) {
         // insert code for mouse click here
         timeLinePointer.$("Dialog").hide();

      });
         //Edge binding end

         })("Button_Dialog_Ok");
   //Edge symbol end:'Button_Dialog_Ok'

   //=========================================================
   
   //Edge symbol: 'Table_Result_1'
   (function(symbolName) {   
   
      })("Table_Result_old");
   //Edge symbol end:'Table_Result_old'

   //=========================================================
   
   //Edge symbol: 'Button_Intro_Start_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
                     //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mousedown", function(sym, e) {
         sym.stop('down');

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseup", function(sym, e) {
         sym.stop('normal');

      });
      //Edge binding end

                  })("Button_Question_Start");
   //Edge symbol end:'Button_Question_Start'

   //=========================================================
   
   //Edge symbol: 'Button_Result_Submit_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
                  //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 3000, function(sym, e) {
         // insert code here
         sym.stop();

      });
         //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mousedown", function(sym, e) {
         sym.stop("down");
         

      });
                  //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "mouseup", function(sym, e) {
         sym.stop("normal");
         

      });
                  //Edge binding end

               })("Button_Result_Submit_1");
   //Edge symbol end:'Button_Result_Submit_1'

   //=========================================================
   
   //Edge symbol: 'Button_Question_Start_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
                     //Edge binding end

      

      

                  })("Button_Result_Submit");
   //Edge symbol end:'Button_Result_Submit'

   //=========================================================
   
   //Edge symbol: 'Button_Result_Prev_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 0, function(sym, e) {
         // insert code here
         sym.stop();
         

      });
                  //Edge binding end

               })("Button_Verify");
   //Edge symbol end:'Button_Verify'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-3961720");