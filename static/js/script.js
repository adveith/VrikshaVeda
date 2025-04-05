// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Drag & drop upload
const uploadZone = document.getElementById("uploadZone");
uploadZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadZone.classList.add("drag-over");
});
uploadZone.addEventListener("dragleave", () => {
  uploadZone.classList.remove("drag-over");
});
uploadZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  handleFileUpload(file);
});
document.getElementById("fileInput").addEventListener("change", (e) => {
  handleFileUpload(e.target.files[0]);
});

// Handle file upload (simulated)
function handleFileUpload(file) {
  // TODO: Send to Flask/AI backend
  alert(`Uploaded: ${file.name}`);
  updateCharts(); // Simulate update
}

// Bar & Doughnut Chart using Chart.js
const barCtx = document.getElementById("barChart").getContext("2d");
const doughnutCtx = document.getElementById("doughnutChart").getContext("2d");

let barChart = new Chart(barCtx, {
  type: "bar",
  data: {
    labels: ["Moisture", "Chlorophyll", "Spots", "Disease Risk"],
    datasets: [{
      label: "Leaf Health Parameters",
      backgroundColor: "#66bb6a",
      data: [0, 0, 0, 0]
    }]
  }
});

let doughnutChart = new Chart(doughnutCtx, {
  type: "doughnut",
  data: {
    labels: ["Healthy", "Moderate", "Infected"],
    datasets: [{
      backgroundColor: ["#81c784", "#ffee58", "#e57373"],
      data: [100, 0, 0]
    }]
  }
});

// Fake data updater
function updateCharts() {
  barChart.data.datasets[0].data = [70, 80, 30, 60]; // Simulated data update
  barChart.update();

  doughnutChart.data.datasets[0].data = [50, 30, 20]; // Simulated data update
  doughnutChart.update();
}

// 3D Viewer using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, uploadZone.offsetWidth / 300, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(uploadZone.offsetWidth, 300);
document.getElementById("leaf3d").appendChild(renderer.domElement);

// Leaf geometry and material (3D model placeholder)
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x44aa88, wireframe: false });
const leaf = new THREE.Mesh(geometry, material);
scene.add(leaf);

// Lighting setup
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Camera setup
camera.position.z = 3;

// Animation loop to rotate the 3D model
function animate() {
  requestAnimationFrame(animate);
  leaf.rotation.y += 0.01; // Rotation speed
  renderer.render(scene, camera);
}
animate();

// Optional: Update function for leaf model if 3D model file is uploaded (simulation)
function updateLeafModel(file) {
  // Implement model loading here with Three.js if needed.
  alert("Model updated with the uploaded file.");
}

// Optional: Integrating Flask/AI backend for file processing (using Fetch API or XMLHttpRequest)
// function sendFileToBackend(file) {
//   let formData = new FormData();
//   formData.append("file", file);
//   fetch("/upload", {
//     method: "POST",
//     body: formData
//   }).then(response => response.json())
//     .then(data => console.log("Server Response:", data));
// }

