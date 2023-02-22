import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { FC } from 'react';

type SubmissionProps = {};

const Submission: FC<SubmissionProps> = () => {
  return (
    <Card>
      <div className="flex h-24 flex-col justify-between">
        <div></div>
        <div className="flex flex-row-reverse">
          <Button className="" size={'small'}>
            Submit
          </Button>
          <Button className="mr-2" intent={'secondary'} size={'small'}>
            Run
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Submission;
