
var monkey, ground, monkey_running, banana , obstacle, 
    invisibleGround;
var bananaImage, obstacleImage;
var bananaGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500, 400);
  
  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  //creating ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
  
  //creating invisible ground
  invisibleGround = createSprite(200, 355, 500, 10);
  invisibleGround.visible = false;
  
  //create food and obstacle groups
  bananaGroup = createGroup();
  obstacleGroup = createGroup();

  score = 0;
  
}


function draw() {
  background("white");
  
  //display score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 100, 50);
  
  //reseting ground
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  //giving monkey jump control
  if(keyDown("space") && monkey.y >= 100) {
    monkey.velocityY = -15;
  }
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  
  //add food and obstacles
  //add food
  food();
  
  //add obstacles
  obstacles();


  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 120, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    //asign lifetime to banana
    banana.lifetime = 170;
    
    //add banana to a group
    bananaGroup.add(banana);
    
  }
}

function obstacles() {
  if(frameCount % 300 === 0) {
    var rock = createSprite(500, 380, 10, 10);
    rock.addImage(obstacleImage);
    rock.velocityX = -3;
    
    //assign lifetime to rock
    rock.lifetime = 170;
    
    //add rock to a group
    obstacleGroup.add(rock);
  }
}