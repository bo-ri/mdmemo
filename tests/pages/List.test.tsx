import { render } from '@testing-library/react';
import { List } from '@/pages/List';

describe('<List />', () => {
  it('compare List to snapshot', async () => {
    const { container } = render(<List memoList={[]} />);
    await expect(container).toMatchFileSnapshot('./List.snapshot.html');
  });
});
