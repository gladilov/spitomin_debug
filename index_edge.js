/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
            //'open-sans-condensed, sans-serif': '<script src=\"http://use.edgefonts.net/open-sans-condensed:n7,n3,i3:all.js\"></script>'
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
            js+"jquery-2.0.3.min.js",
            js+"jquery.storageapi.min.js"
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "horizontal",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'Back_2',
                            type: 'rect',
                            rect: ['0px', '0px', '1024px', '768px', 'auto', 'auto'],
                            fill: ["rgba(255,255,255,1.00)"],
                            stroke: [0,"rgb(255, 255, 255)","solid"]
                        },
                        {
                            id: 'Back',
                            type: 'image',
                            rect: ['0px', '118px', '1024px', '650px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"Back.png",'0px','0px'],
                            filter: [0, 0, 1, 1, 0, 0, 0, 0, "rgba(0,0,0,0)", 0, 0, 0]
                        },
                        {
                            id: 'Med_material',
                            display: 'none',
                            type: 'image',
                            rect: ['741px', '328px', '222px', '222px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"Med_material.png",'0px','0px']
                        },
                        {
                            id: 'Pack2',
                            display: 'none',
                            type: 'image',
                            rect: ['662px', '127px', '326px', '225px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"Pack.png",'0px','0px']
                        },
                        {
                            id: 'Text',
                            display: 'none',
                            type: 'text',
                            rect: ['43px', '183px', 'auto', 'auto', 'auto', 'auto'],
                            text: "«Я знаю все про СПИТОМИН!»",
                            align: "center",
                            font: ['open-sans-condensed, sans-serif', [48, "px"], "rgba(0,80,152,1.00)", "700", "none", "", "break-word", "nowrap"],
                            textStyle: ["0px", "", "", "", ""]
                        },
                        {
                            id: 'TextCopy',
                            display: 'none',
                            type: 'text',
                            rect: ['24px', '150px', '636px', '54px', 'auto', 'auto'],
                            text: "Добро пожаловать в интерактивную презентацию",
                            align: "center",
                            font: ['open-sans-condensed, sans-serif', [34, "px"], "rgba(0,80,152,1.00)", "400", "none", "", "break-word", ""],
                            textStyle: ["0px", "", "", "", ""]
                        },
                        {
                            id: 'Law_Text',
                            display: 'none',
                            type: 'text',
                            rect: ['49px', '640px', '494px', '65px', 'auto', 'auto'],
                            text: "<p style=\"margin:0px\">​Подтверждаю, что я являюсь медицинским или фармацевтическим работником и даю добровольное согласие на сбор моих персональных данных, в соответствии с требованием п.1 ст. 6 Федерального закона от 27 июля 2006 г. № 152-ФЗ</p><p style=\"margin: 0px;\">​</p>",
                            align: "justify",
                            font: ['open-sans-condensed, sans-serif', [14, "px"], "rgba(0,80,152,1.00)", "700", "none", "", "break-word", ""],
                            textStyle: ["0px", "", "", "", ""]
                        },
                        {
                            id: 'TextCopy3',
                            display: 'none',
                            type: 'text',
                            rect: ['49px', '715px', 'auto', 'auto', 'auto', 'auto'],
                            text: "*Обязательные для заполнения поля",
                            font: ['open-sans-condensed, sans-serif', [16, "px"], "rgba(170,170,170,1.00)", "600", "none", "", "break-word", "nowrap"],
                            textStyle: ["0px", "", "", "", ""]
                        },
                        {
                            id: 'RoundRect',
                            display: 'none',
                            type: 'rect',
                            rect: ['570px', '654px', '31px', '31px', 'auto', 'auto'],
                            borderRadius: ["10px", "10px", "10px", "10px"],
                            fill: ["rgba(255,255,255,1)"],
                            stroke: [3,"rgba(226,226,226,1.00)","solid"],
                            boxShadow: ["inset", 1, 1, 3, 1, "rgba(0,0,0,0.31)"],
                            filter: [0, 0, 1, 1, 0, 0, 0, 0, "rgba(0,0,0,0)", 0, 0, 0]
                        },
                        {
                            id: 'check',
                            display: 'none',
                            type: 'image',
                            rect: ['571px', '650px', '40px', '37px', 'auto', 'auto'],
                            overflow: 'visible',
                            fill: ["rgba(0,0,0,0)",im+"check.svg",'0px','0px']
                        },
                        {
                            id: 'Rectangle2',
                            display: 'none',
                            type: 'rect',
                            rect: ['564px', '647px', '43px', '45px', 'auto', 'auto'],
                            cursor: 'pointer',
                            opacity: '0',
                            fill: ["rgba(255,255,255,1)"],
                            stroke: [3,"rgb(226, 226, 226)","solid"]
                        },
                        {
                            id: 'Button_Start',
                            symbolName: 'Button_Start',
                            display: 'none',
                            type: 'rect',
                            rect: ['755px', '549px', '224', '139', 'auto', 'auto']
                        },
                        {
                            id: 'intro_text',
                            display: 'block',
                            type: 'text',
                            rect: ['274px', '330px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin:0px\">Выберите соответствующий режим для продолжения</p>",
                            align: "left",
                            font: ['open-sans-condensed, sans-serif', [21, "px"], "rgba(0,80,152,1)", "700", "none solid rgb(0, 80, 152)", "normal", "break-word", "nowrap"]
                        },
                        {
                            id: 'header_image',
                            type: 'image',
                            rect: ['0px', '0px', '1024px', '100px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"Header.png",'0px','0px']
                        },
                        {
                            id: 'Rectangle',
                            display: 'none',
                            type: 'rect',
                            rect: ['0px', '528px', '1024px', '240px', 'auto', 'auto'],
                            fill: ["rgba(255,255,255,1.00)"],
                            stroke: [0,"rgba(0,0,0,1)","none"]
                        },
                        {
                            id: 'q11',
                            symbolName: 'Answer_Template_Small',
                            display: 'none',
                            type: 'rect',
                            rect: ['262px', '221px', 'undefined', 'undefined', 'auto', 'auto'],
                            userClass: "color-label"
                        },
                        {
                            id: 'q12',
                            symbolName: 'Answer_Template_Small',
                            display: 'none',
                            type: 'rect',
                            rect: ['262px', '311px', 'undefined', 'undefined', 'auto', 'auto'],
                            userClass: "color-label"
                        },
                        {
                            id: 'q_large',
                            symbolName: 'Answer_Template_Large',
                            display: 'none',
                            type: 'rect',
                            rect: ['262px', '310px', 'undefined', 'undefined', 'auto', 'auto'],
                            userClass: "color-label"
                        },
                        {
                            id: 'q13',
                            symbolName: 'Answer_Template_Small',
                            display: 'none',
                            type: 'rect',
                            rect: ['262px', '401px', 'undefined', 'undefined', 'auto', 'auto'],
                            userClass: "color-label"
                        },
                        {
                            id: 'q14',
                            symbolName: 'Answer_Template_Small',
                            display: 'none',
                            type: 'rect',
                            rect: ['262px', '450px', 'undefined', 'undefined', 'auto', 'auto'],
                            userClass: "color-label"
                        },
                        {
                            id: 'queueCounter',
                            display: 'none',
                            type: 'text',
                            rect: ['407px', '556px', '228px', '33px', 'auto', 'auto'],
                            text: "Пациентов в очереди",
                            align: "center",
                            font: ['open-sans-condensed, sans-serif', [24, "px"], "rgba(0,71,150,1.00)", "500", "none solid rgb(255, 255, 255)", "normal", "break-word", ""]
                        },
                        {
                            id: 'curQuestionHead',
                            display: 'none',
                            type: 'text',
                            rect: ['30px', '130px', '982px', '65px', 'auto', 'auto'],
                            text: "Заголовок<br>вопроса",
                            align: "center",
                            font: ['open-sans-condensed, sans-serif', [28, "px"], "rgba(0,71,150,1.00)", "700", "none solid rgb(255, 255, 255)", "normal", "break-word", ""]
                        },
                        {
                            id: 'totalGoodAnswrs',
                            display: 'none',
                            type: 'text',
                            rect: ['248px', '737px', '546px', '24px', 'auto', 'auto'],
                            text: "_",
                            align: "center",
                            font: ['open-sans-condensed, sans-serif', [18, "px"], "rgba(139,167,191,1.00)", "500", "none solid rgb(255, 255, 255)", "normal", "break-word", ""]
                        },
                        {
                            id: 'Text3Copy',
                            display: 'none',
                            type: 'text',
                            rect: ['227px', '744px', 'auto', 'auto', 'auto', 'auto'],
                            text: "МАТЕРИАЛ ПРЕДНАЗНАЧЕН ТОЛЬКО ДЛЯ МЕДИЦИНСКИХ И ФАРМАЦЕВТИЧЕСКИХ РАБОТНИКОВ",
                            align: "center",
                            font: ['open-sans-condensed, sans-serif', [18, "px"], "rgba(158,158,158,1.00)", "500", "none solid rgb(255, 255, 255)", "normal", "break-word", "nowrap"]
                        },
                        {
                            id: 'Peoples',
                            symbolName: 'Peoples',
                            display: 'none',
                            type: 'rect',
                            rect: ['905px', '605px', '109', '114', 'auto', 'auto']
                        },
                        {
                            id: 'Hint',
                            symbolName: 'Hint',
                            display: 'none',
                            type: 'rect',
                            rect: ['0', '0', '121', '77', 'auto', 'auto']
                        },
                        {
                            id: 'Grati',
                            symbolName: 'Grati',
                            type: 'rect',
                            rect: ['0px', '0px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'Text2',
                            display: 'none',
                            type: 'text',
                            rect: ['429px', '138px', 'auto', 'auto', 'auto', 'auto'],
                            text: "УРА!",
                            align: "center",
                            font: ['open-sans-condensed, sans-serif', [94, "px"], "rgba(13,81,148,1.00)", "900", "none", "", "break-word", "nowrap"]
                        },
                        {
                            id: 'Text2Copy',
                            display: 'none',
                            type: 'text',
                            rect: ['370px', '266px', 'auto', 'auto', 'auto', 'auto'],
                            text: "Поздравляем Вас!",
                            align: "center",
                            font: ['open-sans-condensed, sans-serif', [38, "px"], "rgba(13,81,148,1.00)", "900", "none", "", "break-word", "nowrap"]
                        },
                        {
                            id: 'Text2Copy2',
                            display: 'none',
                            type: 'text',
                            rect: ['267px', '318px', 'auto', 'auto', 'auto', 'auto'],
                            text: "Вы успешно ответили на все вопросы!",
                            align: "center",
                            font: ['open-sans-condensed, sans-serif', [38, "px"], "rgba(13,81,148,1.00)", "400", "none", "", "break-word", "nowrap"]
                        },
                        {
                            id: 'Symbol_1',
                            symbolName: 'Symbol_1',
                            display: 'none',
                            type: 'rect',
                            rect: ['241px', '492px', '541', '192', 'auto', 'auto']
                        },
                        {
                            id: 'Button_Stop',
                            symbolName: 'Button_Stop',
                            display: 'none',
                            type: 'rect',
                            rect: ['385px', '375px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'RoundRect2',
                            display: 'none',
                            type: 'rect',
                            rect: ['30px', '266px', '663px', '100px', 'auto', 'auto'],
                            borderRadius: ["10px", "10px", "10px", "10px"],
                            opacity: '0.25396825396825',
                            fill: ["rgba(255,255,255,1.00)"],
                            stroke: [0,"rgb(0, 0, 0)","none"]
                        },
                        {
                            id: 'RoundRect2Copy',
                            display: 'none',
                            type: 'rect',
                            rect: ['30px', '387px', '663px', '100px', 'auto', 'auto'],
                            borderRadius: ["10px", "10px", "10px", "10px"],
                            opacity: '0.25396825396825',
                            fill: ["rgba(255,255,255,1.00)"],
                            stroke: [0,"rgb(0, 0, 0)","none"]
                        },
                        {
                            id: 'RoundRect2Copy2',
                            display: 'none',
                            type: 'rect',
                            rect: ['30px', '508px', '663px', '100px', 'auto', 'auto'],
                            borderRadius: ["10px", "10px", "10px", "10px"],
                            opacity: '0.25396825396825',
                            fill: ["rgba(255,255,255,1.00)"],
                            stroke: [0,"rgb(0, 0, 0)","none"]
                        },
                        {
                            id: 'last_name',
                            display: 'none',
                            type: 'text',
                            rect: ['49px', '277px', 'auto', 'auto', 'auto', 'auto'],
                            text: "Фамилия",
                            align: "left",
                            font: ['open-sans-condensed, sans-serif', [21, "px"], "rgba(0,80,152,1)", "700", "none solid rgb(0, 80, 152)", "normal", "break-word", "nowrap"]
                        },
                        {
                            id: 'user_name',
                            display: 'none',
                            type: 'text',
                            rect: ['261px', '277px', 'auto', 'auto', 'auto', 'auto'],
                            text: "Имя",
                            align: "left",
                            font: ['open-sans-condensed, sans-serif', [21, "px"], "rgba(0,80,152,1)", "700", "none solid rgb(0, 80, 152)", "normal", "break-word", "nowrap"]
                        },
                        {
                            id: 'sername',
                            display: 'none',
                            type: 'text',
                            rect: ['474px', '277px', 'auto', 'auto', 'auto', 'auto'],
                            text: "Отчество",
                            align: "left",
                            font: ['open-sans-condensed, sans-serif', [21, "px"], "rgba(0,80,152,1)", "700", "none solid rgb(0, 80, 152)", "normal", "break-word", "nowrap"]
                        },
                        {
                            id: 'lpu_name',
                            display: 'none',
                            type: 'text',
                            rect: ['49px', '398px', 'auto', 'auto', 'auto', 'auto'],
                            text: "Название ЛПУ*",
                            align: "left",
                            font: ['open-sans-condensed, sans-serif', [21, "px"], "rgba(0,80,152,1)", "700", "none solid rgb(0, 80, 152)", "normal", "break-word", "nowrap"]
                        },
                        {
                            id: 'lpu_number',
                            display: 'none',
                            type: 'text',
                            rect: ['261px', '398px', 'auto', 'auto', 'auto', 'auto'],
                            text: "Номер ЛПУ",
                            align: "left",
                            font: ['open-sans-condensed, sans-serif', [21, "px"], "rgba(0,80,152,1)", "700", "none solid rgb(0, 80, 152)", "normal", "break-word", "nowrap"]
                        },
                        {
                            id: 'user_city',
                            display: 'none',
                            type: 'text',
                            rect: ['49px', '520px', 'auto', 'auto', 'auto', 'auto'],
                            text: "Город / нас. пункт* ",
                            align: "left",
                            font: ['open-sans-condensed, sans-serif', [21, "px"], "rgba(0,80,152,1)", "700", "none solid rgb(0, 80, 152)", "normal", "break-word", "nowrap"]
                        },
                        {
                            id: 'Buzzer',
                            type: 'audio',
                            tag: 'audio',
                            rect: ['-4815px', '-2374px', '320px', '45px', 'auto', 'auto'],
                            source: [aud+"Wrong%20Buzzer%20-%20Sound%20Effect.mp3"],
                            preload: 'auto'
                        },
                        {
                            id: 'Applods',
                            display: 'none',
                            type: 'audio',
                            tag: 'audio',
                            rect: ['126', '48', '320px', '45px', 'auto', 'auto'],
                            source: [aud+"008_1.mp3"],
                            preload: 'auto'
                        },
                        {
                            id: 'Button_Verify',
                            symbolName: 'Button_Verify',
                            display: 'none',
                            type: 'rect',
                            rect: ['455px', '430px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'verify_text',
                            display: 'none',
                            type: 'text',
                            rect: ['317px', '297px', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin:0px\">Для продолжения введите ваш личный код</p><p style=\"margin:0px\">​медицинского представителя</p>",
                            align: "center",
                            font: ['open-sans-condensed, sans-serif', [21, "px"], "rgba(0,80,152,1)", "700", "none solid rgb(0, 80, 152)", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "23px", "", ""]
                        },
                        {
                            id: 'Button_Result_Submit',
                            symbolName: 'Button_Result_Submit',
                            display: 'none',
                            type: 'rect',
                            rect: ['788px', '636px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'Button_Result_Prev',
                            symbolName: 'Button_Result_Prev',
                            display: 'none',
                            type: 'rect',
                            rect: ['663px', '636px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'Table_Result',
                            symbolName: 'Table_Result',
                            display: 'none',
                            type: 'rect',
                            rect: ['12', '138', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'Button_Question_Start',
                            symbolName: 'Button_Question_Start',
                            display: 'none',
                            type: 'rect',
                            rect: ['746px', '642px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'Button_Intro_Result',
                            symbolName: 'Button_Intro_Result',
                            display: 'block',
                            type: 'rect',
                            rect: ['530px', '382px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'Button_Intro_Start',
                            symbolName: 'Button_Intro_Start',
                            display: 'block',
                            type: 'rect',
                            rect: ['266px', '382px', 'undefined', 'undefined', 'auto', 'auto']
                        },
                        {
                            id: 'Dialog',
                            symbolName: 'Dialog',
                            display: 'none',
                            type: 'rect',
                            rect: ['0', '0', 'undefined', 'undefined', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '1024px', '768px', 'auto', 'auto'],
                            sizeRange: ['0px','','',''],
                            overflow: 'visible',
                            fill: ["rgba(232,244,234,1.00)"]
                        }
                    }
                },
                timeline: {
                    duration: 17500,
                    autoPlay: true,
                    labels: {
                        "intro": 0,
                        "register": 250,
                        "q1": 500,
                        "q2": 1000,
                        "q3": 1500,
                        "q4": 2000,
                        "q5": 2505,
                        "q6": 3000,
                        "q7": 3500,
                        "q8": 4000,
                        "q9": 4500,
                        "q10": 5000,
                        "q11": 5500,
                        "q12": 6000,
                        "q13": 6500,
                        "q14": 7000,
                        "q15": 7500,
                        "endGame": 8000,
                        "result": 9000,
                        "verification": 10000
                    },
                    data: [
                        [
                            "eid1974",
                            "display",
                            250,
                            0,
                            "linear",
                            "${intro_text}",
                            'block',
                            'none'
                        ],
                        [
                            "eid147",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Rectangle}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1859",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${Rectangle}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1962",
                            "display",
                            0,
                            0,
                            "linear",
                            "${TextCopy3}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1958",
                            "display",
                            250,
                            0,
                            "linear",
                            "${TextCopy3}",
                            'none',
                            'block'
                        ],
                        [
                            "eid57",
                            "display",
                            500,
                            0,
                            "linear",
                            "${TextCopy3}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1970",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Button_Start}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1965",
                            "display",
                            250,
                            0,
                            "linear",
                            "${Button_Start}",
                            'none',
                            'none'
                        ],
                        [
                            "eid52",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Button_Start}",
                            'none',
                            'none'
                        ],
                        [
                            "eid285",
                            "display",
                            500,
                            0,
                            "linear",
                            "${curQuestionHead}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1855",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${curQuestionHead}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1887",
                            "display",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1948",
                            "display",
                            250,
                            0,
                            "linear",
                            "${RoundRect2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1878",
                            "display",
                            500,
                            0,
                            "linear",
                            "${RoundRect2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1983",
                            "display",
                            250,
                            0,
                            "linear",
                            "${Button_Intro_Result}",
                            'block',
                            'none'
                        ],
                        [
                            "eid184",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Rectangle2}",
                            '647px',
                            '647px'
                        ],
                        [
                            "eid1231",
                            "left",
                            500,
                            0,
                            "linear",
                            "${Peoples}",
                            '905px',
                            '905px'
                        ],
                        [
                            "eid1870",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${Symbol_1}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1927",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${Symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid873",
                            "width",
                            500,
                            0,
                            "linear",
                            "${queueCounter}",
                            '228px',
                            '228px'
                        ],
                        [
                            "eid866",
                            "height",
                            500,
                            0,
                            "linear",
                            "${totalGoodAnswrs}",
                            '24px',
                            '24px'
                        ],
                        [
                            "eid1964",
                            "display",
                            0,
                            0,
                            "linear",
                            "${RoundRect}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1963",
                            "display",
                            250,
                            0,
                            "linear",
                            "${RoundRect}",
                            'none',
                            'block'
                        ],
                        [
                            "eid56",
                            "display",
                            500,
                            0,
                            "linear",
                            "${RoundRect}",
                            'block',
                            'none'
                        ],
                        [
                            "eid467",
                            "left",
                            0,
                            0,
                            "linear",
                            "${TextCopy}",
                            '24px',
                            '24px'
                        ],
                        [
                            "eid270",
                            "display",
                            500,
                            0,
                            "linear",
                            "${totalGoodAnswrs}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1854",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${totalGoodAnswrs}",
                            'block',
                            'none'
                        ],
                        [
                            "eid870",
                            "height",
                            500,
                            0,
                            "linear",
                            "${queueCounter}",
                            '33px',
                            '33px'
                        ],
                        [
                            "eid114",
                            "top",
                            0,
                            0,
                            "linear",
                            "${TextCopy3}",
                            '715px',
                            '715px'
                        ],
                        [
                            "eid250",
                            "display",
                            500,
                            0,
                            "linear",
                            "${q11}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1856",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${q11}",
                            'block',
                            'none'
                        ],
                        [
                            "eid256",
                            "display",
                            500,
                            0,
                            "linear",
                            "${q13}",
                            'none',
                            'block'
                        ],
                        [
                            "eid471",
                            "display",
                            1500,
                            0,
                            "linear",
                            "${q13}",
                            'block',
                            'none'
                        ],
                        [
                            "eid508",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${q13}",
                            'none',
                            'block'
                        ],
                        [
                            "eid573",
                            "display",
                            4500,
                            0,
                            "linear",
                            "${q13}",
                            'block',
                            'block'
                        ],
                        [
                            "eid552",
                            "display",
                            5000,
                            0,
                            "linear",
                            "${q13}",
                            'block',
                            'none'
                        ],
                        [
                            "eid578",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${q13}",
                            'none',
                            'none'
                        ],
                        [
                            "eid553",
                            "display",
                            7500,
                            0,
                            "linear",
                            "${q13}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1858",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${q13}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1200",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Peoples}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1199",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Peoples}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1852",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${Peoples}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1889",
                            "display",
                            0,
                            0,
                            "linear",
                            "${sername}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1956",
                            "display",
                            250,
                            0,
                            "linear",
                            "${sername}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1880",
                            "display",
                            500,
                            0,
                            "linear",
                            "${sername}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1885",
                            "display",
                            0,
                            0,
                            "linear",
                            "${lpu_name}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1952",
                            "display",
                            250,
                            0,
                            "linear",
                            "${lpu_name}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1876",
                            "display",
                            500,
                            0,
                            "linear",
                            "${lpu_name}",
                            'block',
                            'none'
                        ],
                        [
                            "eid69",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Law_Text}",
                            '49px',
                            '49px'
                        ],
                        [
                            "eid130",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect}",
                            '570px',
                            '570px'
                        ],
                        [
                            "eid1882",
                            "display",
                            0,
                            0,
                            "linear",
                            "${user_city}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1951",
                            "display",
                            250,
                            0,
                            "linear",
                            "${user_city}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1873",
                            "display",
                            500,
                            0,
                            "linear",
                            "${user_city}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1888",
                            "display",
                            0,
                            0,
                            "linear",
                            "${user_name}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1955",
                            "display",
                            250,
                            0,
                            "linear",
                            "${user_name}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1879",
                            "display",
                            500,
                            0,
                            "linear",
                            "${user_name}",
                            'block',
                            'none'
                        ],
                        [
                            "eid116",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Law_Text}",
                            '14px',
                            '14px'
                        ],
                        [
                            "eid1863",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${Text2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1923",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${Text2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2040",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Button_Question_Start}",
                            'none',
                            'none'
                        ],
                        [
                            "eid2041",
                            "display",
                            250,
                            0,
                            "linear",
                            "${Button_Question_Start}",
                            'none',
                            'block'
                        ],
                        [
                            "eid2042",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Button_Question_Start}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1941",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${Button_Result_Prev}",
                            'none',
                            'block'
                        ],
                        [
                            "eid2066",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${Button_Result_Prev}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1232",
                            "top",
                            500,
                            0,
                            "linear",
                            "${Peoples}",
                            '605px',
                            '605px'
                        ],
                        [
                            "eid288",
                            "height",
                            500,
                            0,
                            "linear",
                            "${curQuestionHead}",
                            '65px',
                            '65px'
                        ],
                        [
                            "eid1883",
                            "display",
                            0,
                            0,
                            "linear",
                            "${RoundRect2Copy2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1950",
                            "display",
                            250,
                            0,
                            "linear",
                            "${RoundRect2Copy2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1874",
                            "display",
                            500,
                            0,
                            "linear",
                            "${RoundRect2Copy2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1990",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Dialog}",
                            'none',
                            'none'
                        ],
                        [
                            "eid183",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Rectangle2}",
                            '564px',
                            '564px'
                        ],
                        [
                            "eid1960",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Rectangle2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1959",
                            "display",
                            250,
                            0,
                            "linear",
                            "${Rectangle2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid54",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Rectangle2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1864",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${Text2Copy}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1924",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${Text2Copy}",
                            'block',
                            'none'
                        ],
                        [
                            "eid286",
                            "left",
                            500,
                            0,
                            "linear",
                            "${curQuestionHead}",
                            '30px',
                            '30px'
                        ],
                        [
                            "eid455",
                            "width",
                            0,
                            0,
                            "linear",
                            "${TextCopy}",
                            '636px',
                            '636px'
                        ],
                        [
                            "eid459",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${TextCopy}",
                            '34px',
                            '34px'
                        ],
                        [
                            "eid119",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Law_Text}",
                            '640px',
                            '640px'
                        ],
                        [
                            "eid465",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text}",
                            '43px',
                            '43px'
                        ],
                        [
                            "eid1890",
                            "display",
                            0,
                            0,
                            "linear",
                            "${last_name}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1954",
                            "display",
                            250,
                            0,
                            "linear",
                            "${last_name}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1881",
                            "display",
                            500,
                            0,
                            "linear",
                            "${last_name}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1886",
                            "display",
                            0,
                            0,
                            "linear",
                            "${lpu_number}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1953",
                            "display",
                            250,
                            0,
                            "linear",
                            "${lpu_number}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1877",
                            "display",
                            500,
                            0,
                            "linear",
                            "${lpu_number}",
                            'block',
                            'none'
                        ],
                        [
                            "eid290",
                            "font-size",
                            500,
                            0,
                            "linear",
                            "${curQuestionHead}",
                            '28px',
                            '28px'
                        ],
                        [
                            "eid289",
                            "width",
                            500,
                            0,
                            "linear",
                            "${curQuestionHead}",
                            '982px',
                            '982px'
                        ],
                        [
                            "eid2074",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${Button_Verify}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1942",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Back}",
                            '118px',
                            '118px'
                        ],
                        [
                            "eid1943",
                            "top",
                            500,
                            0,
                            "linear",
                            "${Back}",
                            '118px',
                            '118px'
                        ],
                        [
                            "eid839",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint}",
                            'none',
                            'none'
                        ],
                        [
                            "eid10",
                            "display",
                            0,
                            0,
                            "linear",
                            "${check}",
                            'none',
                            'none'
                        ],
                        [
                            "eid55",
                            "display",
                            500,
                            0,
                            "linear",
                            "${check}",
                            'none',
                            'none'
                        ],
                        [
                            "eid131",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect}",
                            '654px',
                            '654px'
                        ],
                        [
                            "eid524",
                            "display",
                            0,
                            0,
                            "linear",
                            "${q14}",
                            'block',
                            'none'
                        ],
                        [
                            "eid523",
                            "display",
                            3500,
                            0,
                            "linear",
                            "${q14}",
                            'none',
                            'block'
                        ],
                        [
                            "eid531",
                            "display",
                            4500,
                            0,
                            "linear",
                            "${q14}",
                            'block',
                            'none'
                        ],
                        [
                            "eid463",
                            "top",
                            0,
                            0,
                            "linear",
                            "${TextCopy}",
                            '150px',
                            '150px'
                        ],
                        [
                            "eid591",
                            "left",
                            500,
                            0,
                            "linear",
                            "${q11}",
                            '262px',
                            '262px'
                        ],
                        [
                            "eid1884",
                            "display",
                            0,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1949",
                            "display",
                            250,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1875",
                            "display",
                            500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1961",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Law_Text}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1957",
                            "display",
                            250,
                            0,
                            "linear",
                            "${Law_Text}",
                            'none',
                            'block'
                        ],
                        [
                            "eid53",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Law_Text}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1945",
                            "display",
                            0,
                            0,
                            "linear",
                            "${TextCopy}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1944",
                            "display",
                            250,
                            0,
                            "linear",
                            "${TextCopy}",
                            'none',
                            'block'
                        ],
                        [
                            "eid58",
                            "display",
                            500,
                            0,
                            "linear",
                            "${TextCopy}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1915",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${Button_Stop}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1926",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${Button_Stop}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1940",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${Table_Result}",
                            'none',
                            'block'
                        ],
                        [
                            "eid2065",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${Table_Result}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1947",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1946",
                            "display",
                            250,
                            0,
                            "linear",
                            "${Text}",
                            'none',
                            'block'
                        ],
                        [
                            "eid59",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Text}",
                            'block',
                            'none'
                        ],
                        [
                            "eid561",
                            "top",
                            500,
                            0,
                            "linear",
                            "${curQuestionHead}",
                            '147px',
                            '147px'
                        ],
                        [
                            "eid560",
                            "top",
                            2500,
                            500,
                            "linear",
                            "${curQuestionHead}",
                            '147px',
                            '130px'
                        ],
                        [
                            "eid567",
                            "top",
                            4000,
                            500,
                            "linear",
                            "${curQuestionHead}",
                            '130px',
                            '147px'
                        ],
                        [
                            "eid568",
                            "top",
                            4500,
                            500,
                            "linear",
                            "${curQuestionHead}",
                            '147px',
                            '130px'
                        ],
                        [
                            "eid569",
                            "top",
                            5000,
                            0,
                            "linear",
                            "${curQuestionHead}",
                            '130px',
                            '130px'
                        ],
                        [
                            "eid570",
                            "top",
                            5500,
                            500,
                            "linear",
                            "${curQuestionHead}",
                            '130px',
                            '147px'
                        ],
                        [
                            "eid571",
                            "top",
                            6000,
                            500,
                            "linear",
                            "${curQuestionHead}",
                            '147px',
                            '130px'
                        ],
                        [
                            "eid267",
                            "display",
                            500,
                            0,
                            "linear",
                            "${queueCounter}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1853",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${queueCounter}",
                            'block',
                            'none'
                        ],
                        [
                            "eid525",
                            "top",
                            3000,
                            500,
                            "linear",
                            "${q14}",
                            '472px',
                            '450px'
                        ],
                        [
                            "eid551",
                            "top",
                            4000,
                            0,
                            "linear",
                            "${q14}",
                            '450px',
                            '450px'
                        ],
                        [
                            "eid1984",
                            "display",
                            250,
                            0,
                            "linear",
                            "${Button_Intro_Start}",
                            'block',
                            'none'
                        ],
                        [
                            "eid480",
                            "display",
                            1500,
                            0,
                            "linear",
                            "${q_large}",
                            'none',
                            'block'
                        ],
                        [
                            "eid507",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${q_large}",
                            'block',
                            'none'
                        ],
                        [
                            "eid595",
                            "left",
                            1500,
                            0,
                            "linear",
                            "${q_large}",
                            '262px',
                            '262px'
                        ],
                        [
                            "eid75",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Back}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1085",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Grati}",
                            'none',
                            'none'
                        ],
                        [
                            "eid85",
                            "left",
                            0,
                            0,
                            "linear",
                            "${TextCopy3}",
                            '49px',
                            '49px'
                        ],
                        [
                            "eid453",
                            "height",
                            0,
                            0,
                            "linear",
                            "${TextCopy}",
                            '54px',
                            '54px'
                        ],
                        [
                            "eid117",
                            "width",
                            0,
                            0,
                            "linear",
                            "${Law_Text}",
                            '494px',
                            '494px'
                        ],
                        [
                            "eid478",
                            "top",
                            1500,
                            0,
                            "linear",
                            "${q_large}",
                            '310px',
                            '310px'
                        ],
                        [
                            "eid154",
                            "height",
                            500,
                            0,
                            "linear",
                            "${Rectangle}",
                            '240px',
                            '240px'
                        ],
                        [
                            "eid500",
                            "top",
                            500,
                            0,
                            "linear",
                            "${totalGoodAnswrs}",
                            '737px',
                            '737px'
                        ],
                        [
                            "eid251",
                            "display",
                            500,
                            0,
                            "linear",
                            "${q12}",
                            'none',
                            'block'
                        ],
                        [
                            "eid472",
                            "display",
                            1500,
                            0,
                            "linear",
                            "${q12}",
                            'block',
                            'none'
                        ],
                        [
                            "eid510",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${q12}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1857",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${q12}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1865",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${Text2Copy2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1925",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${Text2Copy2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid528",
                            "top",
                            3000,
                            500,
                            "linear",
                            "${q13}",
                            '401px',
                            '360px'
                        ],
                        [
                            "eid548",
                            "top",
                            4000,
                            500,
                            "linear",
                            "${q13}",
                            '360px',
                            '401px'
                        ],
                        [
                            "eid871",
                            "left",
                            500,
                            0,
                            "linear",
                            "${queueCounter}",
                            '407px',
                            '407px'
                        ],
                        [
                            "eid118",
                            "height",
                            0,
                            0,
                            "linear",
                            "${Law_Text}",
                            '65px',
                            '65px'
                        ],
                        [
                            "eid592",
                            "left",
                            500,
                            0,
                            "linear",
                            "${q12}",
                            '262px',
                            '262px'
                        ],
                        [
                            "eid1968",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Pack2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1967",
                            "display",
                            250,
                            0,
                            "linear",
                            "${Pack2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1851",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Pack2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid488",
                            "top",
                            500,
                            0,
                            "linear",
                            "${queueCounter}",
                            '556px',
                            '556px'
                        ],
                        [
                            "eid1969",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Med_material}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1966",
                            "display",
                            250,
                            0,
                            "linear",
                            "${Med_material}",
                            'none',
                            'block'
                        ],
                        [
                            "eid61",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Med_material}",
                            'block',
                            'none'
                        ],
                        [
                            "eid297",
                            "top",
                            500,
                            0,
                            "linear",
                            "${q11}",
                            '215px',
                            '215px'
                        ],
                        [
                            "eid527",
                            "top",
                            3000,
                            500,
                            "linear",
                            "${q11}",
                            '215px',
                            '180px'
                        ],
                        [
                            "eid550",
                            "top",
                            4000,
                            500,
                            "linear",
                            "${q11}",
                            '180px',
                            '221px'
                        ],
                        [
                            "eid869",
                            "width",
                            500,
                            0,
                            "linear",
                            "${totalGoodAnswrs}",
                            '546px',
                            '546px'
                        ],
                        [
                            "eid867",
                            "left",
                            500,
                            0,
                            "linear",
                            "${totalGoodAnswrs}",
                            '248px',
                            '248px'
                        ],
                        [
                            "eid468",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text}",
                            '183px',
                            '183px'
                        ],
                        [
                            "eid2071",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${verify_text}",
                            'none',
                            'block'
                        ],
                        [
                            "eid593",
                            "left",
                            500,
                            0,
                            "linear",
                            "${q13}",
                            '262px',
                            '262px'
                        ],
                        [
                            "eid596",
                            "left",
                            500,
                            3000,
                            "linear",
                            "${q14}",
                            '290px',
                            '262px'
                        ],
                        [
                            "eid2056",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${Button_Result_Submit}",
                            'none',
                            'block'
                        ],
                        [
                            "eid2067",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${Button_Result_Submit}",
                            'block',
                            'none'
                        ],
                        [
                            "eid107",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Med_material}",
                            '328px',
                            '328px'
                        ],
                        [
                            "eid157",
                            "top",
                            500,
                            0,
                            "linear",
                            "${Rectangle}",
                            '528px',
                            '528px'
                        ],
                        [
                            "eid106",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Med_material}",
                            '741px',
                            '741px'
                        ],
                        [
                            "eid150",
                            "left",
                            500,
                            0,
                            "linear",
                            "${Rectangle}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid298",
                            "top",
                            500,
                            0,
                            "linear",
                            "${q12}",
                            '310px',
                            '310px'
                        ],
                        [
                            "eid526",
                            "top",
                            3000,
                            500,
                            "linear",
                            "${q12}",
                            '310px',
                            '270px'
                        ],
                        [
                            "eid549",
                            "top",
                            4000,
                            500,
                            "linear",
                            "${q12}",
                            '270px',
                            '311px'
                        ],
                        [
                            "eid1992",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text3Copy}",
                            'none',
                            'none'
                        ],
                        [
                            "eid490",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Text3Copy}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1993",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${Text3Copy}",
                            'none',
                            'block'
                        ],
                            [ "eid1277", "trigger", 500, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${Peoples}', [0] ] ]
                    ]
                }
            },
            "anim_for_button_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '256px', '256px', 'auto', 'auto'],
                            id: 'anim_for_button',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + '/animation/anim_for_button.png', '0px', '0px', '256px', '256px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '67px', '99px']
                        }
                    }
                },
                timeline: {
                    duration: 5958,
                    autoPlay: true,
                    data: [
                        [
                            "eid15",
                            "height",
                            0,
                            0,
                            "linear",
                            "${anim_for_button}",
                            '0px',
                            '99px'
                        ],
                        [
                            "eid16",
                            "width",
                            0,
                            0,
                            "linear",
                            "${anim_for_button}",
                            '0px',
                            '67px'
                        ],
                        [
                            "eid17",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${anim_for_button}",
                            [0,0],
                            [-1,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid18",
                            "background-position",
                            1708,
                            0,
                            "linear",
                            "${anim_for_button}",
                            [-1,-1],
                            [-69,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid19",
                            "background-position",
                            1833,
                            0,
                            "linear",
                            "${anim_for_button}",
                            [-69,-1],
                            [-1,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid20",
                            "background-position",
                            5458,
                            0,
                            "linear",
                            "${anim_for_button}",
                            [-1,-1],
                            [-137,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid21",
                            "background-position",
                            5625,
                            0,
                            "linear",
                            "${anim_for_button}",
                            [-137,-1],
                            [-1,-101],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid22",
                            "background-position",
                            5791,
                            0,
                            "linear",
                            "${anim_for_button}",
                            [-1,-101],
                            [-137,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid23",
                            "background-position",
                            5958,
                            0,
                            "linear",
                            "${anim_for_button}",
                            [-137,-1],
                            [-1,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ]
                    ]
                }
            },
            "Button_Start": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['80px', '5px', '67px', '99px', 'auto', 'auto'],
                            id: 'anim_for_button_symbol_1',
                            symbolName: 'anim_for_button_symbol_1',
                            type: 'rect',
                            display: 'block'
                        },
                        {
                            rect: ['0px', '74px', '216px', '59px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)'],
                            id: 'RoundRect2',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(0,84,160,1.00)']
                        },
                        {
                            type: 'text',
                            text: 'Начать презентацию',
                            id: 'Text2',
                            textStyle: ['0px', '1px', '', '', ''],
                            font: ['open-sans-condensed, sans-serif', [22, 'px'], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', 'nowrap'],
                            rect: ['18px', '92px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            rect: ['80px', '4px', '69px', '84px', 'auto', 'auto'],
                            id: '__12',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', im + 'animation/continue_button_over.png', '0px', '0px']
                        },
                        {
                            rect: ['77px', '6px', '72px', '84px', 'auto', 'auto'],
                            id: '__13',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', im + 'animation/continue_button_down.png', '0px', '0px']
                        },
                        {
                            rect: ['80px', '64px', '64px', '19px', 'auto', 'auto'],
                            id: '__SPIT_GAME_22',
                            type: 'image',
                            display: 'block',
                            fill: ['rgba(0,0,0,0)', im + 'animation/continue_button_hands.png', '0px', '0px']
                        },
                        {
                            rect: ['-16px', '58px', '254px', '96px', 'auto', 'auto'],
                            type: 'rect',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            id: 'Rectangle',
                            opacity: '0',
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '224px', '139px']
                        }
                    }
                },
                timeline: {
                    duration: 5958,
                    autoPlay: true,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000
                    },
                    data: [
                        [
                            "eid42",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '74px',
                            '78px'
                        ],
                        [
                            "eid141",
                            "left",
                            2000,
                            0,
                            "linear",
                            "${__13}",
                            '77px',
                            '77px'
                        ],
                        [
                            "eid849",
                            "letter-spacing",
                            0,
                            0,
                            "linear",
                            "${Text2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid137",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${anim_for_button_symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid855",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text2}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid50",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text2}",
                            '92px',
                            '90px'
                        ],
                        [
                            "eid49",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${Text2}",
                            '90px',
                            '96px'
                        ],
                        [
                            "eid138",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${__12}",
                            'none',
                            'block'
                        ],
                        [
                            "eid139",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${__12}",
                            'block',
                            'none'
                        ],
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid853",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text2}",
                            '22px',
                            '22px'
                        ],
                        [
                            "eid140",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${__13}",
                            'none',
                            'block'
                        ],
                        [
                            "eid45",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_for_button_symbol_1}",
                            '5px',
                            '5px'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid28",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_for_button_symbol_1}",
                            '80px',
                            '80px'
                        ],
                        [
                            "eid136",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${__SPIT_GAME_22}",
                            'block',
                            'none'
                        ],
                        [
                            "eid850",
                            "word-spacing",
                            0,
                            0,
                            "linear",
                            "${Text2}",
                            '1px',
                            '1px'
                        ]
                    ]
                }
            },
            "Button_Continue": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['15px', '14px', '216px', '59px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            fill: ['rgba(0,84,160,1.00)'],
                            id: 'RoundRect2',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'rect',
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [24, ''], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', 'nowrap'],
                            id: 'Text2',
                            text: 'Продолжить',
                            type: 'text',
                            rect: ['64px', '30px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            rect: ['0px', '0px', '254px', '96px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '254px', '96px']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000
                    },
                    data: [
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '14px',
                            '14px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '14px',
                            '18px'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '15px',
                            '15px'
                        ]
                    ]
                }
            },
            "Answer_Template_Small": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            font: ['open-sans-condensed, sans-serif', [30, 'px'], 'rgba(255,255,255,1)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', 'normal'],
                            type: 'text',
                            align: 'center',
                            id: 'TitleABC',
                            textStyle: ['', '', '51px', '', ''],
                            text: 'A',
                            rect: ['0px', '7px', '49px', '65px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [20, 'px'], 'rgba(255,255,255,1)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', 'normal'],
                            type: 'text',
                            id: 'QestionText',
                            text: 'Доза должна подбираться для каждого больного<br>индивидуально. ',
                            align: 'left',
                            rect: ['49px', '5px', '464px', '60px', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            rect: ['-4px', '-3px', '528px', '72px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle3',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            cursor: 'pointer',
                            fill: ['rgba(192,192,192,1)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '520px', '65px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "Button_Start_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['15px', '14px', '216px', '59px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            fill: ['rgba(0,84,160,1.00)'],
                            id: 'RoundRect2',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'rect',
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)']
                        },
                        {
                            type: 'rect',
                            rect: ['0px', '0px', '254px', '96px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '254px', '96px']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: true,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000
                    },
                    data: [
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '14px',
                            '14px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '14px',
                            '18px'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '15px',
                            '15px'
                        ]
                    ]
                }
            },
            "Hint1_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(192,239,206,1.00)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '40px', '631px', '78px', 'auto', 'auto'],
                            id: 'Text4',
                            text: 'Таблетка Спитомина (буспирона) не имеет оболочки и на ней нанесена\rспециальная риска для деления таблетки 10мг на две части по 5 мг для титрования дозы.',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '134px', '366px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '163px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['32px', '163px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy3',
                            text: 'А',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'rect',
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            rect: ['307px', '115px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto']
                        },
                        {
                            type: 'image',
                            id: 'hint_body2',
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ],
                        [
                            "eid635",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '163px',
                            '163px'
                        ],
                        [
                            "eid641",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '115px',
                            '115px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ],
                        [
                            "eid636",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '163px',
                            '163px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid634",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '134px',
                            '134px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ]
                    ]
                }
            },
            "anim_hint_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '1024px', '649px', 'auto', 'auto'],
                            id: 'anim_hint',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/anim_hint.png', '0px', '0px', '1024px', '649px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '67px', '62px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: true,
                    data: [
                        [
                            "eid300",
                            "height",
                            0,
                            0,
                            "linear",
                            "${anim_hint}",
                            '0px',
                            '62px'
                        ],
                        [
                            "eid301",
                            "width",
                            0,
                            0,
                            "linear",
                            "${anim_hint}",
                            '0px',
                            '67px'
                        ],
                        [
                            "eid302",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${anim_hint}",
                            [0,0],
                            [-2,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid303",
                            "background-position",
                            41,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-2,-2],
                            [-71,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid304",
                            "background-position",
                            83,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-71,-2],
                            [-140,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid305",
                            "background-position",
                            125,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-140,-2],
                            [-209,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid306",
                            "background-position",
                            166,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-209,-2],
                            [-278,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid307",
                            "background-position",
                            208,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-278,-2],
                            [-347,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid308",
                            "background-position",
                            250,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-347,-2],
                            [-416,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid309",
                            "background-position",
                            291,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-416,-2],
                            [-485,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid310",
                            "background-position",
                            333,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-485,-2],
                            [-554,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid311",
                            "background-position",
                            375,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-554,-2],
                            [-623,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid312",
                            "background-position",
                            416,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-623,-2],
                            [-692,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid313",
                            "background-position",
                            458,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-692,-2],
                            [-761,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid314",
                            "background-position",
                            500,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-761,-2],
                            [-830,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid315",
                            "background-position",
                            541,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-830,-2],
                            [-899,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid316",
                            "background-position",
                            583,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-899,-2],
                            [-2,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid317",
                            "background-position",
                            625,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-2,-66],
                            [-71,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid318",
                            "background-position",
                            666,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-71,-66],
                            [-140,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid319",
                            "background-position",
                            708,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-140,-66],
                            [-209,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid320",
                            "background-position",
                            750,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-209,-66],
                            [-278,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid321",
                            "background-position",
                            791,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-278,-66],
                            [-347,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid322",
                            "background-position",
                            833,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-347,-66],
                            [-416,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid323",
                            "background-position",
                            875,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-416,-66],
                            [-485,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid324",
                            "background-position",
                            916,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-485,-66],
                            [-554,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid325",
                            "background-position",
                            958,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-554,-66],
                            [-623,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid326",
                            "background-position",
                            1000,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-623,-66],
                            [-692,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid327",
                            "background-position",
                            1041,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-692,-66],
                            [-761,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid328",
                            "background-position",
                            1083,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-761,-66],
                            [-830,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid329",
                            "background-position",
                            1125,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-830,-66],
                            [-899,-66],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid330",
                            "background-position",
                            1166,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-899,-66],
                            [-2,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid331",
                            "background-position",
                            1208,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-2,-130],
                            [-71,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid332",
                            "background-position",
                            1250,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-71,-130],
                            [-140,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid333",
                            "background-position",
                            1291,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-140,-130],
                            [-209,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid334",
                            "background-position",
                            1333,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-209,-130],
                            [-278,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid335",
                            "background-position",
                            1375,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-278,-130],
                            [-347,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid336",
                            "background-position",
                            1416,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-347,-130],
                            [-416,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid337",
                            "background-position",
                            1458,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-416,-130],
                            [-485,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid338",
                            "background-position",
                            1500,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-485,-130],
                            [-554,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid339",
                            "background-position",
                            1541,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-554,-130],
                            [-623,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid340",
                            "background-position",
                            1583,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-623,-130],
                            [-692,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid341",
                            "background-position",
                            1625,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-692,-130],
                            [-761,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid342",
                            "background-position",
                            1666,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-761,-130],
                            [-830,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid343",
                            "background-position",
                            1708,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-830,-130],
                            [-899,-130],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid344",
                            "background-position",
                            1750,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-899,-130],
                            [-2,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid345",
                            "background-position",
                            1791,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-2,-194],
                            [-71,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid346",
                            "background-position",
                            1833,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-71,-194],
                            [-140,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid347",
                            "background-position",
                            1875,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-140,-194],
                            [-209,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid348",
                            "background-position",
                            1916,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-209,-194],
                            [-278,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid349",
                            "background-position",
                            1958,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-278,-194],
                            [-347,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid350",
                            "background-position",
                            2000,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-347,-194],
                            [-416,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid351",
                            "background-position",
                            2041,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-416,-194],
                            [-485,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid352",
                            "background-position",
                            2083,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-485,-194],
                            [-554,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid353",
                            "background-position",
                            2125,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-554,-194],
                            [-623,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid354",
                            "background-position",
                            2166,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-623,-194],
                            [-692,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid355",
                            "background-position",
                            2208,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-692,-194],
                            [-761,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid356",
                            "background-position",
                            2250,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-761,-194],
                            [-830,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid357",
                            "background-position",
                            2291,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-830,-194],
                            [-899,-194],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid358",
                            "background-position",
                            2333,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-899,-194],
                            [-2,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid359",
                            "background-position",
                            2375,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-2,-258],
                            [-71,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid360",
                            "background-position",
                            2416,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-71,-258],
                            [-140,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid361",
                            "background-position",
                            2458,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-140,-258],
                            [-209,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid362",
                            "background-position",
                            2500,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-209,-258],
                            [-278,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid363",
                            "background-position",
                            2541,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-278,-258],
                            [-347,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid364",
                            "background-position",
                            2583,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-347,-258],
                            [-416,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid365",
                            "background-position",
                            2625,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-416,-258],
                            [-2,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid366",
                            "background-position",
                            2666,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-2,-2],
                            [-485,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid367",
                            "background-position",
                            2708,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-485,-258],
                            [-554,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid368",
                            "background-position",
                            2750,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-554,-258],
                            [-623,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid369",
                            "background-position",
                            2791,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-623,-258],
                            [-692,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid370",
                            "background-position",
                            2833,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-692,-258],
                            [-761,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid371",
                            "background-position",
                            2875,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-761,-258],
                            [-830,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid372",
                            "background-position",
                            2916,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-830,-258],
                            [-899,-258],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid373",
                            "background-position",
                            2958,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-899,-258],
                            [-2,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid374",
                            "background-position",
                            3000,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-2,-322],
                            [-71,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid375",
                            "background-position",
                            3041,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-71,-322],
                            [-140,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid376",
                            "background-position",
                            3083,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-140,-322],
                            [-209,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid377",
                            "background-position",
                            3125,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-209,-322],
                            [-278,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid378",
                            "background-position",
                            3166,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-278,-322],
                            [-347,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid379",
                            "background-position",
                            3208,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-347,-322],
                            [-416,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid380",
                            "background-position",
                            3250,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-416,-322],
                            [-485,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid381",
                            "background-position",
                            3291,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-485,-322],
                            [-554,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid382",
                            "background-position",
                            3333,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-554,-322],
                            [-623,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid383",
                            "background-position",
                            3375,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-623,-322],
                            [-692,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid384",
                            "background-position",
                            3416,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-692,-322],
                            [-761,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid385",
                            "background-position",
                            3458,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-761,-322],
                            [-830,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid386",
                            "background-position",
                            3500,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-830,-322],
                            [-899,-322],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid387",
                            "background-position",
                            3541,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-899,-322],
                            [-2,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid388",
                            "background-position",
                            3583,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-2,-386],
                            [-71,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid389",
                            "background-position",
                            3625,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-71,-386],
                            [-140,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid390",
                            "background-position",
                            3666,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-140,-386],
                            [-209,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid391",
                            "background-position",
                            3708,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-209,-386],
                            [-278,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid392",
                            "background-position",
                            3750,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-278,-386],
                            [-347,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid393",
                            "background-position",
                            3791,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-347,-386],
                            [-416,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid394",
                            "background-position",
                            3833,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-416,-386],
                            [-485,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid395",
                            "background-position",
                            3875,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-485,-386],
                            [-554,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid396",
                            "background-position",
                            3916,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-554,-386],
                            [-623,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid397",
                            "background-position",
                            3958,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-623,-386],
                            [-692,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid398",
                            "background-position",
                            4000,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-692,-386],
                            [-761,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid399",
                            "background-position",
                            4041,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-761,-386],
                            [-830,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid400",
                            "background-position",
                            4083,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-830,-386],
                            [-899,-386],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid401",
                            "background-position",
                            4125,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-899,-386],
                            [-2,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid402",
                            "background-position",
                            4166,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-2,-450],
                            [-71,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid403",
                            "background-position",
                            4208,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-71,-450],
                            [-140,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid404",
                            "background-position",
                            4250,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-140,-450],
                            [-209,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid405",
                            "background-position",
                            4291,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-209,-450],
                            [-278,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid406",
                            "background-position",
                            4333,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-278,-450],
                            [-347,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid407",
                            "background-position",
                            4375,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-347,-450],
                            [-416,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid408",
                            "background-position",
                            4416,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-416,-450],
                            [-485,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid409",
                            "background-position",
                            4458,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-485,-450],
                            [-554,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid410",
                            "background-position",
                            4500,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-554,-450],
                            [-623,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid411",
                            "background-position",
                            4541,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-623,-450],
                            [-692,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid412",
                            "background-position",
                            4583,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-692,-450],
                            [-761,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid413",
                            "background-position",
                            4625,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-761,-450],
                            [-830,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid414",
                            "background-position",
                            4666,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-830,-450],
                            [-899,-450],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid415",
                            "background-position",
                            4708,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-899,-450],
                            [-2,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid416",
                            "background-position",
                            4750,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-2,-514],
                            [-71,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid417",
                            "background-position",
                            4791,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-71,-514],
                            [-140,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid418",
                            "background-position",
                            4833,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-140,-514],
                            [-209,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid419",
                            "background-position",
                            4875,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-209,-514],
                            [-278,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid420",
                            "background-position",
                            4916,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-278,-514],
                            [-347,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid421",
                            "background-position",
                            4958,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-347,-514],
                            [-416,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid422",
                            "background-position",
                            5000,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-416,-514],
                            [-485,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid423",
                            "background-position",
                            5041,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-485,-514],
                            [-554,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid424",
                            "background-position",
                            5083,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-554,-514],
                            [-623,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid425",
                            "background-position",
                            5125,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-623,-514],
                            [-692,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid426",
                            "background-position",
                            5166,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-692,-514],
                            [-761,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid427",
                            "background-position",
                            5208,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-761,-514],
                            [-830,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid428",
                            "background-position",
                            5250,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-830,-514],
                            [-899,-514],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid429",
                            "background-position",
                            5291,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-899,-514],
                            [-2,-578],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid430",
                            "background-position",
                            5333,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-2,-578],
                            [-71,-578],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid431",
                            "background-position",
                            5375,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-71,-578],
                            [-140,-578],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid432",
                            "background-position",
                            5416,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-140,-578],
                            [-209,-578],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid433",
                            "background-position",
                            5458,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-209,-578],
                            [-278,-578],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid434",
                            "background-position",
                            5500,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-278,-578],
                            [-347,-578],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid435",
                            "background-position",
                            5541,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-347,-578],
                            [-416,-578],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid436",
                            "background-position",
                            5583,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-416,-578],
                            [-485,-578],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid437",
                            "background-position",
                            5625,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-485,-578],
                            [-554,-578],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid438",
                            "background-position",
                            5666,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-554,-578],
                            [-623,-578],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid439",
                            "background-position",
                            5708,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-623,-578],
                            [-692,-578],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid440",
                            "background-position",
                            5750,
                            0,
                            "linear",
                            "${anim_hint}",
                            [-692,-578],
                            [-2,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ]
                    ]
                }
            },
            "Answer_Template_Large": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'text',
                            rect: ['0px', '37px', '49px', '65px', 'auto', 'auto'],
                            textStyle: ['', '', '51px', '', ''],
                            id: 'TitleABC',
                            text: 'B',
                            align: 'center',
                            font: ['open-sans-condensed, sans-serif', [30, 'px'], 'rgba(255,255,255,1)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', 'normal']
                        },
                        {
                            type: 'text',
                            rect: ['49px', '9px', '459px', '114px', 'auto', 'auto'],
                            id: 'QestionText',
                            text: 'Доза должна подбираться для каждого больного индивидуально. Рекомендуемая начальная суточная доза – 15 мг (5 мг утром и 10 мг вечером); ее можно повышать по 5 мг в сутки каждые два или три дня. Обычная суточная доза 20-30 мг в день',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [20, 'px'], 'rgba(255,255,255,1)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', 'normal']
                        },
                        {
                            rect: ['0px', '0px', '520px', '130px', 'auto', 'auto'],
                            type: 'rect',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            id: 'Rectangle3',
                            opacity: '0',
                            cursor: 'pointer',
                            fill: ['rgba(192,192,192,1)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '520px', '130px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "Hint1_2": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(192,239,206,1.00)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '40px', '631px', '78px', 'auto', 'auto'],
                            id: 'Text4',
                            text: 'Спитомин (буспирон) применяется только для курсового лечения. Эпизодический прием не дает клинического эффекта.',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '134px', '366px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '163px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['32px', '163px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy3',
                            text: 'А',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'rect',
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            rect: ['307px', '115px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto']
                        },
                        {
                            type: 'image',
                            id: 'hint_body2',
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ],
                        [
                            "eid635",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '163px',
                            '163px'
                        ],
                        [
                            "eid641",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '115px',
                            '115px'
                        ],
                        [
                            "eid636",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '163px',
                            '163px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid634",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '134px',
                            '134px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ]
                    ]
                }
            },
            "Hint1_3": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '32px', '631px', '105px', 'auto', 'auto'],
                            id: 'Text4',
                            text: 'Для минимизации риска возникновения побочных эффектов в начале лечения, следует подбирать схему лечения Спитомином (буспироном) для каждого пациента  индивидуально, постепенно титруя согласно схеме назначения в инструкции по медицинскому применению.',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '141px', '366px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '170px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['32px', '170px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy3',
                            text: 'B',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            rect: ['307px', '122px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid672",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '170px',
                            '170px'
                        ],
                        [
                            "eid669",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '122px',
                            '122px'
                        ],
                        [
                            "eid670",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '170px',
                            '170px'
                        ],
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid671",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '141px',
                            '141px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ]
                    ]
                }
            },
            "Hint1_4": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '299px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '288px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '32px', '631px', '105px', 'auto', 'auto'],
                            id: 'Text4',
                            text: 'Благодаря особенностям механизма действия, терапевтический эффект Спитомина (буспирон) развивается постепенно и отмечается через 7-14 дней от начала лечения. Поэтому Спитомин не следует применять для купирования острой приступообразной тревоги, например, панических атак. В то же время Спитомин применяется для купирования фоновой тревоги (тревожное ожидание) при панических расстройствах.',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '201px', '366px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '230px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['32px', '230px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy3',
                            text: 'B',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            rect: ['307px', '188px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid679",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '230px',
                            '230px'
                        ],
                        [
                            "eid681",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '188px',
                            '188px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ],
                        [
                            "eid680",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '201px',
                            '201px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid678",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '230px',
                            '230px'
                        ],
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ]
                    ]
                }
            },
            "Hint1_5": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '32px', '631px', '105px', 'auto', 'auto'],
                            id: 'Text4',
                            text: 'Благодаря хорошей переносимости лечения, отсутствия аддиктивного потенциала (отсутствие риска толерантности, лекарственной зависимости и синдрома отмены) продолжительность курса лечения Спитомином может быть ограничена только медицинскими показаниями.',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '141px', '366px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '170px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['32px', '170px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy3',
                            text: 'C',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            rect: ['307px', '122px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid672",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '170px',
                            '170px'
                        ],
                        [
                            "eid669",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '122px',
                            '122px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ],
                        [
                            "eid671",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '141px',
                            '141px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid670",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '170px',
                            '170px'
                        ],
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ]
                    ]
                }
            },
            "Hint1_6": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '32px', '631px', '105px', 'auto', 'auto'],
                            id: 'Text4',
                            text: 'Благодаря уникальному механизму действия буспирона (серотонинергическое и дофаминергическое действие), Спитомин применяется для лечения как тревожных, так и вспомогательной терапии депрессивных расстройств (препарат не назначается для монотерапии депрессии)',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '141px', '366px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '170px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['32px', '170px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy3',
                            text: 'B',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            rect: ['307px', '122px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ],
                        [
                            "eid672",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '170px',
                            '170px'
                        ],
                        [
                            "eid669",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '122px',
                            '122px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ],
                        [
                            "eid670",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '170px',
                            '170px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid671",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '141px',
                            '141px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ]
                    ]
                }
            },
            "Hint1_7": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '367px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '354px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '278px', '366px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '307px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['30px', '307px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy3',
                            text: 'C',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '32px', '631px', '238px', 'auto', 'auto'],
                            id: 'Text4',
                            text: 'Благодаря уникальному механизму действия буспирона (серотонинергическое\rи дофаминергическое действие), буспирон не оказывает существенного эффекта на бензодиазепиновые рецепторы и не влияет на связывание ГАМК.\r<br>Поэтому при применении Спитомина выраженный противотревожный эффект не сопровождается избыточной седацией, свойственной другим анксиолитикам, таким как бензодиазепины.<br>\rТак как Спитомин не обладает седативным, снотворным эффектами и отрицательным влиянием на психомоторные функции, то он может применяться для лечения тревоги людьми, ведущими активный образ жизни.',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            rect: ['305px', '259px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ],
                        [
                            "eid688",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '30px',
                            '30px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ],
                        [
                            "eid704",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid703",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '259px',
                            '259px'
                        ],
                        [
                            "eid702",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid705",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '278px',
                            '278px'
                        ],
                        [
                            "eid686",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-89px',
                            '-89px'
                        ],
                        [
                            "eid682",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-89px',
                            '-89px'
                        ],
                        [
                            "eid684",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '305px',
                            '305px'
                        ]
                    ]
                }
            },
            "Hint1_8": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '324px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '314px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['-89px', '242px', '366px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['-89px', '271px', '118px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['30px', '271px', '118px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy3',
                            text: 'D',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['305px', '223px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['-89px', '32px', '631px', '210px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4',
                            text: 'Благодаря уникальному механизму действия буспирона (серотонинергическое и дофаминергическое действие), буспирон не оказывает существенного эффекта на  бензодиазепиновые рецепторы и не влияет на связывание ГАМК.\r<br>Поэтому при применении Спитомина длительными курсами выраженный противотревожный эффект не сопровождается риском развития толерантности, лекарственной зависимости и синдромом «отмены».<br>Этим Спитомин выгодно отличается от классических анксиолитиков бензодиазепинового ряда.',
                            align: 'justify',
                            type: 'text'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ],
                        [
                            "eid688",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '30px',
                            '30px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid712",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '271px',
                            '271px'
                        ],
                        [
                            "eid711",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '223px',
                            '223px'
                        ],
                        [
                            "eid710",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '271px',
                            '271px'
                        ],
                        [
                            "eid684",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '305px',
                            '305px'
                        ],
                        [
                            "eid682",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-89px',
                            '-89px'
                        ],
                        [
                            "eid686",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-89px',
                            '-89px'
                        ],
                        [
                            "eid713",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '242px',
                            '242px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ]
                    ]
                }
            },
            "Hint1_9": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['-89px', '40px', '631px', '78px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4',
                            text: 'Спитомин не обладает аддиктивным потенциалом, поэтому не подлежит предметно-количественному учету и может безопасно выписываться на обычных рецептурных бланках.',
                            align: 'justify',
                            type: 'text'
                        },
                        {
                            rect: ['-87px', '134px', '366px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['-87px', '163px', '118px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['32px', '163px', '118px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy3',
                            text: 'А',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['307px', '115px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['187px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '187px',
                            '187px'
                        ],
                        [
                            "eid635",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '163px',
                            '163px'
                        ],
                        [
                            "eid641",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '115px',
                            '115px'
                        ],
                        [
                            "eid636",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '163px',
                            '163px'
                        ],
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid634",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '134px',
                            '134px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ]
                    ]
                }
            },
            "Hint1_10": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['-89px', '34px', '631px', '78px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4',
                            text: 'Благодаря уникальному механизму действия буспирона (серотонинергическое и дофаминергическое действие), буспирон обладает антидепрессивным эффектом и может эффективно применяться для усиления антидепрессивного действия СИОЗС (Dimitriou E., 1998)',
                            align: 'justify',
                            type: 'text'
                        },
                        {
                            rect: ['-87px', '140px', '366px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['-87px', '169px', '118px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['32px', '169px', '118px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy3',
                            text: 'B',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['307px', '121px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid721",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid720",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '121px',
                            '121px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ],
                        [
                            "eid719",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '140px',
                            '140px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid718",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ]
                    ]
                }
            },
            "Hint1_11": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '34px', '631px', '106px', 'auto', 'auto'],
                            id: 'Text4',
                            text: 'Благодаря уникальному механизму действия буспирона (серотонинергическое и дофаминергическое действие), дополнительным преимуществом буспирона является уменьшение частоты сексуальных расстройств, вызванных приемом СИОЗС (Landen M, 1999)',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '140px', '366px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '169px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['32px', '169px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy3',
                            text: 'A',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            rect: ['307px', '121px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ],
                        [
                            "eid721",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid720",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '121px',
                            '121px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ],
                        [
                            "eid718",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid719",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '140px',
                            '140px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ]
                    ]
                }
            },
            "Hint1_12": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '34px', '631px', '106px', 'auto', 'auto'],
                            id: 'Text4',
                            text: 'Благодаря уникальному механизму действия буспирона (серотонинергическое и дофаминергическое действие), буспирон обладает выраженным анксиолитическим эффектом, который по силе равен или превосходит противотревожный эффект диазепама (Goldberg H., 1979)',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '140px', '366px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '169px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['32px', '169px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy3',
                            text: 'B',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            rect: ['307px', '121px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ],
                        [
                            "eid721",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid720",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '121px',
                            '121px'
                        ],
                        [
                            "eid718",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid719",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '140px',
                            '140px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ]
                    ]
                }
            },
            "Hint1_13": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '140px', '366px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '34px', '631px', '106px', 'auto', 'auto'],
                            id: 'Text4',
                            text: 'Монотерапия буспироном не влияет на показатели психомоторной деятельности.\rОднако пациентов необходимо предупреждать о том, что вождение возможно лишь при полной уверенности пациента в своих психомоторных функциях, особенно в начале лечения.',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '169px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['32px', '169px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy3',
                            text: 'B',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            rect: ['307px', '121px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid721",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid720",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '121px',
                            '121px'
                        ],
                        [
                            "eid718",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid719",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '140px',
                            '140px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ]
                    ]
                }
            },
            "Hint1_14": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['-87px', '140px', '366px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['-89px', '34px', '631px', '106px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4',
                            text: 'В случае комбинированной терапии (совместное применение Спитомина и других препаратов) способность пациента управлять транспортными средствами и механизмами следует определять индивидуально в зависимости от реакции пациента на лечение и применение других препаратов.',
                            align: 'justify',
                            type: 'text'
                        },
                        {
                            rect: ['-87px', '169px', '118px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['32px', '169px', '118px', '48px', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            id: 'Text4Copy3',
                            text: 'B',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['307px', '121px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: false,
                    data: [
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ],
                        [
                            "eid721",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid720",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '121px',
                            '121px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ],
                        [
                            "eid719",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '140px',
                            '140px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid718",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ]
                    ]
                }
            },
            "Hint1_15": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-130px', '3px', '714px', '227px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['-124px', '5px', '702px', '217px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '140px', '366px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy',
                            text: 'Вы дали неверный ответ. ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [26, 'px'], 'rgba(0,80,152,1.00)', '700', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-89px', '34px', '631px', '106px', 'auto', 'auto'],
                            id: 'Text4',
                            text: '',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['-87px', '169px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy2',
                            text: 'Верный ответ: ',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            type: 'text',
                            rect: ['32px', '169px', '118px', '48px', 'auto', 'auto'],
                            id: 'Text4Copy3',
                            text: 'B',
                            align: 'left',
                            font: ['open-sans-condensed, sans-serif', [24, 'px'], 'rgba(0,80,152,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', '']
                        },
                        {
                            rect: ['307px', '121px', null, null, 'auto', 'auto'],
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            type: 'rect'
                        },
                        {
                            rect: ['194px', '-70px', '67px', '62px', 'auto', 'auto'],
                            id: 'anim_hint_symbol_12',
                            symbolName: 'anim_hint_symbol_1',
                            type: 'rect'
                        },
                        {
                            rect: ['195px', '-12px', '61px', '20px', 'auto', 'auto'],
                            id: 'hint_body2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/hint_body.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '497px', '270px']
                        }
                    }
                },
                timeline: {
                    duration: 5750,
                    autoPlay: true,
                    data: [
                        [
                            "eid642",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '307px',
                            '307px'
                        ],
                        [
                            "eid633",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '32px',
                            '32px'
                        ],
                        [
                            "eid628",
                            "font-size",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '26px',
                            '26px'
                        ],
                        [
                            "eid721",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy3}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid720",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '121px',
                            '121px'
                        ],
                        [
                            "eid631",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid605",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '-70px',
                            '-70px'
                        ],
                        [
                            "eid718",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy2}",
                            '169px',
                            '169px'
                        ],
                        [
                            "eid630",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '-87px',
                            '-87px'
                        ],
                        [
                            "eid719",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text4Copy}",
                            '140px',
                            '140px'
                        ],
                        [
                            "eid603",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_hint_symbol_12}",
                            '194px',
                            '194px'
                        ]
                    ]
                }
            },
            "Hint": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'Rectangle3',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            rect: ['0px', '0px', '1024px', '528px', 'auto', 'auto'],
                            fill: ['rgba(255,255,255,0.90)']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_15',
                            symbolName: 'Hint1_15',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_14',
                            symbolName: 'Hint1_14',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_13',
                            symbolName: 'Hint1_13',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_12',
                            symbolName: 'Hint1_12',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_11',
                            symbolName: 'Hint1_11',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_10',
                            symbolName: 'Hint1_10',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_9',
                            symbolName: 'Hint1_9',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_8',
                            symbolName: 'Hint1_8',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_7',
                            symbolName: 'Hint1_7',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_6',
                            symbolName: 'Hint1_6',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_5',
                            symbolName: 'Hint1_5',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_4',
                            symbolName: 'Hint1_4',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_3',
                            symbolName: 'Hint1_3',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_2',
                            symbolName: 'Hint1_2',
                            display: 'none',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Hint1_1',
                            symbolName: 'Hint1_1',
                            display: 'block',
                            rect: ['294px', '148px', null, null, 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '1016px', '1016px']
                        }
                    }
                },
                timeline: {
                    duration: 7500,
                    autoPlay: false,
                    data: [
                        [
                            "eid776",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_8}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid782",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid797",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid779",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_6}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid764",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_6}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid771",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_10}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid792",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_11}",
                            'none',
                            'none'
                        ],
                        [
                            "eid808",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_11}",
                            'none',
                            'none'
                        ],
                        [
                            "eid829",
                            "display",
                            5000,
                            0,
                            "linear",
                            "${Hint1_11}",
                            'none',
                            'block'
                        ],
                        [
                            "eid830",
                            "display",
                            5500,
                            0,
                            "linear",
                            "${Hint1_11}",
                            'block',
                            'none'
                        ],
                        [
                            "eid796",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_15}",
                            'none',
                            'none'
                        ],
                        [
                            "eid798",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_15}",
                            'none',
                            'none'
                        ],
                        [
                            "eid837",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${Hint1_15}",
                            'none',
                            'block'
                        ],
                        [
                            "eid838",
                            "display",
                            7500,
                            0,
                            "linear",
                            "${Hint1_15}",
                            'block',
                            'none'
                        ],
                        [
                            "eid789",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_8}",
                            'none',
                            'none'
                        ],
                        [
                            "eid805",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_8}",
                            'none',
                            'none'
                        ],
                        [
                            "eid823",
                            "display",
                            3500,
                            0,
                            "linear",
                            "${Hint1_8}",
                            'none',
                            'block'
                        ],
                        [
                            "eid824",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${Hint1_8}",
                            'block',
                            'none'
                        ],
                        [
                            "eid793",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_12}",
                            'none',
                            'none'
                        ],
                        [
                            "eid809",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_12}",
                            'none',
                            'none'
                        ],
                        [
                            "eid831",
                            "display",
                            5500,
                            0,
                            "linear",
                            "${Hint1_12}",
                            'none',
                            'block'
                        ],
                        [
                            "eid832",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${Hint1_12}",
                            'block',
                            'none'
                        ],
                        [
                            "eid756",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_10}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid772",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_12}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid758",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_13}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid754",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_9}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid780",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_5}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid786",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_5}",
                            'none',
                            'none'
                        ],
                        [
                            "eid802",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_5}",
                            'none',
                            'none'
                        ],
                        [
                            "eid817",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${Hint1_5}",
                            'none',
                            'block'
                        ],
                        [
                            "eid818",
                            "display",
                            2500,
                            0,
                            "linear",
                            "${Hint1_5}",
                            'block',
                            'none'
                        ],
                        [
                            "eid766",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_2}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid759",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_3}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid769",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_9}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid762",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_15}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid773",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_13}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid774",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_3}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid788",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_7}",
                            'none',
                            'none'
                        ],
                        [
                            "eid804",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_7}",
                            'none',
                            'none'
                        ],
                        [
                            "eid821",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${Hint1_7}",
                            'none',
                            'block'
                        ],
                        [
                            "eid822",
                            "display",
                            3500,
                            0,
                            "linear",
                            "${Hint1_7}",
                            'block',
                            'none'
                        ],
                        [
                            "eid757",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_12}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid755",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_1}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid781",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_2}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid768",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_14}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid795",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_14}",
                            'none',
                            'none'
                        ],
                        [
                            "eid811",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_14}",
                            'none',
                            'none'
                        ],
                        [
                            "eid835",
                            "display",
                            6500,
                            0,
                            "linear",
                            "${Hint1_14}",
                            'none',
                            'block'
                        ],
                        [
                            "eid836",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${Hint1_14}",
                            'block',
                            'none'
                        ],
                        [
                            "eid791",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_10}",
                            'none',
                            'none'
                        ],
                        [
                            "eid807",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_10}",
                            'none',
                            'none'
                        ],
                        [
                            "eid827",
                            "display",
                            4500,
                            0,
                            "linear",
                            "${Hint1_10}",
                            'none',
                            'block'
                        ],
                        [
                            "eid828",
                            "display",
                            5000,
                            0,
                            "linear",
                            "${Hint1_10}",
                            'block',
                            'none'
                        ],
                        [
                            "eid753",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_14}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid765",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_5}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid763",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_7}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid761",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_8}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid752",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_4}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid794",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_13}",
                            'none',
                            'none'
                        ],
                        [
                            "eid810",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_13}",
                            'none',
                            'none'
                        ],
                        [
                            "eid833",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${Hint1_13}",
                            'none',
                            'block'
                        ],
                        [
                            "eid834",
                            "display",
                            6500,
                            0,
                            "linear",
                            "${Hint1_13}",
                            'block',
                            'none'
                        ],
                        [
                            "eid770",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_1}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid767",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_4}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid787",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_6}",
                            'none',
                            'none'
                        ],
                        [
                            "eid803",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_6}",
                            'none',
                            'none'
                        ],
                        [
                            "eid819",
                            "display",
                            2500,
                            0,
                            "linear",
                            "${Hint1_6}",
                            'none',
                            'block'
                        ],
                        [
                            "eid820",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${Hint1_6}",
                            'block',
                            'none'
                        ],
                        [
                            "eid778",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_7}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid783",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid799",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid812",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${Hint1_2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid760",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Hint1_11}",
                            '148px',
                            '148px'
                        ],
                        [
                            "eid784",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_3}",
                            'none',
                            'none'
                        ],
                        [
                            "eid800",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_3}",
                            'none',
                            'none'
                        ],
                        [
                            "eid813",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${Hint1_3}",
                            'none',
                            'block'
                        ],
                        [
                            "eid814",
                            "display",
                            1500,
                            0,
                            "linear",
                            "${Hint1_3}",
                            'block',
                            'none'
                        ],
                        [
                            "eid790",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_9}",
                            'none',
                            'none'
                        ],
                        [
                            "eid806",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_9}",
                            'none',
                            'none'
                        ],
                        [
                            "eid825",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${Hint1_9}",
                            'none',
                            'block'
                        ],
                        [
                            "eid826",
                            "display",
                            4500,
                            0,
                            "linear",
                            "${Hint1_9}",
                            'block',
                            'none'
                        ],
                        [
                            "eid777",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_15}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid775",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Hint1_11}",
                            '294px',
                            '294px'
                        ],
                        [
                            "eid785",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Hint1_4}",
                            'none',
                            'none'
                        ],
                        [
                            "eid801",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Hint1_4}",
                            'none',
                            'none'
                        ],
                        [
                            "eid815",
                            "display",
                            1500,
                            0,
                            "linear",
                            "${Hint1_4}",
                            'none',
                            'block'
                        ],
                        [
                            "eid816",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${Hint1_4}",
                            'block',
                            'none'
                        ]
                    ]
                }
            },
            "Grati": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '1024px', '528px', 'auto', 'auto'],
                            id: 'Rectangle3',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.90)']
                        },
                        {
                            rect: ['164px', '151px', '714px', '373px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)'],
                            id: 'RoundRect2Copy',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(192,239,206,1.00)']
                        },
                        {
                            rect: ['170px', '153px', '702px', '363px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [48, 'px'], 'rgba(0,80,152,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            id: 'header',
                            text: 'Вы настоящий профессионал!',
                            align: 'center',
                            rect: ['208px', '180px', '631px', '78px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [32, 'px'], 'rgba(0,80,152,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            id: 'textCong',
                            text: 'Вы дали правильный ответ',
                            align: 'center',
                            rect: ['208px', '241px', '631px', '78px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text1',
                            text: 'Таблетка Спитомина (буспирона) не имеет оболочки и на ней нанесена\rспециальная риска для деления таблетки 10мг на две части по 5 мг для титрования дозы.',
                            display: 'block',
                            rect: ['196px', '410px', '650px', '47px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text2',
                            text: 'Спитомин (буспирон) применяется только для курсового лечения. Эпизодический прием не дает клинического эффекта.',
                            display: 'none',
                            rect: ['196px', '410px', '650px', '47px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text3',
                            text: 'Для минимизации риска возникновения побочных эффектов в начале лечения, следует подбирать схему лечения Спитомином (буспироном) для каждого пациента  индивидуально, постепенно титруя согласно схеме назначения в инструкции по медицинскому применению.',
                            display: 'none',
                            rect: ['196px', '410px', '650px', '71px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text4',
                            text: 'Благодаря особенностям механизма действия, терапевтический эффект Спитомина (буспирон) развивается постепенно и отмечается через 7-14 дней от начала лечения. Поэтому Спитомин не следует применять для купирования острой приступообразной тревоги, например, панических атак. В то же время Спитомин применяется для купирования фоновой тревоги (тревожное ожидание) при панических расстройствах.',
                            display: 'none',
                            rect: ['196px', '395px', '650px', '113px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text5',
                            text: 'Благодаря хорошей переносимости лечения, отсутствия аддиктивного потенциала (отсутствие риска толерантности, лекарственной зависимости и синдрома отмены) продолжительность курса лечения Спитомином может быть ограничена только медицинскими показаниями.',
                            display: 'none',
                            rect: ['196px', '407px', '650px', '64px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text6',
                            text: 'Благодаря уникальному механизму действия буспирона (влияние на серотонинергическую и дофаминергическую системы), Спитомин применяется для лечения как тревожных, так и вспомогательной терапии депрессивных расстройств (препарат не назначается для монотерапии депрессии)',
                            display: 'none',
                            rect: ['196px', '407px', '650px', '96px', 'auto', 'auto']
                        },
                        {
                            type: 'text',
                            id: 'Text7',
                            textStyle: ['', '', '18px', '', ''],
                            rect: ['186px', '370px', '670px', '146px', 'auto', 'auto'],
                            display: 'none',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            text: 'Благодаря уникальному механизму действия буспирона (влияние на серотонинергическую и дофаминергическую системы), буспирон не оказывает существенного эффекта на бензодиазепиновые рецепторы и не влияет на связывание ГАМК.<br>Поэтому при применении Спитомина выраженный противотревожный эффект не сопровождается избыточной седацией, свойственной другим анксиолитикам, таким как бензодиазепины.<br>Так как Спитомин не обладает седативным, снотворным эффектами и отрицательным влиянием на психомоторные функции, то он может применяться для лечения тревоги людьми, ведущими активный образ жизни.'
                        },
                        {
                            type: 'text',
                            id: 'Text8',
                            textStyle: ['', '', '19px', '', ''],
                            rect: ['186px', '374px', '670px', '133px', 'auto', 'auto'],
                            display: 'none',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            text: 'Благодаря уникальному механизму действия буспирона (влияние на серотонинергическую и дофаминергическую системы), буспирон не оказывает существенного эффекта на  бензодиазепиновые рецепторы и не влияет на связывание ГАМК.<br>Поэтому при применении Спитомина длительными курсами выраженный противотревожный эффект не сопровождается риском развития толерантности, лекарственной зависимости и синдромом «отмены». Этим Спитомин выгодно отличается от классических анксиолитиков бензодиазепинового ряда.'
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text9',
                            text: 'Спитомин не обладает аддиктивным потенциалом, поэтому не подлежит предметно-количественному учету и может безопасно выписываться на обычных рецептурных бланках.',
                            display: 'none',
                            rect: ['196px', '410px', '650px', '51px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text10',
                            text: 'Благодаря уникальному механизму действия буспирона (влияние на серотонинергическую и дофаминергическую системы), буспирон обладает антидепрессивным эффектом и может эффективно применяться для усиления антидепрессивного действия СИОЗС (Dimitriou E., 1998)',
                            display: 'none',
                            rect: ['195px', '410px', '650px', '74px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text11',
                            text: 'Благодаря уникальному механизму действия буспирона (влияние на серотонинергическую и дофаминергическую системы), дополнительным преимуществом буспирона является уменьшение частоты сексуальных расстройств, вызванных приемом СИОЗС (Landen M, 1999)',
                            display: 'none',
                            rect: ['196px', '410px', '650px', '78px', 'auto', 'auto']
                        },
                        {
                            type: 'text',
                            id: 'Text12',
                            textStyle: ['0', '', '', '', ''],
                            rect: ['196px', '410px', '650px', '96px', 'auto', 'auto'],
                            display: 'none',
                            align: 'justify',
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            text: 'Благодаря уникальному механизму действия буспирона (влияние на серотонинергическую и дофаминергическую системы), буспирон обладает выраженным анксиолитическим эффектом, который по силе равен или превосходит противотревожный эффект диазепама к 7-14 дню терапии.(Goldberg H., 1979)'
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text13',
                            text: 'Монотерапия буспироном не влияет на показатели психомоторной деятельности.\rОднако пациентов необходимо предупреждать о том, что вождение возможно лишь при полной уверенности пациента в своих психомоторных функциях, особенно в начале лечения.',
                            display: 'none',
                            rect: ['196px', '410px', '650px', '81px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text14',
                            text: 'В случае комбинированной терапии (совместное применение Спитомина и других препаратов) способность пациента управлять транспортными средствами и механизмами следует определять индивидуально в зависимости от реакции пациента на лечение и применение других препаратов.',
                            display: 'none',
                            rect: ['196px', '410px', '650px', '96px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [16, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            align: 'justify',
                            id: 'Text15',
                            text: 'Инструкция по медицинскому применению не запрещает употреблять любые овощи и фрукты, а также соки из них при приеме Спитомина, но ограничивает употребление в значительных количествах грейпфрутов и грейпфрутового сока.',
                            display: 'none',
                            rect: ['196px', '410px', '650px', '70px', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Button_Continue2',
                            symbolName: 'Button_Continue',
                            rect: ['396px', '278px', null, null, 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'anim_congratulation_symbol_1',
                            symbolName: 'anim_congratulation_symbol_1',
                            rect: ['487px', '83px', '69px', '81px', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '1024px', '768px']
                        }
                    }
                },
                timeline: {
                    duration: 7500,
                    autoPlay: false,
                    data: [
                        [
                            "eid1042",
                            "width",
                            3500,
                            0,
                            "linear",
                            "${Text8}",
                            '670px',
                            '670px'
                        ],
                        [
                            "eid990",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2142",
                            "top",
                            500,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2143",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2144",
                            "top",
                            1500,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2145",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2146",
                            "top",
                            2500,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2147",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2148",
                            "top",
                            3500,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2149",
                            "top",
                            4000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2150",
                            "top",
                            4500,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2151",
                            "top",
                            5000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2152",
                            "top",
                            5500,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2153",
                            "top",
                            6000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2154",
                            "top",
                            6500,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid2155",
                            "top",
                            7000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '83px',
                            '83px'
                        ],
                        [
                            "eid1018",
                            "width",
                            1500,
                            0,
                            "linear",
                            "${Text4}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1078",
                            "width",
                            6500,
                            0,
                            "linear",
                            "${Text14}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1893",
                            "height",
                            1000,
                            0,
                            "linear",
                            "${Text3}",
                            '71px',
                            '71px'
                        ],
                        [
                            "eid1035",
                            "height",
                            3000,
                            0,
                            "linear",
                            "${Text7}",
                            '146px',
                            '146px'
                        ],
                        [
                            "eid1064",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text12}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1065",
                            "display",
                            5500,
                            0,
                            "linear",
                            "${Text12}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1066",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${Text12}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1015",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text4}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1016",
                            "display",
                            1500,
                            0,
                            "linear",
                            "${Text4}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1017",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${Text4}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1898",
                            "top",
                            2500,
                            0,
                            "linear",
                            "${Text6}",
                            '407px',
                            '407px'
                        ],
                        [
                            "eid1004",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Text1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1070",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text13}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1071",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${Text13}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1072",
                            "display",
                            6500,
                            0,
                            "linear",
                            "${Text13}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1008",
                            "width",
                            500,
                            0,
                            "linear",
                            "${Text2}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1067",
                            "height",
                            5500,
                            0,
                            "linear",
                            "${Text12}",
                            '96px',
                            '96px'
                        ],
                        [
                            "eid1644",
                            "width",
                            0,
                            0,
                            "easeInSine",
                            "${Text1}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1007",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1006",
                            "display",
                            500,
                            0,
                            "linear",
                            "${Text2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1005",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${Text2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1038",
                            "height",
                            3500,
                            0,
                            "linear",
                            "${Text8}",
                            '133px',
                            '133px'
                        ],
                        [
                            "eid2125",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${textCong}",
                            '241px',
                            '241px'
                        ],
                        [
                            "eid2126",
                            "top",
                            3500,
                            0,
                            "linear",
                            "${textCong}",
                            '241px',
                            '241px'
                        ],
                        [
                            "eid1082",
                            "height",
                            7000,
                            0,
                            "linear",
                            "${Text15}",
                            '70px',
                            '70px'
                        ],
                        [
                            "eid1074",
                            "height",
                            6500,
                            0,
                            "linear",
                            "${Text14}",
                            '96px',
                            '96px'
                        ],
                        [
                            "eid1891",
                            "left",
                            3000,
                            0,
                            "linear",
                            "${Text7}",
                            '186px',
                            '186px'
                        ],
                        [
                            "eid1068",
                            "width",
                            5500,
                            0,
                            "linear",
                            "${Text12}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1075",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text14}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1076",
                            "display",
                            6500,
                            0,
                            "linear",
                            "${Text14}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1077",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${Text14}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1031",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text7}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1032",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${Text7}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1033",
                            "display",
                            3500,
                            0,
                            "linear",
                            "${Text7}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1049",
                            "width",
                            4000,
                            0,
                            "linear",
                            "${Text9}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1079",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text15}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1080",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${Text15}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1081",
                            "display",
                            7500,
                            0,
                            "linear",
                            "${Text15}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1021",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text5}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1022",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${Text5}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1023",
                            "display",
                            2500,
                            0,
                            "linear",
                            "${Text5}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1896",
                            "height",
                            1500,
                            0,
                            "linear",
                            "${Text4}",
                            '113px',
                            '113px'
                        ],
                        [
                            "eid1063",
                            "width",
                            5000,
                            0,
                            "linear",
                            "${Text11}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1062",
                            "height",
                            5000,
                            0,
                            "linear",
                            "${Text11}",
                            '78px',
                            '78px'
                        ],
                        [
                            "eid2100",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2099",
                            "top",
                            505,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2098",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2097",
                            "top",
                            1500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2101",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2102",
                            "top",
                            2500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2103",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2104",
                            "top",
                            3500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2105",
                            "top",
                            4000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2106",
                            "top",
                            4500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2107",
                            "top",
                            5000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2108",
                            "top",
                            5500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2109",
                            "top",
                            6000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2110",
                            "top",
                            6500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid2111",
                            "top",
                            7000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '151px',
                            '151px'
                        ],
                        [
                            "eid1003",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid2131",
                            "top",
                            500,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid2132",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid2133",
                            "top",
                            1500,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid2134",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid2135",
                            "top",
                            2500,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid2128",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '276px'
                        ],
                        [
                            "eid2129",
                            "top",
                            3500,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '276px',
                            '276px'
                        ],
                        [
                            "eid2130",
                            "top",
                            4000,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '276px',
                            '298px'
                        ],
                        [
                            "eid2136",
                            "top",
                            4500,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid2137",
                            "top",
                            5000,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid2138",
                            "top",
                            5500,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid2139",
                            "top",
                            6000,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid2140",
                            "top",
                            6500,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid2141",
                            "top",
                            7000,
                            0,
                            "linear",
                            "${Button_Continue2}",
                            '298px',
                            '298px'
                        ],
                        [
                            "eid1069",
                            "height",
                            6000,
                            0,
                            "linear",
                            "${Text13}",
                            '81px',
                            '81px'
                        ],
                        [
                            "eid1027",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text6}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1028",
                            "display",
                            2500,
                            0,
                            "linear",
                            "${Text6}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1029",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${Text6}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1039",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text8}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1040",
                            "display",
                            3500,
                            0,
                            "linear",
                            "${Text8}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1041",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${Text8}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1059",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text11}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1060",
                            "display",
                            5000,
                            0,
                            "linear",
                            "${Text11}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1061",
                            "display",
                            5500,
                            0,
                            "linear",
                            "${Text11}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1034",
                            "width",
                            3000,
                            0,
                            "linear",
                            "${Text7}",
                            '670px',
                            '670px'
                        ],
                        [
                            "eid1892",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Text7}",
                            '370px',
                            '370px'
                        ],
                        [
                            "eid1897",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${Text5}",
                            '407px',
                            '407px'
                        ],
                        [
                            "eid2124",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${header}",
                            '180px',
                            '180px'
                        ],
                        [
                            "eid2127",
                            "top",
                            3500,
                            0,
                            "linear",
                            "${header}",
                            '180px',
                            '180px'
                        ],
                        [
                            "eid1056",
                            "width",
                            4500,
                            0,
                            "linear",
                            "${Text10}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1009",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text3}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1010",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${Text3}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1011",
                            "display",
                            1500,
                            0,
                            "linear",
                            "${Text3}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1024",
                            "width",
                            2000,
                            0,
                            "linear",
                            "${Text5}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1030",
                            "width",
                            2500,
                            0,
                            "linear",
                            "${Text6}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1073",
                            "width",
                            6000,
                            0,
                            "linear",
                            "${Text13}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1053",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text10}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1054",
                            "display",
                            4500,
                            0,
                            "linear",
                            "${Text10}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1055",
                            "display",
                            5000,
                            0,
                            "linear",
                            "${Text10}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1048",
                            "height",
                            4000,
                            0,
                            "linear",
                            "${Text9}",
                            '51px',
                            '51px'
                        ],
                        [
                            "eid2113",
                            "height",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '328px',
                            '328px'
                        ],
                        [
                            "eid1001",
                            "height",
                            500,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '328px',
                            '328px'
                        ],
                        [
                            "eid1014",
                            "height",
                            1000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '335px',
                            '353px'
                        ],
                        [
                            "eid1020",
                            "height",
                            1500,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '380px',
                            '367px'
                        ],
                        [
                            "eid1025",
                            "height",
                            2000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '367px',
                            '349px'
                        ],
                        [
                            "eid1900",
                            "height",
                            2500,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '349px',
                            '363px'
                        ],
                        [
                            "eid1037",
                            "height",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '338px',
                            '375px'
                        ],
                        [
                            "eid1044",
                            "height",
                            3500,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '375px',
                            '367px'
                        ],
                        [
                            "eid1050",
                            "height",
                            4000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '367px',
                            '330px'
                        ],
                        [
                            "eid1058",
                            "height",
                            4500,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '330px',
                            '352px'
                        ],
                        [
                            "eid2114",
                            "height",
                            5000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '352px',
                            '352px'
                        ],
                        [
                            "eid2115",
                            "height",
                            5500,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '367px',
                            '367px'
                        ],
                        [
                            "eid2116",
                            "height",
                            6000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '350px',
                            '350px'
                        ],
                        [
                            "eid2117",
                            "height",
                            6500,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '367px',
                            '367px'
                        ],
                        [
                            "eid2118",
                            "height",
                            7000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '347px',
                            '347px'
                        ],
                        [
                            "eid1012",
                            "width",
                            1000,
                            0,
                            "linear",
                            "${Text3}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid2112",
                            "height",
                            0,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '338px',
                            '338px'
                        ],
                        [
                            "eid1000",
                            "height",
                            500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '338px',
                            '338px'
                        ],
                        [
                            "eid1013",
                            "height",
                            1000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '344px',
                            '363px'
                        ],
                        [
                            "eid1019",
                            "height",
                            1500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '391px',
                            '377px'
                        ],
                        [
                            "eid1026",
                            "height",
                            2000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '377px',
                            '359px'
                        ],
                        [
                            "eid1901",
                            "height",
                            2500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '359px',
                            '373px'
                        ],
                        [
                            "eid1036",
                            "height",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '380px',
                            '385px'
                        ],
                        [
                            "eid1043",
                            "height",
                            3500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '385px',
                            '377px'
                        ],
                        [
                            "eid1051",
                            "height",
                            4000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '377px',
                            '340px'
                        ],
                        [
                            "eid1057",
                            "height",
                            4500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '340px',
                            '362px'
                        ],
                        [
                            "eid2119",
                            "height",
                            5000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '362px',
                            '362px'
                        ],
                        [
                            "eid2120",
                            "height",
                            5500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '377px',
                            '377px'
                        ],
                        [
                            "eid2121",
                            "height",
                            6000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '360px',
                            '360px'
                        ],
                        [
                            "eid2122",
                            "height",
                            6500,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '377px',
                            '377px'
                        ],
                        [
                            "eid2123",
                            "height",
                            7000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '357px',
                            '357px'
                        ],
                        [
                            "eid1052",
                            "height",
                            4500,
                            0,
                            "linear",
                            "${Text10}",
                            '74px',
                            '74px'
                        ],
                        [
                            "eid1899",
                            "top",
                            3500,
                            0,
                            "linear",
                            "${Text8}",
                            '374px',
                            '374px'
                        ],
                        [
                            "eid1045",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Text9}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1046",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${Text9}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1047",
                            "display",
                            4500,
                            0,
                            "linear",
                            "${Text9}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1894",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${Text3}",
                            '410px',
                            '410px'
                        ],
                        [
                            "eid1083",
                            "width",
                            7000,
                            0,
                            "linear",
                            "${Text15}",
                            '650px',
                            '650px'
                        ],
                        [
                            "eid1895",
                            "top",
                            1500,
                            0,
                            "linear",
                            "${Text4}",
                            '395px',
                            '395px'
                        ]
                    ]
                }
            },
            "anim_congratulation_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '512px', '572px', 'auto', 'auto'],
                            id: 'anim_congratulation',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/anim_congratulation.png', '0px', '0px', '512px', '572px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '69px', '81px']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: true,
                    data: [
                        [
                            "eid876",
                            "width",
                            0,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '0px',
                            '68px'
                        ],
                        [
                            "eid922",
                            "width",
                            1266,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '68px',
                            '67px'
                        ],
                        [
                            "eid925",
                            "width",
                            1333,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '67px',
                            '68px'
                        ],
                        [
                            "eid929",
                            "width",
                            1433,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '68px',
                            '67px'
                        ],
                        [
                            "eid932",
                            "width",
                            1466,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '67px',
                            '68px'
                        ],
                        [
                            "eid938",
                            "width",
                            1600,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '68px',
                            '67px'
                        ],
                        [
                            "eid941",
                            "width",
                            1666,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '67px',
                            '68px'
                        ],
                        [
                            "eid945",
                            "width",
                            1766,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '68px',
                            '67px'
                        ],
                        [
                            "eid948",
                            "width",
                            1800,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '67px',
                            '68px'
                        ],
                        [
                            "eid921",
                            "left",
                            1266,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '0px',
                            '1px'
                        ],
                        [
                            "eid931",
                            "left",
                            1466,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '1px',
                            '0px'
                        ],
                        [
                            "eid937",
                            "left",
                            1600,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '0px',
                            '1px'
                        ],
                        [
                            "eid947",
                            "left",
                            1800,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '1px',
                            '0px'
                        ],
                        [
                            "eid877",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [0,0],
                            [-142,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid879",
                            "background-position",
                            33,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-2],
                            [-2,-85],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid881",
                            "background-position",
                            66,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-2,-85],
                            [-2,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid883",
                            "background-position",
                            100,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-2,-2],
                            [-72,-84],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid885",
                            "background-position",
                            133,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-72,-84],
                            [-142,-82],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid887",
                            "background-position",
                            166,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-82],
                            [-2,-329],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid889",
                            "background-position",
                            200,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-2,-329],
                            [-142,-161],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid890",
                            "background-position",
                            233,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-161],
                            [-212,-81],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid891",
                            "background-position",
                            266,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-81],
                            [-282,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid892",
                            "background-position",
                            300,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-2],
                            [-2,-404],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid893",
                            "background-position",
                            333,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-2,-404],
                            [-72,-319],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid894",
                            "background-position",
                            366,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-72,-319],
                            [-142,-232],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid895",
                            "background-position",
                            400,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-232],
                            [-212,-152],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid896",
                            "background-position",
                            433,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-152],
                            [-282,-73],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid897",
                            "background-position",
                            466,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-73],
                            [-352,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid898",
                            "background-position",
                            500,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-352,-2],
                            [-2,-475],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid899",
                            "background-position",
                            533,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-2,-475],
                            [-72,-390],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid900",
                            "background-position",
                            566,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-72,-390],
                            [-142,-232],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid901",
                            "background-position",
                            600,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-232],
                            [-212,-152],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid902",
                            "background-position",
                            633,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-152],
                            [-142,-303],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid903",
                            "background-position",
                            666,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-303],
                            [-212,-223],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid904",
                            "background-position",
                            700,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-223],
                            [-2,-404],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid905",
                            "background-position",
                            733,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-2,-404],
                            [-72,-319],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid906",
                            "background-position",
                            766,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-72,-319],
                            [-142,-232],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid907",
                            "background-position",
                            800,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-232],
                            [-212,-152],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid908",
                            "background-position",
                            833,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-152],
                            [-142,-303],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid909",
                            "background-position",
                            866,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-303],
                            [-212,-223],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid910",
                            "background-position",
                            900,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-223],
                            [-2,-404],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid911",
                            "background-position",
                            933,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-2,-404],
                            [-72,-319],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid912",
                            "background-position",
                            966,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-72,-319],
                            [-142,-232],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid913",
                            "background-position",
                            1000,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-232],
                            [-212,-152],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid914",
                            "background-position",
                            1033,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-152],
                            [-142,-303],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid915",
                            "background-position",
                            1066,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-303],
                            [-212,-223],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid916",
                            "background-position",
                            1100,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-223],
                            [-2,-404],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid917",
                            "background-position",
                            1133,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-2,-404],
                            [-72,-319],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid918",
                            "background-position",
                            1166,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-72,-319],
                            [-142,-232],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid919",
                            "background-position",
                            1200,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-232],
                            [-282,-144],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid920",
                            "background-position",
                            1233,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-144],
                            [-352,-73],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid923",
                            "background-position",
                            1266,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-352,-73],
                            [-282,-499],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid924",
                            "background-position",
                            1300,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-499],
                            [-351,-499],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid926",
                            "background-position",
                            1333,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-351,-499],
                            [-422,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid927",
                            "background-position",
                            1366,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-422,-2],
                            [-72,-461],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid928",
                            "background-position",
                            1400,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-72,-461],
                            [-142,-374],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid930",
                            "background-position",
                            1433,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-374],
                            [-422,-286],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid933",
                            "background-position",
                            1466,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-422,-286],
                            [-212,-294],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid934",
                            "background-position",
                            1500,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-294],
                            [-282,-215],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid935",
                            "background-position",
                            1533,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-215],
                            [-352,-144],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid936",
                            "background-position",
                            1566,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-352,-144],
                            [-422,-73],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid939",
                            "background-position",
                            1600,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-422,-73],
                            [-352,-357],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid940",
                            "background-position",
                            1633,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-352,-357],
                            [-352,-428],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid942",
                            "background-position",
                            1666,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-352,-428],
                            [-142,-445],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid943",
                            "background-position",
                            1700,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-142,-445],
                            [-212,-365],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid944",
                            "background-position",
                            1733,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-365],
                            [-282,-286],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid946",
                            "background-position",
                            1766,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-286],
                            [-420,-499],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid949",
                            "background-position",
                            1800,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-420,-499],
                            [-352,-215],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid950",
                            "background-position",
                            1833,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-352,-215],
                            [-422,-144],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid951",
                            "background-position",
                            1866,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-422,-144],
                            [-212,-436],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid952",
                            "background-position",
                            1900,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-436],
                            [-282,-215],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid953",
                            "background-position",
                            1933,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-215],
                            [-282,-357],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid954",
                            "background-position",
                            1966,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-357],
                            [-352,-286],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid955",
                            "background-position",
                            2000,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-352,-286],
                            [-282,-144],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid956",
                            "background-position",
                            2033,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-144],
                            [-422,-144],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid957",
                            "background-position",
                            2066,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-422,-144],
                            [-212,-436],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid958",
                            "background-position",
                            2100,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-436],
                            [-282,-215],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid959",
                            "background-position",
                            2133,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-215],
                            [-282,-357],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid960",
                            "background-position",
                            2166,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-357],
                            [-352,-286],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid961",
                            "background-position",
                            2200,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-352,-286],
                            [-282,-144],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid962",
                            "background-position",
                            2233,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-144],
                            [-422,-144],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid963",
                            "background-position",
                            2266,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-422,-144],
                            [-212,-436],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid964",
                            "background-position",
                            2300,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-436],
                            [-282,-215],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid965",
                            "background-position",
                            2333,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-215],
                            [-282,-357],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid966",
                            "background-position",
                            2366,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-357],
                            [-352,-286],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid967",
                            "background-position",
                            2400,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-352,-286],
                            [-282,-144],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid968",
                            "background-position",
                            2433,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-144],
                            [-422,-144],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid969",
                            "background-position",
                            2466,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-422,-144],
                            [-212,-436],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid970",
                            "background-position",
                            2500,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-436],
                            [-282,-215],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid971",
                            "background-position",
                            2533,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-215],
                            [-282,-357],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid972",
                            "background-position",
                            2566,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-357],
                            [-352,-286],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid973",
                            "background-position",
                            2600,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-352,-286],
                            [-282,-144],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid974",
                            "background-position",
                            2633,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-144],
                            [-422,-144],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid975",
                            "background-position",
                            2666,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-422,-144],
                            [-212,-436],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid976",
                            "background-position",
                            2700,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-436],
                            [-282,-215],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid977",
                            "background-position",
                            2733,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-215],
                            [-422,-215],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid978",
                            "background-position",
                            2766,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-422,-215],
                            [-282,-428],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid980",
                            "background-position",
                            2800,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-282,-428],
                            [-72,-245],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid982",
                            "background-position",
                            2833,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-72,-245],
                            [-212,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid984",
                            "background-position",
                            2866,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-212,-2],
                            [-72,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid985",
                            "background-position",
                            2900,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-72,-2],
                            [-2,-167],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid987",
                            "background-position",
                            2933,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-2,-167],
                            [-2,-249],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid988",
                            "background-position",
                            2966,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-2,-249],
                            [-72,-165],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid989",
                            "background-position",
                            3000,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            [-72,-165],
                            [-142,-2],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid875",
                            "height",
                            0,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '0px',
                            '78px'
                        ],
                        [
                            "eid878",
                            "height",
                            33,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '78px',
                            '80px'
                        ],
                        [
                            "eid880",
                            "height",
                            66,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '80px',
                            '81px'
                        ],
                        [
                            "eid882",
                            "height",
                            100,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '81px',
                            '79px'
                        ],
                        [
                            "eid884",
                            "height",
                            133,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '79px',
                            '77px'
                        ],
                        [
                            "eid886",
                            "height",
                            166,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '77px',
                            '73px'
                        ],
                        [
                            "eid888",
                            "height",
                            200,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '73px',
                            '69px'
                        ],
                        [
                            "eid979",
                            "height",
                            2800,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '69px',
                            '72px'
                        ],
                        [
                            "eid981",
                            "height",
                            2833,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '72px',
                            '77px'
                        ],
                        [
                            "eid983",
                            "height",
                            2866,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '77px',
                            '80px'
                        ],
                        [
                            "eid986",
                            "height",
                            2933,
                            0,
                            "linear",
                            "${anim_congratulation}",
                            '80px',
                            '78px'
                        ]
                    ]
                }
            },
            "pepl1_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '64px', '256px', 'auto', 'auto'],
                            id: 'pepl1',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/pepl1.png', '-2px', '-81px', '64px', '256px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '49px', '78px']
                        }
                    }
                },
                timeline: {
                    duration: 2666,
                    autoPlay: true,
                    data: [
                        [
                            "eid1088",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${pepl1}",
                            [0,0],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1092",
                            "background-position",
                            633,
                            0,
                            "linear",
                            "${pepl1}",
                            [-2,-1],
                            [-2,-81],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1096",
                            "background-position",
                            866,
                            0,
                            "linear",
                            "${pepl1}",
                            [-2,-81],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1100",
                            "background-position",
                            1066,
                            0,
                            "linear",
                            "${pepl1}",
                            [-2,-1],
                            [-2,-81],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1101",
                            "background-position",
                            2466,
                            0,
                            "linear",
                            "${pepl1}",
                            [-2,-81],
                            [-2,-158],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1102",
                            "background-position",
                            2666,
                            0,
                            "linear",
                            "${pepl1}",
                            [-2,-158],
                            [-2,-81],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1086",
                            "height",
                            0,
                            0,
                            "linear",
                            "${pepl1}",
                            '0px',
                            '75px'
                        ],
                        [
                            "eid1090",
                            "height",
                            633,
                            0,
                            "linear",
                            "${pepl1}",
                            '75px',
                            '75px'
                        ],
                        [
                            "eid1094",
                            "height",
                            866,
                            0,
                            "linear",
                            "${pepl1}",
                            '75px',
                            '78px'
                        ],
                        [
                            "eid1098",
                            "height",
                            1066,
                            0,
                            "linear",
                            "${pepl1}",
                            '78px',
                            '75px'
                        ],
                        [
                            "eid1089",
                            "top",
                            633,
                            0,
                            "linear",
                            "${pepl1}",
                            '0px',
                            '3px'
                        ],
                        [
                            "eid1093",
                            "top",
                            866,
                            0,
                            "linear",
                            "${pepl1}",
                            '3px',
                            '0px'
                        ],
                        [
                            "eid1097",
                            "top",
                            1066,
                            0,
                            "linear",
                            "${pepl1}",
                            '0px',
                            '3px'
                        ],
                        [
                            "eid1087",
                            "width",
                            0,
                            0,
                            "linear",
                            "${pepl1}",
                            '0px',
                            '48px'
                        ],
                        [
                            "eid1091",
                            "width",
                            633,
                            0,
                            "linear",
                            "${pepl1}",
                            '48px',
                            '49px'
                        ],
                        [
                            "eid1095",
                            "width",
                            866,
                            0,
                            "linear",
                            "${pepl1}",
                            '49px',
                            '48px'
                        ],
                        [
                            "eid1099",
                            "width",
                            1066,
                            0,
                            "linear",
                            "${pepl1}",
                            '48px',
                            '49px'
                        ]
                    ]
                }
            },
            "pepl2_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '128px', '128px', 'auto', 'auto'],
                            id: 'pepl2',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/pepl2.png', '-2px', '-1px', '128px', '128px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '45px', '75px']
                        }
                    }
                },
                timeline: {
                    duration: 1466,
                    autoPlay: true,
                    data: [
                        [
                            "eid1103",
                            "height",
                            0,
                            0,
                            "linear",
                            "${pepl2}",
                            '0px',
                            '75px'
                        ],
                        [
                            "eid1106",
                            "left",
                            933,
                            0,
                            "linear",
                            "${pepl2}",
                            '0px',
                            '1px'
                        ],
                        [
                            "eid1108",
                            "left",
                            1100,
                            0,
                            "linear",
                            "${pepl2}",
                            '1px',
                            '0px'
                        ],
                        [
                            "eid1110",
                            "left",
                            1300,
                            0,
                            "linear",
                            "${pepl2}",
                            '0px',
                            '1px'
                        ],
                        [
                            "eid1112",
                            "left",
                            1466,
                            0,
                            "linear",
                            "${pepl2}",
                            '1px',
                            '0px'
                        ],
                        [
                            "eid1105",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${pepl2}",
                            [0,0],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1107",
                            "background-position",
                            933,
                            0,
                            "linear",
                            "${pepl2}",
                            [-2,-1],
                            [-48,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1109",
                            "background-position",
                            1100,
                            0,
                            "linear",
                            "${pepl2}",
                            [-48,-1],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1111",
                            "background-position",
                            1300,
                            0,
                            "linear",
                            "${pepl2}",
                            [-2,-1],
                            [-48,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1113",
                            "background-position",
                            1466,
                            0,
                            "linear",
                            "${pepl2}",
                            [-48,-1],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1104",
                            "width",
                            0,
                            0,
                            "linear",
                            "${pepl2}",
                            '0px',
                            '44px'
                        ]
                    ]
                }
            },
            "pepl3_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '128px', '256px', 'auto', 'auto'],
                            id: 'pepl3',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/pepl3.png', '-2px', '-1px', '128px', '256px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '62px', '75px']
                        }
                    }
                },
                timeline: {
                    duration: 1800,
                    autoPlay: true,
                    data: [
                        [
                            "eid1116",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${pepl3}",
                            [0,0],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1117",
                            "background-position",
                            1600,
                            0,
                            "linear",
                            "${pepl3}",
                            [-2,-1],
                            [-2,-78],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1118",
                            "background-position",
                            1800,
                            0,
                            "linear",
                            "${pepl3}",
                            [-2,-78],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1115",
                            "width",
                            0,
                            0,
                            "linear",
                            "${pepl3}",
                            '0px',
                            '62px'
                        ],
                        [
                            "eid1114",
                            "height",
                            0,
                            0,
                            "linear",
                            "${pepl3}",
                            '0px',
                            '75px'
                        ]
                    ]
                }
            },
            "pepl4_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '64px', '256px', 'auto', 'auto'],
                            id: 'pepl4',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/pepl4.png', '-2px', '-1px', '64px', '256px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '43px', '69px']
                        }
                    }
                },
                timeline: {
                    duration: 2966,
                    autoPlay: true,
                    data: [
                        [
                            "eid1119",
                            "height",
                            0,
                            0,
                            "linear",
                            "${pepl4}",
                            '0px',
                            '69px'
                        ],
                        [
                            "eid1120",
                            "width",
                            0,
                            0,
                            "linear",
                            "${pepl4}",
                            '0px',
                            '43px'
                        ],
                        [
                            "eid1121",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${pepl4}",
                            [0,0],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1122",
                            "background-position",
                            933,
                            0,
                            "linear",
                            "${pepl4}",
                            [-2,-1],
                            [-2,-72],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1123",
                            "background-position",
                            1166,
                            0,
                            "linear",
                            "${pepl4}",
                            [-2,-72],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1124",
                            "background-position",
                            1366,
                            0,
                            "linear",
                            "${pepl4}",
                            [-2,-1],
                            [-2,-72],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1125",
                            "background-position",
                            1566,
                            0,
                            "linear",
                            "${pepl4}",
                            [-2,-72],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1126",
                            "background-position",
                            2833,
                            0,
                            "linear",
                            "${pepl4}",
                            [-2,-1],
                            [-2,-143],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1127",
                            "background-position",
                            2966,
                            0,
                            "linear",
                            "${pepl4}",
                            [-2,-143],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ]
                    ]
                }
            },
            "pepl5_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '128px', '128px', 'auto', 'auto'],
                            id: 'pepl5',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/pepl5.png', '-2px', '-1px', '128px', '128px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '70px', '82px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid1130",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${pepl5}",
                            [0,0],
                            [-2,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1128",
                            "height",
                            0,
                            0,
                            "linear",
                            "${pepl5}",
                            '0px',
                            '82px'
                        ],
                        [
                            "eid1129",
                            "width",
                            0,
                            0,
                            "linear",
                            "${pepl5}",
                            '0px',
                            '70px'
                        ]
                    ]
                }
            },
            "pepl6_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '64px', '256px', 'auto', 'auto'],
                            id: 'pepl6',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/pepl6.png', '-2px', '-77px', '64px', '256px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '46px', '75px']
                        }
                    }
                },
                timeline: {
                    duration: 1933,
                    autoPlay: true,
                    data: [
                        [
                            "eid1131",
                            "top",
                            0,
                            0,
                            "linear",
                            "${pepl6}",
                            '0px',
                            '1px'
                        ],
                        [
                            "eid1138",
                            "top",
                            1400,
                            0,
                            "linear",
                            "${pepl6}",
                            '1px',
                            '0px'
                        ],
                        [
                            "eid1142",
                            "top",
                            1566,
                            0,
                            "linear",
                            "${pepl6}",
                            '0px',
                            '1px'
                        ],
                        [
                            "eid1146",
                            "top",
                            1766,
                            0,
                            "linear",
                            "${pepl6}",
                            '1px',
                            '0px'
                        ],
                        [
                            "eid1150",
                            "top",
                            1933,
                            0,
                            "linear",
                            "${pepl6}",
                            '0px',
                            '1px'
                        ],
                        [
                            "eid1133",
                            "width",
                            0,
                            0,
                            "linear",
                            "${pepl6}",
                            '0px',
                            '45px'
                        ],
                        [
                            "eid1134",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${pepl6}",
                            [0,0],
                            [-2,-77],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1135",
                            "background-position",
                            400,
                            0,
                            "linear",
                            "${pepl6}",
                            [-2,-77],
                            [-2,-153],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1136",
                            "background-position",
                            566,
                            0,
                            "linear",
                            "${pepl6}",
                            [-2,-153],
                            [-2,-77],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1140",
                            "background-position",
                            1400,
                            0,
                            "linear",
                            "${pepl6}",
                            [-2,-77],
                            [-2,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1144",
                            "background-position",
                            1566,
                            0,
                            "linear",
                            "${pepl6}",
                            [-2,0],
                            [-2,-77],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1148",
                            "background-position",
                            1766,
                            0,
                            "linear",
                            "${pepl6}",
                            [-2,-77],
                            [-2,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1152",
                            "background-position",
                            1933,
                            0,
                            "linear",
                            "${pepl6}",
                            [-2,0],
                            [-2,-77],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1132",
                            "height",
                            0,
                            0,
                            "linear",
                            "${pepl6}",
                            '0px',
                            '74px'
                        ],
                        [
                            "eid1139",
                            "height",
                            1400,
                            0,
                            "linear",
                            "${pepl6}",
                            '74px',
                            '75px'
                        ],
                        [
                            "eid1143",
                            "height",
                            1566,
                            0,
                            "linear",
                            "${pepl6}",
                            '75px',
                            '74px'
                        ],
                        [
                            "eid1147",
                            "height",
                            1766,
                            0,
                            "linear",
                            "${pepl6}",
                            '74px',
                            '75px'
                        ],
                        [
                            "eid1151",
                            "height",
                            1933,
                            0,
                            "linear",
                            "${pepl6}",
                            '75px',
                            '74px'
                        ],
                        [
                            "eid1137",
                            "left",
                            1400,
                            0,
                            "linear",
                            "${pepl6}",
                            '0px',
                            '1px'
                        ],
                        [
                            "eid1141",
                            "left",
                            1566,
                            0,
                            "linear",
                            "${pepl6}",
                            '1px',
                            '0px'
                        ],
                        [
                            "eid1145",
                            "left",
                            1766,
                            0,
                            "linear",
                            "${pepl6}",
                            '0px',
                            '1px'
                        ],
                        [
                            "eid1149",
                            "left",
                            1933,
                            0,
                            "linear",
                            "${pepl6}",
                            '1px',
                            '0px'
                        ]
                    ]
                }
            },
            "pepl7_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '128px', '128px', 'auto', 'auto'],
                            id: 'pepl7',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/pepl7.png', '-2px', '0px', '128px', '128px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '49px', '74px']
                        }
                    }
                },
                timeline: {
                    duration: 1600,
                    autoPlay: true,
                    data: [
                        [
                            "eid1153",
                            "height",
                            0,
                            0,
                            "linear",
                            "${pepl7}",
                            '0px',
                            '74px'
                        ],
                        [
                            "eid1154",
                            "width",
                            0,
                            0,
                            "linear",
                            "${pepl7}",
                            '0px',
                            '49px'
                        ],
                        [
                            "eid1155",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${pepl7}",
                            [0,0],
                            [-2,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1156",
                            "background-position",
                            1400,
                            0,
                            "linear",
                            "${pepl7}",
                            [-2,0],
                            [-53,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1157",
                            "background-position",
                            1600,
                            0,
                            "linear",
                            "${pepl7}",
                            [-53,0],
                            [-2,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ]
                    ]
                }
            },
            "pepl8_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '128px', '75px', 'auto', 'auto'],
                            id: 'pepl8',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/pepl8.png', '-50px', '0px', '128px', '128px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '48px', '77px']
                        }
                    }
                },
                timeline: {
                    duration: 2466,
                    autoPlay: true,
                    data: [
                        [
                            "eid1158",
                            "height",
                            0,
                            0,
                            "linear",
                            "${pepl8}",
                            '0px',
                            '77px'
                        ],
                        [
                            "eid1162",
                            "height",
                            2033,
                            0,
                            "linear",
                            "${pepl8}",
                            '77px',
                            '75px'
                        ],
                        [
                            "eid1166",
                            "height",
                            2266,
                            0,
                            "linear",
                            "${pepl8}",
                            '75px',
                            '77px'
                        ],
                        [
                            "eid1170",
                            "height",
                            2466,
                            0,
                            "linear",
                            "${pepl8}",
                            '77px',
                            '75px'
                        ],
                        [
                            "eid2095",
                            "top",
                            0,
                            0,
                            "linear",
                            "${pepl8}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1161",
                            "top",
                            2033,
                            0,
                            "linear",
                            "${pepl8}",
                            '0px',
                            '2px'
                        ],
                        [
                            "eid1165",
                            "top",
                            2266,
                            0,
                            "linear",
                            "${pepl8}",
                            '2px',
                            '0px'
                        ],
                        [
                            "eid1169",
                            "top",
                            2466,
                            0,
                            "linear",
                            "${pepl8}",
                            '0px',
                            '2px'
                        ],
                        [
                            "eid1160",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${pepl8}",
                            [0,0],
                            [-1,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1164",
                            "background-position",
                            2033,
                            0,
                            "linear",
                            "${pepl8}",
                            [-1,-1],
                            [-50,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1168",
                            "background-position",
                            2266,
                            0,
                            "linear",
                            "${pepl8}",
                            [-50,0],
                            [-1,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1172",
                            "background-position",
                            2466,
                            0,
                            "linear",
                            "${pepl8}",
                            [-1,-1],
                            [-50,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1159",
                            "width",
                            0,
                            0,
                            "linear",
                            "${pepl8}",
                            '0px',
                            '48px'
                        ],
                        [
                            "eid1163",
                            "width",
                            2033,
                            0,
                            "linear",
                            "${pepl8}",
                            '48px',
                            '48px'
                        ],
                        [
                            "eid1167",
                            "width",
                            2266,
                            0,
                            "linear",
                            "${pepl8}",
                            '48px',
                            '48px'
                        ],
                        [
                            "eid1171",
                            "width",
                            2466,
                            0,
                            "linear",
                            "${pepl8}",
                            '48px',
                            '48px'
                        ]
                    ]
                }
            },
            "pepl9_symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '45px', '75px', 'auto', 'auto'],
                            id: 'pepl9',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/pepl9.png', '-1px', '0px', '128px', '128px', 'no-repeat']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '44px', '75px']
                        }
                    }
                },
                timeline: {
                    duration: 1466,
                    autoPlay: true,
                    data: [
                        [
                            "eid1173",
                            "top",
                            0,
                            0,
                            "linear",
                            "${pepl9}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1178",
                            "top",
                            933,
                            0,
                            "linear",
                            "${pepl9}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1183",
                            "top",
                            1100,
                            0,
                            "linear",
                            "${pepl9}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1188",
                            "top",
                            1300,
                            0,
                            "linear",
                            "${pepl9}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1193",
                            "top",
                            1466,
                            0,
                            "linear",
                            "${pepl9}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1175",
                            "width",
                            0,
                            0,
                            "linear",
                            "${pepl9}",
                            '0px',
                            '45px'
                        ],
                        [
                            "eid1180",
                            "width",
                            933,
                            0,
                            "linear",
                            "${pepl9}",
                            '45px',
                            '45px'
                        ],
                        [
                            "eid1185",
                            "width",
                            1100,
                            0,
                            "linear",
                            "${pepl9}",
                            '45px',
                            '45px'
                        ],
                        [
                            "eid1190",
                            "width",
                            1300,
                            0,
                            "linear",
                            "${pepl9}",
                            '45px',
                            '45px'
                        ],
                        [
                            "eid1195",
                            "width",
                            1466,
                            0,
                            "linear",
                            "${pepl9}",
                            '45px',
                            '45px'
                        ],
                        [
                            "eid1174",
                            "height",
                            0,
                            0,
                            "linear",
                            "${pepl9}",
                            '0px',
                            '75px'
                        ],
                        [
                            "eid1179",
                            "height",
                            933,
                            0,
                            "linear",
                            "${pepl9}",
                            '75px',
                            '75px'
                        ],
                        [
                            "eid1184",
                            "height",
                            1100,
                            0,
                            "linear",
                            "${pepl9}",
                            '75px',
                            '75px'
                        ],
                        [
                            "eid1189",
                            "height",
                            1300,
                            0,
                            "linear",
                            "${pepl9}",
                            '75px',
                            '75px'
                        ],
                        [
                            "eid1194",
                            "height",
                            1466,
                            0,
                            "linear",
                            "${pepl9}",
                            '75px',
                            '75px'
                        ],
                        [
                            "eid2096",
                            "left",
                            0,
                            0,
                            "linear",
                            "${pepl9}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1177",
                            "left",
                            933,
                            0,
                            "linear",
                            "${pepl9}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1182",
                            "left",
                            1100,
                            0,
                            "linear",
                            "${pepl9}",
                            '1px',
                            '0px'
                        ],
                        [
                            "eid1187",
                            "left",
                            1300,
                            0,
                            "linear",
                            "${pepl9}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1192",
                            "left",
                            1466,
                            0,
                            "linear",
                            "${pepl9}",
                            '1px',
                            '0px'
                        ],
                        [
                            "eid1176",
                            "background-position",
                            0,
                            0,
                            "linear",
                            "${pepl9}",
                            [0,0],
                            [-1,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1181",
                            "background-position",
                            933,
                            0,
                            "linear",
                            "${pepl9}",
                            [-1,0],
                            [-46,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1186",
                            "background-position",
                            1100,
                            0,
                            "linear",
                            "${pepl9}",
                            [-46,-1],
                            [-1,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1191",
                            "background-position",
                            1300,
                            0,
                            "linear",
                            "${pepl9}",
                            [-1,0],
                            [-46,-1],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid1196",
                            "background-position",
                            1466,
                            0,
                            "linear",
                            "${pepl9}",
                            [-46,-1],
                            [-1,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ]
                    ]
                }
            },
            "Peoples": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'pepl1_symbol_1',
                            display: 'block',
                            opacity: '1',
                            rect: ['-979px', '26px', '49px', '78px', 'auto', 'auto'],
                            symbolName: 'pepl1_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl2_symbol_1',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1493px', '27px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl2_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl3_symbol_1',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1247px', '34px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl3_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl3_symbol_1Copy2',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1568px', '49px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl3_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl3_symbol_1Copy',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1704px', '31px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl3_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl4_symbol_1',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1176px', '52px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl4_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl4_symbol_1Copy2',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1633px', '34px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl4_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl4_symbol_1Copy',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1818px', '34px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl4_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl5_symbol_1',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1065px', '37px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl5_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl5_symbol_1Copy',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1441px', '27px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl5_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl6_symbol_1',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1116px', '27px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl6_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl6_symbol_1Copy',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1864px', '68px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl6_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl7_symbol_1',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1346px', '50px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl7_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl8_symbol_1',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1765px', '52px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl8_symbol_1'
                        },
                        {
                            type: 'rect',
                            id: 'pepl9_symbol_1',
                            display: 'block',
                            opacity: '1',
                            rect: ['-1297px', '27px', null, null, 'auto', 'auto'],
                            symbolName: 'pepl9_symbol_1'
                        },
                        {
                            rect: ['65px', '0px', '44px', '114px', 'auto', 'auto'],
                            id: 'door',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/door.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '109px', '114px']
                        }
                    }
                },
                timeline: {
                    duration: 17000,
                    autoPlay: true,
                    data: [
                        [
                            "eid1616",
                            "display",
                            17000,
                            0,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1253",
                            "left",
                            0,
                            841,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-1765px',
                            '-779px'
                        ],
                        [
                            "eid1331",
                            "left",
                            841,
                            1159,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-779px',
                            '-778px'
                        ],
                        [
                            "eid1353",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-778px',
                            '-718px'
                        ],
                        [
                            "eid1383",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-718px',
                            '-656px'
                        ],
                        [
                            "eid1436",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-656px',
                            '-577px'
                        ],
                        [
                            "eid1454",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-577px',
                            '-523px'
                        ],
                        [
                            "eid1478",
                            "left",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-523px',
                            '-457px'
                        ],
                        [
                            "eid1492",
                            "left",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-457px',
                            '-410px'
                        ],
                        [
                            "eid1523",
                            "left",
                            8000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-410px',
                            '-342px'
                        ],
                        [
                            "eid1553",
                            "left",
                            9000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-342px',
                            '-260px'
                        ],
                        [
                            "eid1576",
                            "left",
                            10000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-260px',
                            '-209px'
                        ],
                        [
                            "eid1585",
                            "left",
                            11000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-209px',
                            '-128px'
                        ],
                        [
                            "eid1591",
                            "left",
                            12000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-128px',
                            '-66px'
                        ],
                        [
                            "eid1598",
                            "left",
                            13000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-66px',
                            '-3px'
                        ],
                        [
                            "eid1601",
                            "left",
                            14000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '-3px',
                            '63px'
                        ],
                        [
                            "eid1607",
                            "left",
                            15000,
                            2000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '63px',
                            '109px'
                        ],
                        [
                            "eid1262",
                            "left",
                            0,
                            500,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '-1441px',
                            '-455px'
                        ],
                        [
                            "eid1329",
                            "left",
                            500,
                            1500,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '-455px',
                            '-454px'
                        ],
                        [
                            "eid1371",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '-454px',
                            '-394px'
                        ],
                        [
                            "eid1401",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '-394px',
                            '-332px'
                        ],
                        [
                            "eid1443",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '-332px',
                            '-253px'
                        ],
                        [
                            "eid1472",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '-253px',
                            '-199px'
                        ],
                        [
                            "eid1484",
                            "left",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '-199px',
                            '-133px'
                        ],
                        [
                            "eid1497",
                            "left",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '-133px',
                            '-86px'
                        ],
                        [
                            "eid1528",
                            "left",
                            8000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '-86px',
                            '-18px'
                        ],
                        [
                            "eid1557",
                            "left",
                            9000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '-18px',
                            '54px'
                        ],
                        [
                            "eid1568",
                            "left",
                            10000,
                            7000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '54px',
                            '433px'
                        ],
                        [
                            "eid1600",
                            "display",
                            13000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1447",
                            "display",
                            4000,
                            0,
                            "easeInSine",
                            "${pepl5_symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1250",
                            "left",
                            0,
                            750,
                            "easeInSine",
                            "${pepl6_symbol_1}",
                            '-1116px',
                            '-130px'
                        ],
                        [
                            "eid1324",
                            "left",
                            750,
                            1250,
                            "easeInSine",
                            "${pepl6_symbol_1}",
                            '-130px',
                            '-129px'
                        ],
                        [
                            "eid1357",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1}",
                            '-129px',
                            '-69px'
                        ],
                        [
                            "eid1387",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1}",
                            '-69px',
                            '-7px'
                        ],
                        [
                            "eid1442",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1}",
                            '-7px',
                            '72px'
                        ],
                        [
                            "eid1458",
                            "left",
                            5000,
                            12000,
                            "easeInSine",
                            "${pepl6_symbol_1}",
                            '72px',
                            '758px'
                        ],
                        [
                            "eid1615",
                            "display",
                            16000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1348",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '34px',
                            '23px'
                        ],
                        [
                            "eid1378",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '23px',
                            '22px'
                        ],
                        [
                            "eid1646",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '22px',
                            '18px'
                        ],
                        [
                            "eid1737",
                            "top",
                            6000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1770",
                            "top",
                            7000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1814",
                            "top",
                            8000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1815",
                            "top",
                            9000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1822",
                            "top",
                            10000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1830",
                            "top",
                            11000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1837",
                            "top",
                            12000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1843",
                            "top",
                            13000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1848",
                            "top",
                            14000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1849",
                            "top",
                            15000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1614",
                            "top",
                            16000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '18px',
                            '-7px'
                        ],
                        [
                            "eid1258",
                            "left",
                            0,
                            500,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '-1247px',
                            '-261px'
                        ],
                        [
                            "eid1322",
                            "left",
                            500,
                            1500,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '-261px',
                            '-260px'
                        ],
                        [
                            "eid1351",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '-260px',
                            '-200px'
                        ],
                        [
                            "eid1381",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '-200px',
                            '-138px'
                        ],
                        [
                            "eid1435",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '-138px',
                            '-59px'
                        ],
                        [
                            "eid1452",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '-59px',
                            '-5px'
                        ],
                        [
                            "eid1477",
                            "left",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '-5px',
                            '61px'
                        ],
                        [
                            "eid1491",
                            "left",
                            7000,
                            10000,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '61px',
                            '627px'
                        ],
                        [
                            "eid1251",
                            "left",
                            0,
                            1500,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-1864px',
                            '-878px'
                        ],
                        [
                            "eid1326",
                            "left",
                            1500,
                            500,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-878px',
                            '-877px'
                        ],
                        [
                            "eid1343",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-877px',
                            '-817px'
                        ],
                        [
                            "eid1373",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-817px',
                            '-755px'
                        ],
                        [
                            "eid1438",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-755px',
                            '-676px'
                        ],
                        [
                            "eid1460",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-676px',
                            '-622px'
                        ],
                        [
                            "eid1480",
                            "left",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-622px',
                            '-556px'
                        ],
                        [
                            "eid1494",
                            "left",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-556px',
                            '-509px'
                        ],
                        [
                            "eid1525",
                            "left",
                            8000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-509px',
                            '-441px'
                        ],
                        [
                            "eid1555",
                            "left",
                            9000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-441px',
                            '-359px'
                        ],
                        [
                            "eid1570",
                            "left",
                            10000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-359px',
                            '-308px'
                        ],
                        [
                            "eid1582",
                            "left",
                            11000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-308px',
                            '-227px'
                        ],
                        [
                            "eid1592",
                            "left",
                            12000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-227px',
                            '-165px'
                        ],
                        [
                            "eid1597",
                            "left",
                            13000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-165px',
                            '-102px'
                        ],
                        [
                            "eid1604",
                            "left",
                            14000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-102px',
                            '-37px'
                        ],
                        [
                            "eid1609",
                            "left",
                            15000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '-37px',
                            '17px'
                        ],
                        [
                            "eid1613",
                            "left",
                            16000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '17px',
                            '64px'
                        ],
                        [
                            "eid1368",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '50px',
                            '39px'
                        ],
                        [
                            "eid1398",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '39px',
                            '38px'
                        ],
                        [
                            "eid1649",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '38px',
                            '34px'
                        ],
                        [
                            "eid1469",
                            "top",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '34px',
                            '33px'
                        ],
                        [
                            "eid1663",
                            "top",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '33px',
                            '31px'
                        ],
                        [
                            "eid1691",
                            "top",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '31px',
                            '28px'
                        ],
                        [
                            "eid1757",
                            "top",
                            8000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '28px',
                            '21px'
                        ],
                        [
                            "eid1560",
                            "top",
                            9000,
                            8000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '21px',
                            '9px'
                        ],
                        [
                            "eid1488",
                            "display",
                            6000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1260",
                            "left",
                            0,
                            1250,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '-1346px',
                            '-360px'
                        ],
                        [
                            "eid1320",
                            "left",
                            1250,
                            750,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '-360px',
                            '-359px'
                        ],
                        [
                            "eid1367",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '-359px',
                            '-299px'
                        ],
                        [
                            "eid1397",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '-299px',
                            '-237px'
                        ],
                        [
                            "eid1433",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '-237px',
                            '-158px'
                        ],
                        [
                            "eid1468",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '-158px',
                            '-104px'
                        ],
                        [
                            "eid1486",
                            "left",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '-104px',
                            '-38px'
                        ],
                        [
                            "eid1498",
                            "left",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '-38px',
                            '9px'
                        ],
                        [
                            "eid1529",
                            "left",
                            8000,
                            1000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '9px',
                            '66px'
                        ],
                        [
                            "eid1558",
                            "left",
                            9000,
                            8000,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            '66px',
                            '528px'
                        ],
                        [
                            "eid1372",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '27px',
                            '16px'
                        ],
                        [
                            "eid1402",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '16px',
                            '15px'
                        ],
                        [
                            "eid1650",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '15px',
                            '11px'
                        ],
                        [
                            "eid1739",
                            "top",
                            6000,
                            0,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '11px',
                            '11px'
                        ],
                        [
                            "eid1778",
                            "top",
                            7000,
                            0,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '11px',
                            '11px'
                        ],
                        [
                            "eid1808",
                            "top",
                            8000,
                            0,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '11px',
                            '11px'
                        ],
                        [
                            "eid1809",
                            "top",
                            9000,
                            0,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '11px',
                            '11px'
                        ],
                        [
                            "eid1569",
                            "top",
                            10000,
                            7000,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            '11px',
                            '-14px'
                        ],
                        [
                            "eid1257",
                            "left",
                            0,
                            1632,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-1568px',
                            '-582px'
                        ],
                        [
                            "eid1325",
                            "left",
                            1632,
                            368,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-582px',
                            '-581px'
                        ],
                        [
                            "eid1365",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-581px',
                            '-521px'
                        ],
                        [
                            "eid1395",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-521px',
                            '-459px'
                        ],
                        [
                            "eid1440",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-459px',
                            '-380px'
                        ],
                        [
                            "eid1470",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-380px',
                            '-326px'
                        ],
                        [
                            "eid1483",
                            "left",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-326px',
                            '-260px'
                        ],
                        [
                            "eid1499",
                            "left",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-260px',
                            '-213px'
                        ],
                        [
                            "eid1530",
                            "left",
                            8000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-213px',
                            '-145px'
                        ],
                        [
                            "eid1559",
                            "left",
                            9000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-145px',
                            '-63px'
                        ],
                        [
                            "eid1564",
                            "left",
                            10000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-63px',
                            '-12px'
                        ],
                        [
                            "eid1580",
                            "left",
                            11000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '-12px',
                            '56px'
                        ],
                        [
                            "eid1588",
                            "left",
                            12000,
                            5000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '56px',
                            '306px'
                        ],
                        [
                            "eid1362",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '52px',
                            '41px'
                        ],
                        [
                            "eid1392",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '41px',
                            '40px'
                        ],
                        [
                            "eid1651",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '40px',
                            '36px'
                        ],
                        [
                            "eid1463",
                            "top",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '36px',
                            '17px'
                        ],
                        [
                            "eid1487",
                            "top",
                            6000,
                            11000,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '17px',
                            '11px'
                        ],
                        [
                            "eid1346",
                            "top",
                            0,
                            2000,
                            "easeInSine",
                            "${pepl5_symbol_1}",
                            '37px',
                            '31px'
                        ],
                        [
                            "eid1639",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1}",
                            '31px',
                            '26px'
                        ],
                        [
                            "eid1376",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1}",
                            '26px',
                            '15px'
                        ],
                        [
                            "eid1446",
                            "top",
                            4000,
                            13000,
                            "easeInSine",
                            "${pepl5_symbol_1}",
                            '15px',
                            '-4px'
                        ],
                        [
                            "eid1611",
                            "display",
                            15000,
                            0,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1252",
                            "left",
                            0,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-1818px',
                            '-832px'
                        ],
                        [
                            "eid1328",
                            "left",
                            1000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-832px',
                            '-828px'
                        ],
                        [
                            "eid1347",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-828px',
                            '-771px'
                        ],
                        [
                            "eid1377",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-771px',
                            '-709px'
                        ],
                        [
                            "eid1445",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-709px',
                            '-630px'
                        ],
                        [
                            "eid1448",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-630px',
                            '-576px'
                        ],
                        [
                            "eid1475",
                            "left",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-576px',
                            '-510px'
                        ],
                        [
                            "eid1489",
                            "left",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-510px',
                            '-463px'
                        ],
                        [
                            "eid1521",
                            "left",
                            8000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-463px',
                            '-395px'
                        ],
                        [
                            "eid1551",
                            "left",
                            9000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-395px',
                            '-313px'
                        ],
                        [
                            "eid1562",
                            "left",
                            10000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-313px',
                            '-262px'
                        ],
                        [
                            "eid1579",
                            "left",
                            11000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-262px',
                            '-181px'
                        ],
                        [
                            "eid1587",
                            "left",
                            12000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-181px',
                            '-119px'
                        ],
                        [
                            "eid1595",
                            "left",
                            13000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-119px',
                            '-56px'
                        ],
                        [
                            "eid1603",
                            "left",
                            14000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '-56px',
                            '9px'
                        ],
                        [
                            "eid1608",
                            "left",
                            15000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '9px',
                            '65px'
                        ],
                        [
                            "eid1612",
                            "left",
                            16000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy}",
                            '65px',
                            '56px'
                        ],
                        [
                            "eid1474",
                            "display",
                            5000,
                            0,
                            "easeInSine",
                            "${pepl6_symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1261",
                            "left",
                            0,
                            1500,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '-1297px',
                            '-311px'
                        ],
                        [
                            "eid1327",
                            "left",
                            1500,
                            500,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '-311px',
                            '-310px'
                        ],
                        [
                            "eid1363",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '-310px',
                            '-250px'
                        ],
                        [
                            "eid1393",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '-250px',
                            '-188px'
                        ],
                        [
                            "eid1441",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '-188px',
                            '-109px'
                        ],
                        [
                            "eid1464",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '-109px',
                            '-55px'
                        ],
                        [
                            "eid1482",
                            "left",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '-55px',
                            '11px'
                        ],
                        [
                            "eid1496",
                            "left",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '11px',
                            '69px'
                        ],
                        [
                            "eid1527",
                            "left",
                            8000,
                            9000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '69px',
                            '577px'
                        ],
                        [
                            "eid1370",
                            "top",
                            2000,
                            0,
                            "easeInSine",
                            "${pepl1_symbol_1}",
                            '26px',
                            '15px'
                        ],
                        [
                            "eid1400",
                            "top",
                            3000,
                            14000,
                            "easeInSine",
                            "${pepl1_symbol_1}",
                            '15px',
                            '-15px'
                        ],
                        [
                            "eid1255",
                            "left",
                            0,
                            750,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '-1176px',
                            '-190px'
                        ],
                        [
                            "eid1323",
                            "left",
                            750,
                            1250,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '-190px',
                            '-189px'
                        ],
                        [
                            "eid1361",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '-189px',
                            '-129px'
                        ],
                        [
                            "eid1391",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '-129px',
                            '-67px'
                        ],
                        [
                            "eid1439",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '-67px',
                            '12px'
                        ],
                        [
                            "eid1462",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '12px',
                            '67px'
                        ],
                        [
                            "eid1481",
                            "left",
                            6000,
                            11000,
                            "easeInSine",
                            "${pepl4_symbol_1}",
                            '67px',
                            '698px'
                        ],
                        [
                            "eid1360",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '31px',
                            '20px'
                        ],
                        [
                            "eid1390",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '20px',
                            '19px'
                        ],
                        [
                            "eid1657",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '19px',
                            '15px'
                        ],
                        [
                            "eid1749",
                            "top",
                            6000,
                            0,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '15px',
                            '15px'
                        ],
                        [
                            "eid1772",
                            "top",
                            7000,
                            0,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '15px',
                            '15px'
                        ],
                        [
                            "eid1806",
                            "top",
                            8000,
                            0,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '15px',
                            '15px'
                        ],
                        [
                            "eid1807",
                            "top",
                            9000,
                            0,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '15px',
                            '15px'
                        ],
                        [
                            "eid1567",
                            "top",
                            10000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '15px',
                            '16px'
                        ],
                        [
                            "eid1817",
                            "top",
                            11000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '16px',
                            '17px'
                        ],
                        [
                            "eid1824",
                            "top",
                            12000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '17px',
                            '20px'
                        ],
                        [
                            "eid1836",
                            "top",
                            13000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '20px',
                            '26px'
                        ],
                        [
                            "eid1605",
                            "top",
                            14000,
                            3000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '26px',
                            '-10px'
                        ],
                        [
                            "eid1586",
                            "display",
                            11000,
                            0,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1249",
                            "left",
                            0,
                            2000,
                            "easeInSine",
                            "${pepl5_symbol_1}",
                            '-1065px',
                            '-79px'
                        ],
                        [
                            "eid1345",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1}",
                            '-79px',
                            '-18px'
                        ],
                        [
                            "eid1375",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl5_symbol_1}",
                            '-18px',
                            '64px'
                        ],
                        [
                            "eid1432",
                            "left",
                            4000,
                            13000,
                            "easeInSine",
                            "${pepl5_symbol_1}",
                            '64px',
                            '809px'
                        ],
                        [
                            "eid1356",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '34px',
                            '23px'
                        ],
                        [
                            "eid1386",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '23px',
                            '22px'
                        ],
                        [
                            "eid1656",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '22px',
                            '18px'
                        ],
                        [
                            "eid1747",
                            "top",
                            6000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1782",
                            "top",
                            7000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1812",
                            "top",
                            8000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1813",
                            "top",
                            9000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid1573",
                            "top",
                            10000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '18px',
                            '17px'
                        ],
                        [
                            "eid1820",
                            "top",
                            11000,
                            0,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '17px',
                            '16px'
                        ],
                        [
                            "eid1827",
                            "top",
                            12000,
                            5000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '16px',
                            '-7px'
                        ],
                        [
                            "eid1354",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '52px',
                            '41px'
                        ],
                        [
                            "eid1384",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '41px',
                            '40px'
                        ],
                        [
                            "eid1645",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '40px',
                            '36px'
                        ],
                        [
                            "eid1735",
                            "top",
                            6000,
                            0,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '36px',
                            '36px'
                        ],
                        [
                            "eid1768",
                            "top",
                            7000,
                            0,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '36px',
                            '36px'
                        ],
                        [
                            "eid1804",
                            "top",
                            8000,
                            0,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '36px',
                            '36px'
                        ],
                        [
                            "eid1805",
                            "top",
                            9000,
                            0,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '36px',
                            '36px'
                        ],
                        [
                            "eid1577",
                            "top",
                            10000,
                            0,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '36px',
                            '35px'
                        ],
                        [
                            "eid1818",
                            "top",
                            11000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '35px',
                            '33px'
                        ],
                        [
                            "eid1825",
                            "top",
                            12000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '33px',
                            '30px'
                        ],
                        [
                            "eid1833",
                            "top",
                            13000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '30px',
                            '25px'
                        ],
                        [
                            "eid1840",
                            "top",
                            14000,
                            1000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '25px',
                            '12px'
                        ],
                        [
                            "eid1610",
                            "top",
                            15000,
                            2000,
                            "easeInSine",
                            "${pepl8_symbol_1}",
                            '12px',
                            '11px'
                        ],
                        [
                            "eid1594",
                            "display",
                            12000,
                            0,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1259",
                            "left",
                            0,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '-1493px',
                            '-507px'
                        ],
                        [
                            "eid1332",
                            "left",
                            1000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '-507px',
                            '-506px'
                        ],
                        [
                            "eid1349",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '-506px',
                            '-446px'
                        ],
                        [
                            "eid1379",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '-446px',
                            '-384px'
                        ],
                        [
                            "eid1434",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '-384px',
                            '-305px'
                        ],
                        [
                            "eid1450",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '-305px',
                            '-251px'
                        ],
                        [
                            "eid1476",
                            "left",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '-251px',
                            '-185px'
                        ],
                        [
                            "eid1490",
                            "left",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '-185px',
                            '-138px'
                        ],
                        [
                            "eid1522",
                            "left",
                            8000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '-138px',
                            '-70px'
                        ],
                        [
                            "eid1552",
                            "left",
                            9000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '-70px',
                            '12px'
                        ],
                        [
                            "eid1574",
                            "left",
                            10000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '12px',
                            '63px'
                        ],
                        [
                            "eid1584",
                            "left",
                            11000,
                            6000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '63px',
                            '381px'
                        ],
                        [
                            "eid1350",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '27px',
                            '16px'
                        ],
                        [
                            "eid1380",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '16px',
                            '15px'
                        ],
                        [
                            "eid1653",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '15px',
                            '11px'
                        ],
                        [
                            "eid1743",
                            "top",
                            6000,
                            0,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '11px',
                            '11px'
                        ],
                        [
                            "eid1774",
                            "top",
                            7000,
                            0,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '11px',
                            '11px'
                        ],
                        [
                            "eid1802",
                            "top",
                            8000,
                            0,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '11px',
                            '11px'
                        ],
                        [
                            "eid1803",
                            "top",
                            9000,
                            0,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '11px',
                            '11px'
                        ],
                        [
                            "eid1575",
                            "top",
                            10000,
                            7000,
                            "easeInSine",
                            "${pepl2_symbol_1}",
                            '11px',
                            '-14px'
                        ],
                        [
                            "eid1366",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '49px',
                            '38px'
                        ],
                        [
                            "eid1396",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '38px',
                            '37px'
                        ],
                        [
                            "eid1652",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '37px',
                            '33px'
                        ],
                        [
                            "eid1741",
                            "top",
                            6000,
                            0,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '33px',
                            '33px'
                        ],
                        [
                            "eid1780",
                            "top",
                            7000,
                            0,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '33px',
                            '33px'
                        ],
                        [
                            "eid1800",
                            "top",
                            8000,
                            0,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '33px',
                            '33px'
                        ],
                        [
                            "eid1801",
                            "top",
                            9000,
                            0,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '33px',
                            '33px'
                        ],
                        [
                            "eid1565",
                            "top",
                            10000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '33px',
                            '27px'
                        ],
                        [
                            "eid1816",
                            "top",
                            11000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '27px',
                            '13px'
                        ],
                        [
                            "eid1593",
                            "top",
                            12000,
                            5000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy2}",
                            '13px',
                            '8px'
                        ],
                        [
                            "eid1403",
                            "display",
                            3000,
                            0,
                            "easeInSine",
                            "${pepl1_symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1606",
                            "display",
                            14000,
                            0,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1500",
                            "display",
                            7000,
                            0,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1344",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '68px',
                            '57px'
                        ],
                        [
                            "eid1374",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '57px',
                            '56px'
                        ],
                        [
                            "eid1654",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '56px',
                            '52px'
                        ],
                        [
                            "eid1745",
                            "top",
                            6000,
                            0,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '52px',
                            '52px'
                        ],
                        [
                            "eid1776",
                            "top",
                            7000,
                            0,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '52px',
                            '52px'
                        ],
                        [
                            "eid1810",
                            "top",
                            8000,
                            0,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '52px',
                            '52px'
                        ],
                        [
                            "eid1811",
                            "top",
                            9000,
                            0,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '52px',
                            '52px'
                        ],
                        [
                            "eid1571",
                            "top",
                            10000,
                            0,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '52px',
                            '51px'
                        ],
                        [
                            "eid1819",
                            "top",
                            11000,
                            0,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '51px',
                            '50px'
                        ],
                        [
                            "eid1826",
                            "top",
                            12000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '50px',
                            '48px'
                        ],
                        [
                            "eid1832",
                            "top",
                            13000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '48px',
                            '46px'
                        ],
                        [
                            "eid1839",
                            "top",
                            14000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '46px',
                            '42px'
                        ],
                        [
                            "eid1847",
                            "top",
                            15000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '42px',
                            '35px'
                        ],
                        [
                            "eid1850",
                            "top",
                            16000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1Copy}",
                            '35px',
                            '19px'
                        ],
                        [
                            "eid1561",
                            "display",
                            9000,
                            0,
                            "easeInSine",
                            "${pepl7_symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1532",
                            "display",
                            8000,
                            0,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1578",
                            "display",
                            10000,
                            0,
                            "easeInSine",
                            "${pepl5_symbol_1Copy}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1248",
                            "left",
                            0,
                            2000,
                            "easeInSine",
                            "${pepl1_symbol_1}",
                            '-979px',
                            '8px'
                        ],
                        [
                            "eid1369",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl1_symbol_1}",
                            '8px',
                            '68px'
                        ],
                        [
                            "eid1399",
                            "left",
                            3000,
                            14000,
                            "easeInSine",
                            "${pepl1_symbol_1}",
                            '68px',
                            '895px'
                        ],
                        [
                            "eid1256",
                            "left",
                            0,
                            1389,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-1633px',
                            '-647px'
                        ],
                        [
                            "eid1321",
                            "left",
                            1389,
                            611,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-647px',
                            '-646px'
                        ],
                        [
                            "eid1355",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-646px',
                            '-586px'
                        ],
                        [
                            "eid1385",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-586px',
                            '-524px'
                        ],
                        [
                            "eid1437",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-524px',
                            '-445px'
                        ],
                        [
                            "eid1456",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-445px',
                            '-391px'
                        ],
                        [
                            "eid1479",
                            "left",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-391px',
                            '-325px'
                        ],
                        [
                            "eid1493",
                            "left",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-325px',
                            '-278px'
                        ],
                        [
                            "eid1524",
                            "left",
                            8000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-278px',
                            '-210px'
                        ],
                        [
                            "eid1554",
                            "left",
                            9000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-210px',
                            '-128px'
                        ],
                        [
                            "eid1572",
                            "left",
                            10000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-128px',
                            '-77px'
                        ],
                        [
                            "eid1583",
                            "left",
                            11000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '-77px',
                            '4px'
                        ],
                        [
                            "eid1590",
                            "left",
                            12000,
                            1000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '4px',
                            '66px'
                        ],
                        [
                            "eid1599",
                            "left",
                            13000,
                            4000,
                            "easeInSine",
                            "${pepl4_symbol_1Copy2}",
                            '66px',
                            '241px'
                        ],
                        [
                            "eid1364",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '27px',
                            '16px'
                        ],
                        [
                            "eid1394",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '16px',
                            '15px'
                        ],
                        [
                            "eid1655",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '15px',
                            '12px'
                        ],
                        [
                            "eid1465",
                            "top",
                            5000,
                            0,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '11px',
                            '11px'
                        ],
                        [
                            "eid1672",
                            "top",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '12px',
                            '14px'
                        ],
                        [
                            "eid1698",
                            "top",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '14px',
                            '18px'
                        ],
                        [
                            "eid1531",
                            "top",
                            8000,
                            9000,
                            "easeInSine",
                            "${pepl9_symbol_1}",
                            '18px',
                            '-14px'
                        ],
                        [
                            "eid1352",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '34px',
                            '23px'
                        ],
                        [
                            "eid1382",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '23px',
                            '22px'
                        ],
                        [
                            "eid1647",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '22px',
                            '18px'
                        ],
                        [
                            "eid1662",
                            "top",
                            6000,
                            11000,
                            "easeInSine",
                            "${pepl3_symbol_1}",
                            '18px',
                            '-7px'
                        ],
                        [
                            "eid1254",
                            "left",
                            0,
                            1829,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-1704px',
                            '-718px'
                        ],
                        [
                            "eid1330",
                            "left",
                            1829,
                            171,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-718px',
                            '-717px'
                        ],
                        [
                            "eid1359",
                            "left",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-717px',
                            '-657px'
                        ],
                        [
                            "eid1389",
                            "left",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-657px',
                            '-595px'
                        ],
                        [
                            "eid1444",
                            "left",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-595px',
                            '-516px'
                        ],
                        [
                            "eid1466",
                            "left",
                            5000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-516px',
                            '-462px'
                        ],
                        [
                            "eid1485",
                            "left",
                            6000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-462px',
                            '-396px'
                        ],
                        [
                            "eid1495",
                            "left",
                            7000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-396px',
                            '-349px'
                        ],
                        [
                            "eid1526",
                            "left",
                            8000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-349px',
                            '-281px'
                        ],
                        [
                            "eid1556",
                            "left",
                            9000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-281px',
                            '-199px'
                        ],
                        [
                            "eid1566",
                            "left",
                            10000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-199px',
                            '-148px'
                        ],
                        [
                            "eid1581",
                            "left",
                            11000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-148px',
                            '-67px'
                        ],
                        [
                            "eid1589",
                            "left",
                            12000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-67px',
                            '-5px'
                        ],
                        [
                            "eid1596",
                            "left",
                            13000,
                            1000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '-5px',
                            '58px'
                        ],
                        [
                            "eid1602",
                            "left",
                            14000,
                            3000,
                            "easeInSine",
                            "${pepl3_symbol_1Copy}",
                            '58px',
                            '170px'
                        ],
                        [
                            "eid1358",
                            "top",
                            2000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1}",
                            '27px',
                            '16px'
                        ],
                        [
                            "eid1388",
                            "top",
                            3000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1}",
                            '16px',
                            '15px'
                        ],
                        [
                            "eid1648",
                            "top",
                            4000,
                            1000,
                            "easeInSine",
                            "${pepl6_symbol_1}",
                            '15px',
                            '11px'
                        ],
                        [
                            "eid1459",
                            "top",
                            5000,
                            12000,
                            "easeInSine",
                            "${pepl6_symbol_1}",
                            '11px',
                            '-14px'
                        ],
                            [ "eid1640", "trigger", 2000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${pepl4_symbol_1Copy2}', [] ] ],
                            [ "eid1641", "trigger", 2000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${pepl3_symbol_1Copy2}', [] ] ],
                            [ "eid1642", "trigger", 2000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${pepl7_symbol_1}', [] ] ]
                    ]
                }
            },
            "Symbol_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '70px', '541px', '122px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            fill: ['rgba(192,239,206,1.00)'],
                            id: 'RoundRect2Copy3',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['3px', '74px', '535px', '108px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2Copy2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(111,111,111,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            id: 'Text4Copy',
                            text: 'Для получения важной дополнительной информации, пожалуйста, обратитесь к представителю компании ЭГИС в Вашем городе',
                            align: 'center',
                            rect: ['26px', '92px', '488px', '78px', 'auto', 'auto']
                        },
                        {
                            rect: ['239px', '0px', '69px', '84px', 'auto', 'auto'],
                            id: '__12',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', im + 'animation/continue_button_over.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '541px', '192px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "Button_Stop": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '14px', '246px', '59px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)'],
                            id: 'RoundRect2',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(0,84,160,1.00)']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [20, 'px'], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            text: '<p style=\"margin: 0px;\">Завершить прохождение </p><p style=\"margin: 0px;\">викторины​</p>',
                            id: 'Text2Copy3',
                            textStyle: ['0px', '1px', '22px', '', ''],
                            align: 'center',
                            rect: ['22px', '30px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            rect: ['0px', '0px', '254px', '96px', 'auto', 'auto'],
                            type: 'rect',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            id: 'Rectangle',
                            opacity: '0',
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '254px', '96px']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: true,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000
                    },
                    data: [
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid1910",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '22px',
                            '22px'
                        ],
                        [
                            "eid1906",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '90px',
                            '26px'
                        ],
                        [
                            "eid1907",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${Text2Copy3}",
                            '26px',
                            '30px'
                        ],
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '14px',
                            '14px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '14px',
                            '18px'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ]
                    ]
                }
            },
            "Table_Result": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '1000px', '56px', 'auto', 'auto'],
                            borderRadius: ['0px', '0px', '0px', '0px 0px'],
                            id: 'RoundRect2Copy4',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(192,239,206,0.60)']
                        },
                        {
                            type: 'rect',
                            borderRadius: ['0px', '0px', '0px', '0px 0px'],
                            id: 'Table_Result_Items',
                            opacity: '1',
                            rect: ['0px', '56px', '1000px', '424px', 'auto', 'auto'],
                            overflow: 'auto',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['50px', '18px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(80,80,80,1.00)', '700', 'none solid rgb(0, 80, 152)', 'normal', 'break-word', 'nowrap'],
                            text: '<p style=\"margin:0px\">ФИО, Специальность</p>',
                            id: 'tab_fio',
                            textStyle: ['', '', '20px', '', ''],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['400px', '18px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(80,80,80,1.00)', '700', 'none solid rgb(0, 80, 152)', 'normal', 'break-word', 'nowrap'],
                            text: '<p style=\"margin:0px\">Название и №&nbsp;ЛПУ/Аптеки</p>',
                            id: 'tab_lpu',
                            textStyle: ['', '', '20px', '', ''],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['700px', '18px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(80,80,80,1.00)', '700', 'none solid rgb(0, 80, 152)', 'normal', 'break-word', 'nowrap'],
                            text: '<p style=\"margin:0px\">Город/нас. пункт</p>',
                            id: 'tab_city',
                            textStyle: ['', '', '20px', '', ''],
                            align: 'left',
                            type: 'text'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '1000px', '480px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "Button_Result_Submit_old": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            fill: ['rgba(0,84,160,1.00)'],
                            rect: ['0px', '0px', '216px', '50px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            type: 'rect',
                            id: 'RoundRect2',
                            opacity: '0.5',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)']
                        },
                        {
                            type: 'text',
                            rect: ['18px', '17px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0.8',
                            text: '<p style=\"margin:0px\">Отправить результаты</p>',
                            id: 'Text2Copy3',
                            textStyle: ['0px', '1px', '24px', '', ''],
                            align: 'center',
                            font: ['open-sans-condensed, sans-serif', [20, 'px'], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'rect',
                            rect: ['0px', '0px', '224px', '62px', 'auto', 'auto'],
                            id: 'Rectangle',
                            opacity: '0',
                            display: 'block',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '224px', '62px']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: true,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000,
                        "disable": 3000
                    },
                    data: [
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '4px'
                        ],
                        [
                            "eid1997",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '4px',
                            '0px'
                        ],
                        [
                            "eid2006",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Rectangle}",
                            'block',
                            'block'
                        ],
                        [
                            "eid2007",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${Rectangle}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2004",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '1',
                            '1'
                        ],
                        [
                            "eid2005",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '1',
                            '0.8'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1998",
                            "left",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid1999",
                            "border-color",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            'rgba(179,179,179,1.00)',
                            'rgba(255,255,255,1.00)'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid1996",
                            "background-color",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,43,81,1.00)',
                            'rgba(0,84,160,1.00)'
                        ],
                        [
                            "eid1916",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '17px'
                        ],
                        [
                            "eid1917",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '21px'
                        ],
                        [
                            "eid2001",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '21px',
                            '17px'
                        ],
                        [
                            "eid2003",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '1',
                            '1'
                        ],
                        [
                            "eid2002",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '1',
                            '0.5'
                        ],
                        [
                            "eid1919",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid2000",
                            "left",
                            3000,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '18px',
                            '18px'
                        ]
                    ]
                }
            },
            "Button_Result_Prev": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '4px', '104px', '50px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)'],
                            id: 'RoundRect2',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(0,84,160,1.00)']
                        },
                        {
                            type: 'text',
                            rect: ['30px', '21px', 'auto', 'auto', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px;\">Назад</p>',
                            id: 'Text2Copy3',
                            textStyle: ['0px', '1px', '24px', '', 'uppercase'],
                            align: 'center',
                            font: ['open-sans-condensed, sans-serif', [20, 'px'], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            rect: ['0px', '0px', '112px', '62px', 'auto', 'auto'],
                            type: 'rect',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            id: 'Rectangle',
                            opacity: '0',
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '112px', '62px']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: true,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000
                    },
                    data: [
                        [
                            "eid1919",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '30px',
                            '30px'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid1916",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '17px'
                        ],
                        [
                            "eid1917",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '21px'
                        ],
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '4px'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ]
                    ]
                }
            },
            "Button_Intro_Result": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '4px', '216px', '50px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            fill: ['rgba(0,99,76,1.00)'],
                            id: 'RoundRect2',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'rect',
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [20, 'px'], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', 'nowrap'],
                            type: 'text',
                            align: 'center',
                            id: 'Text2Copy3',
                            text: '<p style=\"margin:0px\">Отправить результаты</p>',
                            textStyle: ['0px', '1px', '24px', '', ''],
                            rect: ['18px', '21px', 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            rect: ['0px', '0px', '224px', '62px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '224px', '62px']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: true,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000
                    },
                    data: [
                        [
                            "eid1919",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,186,144,1.00)',
                            'rgba(0,139,107,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,139,107,1.00)',
                            'rgba(0,99,76,1.00)'
                        ],
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid1916",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '17px'
                        ],
                        [
                            "eid1917",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '21px'
                        ],
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '4px'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ]
                    ]
                }
            },
            "Button_Intro_Start": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '4px', '216px', '50px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            fill: ['rgba(0,43,81,1.00)'],
                            id: 'RoundRect2',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'rect',
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)']
                        },
                        {
                            rect: ['62px', '21px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [20, 'px'], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', 'nowrap'],
                            align: 'center',
                            id: 'Text2Copy3',
                            text: '<p style=\"margin:0px\">Начать игру</p>',
                            textStyle: ['0px', '1px', '24px', '', ''],
                            type: 'text'
                        },
                        {
                            type: 'rect',
                            rect: ['0px', '0px', '224px', '62px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '224px', '62px']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: true,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000
                    },
                    data: [
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1.00)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid1979",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '62px',
                            '62px'
                        ],
                        [
                            "eid1916",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '17px'
                        ],
                        [
                            "eid1917",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '21px'
                        ],
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '4px'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ]
                    ]
                }
            },
            "Dialog": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'Rectangle3',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            rect: ['0px', '0px', '1024px', '768px', 'auto', 'auto'],
                            fill: ['rgba(255,255,255,0.90)']
                        },
                        {
                            type: 'rect',
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2Copy',
                            opacity: '0.94',
                            rect: ['155px', '218px', '714px', '340px', 'auto', 'auto'],
                            fill: ['rgba(192,239,206,1.00)'],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.17)']
                        },
                        {
                            rect: ['161px', '220px', '910px', '330px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['385px', '390px', null, null, 'auto', 'auto'],
                            id: 'Button_Dialog_Ok',
                            symbolName: 'Button_Dialog_Ok',
                            type: 'rect'
                        },
                        {
                            rect: ['479px', '150px', '69px', '81px', 'auto', 'auto'],
                            display: 'block',
                            symbolName: 'anim_congratulation_symbol_1',
                            id: 'anim_congratulation_symbol_1',
                            type: 'rect'
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [32, 'px'], 'rgba(48,108,0,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            display: 'block',
                            id: 'textSuccessful',
                            text: '<p style=\"margin:0px\">Данные успешно отправлены</p>',
                            align: 'center',
                            rect: ['196px', '288px', '631px', '48px', 'auto', 'auto']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [32, 'px'], 'rgba(48,108,0,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            type: 'text',
                            display: 'none',
                            id: 'textFailure',
                            text: '<p style=\"margin:0px\">​<span style=\"color: rgb(204, 0, 0);\">Ошибка отправки данных</span></p><p style=\"margin:0px\">​<span style=\"color: rgb(102, 102, 102); font-size: 22px;\">Проверьте соединение с интернетом и попробуйте снова</span></p>',
                            align: 'center',
                            rect: ['182px', '268px', '660px', '90px', 'auto', 'auto']
                        },
                        {
                            type: 'text',
                            id: 'textCodeError',
                            textStyle: ['', '', '38px', '', ''],
                            font: ['open-sans-condensed, sans-serif', [32, 'px'], 'rgba(48,108,0,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            display: 'none',
                            rect: ['182px', '320px', '660px', '68px', 'auto', 'auto'],
                            text: '<p style=\"margin: 0px; line-height: 26px;\">​<span style=\"font-size: 22px; color: rgb(102, 102, 102);\">Проверьте введённый код и соединение с интернетом</span></p><p style=\"margin: 0px; line-height: 26px;\"><span style=\"color: rgb(102, 102, 102); font-size: 22px;\">и попробуйте снова</span></p>',
                            align: 'center'
                        },
                        {
                            type: 'text',
                            id: 'titleCodeError',
                            textStyle: ['', '', '32px', '', ''],
                            font: ['open-sans-condensed, sans-serif', [32, 'px'], 'rgba(48,108,0,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                            display: 'none',
                            rect: ['182px', '274px', '660px', '40px', 'auto', 'auto'],
                            text: '<p style=\"margin:0px\">​<font color=\"#cc0000\">Неверный код либо отсутствует соединение</font></p>',
                            align: 'center'
                        },
                        {
                            rect: ['91px', '128px', '866px', '437px', 'auto', 'auto'],
                            overflow: 'auto',
                            display: 'none',
                            type: 'group',
                            id: 'textGroup',
                            c: [
                            {
                                type: 'text',
                                id: 'textLawArticle_3',
                                text: '<p style=\"margin: 0px;\">​1) обработка персональных данных осуществляется с согласия субъекта персональных данных на обработку его персональных данных;</p><p style=\"margin: 0px;\">2) обработка персональных данных необходима для достижения целей, предусмотренных международным договором Российской Федерации или законом, для осуществления и выполнения возложенных законодательством Российской Федерации на оператора функций, полномочий и обязанностей;</p><p style=\"margin: 0px;\">3) обработка персональных данных необходима для осуществления правосудия, исполнения судебного акта, акта другого органа или должностного лица, подлежащих исполнению в соответствии с законодательством Российской Федерации об исполнительном производстве (далее - исполнение судебного акта);</p><p style=\"margin: 0px;\">4) обработка персональных данных необходима для исполнения полномочий федеральных органов исполнительной власти, органов государственных внебюджетных фондов, исполнительных органов государственной власти субъектов Российской Федерации, органов местного самоуправления и функций организаций, участвующих в предоставлении соответственно государственных и муниципальных услуг, предусмотренных Федеральным законом от 27 июля 2010 года N 210-ФЗ \"Об организации предоставления государственных и муниципальных услуг\", включая регистрацию субъекта персональных данных на едином портале государственных и муниципальных услуг и (или) региональных порталах государственных и муниципальных услуг;</p><p style=\"margin: 0px;\">5) обработка персональных данных необходима для исполнения договора, стороной которого либо выгодоприобретателем или поручителем по которому является субъект персональных данных, в том числе в случае реализации оператором своего права на уступку прав (требований) по такому договору, а также для заключения договора по инициативе субъекта персональных данных или договора, по которому субъект персональных данных будет являться выгодоприобретателем или поручителем;</p><p style=\"margin: 0px;\">6) обработка персональных данных необходима для защиты жизни, здоровья или иных жизненно важных интересов субъекта персональных данных, если получение согласия субъекта персональных данных невозможно;</p><p style=\"margin: 0px;\">7) обработка персональных данных необходима для осуществления прав и законных интересов оператора или третьих лиц либо для достижения общественно значимых целей при условии, что при этом не нарушаются права и свободы субъекта персональных данных;</p><p style=\"margin: 0px;\">8) обработка персональных данных необходима для осуществления профессиональной деятельности журналиста и (или) законной деятельности средства массовой информации либо научной, литературной или иной творческой деятельности при условии, что при этом не нарушаются права и законные интересы субъекта персональных данных;</p><p style=\"margin: 0px;\">9) обработка персональных данных осуществляется в статистических или иных исследовательских целях, за исключением целей, указанных в статье 15 настоящего Федерального закона, при условии обязательного обезличивания персональных данных;</p><p style=\"margin: 0px;\">10) осуществляется обработка персональных данных, доступ неограниченного круга лиц к которым предоставлен субъектом персональных данных либо по его просьбе (далее - персональные данные, сделанные общедоступными субъектом персональных данных);</p><p style=\"margin: 0px;\">11) осуществляется обработка персональных данных, подлежащих опубликованию или обязательному раскрытию в соответствии с федеральным законом.</p>',
                                font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(102,102,102,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                                overflow: 'visible',
                                display: 'none',
                                rect: ['0px', '128px', '840px', '309px', 'auto', 'auto'],
                                align: 'left'
                            },
                            {
                                type: 'text',
                                id: 'textLawArticle_2',
                                text: '<p style=\"margin: 0px;\">​1. Обработка персональных данных должна осуществляться с соблюдением принципов и правил, предусмотренных настоящим Федеральным законом. Обработка персональных данных допускается в следующих случаях:</p>',
                                font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(102,102,102,1.00)', '400', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                                overflow: 'visible',
                                display: 'none',
                                rect: ['0px', '69px', '840px', '52px', 'auto', 'auto'],
                                align: 'left'
                            },
                            {
                                type: 'text',
                                id: 'textLawArticle_1',
                                text: '<p style=\"margin: 0px;\">​Статья 6. Условия обработки персональных данных </p><p style=\"margin: 0px;\"><span style=\"font-weight: 400;\">(в ред. Федерального закона от 25.07.2011 N 261-ФЗ)</span></p>',
                                rect: ['0px', '2px', '840px', '54px', 'auto', 'auto'],
                                overflow: 'visible',
                                display: 'none',
                                align: 'center',
                                font: ['open-sans-condensed, sans-serif', [22, 'px'], 'rgba(102,102,102,1.00)', '600', 'none solid rgb(255, 255, 255)', 'normal', 'break-word', ''],
                                textStyle: ['', '', '24px', '', '']
                            }]
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '1024px', '768px']
                        }
                    }
                },
                timeline: {
                    duration: 4000,
                    autoPlay: false,
                    labels: {
                        "tableResultSubmitSuccessful": 0,
                        "tableResultSubmitFailure": 1000,
                        "lawArticle": 2000,
                        "representativeCodeError": 3000
                    },
                    data: [
                        [
                            "eid2045",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${textLawArticle_2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid2085",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${textLawArticle_2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2034",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${textGroup}",
                            'none',
                            'block'
                        ],
                        [
                            "eid2083",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${textGroup}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2156",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${titleCodeError}",
                            'none',
                            'block'
                        ],
                        [
                            "eid2157",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${titleCodeError}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2015",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '218px',
                            '218px'
                        ],
                        [
                            "eid2025",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '218px',
                            '99px'
                        ],
                        [
                            "eid2076",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '99px',
                            '218px'
                        ],
                        [
                            "eid2020",
                            "width",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '702px',
                            '702px'
                        ],
                        [
                            "eid2030",
                            "width",
                            2000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '702px',
                            '910px'
                        ],
                        [
                            "eid2081",
                            "width",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '702px',
                            '702px'
                        ],
                        [
                            "eid2019",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '220px',
                            '220px'
                        ],
                        [
                            "eid2029",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '220px',
                            '101px'
                        ],
                        [
                            "eid2080",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '101px',
                            '220px'
                        ],
                        [
                            "eid2043",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${textLawArticle_1}",
                            'none',
                            'block'
                        ],
                        [
                            "eid2084",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${textLawArticle_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid990",
                            "top",
                            0,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '150px',
                            '150px'
                        ],
                        [
                            "eid2033",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '150px',
                            '30px'
                        ],
                        [
                            "eid2094",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '30px',
                            '150px'
                        ],
                        [
                            "eid991",
                            "left",
                            0,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '479px',
                            '479px'
                        ],
                        [
                            "eid2032",
                            "left",
                            2000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '479px',
                            '479px'
                        ],
                        [
                            "eid2093",
                            "left",
                            3000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            '479px',
                            '479px'
                        ],
                        [
                            "eid2009",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${textLawArticle_3}",
                            'none',
                            'block'
                        ],
                        [
                            "eid2086",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${textLawArticle_3}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2011",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Button_Dialog_Ok}",
                            '314px',
                            '383px'
                        ],
                        [
                            "eid2023",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${Button_Dialog_Ok}",
                            '315px',
                            '565px'
                        ],
                        [
                            "eid2092",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Button_Dialog_Ok}",
                            '565px',
                            '410px'
                        ],
                        [
                            "eid2010",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Button_Dialog_Ok}",
                            '387px',
                            '385px'
                        ],
                        [
                            "eid2022",
                            "left",
                            2000,
                            0,
                            "linear",
                            "${Button_Dialog_Ok}",
                            '385px',
                            '385px'
                        ],
                        [
                            "eid2091",
                            "left",
                            3000,
                            0,
                            "linear",
                            "${Button_Dialog_Ok}",
                            '385px',
                            '385px'
                        ],
                        [
                            "eid2021",
                            "height",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '330px',
                            '330px'
                        ],
                        [
                            "eid2031",
                            "height",
                            2000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '330px',
                            '560px'
                        ],
                        [
                            "eid2082",
                            "height",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '330px',
                            '330px'
                        ],
                        [
                            "eid2014",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '155px',
                            '155px'
                        ],
                        [
                            "eid2024",
                            "left",
                            2000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '155px',
                            '51px'
                        ],
                        [
                            "eid2075",
                            "left",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '51px',
                            '155px'
                        ],
                        [
                            "eid2017",
                            "height",
                            0,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '340px',
                            '340px'
                        ],
                        [
                            "eid2027",
                            "height",
                            2000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '570px',
                            '570px'
                        ],
                        [
                            "eid2078",
                            "height",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '570px',
                            '340px'
                        ],
                        [
                            "eid2008",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${textSuccessful}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2089",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${textCodeError}",
                            'none',
                            'block'
                        ],
                        [
                            "eid2090",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${textCodeError}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2158",
                            "display",
                            0,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid2159",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${anim_congratulation_symbol_1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2018",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '161px',
                            '161px'
                        ],
                        [
                            "eid2028",
                            "left",
                            2000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '161px',
                            '57px'
                        ],
                        [
                            "eid2079",
                            "left",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '57px',
                            '161px'
                        ],
                        [
                            "eid2063",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${textFailure}",
                            'none',
                            'block'
                        ],
                        [
                            "eid2064",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${textFailure}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2016",
                            "width",
                            0,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '714px',
                            '714px'
                        ],
                        [
                            "eid2026",
                            "width",
                            2000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '922px',
                            '922px'
                        ],
                        [
                            "eid2077",
                            "width",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2Copy}",
                            '922px',
                            '714px'
                        ]
                    ]
                }
            },
            "Button_Dialog_Ok": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['15px', '14px', '216px', '59px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)'],
                            id: 'RoundRect2',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(0,84,160,1.00)']
                        },
                        {
                            type: 'text',
                            id: 'Text2',
                            text: '<p style=\"margin:0px\">ОК</p>',
                            rect: ['114px', '31px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [24, ''], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            rect: ['0px', '0px', '254px', '96px', 'auto', 'auto'],
                            type: 'rect',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            id: 'Rectangle',
                            opacity: '0',
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '254px', '96px']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000
                    },
                    data: [
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '14px',
                            '14px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '14px',
                            '18px'
                        ],
                        [
                            "eid1989",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${Text2}",
                            '31px',
                            '35px'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '15px',
                            '15px'
                        ]
                    ]
                }
            },
            "Table_Result_old": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '1000px', '56px', 'auto', 'auto'],
                            borderRadius: ['0px', '0px', '0px', '0px 0px'],
                            id: 'RoundRect2Copy4',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(192,239,206,0.60)']
                        },
                        {
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            rect: ['0px', '56px', '1000px', '424px', 'auto', 'auto'],
                            borderRadius: ['0px', '0px', '0px', '0px 0px'],
                            overflow: 'auto',
                            id: 'Table_Result_Items',
                            opacity: '1',
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['40px', '18px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(80,80,80,1.00)', '700', 'none solid rgb(0, 80, 152)', 'normal', 'break-word', 'nowrap'],
                            text: '<p style=\"margin:0px\">ФИО, Специальность</p>',
                            id: 'tab_fio',
                            textStyle: ['', '', '20px', '', ''],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['280px', '8px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(80,80,80,1.00)', '700', 'none solid rgb(0, 80, 152)', 'normal', 'break-word', 'nowrap'],
                            text: '<p style=\"margin:0px\">Название и №<br>ЛПУ/Аптеки</p>',
                            id: 'tab_lpu',
                            textStyle: ['', '', '20px', '', ''],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['480px', '8px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(80,80,80,1.00)', '700', 'none solid rgb(0, 80, 152)', 'normal', 'break-word', 'nowrap'],
                            text: '<p style=\"margin:0px\">Город/нас. пункт,</p><p style=\"margin:0px\">область</p>',
                            id: 'tab_city',
                            textStyle: ['', '', '20px', '', ''],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['670px', '18px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(80,80,80,1.00)', '700', 'none solid rgb(0, 80, 152)', 'normal', 'break-word', 'nowrap'],
                            text: '<p style=\"margin:0px\">Email</p>',
                            id: 'tab_email',
                            textStyle: ['', '', '20px', '', ''],
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: ['850px', '18px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [18, 'px'], 'rgba(80,80,80,1.00)', '700', 'none solid rgb(0, 80, 152)', 'normal', 'break-word', 'nowrap'],
                            text: '<p style=\"margin:0px\">Телефон</p>',
                            id: 'tab_phone',
                            textStyle: ['', '', '20px', '', ''],
                            align: 'left',
                            type: 'text'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '1000px', '480px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "Button_Question_Start": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '4px', '216px', '50px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            fill: ['rgba(0,43,81,1.00)'],
                            id: 'RoundRect2',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'rect',
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)']
                        },
                        {
                            type: 'image',
                            display: 'none',
                            rect: ['76px', '-68px', '72px', '84px', 'auto', 'auto'],
                            id: 'continue_button_down',
                            fill: ['rgba(0,0,0,0)', im + 'continue_button_down.png', '0px', '0px']
                        },
                        {
                            type: 'image',
                            display: 'block',
                            rect: ['79px', '-70px', '69px', '84px', 'auto', 'auto'],
                            id: 'continue_button_over',
                            fill: ['rgba(0,0,0,0)', im + 'continue_button_over.png', '0px', '0px']
                        },
                        {
                            font: ['open-sans-condensed, sans-serif', [22, 'px'], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', ''],
                            type: 'text',
                            align: 'center',
                            id: 'Text2Copy3',
                            textStyle: ['0px', '1px', '26px', '', ''],
                            text: '<p style=\"margin:0px\">Начать презентацию</p>',
                            rect: ['0px', '19px', '224px', '30px', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            rect: ['0px', '0px', '224px', '62px', 'auto', 'auto'],
                            opacity: '0',
                            id: 'Rectangle',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '224px', '62px']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: true,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000
                    },
                    data: [
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '4px'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1.00)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid1917",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${Text2Copy3}",
                            '15px',
                            '19px'
                        ],
                        [
                            "eid2061",
                            "display",
                            1500,
                            0,
                            "linear",
                            "${continue_button_over}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2062",
                            "display",
                            1500,
                            0,
                            "linear",
                            "${continue_button_down}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1979",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ]
                    ]
                }
            },
            "Button_Result_Submit_1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            fill: ['rgba(0,84,160,1.00)'],
                            rect: ['0px', '0px', '216px', '50px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            type: 'rect',
                            id: 'RoundRect2',
                            opacity: '0.5',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)']
                        },
                        {
                            type: 'text',
                            rect: ['18px', '17px', 'auto', 'auto', 'auto', 'auto'],
                            opacity: '0.8',
                            text: '<p style=\"margin:0px\">Отправить результаты</p>',
                            id: 'Text2Copy3',
                            textStyle: ['0px', '1px', '24px', '', ''],
                            align: 'center',
                            font: ['open-sans-condensed, sans-serif', [20, 'px'], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', 'nowrap']
                        },
                        {
                            type: 'rect',
                            rect: ['0px', '0px', '224px', '62px', 'auto', 'auto'],
                            id: 'Rectangle',
                            opacity: '0',
                            display: 'block',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '224px', '62px']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: true,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000,
                        "disable": 3000
                    },
                    data: [
                        [
                            "eid2003",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '1',
                            '1'
                        ],
                        [
                            "eid2002",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '1',
                            '0.5'
                        ],
                        [
                            "eid2006",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Rectangle}",
                            'block',
                            'block'
                        ],
                        [
                            "eid2007",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${Rectangle}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2004",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '1',
                            '1'
                        ],
                        [
                            "eid2005",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '1',
                            '0.8'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid1998",
                            "left",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid1999",
                            "border-color",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            'rgba(179,179,179,1.00)',
                            'rgba(255,255,255,1.00)'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid1996",
                            "background-color",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,43,81,1.00)',
                            'rgba(0,84,160,1.00)'
                        ],
                        [
                            "eid1916",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '17px'
                        ],
                        [
                            "eid1917",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '21px'
                        ],
                        [
                            "eid2001",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '21px',
                            '17px'
                        ],
                        [
                            "eid1919",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid2000",
                            "left",
                            3000,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '4px'
                        ],
                        [
                            "eid1997",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '4px',
                            '0px'
                        ]
                    ]
                }
            },
            "Button_Result_Submit": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            id: 'RoundRect2',
                            opacity: '0.55',
                            rect: ['0px', '0px', '216px', '50px', 'auto', 'auto'],
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)'],
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            fill: ['rgba(0,43,81,1.00)']
                        },
                        {
                            type: 'text',
                            id: 'Text2Copy3',
                            textStyle: ['0px', '1px', '26px', '', ''],
                            rect: ['0px', '15px', '224px', '30px', 'auto', 'auto'],
                            align: 'center',
                            font: ['open-sans-condensed, sans-serif', [20, 'px'], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', ''],
                            opacity: '0.75',
                            text: '<p style=\"margin:0px\">​Отправить результаты</p>'
                        },
                        {
                            type: 'rect',
                            id: 'Rectangle',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            cursor: 'pointer',
                            rect: ['0px', '0px', '224px', '62px', 'auto', 'auto'],
                            display: 'block',
                            opacity: '0',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '224px', '62px']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: true,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000,
                        "disable": 3000
                    },
                    data: [
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '4px'
                        ],
                        [
                            "eid2053",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '4px',
                            '0px'
                        ],
                        [
                            "eid2047",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${Rectangle}",
                            'block',
                            'none'
                        ],
                        [
                            "eid2048",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '1',
                            '1'
                        ],
                        [
                            "eid2049",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '1',
                            '0.75'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid2052",
                            "left",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1.00)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid1917",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${Text2Copy3}",
                            '15px',
                            '19px'
                        ],
                        [
                            "eid2055",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '19px',
                            '15px'
                        ],
                        [
                            "eid1979",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid2054",
                            "left",
                            3000,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid2050",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '1',
                            '1'
                        ],
                        [
                            "eid2051",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '1',
                            '0.55'
                        ]
                    ]
                }
            },
            "Button_Verify": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '4px', '104px', '50px', 'auto', 'auto'],
                            borderRadius: ['14px', '14px', '14px', '14px 14px'],
                            boxShadow: ['', 0, 2, 3, 0, 'rgba(0,0,0,0.65098)'],
                            id: 'RoundRect2',
                            stroke: [4, 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(0,84,160,1.00)']
                        },
                        {
                            rect: ['30px', '21px', 'auto', 'auto', 'auto', 'auto'],
                            font: ['open-sans-condensed, sans-serif', [20, 'px'], 'rgba(255,255,255,1.00)', '700', 'none', '', 'break-word', 'nowrap'],
                            textStyle: ['0px', '1px', '24px', '', 'uppercase'],
                            id: 'Text2Copy3',
                            text: '<p style=\"margin: 0px;\">Далее</p>',
                            align: 'center',
                            type: 'text'
                        },
                        {
                            rect: ['0px', '0px', '112px', '62px', 'auto', 'auto'],
                            type: 'rect',
                            stroke: [4, 'rgb(227, 227, 227)', 'none'],
                            id: 'Rectangle',
                            opacity: '0',
                            cursor: 'pointer',
                            fill: ['rgba(0,80,152,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '112px', '62px']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: true,
                    labels: {
                        "normal": 0,
                        "over": 1000,
                        "down": 2000
                    },
                    data: [
                        [
                            "eid36",
                            "border-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(255,255,255,1.00)',
                            'rgba(179,179,179,1.00)'
                        ],
                        [
                            "eid31",
                            "background-color",
                            0,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,84,160,1.00)',
                            'rgba(0,59,111,1.00)'
                        ],
                        [
                            "eid33",
                            "background-color",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            'rgba(0,59,111,1)',
                            'rgba(0,43,81,1.00)'
                        ],
                        [
                            "eid1919",
                            "left",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '30px',
                            '30px'
                        ],
                        [
                            "eid1916",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '17px'
                        ],
                        [
                            "eid1917",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${Text2Copy3}",
                            '17px',
                            '21px'
                        ],
                        [
                            "eid211",
                            "top",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ],
                        [
                            "eid210",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '4px'
                        ],
                        [
                            "eid203",
                            "left",
                            0,
                            0,
                            "linear",
                            "${RoundRect2}",
                            '0px',
                            '0px'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("index_edgeActions.js");
})("EDGE-3961720");
