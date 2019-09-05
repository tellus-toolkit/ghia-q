<?php
function connectsql() {
    $con = mysqli_connect("localhost", "ghia", "!_gh1a_5urv3y#", "ghia_survey", 3306);
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    return $con;
}

function get_records() {
    $con = connectsql();
    $records = mysqli_query($con, "SELECT * FROM sortable order by display_order ASC");
    $all = array();
    while ($data = $records->fetch_assoc()) {
        $all[] = $data;
    }
    return $all;
}

function save_record($id, $order) {
    $con = connectsql();
    $query = "UPDATE sortable SET display_order=" . $order . " WHERE id=" . $id;
    if ($con->query($query) === TRUE) {
        echo "Record updated successfully";
    } else {
        echo "Error updating record: " . $conn->error;
    }
}

?>