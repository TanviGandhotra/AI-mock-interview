import MessageBubble from "./MessageBubble";

const ChatContainer = ({
  messages,
}) => {

  return (

    <div className="flex-1 overflow-y-auto p-6 space-y-6">

      {messages.map(
        (msg, index) => (

          <MessageBubble
            key={index}
            sender={msg.sender}
            text={msg.text}
          />

        )
      )}

    </div>

  );

};

export default ChatContainer;