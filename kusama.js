class Kusama {
    constructor(x,y,r) {
      
      this.color = this.getColor();
      this.x = x;
      this.y = y;
      this.r = r;
    }
    
    getColor() {
      // let dotColors = ['white']
      let dotColors = ['purple', 'blue', 'yellow', 'maroon', 'pink', 'red', 'green']
      // let dotColors = ['black']
      
      let color = random(dotColors);
      
      return color;
    }
    
    display() {
      noStroke();
      fill(this.color);
      return ellipse (this.x, this.y, this.r);
    }
    updateCoords(newX, newY) {
        this.x = newX;
        this.y = newY;

    }
  }
