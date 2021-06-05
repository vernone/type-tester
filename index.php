  <!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>type-tester</title>

    <meta name="author" content="Simon Bouvier">
    <meta property="og:title" content="type-tester" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="" />
    <meta property="og:description" content="Type-tester est une site web permettant à chacun.e de mettre en scène et comparer différentes versions d'une typographie." />
  
    <link rel="stylesheet" type="text/css" href="css/main.scss" />
    <link rel="stylesheet" type="text/css" href="css/button.css" />
    <link rel="stylesheet" type="text/css" href="css/normalize.css" />


    <script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/opentype.js@latest/dist/opentype.min.js"></script>
    <script src="https://unpkg.com/split.js/dist/split.min.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  </head>
  <body>

    <div id="container">
    
      <div  id="container-loader"  class="container-vertical" >
        <div class="container-vertical">
          <div id="global-inputfile-wrapper">
            <div class="informations">
                <span> TYPE TESTER </span>
                <span>Voir sur <a href="https://github.com/vernone/type-tester">Github</a></span>
            </div>

            <form enctype="multipart/form-data" action="upload.php" method="post">
              <div class="inputfile-wrapper">
                <div class="inputfile-infos">
                  <span class="infos-number">01</span>
                  <span class="infos-name">&nbsp;</span>
                </div>
                <input id="01" class="inputFile" name="file[]" type="file" />
                <div class="inputfile-params" data-order="01">
                  <span>Afficher avec&#8239;:</span>
                  <div>
                    <label><input type="checkbox" onchange="drawMetricsChanged(this)">métriques</label>
                    <label><input type="checkbox" onchange="kerningChanged(this)" checked="checked">kerning</label>
                    <label><input type="checkbox" onchange="ligaturesChanged(this)" checked="checked">ligatures</label>
                  </div>
                </div>
              </div>
              <div class="inputfile-wrapper">
                <div class="inputfile-infos">
                  <span class="infos-number">02</span>
                  <span class="infos-name">&nbsp;</span>
                </div>
                <input id="02" class="inputFile" name="file[]" type="file" />
                <div class="inputfile-params" data-order="02">
                  <span>Afficher avec&#8239;:</span>
                  <div>
                    <label><input type="checkbox" onchange="drawMetricsChanged(this)">métriques</label>
                    <label><input type="checkbox" onchange="kerningChanged(this)" checked="checked">kerning</label>
                    <label><input type="checkbox" onchange="ligaturesChanged(this)" checked="checked">ligatures</label>
                  </div>
                </div>
              </div>
              <div class="addMore-share button_CB">
                <!-- <button class="add_more">Ajouter un autre fichier</button> -->
                <input type="button" class="button" id="upload" value="Générez le lien à partager" />
                <input type="text" id="link-tocopy" value="Hello world!">
              </div>
            </form>
          </div>
         
        </div>
        <div class="informations container-vertical">
          <span id="message"></span>
          <div>
            <span>Typographie&nbsp;: Joanne par <a href="https://www.instagram.com/charlyderouault/">Charly Derouault</a>.</span><br>
            <span>Site rendu possible grâce à la bibliothèque <a href="https://opentype.js.org/">opentype.js.</a></span>
          </div>
        </div>

      </div>   

      <div id="container-display">
        <!-- <span class="header">
            <span>Dessin</span>
        </span> -->


        <div id="preview-container" class="container-horizontal">  
          <div id="preview-options">

            <div>
            <input type="text" class="text-input" value="Load your font !" id="textField"></input>
            </div>

                        
            <div id="slide-timeline"> 
              <label for="slide-timeline"> Timeline</label>
              <input type="range" class="inputSlide"  name="slide-timeline" min="0" max="100" value="0" step="1" data-order='00'>
            </div> 

            <div id="sliders" >
              <div data-order='01'> 
                <label for="opacity01"> Typographie n°1</label>
                <input type="range" class="inputSlide" id="opacity01" name="opacity-slider" min="0" max="100" value="100" step="1" data-order='01'>

                <span class="material-icons active" onclick="DisplayChanged(this)">visibility</span>
                <div class="button_CB">
                  <label>
                      <input class="contour_CB options_Sliders" type="checkbox" onchange="contourChanged(this)"><span>contour</span>
                  </label>
                </div>
                <div class="button_CB">
                  <label>
                      <input class="points_CB options_Sliders" type="checkbox" onchange="drawPointsChanged(this)" ><span>points</span>
                  </label>
                </div>
                
              </div>
              <div data-order='02'> 
                <label for="opacity02"> Typographie n°2</label>
                <input type="range" class="inputSlide" id="opacity02" name="opacity-slide" min="0" max="100" value="100" step="1" data-order='02'>
                <span class="material-icons active" onclick="DisplayChanged(this)">visibility</span>
                <div class="button_CB">
                  <label>
                      <input input class="contour_CB options_Sliders" type="checkbox" onchange="contourChanged(this)" checked="checked"><span>contour</span>
                  </label>
                </div>
                <div class="button_CB">
                  <label>
                      <input class="points_CB options_Sliders" type="checkbox" onchange="drawPointsChanged(this)" ><span>points</span>
                  </label>
                </div>
              </div>
            </div> 

          </div>
          <div class="svg-container" >
            <svg id="preview01" style="display: none;" width='100%' height='100%' >
            </svg>
            <svg id="preview02" width='100%' height='100%' style="display:none">
            </svg>
          </div>

        </div>  

        <!-- <span class="header" style="margin-top:20px">
            <span>Mise en page</span>
        </span> -->
        <div id="mise-en-page" class="container-vertical">
          <div class="mask">
              <div id="headlines02">
              </div>
              
              <div class="mask_overlay">
                <div id="headlines01">
                </div>
              </div>
              
              <button id="handle-btn" class="mask_handle " style="display:none;"><span class="icon-angle-left"></span>&nbsp;<span class="icon-angle-right"></span></button>
              </div>
            </div>
        </div>
      </div>

    </div>
  </body>
