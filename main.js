var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let baseline = 200;

var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  jumpSpeed: 1,
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

dino.draw();

class Cactus {
  constructor() {
    this.x = 500;
    this.y = baseline;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

var timer = 0;
var cactusArray = [];
var animationFrame;
function animation() {
  animationFrame = requestAnimationFrame(animation);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 144 === 0) {
    var cactus = new Cactus();
    cactusArray.push(cactus);
  }

  dino.draw();

  if (jump == true) {
    dino.y -= dino.jumpSpeed;
    jumpTimer++;
  }
  if (jump == false && dino.y < baseline) {
    dino.y += dino.jumpSpeed;
  }
  if (jumpTimer > 100) {
    jump = false;
    jumpTimer = 0;
  }
  // cactus
  cactusArray.forEach((cactus, i, array) => {
    // 생성
    cactus.draw();

    // 이동
    cactus.x--;

    // 충돌
    collisionCheck(dino, cactus);

    // 제거
    if (cactus.x < 0) array.splice(i, 1);
  });
}

animation();

var jump = false;
var jumpTimer = 0;

// jump 이벤트
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && dino.y == baseline) {
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cancelAnimationFrame(animationFrame);
};
