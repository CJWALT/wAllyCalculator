let valueStrMemory = null; 
let operatorMemory = null; 
let result;
//Select DOM elements 

const hourEl = document.querySelector(".hour"); 
const minuteEl = document.querySelector(".minute");
const valueEl = document.querySelector(".calculator_display");

const clear = document.querySelector(".clr");
const pmEl = document.querySelector(".pm")
const percentEl = document.querySelector('.percent');

const decimalEl = document.querySelector('.decimal'); 
const number0El = document.querySelector('.number-0');
const number1El = document.querySelector('.number-1');
const number2El = document.querySelector('.number-2'); 
const number3El = document.querySelector('.number-3'); 
const number4El = document.querySelector('.number-4'); 
const number5El = document.querySelector('.number-5'); 
const number6El = document.querySelector('.number-6'); 
const number7El = document.querySelector('.number-7'); 
const number8El = document.querySelector ('.number-8'); 
const number9El = document.querySelector('.number-9'); 

    const numberElArray = [ number0El, number1El, number2El, number3El, number4El, 
    number5El, number6El, number7El, number8El, number9El ];

    let getStrValue = () => valueEl.textContent.split(',').join('');
    let getValueNum = () =>{ 
        return parseFloat(getStrValue());
    }
//add event listener keydown to accept input with the keyboard;
window.addEventListener('keydown', (a) => { 
   if(a.key == '0'){ 
       display('0');
   }
   else if(a.key =='1'){ 
       display('1'); 
   }
   
   else if(a.key =='2'){ 
    display('2');
    }
   else if(a.key =='3'){ 
    display('3');
    }
   else if(a.key =='4'){ 
    display('4');
    }
    else if(a.key =='5'){ 
    display('5');
    }
   else if(a.key =='6'){ 
    display('6');
    }
   else if(a.key =='7'){ 
    display('7');
    }
   else if(a.key =='8'){ 
    display('8');
    }
   else if(a.key =='9'){ 
    display('9');
    }
   else if(a.key =='+'){ 
    operatorClick('addition');
    }
    else if(a.key =='-'){ 
        operatorClick('subtraction');
    }
    else if(a.key =='*'){ 
        operatorClick('multiplication');
    }
    else if(a.key =='/'){ 
        operatorClick('divide');
    }
    else if(a.key == 'Enter'){ 
        setStrValue(resultOfOperationAsStr());
        valueStrMemory = null; 
        operatorMemory = null;
        }
    else if (a.key == '.'){
        display('.')
    }
});

   
let add = (a, b) => {
    return a+b; 
} 

let sub = (a, b) => {
    return a-b; 
}

let multiplication = (a, b) => { 
    return a * b; 
}

let divide = (a, b) => {
    return (a / b);
}

let resultOfOperationAsStr = ()=>{ 

    const displayValueNum = getValueNum();
    const valueInMemory = parseFloat(valueStrMemory); 

    if (operatorMemory === 'addition'){
        result = operate( valueInMemory, displayValueNum, 'addition');
    }else if(operatorMemory === 'subtraction'){
        result = operate( valueInMemory, displayValueNum, 'subtraction');
    } else if(operatorMemory === 'multiplication'){
        result = operate(valueInMemory, displayValueNum,  'multiplication');
    } else if (operatorMemory === 'divide'){ 
        result = roundUp(operate(  valueInMemory, displayValueNum,  'divide'), 7);
        } 
    return  result.toString();
}

let operate = (x, y, op) =>{ 
    
    if (op === 'addition'){
        return add(x, y);
    } else if(op === 'subtraction'){ 
       return sub(x, y);
    } else if(op === 'multiplication'){
        return multiplication( x, y); 
    } else if (op === 'divide'){
        if( y === 0){
            return 'funky';
        } else{ 
         return divide (x, y);    
        }    
    }
}

const operatorClick = (operation) => { 
    const displayValue = getStrValue(); 
    if(!valueStrMemory){ 
        valueStrMemory = displayValue;
        operatorMemory = operation; 
        setStrValue('0');
        return;
    }
   valueStrMemory = resultOfOperationAsStr(); 
    operatorMemory = setStrValue(result.toString());
    // setStrValue('0');
  
}

// add eventlisteners to operator and equals element

const operators = document.querySelectorAll('.operator');

for( let i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', () =>{
        if(operators[i].classList.contains('plus')){ 
            operatorClick('addition');
        }
        else if (operators[i].classList.contains('subtraction')){
            operatorClick('subtraction')
        }
        else if(operators[i].classList.contains('multiplication')){ 
            operatorClick('multiplication'); 
        }
        else if(operators[i].classList.contains('divide')){ 
            operatorClick('divide'); 
        }
        else if(operators[i].classList.contains('equal')){
            
            if(valueStrMemory){ 
               setStrValue(resultOfOperationAsStr());
                valueStrMemory = null; 
                operatorMemory = null;
            } 
        }
    } )
}



const setStrValue = (valueStr) => {
    if (valueStr[valueStr.length - 1 ] === '.'){
        valueEl.textContent += '.';
        return;
    }
        const [wholeNumStr, decimalStr] = valueStr.split('.');

        if (decimalStr){
            valueEl.innerText = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr; 
            }
                else { 
                valueEl.textContent = parseFloat(wholeNumStr).toLocaleString();
            }
}


let display = (numStr) => {
   let displayValue = getStrValue();
          if (displayValue === '0'){
                setStrValue(numStr)
            } 
            // else if (displayValue.length > 9){
            //         getStrValue().innerText = displayValue.substring(0, 9)
            // }

            else 
            
                      {
                setStrValue(displayValue + numStr);
            }  
          
}

let roundUp = (num, places) => {
     return parseFloat(Math.round(num + 'e' + places) + 'e-' + places).toString();
}

//add eventlisteners to numbers
for (let i = 0; i < numberElArray.length; i++){ 
    const numberEl = numberElArray[i]; 
    numberEl.addEventListener('click', () => {
        display(i.toString());
    } )
}

//add eventlistener to decimal

decimalEl.addEventListener('click', () => { 
    const displayValue = getStrValue(); 

    if(!displayValue.includes('.')){
        setStrValue(displayValue + '.');
    }
})
//addeventlisteners to functions
  clear.addEventListener ('click', () => {
      setStrValue('0'); 
      valueStrMemory = null; 
      operatorMemory = null;
  });

  pmEl.addEventListener('click', () =>{
    const displayValue = getStrValue ();
    const displayValueNum = getValueNum();

    if(displayValue === '-0'){ 

        setStrValue ('0'); 
        return;
    }
    if( displayValueNum >= '0'){
        setStrValue ('-' + displayValue); 
    }else{
        setStrValue(displayValue.substring(1));

    }

  })

  percentEl.addEventListener('click', () => {
      
      const displayValueNum = getValueNum(); 
      result = displayValueNum / 100; 
      setStrValue(result.toString()); 
      valueStrMemory = null; 
      operatorMemory = null;
  })





//update time 
const updateTime = () =>{

    const currentTime = new Date(); 

    let currentHour = currentTime.getHours(); 
    const currentMinute = currentTime.getMinutes();

    if( currentHour > 12){ 
        currentHour -=12;
    }

    hourEl.textContent = currentHour.toString().padStart(2, '0'); 
    minuteEl.textContent = currentMinute.toString().padStart(2, '0')

}
setInterval(updateTime, 1000);
updateTime();