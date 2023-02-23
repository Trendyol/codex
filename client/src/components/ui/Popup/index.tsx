import { FC, ReactNode, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useClickAway, useLockBodyScroll } from 'react-use';

type PopupProps = {
  show: boolean;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  onHide: () => void;
};

const Pop: FC<PopupProps> = ({ show, onHide, title, children, footer }) => {
  const ref = useRef(null);
  useLockBodyScroll(show);
  useClickAway(ref, () => onHide());

  if (!show) return null;
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-60 px-4 md:h-full">
      <div className="relative w-full max-w-xl md:h-auto" ref={ref}>
        <div className="relative rounded-lg bg-white shadow">
          <div className="flex items-start justify-between rounded-t border-b p-4">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onHide}
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            >
              <IoMdClose size={20} />
            </button>
          </div>
          <div className="max-h-[60vh] min-h-[280px] space-y-6 overflow-auto p-6">{children}</div>
          {footer && (
            <div className="flex w-full items-center space-x-2 rounded-b border-t border-gray-200 p-6">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pop;
