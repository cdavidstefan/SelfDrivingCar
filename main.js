const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 300;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 600;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2, carCanvas.width * 0.95);

const N = 25;
const cars = generateCars(N);
let bestCar = cars[0];

if (localStorage.getItem("bestBrain")) {
    for (let i=0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain"));
        if (i!=0) {
            NeuralNetwork.mutate(cars[i].brain, 0.1);
        }
    }
};

const traffic = [
    new Car(road.getLaneCenter(1), -175,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2), -250,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(6), -300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(3), -800,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(5), -1650,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0), -950,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0), -1050,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0), -1900,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2), -2000,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1), -2000,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(4), -2100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(3), -1400,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2), -1300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2), -600,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(3), -500,30,50,"DUMMY",2),
];



animate();
// car.draw(carCtx);

function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N) {
    const cars = [];

    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"))
    }
    return cars;
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders,[]);
    };

    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }

    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        ));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.75);

    road.draw(carCtx);
    for (let i=0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "orange");
    }

    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
    cars[i].draw(carCtx, "darkgreen");
    }

    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "darkgreen", true);

    carCtx.restore();

    networkCtx.lineDashOffset = -time/50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}