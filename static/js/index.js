// Function to toggle the theme between light and dark
document.querySelector('.theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Apply saved theme on load
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('themeIcon').innerText = '🌙'; // Change icon to moon
    } else {
        document.body.classList.remove('dark-theme');
        document.getElementById('themeIcon').innerText = '🌞'; // Change icon to sun
    }
});

// Function to handle image upload and preview
function previewImage(event) {
    const file = event.target.files[0];
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
            setTimeout(getAIPrediction, 1000); // Simulate delay for AI prediction
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid image file.");
    }
}

// Drag-and-drop image handling
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
            setTimeout(getAIPrediction, 1000); // Simulate delay for AI prediction
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid image file.");
    }
}

// Drag-over and drag-leave events for better UX
function handleDragOver(event) {
    event.preventDefault();
    document.getElementById('imagePreview').style.background = '#f0f0f0';
}

function handleDragLeave(event) {
    document.getElementById('imagePreview').style.background = '';
}

document.getElementById('imagePreview').addEventListener('dragover', handleDragOver);
document.getElementById('imagePreview').addEventListener('dragleave', handleDragLeave);

// Mock AI prediction logic
function getAIPrediction() {
    const predictions = ['Healthy', 'Moderate', 'Diseased'];
    const prediction = predictions[Math.floor(Math.random() * predictions.length)];
    const aiPredictionBox = document.getElementById('aiPredictionBox');
    aiPredictionBox.innerHTML = `AI predicts: <strong>${prediction}</strong>`;
    updateChartData(prediction);
    displayRecommendations(prediction); // Display product and medicine recommendations
}

// Update chart data based on AI prediction
function updateChartData(prediction) {
    let moisture, nutrients, disease;
    if (prediction === 'Healthy') {
        moisture = 90;
        nutrients = 85;
        disease = 5;
    } else if (prediction === 'Moderate') {
        moisture = 75;
        nutrients = 70;
        disease = 25;
    } else {
        moisture = 50;
        nutrients = 40;
        disease = 60;
    }
    generateMockData(moisture, nutrients, disease);
}

// Generate mock data for charts
function generateMockData(moisture, nutrients, disease) {
    const barChartData = {
        labels: ['Moisture', 'Nutrients', 'Disease'],
        datasets: [{
            label: 'Health Parameters',
            data: [moisture, nutrients, disease],
            backgroundColor: ['#81c784', '#66bb6a', '#ff7043'],
            borderColor: ['#388e3c', '#388e3c', '#d32f2f'],
            borderWidth: 1
        }]
    };

    const lineChartData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        datasets: [{
            label: 'Moisture',
            data: [moisture, moisture - 5, moisture - 2, moisture + 2, moisture],
            fill: false,
            borderColor: '#388e3c',
            tension: 0.1
        }]
    };

    const radarChartData = {
        labels: ['Moisture', 'Nutrients', 'Disease'],
        datasets: [{
            label: 'Health Overview',
            data: [moisture, nutrients, disease],
            backgroundColor: 'rgba(129, 199, 132, 0.2)',
            borderColor: '#388e3c',
            borderWidth: 1
        }]
    };

    renderCharts(barChartData, lineChartData, radarChartData);
}

// Render charts
function renderCharts(barChartData, lineChartData, radarChartData) {
    const barChartCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barChartCtx, { type: 'bar', data: barChartData });

    const lineChartCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineChartCtx, { type: 'line', data: lineChartData });

    const radarChartCtx = document.getElementById('radarChart').getContext('2d');
    new Chart(radarChartCtx, { type: 'radar', data: radarChartData });
}

// Display product and medicine recommendations
function displayRecommendations(prediction) {
    const recommendationsBox = document.getElementById('recommendationsBox');
    let recommendedProducts, recommendedMedicines;

    if (prediction === 'Healthy') {
        recommendedProducts = 'Organic Fertilizer, Plant Growth Supplement';
        recommendedMedicines = 'None';
    } else if (prediction === 'Moderate') {
        recommendedProducts = 'Balanced Fertilizer, Organic Pesticide';
        recommendedMedicines = 'Anti-Fungal Medicine: 50ml';
    } else {
        recommendedProducts = 'High-nitrogen Fertilizer, Pesticide Spray';
        recommendedMedicines = 'Anti-Fungal Medicine: 100ml, Anti-Bacterial Medicine: 50ml';
    }

    recommendationsBox.innerHTML = `
        <h3>Recommendations:</h3>
        <p><strong>Products:</strong> ${recommendedProducts}</p>
        <p><strong>Medicines:</strong> ${recommendedMedicines}</p>
    `;
}

// Image upload progress bar
function uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const progressBar = document.getElementById('uploadProgressBar');
        const reader = new FileReader();

        reader.onprogress = function(e) {
            if (e.lengthComputable) {
                const percent = (e.loaded / e.total) * 100;
                progressBar.value = percent;
            }
        };

        reader.onloadend = function() {
            setTimeout(getAIPrediction, 1000); // Simulate delay for AI prediction
        };

        reader.readAsDataURL(file);
    }
}

// Handle theme switching on page load
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
});
