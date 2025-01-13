function createPieChart(data) {
   const ctx = document.getElementById('pie-chart').getContext('2d');

   const labels = [...new Set(data.map(item => item.make))]; // Unique vehicle makes
   const counts = labels.map(label => data.filter(item => item.make === label).length); // Count occurrences

   new Chart(ctx, {
      type: 'pie',
      data: {
         labels,
         datasets: [{
            label: 'EV Count by Make',
            data: counts,
            backgroundColor: [
               'rgba(255,99,132,0.6)',
               'rgba(54,162,235,0.6)',
               'rgba(255,206,86,0.6)',
               'rgba(75,192,192,0.6)',
               'rgba(153,102,255,0.6)',
               'rgba(255,159,64,0.6)'
            ],
            borderColor: [
               'rgba(255,99,132,1)',
               'rgba(54,162,235,1)',
               'rgba(255,206,86,1)',
               'rgba(75,192,192,1)',
               'rgba(153,102,255,1)',
               'rgba(255,159,64,1)'
            ],
            borderWidth: 1
         }]
      },
      options: {
         responsive: true,
         plugins: {
             legend: {
                 position: 'top',
             },
             title: {
                 display: true,
                 text: 'Electric Vehicles Count by Make'
             }
         }
      }
   });
}

function createBarChart(data) {
   const ctx = document.getElementById('bar-chart').getContext('2d');
   
   const labels = [...new Set(data.map(item => item.make))]; // Unique vehicle makes
   const counts = labels.map(label => data.filter(item => item.make === label).length); // Count occurrences

   new Chart(ctx, {
      type: 'bar',
      data:{
         labels,
         datasets:[{
            label:"EV Count by Make",
            data:counts,
            backgroundColor:"rgba(75,192,192,0.6)",
            borderColor:"rgba(75,192,192,1)",
            borderWidth:"1"
         }]
      },
      options:{
         scales:{
             y:{
                 beginAtZero:true,
                 title:{
                     display:true,
                     text:"Number of EVs"
                 }
             },
             x:{
                 title:{
                     display:true,
                     text:"Vehicle Make"
                 }
             }
         }
      }
   });
}
