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

  describe('#pop', () => {
    it('pops single element', () => {
      const queue = simplePriorityQueue();
      queue.add(1);
      expect(queue.peek()).toEqual(1);
      const value = queue.pop();
      expect(value).toEqual(1);
      expect(queue.peek()).toBeUndefined();
      expect(queue.toString()).toEqual('• undefined\n');
    });

    it('pops single element from two element heap', () => {
      const queue = simplePriorityQueue();
      queue.add(1);
      queue.add(2);
      expect(queue.peek()).toEqual(2);
      const value = queue.pop();
      expect(value).toEqual(2);
      expect(queue.peek()).toEqual(1);
      expect(queue.toString()).toEqual('• 1\n');
    });

    it('pops single element from three element heap', () => {
      const queue = simplePriorityQueue();
      queue.add(1);
      queue.add(2);
      queue.add(3);
      expect(queue.peek()).toEqual(3);
      const value = queue.pop();
      expect(value).toEqual(3);
      expect(queue.peek()).toEqual(2);
      expect(queue.toString()).toEqual('• 2\n  • undefined\n  • 1\n');
    });

    it('pops single element from six element heap', () => {
      const queue = simplePriorityQueue();
      queue.add(1);
      queue.add(2);
      queue.add(3);
      queue.add(4);
      queue.add(5);
      queue.add(6);
      expect(queue.peek()).toEqual(6);
      const value = queue.pop();
      expect(value).toEqual(6);
      expect(queue.peek()).toEqual(5);
      expect(queue.toString()).toEqual('• 5\n  • 2\n  • 4\n    • 3\n    • 1\n');
    });

    it('pops single element from seven element heap', () => {
      const queue = simplePriorityQueue();
      queue.add(1);
      queue.add(2);
      queue.add(3);
      queue.add(4);
      queue.add(5);
      queue.add(6);
      queue.add(7);
      expect(queue.peek()).toEqual(7);
      const value = queue.pop();
      expect(value).toEqual(7);
      expect(queue.peek()).toEqual(6);
      expect(queue.toString()).toEqual('• 6\n  • 5\n    • undefined\n    • 2\n  • 4\n    • 3\n    • 1\n');
    });
  });
});
