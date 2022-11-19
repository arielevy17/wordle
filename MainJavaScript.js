
const START_INPUT_LOCATION=1;
const START_RANDOM_NUM=0;
const DAY_IN_MILI_SECUNDS=86400000;
const START_LINE_OR_INPUT_NUM=1;
const END_LINE_NUM=6;
const INPUTS_SUM_IN_LINE=5;
const REMAINDER_BETWEEN_END_TO_START_INPUT=4;
const INPUTS_SUM=30;
const REMAINDER_BETWEEN_INPUT_BEFORE=1;


let strings = ["ממטרה", "מכונה", "נקודה","בדיחה","חינוכ", "תקופה", "סיפור", "תאונה", "שירות", "מדריכ", "פגישה", "חופשה", "ראיונ", "הריונ", "רווקה" ,"תמיכה" ,"עובדה", "עבודה", "תקציב", "פעולה", "ניתוח", "פרצופ", "התחלה", "ספורט" ,"הפסקה" ,"שחייה", "חשיבה", "כלכלה" ,"תרבות", "מרפאה"];
let word;
let location1 = START_INPUT_LOCATION;

function instructions(){
    alert("בכל 24 שעות נבחרת מילה(שם עצם) בעלת חמש אותיות,עליך לנחש מילה זו. \n באם האות נכונה ונמצאת במיקום הנכון הרקע יצבע בירוק. \n באם האות נכונה במיקום הלא נכון הרקע יצבע בצהוב.\n באם האות לא קיימת במשפט הרקע יצבע באפור. \n (שים לב: באם יש אות סופית החלף אותה באות רגילה.) ")
}

function getString() { //  בחירת מילה רנדומאלית (יקרה ברגע הרצת הפונ) ולאחר מכן הפונ newStringEveryDay מישום שיש להמתין 24 שעות עד שתפעל בפעם הראשונה
    word = strings[Math.floor(Math.random() * (strings.length-START_RANDOM_NUM)+START_RANDOM_NUM)];
    document.getElementById("word").innerText = word;
    alert("מילה נבחרה")
}

function newStringEveryDay(){ // בוחרת מילה חדשה בכל 24 שעות
    setInterval(()=>getString(),DAY_IN_MILI_SECUNDS)
}

function existWord(){
    let currentWord="";
    let lineNum=START_LINE_OR_INPUT_NUM;
    for (let j = START_LINE_OR_INPUT_NUM; j < END_LINE_NUM+START_LINE_OR_INPUT_NUM; j++) {
        if (location1-REMAINDER_BETWEEN_INPUT_BEFORE === lineNum * INPUTS_SUM_IN_LINE) {
            for (let i = ((lineNum * INPUTS_SUM_IN_LINE) - REMAINDER_BETWEEN_END_TO_START_INPUT); i <= lineNum * INPUTS_SUM_IN_LINE; i++) {
                currentWord += document.getElementById(Number(i)).value
            }
            for (let i = 0; i < strings.length; i++) {
                if (currentWord === strings[i]) {
                    return true;
                }
            }
        } else {
            lineNum++;
        }
    }
    alert("מילה לא קיימת");
    return false;
    }


function checkLetter(id,lineNum) {
    let letter;
    lineNum--;
    letter = document.getElementById(Number(id)).value;
    for (i = 0; i <word.length; i++) {
        if (letter !== word.charAt(i)) {
            document.getElementById(Number(id)).style.backgroundColor = 'gray';
        } else {
            document.getElementById(Number(id)).style.backgroundColor = 'yellow';
            break;
        }
    }
    if (lineNum===0){
        if (letter === word.charAt(id-1)) {
            document.getElementById(Number(id)).style.backgroundColor = 'green';
        }
    }
    else {
        if (letter === word.charAt(id-REMAINDER_BETWEEN_INPUT_BEFORE-(INPUTS_SUM_IN_LINE * lineNum))) {
            document.getElementById(Number(id)).style.backgroundColor = 'green';
        }
    }
}

function checkAll() {
    let startLine = START_LINE_OR_INPUT_NUM;
    if (existWord()) {
        for (let j = 0; j < END_LINE_NUM; j++) {
            if (document.getElementById(Number((j + 1) * INPUTS_SUM_IN_LINE)).value !== "") {
                for (let i = (startLine * INPUTS_SUM_IN_LINE - REMAINDER_BETWEEN_END_TO_START_INPUT); i <= startLine * INPUTS_SUM_IN_LINE; i++) {
                    checkLetter(i, startLine);
                }
                startLine++;
            }
        }
   }
}

function putLetter(value) {
   if (location1<=INPUTS_SUM && lineWasCheck() && !win()) {
       document.getElementById(Number(location1)).value = value;
       location1++;
       return location1;
   }
}

function cancelKeyboardPress(){ //  מבטל קלט ממקשי המקלדת
    document.addEventListener("keypress",(event)=> {
        event.preventDefault();
        alert("לא מתאפשר שימוש במקלדת! אנא השתמש במקשי האותיות שבתחתית העמוד..")
        return false;

    })
}

function deleteLetter() {
    let backgroundColor= document.getElementById(Number(location1-REMAINDER_BETWEEN_INPUT_BEFORE)).style.backgroundColor;
    if (location1>START_INPUT_LOCATION) {
        if ( backgroundColor!== 'green' && backgroundColor!== 'yellow' && backgroundColor!== 'gray') {
            location1--;
            document.getElementById(Number(location1)).value = "";
            return location1;
        }
    }
}

function lineWasCheck(){
       for (let i =END_LINE_NUM ; i <= INPUTS_SUM; i+=INPUTS_SUM_IN_LINE) {
           if (location1===i) {
               let inputLineLimit = document.getElementById(Number(i-REMAINDER_BETWEEN_INPUT_BEFORE)).style.backgroundColor;
           if (inputLineLimit !== 'green' && inputLineLimit !== 'yellow' && inputLineLimit !== 'gray') {
            alert("עליך לבדוק תחילה את המילה שהשלמת בשורה זו")
           return false;
           }
       }
   }
   return true;
}

function win(){
    let correctLetterCounter=0;
    for (let j=START_LINE_OR_INPUT_NUM;j<END_LINE_NUM;j++) {
        if (location1 - REMAINDER_BETWEEN_INPUT_BEFORE === j * INPUTS_SUM_IN_LINE) {
            for (let i = ((j * INPUTS_SUM_IN_LINE) - REMAINDER_BETWEEN_END_TO_START_INPUT); i <= j * INPUTS_SUM_IN_LINE; i++) {
                if (document.getElementById(Number(i)).style.backgroundColor === 'green') {
                    correctLetterCounter++;
                }
            }
            if (correctLetterCounter === INPUTS_SUM_IN_LINE) {
                alert("בירכותיי ניצחת! מילה חדשה נבחרת בכל 24 שעות,יש להמתין לתום זמן זה..")
                return true;
            }
        }
    }
        return false;
}




