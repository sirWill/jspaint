
var Paint = function(){
  
  var element = window.paint;
  var ctx = element.getContext('2d');
  element.width = 800;
  element.height = 600;
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fillRect(0,0,element.width, element.height);
  var line = false;

  var colors = ['#03A9F4', '#F44336', '#CDDC39', '#9C27B0'];

  this.init = function init(){
    
    initToolbar();

    //рисуем линии
    element.addEventListener('click', function(e){
      e.preventDefault();
      var x = e.offsetX;
      var y = e.offsetY;
      if(line){
        ctx.lineTo(x,y);
        ctx.stroke();
      }else{
        ctx.beginPath();
        ctx.moveTo(x,y);
      }
      line = !line;
      ctx.fillRect(x-1,y-1,2,2);
    });

  };/* init */


  function initToolbar(){
    
  }

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
