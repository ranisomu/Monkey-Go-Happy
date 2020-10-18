var monkey , monkey_running;
var jungle, jungleImage, ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
 //preloading images
 monkey_running =                                          loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
 
 jungleImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(600,400);
  
  //creating ground sprite
  jungle = createSprite(300,200,900,10);
  jungle.addAnimation("jungle", jungleImage);
  jungle.velocityX = -4;
  jungle.x = jungle.width/2;
  jungle.scale = 0.9;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  //creating monkey sprite
  monkey = createSprite(80,320,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  //creating groups for banana and obstacles
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  
  monkey.setCollider("circle",0,0,260)
  monkey.debug = false;
  
}


function draw() {
  background("white");
  
  //making monkey jump with gravity
  if(keyDown("space")&& monkey.y >= 293) {
    monkey.velocityY = -18;
  }
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);
  
  //creating infinite ground
  //console.log(ground.x);
  if(ground.x < 150){
    ground.x = ground.width/2;
  }
  if(jungle.x < 200){
    jungle.x = ground.width/2;
  }
  
  //calling food and obstacle function
  Food();
  Obstacle();
  
  if(FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score = score + 1;
  }
  
  switch(score){
      
    case 10: monkey.scale = 0.125;
          break;
    case 20: monkey.scale = 0.15;
          break;
    case 30: monkey.scale = 0.175;
          break;
    case 40: monkey.scale = 0.2;
          break;
    default: break;
  }
  
  if(obstacleGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);  
    monkey.scale = 0.1;
  }
 
  drawSprites();
  
  //display score 
  fill("White");
  textSize(20);
  text("score : " + score,510,20);
  
}

function Food() {
  if(frameCount % 150 === 0) {
   r = Math.round(random(120,200));
   banana = createSprite(630,r,10,10); 
   banana.addAnimation("banana", bananaImage);
   banana.scale = 0.1;
   banana.velocityX = -4;
   banana.lifetime = 150;
   FoodGroup.add(banana);
  }
}

function Obstacle() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(630,330,20,20);
    obstacle.addAnimation("obstacle", obstacleImage);
    obstacle.scale = 0.09;
    obstacle.velocityX = -4;
    obstacle.lifetime = 160
    obstacleGroup.add(obstacle);
  }

}