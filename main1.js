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

const seaDiv = document.querySelector('.sea');

let ship = {
    x: -600,
    dir: -1,
    layer: 1

}

let scope = {
    x: 0,
}

let rocket = {
    x: 1200,
    layer: 0, 
    shoot: false,
}
let explosion = {
    x: 800,
    layer: 1
}

let timerShip

let timerRochet

const render = () => {
  seaDiv.innerHTML = '';

  for (let i = 0; i <= 9; i++) {
    const layerDiv = document.createElement('div');
    layerDiv.classList.add('layer');

    let objects = '';

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

        if(layers[i].rochet == layers[i].ship) {             
            objects += `
            <div class="explosion" style="left: ${explosion.x}px;">
                <div class="fire-bottom-sm"></div>
                <div class="fire-bottom-md"></div>
                <div class="fire-bottom-lg"></div>
            </div>            
            `
        }

    layerDiv.innerHTML = objects;
    seaDiv.appendChild(layerDiv);
  }

  const scopeDiv = document.createElement('div');
  scopeDiv.classList.add('scope');
  scopeDiv.style.left = `${scope.x}px`;
  scopeDiv.innerHTML = `
    <div class="mid">+</div>
    <div class="h">--</div>
    <div class="v">--</div>
  `;
  seaDiv.appendChild(scopeDiv);
};

const animate = () => {

    // move scope on the X axis
const moveScope = (e) => {  
    scope.x = e.clientX - 100
    // console.log(e.clientX)
}
 
// change rocket on the layers
const shoot = (e) => {    
    if(e.code == 'Space' && !rocket.shoot) {
        rocket.shoot = true 
        rocket.layer = 0
        rocket.x = scope.x + 580
        layers[0].rochet = true

        clearInterval(timerRochet) 

        timerRochet = setInterval(() =>{

            if(rocket.layer == 9) {
                clearInterval(timerRochet)
                rocket.shoot = false
                layers[rocket.layer].rochet = false
            } else {
                layers[rocket.layer].rochet = false
                rocket.layer ++
                layers[rocket.layer].rochet = true

                if (rocket.layer == ship.layer && Math.abs(rocket.x - ship.x) < 500) {
                    // console.log( rocket.x, ship.x)
                    alert('boom!')   
                    explosion.x = rocket.x 
                    explosion.layer = ship.layer
                }
            }
        }, 100 )
    }
}

// change the direction and layer of the ship
const resetShip = () => {
    for (let i = 0; i <layers.length; i++) {
        layers[i].ship = false
    }
    
    let ridx = Math.floor(Math.random() * 11)
    ship.layer = ridx
    layers[ridx].ship = true

    let rand = Math.random()

    if ( rand >= 0.5 ) {
        ship.x = innerWidth+600
        ship.dir = ship.dir
    } else {        
        ship.x = -600
        ship.dir = 1
    }
    
    clearInterval(timerShip)

    timerShip = setInterval(() => {
        ship.x += ship.dir

        if(ship.dir == 1 && ship.x > innerWidth+600) {
            resetShip()
        }
        if(ship.dir == -1 && ship.x < -600) {
            resetShip()
        }
        render()
    }, 1  )
}

  // Solicită următoarea actualizare a ecranului
  requestAnimationFrame(animate);
};

window.addEventListener('resize', () => {
  // Actualizează orice logică legată de redimensionarea ferestrei
  render();
});

// Restul codului rămâne neschimbat
resetShip();
render();
animate();