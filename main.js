let layers = [
    {
        ship: false,
        rochet: false,
        explosion: false,
    },
    {
        ship: false,
        rochet: false,
        explosion: false,
    },
    {
        ship: false,
        rochet: false,
        explosion: false,
    },
    {
        ship: false,
        rochet: false,
        explosion: false,
    },
    {
        ship: false,
        rochet: false,
        explosion: false,
    },
    {
        ship: false,
        rochet: false,
        explosion: false,
    },
    {
        ship: false,
        rochet: false,
        explosion: false,
    },
    {
        ship: false,
        rochet: false,
        explosion: false,
    },
    {
        ship: false,
        rochet: false,
        explosion: false,
    },
    {
        ship: false,
        rochet: false,
        explosion: false,
    },
];

let seaDiv = document.querySelector('.sea')
let renderDiv = document.querySelector('.render')
let renderExplosionDiv = document.querySelector('.explosion-render')
let overDiv = document.querySelector('.over')

let timerShip
let timerRochet
let ridx
let score = 100

let layerWidth = innerWidth * (1 + 1.2)
let offset = 0.6 * innerWidth + 80

document.addEventListener('DOMContentLoaded', function() {
  const l = document.querySelector('.layer');
  const leftValue = window.getComputedStyle(l).left;
  console.log(leftValue);
});

let ship = {
    x: -600,
    dir: -1,
    layer: 1,
}

let scope = {
    x: 0,
}

let rocket = {
    x: 800,
    layer: 0, 
    shoot: false,
}

let explosion = {
    x: 1000,
    layer: 1
}
const renderWave = () => {
    for(let i = 0; i <=9; i++) {
        seaDiv.innerHTML += `
        <div class="wave"></div>
        `
    }
}

const render = () => {
    
    renderDiv.innerHTML = ``

    for(let i = 0; i <=9; i++) {

        let objects = ``
                                    
        if(layers[i].ship) {
            objects += `
            <div class="ship" style="left: ${ship.x}px;">
                <div class="hull">
                <div class="gun">
                    <div class="tube"></div>
                </div>
                <div class="gun_front">
                    <div class="tube"></div>
                </div>
                <div class="gun_top">
                    <div class="tube"></div>
                </div>
                <div class="square_two"></div>
                <div class="square_four"></div>
                <div class="square_three"></div>
                <div class="square_one"></div>
                <div class="on_on_base"></div>
                <div class="on_base"></div>
                <div class="base"></div>
            </div>
            <div class="bridge"></div>
            <div class="chimney"></div>
            <div class="ship-vawe"></div>
            </div>
            `
        }
        if(layers[i].rochet) {
            objects += `
            <div class="rocket" 
            style="left: ${rocket.x}px;">
                <div class="head"></div>
                <div class="body"></div>
                <div class="tail"></div>
                <div class="wing_1"></div>
                <div class="wing_2"></div>
                <div class="wing_3"></div>
                <div class="wing_4"></div>
            </div>            
            `
        }
       
        renderDiv.innerHTML += `
        <div class="layer"> <!-- layer ${i} -->
            ${objects}            
        </div>
        `
    }

    renderDiv.innerHTML += `
    <div class="scope" style="left: ${scope.x}px;">
        <div class="mid">+</div>
        <div class="h">--</div>
        <div class="v">--</div>
    </div>
    `
}

const renderExplosion = () => {
    
    renderExplosionDiv.innerHTML = ``

    for(let i = 0; i <=9; i++) {

        let objects = ``
        
        if(layers[i].explosion) {             
            objects += `
                <div class="explosion" style="left: ${explosion.x}px;">
                    <div class="fire-bottom-sm"></div>
                    <div class="fire-bottom-md"></div>
                    <div class="fire-bottom-lg"></div>
                </div>
            `;
        }

        renderExplosionDiv.innerHTML += `
        <div class="layer-explosion"> <!-- layer explosion ${i} -->
            ${objects}            
        </div>
        `
    }
    
}

// increment or decrement the score
const scoreRender = () => {
    let scoreDiv = document.getElementById('score')
    scoreDiv.textContent = score
    if (score == 0 ) {
        overDiv.classList.add("d_none")
    }
}


// move scope along the X axis
const moveScope = (e) => {  
    scope.x = e.clientX - 100
    // console.log(e.clientX)
}
 

// change rocket on the layers
const shoot = (e) => {    
    if(e.code == 'Space' && !rocket.shoot && !layers[rocket.layer].explosion) {
        rocket.shoot = true;
        rocket.layer = 0;
        rocket.x = scope.x + offset;
        layers[0].rochet = true;
        clearInterval(timerRochet);

        timerRochet = setInterval(() => {
            if (rocket.layer == 9) {
                clearInterval(timerRochet);
                rocket.shoot = false;
                layers[rocket.layer].rochet = false;
                score -= 10;
                scoreRender();
            } else {
                layers[rocket.layer].rochet = false;
                rocket.layer++;
                layers[rocket.layer].rochet = true;

                if (checkCollision()) {}
            }
        }, 100);
    }
}

// function to check collision
const checkCollision = () => {
    if (rocket.layer == ship.layer && rocket.x - ship.x > 0 && rocket.x - ship.x < 500) {          // rocket.layer == ship.layer && Math.abs(ship.x - rocket.x) < 350
        explosion.layer = ship.layer;
        layers[explosion.layer].explosion = true;
        explosion.x = ship.x + 100;
        
        renderExplosion()
        
        setTimeout(() => {
            resetShip();
        }, 2300);
        
        clearInterval(timerRochet)
        rocket.shoot = false
        layers[rocket.layer].rochet = false


        score += 10;
        scoreRender();
        
        return true; // Collision detected
    }
    return false; // There is no collision
}

// change the direction and layer of the ship
const resetShip = () => {
    for (let i = 0; i < layers.length; i++) {
        layers[i].ship = false;       // reset to false all ship
        layers[i].explosion = false;  // reset to false all explosion
    }

    ridx = Math.floor(Math.random() * 9) + 1;
    ship.layer = ridx;
    layers[ridx].ship = true;

    let rand = Math.random();
    console.log(rand)

    if (rand >= 0.5) {
        ship.x = layerWidth + 600;
        ship.dir = -1;
    } else {
        ship.x = -600;
        ship.dir = 1;
    }

    clearInterval(timerShip);

    timerShip = setInterval(() => {
        if (layers[ridx].explosion) {
            return;
        }

        ship.x += ship.dir;

        if (ship.dir == 1 && ship.x > layerWidth + 600) {
            resetShip();
        }
        if (ship.dir == -1 && ship.x < -600) {
            resetShip();
        }
        render();
    }, 1);
}

renderWave()
resetShip() 
scoreRender()