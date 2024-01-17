const canvas = document.getElementById("myCanvas");
canvas.width = 400;

const ctx = canvas.getContext('2d');
const road = new Road(canvas.width/2, canvas.width * 0.95);
const car = new Car(200,200, 30, 50);
car.draw(ctx);


animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;
    car.draw(ctx);
    road.draw(ctx);
    requestAnimationFrame(animate);
}