<script type="text/javascript" src="js/jquery-ui.js"></script>

  <script>

    Split(['#preview-container', '#mise-en-page'], {
      sizes: [35, 63],
        direction:'vertical',
        gutterSize:4,
        minSize: 0,
        onDragEnd: function (sizes) {
          getFontSize();
          reloadAllFonts();
        },
    })

    $(function() {

      var timer_id;
      $(window).resize(function() {

          clearTimeout(timer_id);

          timer_id = setTimeout(function() {

            getFontSize();
            reloadAllFonts();
            
          }, 300);
      });

    });

    var filesPhp = '';

    $('body').on('click', '#upload', function(e){
        e.preventDefault();
        var formData = new FormData($(this).parents('form')[0]);

        $.ajax({
            url: 'upload.php',
            type: 'POST',
            xhr: function() {
                var myXhr = $.ajaxSettings.xhr();
                return myXhr;
            },
            success: function( data ) {
              // window.history.pushState("object or string", "Title", "index.php?id=" + data);
              document.getElementById('link-tocopy').style.display = 'block';
              document.getElementById('link-tocopy').value = "http://simon-bouvier.xyz/type-viewer/index.php?id=" + data;
            },
            error: function(xhr, status, error) {
              alert(xhr.responseText);
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        });

        return false;
    });

    document.getElementById("link-tocopy").onclick = function() {
      this.select();
    }
    
  </script>

<script type='text/javascript'>

<?php
  $out = array();
  $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
 

  if ($url !== 'http://localhost/type-viewer/index.php' ){

    $url_components = parse_url($url);
    parse_str($url_components['query'], $params);

    if(array_key_exists('id', $params)){

   
      $dir_path = 'uploads/' . $params['id'] . "/";
  
      if ( file_exists( $dir_path ) && is_dir( $dir_path ) ){
        foreach (glob($dir_path . '*') as $filename) {
          $p = pathinfo($filename);
          $out[] = $p['dirname'] . "/" . $p['basename'];
        }
        
        $filesPhp = json_encode($out);
        echo "var filesPhp = ". $filesPhp . ";\n";
      } 
   
    }
   
  }
 
?>

</script>

<!-- <script src="bundle.js" charset="utf-8"></script> -->
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/scroll-horizontal.js"></script>

</html>
