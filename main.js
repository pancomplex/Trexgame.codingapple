const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let dinoImage = new Image();
dinoImage.src = "dino.png";
let dinoImage1 = new Image();
dinoImage1.src = "dino1.png";
let dinoImage2 = new Image();
dinoImage2.src = "dino2.png";
let dinoImage0 = new Image();
dinoImage0.src = "dino0.png";
let cactusImage = new Image();
cactusImage.src = "cactus.png";
let groundImage = new Image();
groundImage.src = "ground.png";

const baseline = 500;
const sideMargin = 100;
const gameSpeed = 4;
const cactusTerm = 2;

var jump = false;
var jumpTimer = 0;
var currentSpeed;

var timer = 0;
const frame = 144;
var animationFrame;

var cactusArray = [];
var groundArray = [];

const dino = {
  x: sideMargin,
  y: baseline,
  width: dinoImage.width,
  height: dinoImage.height,
  jumpAcceleration: 0.5,
  jumpSpeed: 4,
  draw1() {
    // ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(dinoImage1, this.x, this.y - this.height, this.width, this.height);
  },
  draw2() {
    ctx.drawImage(dinoImage2, this.x, this.y - this.height, this.width, this.height);
  },
  draw0() {
    //  ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      dinoImage0,
      this.x + 4,
      this.y + 4 - this.height,
      this.width - 8,
      this.height - 8
    );
  },
};
class Cactus {
  constructor() {
    this.x = canvas.width - sideMargin;
    this.y = baseline;
    this.width = cactusImage.width;
    this.height = cactusImage.height;
  }
  draw() {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(cactusImage, this.x, this.y - this.height, this.width, this.height);
  }
}
class Ground {
  constructor() {
    this.x = 0;
    this.y = baseline;
    this.width = groundImage.width;
    this.height = groundImage.height;
  }
  draw() {
    ctx.drawImage(groundImage, this.x, this.y - this.height, this.width, this.height);
  }
}

// jump 이벤트
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && jump == false) {
    currentSpeed = dino.jumpSpeed;
    jump = true;
  }
});

// 충돌 체크
const collisionCheck = (dino, cactus) => {
  var dx = cactus.x - (dino.x + dino.width);
  var dx2 = cactus.x + cactus.width - dino.x;
  var dy = cactus.y - (dino.y + dino.height);
  if (dx < 0 && dx2 > 0 && dy < 0) {
    collision();
  }
};
const collision = () => {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  dino.draw0();
  cancelAnimationFrame(animationFrame);
};

function animation() {
  animationFrame = requestAnimationFrame(animation);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // dino
  // 생성
  timer % (frame / gameSpeed) > frame / (gameSpeed * 2) ? dino.draw1() : dino.draw2();

  // jump 액션
  if (jump == true) {
    dino.y -= currentSpeed;
    jumpTimer++;
    if (jumpTimer % (frame / 12) === 0) currentSpeed -= dino.jumpAcceleration;
  }
  if (jump == true && dino.y > baseline) {
    jump = false;
    jumpTimer = 0;
    dino.y = baseline;
  }

  // cactus
  if (timer % (frame * cactusTerm) === 0) {
    var cactus = new Cactus();
    cactusArray.push(cactus);
  }

  cactusArray.forEach((cactus, i, array) => {
    // 생성
    cactus.draw();

    // 이동
    cactus.x -= gameSpeed;

    // 충돌
    collisionCheck(dino, cactus);

    // 제거
    if (cactus.x < 0) array.splice(i, 1);
  });

  // ground
  if (timer == 0) {
    var initialGround = new Ground();
    groundArray.push(initialGround);
  }
  if (timer == 0 || timer % Math.round(groundImage.width / gameSpeed) === 0) {
    var nextGround = new Ground();
    nextGround.x = groundImage.width;
    groundArray.push(nextGround);
  }

  groundArray.forEach((ground, i, array) => {
    // 생성

    ground.draw();

    // 이동
    ground.x -= gameSpeed;

    // 제거
    if (ground.x + ground.width < 0) array.splice(i, 1);
  });

  timer++;
}

animation();
