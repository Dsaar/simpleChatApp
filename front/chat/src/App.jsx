import { Box, Button, Container, TextField, Paper, Typography } from "@mui/material";
import { io } from "socket.io-client"
import { useState } from "react";
import { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useRef } from "react";


const socket = io("http://localhost:8181")

function App() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [userName, setUserName] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    socket.on("message received", (data) => setMessages(data));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message) return

    const msgObj = {
      content: message,
      sender: userName || "Anonymus",
      time: new Date().toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    socket.emit("message sent", msgObj)

    setMessage("")
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {/* Chat Window */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 3,
          overflow: "hidden"
        }}
      >
        {/* Messages area (empty for now) */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            bgcolor: "#f9f9f9",
            overflowY: "auto"
          }}
        >
          {/* Messages will go here later */}


          {messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
              sender={msg.sender}
              time={msg.time}
              content={msg.content}
              isItMyMessage={msg.sender === userName}
            />
          ))}

          {/*invisible div as anchor */}
          <div ref={bottomRef} />
        </Box>


        {/* Message input row */}
        <Box
          sx={{
            display: "flex",
            p: 1,
            borderTop: "1px solid #ddd",
            bgcolor: "white"
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Type your message..."
            size="small"
            fullWidth
            sx={{ mr: 1 }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ borderRadius: 2 }}
            onClick={sendMessage}
          >
            Send
          </Button>
        </Box>
      </Paper>

      {/* Name field under chat */}
      <TextField
        label="Your Name"
        variant="outlined"
        size="small"
        sx={{ mt: 2, width: "50%" }}
        onChange={(e) => setUserName(e.target.value)}

      />
    </Container>
  );
}

export default App;
