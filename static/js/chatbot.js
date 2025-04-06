// Dark Theme Toggle Function
let isDarkMode = false;

function toggleTheme() {
  const body = document.body;
  isDarkMode = !isDarkMode;
  body.classList.toggle('dark-theme', isDarkMode);
  document.getElementById('themeToggle').textContent = isDarkMode ? '🌞' : '🌙';
}

// Simulate AI Response
function getResponse() {
  const userInput = document.getElementById('userInput').value;
  if (userInput.trim() === '') return;

  // Display user message
  displayMessage(userInput, 'user');
  
  // Clear input field
  document.getElementById('userInput').value = '';
  
  // AI Bot Response
  setTimeout(() => {
    const botMessage = generateBotResponse(userInput);
    displayMessage(botMessage, 'bot');
  }, 1000);
}

// Display messages in the chatbox
function displayMessage(message, sender) {
  const chatBox = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.classList.add(`${sender}-message`);
  div.textContent = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Generate AI response based on user input
function generateBotResponse(input) {
  // Simple response for demonstration
  const responses = {
    'weather': 'It looks sunny today! Perfect for farming!',
    'crops': 'Tomatoes, cucumbers, and wheat are great crops to grow in this season.',
    'irrigation': 'For efficient irrigation, consider drip systems or rainwater harvesting.',
    'fertilizer': 'Organic compost is a great way to enrich your soil naturally.',
    'help': 'I can assist with farming tips, weather updates, and crop management. Ask away!'
  };
  
  return responses[input.toLowerCase()] || "I'm sorry, I didn't understand that. Can you ask about farming tips or weather?";
}

// Speech Recognition
const micButton = document.getElementById('micButton');

function startSpeechRecognition() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = function(event) {
    const spokenText = event.results[0][0].transcript;
    document.getElementById('userInput').value = spokenText;
    getResponse();
  };

  recognition.onerror = function() {
    alert('Speech recognition error occurred. Please try again.');
  };
}
