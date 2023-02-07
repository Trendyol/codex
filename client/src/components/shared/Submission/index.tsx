import Button from '@components/ui/Button';
import Card from '@components/ui/Card';
import { FC } from 'react';
import Spinner from '../Spinner';

type SubmissionProps = {};

const Submission: FC<SubmissionProps> = () => {
  return (
    <Card>
      <div className="flex h-24 flex-col justify-between">
        <div></div>
        <div className="flex justify-between">
          <Spinner />
          <Button size={'small'}>Submit</Button>
        </div>
      </div>
    </Card>
  );
};

export default Submission;
