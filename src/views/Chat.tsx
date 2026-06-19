import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { useChat } from '@/hooks/use-chat';
import { Bot, MessageCircle, Send, UserRound, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);
  const [useAi, setUseAi] = useState(false);

  const { messages, isConnected, isConnecting, connect, disconnect, sendMessage } = useChat(useAi);

  // Auto-scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleToggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (!isConnected && !isConnecting) {
        connect();
      }
    } else {
      setIsOpen(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() && isConnected) {
      sendMessage(messageInput);
      setMessageInput('');
    }
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    disconnect();
  };
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button onClick={handleToggleChat} size="lg" className="rounded-full shadow-lg">
          <MessageCircle className="mr-2 h-5 w-5" />
          Soporte
        </Button>
      ) : (
        <Card className="flex h-150 w-100 flex-col shadow-xl">
          {/* HEADER */}
          <CardHeader className="border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Chat de Soporte</h3>

                {isConnecting && (
                  <span className="text-xs text-muted-foreground">Conectando...</span>
                )}

                {isConnected && <span className="text-xs text-green-500">● En línea</span>}
              </div>

              <Button variant="ghost" size="icon" onClick={handleCloseChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* SWITCH IA */}
            <div className="mt-3 flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                {useAi ? (
                  <Bot className="h-4 w-4 text-primary" />
                ) : (
                  <UserRound className="h-4 w-4" />
                )}

                <Label htmlFor="ai-mode">{useAi ? 'Modo IA activado' : 'Atención humana'}</Label>
              </div>

              <Switch id="ai-mode" checked={useAi} onCheckedChange={setUseAi} />
            </div>
          </CardHeader>

          {/* MENSAJES */}
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full px-4 py-3">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>

                      <div className="mt-1 text-right text-[10px] opacity-70">
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          {/* INPUT */}
          <div className="border-t p-4">
            {!isConnected && !isConnecting && (
              <Button onClick={connect} className="w-full">
                Conectar al soporte
              </Button>
            )}

            {isConnected && (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={useAi ? 'Pregunta a la IA...' : 'Escribe tu mensaje...'}
                />

                <Button size="icon" type="submit" disabled={!messageInput.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};
export default Chat;
