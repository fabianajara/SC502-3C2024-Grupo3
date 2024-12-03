<?php
// archivo alojamientos.php

require 'dbConection.php';  // Incluye la conexión a la base de datos

header('Content-Type: application/json');

// Función para obtener todos los alojamientos desde la base de datos
function obtenerTodosLosAlojamientos() {
    global $pdo;
    try {
        // Consulta SQL para obtener todos los alojamientos
        $sql = "SELECT * FROM Propiedad";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();  // Ejecutar la consulta
        return $stmt->fetchAll(PDO::FETCH_ASSOC);  // Retorna los resultados en formato array asociativo
    } catch (Exception $e) {
        logError("Error al obtener alojamientos: " . $e->getMessage());
        return [];  // En caso de error, retornar un array vacío
    }
}

// Obtener todos los alojamientos
$alojamientos = obtenerTodosLosAlojamientos();

// Retornar los alojamientos en formato JSON
echo json_encode($alojamientos);
?>