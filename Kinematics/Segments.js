class Segment
{
    constructor(x, y, len, angle, thickness)
    {
        this.startPos = createVector(x,y);
        this.endPos = createVector();

        this.len = len;
        this.angle = angle;
        this.thickness = thickness;

        this.calculateEndPosition();
    }

    calculateEndPosition()
    {
        let dx = (this.len * cos(this.angle));
        let dy = (this.len * sin(this.angle));

        function clamp(x, a, b)
        {
            return Math.max(a, Math.min(x, b))
        }
        let newX = clamp(this.startPos.x + dx, 0, width);
        let newY = clamp(this.startPos.y + dy, 0, height);
        
        this.endPos.set(newX, newY);
    }

    draw()
    {
        stroke(255);
        strokeWeight(this.thickness);
        line(this.startPos.x, this.startPos.y, this.endPos.x, this.endPos.y);
    }
}

class ForwardKinematicSegment extends Segment
{
    constructor(x, y, len, angle, phase, thickness, parent, child)
    {
        super(x,y,len,angle,thickness);

        this.relativeAngle = angle;

        this.parent = parent;
        this.child = child;

        this.phase = phase;
        this.offset = random(1);
    }

    wiggle()
    {
        let maxAngle = 0.5;
        let minAngle = -0.5;
        this.relativeAngle = map(noise(this.phase * this.offset), 0, 1, maxAngle, minAngle);
        this.phase += 0.03;
    }

    update()
    {
        this.angle = this.relativeAngle;
        if(this.parent)
        {
            this.startPos = this.parent.endPos.copy();
            this.angle += this.parent.angle;
        }
        else
        {
            this.angle += -PI/2;
        }
        super.calculateEndPosition();
    }
}

class InverseKinematicSegment extends Segment
{

    constructor(x, y, len, angle, thickness, parent, child)
    {
        super(x, y, len, angle, thickness);
        
        this.parent = parent;
        this.child = child;
        
    }

    update()
    {
        super.calculateEndPosition();
    }

    follow()
    {
        if(this.child == null)
        {
            var target = createVector(mouseX, mouseY);
        }
        else
        {
            var target = createVector(this.child.startPos.x, this.child.startPos.y);
        }
        let dir = p5.Vector.sub(target, this.startPos);
        this.angle = dir.heading();

        dir.setMag(this.len);
        dir.mult(-1);

        this.startPos = p5.Vector.add(target, dir);
    }

    setStartPosition(vector)
    {
        this.startPos = vector.copy();
        this.calculateEndPosition();
    }
}