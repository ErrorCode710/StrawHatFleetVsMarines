export const shipsConfig = [
  { name: "Carrier", size: 5 },
  { name: "Battleship", size: 4 },
  { name: "Cruiser", size: 3 },
  { name: "Submarine", size: 3 },
  { name: "Destroyer", size: 2 },
];

export class Ship {
  constructor(type, size) {
    this.type = type;
    this.size = size;
    // this.life = size; // redudant
    // this.hits = 0;
    this.hits = Array(size).fill(false);
  }
  hit(index) {
    // return this.hits++;
    this.hits[index] = true;
  }
  isSunk() {
    // if all of the value on hits is true then sink is true
    const hit = this.hitCount();

    return hit >= this.size;
  }
  hitCount() {
    return this.hits.filter((value) => value === true).length;
  }
  info() {
    return `Class of Ship ${this.type} size of the ship ${this.size} hitpoint of the ship ${this.life} hits of the ship ${
      this.hits
    } is Ship Sunked: ${this.isSunk()}`;
  }
}

// module.exports = { Ship, shipsConfig };
