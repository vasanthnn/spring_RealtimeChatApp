# Real-Time WebSocket Chat Application

This is a simple real-time chat application using WebSocket and STOMP (Simple Text Oriented Messaging Protocol). The application allows users to connect, send messages, and receive messages in real-time. It provides a connection/disconnection button and a dynamic send button that appears when a message is typed.

## Features

- **WebSocket Connection**: Connects to the server using WebSocket via SockJS.
- **Real-Time Messaging**: Messages are sent and received in real-time using STOMP.
- **Send Button Visibility**: The Send button only appears when the user types a message.
- **Clear Messages on Disconnect**: When the connection is lost or the user disconnects, the messages are cleared.
- **Alert on Inactive Connection**: Users are alerted to connect before sending a message if they try to send while disconnected.

## Technologies Used

- **Frontend**: 
  - HTML
  - CSS (Bootstrap for styling)
  - JavaScript (jQuery for DOM manipulation)
  - SockJS (WebSocket support)
  - STOMP (Messaging Protocol)

- **Backend**: 
  - Java Spring Boot (STOMP support via WebSocket)

## Getting Started

### Prerequisites

- **Java 11+**: Ensure you have Java 11 or higher installed.
- **Maven**: You can use Maven to build the project.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vasanthnn/spring_RealtimeChatApp.git
