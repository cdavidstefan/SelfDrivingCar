class Road {
    constructor(x, width, laneCount = 5) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width/2;
        this.right = x + width/2;

        const infinity = 100000000;
        this.top = -infinity;
        this.bottom = infinity;
    }

    draw(ctx) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";

        for (let i = 0; i <= this.laneCount; i++) {
            const x = lerp(
                this.left, 
                this.right, 
                i/this.laneCount
            );

            if (i > 1 && i < this.laneCount-1) {
                ctx.setLineDash([20,20]);
                // ?????????????????????????????????????????????
            } else {
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
        }
    }
}