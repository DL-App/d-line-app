$(document).ready(function() {
var A=$('#input1').val();

$("#input1").bind("change paste keyup", function() {
   A=$('#input1').val();
});
var FBS= [A, 135, 167, 158, 145, 150, 125]; 
var PP=[251, 210, 305, 281, 213, 250, 218];
var AVG=[];


for(var i=0; i<= FBS.length; i++) {

AVG[i]=(((PP[i]/FBS[i])/1.8));

}


var ctx = document.getElementById('line').getContext('2d');
var line = new Chart(ctx, {

  type: 'line',
   responsive: true,
  pointDotRadius: 10,
  bezierCurve: false,
  scaleShowVerticalLines: false,
  scaleGridLineColor: 'black',
   options: {


    title: {
            display: true,
            text: 'Sugar Test Data'
        },
        scales: {
            yAxes: [{
                ticks: {
                    max: 500,
                    min: 0,
                    
                }
            }]
        }
    },
  

  data: {
  	fontSize: 25,
    labels: ['Dec 2014 ', 'March 2015', 'Oct 2015', 'Mar 2016', 'April 2016', 'August 2016', 'Jan 2017'],

   
    datasets: [
     {

      label: 'Fasting Blood Sugar',
      data: FBS ,
      fill: false,
    pointBackgroundColor:"#F4F6F7",
         borderWidth: 2,
         pointRadius:2,
        pointHoverRadius:4,
borderColor: "rgba(33, 138, 237, 0.81)",


    }, 


   
	{
      label: 'Post Prodial Sugar',
      data: PP,
    pointBackgroundColor:"#F4F6F7",
      borderWidth: 2,
         pointHoverRadius:4,
        borderColor: "rgba(219, 0, 80, 0.93)",
        pointRadius:2,
fill: false,
    }


  ]
  }
});

var ctx = document.getElementById('dline').getContext('2d');
var dline = new Chart(ctx, {

  type: 'line',
      options: {
      title: {
            display: true,
            text: 'D line index'
        },
        scales: {
            yAxes: [{

                ticks: {
                    max: 3,
                    min: 0,
                    
                    
                }

            }]
        }
    },

  data: {
    fontSize: 25,
    labels: ['Dec 2014 ', 'March 2015', 'Oct 2015', 'Mar 2016', 'April 2016', 'August 2016', 'Jan 2017'],

   
    datasets: [

  {
      label: 'D Line Index',
      data: AVG,
    
      borderWidth: 2,
  pointBackgroundColor:"#F4F6F7",
  borderColor: "rgba(110, 126, 154, 1)",
  pointRadius:2,
   
 backgroundColor:"rgba(110, 126, 154, 0.56)",
    pointHoverRadius:4,


    }
 


  ]
  }
});





});