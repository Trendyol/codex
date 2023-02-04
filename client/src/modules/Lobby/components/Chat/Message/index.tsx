import Avatar from '@components/ui/Avatar';
import Image from 'next/image';

const Message = () => {
  return (
    <div className="flex bg-gray-50 p-2 rounded-md">
      <Image
        className="rounded-md self-start"
        alt="avatar"
        width={32}
        height={32}
        src=""
      />
      <div className="ml-2 relative">
        <div className="text-primary-500 text-sm">
          <span className="font-semibold">John Doe</span>
          <span className="ml-2 text-secondary-100 text-xs">350 Points</span>
        </div>
        <div className="text-secondary-200 text-sm">
          İndirdim hazırda bekliyorum 😂İndirdim hazırda bekliyorum 😂İndirdim hazırda bekliyorum
          😂İndirdim hazırda bekliyorum 😂ekliyorum 😂İndirdim hazırda bekliyorum
          😂İndirdim hazırda b
        </div>
        <div className="text-xs text-secondary-100 absolute right-0 bottom-0">12.34</div>
      </div>
    </div>
  );
};

export default Message;
