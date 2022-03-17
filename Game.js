const canvas = document.body.appendChild(document.createElement('canvas'));
canvas.width = 100;
canvas.height = 60;
canvas.style.border = "2px solid black";

const ctx = canvas.getContext('2d');

class Player {
  constructor() {
    this.x = 25;
    this.y = 0;
    this.up = false;
    this.size = [50, 50];
    this.speed = .5
  }

  handleDie() {
    alert('You died. You survived for ' + performance.now()/1000 + ' seconds.');
    this.update = () => {};
    location.reload();
  }

  update() {
    if(this.up) {
      this.y -= this.speed;
    } else {
      this.y += this.speed;
    }

    if(this.y < 0) {
      this.handleDie();
    } else if(this.y > 10) {
      this.handleDie();
    }
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(this.x, this.y, ...this.size);
  }
}

const player = new Player();

async function frame() {
  requestAnimationFrame(frame);
  player.update();
  player.render();
}

frame();

onkeydown = onkeyup = e => {
  player.up = (e.type == "keydown" && e.key == "ArrowUp");
}