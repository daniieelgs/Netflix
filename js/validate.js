setTimeout(() => document.getElementById("pass").removeAttribute("disabled"), 5000)

hoverControl();

let permitedTime=new Date(2022, 0, 1, 0, 0, 0); //TODO

let idRemaining;

function byPass(){

    clearInterval(idRemaining);

    const alert=document.querySelector(".alert-not-yet")
    alert.style.display="none";

    document.querySelector(".login_pass").style.display="";

}

function isTime(){
    
    let now=new Date();

    return permitedTime>now;

}

let playBeep=true;

document.querySelector(".error-container").addEventListener("click", e => playBeep=!playBeep);

function getTimeRemaining(){

    let ahora=new Date();

    let diferencia=permitedTime-ahora;

    let segundos, minutos, horas;

    segundos=diferencia/1000;

    minutos=(segundos/60);

    segundos=parseInt((((minutos - parseInt(minutos))*10)*60)/10);

    horas=(minutos/60);

    minutos=parseInt((((horas - parseInt(horas))*10)*60)/10);

    dias=(horas/24);

    horas=parseInt((((dias - parseInt(dias))*10)*24)/10);

    return (horas<10 ? `0${horas}` : `${horas}`) + `:` + (minutos<10 ? `0${minutos}` : `${minutos}`) + `:` + (segundos<10 ? `0${segundos}` : `${segundos}`)

}

if(isTime()){

    const alert=document.querySelector(".alert-not-yet")
    alert.style.display="";

    document.querySelector(".login_pass").style.display="none";

    const timer=document.querySelector(".time-remaining");

    setTimeout(() =>{

        let beep=new Audio("sounds/beep.mp3");

        timer.innerText=getTimeRemaining();

        if(playBeep) beep.play();

        idRemaining=setInterval(() => {

            if(isTime()) timer.innerText=getTimeRemaining();

            if(playBeep) beep.play();

            if(!isTime()) {
                new Audio("sounds/beepDoble.mp3").play()

                timer.style.opacity=0;
                timer.parentElement.style.border="none";

                setTimeout(() => {
                    timer.style.opacity=1;
                    timer.parentElement.style.border="";

                    setTimeout(() => {
                        timer.style.opacity=0;
                        timer.parentElement.style.border="none";
                        setTimeout(()=> {
                            timer.style.opacity=1
                            timer.parentElement.style.border="";
                        }, 100);
                    },100);

                }, 100);

                clearInterval(idRemaining);
            }

        }, 1000);

    }, 3000)

}

imageProfile=null;

function badPassword(){
    image=document.getElementById("bcLogin");

    image.style.opacity="0.5";
    image.style.animationDuration="1s";
    image.style.animationDelay=".2s";
    image.style.animationName="badPassword";

    setTimeout(() => {
        image.style.animationName="none";
    }, 2000);
}

function openLogin(){
    date=document.getElementById("pass");
    label=document.getElementById("labelPass");
    image=document.getElementById("bcLogin");

    label.style.opacity="1";
    label.style.animationDuration="1s";
    label.style.animationDelay=".2s";
    label.style.animationName="desaparecerLabel"

    date.style.opacity="0.6";
    date.style.animationDuration="1s";
    date.style.animationDelay=".2s";
    date.style.animationName="desaparecerPass";

    image.style.opacity="0.5";
    image.style.animationDuration="2.5s";
    image.style.animationDelay="1.2s";
    image.style.animationFillMode="forwards";
    image.style.animationName="desaparecerBcg";

    return new Promise((resolved, reject) => {
        setTimeout(() => {
            document.getElementById("login").style.display="none";
            resolved();
        }, 3700);
    });
}

function enter(){

    openLogin()
        .then(() => portal());
}

function portal(){

    document.getElementById("netflix_container").style.display="";

    document.getElementById("image_portal_netflix").style.animationPlayState="running";

    setTimeout(() => new Audio("sounds/intro.mp3").play(), 0);

    //new Audio("sounds/intro.mp3").play();

    return new Promise((resolved, reject) => {
        setTimeout(() => {
            window.location.href = "#users"
            resolved();
        }, 3400);
    });

}

function selectProfile(e){

    document.getElementById("imageProfile").src=e.firstElementChild.firstElementChild.src;

}

function hoverControl(){

    controlButtons=document.querySelectorAll(".slide .control span");

    for(button of controlButtons){
        button.addEventListener("mouseenter", e => e.target.parentElement.setAttribute("style", "background: rgb(0,0,0); background: radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(121,121,121,0.15) 50%, rgba(4,4,4,0.15) 100%);"));
        button.addEventListener("mouseleave", e => e.target.parentElement.removeAttribute("style"));
        //button.addEventListener("mouseleave", (e) => e.target.parentElement.style.backgroundColor="transparent");
    }

}

document.getElementById("pass").addEventListener("change", e => {
    
    if(e.target.value=='2022-01-01') enter(); //TODO
    else badPassword();

});