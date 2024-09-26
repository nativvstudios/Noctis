var colors = new Array(
    [19,20,23],
    [25,26,31],
    [30,31,38],
    [33,35,40],
    [55,39,73],
    [37,40,44]);
  
  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0,1,2,3];
  
  //transition speed  
  var gradientSpeed = 0.004;

  $(document).ready(function(){
    $("#dayNightToggle").change(function() {
        //var sheet = document.styleSheets[0];

        if(this.checked) {
          console.log("Day");
          //sheet.insertRule(":root{--navbar-color:var(--dayBtn)");
          document.documentElement.style.setProperty('--navbar-color', 'var(--dayBtn)');
          document.body.style.color = "var(--gray-6)";
          document.documentElement.style.setProperty('--article-color', '--white-2');
          document.documentElement.style.setProperty('--text-color', 'var(--day-text-color)');
          document.documentElement.style.setProperty('--category-color', 'var(--dayBtn)');
          document.documentElement.style.setProperty('--category-bg-color', '#fff');
          document.documentElement.style.setProperty('--site-title-gradient', 'linear-gradient(to right, #25282c 30%, #3f3f3f 100%)');
          document.documentElement.style.setProperty('--social-btn-color', 'var(--night)');




          colors = new Array(
            [244,244,244],
            [232,232,232],
            [225,225,225],
            [215,215,215],
            [215,215,215],
            [225,225,225]);

        }else{
          console.log("Night");
          document.documentElement.style.setProperty('--navbar-color', 'cyan');
          document.body.style.color = "var(--white-2)";
          document.documentElement.style.setProperty('--article-color', '#2c303a');
          document.documentElement.style.setProperty('--text-color', 'var(--night-text-color)');
          document.documentElement.style.setProperty('--category-color', 'var(--white-2)');
          document.documentElement.style.setProperty('--category-bg-color', 'var(--gray-4)');
          document.documentElement.style.setProperty('--site-title-gradient', 'linear-gradient(to right, #eeeeee 30%, #a9abb3 100%)');
          document.documentElement.style.setProperty('--social-btn-color', 'var(--day)');

          colors = new Array(
            [19,20,23],
            [25,26,31],
            [30,31,38],
            [33,35,40],
            [55,39,73],
            [37,40,44]);
        }
    });
});
  function updateGradient()
  {
    
    if ( $===undefined ) return;
    
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
  
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";
  
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";
  
   $('#gradient').css({
     background: "-webkit-gradient(linear, left bottom, right bottom, from("+color1+"), to("+color2+"))"}).css({
      background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
      $('html').css({
        background: "-webkit-gradient(linear, left bottom, right bottom, from("+color1+"), to("+color2+"))"}).css({
         background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

      $('a.PageNotFoundButton').css({
        background: "-webkit-gradient(linear, left bottom, right bottom, from("+color1+"), to("+color2+"))"}).css({
         background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

         $('.circle').css({
          background: "-webkit-gradient(linear, left bottom, right bottom, from("+color1+"), to("+color2+"))"}).css({
           background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});


    step += gradientSpeed;
    if ( step >= 1 )
    {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      
      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      
    }
  }
  
  setInterval(updateGradient,20);

  
