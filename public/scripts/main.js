

NProgress.start();
NProgress.set(0.6);
NProgress.configure({ trickleSpeed: 200 });

//Increment 
var interval = setInterval(function() { NProgress.inc(); }, 100);
$(document).ready(function(){
    NProgress.done();
    clearInterval(interval);
});
  
 

  