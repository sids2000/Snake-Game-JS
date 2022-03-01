const gameScreen = document.getElementById('game-screen');
let pixels;
let snake=[];
let direction=-10;
let apple;
let interval;

const renderPixels = () => {
    let pixel = '';
    for(let i=0;i<100;i++) {
        pixel += `<div class="pixel"></div>`;
    }
    gameScreen.innerHTML = pixel;
}

const renderStart = () => {
    pixels = document.querySelectorAll(".pixel");
    pixels[55].classList.add("snake"); 
    pixels[65].classList.add("snake"); 
    pixels[75].classList.add("snake"); 
    pixels[85].classList.add("snake"); 
    snake.push(55,65,75,85);
}

const renderSnake = () => {
    let head = snake[0]%10;
    const leftRightBoundary = (head==0 && direction==-1) || (head==9 && direction==1);
    const upDownBoundary = (snake[0]<10 && direction==-10) || (snake[0]>89 && direction==10); 
    if(leftRightBoundary || upDownBoundary || pixels[snake[0]+direction].classList.contains("snake")) {
        clearInterval(interval);
        return;
    }
    pixels[snake[0]+direction].classList.add("snake");
    snake.unshift(snake[0]+direction);
    if(snake[0]==pos) {
        pixels[pos].classList.remove("apple");
        spawnApple();
    }
    else { 
        pixels[snake[snake.length-1]].classList.remove("snake");
        snake.pop();
    }
}

const changeDirection = (e) => {
    switch (e.keyCode) {
        case 37:    direction = direction!=1?-1:1;
                    break;
        
        case 38:    direction = direction!=10?-10:10;
                    break;
            
        case 39:    direction = direction!=-1?1:-1;
                    break;

        case 40:    direction = direction!=-10?10:-10;
                    break;

        default:    return;
                    break;
    }
}


const spawnApple = () => {
    pos = Math.floor(Math.random()*100);
    if(pixels[pos].classList.contains("snake")) {
        spawnApple();
    } 
    else {
        pixels[pos].classList.add("apple");
    }
}

renderPixels();
renderStart();
spawnApple();
interval = setInterval(renderSnake,500);
window.addEventListener('keydown',changeDirection);