var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var particle;
var yline;
var turn = 5;
var gameState = "start";
var divisionHeight=300;
var score = 0;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 55; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,100));
    }

    for (var j = 30; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,200));
    }

     for (var j = 55; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,300));
    }

     for (var j = 30; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,400));
    }

    particle = new Particle(mouseX,10,10,10);

    //var Yline = createSprite(400,500,800,5);

    yline = new Yline(400,500,800,5);
    
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,675,30);
  if(gameState === "start" || gameState === "throw"){
    textSize(20);
    text("Turns left : "+turn,675,60);
  }
  textSize(40)
  text("0",27.5,750);
  text("10",97.5,750);
  text("50",177.5,750);
  text("100",245,750);
  text("200",327.5,750);
  text("200",407.5,750);
  text("100",485,750);
  text("50",580,750);
  text("10",657.5,750);
  text("0",750,750);
  Engine.update(engine);
 
  
  yline.display();
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   //if(frameCount%60===0){
   //  particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
   //  score++;
   //}
 
  //for (var j = 0; j < particles.length; j++) {
   
  //   particles[j].display();
  // }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
   if(gameState === "throw"){
     particle.display();
   }
   if(gameState === "throw" && particle.body.position.y > 700){
    gameState = "start";
  }
  if(turn < 0){
    gameState = "over";
  }
   if(frameCount%50===0){
     console.log(gameState);
   }
   if(particle.body.position.y === yline.body.position.y && gameState === "throw" && particle.body.position.x <= 80 || particle.body.position.y === yline.body.position.y && gameState === "throw" && particle.body.position.x <= 720){
     score++
   }
   //drawSprites();
}

function mousePressed(){
  if(gameState === "start"){
    turn--;
    particle = new Particle(mouseX,10,10,10);
    gameState = "throw";
  }
}