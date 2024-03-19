import React, { useState, useEffect, useRef } from "react";

interface Message {
  text: string;
  sender: "me" | "other";
  image?: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Hardik Shrestha",
    avatar: "",
  },
  {
    id: "2",
    name: "Prekshya Dali",
    avatar: "",
  },
  {
    id: "3",
    name: "Sushma Shrestha",
    avatar: "",
  },
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How are you?", sender: "other" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [activeContact, setActiveContact] = useState<Contact | null>(contacts[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        const responses = await Promise.all(
          contacts.map(async (contact) => {
            const response = await fetch("https://source.unsplash.com/random/40x40");
            contact.avatar = response.url;
            return contact;
          }),
        );
        setActiveContact(responses[0]);
      } catch (error) {
        console.error("Error fetching random images:", error);
      }
    };

    fetchRandomImages();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "me" }]);
      setNewMessage("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Hello, how are you?", sender: "other" },
        ]);
      }, 1000);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMessages([
          ...messages,
          { text: "", sender: "me", image: reader.result as string },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-[#8AC185] text-white p-4 rounded-l-lg">
        <h2 className="text-md  mb-4">Doctors</h2>
        <ul>
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className={`flex items-center mb-4 cursor-pointer ${
                activeContact?.id === contact.id ? "bg-[#6ca666] rounded-md p-3" : ""
              }`}
              onClick={() => setActiveContact(contact)}
            >
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm">{contact.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="bg-gray-200 p-4 flex items-center rounded-r-lg">
          {activeContact && (
            <>
              <img
                src={activeContact.avatar}
                alt={activeContact.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-bold">{activeContact.name}</span>
            </>
          )}
        </div>
        <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 ${
                message.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "other" && (
                <div className="mr-2">
                  <img
                    src={activeContact?.avatar || "https://via.placeholder.com/40"}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              <div
                className={`py-2 px-4 rounded-lg ${
                  message.sender === "me"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 flex items-center">
          <button
            onClick={handleFileUpload}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg mr-2"
          >
            Attach File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow mr-2 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ebfaea]"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#8AC185] hover:bg-[#65a75f] text-white py-2 px-4 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
