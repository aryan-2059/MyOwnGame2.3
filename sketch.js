var canvas, trashCount = 0, trashGroup;
var backgroundImage, spaceshipImage, spaceship;
var fuelImage, trash1, trash2, lifeImage, obstacle2Image, trash; 
var blastImage, blast, explosionSound;                 
var gameState, shoot=0, laser, laserImage, laserGroup, laserSound;
var obstacleGroup, obstacle2, obstacle3Image, obstacle6;
var play = 1;
var end = 2;
var instruction = 0;
var gameState = instruction;
var endline, p1, p2;
var score = 0;

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  blastImage = loadImage("./assets/blast.png");
  fuelImage = loadImage("./assets/fuel.png");
  trash1 = loadImage("./assets/trash1.png");
  trash2 = loadImage("./assets/trash2.png");
  lifeImage = loadImage("./assets/life.png");
  obstacle2Image = loadImage("./assets/obstacle2.png"); 
  obstacle3Image = loadImage("./assets/obstacle3.png");
  obstacle6 = loadImage("./assets/obstacle6.png");
  spaceshipImage = loadImage("./assets/spaceship.png"); 
  explosionSound = loadSound("./assets/explosion.mp3");
   laserImage = loadImage("./assets/laser.png");
  
}

function setup() {
  
  canvas = createCanvas(1000, 700);
  space = createSprite(250,350,30,20);
  space.addImage(backgroundImage);
  space.velocityY = (5 + score/100);

  spaceship = createSprite(250,600);
  spaceship.addImage(spaceshipImage);
  spaceship.scale = 0.6;
  
  p1 = createSprite(250,600);
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  p2.visible = false;
  
  trashGroup = new Group();
  obstacleGroup = new Group();
  laserGroup = new Group();

  endline = createSprite(250,700,500,5);
  endline.visible = false;
  
}

function draw() {
  background(0);
  if(gameState === play){
    if(space.y > 800) {
      space.y = 300;
     }
    
     shoot = shoot - 1;

     if(keyDown("space") && shoot < 460) {
      laser = createSprite(spaceship.x,spaceship.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.2;
      laserGroup.add(laser);
      //console.log(laser.x);
      shoot = laser.y;
    }  
  

  if(keyDown("up")){
    spaceship.y = spaceship.y +10;
    p1.y = p1.y + 10;
    p2.y = p2.y + 10;   
  }
    
  if(keyDown("left")){
    spaceship.x = spaceship.x - 10;
    p1.x = p1.x - 10;
      p2.x = p2.x - 10;
  }
    
  if(keyDown("right")){
    spaceship.x = spaceship.x + 10;
    p1.x = p1.x + 10;
    p2.x = p2.x + 10;
  }
    
  if(keyDown("down")){
    spaceship.y = spaceship.y -10;
    p1.y = p1.y - 10;
    p2.y = p2.y - 10;   
  }

  if(obstacleGroup.isTouching(p2) || obstacleGroup.isTouching(p1)) {
      obstacleGroup.destroyEach();
      var blast = createSprite(spaceship.x,spaceship.y - 50);
      p1.visible = true;
      p2.visible = true;
      blast.addImage(blastImage);
      blast.lifetime = 25;
      if(!explosionSound.isPlaying())
      explosionSound.play();
      spaceship.destroy();
      gameState = end;
  }
  if(obstacleGroup.isTouching(spaceship))
  {
    if(!explosionSound.isPlaying())
    explosionSound.play();
    gameState = end;

  }

  if(obstacleGroup.isTouching(laserGroup)) {
    obstacleGroup.destroyEach();
    laserGroup.destroyEach();
    if(!explosionSound.isPlaying())
    explosionSound.play();
    // blast.addImage(blastImage);
    // blast.lifetime = 25;
    score = score + 1;
  }

  if(spaceship.isTouching(trashGroup)){
    trashGroup.destroyEach();
  trashCount = trashCount + 1;
  gameState = play;
  }

  if(trashCount >= 5){
    space.velocityY = (5 + getFrameRate()/(60*100));
  }

  
  trashe();
  obstacles();
  drawSprites();
  

  stroke("white");
  fill("white");
  textSize(30);
  text("Score : " + score,210,60);
  text("Trash Count : " + trashCount,750,60);
  
  if(obstacleGroup.isTouching(endline)) {
    obstacleGroup.destroyEach();
    gameState == end;
  }
}
else if(gameState === end) {
    space.velocityY = 0;
    // explosionSound.play();
    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!",canvas.width/2-400,canvas.height/2);
    text("The asteroids destroyed the spaceship!",canvas.width/2-400,canvas.height/2+100);
    text("Your final trash count:"+trashCount,canvas.width/2-400,canvas.height/2+200);
    text("Your final score:"+score,canvas.width/2-400,canvas.height/2+300);
  }


  if(gameState === instruction) {
    stroke("white");
    fill("white");
    textFont("trebuchetMS")
    textSize(50);
    text("------SPACE CLEANERS------",canvas.width/2-300,canvas.height/2-300);
    text("ENJOY THE GAME!",canvas.width/2-300,canvas.height/2+100);
    stroke("yellow");
    fill("yellow");
    textSize(35);
    textFont("Apple Chancery");
    text("year 2059 .....",canvas.width/2-300,canvas.height/2-250);
    text(" Humans have polluted the outer space!",canvas.width/2-300, canvas.height/2 - 210);
    text("  You are a space cleaner...",canvas.width/2-300,canvas.height/2-170);
    text("  Help the universe.",canvas.width/2-300,canvas.height/2-130);
    text("  press 'space' to shoot.",canvas.width/2-300,canvas.height/2-90);
    text("  use right, left, up & down arrows to move.",canvas.width/2-300,canvas.height/2-50);
    text("  press 's' to start game.",canvas.width/2,canvas.height/2-10);
    
    if(keyDown("s")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
  
  
}//draw ends
  

function obstacles() {
  if(frameCount % 110 === 0) {
  
    var obstacle = createSprite(Math.round(random(50,1350)),-20);
    obstacle.velocityY = (6 + score/10);
    obstacle.lifetime = 200;
    obstacle.scale = random(0.4,0.5);

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: 
      obstacle.addImage(obstacle6);
              obstacle.setCollider("circle",-80,10,160);//working fine
              
              break;
      case 2:
         obstacle.addImage(obstacle2Image);
              obstacle.setCollider("circle", 0, 0, obstacle.width/2);
              obstacle.debug = true;
             break;
      case 3: 
      obstacle.addImage(obstacle3Image);
              obstacle.setCollider("circle",0,0,170)//working fine
             
      default: break;
    }
 
    obstacleGroup.add(obstacle);
  }
}

function trashe() {
  if(frameCount % 120 === 0) {
  
    var trash = createSprite(Math.round(random(50,1350)),-20);
    trash.velocityY = (6 + score/10);
    trash.lifetime = 200;
    trash.scale = random(0.4, 0.5);

    var randoms = Math.round(random(1,2));
    switch(randoms) {
      case 1:
         trash.addImage(trash1);
              trash.setCollider("circle",-80,10,160);
              break;
      case 2:
        trash.addImage(trash2);//working fine
        // trash.setCollider("circle", -80,10,170);
        trash.debug = true;
      default: break;
    }
 
    trashGroup.add(trash);
  }
}
