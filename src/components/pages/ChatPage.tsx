"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Avatar, Button, Form, Input, Skeleton, Tag } from "antd";
import { format } from "date-fns";
import { Loader2, MapPin, Send } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../context/AuthContext";
import {
  getRideConversation,
  sendConversation,
} from "../../services/rides/ridesServices";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";

export default function ChatPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { me } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();
  const {
    data: conversationData,
    isLoading: loadingConversation,
    refetch,
  } = useQuery({
    queryKey: ["get-conversation"],
    queryFn: () => getRideConversation(Number(id)),
    enabled: !!id,
  });

  const { mutate: sendConversationMutation, isPending: pendingMessage } =
    useMutation({
      mutationKey: ["send-message"],
      mutationFn: (body: {
        rideId: number;
        senderId?: number;
        message: string;
      }) => sendConversation(body),
      onSuccess: () => {
        refetch();
        form.setFieldValue("message", "");
      },
      onError: () => {
        enqueueSnackbar(t("Error sending message"), { variant: "error" });
      },
    });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationData?.messages]);

  const handleSendMessage = async (data: {
    rideId: number;
    senderId?: number;
    message: string;
  }) => {
    sendConversationMutation({
      ...data,
      senderId: me?.id,
      rideId: Number(id),
    });
  };

  if (loadingConversation) return <Skeleton />;

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
                        {conversationData.ride.fromLocation}
                      </div>
                      <div className="text-sm text-gray-400">
                        {format(conversationData.ride.date, "EEE, MMM d")} ·{" "}
                        {conversationData.ride.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin />
                    <div>
                      <div className="font-medium">
                        {conversationData.ride.toLocation}
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full">
                  <Link to={`/rides/${conversationData.ride.id}`}>
                    View Ride Details
                  </Link>
                </Button>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Participants</h3>
                <div className="space-y-2">
                  {conversationData.participants.map(
                    (participant: {
                      avatar: string;
                      driver: boolean;
                      id: number;
                      name: string;
                    }) => (
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
                        {participant.driver && (
                          <Tag
                            className="w-15"
                            color="blue-inverse"
                            style={{
                              borderRadius: "999px",
                              textAlign: "center",
                            }}
                          >
                            Driver
                          </Tag>
                        )}
                      </div>
                    )
                  )}
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
                {conversationData.messages.map(
                  (message: {
                    id: number;
                    message: string;
                    receiverId: number;
                    senderId: number;
                    timestamp: string;
                  }) => {
                    const isCurrentUser = message.senderId === me?.id;
                    const sender = conversationData.participants.find(
                      (p: {
                        avatar: string;
                        driver: boolean;
                        id: number;
                        name: string;
                      }) => p.id === message.senderId
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
                              {sender?.avatar === null &&
                                sender?.name.charAt(0)}
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
                              {message.message}
                            </div>
                            <div className="mt-1 text-xs text-left text-gray-400">
                              {format(message.timestamp, "HH:mm")}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-200 pt-6">
              <Form
                form={form}
                onFinish={handleSendMessage}
                className="flex w-full gap-2"
              >
                <div className="flex-1">
                  <Form.Item
                    name={"message"}
                    rules={[
                      {
                        type: "string",
                        required: true,
                        message: "Please write some message!",
                      },
                    ]}
                    className="mb-0"
                  >
                    <Input
                      placeholder={t("chat.message")}
                      size="large"
                      className="w-full"
                    />
                  </Form.Item>
                </div>
                <Button size="large" htmlType="submit">
                  {pendingMessage ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <div className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      {t("chat.send")}
                    </div>
                  )}
                </Button>
              </Form>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
