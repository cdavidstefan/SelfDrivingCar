const canvas = document.getElementById("myCanvas");
canvas.width = 400;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width * 0.95);
const car = new Car(road.getLaneCenter(2),200, 30, 50);



animate();
car.draw(ctx);

function animate() {
    car.update(road.borders);

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.75);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}