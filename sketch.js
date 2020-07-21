var trex,trex_running,trex_collide;
var ground,ground_image;
var invisibleGround;
var score;
var cloud,cloud_image;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,
    obstacle5,obstacle6;
var rand
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var die;
var checkPoint;
var jump;
function preload(){
 jump = loadSound("jump.mp3");
 die = loadSound("die.mp3");
 checkPoint = loadSound("checkPoint.mp3");
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collide = 
loadAnimation("trex_collided.png");
  ground_image = 
    loadImage("ground2.png");
 cloud_image = 
  loadImage("cloud.png");
  obstacle1 = 
    loadImage("obstacle1.png");
  obstacle2 = 
    loadImage("obstacle2.png");
  obstacle3 = 
    loadImage("obstacle3.png");
  obstacle4 = 
    loadImage("obstacle4.png");
  obstacle5 = 
    loadImage("obstacle5.png");
  obstacle6 = 
    loadImage("obstacle6.png");
}

function setup() {
  createCanvas(400, 400);
  trex = createSprite(50,360,10,10);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collide",trex_collide);
  trex.scale = 0.5;
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",ground_image);
  invisibleGround = createSprite(200,385,400,5)
  invisibleGround.visible = false;
  score = 0;
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(180);
 text("SCORE: "+score,300,70);
  trex.collide(invisibleGround);
  
  if(gameState===PLAY){
  if(keyDown("space")){
   trex.velocityY = -7 ;  
    jump.play();
   }
  trex.velocityY = trex.velocityY + 0.5;
   if(ground.x<0){
   ground.x = 200
   }
    if(World.frameCount%5===0){
  score = score+1
  }
  spawn_cloud();
  spawnObstacles();
  ground.velocityX = -4;
  if(score>0 && score%100===0){
  checkPoint.play();
    
  }
  if(obstaclesGroup.isTouching(trex)){
  gameState = END;
  die.play();
  }
  }
  else if(gameState===END){
  ground.velocityX = 0;
  cloudGroup.setVelocityXEach = 0;
  obstaclesGroup.setVelocityXEach = 0;
  obstaclesGroup.setLifetimeEach = -1
  cloudGroup.setLifetimeEach = -1;
  }
  drawSprites();
}

function spawn_cloud(){
if(World.frameCount%70===0){
cloud = createSprite(400,320,10,10);
  cloud.addImage("cloud",cloud_image);
  cloud.velocityX = -4;
  cloud.scale = 0.5;
  cloud.y = random(200,300);
  cloudGroup.add(cloud);
}
}

function spawnObstacles(){
if(World.frameCount%80===0){
obstacle = createSprite(400,360,10,10);
obstacle.velocityX= -4;
obstacle.lifetime = 360;
  obstacle.scale = 0.6
obstaclesGroup.add(obstacle)
rand = Math.round(random(1,6));
  switch(rand){
    case 1 : obstacle.addImage(obstacle1);
    break
    case 2 : obstacle.addImage(obstacle2);
    break
    case 3 : obstacle.addImage(obstacle3);
    break
    case 4 : obstacle.addImage(obstacle4);
    break
    case 5 : obstacle.addImage(obstacle5);
    break
    case 6 : obstacle.addImage(obstacle6);
    break
  }
}
}