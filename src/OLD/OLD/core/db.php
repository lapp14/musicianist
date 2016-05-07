<?php
class UserDB {
	public function __construct() {
		$username = "Musicianist";
		$password = "B4PVGBVjfa48EqWP";
		$this->pdo = new PDO('mysql:host=localhost;dbname=Musicianist', $username, $password);
	}

	function getTunings($instrumentID, $numberOfStrings) {	
		$stmt = $this->pdo->prepare("SELECT TuningID, TuningName FROM Tunings WHERE InstrumentID = :instrumentID AND NumberOfStrings = :numberOfStrings");
		$stmt->bindParam(':instrumentID', $instrumentID, PDO::PARAM_INT);
		$stmt->bindParam(':numberOfStrings', $numberOfStrings, PDO::PARAM_INT);
		$stmt->execute();

		return $stmt->fetchAll();
	}

	function getTuningNotes($tuning) {	
		$stmt = $this->pdo->prepare("SELECT NoteID FROM TuningNotes WHERE TuningID = :tuningID ORDER BY StringNumber");
		$stmt->bindParam(':tuningID', $tuning, PDO::PARAM_INT);
		$stmt->execute();

		return $stmt->fetchAll();
	}


	function getTunedInstruments() {	
		$stmt = $this->pdo->prepare("SELECT InstrumentID, InstrumentName FROM Instruments WHERE MultipleTunings = 1");
		$stmt->execute();

		return $stmt->fetchAll();
	}

	function getNumberOfStrings($instrumentID) {	
		$stmt = $this->pdo->prepare("SELECT DISTINCT NumberOfStrings FROM Tunings WHERE InstrumentID = :instrumentID");
		$stmt->bindParam(':instrumentID', $instrumentID, PDO::PARAM_INT);
		$stmt->execute();

		return $stmt->fetchAll();
	}

	function getScales() {
		$stmt = $this->pdo->prepare("SELECT ScaleID, ScaleName FROM Scales");
		$stmt->execute();

		return $stmt->fetchAll();
	}
}
?>