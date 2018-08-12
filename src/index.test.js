import simplePriorityQueue from '.';

describe('simplePriorityQueue', () => {
  describe('#add', () => {
    it('adds single element', () => {
      const queue = simplePriorityQueue();
      queue.add(1);
      expect(queue.toString()).toEqual('• 1\n');
    });

    it('adds small element then a large element', () => {
      const queue = simplePriorityQueue();
      queue.add(1);
      queue.add(2);
      expect(queue.toString()).toEqual('• 2\n  • undefined\n  • 1\n');
    });

    it('adds large element then a small element', () => {
      const queue = simplePriorityQueue();
      queue.add(2);
      queue.add(1);
      expect(queue.toString()).toEqual('• 2\n  • undefined\n  • 1\n');
    });

    it('adds small element, then a large element, then a smaller element', () => {
      const queue = simplePriorityQueue();
      queue.add(1);
      queue.add(2);
      queue.add(0);
      expect(queue.toString()).toEqual('• 2\n  • 0\n  • 1\n');
    });
  });
});
