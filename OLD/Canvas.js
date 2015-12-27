function Canvas(canvas, width, height) {
    this.isDirty = true;
    this.position = new Point(0, 0);
    
    if(canvas) {
        this.canvas = document.getElementById(canvas);
        if(this.canvas.getContext) {
            this.context = this.canvas.getContext('2d');
            this.canvas.style.left = 0; 
            this.canvas.style.top = 0;
        }
    } 
    
    if(width) {
        this.setWidth(width);
    }
    
    if(height) {
        this.setHeight(height);
    }
    
}

Canvas.prototype.setDirty = function() {
    this.isDirty = true;
};

Canvas.prototype.resize = function(width, height) {
    this.setWidth(width);
    this.setHeight(height);
};

Canvas.prototype.setWidth = function(width) {
    this.canvas.width = width;
    this.canvas.style.width = width + 'px';
};
    
Canvas.prototype.setHeight = function(height) {
    this.canvas.height = height;
    this.canvas.style.height = height + 'px';
};

Canvas.prototype.getWidth = function() {
    return this.canvas.width;
};
    
Canvas.prototype.getHeight = function() {
    return this.canvas.height;
};


Canvas.prototype.clearArea = function(x, y, width, height) {
    this.context.clearRect(x, y, width, height);
};
    
Canvas.prototype.clearAll = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Canvas.prototype.drawCanvas = function(canvas, x, y){
    this.context.drawImage(canvas, x, y);
};


/**
 * Point class 
 * Represents a point in x, y space
 * @param {type} x the x coordinate
 * @param {type} y the y coordinate
 * @returns {Point}
 */
function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

//debugging only
Point.prototype.logCoords = function(tag) {
    if(!tag) {
        tag = '';
    }
      
    console.log(tag + ' coordinates (' + this.x + ', ' + this.y + ')');
};