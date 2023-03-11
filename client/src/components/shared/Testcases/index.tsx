  import { Testcase } from '@hooks/data/models/types';
  import { useTestcases } from '@hooks/data/useTestcases';
  import { decodeBase64 } from '@utils/converter';
  import { cx } from 'class-variance-authority';
  import { FC, useEffect } from 'react';

  type TestcasesProps = {
    problemId: string;
    selectedTestcase?: Testcase;
    onSelectedTestcaseChange: (testcase: Testcase) => void;
  };

  const Testcases: FC<TestcasesProps> = ({
    problemId,
    selectedTestcase,
    onSelectedTestcaseChange,
  }) => {
    const { testcases } = useTestcases(problemId);

    useEffect(() => {
      if (testcases?.length) onSelectedTestcaseChange(testcases[0]);
    }, [testcases, onSelectedTestcaseChange]);

    return (
      <div className="overflow-auto">
        <div className="flex gap-2">
          {testcases?.map((testcase, index) => (
            <div
              key={testcase.id}
              onClick={() => onSelectedTestcaseChange(testcase)}
              className={cx(
                'h-[32px] cursor-pointer whitespace-nowrap rounded-xl p-2 text-[10px] hover:bg-gray-200',
                selectedTestcase?.id == testcase?.id ? 'bg-gray-200' : 'bg-gray-50 bg-opacity-90',
              )}
            >
              Testcase {index + 1}
            </div>
          ))}
        </div>
        <div className="mt-3">
          <div>
            <div className="mb-1 text-xs text-black">Input</div>
            <div className="rounded-md bg-gray-50 px-2 py-1 text-sm">
              {decodeBase64(selectedTestcase?.stdin)}
            </div>
          </div>
          <div className="mt-2">
            <div className="mb-1 text-xs text-black">Expected Output</div>
            <div className="rounded-md bg-gray-50 px-2 py-1 text-sm">
              {decodeBase64(selectedTestcase?.expected_output)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Testcases;
