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

let timerShip
let timerRochet
let ridx
let score = 0
let layerWidth = innerWidth * (1 + 1.2)
// console.log(layerW)

let offset = 0.6 * innerWidth + 100
// console.log(offset)

// let l = document.querySelector('.layer')
// const leftValue = window.getComputedStyle(l).left;

document.addEventListener('DOMContentLoaded', function() {
  const l = document.querySelector('.layer');
  const leftValue = window.getComputedStyle(l).left;
  console.log(leftValue);
});

let ship = {
    x: -600,
    dir: -1,
    layer: 1
}

let scope = {
    x: 0,}

let rocket = {
    x: 800,
    layer: 0, 
    shoot: false,
}

let explosion = {
    x: layerWidth * 0.5,
    layer: 1
}

const render = () => {
    
    seaDiv.innerHTML = ``

    for(let i = 0; i <=9; i++) {

        let objects = ``
        
        if(layers[i].ship) {
            objects += `
            <div class="ship" style="left: ${ship.x}px">
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
                    <div class="base"></div>
                    <div class="on_base"></div>
                    <div class="on_on_base"></div>
                    <div class="square_one"></div>
                    <div class="square_two"></div>
                    <div class="square_three"></div>
                    <div class="square_four"></div>
                </div>
                <div class="bridge"></div>
                <div class="chimney"></div>
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

        if(layers[i].ship == layers[i].rochet) {             
            objects += `
            <div class="explosion" style="left: ${explosion.x}px;">
                <div class="fire-bottom-sm"></div>
                <div class="fire-bottom-md"></div>
                <div class="fire-bottom-lg"></div>
            </div>            
            `
        }

        seaDiv.innerHTML += `
        <div class="layer"> <!-- layer ${i} -->
            ${objects}
            <div class="wave"></div>
        </div>
        `
    }

    seaDiv.innerHTML += `
    <div class="scope" style="left: ${scope.x}px;">
        <div class="mid">+</div>
        <div class="h">--</div>
        <div class="v">--</div>
    </div>
    `
}
// increment or decrement the score
const scoreRender = () => {
    let scoreDiv = document.getElementById('score')
    scoreDiv.textContent = score
}

// move scope along the X axis
const moveScope = (e) => {  
    scope.x = e.clientX - 100
    // console.log(e.clientX)
}
 
// change rocket on the layers
const shoot = (e) => {    
    if(e.code == 'Space' && !rocket.shoot) {
        rocket.shoot = true 
        rocket.layer = 0
        rocket.x = scope.x + offset
        layers[0].rochet = true
        debugger
        clearInterval(timerRochet) 

        timerRochet = setInterval(() =>{

            if(rocket.layer == 9) {
                clearInterval(timerRochet)
                rocket.shoot = false
                layers[rocket.layer].rochet = false
                score -= 10
                scoreRender() 
            } else {
                layers[rocket.layer].rochet = false
                rocket.layer ++
                layers[rocket.layer].rochet = true

                if (rocket.layer == ship.layer && Math.abs(ship.x - rocket.x) < 350) {
                    console.log( rocket.x, ship.x)
                    alert('boom!')  
                    resetShip()  

                    clearInterval(timerRochet)
                    rocket.shoot = false
                    layers[rocket.layer].rochet = false

                    // explosion.x = rocket.x 
                    // layers[ridx].explosion = true             //?????????????
                    score += 10
                    scoreRender()
                }
            }
        }, 100 )
    }
}

// change the direction and layer of the ship
const resetShip = (i) => {
    for (let i = 0; i <layers.length; i++) {
        layers[i].ship = false
        // layers[i].explosion = false
    }
    
    ridx = Math.floor(Math.random() * 10)
    ship.layer = ridx 
    layers[ridx].ship = true
    // layers[ridx].explosion = true

    let rand = Math.random()

    if ( rand >= 0.5 ) {
        ship.x = layerWidth + 600
        ship.dir = ship.dir
    } else {        
        ship.x = - 600
        ship.dir = 1
    }
    
    clearInterval(timerShip)
    timerShip = setInterval(() => {
        ship.x += ship.dir

        if(ship.dir == 1 && ship.x > layerWidth+600) {
            resetShip()
        }
        if(ship.dir == -1 && ship.x < -600) {
            resetShip()
        }
        render()
    }, 1 )
}

window.addEventListener('resize', () => {
resetShip()
scoreRender()
render()
});

resetShip()
scoreRender()
render()