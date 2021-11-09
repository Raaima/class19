
var fish,fishImg,background,invisible_ground,background_image, score=0;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var gameOver, gameOverImg, restart, restartImg;

function preload(){
 fishImg = loadImage("fish.jpg");
 background_image = loadImage("underwater.jpg");
 obstacle1 = loadImage("obstacle1.jpg");
 obstacle2 = loadImage("obstacle2.png");
 obstacle3 = loadImage("obstacle3.jpg");
 obstacle4 = loadImage("obstacle4.jpg");
 obstacle5 = loadImage("obstacle5.png");
 obstacle6 = loadImage("obstacle6.jpg");
 gameOverImg = loadImage("gameOver.png");
 restartImg = loadImage("restart.png");
}

function setup(){
  createCanvas(600,200)

 fish = createSprite(100,180,30,30);
 fish.addImage("fish",fishImg);
 fish.scale = 0.5;
 fish.x = 50;
 fish.debug = true;
 
 restart = createSprite(300,100,20,20);
 restart.addImage(restartImg);
 restart.scale = 0.5;
 restart.visible = false;

 gameOver = createSprite(300,50,20,20);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.5;
 gameOver.visible= false;
 
 background = createSprite(300,180,600,20)
 background.addImage("background",background_image);

    invisible_ground = createSprite(300,190,600,10);
    invisible_ground.visible = false;

    obstaclesGroup = new Group();

    fish.setCollider("circle",0,0,40);

}

function draw(){

  background("white")
  drawSprites();

 if(gameState===PLAY)
 {
  background.velocityX = -2;
 if(background.x<0)
{
  background.x = background.width/2;
}
 score += Math.round(frameCount/60);
 if(keyDown("space") && fish.y>=160)
 {
  fish.velocityY = -14;
 }
 fish.velocityY+=0.8;
 spawnObstacles();
  if(obstaclesGroup.isTouching(fish))
 {
  gameState = END;
 }
 }
else if(gameState===END)
{
  background.velocityX = 0;
  fish.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  restart.visible = true;
  gameOver.visible = true;
  if(mousePressedOver(restart)){
    reset()
  }
 }

  fish.collide(invisible_ground);
  text("Score: " + score,500,50);
}

function reset(){
 gameState = PLAY;
gameOver.visible = false;
restart.visible = false;
obstaclesGroup.destroyEach();
  score=0;
  }



function spawnObstacles(){
  if(frameCount%60===0)
  {
    var obstacle = createSprite(600,165,10,10)
    obstacle.scale = 0.5;
    obstacle.velocityX = -6;
    obstacle.lifetime = 100;
    var num = Math.round(random(1,6));
    switch(num)
    {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
        
      default:
        break;
    }
    obstaclesGroup.add(obstacle); 
  }
}