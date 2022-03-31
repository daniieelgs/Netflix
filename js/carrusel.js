const slides=document.querySelectorAll(".carrusel .slide .inner_slide > div");

Array.from(document.querySelectorAll(".carrusel .player .inner_slide > div")).forEach(n => n.classList.add("play"));

const nImages=34;

let i=1;
let j=1;

for(slide of slides){

    let mut_button;

    if(slide.classList.contains("play")){

        const source=document.createElement("SOURCE");
        source.src=`images/view/player/sld${j}.mp4`;

        const videoCover=document.createElement("VIDEO");
        videoCover.src=`images/view/player/sld${j}.mp4`;
        videoCover.appendChild(source);
        videoCover.classList.add("cover");

        const videoContain=document.createElement("VIDEO");
        videoContain.appendChild(source);
        videoContain.classList.add("contain");
        videoContain.loop=true;

        videoContain.muted=true;

        slide.appendChild(videoCover);
        slide.appendChild(videoContain);

        mut_button=document.createElement("SPAN");
        mut_button.classList.add("mut-button", "muted");

        slide.appendChild(mut_button);

        j++;

    }else{
        const imageCover=document.createElement("IMG");
        imageCover.src=`images/view/sld${i}.jpeg`;
        imageCover.classList.add("cover");
    
        const imageContain=document.createElement("IMG");
        imageContain.src=`images/view/sld${i}.jpeg`;
        imageContain.classList.add("contain");
    
        slide.appendChild(imageCover);
        slide.appendChild(imageContain);

        i++;

    }

    const subcontainer=document.createElement("DIV");
    subcontainer.classList.add("subcontainer");
    subcontainer.innerHTML=`                                    <div class="play-button">
    <div class="player-container">
        <span onclick="openItem(this)" class="player"></span>
        <span class="anadir"></span>
        <span class="like"></span>
        <span class="dislike"></span>
    </div>

    <div class="more">
        <span class="more-info" onclick="openItem(this)"></span>
    </div>
</div>

<div class="info-container">
    <div class="descripcion">
        <ul>
            <li class="novedad">Novedad</li>
            <li class="pegi">16+</li>
            <li class="durada">1h 30min</li>
            <li class="calidad">4k</li>
        </ul>
    </div>
    <div class="categorias">
        <p>Íntima <span>.</span> Emotiva <span>.</span> Romántica</p>
    </div>
</div>`;

    subcontainer.style.display="none";
    slide.appendChild(subcontainer);

    let timer=0;

    muted=true;

    slide.addEventListener("mouseenter", e => {
        timer=setTimeout(() => {
            e.target.lastElementChild.style.display="";
            e.target.lastElementChild.style.animationName="aparecerSubcontainer";
            e.target.lastElementChild.style.animationDuration="1s";
           
            if(e.target.classList.contains("play")){
                
                e.target.firstElementChild.nextElementSibling.play();
                e.target.firstElementChild.nextElementSibling.muted=muted;

                let buttonMut=e.target.firstElementChild.nextElementSibling.nextElementSibling;

                if(muted && buttonMut.classList.contains("unmuted")) buttonMut.classList.replace("unmuted", "muted");
                else if(!muted && buttonMut.classList.contains("muted")) buttonMut.classList.replace("muted", "unmuted");
            }

        }, 1200);
    });

    function mutvideo(e){
        
        if(e.parentElement.classList.contains("play")){
            muted=!muted;
            e.muted=muted;

            if(muted) e.nextElementSibling.classList.replace("unmuted", "muted");
            else e.nextElementSibling.classList.replace("muted", "unmuted");
            
        }

    }

    slide.addEventListener("click", e => mutvideo(e.target));

    if(mut_button) mut_button.addEventListener("click", e => {
        mutvideo(e.target.previousElementSibling)
        e.stopPropagation();
    });

    slide.addEventListener("mouseleave", e => {
        clearTimeout(timer);
        e.target.lastElementChild.style.animationName="desaparecerSubcontainer";
        e.target.lastElementChild.style.animationDuration=".2s";

        if(e.target.classList.contains("play")){

            e.target.firstElementChild.nextElementSibling.pause();
            e.target.firstElementChild.nextElementSibling.load();

        }

        setTimeout(() => e.target.lastElementChild.style.display="none", 150);
    });

}

slides2=Array.from(document.querySelectorAll(".carrusel .slide"))

