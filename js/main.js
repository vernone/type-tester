  function drawPointsChanged(e) {
      drawPoints = e.checked;
      renderText(e);
  }
  window.drawPointsChanged = drawPointsChanged;

  function drawMetricsChanged(e) {
    drawMetrics = e.checked;
    renderText(e);
  }
  window.drawMetricsChanged = drawMetricsChanged;

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

  function contourChanged(e) {
    contour = e.checked;
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
        
            $("#sliders div input.inputSlide").each(function(index){
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
var firstIteration = true;
let previewSelector = '';
var fontSize = 20;
var textToRender = "Load your font !";
var drawPoints = true;
var contour = true;
var fill = true;
var drawMetrics = false;
var kerning = true;
var ligatures = true;
var hinting = false;
var previewPath = null;
var fontArray = [{empty:''},{empty:''},{empty:''}];
var options = {
  kerning: kerning, 
  hinting: hinting,
  features: {
      liga: ligatures,
      rlig: ligatures
  }
};
var miseEnPage = document.getElementById('mise-en-page');

var GRUMPIES = {
  'short': {
      'text': "Grumpy wizards make toxic brew for the evil Queen and Jack. A quick movement of the enemy will jeopardize six gunboats. The job of waxing linoleum frequently peeves chintzy kids.",
      'columns': [ // single column
          {
              sizes: [72, 48, 36, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12],
              innerblock: 'div'
          }
      ],
      'tab': '#headlines'
  }
}

function showErrorMessage(message) {
var el = document.getElementById('message');
if (!message || message.trim().length === 0) {
  //   el.style.display = 'none';
} else {
    el.style.display = 'block';
}
el.innerHTML = message;
}

function loadFont(file, previewSelector){
  
  let input = document.getElementById(previewSelector);
  let fileName = file.name

  //direct upload
  if (fileName){
    fileName = fileName.split('.')[0];
  }else if(file.names == null){
  //so it's local upload with name = url because if its was true files = server files
    fileName = JSON.stringify(file);
  }else{
  //php upload (php add some names when saved on server (name with a 's'))
    fileName = file.names.fullName.en;
  }

  if (file instanceof Blob){
    
    var reader = new FileReader();
    var reader2 = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      $("head").prepend('<style>'+
                        '@font-face{'+
                            'font-family: ' +fileName+ ';'+
                            'src: url('+e.target.result+');'+
                          '}'+
                        '</style>');
      }

    setColumnTemplate(GRUMPIES.short, previewSelector, fileName);

    reader2.onload = function(e) {
      try {
          newfont = opentype.parse(e.target.result);
          var id = previewSelector - 1;
          fontArray.splice(id, 1, newfont);
          showErrorMessage('');
          onFontLoaded(newfont, previewSelector);
      } catch (err) {
          showErrorMessage(err.toString());
      }
    };

    reader2.onerror = function(err) {
        showErrorMessage(err.toString());
    };

    reader2.readAsArrayBuffer(file);
    setSlider();

  }else{

    opentype.load(file, function(err, newfont){
      if (err) {
          alert('Font could not be loaded: ' + err);
      } else {

        $("head").prepend('<style>'+
                        '@font-face{'+
                            'font-family: ' + fileName + ';'+
                            'src: url('+file+');'+
                          '}'+
                        '</style>');
      }

        var id = previewSelector - 1;
        fontArray.splice(id, 1, newfont);
        showErrorMessage('');
        onFontLoaded(newfont, previewSelector);
        setColumnTemplate(GRUMPIES.short, previewSelector, fileName);
        setSlider();
    });
  }


}

$('.inputFile').change(function(e){
  previewSelector = this.id;
  loadFont(e.target.files[0], previewSelector);
}); 

window.addEventListener('load', searchingFont);

function searchingFont(){
  const urlParams = new URLSearchParams(window.location.search);
  let folder_id = urlParams.get('id');
  console.log(filesPhp)

  if (window.location.href !== 'http://localhost/type-tester/index.php'){
    if (filesPhp && folder_id){
      console.log(filesPhp)
      filesPhp.forEach(function(item, i) {
        id = '0' + (i + 1);
        loadFont(item, id);
      });
    }else if(folder_id && !(filesPhp)){
      if (window.confirm("il semble y avoir un problème avec le lien que vous avez reçu, soit il est incorrect, soit il n'est plus valide. Merci de réessayer. Vous allez être rediriger vers une page vierge.")) {
        window.open("index.php", "_self");
      }
    }else{ 
      loadFont("font/Joanne-Regular.woff", '01');
      loadFont("font/Joanne-Italic.woff", '02');
    }
  }else{
 
    //starting page
    loadFont("font/Joanne-Regular.woff", '01');
    loadFont("font/Joanne-Italic.woff", '02');

  }
}

function onFontLoaded(font, id) {

  getFontSize();
  let cont_opacity = $('#sliders').find(`[data-order='${id}']`).find('input[type=range]')[0].value;

  let cont = document.getElementById('preview' + id);

  var options = {
    kerning: kerning, 
    hinting: hinting,
    features: {
        liga: ligatures,
        rlig: ligatures
    }
  };

  var sliders_correspondant = $('#sliders').children("div[data-order='"+id+"']")
  var x = 0;
  var y = 200;

  name = font.names.fullName.en;
  $("#sliders div input[data-order=" + id +"]").prev().html(name);
  document.querySelector("[id='" + id + "']").previousElementSibling.querySelector(".infos-name").innerHTML = name;
  textToRender = document.getElementById('textField').value;

  window.font = font;
                   
  let path = font.getPath(textToRender, 20, fontSize, fontSize, options);


  contour = sliders_correspondant.find('.contour_CB')[0].checked;
  drawPoints = sliders_correspondant.find('.points_CB')[0].checked;

  if (drawPoints) {
    var compose = []

    for( z of path.commands) {	
      if (z.x !== undefined) {
        compose += dPoint(z.x, z.y, 'blue')
      }
      if (z.x1 !== undefined) {
        compose += dPoint(z.x1, z.y1, '#468faf')
      }
      if (z.x2 !== undefined) {
        compose += dPoint(z.x2, z.y2, 'red')
      }  
    }
	}

  if(contour){
    var pathGlyphs = '<path fill="none" stroke="blue" stroke-width="2" d="' + path.toPathData() +'" class="pathPreview" />';
  } else {
    var pathGlyphs = '<path fill="black" d="' + path.toPathData() +'" class="pathPreview" />';
  }
  
  var contWidth = font.getAdvanceWidth(textToRender, fontSize);
  cont.parentElement.setAttribute('style', 'height:' + (fontSize + (fontSize / 2)) + 'px;');
  cont.setAttribute('style',  'width:' + (contWidth + 100) + 'px');

  cont.setAttribute('viewbox', '0 100 ' + contWidth + ' ' + fontSize);
  cont.innerHTML = pathGlyphs + compose;
  cont.style.opacity = cont_opacity + '%';

}

function setColumnTemplate(grumpy, previewSelector, fontfam) {
  var container = document.getElementById('headlines' + previewSelector);
  container.innerHTML = '';
  var textFieldMEP_text = document.getElementById('textField-MEP').value;

  for (var k = 0; k < grumpy.columns.length; k++) {

      var sizes = grumpy.columns[k].sizes;
      for (var i = 0; i < sizes.length; i++) {
          fontsize = sizes[i].toString();
          var sizelabel = $('<p>').addClass('sizelabel').text(fontsize + 'px');


          var textline = $('<p>').addClass('textline')
              .css('font-size', fontsize + 'px')
              .text(textFieldMEP_text)
              .css('margin-top', (fontsize/2))
              .css('margin-bottom', (fontsize/2))
              .attr("spellcheck", "false");
          
          if (fontfam !== 'unchange'){
            textline.css('font-family', fontfam);
          }

      $('<div/>',{'class': 'headlines-child'}).appendTo(container).append(sizelabel).append(textline)
      }
  }
}

function setSlider(){
  
  var miseEnPage_height = $("#headlines02").height();
  var miseEnPage_width = $("#mise-en-page").width();
  var left = parseInt($('.mask_handle').css('left'), 10);
  document.querySelector('.mask_overlay').style.minHeight = miseEnPage_height + 'px';
  if (firstIteration){
    document.getElementById('handle-btn').style.left = ((miseEnPage_width/2) - 40.5) + 'px';
    firstIteration=false;
  }
  if (left != 0){
    document.getElementById('handle-btn').style.minHeight = miseEnPage_height + 'px';

  document.querySelector('.mask_overlay').style.width = ((miseEnPage_width/2) - 40.5) + 'px';
  // document.querySelector('.mask_overlay').style.width = '300px';

      $('#handle-btn').show();
      $('.mask_overlay').css('width',((left + 40.5)+ 'px'));
      $( ".mask_handle" ).click(function(e){
        e.preventDefault();
      });
      $('.mask_handle').draggable({
        addClasses: true,
        cancel: false,
       
        containment: "parent",
        axis: "x",
        drag: function( event, ui ) {
            x_position = $(this).css('left');
            new_x_position = x_position.replace('px', '');
            x_position = parseInt(new_x_position)+40.5;
            $('.mask_overlay').css('width',x_position);
        }
    });
  }else{
    $('#handle-btn').hide();
  }
 
}

function dPoint (x, y, color, event) {
	var svgns = "http://www.w3.org/2000/svg";
	var shape = document.createElementNS(svgns, "circle");
	shape.setAttributeNS(null, "cx", x)
	shape.setAttributeNS(null, "cy", y)
	shape.setAttributeNS(null, "r", 2)
	// shape.setAttributeNS(null, "stroke",  'white')
	shape.setAttributeNS(null, "fill", color)
	return shape.outerHTML
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

var textField = document.getElementById('textField');
// var textFieldMEP = document.getElementById('textField-MEP');


textField.addEventListener('change', function(){
  reloadAllFonts();
})

document.getElementById('textField-MEP').addEventListener('change', function(e){
  reloadAllMiseEnPage()
})

function reloadAllMiseEnPage(){
  var textFieldMEP_text = document.getElementById('textField-MEP').value;
  $('.headlines-child > .textline').text(textFieldMEP_text);
}

function reloadAllFonts(){
  var previewSelector2 = '';

  fontArray.forEach(function (item, i) {
    if (!("empty" in item)){
      previewSelector2 = '0' + (i+1);
      onFontLoaded(item, previewSelector2);
    }
  });
}

function renderText(e) {
  var IDfile = $(e).parent().parent().parent().attr('data-order');
  NumFromID = (parseInt(IDfile,10) -1);
  onFontLoaded(fontArray[NumFromID], IDfile);
}

function getFontSize(){
  let websiteHeight = $("#preview-container").height();
  fontSize = websiteHeight/1.4; 
}

function DisplayChanged(e){
  var IDdisplay = ($(e).prev().attr('data-order'));
  var elem = $('#preview' + IDdisplay);

  if ($(elem).is(':visible')) { 
      $(elem).hide(); 
      e.classList.remove('active');
      e.classList.add('disactive');
  } else { 
      $(elem).show();
      e.classList.remove('disactive');
      e.classList.add('active');
  }
}



