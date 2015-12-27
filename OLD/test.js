/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function start(){
    var width = 1300;
    var height = 700;
    
    Music.background = new Canvas('background', width, height);
    Music.selection = new SelectionCanvas('selection', width, height); 
    Music.foreground = new Canvas('foreground', width, height); 
    Music.scrollbar = new Scrollbar('scrollbar');

    var numRows = 6;
    
    rowList.add(new Title());
    
    for(var i = 0; i < numRows; i++) {
        rowList.add(new StaffRow().randomBackground().drawStaff());
    }
    
    Music.scrollbar.calculateHeight();

    Music.foreground.canvas.addEventListener('click', function(evt) {
        var rect = Music.getBackgroundCanvas().getBoundingClientRect();
        var pos = new Point(
            Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * Music.getBackgroundCanvas().width),
            Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * Music.getBackgroundCanvas().height)
        );
        pos.logCoords('click');
        Music.selection.setSelection(pos, Music.util.randomInt(80) + 80, Music.util.randomInt(50) + 50);
    });

    window.requestAnimationFrame(Music.draw);
}

function windowResize(width, height) {
    Music.background.resize(width, height);
    Music.foreground.resize(width, height);
    Music.selection.resize(width, height);
    
    Music.scrollbar.resize(height);
    Music.scrollbar.calculateHeight();
    Music.scrollbar.setPosition();
    
    Music.background.setDirty();
    Music.foreground.setDirty();
    Music.selection.setDirty();
}

function scrollUp() {    
    if(Music.scroll.offset >= Music.scroll.scrollHeight) {
        Music.scroll.offset -= Music.scroll.scrollHeight;
        console.log(Music.scroll.offset);
        Music.background.setDirty();
    } else {
        Music.scroll.offset = 0;
    }
}

function scrollDown() {
    if(Music.scroll.offset < rowList.height - Music.getBackgroundCanvas().height * 0.6) {
        Music.scroll.offset += Music.scroll.scrollHeight;
        console.log(Music.scroll.offset);
        Music.background.setDirty();
    }
}

function deleteLast() {
    rowList.removeLast();
    Music.background.setDirty();
    Music.scrollbar.calculateHeight();
    Music.scrollbar.setDirty();
}

function deleteMiddle(index) {
    rowList.removeElement(index);
    Music.background.setDirty();
    Music.scrollbar.calculateHeight();
    Music.scrollbar.setDirty();
}

function addEnd() {
    rowList.add(new StaffRow().randomBackground().drawStaff());
    Music.background.setDirty();
    Music.scrollbar.calculateHeight();
    Music.scrollbar.setDirty();
}

