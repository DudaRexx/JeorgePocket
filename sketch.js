var Jeorge, jeorge_img;
var Jeorgef;

var borda;
var chao, chao_img;
var chao2;
var nuvens, nuvens_img;
var cactos;
var gruponuvem;
var grupocacto;

var JOGAR = 0;
var PERDER = 1;
var modo = JOGAR;

var placar = 0;

var GameOver;
var Reiniciar;
var GameOverimg;
var Reiniciarimg;

var check;
var pulo;
var die;


function preload(){ 
  //pre carrega os arquivos do jogo
  jeorge_img = loadAnimation("trex2.png","trex3.png");

  chao_img = loadImage ("ground2.png");

  nuvens_img = loadImage ("cloud.png");

  cacto1 = loadImage ("obstacle1.png");
  cacto2 = loadImage ("obstacle2.png");
  cacto3 = loadImage ("obstacle3.png");
  cacto4 = loadImage ("obstacle4.png");
  cacto5 = loadImage ("obstacle5.png");
  cacto6 = loadImage ("obstacle6.png");

  Jeorgef = loadImage ("trex_collided.png");

  GameOverimg = loadImage ("gameOver.png");
  Reiniciarimg = loadImage ("restart.png");

  check = loadSound ("checkPoint.mp3");
  pulo = loadSound ("jump.mp3");
  die = loadSound ("die.mp3");

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  

  Jeorge = createSprite(50,height - 100,20,20);
  Jeorge.addAnimation("running",jeorge_img);
  Jeorge.addImage ("f",Jeorgef);
  Jeorge.scale = 0.5;

  GameOver = createSprite (width / 2,height / 2);
  GameOver.addImage (GameOverimg);

  Reiniciar = createSprite (width / 2,height / 2 + 50);
  Reiniciar.addImage (Reiniciarimg);

  GameOver.visible = false;
  Reiniciar.visible = false;

  //Jeorge.debug = true; 
  Jeorge.setCollider("circle",0,0,40);

  chao2 = createSprite (width / 2,height,width,20);
  chao2.visible = false;

  chao = createSprite(width / 2,height - 10,width,20);
  chao.addImage (chao_img);

  var numero = Math.round (random(1,10)) ; 
  console.log(numero);
  borda = createEdgeSprites();
   
  gruponuvem = new Group();
  grupocacto = new Group();

} 

function draw(){
  background('white');
  text ("placar: " + placar, width - 100,200);


  if (modo === JOGAR){

    if (touches.length > 0 && Jeorge.isTouching(chao)){
      Jeorge.velocityY = -14;
      
      touches = [];

      pulo.play();
     
      
    }

    
    if (chao.x < 0){

        chao.x = chao.width / 2;
       
    }
  
    chao.velocityX = -5;

    Jeorge.velocityY = Jeorge.velocityY + 0.9 ; 

    Jeorge.collide(chao2);

    gerar_nuvens();
    gerar_cactos();

    if (Jeorge.isTouching(grupocacto)) {
    

    die.play ();  
    modo = PERDER;

    //Jeorge.velocityY = -14;
    //pulo.play ();
     
    }

    placar = placar + Math.round (frameRate () /60); 
    
    if (placar %100 === 0 && placar > 0){
    
       check.play();
 
    }

  }

  else if (modo === PERDER) {

   chao.velocityX = 0;
   grupocacto.setVelocityXEach (0);
   gruponuvem.setVelocityXEach (0);
  
   grupocacto.setLifetimeEach (-1);
   gruponuvem.setLifetimeEach (-1);

   Jeorge.velocityY = 0;
  
   Jeorge.changeAnimation ("f");

   GameOver.visible = true;
   Reiniciar.visible = true;

    if ( touches.length > 0 ) {
     
     reset ();
     
     touches = [];

    }


  }
  
 

  
  drawSprites();
}

function gerar_nuvens () {

 if (frameCount %60 === 0) {

  nuvens = createSprite (width + 20,100,10,10);
  nuvens.velocityX = -5;
  nuvens.addImage (nuvens_img);
  nuvens.scale = 0.5;
  nuvens.y = Math.round(random(height - 150,height - 100)); 

  nuvens.lifetime = width + 20;
  gruponuvem.add(nuvens);

 }
  
 

}

function gerar_cactos () {

  if (frameCount %60 === 0) {
  
   cacto = createSprite (width + 20,height - 25,10,10);
 
   cacto.velocityX = -(5 + placar / 100);
    
   var rand = Math.round (random(1,6));
   
   switch (rand) {

   case 1: cacto.addImage (cacto1);
   break; 
   case 2: cacto.addImage (cacto2);
   break; 
   case 3: cacto.addImage (cacto3);
   break; 
   case 4: cacto.addImage (cacto4);
   break; 
   case 5: cacto.addImage (cacto5);
   break; 
   case 6: cacto.addImage (cacto6);
   break; 

   }

   cacto.scale = 0.5

   cacto.lifetime = width + 20;
   grupocacto.add(cacto);


  }
  
}

function reset () {

  modo = JOGAR;
  
  grupocacto.destroyEach (); 

  gruponuvem.destroyEach (); 

  GameOver.visible = false;
  Reiniciar.visible = false;

  placar = 0;
 
  Jeorge.changeAnimation ("running"); 
  


}