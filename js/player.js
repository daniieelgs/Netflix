let mutedPlayer=true;

document.querySelector(".mut-button").addEventListener("click", e => {

    if(mutedPlayer) e.target.classList.replace("muted", "unmuted")
    else e.target.classList.replace("unmuted", "muted");

    mutedPlayer=!mutedPlayer;

    document.querySelector(".trailer .video-trailer").muted=mutedPlayer;

});

document.querySelector(".trailer .video-trailer").addEventListener("click", e => e.target.play());

function closeInfoPlayer(){
    
    const portal=document.querySelector(".portal-info");

    portal.style.animationName="desaparecerPortal";
    portal.style.animationDuration=".2s";
    portal.style.animationFillMode="forwards";

    setTimeout(() => {
        portal.style.display="none";
    }, 200);


    document.querySelector(".trailer .video-trailer").pause();
    document.querySelector(".trailer .video-trailer").currentTime=0;

}

const alert_tempo=document.querySelector(".alert-tempo");

function getStringCounter(salida){

    let ahora=new Date();

    let diferencia=ahora-salida;

    let segundos, minutos, horas, dias, meses, anos;

    segundos=diferencia/1000;

    minutos=(segundos/60);

    segundos=parseInt((((minutos - parseInt(minutos))*10)*60)/10);

    horas=(minutos/60);

    minutos=parseInt((((horas - parseInt(horas))*10)*60)/10);

    dias=(horas/24);

    horas=parseInt((((dias - parseInt(dias))*10)*24)/10);

    meses=(parseInt(dias)/30.4);

    console.log(horas+"-"+dias+" - " + meses);

    dias=parseInt((((meses - parseInt(meses))*10)*(30.4))/10);

    anos=(meses/12);

    meses=parseInt((((anos - parseInt(anos))*10)*12)/10);

    anos=parseInt(anos);

    //console.log({segundos, minutos, horas, dias, meses, anos})

    return (anos==0 ? `` : `${anos}a `) + `${meses}M ${dias}d ${horas}h ${minutos}m ${segundos}s`;

}

let idIntervalCount=-1;

const closeTempo = () => {
    alert_tempo.style.display="none";
    clearInterval(idIntervalCount);
}

const openTempo = () => {
    alert_tempo.style.display="";

    let salida=new Date(2022, 0, 1, 0, 0, 0).getTime(); //TODO

    const tempo_counter=document.querySelector(".tempo-counter");

    tempo_counter.innerText=getStringCounter(salida);

    idIntervalCount=setInterval(() => tempo_counter.innerText=getStringCounter(salida), 1000);

}

document.querySelector(".portal-info .container-info .icon-close").addEventListener("click", e => closeInfoPlayer());

document.querySelector(".alert-tempo .icon-close").addEventListener("click", closeTempo);
document.querySelector(".notification_icon").addEventListener("click", openTempo);

document.querySelector(".container-info").addEventListener("click", e => e.stopPropagation());

document.querySelector(".portal-info").addEventListener("click", e => closeInfoPlayer());

document.querySelector("button.info").addEventListener("click", () =>{ 
    
    const portal=document.querySelector(".portal-info");
    portal.style.display="";
    portal.style.animationName="aparecerPortal";
    portal.style.animationFillMode="forwards";
    portal.style.animationDuration=".2s";
    document.querySelector(".trailer .video-trailer").play();
});

const pelicula=document.querySelector("#player video");

function play_pauseVideo(e){

    let play=e.classList.contains("play-button");

    if(play){

        pelicula.play();
        e.classList.replace("play-button", "pause-button");

    }else{

        pelicula.pause();
        e.classList.replace("pause-button", "play-button");

    }

}

function muted_unmutedVideo(e, unmuted){

    let muted=e.classList.contains("volumen-button");

    if(unmuted){

        pelicula.muted=false;

        if(!muted) e.classList.replace("volumen-muted-button", "volumen-button");

    }else{

        pelicula.muted=muted;
    
        if(muted) e.classList.replace("volumen-button", "volumen-muted-button");
        else e.classList.replace("volumen-muted-button", "volumen-button");

    }

}

function avanzarVideo(tiempo){

    pelicula.currentTime=pelicula.currentTime + (tiempo);

}

const button_play=document.querySelector("#player .play-pause-button");

button_play.addEventListener("click", e => play_pauseVideo(e.target));

const button_volumen=document.querySelector("#player .volumen-muted-unmuted-button");

const avanzar_video=document.querySelector("#player .avanzar-button");
const retroceder_video=document.querySelector("#player .retroceder-button");

avanzar_video.addEventListener("click", e => avanzarVideo(10));
retroceder_video.addEventListener("click", e => avanzarVideo(-10));

button_volumen.addEventListener("click", e => muted_unmutedVideo(e.target, false));

const reproductor_peli=document.getElementById("player");

document.addEventListener("keydown", e => {

    if(reproductor_peli.style.display!="none"){
       
        const code=e.code;

        if(code=='Space') play_pauseVideo(button_play);
        else if(code=='AudioVolumeUp' || code=='AudioVolumeDown' || code=='AudioVolumeMute') muted_unmutedVideo(button_volumen, true);
        else if(code=='ArrowRight') avanzarVideo(10);
        else if(code=='ArrowLeft') avanzarVideo(-10);

    }

});

const netflix_container=document.getElementById("netflix_container");

function reproducirPeli(){

    netflix_container.style.display="none";

    window.location.href = "#player"

    reproductor_peli.style.display="";

    document.querySelector(".trailer .video-trailer").pause();
    document.querySelector(".trailer .video-trailer").currentTime=0;

}

document.querySelector(".principal .titulo .play").addEventListener("click", reproducirPeli);

document.querySelector(".portal-info .trailer .play").addEventListener("click", reproducirPeli);

document.querySelector("#player .salir-button").addEventListener("click", e => {

    netflix_container.style.display="";

    window.location.href = "#view"

    reproductor_peli.style.display="none";

    pelicula.pause();
    button_play.classList.replace("pause-button", "play-button");
    pelicula.currentTime=0;

});

let idTimer=-1;

const boton_contenedores=Array.from(document.querySelectorAll(".controlers"));

reproductor_peli.addEventListener("mousemove", e => {


    if(idTimer!=-1) clearTimeout(idTimer);

    boton_contenedores.forEach(n => n.style.opacity=1);

    idTimer=setTimeout(() => {

        boton_contenedores.forEach(n => n.style.opacity=0);

    }, 3000);

});

let isFullScreen=false;

document.querySelector("#player .fullscreen-button").addEventListener("click", e => {


    if(isFullScreen){
         document.exitFullscreen();
         document.href="#player";
    } else reproductor_peli.requestFullscreen();

    isFullScreen=!isFullScreen;

});