slides2[slides2.length-1].classList.add("down");

class right{

    firstAnimationR=true;
    openRight=true;

}

class left{

    firstAnimationL=true;
    openLeft=true;

}

nextButtons=Array.from(document.querySelectorAll(".control.next span"));
previousButtons=Array.from(document.querySelectorAll(".control.previous span"));

rights=[];
lefts=[];

nextButtons.forEach(n => {
    rights.push(new right())
    lefts.push(new left());
});



nextButtons.forEach(n => { n.addEventListener("click", e => {

        let i=0;

        while(nextButtons[i]!=n) i++;

        if(rights[i].openRight){

            rights[i].openRight=false;

            let element=e.target.parentElement.nextElementSibling.nextElementSibling;

            let first=element;
        
            let center;
            let right;
        
            while(element && !(center && right)){
        
                if(element.classList.contains("center")){
                    center=element;
                    if(element.nextElementSibling){
                        element.nextElementSibling.classList.remove("left");
                        element.nextElementSibling.classList.add("right");
                        right=element.nextElementSibling;
                    }else{
                        first.classList.remove("left");
                        first.classList.add("right");
                        right=first;
                    }
                }
                //else if(element.classList.contains("right")) right=element;
        
                element=element.nextElementSibling;
        
            }
        
        
            if(right){
        
                right.classList.add("center");
        
                [center, right].forEach(n => {
            
                    if(rights[i].firstAnimationR) n.style.animationName="slideGoingLeft";
                    else n.style.animationName="slideGoingLeft2";
                    n.style.animationDuration="1s";
            
                });
        
                setTimeout(() => {
                    right.classList.remove("right");
                    center.classList.replace("center", "left");
                    rights[i].openRight=true;
                }, 1000); 
        
                rights[i].firstAnimationR=!rights[i].firstAnimationR;
        
            }    

        }
        
    })
});

previousButtons.forEach(n => { n.addEventListener("click", e => {

        let i=0;

        while(previousButtons[i]!=n) i++;

        if(lefts[i].openLeft){

            lefts[i].openLeft=false;

            let element=e.target.parentElement.nextElementSibling;

            let center;
            let left;
        
            let last;
        
            while(element){
        
                if(element.classList.contains("center")){
                    center=element;
        
                    if(element.previousElementSibling.classList.contains("inner_slide")){
                        element.previousElementSibling.classList.remove("right");
                        element.previousElementSibling.classList.add("left");
                        left=element.previousElementSibling;
                    }
                }
                //else if(element.classList.contains("left")) left=element;
        
                if(!element.nextElementSibling) last=element;
        
                element=element.nextElementSibling;
        
            }
            
            if(!left){
                last.classList.remove("right");
                last.classList.add("left");
                left=last;
            }
        
            if(left){
        
                left.classList.add("center");
        
                [center, left].forEach(n => {
            
                    if(lefts[i].firstAnimationL) n.style.animationName="slideGoingRight";
                    else n.style.animationName="slideGoingRight2";
                    n.style.animationDuration="1s";
            
                });
            
                setTimeout(() => {
                    left.classList.remove("left");
                    center.classList.replace("center", "right");
                    lefts[i].openLeft=true;
                }, 1000); 
        
                lefts[i].firstAnimationL=!lefts[i].firstAnimationL;
        
            }

        }

    })
});

let isOpen=false;

function closeOpentItem(){
 
    e=document.getElementById("openItem");
    e.style.display="none"

    e.firstElementChild.removeChild(e.firstElementChild.firstElementChild);

    isOpen=false;

}

document.getElementById("openItem").addEventListener("click", e => closeOpentItem());

let element

function openItem(e){
    
    isOpen=true;

    const viewer=document.querySelector("#openItem .itemViewer");

    const container=e.parentElement.parentElement.parentElement.parentElement

    src=container.firstElementChild.src;

    if(container.classList.contains("play")){
        element=document.createElement("VIDEO");
        element.controls=true;
    }else{
        element=document.createElement("IMG");
    }

    element.src=src;

    element.classList.add("itemView");

    viewer.appendChild(element);

    document.getElementById("openItem").style.display="";

}

document.querySelector("#openItem .itemViewer").addEventListener("click", e => e.stopPropagation());

window.addEventListener("scroll", () => {if(isOpen && !document.fullscreenElement) closeOpentItem()});