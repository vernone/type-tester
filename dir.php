filesPhp = <?php $out = array();
    foreach (glob('uploads/' . $url . '/*') as $filename) {
        $p = pathinfo($filename);
        $out[] = $p['dirname'] . "/" . $p['basename'];
    }
    echo json_encode($out); 
?>;