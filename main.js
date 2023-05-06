const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
let uppass = [];
let inpass = [];

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});


signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});
// adding and removing border
function upimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            uppass.splice(uppass.indexOf(element.id), 1);
            // console.log(element.id);
            // console.log(uppass);
        }
        else {
            Image.classList.add('clicked');
            uppass.push(element.id);
            // console.log(element.id);
            // console.log(uppass);
        }
    }
}

function inimg(element) {
    var Image = element.querySelector('img');
    if (Image) {
        if (Image.classList.contains('clicked')) {
            Image.classList.remove('clicked');
            inpass.splice(inpass.indexOf(element.id), 1);
            // console.log(element.id);
            // console.log(inpass);
        }
        else {
            Image.classList.add('clicked');
            inpass.push(element.id);
            // console.log(element.id);
            // console.log(inpass);
        }
    }
}
// element image recognition
async function signup() {
    // localStorage.setItem("upname", document.getElementById('upmail').value);
    // localStorage.setItem("uppass", uppass);
    const body = {
        roll_no: document.getElementById('uproll').value,
        email: document.getElementById('upmail').value,
        password: uppass.toString()
    }
    let res = await fetch('https://null.kritarthrai.repl.co/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    if (res.status === 200) {
        var myText = "Account Created Succesfully";
        alert(myText);
    } else {
        alert('Error while creating your account')
    }
}
// image pattern authentication
var v2 = new Boolean(false);
async function signin() {
    let str = document.getElementById('inmail').value;
    // let array = sessionStorage.getItem("uppass");
    const body = { 
        roll_no: document.getElementById('inroll').value,
        password: inpass.toString()
    }
    let user = await fetch('https://null.kritarthrai.repl.co/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    // let check1 = array.localeCompare(inpass.toString());
    if (user.status === 404) return alert('User not found')
    if (user.status === 401) return alert('Incorrect Password')
    if (user.status === 500) return alert('Server error')
    if (user.status === 200) {
        alert('Login Successful')
        NewTab()
    }
    // if ((!str.localeCompare(sessionStorage.getItem("upname"))) && !check1) {
    //     var myText = "Login is successful";
    //     alert(myText);
    //     NewTab();
        
    // }
    // else{
    //     var myText = "Login Failed";
    //     alert(myText);
   
    //     sendMail3();
       

    // }
}
 function sendMail3(){
    emailjs.send("service_ja5bj5o","template_oydaiyh")
    .then(function(res){
        console.log("Success", res.status);
        alert("mail sent successfully");
    })
}
function sendMail2(){
    emailjs.send("service_ja5bj5o","template_oydaiyh")
    .then(function(res){
        console.log("Success", res.status);
        alert("mail sent successfully");
    })
}

function NewTab() {
    window.open(
      "https://vitbhopal.ac.in/", "_blank");
}

document.getElementById('signupbtn').addEventListener('click', async () => await signup())
document.getElementById('signinbtn').addEventListener('click', async () => await signin())
