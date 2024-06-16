import { render } from '@testing-library/react';
import { Form } from '@/pages/Form';

describe('<Form />', () => {
  it('compare Form to snapshot', async () => {
    const { container } = render(<Form />);
    await expect(container).toMatchFileSnapshot('./Form.snapshot.html');
  });
});
