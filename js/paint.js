
var Paint = function(){
  
  var element = window.paint;
  var ctx = element.getContext('2d');
  element.width = 800;
  element.height = 600;

  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fillRect(0,0,element.width, element.height);
  ctx.fillStyle = '#000';

  var line = false;
  var buffer = null;
  var buf = {x:null,y:null, h:null, w: null};
  var colors = document.querySelectorAll('input[name="color"]');
  var activeColor = 0;

  var startPoint = {x:null, y:null};
  var clean = ctx.getImageData(0,0,element.width,element.height);
  
  function save2Buffer(x0,y0,x1,y1){
    if(x0>x1){
      x0 = x0 + x1; x1 = x0 - x1; x0 = x0 - x1;
    }
    if(y0>y1){
      y0 = y0 + y1; y1 = y0 - y1; y0 = y0 - y1;
    }
    x0-=5; y0-=5;
    x1+=5; y1+=5;
    buf.x = x0; buf.y = y0;
    buf.w = x1-x0; buf.h = y1-y0;
    buffer = ctx.getImageData(buf.x,buf.y,buf.w,buf.h);
  } /* save2Buffer */

  function restoreBuffer(){
    ctx.putImageData(buffer,buf.x,buf.y);
    buffer = null;
  } /* restoreBuffer */

  this.init = function init(){
    initToolbar();
    setActiveColor(0);

    //рисуем линии
    element.addEventListener('click', function(e){
      e.preventDefault();
      var x = e.offsetX;
      var y = e.offsetY;
      if(line){
        ctx.lineTo(x,y);
        ctx.stroke();
        buffer = null;
      }else{
        startPoint.x = x;
        startPoint.y = y;
        ctx.beginPath();
        ctx.moveTo(x,y);
      }
      line = !line;
      // ctx.fillRect(x-1,y-1,2,2);
    });

    element.addEventListener('dblclick', function(e){
      ctx.putImageData(clean,0,0);
    });
    
    element.addEventListener('mousemove', function(e){
      e.preventDefault();
      if(!line) return;
      if(buffer){
        restoreBuffer();
      }
      save2Buffer(startPoint.x, startPoint.y, e.offsetX, e.offsetY);

      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(startPoint.x,startPoint.y);
    });


  };/* init */

  setActiveColor = function(_index){
    ctx.strokeStyle = "#"+colors[_index].value;
  }

  function initToolbar(){

    function colorSelect(e){
      setActiveColor(parseInt(e.target.nextElementSibling.attributes.id.value.slice(-1)));
      e.preventDefault();
    }

    var colors = document.querySelectorAll('input[name="color"]');
    for(var i=0; i<colors.length; i++){
      colors[i].addEventListener('change', colorSelect);
    }
  } /* initToolbar */

}

function fn() {
  var paint = new Paint();
  paint.init();

}

(function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})(fn)
