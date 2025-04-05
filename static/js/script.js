// Function to toggle the theme between light and dark
document.querySelector('.theme-toggle').addEventListener('click', function() {
    // Toggle the 'dark-theme' class on the body element
    document.body.classList.toggle('dark-theme');
    
    // Save the theme preference to localStorage so it persists across sessions
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Check if there's a theme preference saved in localStorage and apply it
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
});

// Function to handle image upload and preview
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function() {
        const previewContainer = document.getElementById('imagePreview');
        const imgElement = document.createElement('img');
        imgElement.src = reader.result;
        imgElement.style.width = '100%';
        imgElement.style.borderRadius = '10px';
        previewContainer.innerHTML = '';
        previewContainer.appendChild(imgElement);
    };
    
    if (file) {
        reader.readAsDataURL(file);
    }
}

// Function to handle drag-and-drop for file upload
function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function() {
            const previewContainer = document.getElementById('imagePreview');
            const imgElement = document.createElement('img');
            imgElement.src = reader.result;
            imgElement.style.width = '100%';
            imgElement.style.borderRadius = '10px';
            previewContainer.innerHTML = '';
            previewContainer.appendChild(imgElement);
        };
        
        reader.readAsDataURL(file);
    }
}

// Add drag-over and drag-leave event listeners for better UX
function handleDragOver(event) {
    event.preventDefault();
    document.getElementById('imagePreview').style.background = '#f0f0f0';
}

function handleDragLeave(event) {
    document.getElementById('imagePreview').style.background = '';
}

document.getElementById('imagePreview').addEventListener('dragover', handleDragOver);
document.getElementById('imagePreview').addEventListener('dragleave', handleDragLeave);

// Mocked AI prediction logic
function getAIPrediction() {
    const predictions = ['Healthy', 'Moderate', 'Diseased'];
    const prediction = predictions[Math.floor(Math.random() * predictions.length)];
    const aiPredictionBox = document.getElementById('aiPredictionBox');
    aiPredictionBox.innerHTML = `AI predicts: <strong>${prediction}</strong>`;
}

// Generate Mock Data for Charts
function generateMockData() {
    const barChartData = {
        labels: ['Moisture', 'Nutrients', 'Disease'],
        datasets: [{
            label: 'Health Parameters',
            data: [80, 70, 30], // Mock data values
            backgroundColor: ['#81c784', '#66bb6a', '#ff7043'],
            borderColor: ['#388e3c', '#388e3c', '#d32f2f'],
            borderWidth: 1
        }]
    };
    
    const lineChartData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        datasets: [{
            label: 'Moisture',
            data: [80, 75, 78, 82, 80],
            fill: false,
            borderColor: '#388e3c',
            tension: 0.1
        }]
    };
    
    const radarChartData = {
        labels: ['Moisture', 'Nutrients', 'Disease'],
        datasets: [{
            label: 'Health Overview',
            data: [80, 70, 30],
            backgroundColor: 'rgba(129, 199, 132, 0.2)',
            borderColor: '#388e3c',
            borderWidth: 1
        }]
    };
    
    // Render charts
    renderCharts(barChartData, lineChartData, radarChartData);
}

// Function to render charts
function renderCharts(barChartData, lineChartData, radarChartData) {
    const barChartCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barChartCtx, {
        type: 'bar',
        data: barChartData
    });
    
    const lineChartCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineChartCtx, {
        type: 'line',
        data: lineChartData
    });
    
    const radarChartCtx = document.getElementById('radarChart').getContext('2d');
    new Chart(radarChartCtx, {
        type: 'radar',
        data: radarChartData
    });
}

// Initialize the page
window.addEventListener('load', function() {
    // Generate charts on page load
    generateMockData();
    
    // Generate AI prediction after a short delay
    setTimeout(getAIPrediction, 2000);
});

// Function to add a new log entry
function addLogEntry(date, moisture, nutrients, disease) {
    const logTableBody = document.getElementById('logTableBody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = ` 
        <td>${date}</td>
        <td>${moisture}%</td>
        <td>${nutrients}%</td>
        <td>${disease}%</td>
    `;
    
    logTableBody.appendChild(newRow);
}

// Example: Add a log entry (you can automate this with real-time data)
addLogEntry('2025-04-06', 85, 72, 25);
addLogEntry('2025-04-07', 90, 80, 20);

// Handle the submission of new log entries via form
document.getElementById('logForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('logDate').value;
    const moisture = document.getElementById('logMoisture').value;
    const nutrients = document.getElementById('logNutrients').value;
    const disease = document.getElementById('logDisease').value;
    addLogEntry(date, moisture, nutrients, disease);
});

// QR Code generation (you can integrate this with real disease data later)
function generateQRCode(diseaseInfo) {
    const qr = new QRCode(document.getElementById("qrcode"), {
        text: diseaseInfo,
        width: 128,
        height: 128
    });
}

// Example QR generation based on AI prediction
setTimeout(function() {
    generateQRCode("Disease detected: X, Treatment: Y");
}, 3000);
