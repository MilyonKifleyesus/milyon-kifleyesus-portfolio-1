"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Eye,
  EyeOff,
  Reply,
  Trash2,
  Calendar,
  User,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

const DEFAULT_ADMIN_TOKEN =
  process.env.NEXT_PUBLIC_ADMIN_TOKEN || "admin-secure-token-123";

function arePaginationsEqual(a: Pagination, b: Pagination) {
  return (
    a.page === b.page &&
    a.limit === b.limit &&
    a.totalCount === b.totalCount &&
    a.totalPages === b.totalPages
  );
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  replied: boolean;
}

interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const tokenRef = useRef<string>(DEFAULT_ADMIN_TOKEN);
  const unauthorizedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("adminToken");
      if (stored) tokenRef.current = stored;
    }
  }, []);

  const fetchMessages = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const token = tokenRef.current;

        const response = await fetch(
          `/api/admin/messages?page=${page}&limit=${pagination.limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          // Try a one-time auto-correct to configured token
          if (typeof window !== "undefined") {
            localStorage.setItem("adminToken", DEFAULT_ADMIN_TOKEN);
            tokenRef.current = DEFAULT_ADMIN_TOKEN;
          }
          const retry = await fetch(
            `/api/admin/messages?page=${page}&limit=${pagination.limit}`,
            {
              headers: {
                Authorization: `Bearer ${tokenRef.current}`,
              },
            }
          );
          if (!retry.ok) {
            unauthorizedRef.current = true;
            setError("Session expired – please log in");
            setLoading(false);
            return;
          }
          const retryData = await retry.json();
          setMessages(retryData.messages);
          setPagination((prev) =>
            arePaginationsEqual(prev, retryData.pagination)
              ? prev
              : retryData.pagination
          );
          setError(null);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        setMessages(data.messages);
        setPagination((prev) =>
          arePaginationsEqual(prev, data.pagination) ? prev : data.pagination
        );
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit]
  );

  useEffect(() => {
    let timerId: number | null = null;

    const start = () => {
      if (timerId !== null) return;
      timerId = window.setInterval(() => {
        if (
          document.visibilityState === "visible" &&
          !unauthorizedRef.current
        ) {
          fetchMessages(pagination.page);
        }
      }, 10000);
    };

    const stop = () => {
      if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
      }
    };

    // initial fetch
    fetchMessages(1);
    start();

    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [fetchMessages, pagination.page]);

  const markAsRead = async (messageId: string, read: boolean) => {
    try {
      const token =
        (typeof window !== "undefined" && localStorage.getItem("adminToken")) ||
        DEFAULT_ADMIN_TOKEN;
      const response = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messageId, read }),
      });

      if (response.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg._id === messageId ? { ...msg, read } : msg))
        );
      }
    } catch (err) {
      console.error("Error updating message:", err);
    }
  };

  const markAsReplied = async (messageId: string, replied: boolean) => {
    try {
      const token =
        (typeof window !== "undefined" && localStorage.getItem("adminToken")) ||
        DEFAULT_ADMIN_TOKEN;
      const response = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messageId, replied }),
      });

      if (response.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg._id === messageId ? { ...msg, replied } : msg))
        );
      }
    } catch (err) {
      console.error("Error updating message:", err);
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const token =
        (typeof window !== "undefined" && localStorage.getItem("adminToken")) ||
        DEFAULT_ADMIN_TOKEN;
      const response = await fetch(`/api/admin/messages?id=${messageId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
        setPagination((prev) => ({ ...prev, totalCount: prev.totalCount - 1 }));
        if (selectedMessage?._id === messageId) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const unreadCount = messages.filter((msg) => !msg.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => fetchMessages()}>Retry</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
          <p className="text-muted-foreground">
            Manage and respond to contact form submissions
          </p>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="mt-2">
              {unreadCount} unread message{unreadCount > 1 ? "s" : ""}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      !message.read
                        ? "bg-primary/5 border-primary/20"
                        : "bg-card border-border"
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">{message.name}</span>
                          {!message.read && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                          {message.replied && (
                            <Badge variant="outline" className="text-xs">
                              Replied
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {message.email}
                        </p>
                        <p className="font-medium mb-2">{message.subject}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {message.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(message.createdAt)}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(message._id, !message.read);
                          }}
                        >
                          {message.read ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsReplied(message._id, !message.replied);
                          }}
                        >
                          <Reply className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message._id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    disabled={pagination.page === 1}
                    onClick={() => fetchMessages(pagination.page - 1)}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={pagination.page === pagination.totalPages}
                    onClick={() => fetchMessages(pagination.page + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            {selectedMessage ? (
              <Card className="p-6 sticky top-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Message Details</h3>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      From
                    </label>
                    <p className="font-semibold">{selectedMessage.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedMessage.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Subject
                    </label>
                    <p className="font-medium">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Message
                    </label>
                    <p className="text-sm whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Received
                    </label>
                    <p className="text-sm">
                      {formatDate(selectedMessage.createdAt)}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      size="sm"
                      onClick={() =>
                        markAsRead(selectedMessage._id, !selectedMessage.read)
                      }
                    >
                      {selectedMessage.read ? "Mark as Unread" : "Mark as Read"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        markAsReplied(
                          selectedMessage._id,
                          !selectedMessage.replied
                        )
                      }
                    >
                      {selectedMessage.replied
                        ? "Mark as Unreplied"
                        : "Mark as Replied"}
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMessage(selectedMessage._id)}
                    className="w-full"
                  >
                    Delete Message
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Select a message to view details
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
