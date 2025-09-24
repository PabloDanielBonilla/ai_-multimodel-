import AiMultiModels from "./AiMultiModels";
import { Paperclip, Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

function ChatInputBox() {
  return (
    <div className="relative min-h-screen">
      {/* Page Content */}
      <div>
        <AiMultiModels />
      </div>

      {/* Fixed Chat Input */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center px-4 pb-4">
        <div className="w-full border rounded-3xl shadow-md max-w-2xl p-4 inline-flex items-center justify-between">
          {/* Botón de adjuntar a la izquierda */}
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>

          {/* Input */}
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 border-0 outline-0 px-2"
          />

          {/* Botones a la derecha */}
          <div className="flex gap-3">
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
            <Button size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInputBox;
