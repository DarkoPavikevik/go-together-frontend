"use client";

import { Avatar, Button, Input, Tag } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Loader2, MapPin, Send } from "lucide-react";
import { format } from "date-fns";

// Mock chat data
const mockChat = {
  id: 1,
  ride: {
    id: 1,
    from: "Skopje",
    to: "Ohrid",
    date: new Date(2023, 6, 15),
    time: "08:00",
  },
  participants: [
    {
      id: 1,
      name: "Aleksandar M.",
      avatar: null,
      isDriver: true,
    },
    {
      id: 2,
      name: "You",
      avatar: null,
      isDriver: false,
    },
  ],
  messages: [
    {
      id: 1,
      senderId: 1,
      text: "Hello! I've accepted your ride request. We'll meet at City Mall parking lot at 7:45 AM.",
      timestamp: new Date(2023, 6, 14, 10, 30),
    },
    {
      id: 2,
      senderId: 2,
      text: "Great, thank you! I'll be there on time. Do you have space for a medium-sized suitcase?",
      timestamp: new Date(2023, 6, 14, 10, 35),
    },
    {
      id: 3,
      senderId: 1,
      text: "Yes, that's fine. I have plenty of space in the trunk.",
      timestamp: new Date(2023, 6, 14, 10, 40),
    },
    {
      id: 4,
      senderId: 2,
      text: "Perfect! See you tomorrow morning then.",
      timestamp: new Date(2023, 6, 14, 10, 42),
    },
    {
      id: 5,
      senderId: 1,
      text: "Looking forward to it! If you have any questions before then, feel free to ask.",
      timestamp: new Date(2023, 6, 14, 10, 45),
    },
  ],
};

export default function ChatPage() {
  const { t } = useTranslation();
  const [chat, setChat] = useState(mockChat);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsLoading(true);

    try {
      // Here you would connect to your Spring Boot backend
      // const response = await fetch(`/api/chats/${params.id}/messages`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ text: newMessage }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Add message to chat
      const newMsg = {
        id: chat.messages.length + 1,
        senderId: 2, // Current user
        text: newMessage,
        timestamp: new Date(),
      };

      setChat((prev) => ({
        ...prev,
        messages: [...prev.messages, newMsg],
      }));

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-4 text-left">
        <Button className="mb-4">
          <Link to="/my-rides">← Back to my rides</Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Ride Details</CardTitle>
              <CardDescription>Chat about your upcoming ride</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 ">
              <div className="rounded-lg bg-muted p-4 bg-[#f1f5f9]">
                <div className="mb-4 grid gap-2 ">
                  <div className="flex items-start gap-2 ">
                    <MapPin />
                    <div>
                      <div className="font-medium text-left">
                        {chat.ride.from}
                      </div>
                      <div className="text-sm text-gray-400">
                        {format(chat.ride.date, "EEE, MMM d")} ·{" "}
                        {chat.ride.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin />
                    <div>
                      <div className="font-medium">{chat.ride.to}</div>
                    </div>
                  </div>
                </div>
                <Button className="w-full">
                  <Link to={`/rides/${chat.ride.id}`}>View Ride Details</Link>
                </Button>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Participants</h3>
                <div className="space-y-2">
                  {chat.participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={participant.avatar || "/placeholder.svg"}
                          alt={participant.name}
                        >
                          {participant.avatar === null &&
                            participant.name.charAt(0)}
                        </Avatar>
                        <span>{participant.name}</span>
                      </div>
                      {participant.isDriver && (
                        <Tag
                          className="w-15"
                          color="blue-inverse"
                          style={{ borderRadius: "999px", textAlign: "center" }}
                        >
                          Driver
                        </Tag>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="flex h-[600px] flex-col border-gray-200">
            <CardHeader className="border-b border-gray-200">
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {chat.messages.map((message) => {
                  const isCurrentUser = message.senderId === 2;
                  const sender = chat.participants.find(
                    (p) => p.id === message.senderId
                  );
                  return (
                    <div
                      key={message.id}
                      className={`flex pt-3 ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className="flex max-w-[80%] gap-2">
                        {!isCurrentUser && (
                          <Avatar
                            src={sender?.avatar || "/placeholder.svg"}
                            alt={sender?.name}
                            size={"large"}
                          >
                            {sender?.avatar === null && sender?.name.charAt(0)}
                          </Avatar>
                        )}
                        <div>
                          <div
                            className={`rounded-lg p-3 ${
                              isCurrentUser
                                ? "bg-[#646cff] text-white"
                                : "bg-[#f1f5f9]"
                            }`}
                          >
                            {message.text}
                          </div>
                          <div className="mt-1 text-xs text-left text-gray-400">
                            {format(message.timestamp, "HH:mm")}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-200 pt-6">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder={t("chat.message")}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  size="large"
                />
                <Button
                  size="large"
                  htmlType="submit"
                  disabled={isLoading || !newMessage.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      {t("chat.send")}
                    </div>
                  )}
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
