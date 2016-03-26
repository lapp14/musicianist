<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="">
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>      
        <canvas id="background"></canvas> 
        <canvas id="foreground"></canvas> 
        
        <svg id="svg"></svg>

        <div style="float: right; width: 500px">
            <button id="zoomIn">Zoom In</button><br/>
            <button id="zoomOut">Zoom Out</button>

            <p id="scale-info">

            </p>

            <label for="tonic">Tonic</label>
            <select name="tonic" id="tonic">
                <option value="0">C</option>
                <option value="1">C#/Db</option>
                <option value="2">D</option>
                <option value="3">Eb</option>
                <option value="4">E</option>
                <option value="5">F</option>
                <option value="6">Gb/F#</option>
                <option value="7">G</option>
                <option value="8">Ab</option>
                <option value="9">A</option>
                <option value="10">Bb</option>
                <option value="11">B</option>
            </select>
            <br/>

            <label for="scale">Scale</label>
            <select name="scale" id="scale">
                <option value="0">Major</option>
                <option value="1">Natural Minor (Aolean)</option>
                <option value="2">Harmonic Minor</option>
            </select>

        </div>
     
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script type="text/javascript" src="http://gabelerner.github.io/canvg/rgbcolor.js"></script> 
        <script type="text/javascript" src="http://gabelerner.github.io/canvg/StackBlur.js"></script>
        <script type="text/javascript" src="http://gabelerner.github.io/canvg/canvg.js"></script>

        <script src="js/Canvas.js"></script>
        <script src="js/snap.svg-min.js"></script>
        <script src="js/Scales.js"></script>
        <script>
            displayScaleInfo();
            $('#foreground').mousedown(Scales.events.mouseDownEvent);

            //test
            $('#zoomIn').click(function() {
                Scales.canvas.zoomFactor += 0.2;
                Scales.canvas.pan();
            });

            $('#zoomOut').click(function() {
                Scales.canvas.zoomFactor -= 0.2;
                Scales.canvas.pan();
            });

            $(function() {
                Scales.start();
            });   

            $('#tonic').on('change', function() {
                Scales.key.root = parseInt($('#tonic').val());
                Scales.canvas.foreground.setDirty();
                displayScaleInfo();
            });

            $('#scale').on('change', function() {
                Scales.key.selectedScale = parseInt($('#scale').val());
                Scales.canvas.foreground.setDirty();
                displayScaleInfo();
            });


            function displayScaleInfo() {
                $('#scale-info').html(
                    Scales.key.getTonic() + ' ' + 
                    Scales.key.getScaleName() + "<br/>" + 
                    Scales.key.getScalePitches() + "<br/>" +
                    Scales.key.getNotesString()
                );
            }
        </script>
    </body>
</html>
