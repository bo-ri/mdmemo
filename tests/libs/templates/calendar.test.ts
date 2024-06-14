import { generateCalendar } from '@/libs/templates/calendar';

describe('generateCalendar()', () => {
  describe('閏年の2月', () => {
    const target = new Date('2024-02-01T00:00:00');
    test('2024.2のcalendarを返す', async () => {
      const expected = `| 月 | 火 | 水 | 木 | 金 | <span style="color: #00B3CC">土</span> | <span style="color: #FF7166">日</span> |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
||||1|2|<span style="color: #00B3CC">3</span>|<span style="color: #FF7166">4</span>|
|5|6|7|8|9|<span style="color: #00B3CC">10</span>|<span style="color: #FF7166">11</span>|
|12|13|14|15|16|<span style="color: #00B3CC">17</span>|<span style="color: #FF7166">18</span>|
|19|20|21|22|23|<span style="color: #00B3CC">24</span>|<span style="color: #FF7166">25</span>|
|26|27|28|29||||`;
      expect(await generateCalendar(target)).toBe(expected);
    });
  });
});
