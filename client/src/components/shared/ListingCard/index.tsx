import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import Link from 'next/link';
import React, { FC, ReactNode } from 'react';

type ListingCardProps = {
  title: string;
  subtitle?: string | ReactNode;
  content?: string;
  action: ReactNode;
  image?: ReactNode;
  href: string;
};

const ListingCard: FC<ListingCardProps> = ({ title, subtitle, content, action, image, href }) => {
  return (
    <Link href={href}>
      <Card className="">
        <div className="flex justify-between">
          <div>
            <div className="text-xl font-semibold text-primary-400">{title}</div>
            <div className="mt-0.5 text-xs font-medium capitalize text-secondary-100">
              {subtitle}
            </div>
          </div>
          {action}
        </div>
        {(image || content) && (
          <div className="mt-4 flex">
            {image && (
              <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#9694ff] lg:hidden">
                {image}
              </div>
            )}
            {content && (
              <div className="flex flex-1 flex-col ">
                <div className="line-clamp-3 min-h-[48px] text-ellipsis whitespace-pre-wrap text-secondary-200">
                  {content}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </Link>
  );
};

export default ListingCard;
