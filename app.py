import streamlit as st

# Simple function to simulate chatbot behavior
def chat():
    st.title("Futuristic Chatbot")
    
    user_input = st.text_input("Ask me anything about plants!")

    if user_input:
        st.write(f"You asked: {user_input}")
        # Add your AI-based chatbot logic here. For now, we simulate a response.
        response = f"I'm an AI! You asked: {user_input}. Here's some information!"
        st.write(response)

# Run the chatbot
if __name__ == "__main__":
    chat()
