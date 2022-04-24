class ForwardKinematicArm
{

    constructor(startX, startY, startLength, lengthGrowRate, startThickness, thicknessGrowRate, segmentCount)
    {
        let phase = 0;
        this.base = new ForwardKinematicSegment(startX, startY, startLength, 0, phase, startThickness, null, null);

        let current = this.base;
        for(let i=1; i<segmentCount; i++)
        {
            phase += 0.2
            startLength *= lengthGrowRate;
            startThickness *= thicknessGrowRate;

            let next = new ForwardKinematicSegment(current.endPos.x, current.endPos.y, startLength, 0, phase, startThickness, current, null);
            current.child = next;
            current = next;
        }
    }

    drawAndUpdate()
    {
        let current = this.base;
        while(current != null)
        {
            current.wiggle();
            current.update();
            current.draw();
            current = current.child;
        }
    }
}

class InverseKinematicArm
{
    constructor(startX, startY, startLength, lengthGrowRate, startThickness, thicknessGrowRate, segmentCount)
    {

        this.basePos = createVector(startX, startY);
        this.base = new InverseKinematicSegment(startX, startY, startLength, 0, startThickness, null, null);

        let current = this.base;
        for(let i=1; i<segmentCount; i++)
        {
            startLength *= lengthGrowRate;
            startThickness *= thicknessGrowRate;

            let next = new InverseKinematicSegment(current.endPos.x, current.endPos.y, startLength, 0, startThickness, current, null);
            
            current.child = next;
            current = next;
        }
        this.tip = current;
    }

    drawAndUpdate()
    {
        let current = this.tip;
        while(current != null)
        {
            current.follow();
            current.update();
            current = current.parent;
        }
        
        this.base.setStartPosition(this.basePos.copy());

        current = this.base.child;
        while(current != null)
        {
            current.setStartPosition(current.parent.endPos);
            current = current.child;
        }

        current = this.tip;
        while(current != null)
        {
            current.draw();
            current = current.parent;
        }
    }
}