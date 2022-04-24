class ColorLayer
{
    constructor(lowerBound, upperBound, layerColor)
    {
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.color = layerColor;
    }

    equals(other)
    {
        if(other.lowerBound == this.lowerBound && other.upperBound == this.upperBound && 
           ((other.color == null && this.color == null) || (other.color.value == this.color.value)))
            return true;
        return false;
    }
}