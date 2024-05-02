const Email = document.querySelector('.Email')
const Password = document.querySelector('.Password')
const btnlogin = document.querySelector('.btn-login')


const Formbtn = (e) => {
    e.preventDefault();
    const AllInput = [ Email, Password]
    CheckInput(AllInput);
}
btnlogin.addEventListener('click', Formbtn)

const CheckInput = (input) => {
    input.forEach(element => {
        CheckEmptyInput(element)
    })
}

const CheckEmptyInput = (empty) => {
    if (empty.value === "") {
        CheckError(empty, "Input Required.")
    } else {
        ChecktSuccess(empty)
    }
}

const CheckError = (input, Message) => {
    let parentElement = input.parentElement
    parentElement.classList = 'form-control error';
    let message = parentElement.querySelector('small');
    message.innerText = Message;
    let Allicon=parentElement.querySelectorAll('i');
    Allicon[1].style='visibility:visible'
}

const ChecktSuccess = (input) => {
    let parentElement = input.parentElement
    parentElement.classList = 'form-control success';
    let message = parentElement.querySelector('small');
    message.style.visibility="hidden"
    let Allicon=parentElement.querySelectorAll('i');
    Allicon[0].style='visibility:visible'
    Allicon[1].style='visibility:hidden'


}