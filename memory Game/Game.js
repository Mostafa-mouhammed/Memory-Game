var div = document.getElementById('Main');
var ScoreDiv = document.getElementById('CLicksNo');
var ClickedTimes = 0;
var Selected = [];


var RN = function(){
    return parseInt( Math.random() *6 +1);
}

var IsSame = function(){
    let first = document.getElementsByClassName(Selected[0])[0];
    let second = document.getElementsByClassName(Selected[1])[0];
    return  first.getAttribute('src') === second.getAttribute('src');
}


var ResetGame = function(){
    let imgs = document.getElementsByTagName('img');
    ScoreDiv.innerText = ClickedTimes =0;
    for(let i=0;i<12;i++){
     imgs[i].setAttribute('class','D'+ (i+1));
     imgs[i].setAttribute('src','./Moon.gif');
    }
}

var isGameEnd = function(){
    let imgs = document.getElementsByTagName('img');
    let counter =0;
    for(let i=0;i<12;i++){
        if(imgs[i].getAttribute('class') === (i+1).toString()) counter++ ; 
    }
    return counter === imgs.length;
}

var uncover = function(e){
    ClickedTimes++;
    ScoreDiv.innerText = ClickedTimes;

    if(e.target.className.startsWith('D')){
        e.target.setAttribute('src','./'+RN()+'.gif');
        e.target.setAttribute('class',e.target.className.slice(1));
        Selected.push(e.target.className);
    }

    if(Selected.length >1){
        if(!IsSame()) {
   
            let first = document.getElementsByClassName(Selected[0])[0];
            let second = document.getElementsByClassName(Selected[1])[0];
            
            setTimeout(() => {
                first.setAttribute('src','./Moon.gif');
                 second.setAttribute('src','./Moon.gif');
            }, 500);

            first.setAttribute('class','D'+Selected[0]);
            second.setAttribute('class','D'+Selected[1]);
        
        }else if(IsSame()){
            Selected = [];
        }
    }
        
   
    if(Selected.length === 2){Selected=[]}

    if(isGameEnd()){
        let GameOver =  document.getElementById('GameOver');
        let btn = document.getElementsByTagName('button')[0];
        document.getElementsByTagName('p')[0].innerText = 'You clicked '+ClickedTimes + ' Times';
        setTimeout(() => {
            GameOver.style.display = 'block';
        }, 500);

        StartAgain = function(){
            GameOver.style.display = 'none';
            ResetGame();
        }
        
        btn.addEventListener('click',StartAgain);
    }
}


for(let i=1;i<13;i++){
    let img = document.createElement('img');
    img.setAttribute('src','./Moon.gif');
    img.setAttribute('class','D'+i);
    img.addEventListener('click',uncover);
    div.appendChild(img);
}