<?php
class AdminDB {

	public function __construct() {
		$username = "MusicianistAdmin";
		$password = "7jeEEZTvU3vvy8xh"; //localhost
		$this->pdo = new PDO('mysql:host=localhost;dbname=Musicianist', $username, $password);

	}
		
	function getTunings($instrumentID, $numberOfStrings) {	
		$stmt = $this->pdo->prepare("SELECT TuningID, TuningName FROM Tunings WHERE InstrumentID = :instrumentID AND NumberOfStrings = :numberOfStrings");
		$stmt->bindParam(':instrumentID', $instrumentID, PDO::PARAM_INT);
		$stmt->bindParam(':numberOfStrings', $numberOfStrings, PDO::PARAM_INT);
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
}


?>