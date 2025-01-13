// Load CSV data and initialize metrics and charts
fetch('data/ev_population.csv')
   .then(response => response.text())
   .then(data => {
       const parsedData = parseCSV(data);
       updateMetrics(parsedData);
       createPieChart(parsedData); // Create pie chart on home section load
       createBarChart(parsedData); // Create bar chart on home section load
       populateStatistics(parsedData);
       populateFilters(parsedData); // Populate filter options

       // Initially show the home section
       showSection('home');
   });

function parseCSV(data) {
   const rows = data.split('\n').slice(1);
   
   // Dummy Data for demonstration
   const dummyData = [
       { VIN:'KM8K33AGXL', County:'King', Make:'HYUNDAI', ModelYear:'2020' },
       { VIN:'1C4RJYB61N', County:'Snohomish', Make:'JEEP', ModelYear:'2022' },
       { VIN:'5NPD84LF7JH123456', County:'Snohomish', Make:'HYUNDAI', ModelYear:'2021' },
       { VIN:'5YJ3E1EA7JF000001', County:'King', Make:'TESLA', ModelYear:'2019' },
       { VIN:'WBA8D9C52JNU12345', County:'Snohomish', Make:'BMW', ModelYear:'2020' },
       { VIN:'19XFC2F59GE000001', County:'King', Make:'HONDA', ModelYear:'2019'},
       { VIN:'5YJ3E1EA7HF000002', County:'Snohomish', Make:'TESLA', ModelYear:'2018'},
       { VIN:'JN1CV6EK4EM000001', County:'Snohomish', Make:'NISSAN', ModelYear:'2017'},
       { VIN:'WBA4Z7C58JAV00001', County:'King', Make:'BMW', ModelYear:'2016'},
       { VIN:'19XFC2F59GE000002', County:'Snohomish', Make:'HONDA', ModelYear:'2015'},
       { VIN:'5YJ3E1EA7JF000003', County:'King', Make:'TESLA', ModelYear:'2020'},
       { VIN:'KM8K33AGXL1234567', County:'Snohomish', Make:'HYUNDAI', ModelYear:'2022'},
       { VIN:'5YJ3E1EA7JF000004', County:'King', Make:'TESLA', ModelYear:'2021'},
       { VIN:'WBA8D9C52JNU12346', County:'Snohomish', Make:'BMW', ModelYear:'2023'},
       { VIN:'19XFC2F59GE000003', County:'King', Make:'HONDA', ModelYear:'2019'}
   ];

   return dummyData.map(item => ({
       vin:item.VIN,
       county:item.County,
       make:item.Make,
       modelYear:item.ModelYear
   }));
}

function updateMetrics(data) {
   const totalEVs = data.length;

   // Update total EVs metric
   document.getElementById('total-evs').innerText = totalEVs;

   // Find top make (for simplicity)
   const makeCounts = {};
   data.forEach(item => makeCounts[item.make] = (makeCounts[item.make] || 0) + 1);

   const topMake = Object.keys(makeCounts).reduce((a,b) => makeCounts[a] > makeCounts[b] ? a : b);
   
   // Update top make metric
   document.getElementById('top-make').innerText = `${topMake} (${makeCounts[topMake]})`;
}

// Show specific section based on button click
function showSection(sectionId) {
   const sections = document.querySelectorAll('.content-section');
   sections.forEach(section => section.classList.remove('active'));
   
   document.getElementById(sectionId).classList.add('active');
}

// Populate statistics table with dummy data
function populateStatistics(data) {
   const tableBody = document.getElementById('statistics-body');
   
   data.forEach(item => {
       const row = document.createElement('tr');
       row.innerHTML = `<td>${item.vin}</td><td>${item.county}</td><td>${item.make}</td><td>${item.modelYear}</td>`;
       tableBody.appendChild(row);
   });
}

// Populate filters based on unique values in the dataset
function populateFilters(data) {
   const yearFilter = document.getElementById('year-filter');
   const makeFilter = document.getElementById('make-filter');
   const countyFilter = document.getElementById('county-filter');

   const years = [...new Set(data.map(item => item.modelYear))];
   const makes = [...new Set(data.map(item => item.make))];
   const counties = [...new Set(data.map(item => item.county))];

   years.forEach(year => yearFilter.innerHTML += `<option value="${year}">${year}</option>`);
   makes.forEach(make => makeFilter.innerHTML += `<option value="${make}">${make}</option>`);
   counties.forEach(county => countyFilter.innerHTML += `<option value="${county}">${county}</option>`);
}

// Filter table based on selected criteria
function filterTable() {
   const yearValue = document.getElementById('year-filter').value.toLowerCase();
   const makeValue = document.getElementById('make-filter').value.toLowerCase();
   const countyValue = document.getElementById('county-filter').value.toLowerCase();

   const rows = document.querySelectorAll('#statistics-body tr');

   rows.forEach(row => {
      row.style.display = '';
      if ((yearValue && !row.cells[3].innerText.toLowerCase().includes(yearValue)) ||
          (makeValue && !row.cells[2].innerText.toLowerCase().includes(makeValue)) ||
          (countyValue && !row.cells[1].innerText.toLowerCase().includes(countyValue))) {
          row.style.display = 'none';
      }
   });
}
