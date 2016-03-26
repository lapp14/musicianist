<?php 
	include_once '../db.php';
	$db = new AdminDB(); 
?>
<!DOCTYPE html>
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="">
        <link href='https://fonts.googleapis.com/css?family=Oxygen' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="../../css/style.css">
        <style>
			body {
			    background: #aaa;
			    height: 100%;
			}

			div {
				border: 1px solid black;
			}

			div.inline {
				display: inline-block;
			}

	        .header {
			    color: #bbb;
			    background-color: #333;
    			height: 50px;
			}

			.brand {
			    display: inline-block;
			    margin: 8px;
			    font-size: 1.6em;
			}

			.body.row{
			    left: 0;
			    bottom: 0;
			}

			.content {
				margin: 0 100px;
				padding: 16px;
				background-color: #eee;
			}

			#input-tunings {
				width: 200px;
				height: 300px;
			}

			#input-strings {
				width: 80px;
			}

			#input-instrument {
				width: 160px;
			}
        </style>
	 </head>
    <body>   
    <div class="header row">
        <div class="brand">Musicianist</div>
    </div>
    <div class="body content row">
	    <h1>Edit Tunings</h1>
    	<div style="float: left">
	    	<table>
	    		<tr>
	    			<td>
		        		<label for="instrument">Instrument</label>
		        	</td>
		        	<td>
			        	<select name="intrument" id="input-instrument">
			        		<option value=""></option>
			        		<?php   
			        			$instruments = $db->getTunedInstruments();
								foreach($instruments as $row) {
									echo "<option value=" . $row['InstrumentID'] . ">" . $row['InstrumentName'] . "</option>\n";
								}
							?>
			        	</select>
			        </td>
		        </tr>
		        <tr>
		        	<td>
			        	<label for="strings">Strings</label>
			        </td>
			        <td>
			        	<select name="strings" id="input-strings">
			        		<option value=""></option>
			        	</select>
			        </td>
		        </tr>
		    </table>

	    	<div style="margin-top: 16px">
	        	<label for="tunings">Tunings</label><br/>
	        	<select name="tunings" id="input-tunings" size="20">                
					<option value=""></option>
	            </select>
	        </div>

	        <div style="margin-top: 12px">
	        	<button id="button-edit">Edit</button>
	        	<button id="button-new">New</button>
	        </div>
	    </div>

    	<div class="inline">
    		<label for="tuning-name">Tuning Name</label>
    		<input type="textfield" name="tuning-name"><br/>
    		<label for="tuning-strings">Number of Strings</label>
    		<input type="numnber" name="tuning-strings" min="4" max="10"><br/>

    		<strong>Tuning</strong>
    		<table>
    			<tr>
    				<td>String</td>
    				<td>Note</td>
    				<td>Octave</td>
    			</tr>

    			<?php
        			for($i = 0; $i < 10; $i++) {
        				echo '<tr>';
        				echo '<td>' . ($i+1) . '</td>';
        				echo '<td><input type="number" min="0" max="11"></td>';
        				echo '<td><input type="number" min="0" max="11"></td>';
        				echo '</tr>';
        			}
    			?>

    		</table>
    	</div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script>
    	$('#input-instrument').change(function() {
    		getNumberOfStrings();
    	});

    	$('#input-strings').change(function() {
    		getTunings();
    	});

    	$('#button-new').click(function() {

    	});

    	function getTunings() {
    		$.ajax({
    			url: 'edit-tunings.php',
    			type: 'post',
    			data: {
    				action: 'getTunings',
    				instrument: $('#input-instrument').val(),        				
    				strings: $('#input-strings').val()
    			},
				success: function(results) {
					var arr = $.parseJSON(results);
					var options = '';

					for(var i = 0, end = arr.length; i < end; i++) {
						options += '<option value="' + arr[i][1] + '">' + arr[i][2] + "</option>";
					}

					$('#input-tunings').html(options);
				}
    		});
    	}

    	function getNumberOfStrings() {
    		$.ajax({
    			url: 'edit-tunings.php',
    			type: 'post',
    			data: {
    				action: 'getNumberOfStrings',
    				instrument: $('#input-instrument').val()
    			},
				success: function(results) {
					var arr = $.parseJSON(results);
					var options = '';

					for(var i = 0, end = arr.length; i < end; i++) {
						options += '<option value="' + arr[i] + '">' + arr[i] + "</option>";
					}

					$('#input-strings').html(options);
					getTunings();
				}
    		});
    	}
        
    </script>
    </body>
</html>
