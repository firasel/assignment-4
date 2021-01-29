//calculate price and update this
//first parameter is change quantity number & second is old quantity number & third is condition check
function priceCalculate(quantityNumber, oldQuantityNumber, check) {
    const subtotal = document.getElementById('subtotal')
    const vat = document.getElementById('vat')
    const total = document.getElementById('total')
    let price
    let updateSubtotal
    let updateVat
    let updateTotal
    let currentPrice
    let oldPrice
    if (check) {
        price = 150
        currentPrice = quantityNumber * price
        //economy price is 100
        oldPrice = oldQuantityNumber * 100
        updateSubtotal = currentPrice + oldPrice
    } else {
        price = 100
        currentPrice = quantityNumber * price
        //first class price is 150
        oldPrice = oldQuantityNumber * 150
        updateSubtotal = currentPrice + oldPrice
    }
    //calculate vat and total price
    updateVat = updateSubtotal * 0.1
    updateTotal = updateSubtotal + updateVat
    //update subtotal & vat & total price
    subtotal.textContent = updateSubtotal
    vat.textContent = updateVat
    total.textContent = updateTotal
}


//add event listener for plus minus buttons
function buttonAddEvent(buttonId) {
    let button = document.getElementById(buttonId)
    const firstClassInput = document.getElementById('firstClassInput')
    const economyInput = document.getElementById('economyInput')
    button.addEventListener('click', function (event) {
        let firstInputNumber = parseInt(firstClassInput.value)
        let economyInputNumber = parseInt(economyInput.value)
        if (buttonId == 'firstPlusButton' || buttonId == 'economyPlusButton') {
            if (buttonId == 'firstPlusButton') {
                firstClassInput.value = ++firstInputNumber
                // first class for third parameter true
                priceCalculate(firstInputNumber, economyInputNumber, true)
            } else if (buttonId == 'economyPlusButton') {
                economyInput.value = ++economyInputNumber
                //economy for third parameter false
                priceCalculate(economyInputNumber, firstInputNumber, false)
            }
        } else if (buttonId == 'firstMinusButton' || buttonId == 'economyMinusButton') {
            if (buttonId == 'firstMinusButton' && firstInputNumber > 0) {
                firstClassInput.value = --firstInputNumber
                // first class for third parameter true
                priceCalculate(firstInputNumber, economyInputNumber, true)
            } else if (buttonId == 'economyMinusButton' && economyInputNumber > 0) {
                economyInput.value = --economyInputNumber
                //economy for third parameter false
                priceCalculate(economyInputNumber, firstInputNumber, false)
            }
        }
    })
}


//parameter is html id name
buttonAddEvent('firstPlusButton')
buttonAddEvent('firstMinusButton')
buttonAddEvent('economyPlusButton')
buttonAddEvent('economyMinusButton')


//open message dialog
document.getElementById('bookNowButton').addEventListener('click', function () {
    //collect order details
    const total = document.getElementById('total').innerText
    const firstClass = document.getElementById('firstClassInput').value
    const economy = document.getElementById('economyInput').value
    const alertDiv = document.getElementById('alert-div')
    const icon = document.getElementById('successIcon')
    const fullBackground = document.getElementsByClassName('fullBackground-div')[0];
    const messageTitle = document.getElementById('messageTitle')
    const messageText = document.getElementById('messageText')
    //style added for showing div
    alertDiv.style.display = "block"
    fullBackground.style.height = screen.height + "px";
    //check orders
    if (parseFloat(total) > 0) {
        messageTitle.textContent = 'Successfully Booked'
        messageText.innerHTML = 'You have booked first class <b>' + firstClass + '</b> and economy <b>' + economy + '</b>. Total price is <b>' + total + '</b>'
        icon.style.color = 'green'
    } else {
        messageTitle.textContent = 'Booking was not successful'
        messageText.textContent = 'you have no bookings, please try again.'
        icon.style.color = 'red'
    }
})


//close message dialog
document.getElementById('closeButton').addEventListener('click', function () {
    document.getElementById('alert-div').style.display = "none"
})