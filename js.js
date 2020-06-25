class calculator{
    constructor(prevOperTextEle,prsntOperTextEle){
        this.prevOperTextEle = prevOperTextEle
        this.prsntOperTextEle = prsntOperTextEle
        this.clear()
    }

    clear(){
        this.currentOperand= ''
        this.prevOperand= ''
        this.operation = undefined
    } 
    
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString()+number.toString()

    }

    chooseOperation(operation){
        if(this.currentOperand==='')return
        if(this.prevOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev =  parseFloat(this.prevOperand)
        const current =  parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current))return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break    
            default:
                return    
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''
        
    }

    updateDisplay(){
        this.prsntOperTextEle.innerHTML = this.currentOperand
        this.prevOperTextEle.innerHTML = this.prevOperand
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButtons = document.querySelector('[data-equal]')
const allClearButtons = document.querySelector('[data-allc]')
const clearButtons = document.querySelector('[data-clear]')
const prevOperTextEle = document.querySelector('[data-prev]')
const prsntOperTextEle = document.querySelector('[data-present]')

const calculator1 = new calculator(prevOperTextEle,prsntOperTextEle);

numberButtons.forEach(button=>{
    button.addEventListener('click',() =>{
        calculator1.appendNumber(button.innerHTML)
        calculator1.updateDisplay()
    })
})

operationButtons.forEach(button=>{
    button.addEventListener('click',() =>{
        calculator1.chooseOperation(button.innerHTML)
        calculator1.updateDisplay()
    })
})

equalButtons.addEventListener('click', button =>{
    calculator1.compute()
    calculator1.updateDisplay()
})

allClearButtons.addEventListener('click', button =>{
    calculator1.clear()
    calculator1.updateDisplay()
})

clearButtons.addEventListener('click', button =>{
    calculator1.delete()
    calculator1.updateDisplay()
})