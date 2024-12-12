<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require 'dbConection.php';
header('Content-Type: application/json');

try {
    global $pdo;

    if (!$pdo) {
        die(json_encode(['error' => 'Conexión a la base de datos fallida']));
    }

    $stmt = $pdo->query("SELECT 
        a.id_usuario AS anfitrion_id,
        a.nombre AS alojamiento_nombre, 
        a.descripcion, 
        a.precio_noche, 
        a.alojamiento_imagen, 
        a.ubicacion,
        u.nombre AS anfitrion_nombre,
        u.usuario_imagen AS anfitrion_imagen
    FROM homeAwayDB.Alojamiento a
    LEFT JOIN homeAwayDB.Usuario u
    ON a.id_usuario = u.id_usuario");

    if (!$stmt) {
        die(json_encode(['error' => 'Error en la consulta SQL']));
    }

    $alojamientos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($alojamientos)) {
        echo json_encode(['error' => 'No se encontraron alojamientos']);
    } else {
        echo json_encode($alojamientos, JSON_PRETTY_PRINT);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Excepción del servidor: ' . $e->getMessage()]);
}
?>
