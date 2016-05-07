<?php
include_once '../db.php';
$db = new AdminDB(); 

if(isset($_POST['action']) && !empty($_POST['action'])) {
	$action = $_POST['action'];
	
	switch($action) {
		case 'getTunings':
			if(isset($_POST['instrument']) && !empty($_POST['instrument']) && isset($_POST['strings']) && !empty($_POST['strings'])) {
				$result = $db->getTunings($_POST['instrument'], $_POST['strings']);
				$arr = array();

				foreach($result as $row) {
					$arr[] = array_values($row);
				}

				echo json_encode($arr);
			} else {
				fail();
			}
			break;

		case 'getNumberOfStrings':
			if(isset($_POST['instrument']) && !empty($_POST['instrument'])) {
				$result = $db->getNumberOfStrings($_POST['instrument']);
				$arr = array();

				foreach($result as $row) {
					$arr[] = $row['NumberOfStrings'];
				}

				echo json_encode($arr);
			} else {
				fail();
			}
			break;

		default:
			fail();
	}
}

function fail() {
	echo json_encode(-1);
}
?>