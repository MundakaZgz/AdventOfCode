from itertools import cycle
from math import lcm

directions, _, *str_ways = open('input.txt').read().splitlines()
ways = {way[0:3]: {'L': way[7:10], 'R': way[12:15]} for way in str_ways}

positions = [way for way in ways if way.endswith('A')]
totals = [0] * len(positions)
for i, pos in enumerate(positions):
    c = cycle(directions)
    while not pos.endswith('Z'):
        totals[i] += 1
        pos = ways[pos][next(c)]

print('Part 1', totals[0]) # AAA is the first and goes to ZZZ
print('Part 2', lcm(*totals))