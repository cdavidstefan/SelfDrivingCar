const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 300;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 600;

const carCtx = carCanvas.getContext("2d");
const networkCtx = carCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width * 0.95);
const car = new Car(road.getLaneCenter(2), 200, 30, 50, "AI");
const traffic = [
    new Car(road.getLaneCenter(1), -100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2), -200,30,50,"DUMMY",2)
];



animate();
// car.draw(carCtx);

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders,[]);
    };

    car.update(road.borders, traffic);

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -car.y + carCanvas.height * 0.75);

    road.draw(carCtx);
    for (let i=0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }
    car.draw(carCtx, "darkgreen");

    carCtx.restore();

    Visualizer.drawNetwork(networkCtx, car.brain);
    requestAnimationFrame(animate);
}