var rowList = new List();

var Music = Music || {
    background: null,
    selection: null,
    foreground: null,
        
    getBackgroundCanvas: function() {
        return this.background.canvas;
    },
    
    getBackgroundContext: function() {
        return this.background.canvas.context;
    }      
};

Music.draw = function() {               
    if(Music.background.isDirty) {
        Music.background.clearAll();
        var offset = Music.scroll.offset;
        
        console.log('offset ' + offset + ', list.height ' + rowList.height);
        var drawn = []; //DEBUGGING

        for(var i = 0, size = rowList.size(); i < size; i++) {
            var item = rowList.get(i);

            if(item.position.y >= Music.getBackgroundCanvas().height + offset) {
                break;
            }

            //determine if row should be drawn
            if(item.position.y + item.height > offset) { 
                //list drawn rows for debugging only
                drawn.push(item.index);
                Music.background.drawCanvas(item.canvas, item.position.x, item.position.y - offset);
            }
        }

        console.log('drawn ' + drawn.join());
        Music.background.isDirty = false;
    }
    
    if(Music.scrollbar.isDirty) {
        Music.scrollbar.clearAll();
        Music.scrollbar.drawBar();
    }
    
    if(Music.selection.isDirty) {
        Music.selection.clearRect();
        Music.selection.drawSelection();
    }

    window.requestAnimationFrame(Music.draw);
};

Music.util = {
    //Random int from [0 - x)
    randomInt: function(x) {
        return Math.floor((Math.random() * x + 1));
    }     
};

Music.scroll = new function() {
    //this.scrolling = false;
    this.offset = 0;
    
    this.scrollHeight = 30;
   
    this.scrollUp = function() {    
        if(Music.scroll.offset >= Music.scroll.scrollHeight) {
            Music.scroll.offset -= Music.scroll.scrollHeight;
            console.log(Music.scroll.offset);
            Music.background.setDirty();
            Music.selection.setDirty();
            Music.scrollbar.calculateHeight();
            Music.scrollbar.setDirty();
        } else {
            Music.scroll.offset = 0;
        }
    };

    this.scrollDown = function() {
        if(Music.scroll.offset < rowList.height - Music.getBackgroundCanvas().height * 0.6) {
            Music.scroll.offset += Music.scroll.scrollHeight;
            console.log(Music.scroll.offset);
            Music.background.setDirty();
            Music.selection.setDirty();
            Music.scrollbar.calculateHeight();
            Music.scrollbar.setDirty();
        }
    };
    
    this.event = new function() {
        this.yClick = 0;
        this.clickOffset = 0;
        
        this.mousedown = function(evt) {
            Music.scroll.event.clickOffset = Music.scroll.offset;
            Music.scroll.event.yClick = evt.clientY;
            console.log('scrollbar down');
            window.addEventListener('mousemove', Music.scroll.event.mousemove, false);
            window.addEventListener('mouseup', Music.scroll.event.mouseup, false);
            //Music.scroll.scrolling = true;
        };
        
        this.mouseup = function(evt) {             
            window.removeEventListener('mousemove', Music.scroll.event.mousemove, false);
            window.removeEventListener('mouseup', Music.scroll.event.mouseup, false);
            //Music.scroll.scrolling = false;
        };
        
        this.mousemove = function(evt) {
            var scrollOffset = evt.clientY - Music.scroll.event.yClick + Music.scroll.event.clickOffset;
            
            Music.scrollbar.reposition();
            
            if(scrollOffset < 0) {
                Music.scroll.offset = 0;
            } else if(scrollOffset > rowList.height - Music.getBackgroundCanvas().height * 0.6) {     
                
            } else {
                Music.scroll.offset = scrollOffset;
            }

            Music.background.setDirty();
            Music.scrollbar.setDirty();
            Music.selection.setDirty();
        };
    };
};

var dim = dim || {
    staffHeight: 160
};

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

Canvas.prototype.clearArea = function(x, y, width, height) {
    this.context.clearRect(x, y, width, height);
};
    
Canvas.prototype.clearAll = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Canvas.prototype.drawCanvas = function(canvas, x, y){
    this.context.drawImage(canvas, x, y);
};


function SelectionCanvas(canvas, width, height) {
    Canvas.call(this, canvas, width, height);
    this.context.globalAlpha = 0.8;
    this.context.fillStyle = 'yellow';
    this.rect = new Rect(0, 0, 120, 60);
}

SelectionCanvas.prototype = new Canvas();

SelectionCanvas.prototype.setSelection = function(point, width, height) {
    this.clearRect();    
    this.rect.width = (width | 100);
    this.rect.height = (height | 100);
    this.rect.x = point.x;
    this.rect.y = point.y + Music.scroll.offset;
    this.setDirty();
};

