import Card from '@components/ui/Card';
import Input from '@components/ui/Input';
import Message from './Message';

const Chat = () => {
  return (
    <Card className="space-y-2 h-[420px] flex flex-col justify-between">
      <div className="overflow-scroll h-full mb-2 space-y-2">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <Input placeholder="Type something..." />
    </Card>
  );
};

export default Chat;
