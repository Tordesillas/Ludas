export default interface Tile {
    id: number;
    x: number;
    y: number;
    color?: string;
    isStart?: boolean;
    secure?: boolean;
}