SelectionCanvas.prototype.drawSelection = function() {
    if(this.rect && this.rect.y - Music.scroll.offset + this.rect.height >= 0 && this.rect.y - Music.scroll.offset <= Music.background.canvas.height) {
        console.log('draw selection');
        this.drawnY = this.rect.y - Music.scroll.offset;
        this.context.fillRect(this.rect.x, this.drawnY, this.rect.width, this.rect.height);
        this.isDirty = false;
    }
};

SelectionCanvas.prototype.clearRect = function() {
    this.clearArea(this.rect.x, this.drawnY, this.rect.width, this.rect.height);
};

/**
 * 
 * @param {type} canvas
 * @returns {Scrollbar}
 */
function Scrollbar(canvas) {
    var bg = Music.background;   

    this.scrollbarWidth = 12;    
    Canvas.call(this, canvas, this.scrollbarWidth, bg.canvas.height - 2 * this.padding.top);
    
    this.height = this.canvas.height;
    this.setPosition();    
    
    this.event = {
        mousedown: null,
        mouseup: null,
        mousemove: null
    };
    
    this.drawBar();
    this.setMouseDownFunc(Music.scroll.event.mousedown);
}

Scrollbar.prototype = new Canvas();
Scrollbar.prototype.padding = { top: 8, side: 8 };
Scrollbar.prototype.style = { colour: '#333' };

Scrollbar.prototype.setPosition = function() { 
    var bg = Music.background; 
    this.position.x = bg.position.x + bg.canvas.width - this.canvas.width - 8;
    this.position.y = bg.position.y + this.padding.top;
    this.canvas.style.left = this.position.x + 'px';
    this.canvas.style.top = this.position.y + 'px';
};

Scrollbar.prototype.resize = function(height) {
    this.setHeight(height);
};

Scrollbar.prototype.drawBar = function() {
    this.context.fillStyle = this.style.colour;
    this.context.fillRect(0, this.position.y, this.canvas.width, this.height);
};

Scrollbar.prototype.calculateHeight = function() {
    this.height = Math.floor(this.canvas.height * this.canvas.height / (rowList.height + Music.background.canvas.height * 0.4));
    this.reposition();
};

Scrollbar.prototype.reposition = function() {
    if(Music.scroll.offset > 0) {
        this.position.y = Math.floor(Music.scroll.offset / (rowList.height + Music.background.canvas.height * 0.4)* this.canvas.height);
    } else {
        this.position.y = 0;
    }    
};

Scrollbar.prototype.setMouseDownFunc = function(mousedown) {
    this.event.mousedown = mousedown;
    this.canvas.addEventListener('mousedown', mousedown, true);   
};

/**
 * Row class
 * 
 * represents a single drawn row on the canvas
 * @param height
 */
function Row(height) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
        
    this.canvas.height = this.height = height;
    
    if(Music.background) {
        this.canvas.width = this.width = Music.background.canvas.width;
    }
    
    this.canvas.style.height = this.height + 'px';
    this.canvas.style.width = this.width + 'px';
    
    this.position = new Point(0, 0);
};

//Debug only
Row.prototype.randomBackground = function() {
    this.context.fillStyle = 'rgb(' + Music.util.randomInt(255) + ',' + Music.util.randomInt(255) + ',' + Music.util.randomInt(255) + ')';
    this.context.fillRect(0, 0, this.width, this.height);
    
    return this;
};

//Debug only
Row.prototype.setNumber = function(num) {
    this.context.font = '20px sans-serif';
    this.context.fillStyle = 'black';
    this.context.fillText(num, 20, 36);
    this.index = num;
    return this;
}


function StaffRow() {
    Row.call(this, dim.staffHeight);    
};

StaffRow.prototype = new Row();

StaffRow.prototype.drawStaff = function() {    
    var padding = 40;
    var spacing = 10;
    var middle = this.canvas.height / 2;
    this.context.beginPath();
    this.context.moveTo(padding, middle - 2 * spacing);
    this.context.lineTo(this.canvas.width - padding , middle - 2 * spacing);
    this.context.moveTo(padding, middle - spacing);
    this.context.lineTo(this.canvas.width - padding , middle - spacing);
    this.context.moveTo(padding, middle);
    this.context.lineTo(this.canvas.width - padding , middle);
    this.context.moveTo(padding, middle + spacing);
    this.context.lineTo(this.canvas.width - padding , middle + spacing);
    this.context.moveTo(padding, middle + 2 * spacing);
    this.context.lineTo(this.canvas.width - padding , middle + 2 * spacing);
    this.context.stroke();
    return this;
};

/**
 * 
 * @returns {Title}
 */
