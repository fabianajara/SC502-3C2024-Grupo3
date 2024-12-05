<?php
require 'dbConection.php'; // Asegúrate de que este archivo contenga la conexión a la base de datos
header('Content-Type: application/json');

try {
    global $pdo;
    // Realiza la consulta para obtener los alojamientos
    $stmt = $pdo->query("SELECT id_alojamiento, nombre, descripcion, precio_noche, alojamiento_imagen FROM homeAwayDB.Alojamiento");
    $alojamientos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($alojamientos); // Devuelve los resultados como JSON
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener los alojamientos php']);
}
?>