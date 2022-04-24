class Ray
{
    constructor(position, angle, maxRange, rayColor, doDrawPoints=false)
    {
        this.position = position;
        this.direction = this.getVectorFromRadianAngle(angle);
        
        this.rangeConstant = 1500;
        this.maxRange = maxRange * this.rangeConstant;
        this.remainingRange = maxRange * this.rangeConstant;
        
        this.color = rayColor;

        this.rayPoints = [];
        this.doDrawPoints = doDrawPoints;
    }

    cast(edges)
    {
        this.rayPoints = [];
        this.rayPoints.push(this.position);
        this.castRecursionHelper(this.position, this.direction, this.maxRange, edges, null);
    }

    castRecursionHelper(position, direction, remainingRange, edges, currentEdge)
    {
        let [castPoint, edge] = this.getClosestEdgeData(position, direction, edges, currentEdge);

        if(castPoint != null)
        {   
            let distance = this.getDistanceToNextPoint(position, castPoint);

            if(remainingRange - distance <= 0)
            {
                let magnitude = (remainingRange/distance)
                let x = position.x + (magnitude * (castPoint.x - position.x));
                let y = position.y + (magnitude * (castPoint.y - position.y))
                this.rayPoints.push(createVector(x,y));
            }
            else 
            {
                this.rayPoints.push(castPoint);
                remainingRange -= distance;
                remainingRange *= edge.reflectionCost;
                
                if(remainingRange > 0)
                {
                    // Calculate new ray direction based off new point
                    let newDirection = this.calculateReflectionFromEdge(direction, edge);
                    this.castRecursionHelper(castPoint, newDirection, remainingRange, edges, edge);
                }
            }
        }
    }

    getClosestEdgeData(position, direction, edges, currentEdge)
    {
        let closestDistance = Infinity;
        let closestPoint = null;
        let closestEdge = null;

        for(let edge of edges)
        {
            if(!edge.equals(currentEdge))
            {
                const possiblePoint = this.calculateIntersectionPoint(position, direction, edge);

                if(possiblePoint)
                {
                    const possibleDist = p5.Vector.dist(position, possiblePoint);
                    if(possibleDist < closestDistance)
                    {
                        closestDistance = possibleDist;
                        closestPoint = possiblePoint;
                        closestEdge = edge;
                    }
                }
            }
        }
        return [closestPoint, closestEdge];
    }

    calculateIntersectionPoint(position, direction, edge)
    {
        const x1 = edge.a.x;
        const y1 = edge.a.y;
        const x2 = edge.b.x;
        const y2 = edge.b.y;

        const x3 = position.x;
        const y3 = position.y;
        const x4 = position.x + direction.x;
        const y4 = position.y + direction.y;

        const denomenator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if(denomenator == 0) return null;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denomenator;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denomenator;

        if(t > 0 && t < 1 && u > 0)
        {
            let x = x1 + t * (x2 - x1);
            let y = y1 + t * (y2 - y1);
            return createVector(x,y);
        }
        else return null;
    }

    calculateReflectionFromEdge(direction, edge)
    {
        let normal = edge.calculateNormal();
        let dir = direction.copy()
        let reflection = dir.sub(normal.mult((dir.dot(normal) * 2)/(normal.mag() ** 2)));
        return reflection;
    }

    getDistanceToNextPoint(pointA, pointB)
    {
        return dist(pointA.x, pointA.y, pointB.x, pointB.y);
    }

    getVectorFromRadianAngle(angle)
    {
        return createVector(Math.cos(angle), Math.sin(angle));
    }

    lookAt(x, y)
    {
        this.direction.x = x - this.position.x;
        this.direction.y = y - this.position.y
        this.direction.normalize();
    }

    draw()
    {
        stroke(this.color);
        fill(this.color);
        strokeWeight(0.1);

        let startAlpha = 255;
        let stepLength = 10;
        
        if(this.rayPoints.length > 1)
        {
            for(let i=0; i<this.rayPoints.length-1; i++)
            {
                if(this.doDrawPoints)
                    ellipse(this.rayPoints[i+1].x, this.rayPoints[i+1].y, 5, 5);
                
                line(this.rayPoints[i].x, this.rayPoints[i].y, this.rayPoints[i+1].x, this.rayPoints[i+1].y);
            }
        }
    }

    drawRay(pointA, pointB, stepLength, alpha)
    {
        let dist = this.getDistanceToNextPoint(pointA, pointB);
        let steps = dist/stepLength;

        for(let i=0; i<steps; i++)
        {
            let a = steps*i;
            let b = steps*i + steps
            
        }
    }
}