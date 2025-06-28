import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PersonLeft from "../Components/PersonLeft";
import PersonRight from "../Components/PersonRight";

function Card1Learn() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [voices, setVoices] = useState([]);
  const navigate = useNavigate();

  const leftMessages = [
    "Hey, I was reading about the Indian Constitution, and I came across Article 14. Do you know what it's about?",
    "Does it apply to everyone, or just Indian citizens?",
    "Got it. So, what's the difference between equality before law and equal protection of the laws?",
  ];

  const rightMessages = [
    "Yeah! Article 14 guarantees equality before the law and equal protection of the laws. It's one of the most important fundamental rights.",
    "It applies to everyone—citizens and even non-citizens who are in India.",
    "Nice question! Let's read it on the page ahead!",
  ];

  // Fetch available voices
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Function to determine the appropriate voice
  const getVoice = (isFemale) => {
    if (voices.length === 0) return null;

    // Try to get an Indian English voice
    let filteredVoices = voices.filter((v) =>
      v.lang.includes("en-IN") || v.lang.includes("en")
    );

    // Filter based on gender-like attributes
    const femaleVoice = filteredVoices.find((v) => v.name.includes("Female"));
    const maleVoice = filteredVoices.find((v) => v.name.includes("Male"));

    return isFemale ? femaleVoice || filteredVoices[0] : maleVoice || filteredVoices[0];
  };

  // Function to make the character speak
  const speakMessage = (message, isFemale) => {
    if (!message) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const speech = new SpeechSynthesisUtterance(message);
    speech.voice = getVoice(isFemale);
    speech.lang = "en-IN"; // Indian English accent
    speech.rate = 1; // Normal speed
    speech.pitch = isFemale ? 1.2 : 1; // Slightly higher pitch for female voice
    window.speechSynthesis.speak(speech);
  };

  // Speak the first message when the component loads
  useEffect(() => {
    const firstMessage = leftMessages[0];
    speakMessage(firstMessage, true); // First message is from the left (girl)
  }, [voices]); // Re-run when voices are loaded

  const handleClick = () => {
    setMessageIndex((prevIndex) => {
      const newIndex = prevIndex + 1;

      // If all messages are read, navigate to the next page
      if (newIndex >= leftMessages.length * 2) {
        navigate("/newpage");
        return prevIndex;
      }

      // Determine message and speaker gender
      const isFemale = newIndex % 2 === 0;
      const nextMessage = isFemale
        ? leftMessages[Math.floor(newIndex / 2)]
        : rightMessages[Math.floor(newIndex / 2)];

      // Speak the new message with the correct voice
      speakMessage(nextMessage, isFemale);

      return newIndex;
    });
  };

  return (
    <div className="App">
      {messageIndex % 2 === 0 ? (
        <PersonLeft
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          message={leftMessages[Math.floor(messageIndex / 2)]}
        />
      ) : (
        <PersonRight
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          message={rightMessages[Math.floor(messageIndex / 2)]}
        />
      )}
    </div>
  );
}

export default Card1Learn;