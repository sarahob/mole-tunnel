export enum DigStatus {
    EMPTY = 0,
    FULL = 1
  };
  
export interface GridSquare {
    x: number;
    y: number;
    digStatus: DigStatus;
    loot: () => any;
    style: {
        color: string;
        height: number;
        width: number;
    }
  };