import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { PropertyCard } from "@/components/PropertyCard";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Message {
  role: "user" | "assistant";
  content: string;
  listings?: any[];
}

const API_ENDPOINT = "https://b6cd99dae0fa.ngrok-free.app/search-flats";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (query: string) => {
    const userMessage: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();
      
      // Filter out invalid listings (those with only a message, no actual property data)
      const validListings = (data.result.listings || []).filter(
        (listing: any) => listing.rent !== undefined && listing.building_name !== undefined
      );
      
      const assistantMessage: Message = {
        role: "assistant",
        content: data.result.message,
        listings: validListings,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to connect to the property search service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto bg-background md:my-4 md:rounded-2xl md:border md:border-border md:shadow-lg md:h-[calc(100vh-2rem)]">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <WelcomeMessage />
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={`message-${index}`}>
                <ChatMessage
                  role={message.role}
                  content={message.content}
                  isLatest={index === messages.length - 1}
                />
                {message.listings && message.listings.length > 0 && (
                  <div className="mb-4 pl-11">
                    <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                      <div className="flex gap-3 pb-3">
                        {message.listings.map((listing, listingIndex) => (
                          <div key={listing.id || `listing-${listingIndex}`} className="w-[280px] flex-shrink-0">
                            <PropertyCard
                              property={listing}
                              index={listingIndex}
                            />
                          </div>
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-card border-2 border-border">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                </div>
                <div className="bg-card text-card-foreground border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <p className="text-sm text-muted-foreground">Searching properties...</p>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;
