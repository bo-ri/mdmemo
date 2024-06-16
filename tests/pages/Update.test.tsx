import { render } from '@testing-library/react';
import { useHydrateAtoms } from 'jotai/utils';
import { Provider } from 'jotai';
import { Update } from '@/pages/Update';
import { memo } from '@/state/atoms/memo';

// jotaiのmock
const HydrateAtoms = ({
  initialValues,
  children,
}: {
  // FIXME: proper types
  initialValues: any;
  children: any;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({
  initialValues,
  children,
}: {
  initialValues: any;
  children: any;
}) => {
  return (
    <Provider>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </Provider>
  );
};

const UpdateProvider = () => {
  return (
    <TestProvider
      initialValues={[
        [
          memo,
          {
            name: 'TEST NAME',
            content: 'TEST CONTENT',
            onClick: async () => {},
          },
        ],
      ]}
    >
      <Update index={1} />
    </TestProvider>
  );
};

// react hooksのmock
vi.mock('react', () => ({
  useState: vi.fn().mockImplementation((item) => 'TEST DISPLAY NAME'),
}));

describe('<Update />', () => {
  it('compare Update to snapshot', async () => {
    const { container } = render(<UpdateProvider />);
    await expect(container).toMatchFileSnapshot('./Update.snapshot.html');
  });
});
