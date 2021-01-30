
    function drawPointsChanged(e) {
        drawPoints = e.checked;
        renderText(e);
    }

    function drawMetricsChanged(e) {
      drawMetrics = e.checked;
      renderText(e);
    }

    function kerningChanged(e) {
        kerning = e.checked;
        renderText(e);
    }

    function ligaturesChanged(e) {
        ligatures = e.checked;
        renderText(e);
    }

    function hintingChanged(e) {
        hinting = e.checked;
        renderText(e);
    }

  $(".inputSlide").on("input change", function() { 
    var number = this.getAttribute('data-order');
          if(number == '00'){
            if (this.value <= 100){
            
              var calcul01 = (100 - this.value)/100;
              var calcul02 = this.value/100;
              var calcul03 = 0;

              $('#preview01').css('opacity', calcul01);
              $('#preview02').css('opacity', calcul02);
              $('#preview03').css('opacity', '0');
          
              $("#sliders div input").each(function(index){
                var current = eval('calcul0' + (index+1))
                $("#sliders div input[data-order='0" + (index + 1) + "']").val(current*100);
              });

            }else if(this.value > 100){

              var calcul01 = 0;
              var calcul02 = (100-(this.value -100))/100;
              var calcul03 = (this.value-100)/100;

              $('#preview01').css('opacity', '0');
              $('#preview02').css('opacity', calcul02);
              $('#preview03').css('opacity', calcul03);

              $("#sliders div input").each(function(index){
                var current = eval('calcul0' + (index+1))
                $("#sliders div input[data-order='0" + (index + 1) + "']").val(current*100);
              });
            }
          }else{

            $('#preview'+ number).css('opacity', this.value/100)

          }
  });  

  var font = null;
  let previewSelector = '';
  var fontSize = 150;
  var textToRender = "Hello, World!";
  var drawPoints = true;
  var drawMetrics = false;
  var kerning = true;
  var ligatures = true;
  var hinting = false;
  var previewPath = null;

  
  function showErrorMessage(message) {
      var el = document.getElementById('message');
      if (!message || message.trim().length === 0) {
        //   el.style.display = 'none';
      } else {
          el.style.display = 'block';
      }
      el.innerHTML = message;
  }



  function renderText(e) {
    var IDfile = $(e).parent().parent().attr('data-order');
    $('#'+ IDfile).trigger( "change" );
  }

  function DisplayChanged(e){
    var IDdisplay = ($(e).parent().prev().attr('id'));
    var elem = $('#preview' + IDdisplay);

    if ($(elem).is(':visible')) { 
        $(elem).hide(); 
    } else { 
        $(elem).show();
    }

  }

  $('.inputFile').change(function(e){
    
    // textToRender = document.getElementById('textField').value;
    textToRender = "Hello, world!"

    var file = e.target.files[0];
    previewSelector = this.id

    $("#sliders div input[data-order=" + previewSelector +"]").prev().html(file.name);
    let input = document.getElementById(previewSelector);
    
    var reader = new FileReader();
    var reader2 = new FileReader();
    reader.readAsDataURL(input.files[0]);


    reader.onload = function (e) {
      $("head").prepend('<style>'+
                        '@font-face{'+
                            'font-family: preview'+ previewSelector + ';'+
                            'src: url('+e.target.result+');'+
                          '}'+
                          '.layout-'+ previewSelector + '{font-family: preview'+ previewSelector + ';}'+
                        '</style>');
      }
    
    reader2.onload = function(e) {
      try {
          font = opentype.parse(e.target.result);
          onFontLoaded(font);
          showErrorMessage('');
      } catch (err) {
          showErrorMessage(err.toString());
      }
    };

    reader2.onerror = function(err) {
        showErrorMessage(err.toString());
    };

    reader2.readAsArrayBuffer(file);


  }); 


  function onFontLoaded(font) {

    window.font = font;
    var options = {
        kerning: kerning, 
        hinting: hinting,
        features: {
            liga: ligatures,
            rlig: ligatures
        }
    };
    var previewCtx = document.getElementById('preview' + previewSelector).getContext('2d');
    
    previewCtx.clearRect(0, 0, 940, 300);

    font.draw(previewCtx, textToRender, 0, 200, fontSize, options);
    if (drawPoints) {
        font.drawPoints(previewCtx, textToRender, 0, 200, fontSize, options);
    }
    if (drawMetrics) {
        font.drawMetrics(previewCtx, textToRender, 0, 200, fontSize, options);
    }

    font.draw(previewCtx, textToRender, 0, 200, fontSize, options)
  }

  function enableHighDPICanvas(canvas) {
    if (typeof canvas === 'string') {
      canvas = document.getElementById(canvas);
    }
    var pixelRatio = window.devicePixelRatio || 1;
    if (pixelRatio === 1) return;
    var oldWidth = canvas.width;
    var oldHeight = canvas.height;
    canvas.width = oldWidth * pixelRatio;
    canvas.height = oldHeight * pixelRatio;
    canvas.style.width = oldWidth + 'px';
    canvas.style.height = oldHeight + 'px';
    canvas.getContext('2d').scale(pixelRatio, pixelRatio);
  }

  //tentative non fructueuse - seulement actif sur le dernier inputfile
  function changeAllText(){

      let arr = [];

      $(".inputFile").each(function(index){
        arr.push($(this));
      });

      $.each(arr, function(key,val){

        if($(val).get(0).files.length > 0){
          $(val).trigger( "change" );
        }

      });
  }