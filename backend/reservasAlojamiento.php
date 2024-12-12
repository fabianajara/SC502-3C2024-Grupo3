<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

require 'dbConection.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['alojamiento_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID de alojamiento no proporcionado']);
        exit;
    }

    $alojamientoId = $data['alojamiento_id'];
    global $pdo;

    $stmt = $pdo->prepare("INSERT INTO homeAwayDB.Reserva (id_alojamiento, fecha_reserva) VALUES (:id_alojamiento, NOW())");
    $stmt->bindParam(':id_alojamiento', $alojamientoId, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Reserva realizada con éxito']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al realizar la reserva']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Excepción del servidor: ' . $e->getMessage()]);
}
?>
