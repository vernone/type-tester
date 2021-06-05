<?php
$newID = md5(uniqid());
$first_iteration = true;
$b = 0;

for($i=0; $i<count($_FILES['file']['name']); $i++){

    if (empty($_FILES['file']['name'][$i]) === true){
        unset($_FILES['file']['name'][$i]);
    } else {
        $b = $b + 1;
    }
}

if ($b != 0){



        for($i=0; $i<count($_FILES['file']['name']); $i++){


                $valid_extensions = array('otf', 'ttf', 'woff');
                $ext = explode('.', basename( $_FILES['file']['name'][$i]));
                $file_actual_ext = strtolower(end($ext));
                $name = preg_replace('/\s+/', '_', $_FILES["file"]["name"][$i]);
                $target_path = "uploads/". $newID ."/". $name;

                    if (in_array($file_actual_ext, $valid_extensions)){

                        if(!is_dir("uploads/". $newID ."/")){
                            mkdir("uploads/". $newID ."/");
                        }

                        if (move_uploaded_file($_FILES['file']['tmp_name'][$i], $target_path)){

                            if ($first_iteration){
                                echo $newID;        
                                $first_iteration = false;
                            }

                        } else {
                            echo "Il y a eu une erreur durant le téléchargement du fichier, merci de réessayer.";
                        }

                    } else {

                        header('HTTP/1.1 500 Internal Server Error');

                        if ($first_iteration){
                            
                                print "Uniquement les fichiers OTF, TTF et WOFF sont possibles.";
                        }
                        
                        $first_iteration = false;
                        
                    }

            

        }

} else {
    header('HTTP/1.1 500 Internal Server Error');
    print "Veuillez télécharger au moins un fichier de font afin de pouvoir obtenir un lien de partage.";

}

?>

