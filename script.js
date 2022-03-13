const gameScreen = document.getElementById('game-screen');
let pixels;
let snake=[];
let apple;
let n = 20;
let direction=-n;
let interval;

const renderPixels = () => {
    let pixel = '';
    for(let i=0;i<Math.pow(n,2);i++) {
        pixel += `<div class="pixel"></div>`;
    }
    gameScreen.style.gridTemplateColumns = `repeat(${n},1fr)`;
    gameScreen.innerHTML = pixel;
}

const renderStart = () => {
    pixels = document.querySelectorAll(".pixel");
    let start = Math.floor(Math.pow(n,2)/2) + Math.floor(n/2);
    pixels[start].classList.add("snake"); 
    snake.push(start);
}

const renderSnake = () => {
    let head = snake[0]%n;
    const leftRightBoundary = (head==0 && direction==-1) || (head==n-1 && direction==1);
    const upDownBoundary = (snake[0]<n && direction==-n) || (snake[0]>=Math.pow(n,2)-n && direction==n); 
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
        
        case 38:    direction = direction!=n?-n:n;
                    break;
            
        case 39:    direction = direction!=-1?1:-1;
                    break;

        case 40:    direction = direction!=-n?n:-n;
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
interval = setInterval(renderSnake,400);
window.addEventListener('keydown',changeDirection);