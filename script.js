/*
Name: Rohan Handa
Student Number: 166169219
Email: rhanda4@myseneca.ca
Section: Web222NAA
*/

// for responsive navbar 
let menu = doc.querySelector('.menu-icon');
let navbar = doc.querySelector('.nav-links');

menu.addEventListener('click', function() {
    navbar.cList.toggle('open-menu');
    menu.cList.toggle('move');
});

window.onscroll = () => {
    navbar.cList.remove('open-menu');
    menu.cList.remove('move');
}

// Code for getting the pay rate input field
let hiringRButton = doc.getElementById('hiring');
let questionRButton = doc.getElementById('question');
let commentRButton = doc.getElementById('comment');

// Variable to make sure that the form is only printed once no matter how many times the hiring button is clicked
var clicked = 0;

// Adding event listeners
hiringRButton.addEventListener('click', function() {
    if (clicked == 0) {
        generatePayRateInput();
        clicked++;
    }
});

questionRButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

commentRButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

// Function to generate the pay rate input field
function generatePayRateInput() {
    let break1 = doc.createElement('br');
    break1.id = 'b1';
    let break2 = doc.createElement('br');
    break2.id = 'b2';
    let break3 = doc.createElement('br');
    break3.id = 'b3';

    // Creating a label
    const node1 = doc.createElement("label");
    const textNode = doc.createTextNode("Expected Hourly Rate: ");
    node1.appendChild(textNode);
    node1.id = 'hiring-rate-label';

    // Creating the input Field
    const node2 = doc.createElement("input");
    node2.id = 'hiring-rate-input';
    node2.type = 'number';
    node2.step = '0.1';
    node2.placeholder = 'Hourly Pay';
    node2.cList.add('format')

    doc.querySelector(".radio-btns").appendChild(break1);
    doc.querySelector(".radio-btns").appendChild(break2);
    doc.querySelector(".radio-btns").appendChild(node1);
    doc.querySelector(".radio-btns").appendChild(break3);
    doc.querySelector(".radio-btns").appendChild(node2);
}

// Function to delete the pay rate input field
function deletePayRateInput() {
    let label = doc.getElementById('hiring-rate-label');
    let input = doc.getElementById('hiring-rate-input');
    let div = doc.querySelector(".radio-btns");
    let b1 = doc.getElementById('b1');
    let b2 = doc.getElementById('b2');
    let b3 = doc.getElementById('b3');

    div.removeChild(b1);
    div.removeChild(b2);
    div.removeChild(b3);
    div.removeChild(input);
    div.removeChild(label);
}

// code for Validation of form 
let messages = [];
const form = doc.getElementById('contact-form');
const errorElement = doc.getElementById('error');

form.addEventListener('submit', (e) => {
    messages = [];

    
    validateName();
    validateEmail();
    validateAddress();
    validateCity();
    validatePostalCode();
    validateMessage();

   
    if (clicked > 0) {
        payRateValidation();
    }


    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerHTML = `
        <h3>Incorrect Inputs Provided:</h3>
        <pre>${messages.join('\r\n')}</pre>
        `;
    }
})

form.addEventListener('reset', (e) => {
    messages = [];
    errorElement.innerHTML = '';
})


function validateName() {
    const inputName = doc.getElementById('name');
    if(nullChecker(inputName, 'Name')) {
        areAlphabets(inputName, '- Name should be valid - All characters should be alphabetical');
    }
}


function validateEmail() {
    const email = doc.getElementById('email');
    if (nullChecker(email, 'Email')) {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!(email.value.match(validRegex))) {
            messages.push("- Email Address is Invalid");
        }
    }    
}


function validateAddress() {
    const address = doc.getElementById('address');
    if (nullChecker(address, 'Address')) {
        if (address.value.length < 10) {
            messages.push("- Address should be atleast 10 characters long");
        }
    }
}


function validateCity() {
    const city = doc.getElementById('city');
    if(nullChecker(city, 'City')) {
        areAlphabets(city, '- City should be valid - All characters should be alphabetical');
    }
}


function validatePostalCode() {
    let postalCode = doc.getElementById('pCode');
    let validRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!(postalCode.value.match(validRegex))) {
        messages.push("- Invalid Postal Code");
    }
}


function validateMessage() {
    const message = doc.getElementById('message');
    if (nullChecker(message, 'Message')) {
        if (address.value.length < 10) {
            messages.push("- Message should be atleast 5 characters long");
        }
    }
}


function payRateValidation() {
    let payRateInput = doc.getElementById('hiring-rate-input');
    if (payRateInput.value <= 0) {
        messages.push("- Enter an appropriate expected hourly pay rate")
    }
}


function nullChecker(element, elementName) {
    result = true;
    if (element.value === '' || element.value == null) {
        messages.push(`- ${elementName} is required`);
        result = false;
    }

    return result;
}


function areAlphabets(element, message) {
    let validRegex = /^[A-Za-z\s]+$/;
    if (!(element.value.match(validRegex))) {
        messages.push(message);
    }
}