const palform = document.getElementById("palindrome-form");
var test = false;
var counter = 0;

palform.addEventListener('submit', (event) => {
    event.preventDefault();
    const palID = document.getElementById("palindrome-id");
    const test1 = palID.value;
    const bttn = document.getElementById("btn-submit");
    const orderedList = document.getElementById("attempts");
    const errorDiv = document.getElementById("error-id");
    errorDiv.hidden = true;
    if (!test1) {
        errorDiv.innerHTML = "Enter Palindrome Phrase";
        errorDiv.hidden = false;
    } else {
        const checking = palindrome(test1);
        if (checking == 'error') {
            errorDiv.innerHTML = "Only blank space was passed in TextArea";
            errorDiv.hidden = false;
        }
        else if(checking == 'error2')
        {
            errorDiv.innerHTML = "Only special character were passed in TextArea";
            errorDiv.hidden = false;
        }
         else {
            let newLi = document.createElement("li");
            console.log("newLi", newLi)
            newLi.innerHTML = test1;
            if (counter == 0) {
                newLi.className = "not-palindrome";
            } else {
                newLi.className = "is-palindrome";
            }
            orderedList.appendChild(newLi);
        }
    }
    palform.reset();
    palID.focus();
});

function palindrome(str) {
    console.log(str,'STR')
    
    if (str.trim() == '') {
        return 'error';
    }
    
    let strwithoutspecialCharacter =  str.replace(/[^\w\d]/g, '').toLowerCase();
    console.log(strwithoutspecialCharacter,'Str without sp')
    if (strwithoutspecialCharacter.length== 0 || strwithoutspecialCharacter == null) {
        return 'error2';
    }

    if (strwithoutspecialCharacter === strwithoutspecialCharacter.split('').reverse().join('')) {
        console.log("palindrome")
        counter = 1;
        return strwithoutspecialCharacter;
    } else {
        console.log("not palindrome")
        counter = 0;
        return strwithoutspecialCharacter;
    }

}