function Title() {
    Row.call(this, 150);
    
    this.textWidth = {
        title: 0,
        subtitle: 0,
        note: 0
    };
    
    this.setTitle('Artist Name');
    this.setSubtitle('Song Name');
    this.setNote('Here are some notes about the song and some stuff.');    
    
    this.position = new Point(0, 0);
    this.resize(); 
    
  /*  this.context.fillStyle = 'red';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = 'black';
 */   
    var spacing = this.fontSize.title + this.padding;
    this.context.font = this.fontSize.title + 'px ' + this.font.title;
    
    var canvasCenter = this.width / 2
    var center = Math.floor(canvasCenter - (this.textWidth.title / 2));
    this.context.fillText(this.title, center, spacing);
    
    spacing += this.fontSize.subtitle + this.spacing;
    this.context.font = this.fontSize.subtitle + 'px ' + this.font.subtitle;
    center = Math.floor(canvasCenter - (this.textWidth.subtitle / 2));
    this.context.fillText(this.subtitle, center, spacing);
    
    spacing += this.fontSize.note + this.spacing;
    this.context.font = this.fontSize.note + 'px ' + this.font.note;
    center = Math.floor(canvasCenter - (this.textWidth.note / 2));
    this.context.fillText(this.note, center, spacing);
}

Title.prototype.padding = 30;
Title.prototype.spacing = 10;

Title.prototype.fontSize = {
    title: 28,
    subtitle: 18,
    note: 12
}

Title.prototype.font = {
    title: 'Arial',
    subtitle: 'Verdana',
    note: 'Courier new'
};

Title.prototype.setTitle = function(text) {
    this.title = text;
    this.context.font = this.fontSize.title + 'px ' + this.font.title;
    this.textWidth.title = Math.ceil(this.context.measureText(text).width);
    console.log('titlewidth = ' + this.textWidth.title);
};

Title.prototype.setSubtitle = function(text) {
    this.subtitle = text;
    this.context.font = this.fontSize.subtitle + 'px ' + this.font.subtitle;
    this.textWidth.subtitle = Math.ceil(this.context.measureText(text).width);
    console.log('subtitlewidth = ' + this.textWidth.subtitle);
};

Title.prototype.setNote = function(text) {
    this.note = text;
    this.context.font = this.fontSize.note + 'px ' + this.font.note;
    this.textWidth.note = Math.ceil(this.context.measureText(text).width);
    console.log('notewidth = ' + this.textWidth.note);
};

Title.prototype.resize = function() {
    var spacing = this.spacing;
    var height = this.padding * 2;
    
    if(this.title && this.title !== '') {
        height += this.fontSize.title;
    }
    
    if(this.subtitle && this.subtitle !== '') {
        height += spacing + this.fontSize.subtitle;
    }
    
    if(this.note && this.note !== '') {
        height += spacing + this.fontSize.note;
    }    
    
    this.canvas.height = this.height = height;
    this.canvas.width = this.width = Math.max(this.textWidth.title, this.textWidth.subtitle, this.textWidth.note);
    console.log(this.width);
    
    this.canvas.style.height = this.height + 'px';
    this.canvas.style.width = this.width + 'px';   
    
    this.position.x = Math.floor((Music.getBackgroundCanvas().width / 2) - (this.width / 2));
};

/**
 * 
 * @returns {undefined}
 */
function List() {
    this.items = [];
    this.height = 0;
}

List.prototype.size = function() {
    return this.items.length;
};

List.prototype.add = function(item, index) {
    if(index) {
        this.items.splice(index, 0, item);
    } else {
        item.position.y = this.height;
        this.height += item.height;
        this.items.push(item);
        console.log('list.add(' + this.items.length + ')    list.height = ' + this.height + ', item.yPosition = ' + item.position.y);
    }
};

List.prototype.get = function(index) {
    return this.items[index];
};

List.prototype.removeElement = function(index) {
    this.items.splice(index, 1);
    this.calculateHeight();
};

List.prototype.removeLast = function() {
    if (this.items.length < 1) {
        return;
    }
    
    var item = this.items.pop();
    this.height -= item.height;
    delete item;
}

List.prototype.calculateHeight = function() {
    var y = 0;
    
    for(var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        item.position.y = y;
        y += item.height;
    }
    
    this.height = y;
}


/**
 * Point class 
 * Represents a point in x, y space
 * @param {type} x the x coordinate
 * @param {type} y the y coordinate
 * @returns {Point}
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
};

//debugging only
Point.prototype.logCoords = function(tag) {
    if(!tag) {
        tag = '';
    }
      
    console.log(tag + ' coordinates (' + this.x + ', ' + this.y + ')');
};

/**
 * Rectangle class
 * @param {type} x the x coordinate of top left corner
 * @param {type} y the y coordinate of top left corner
 * @param {type} width rectangle width
 * @param {type} height rectangle height
 * @returns {Rect}
 */
function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Rect.prototype.toString = function() {
    return 'Coords (' + this.x + ', ' + this.y + '), size ' + this.width + 'x' + this.height;
};