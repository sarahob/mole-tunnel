import { InputKeys } from "../models/InputKeys";


export const updatePosition = (event: KeyboardEvent, currentPos:{x:number, y:number}) => {

    const key = event.key;

    console.log('CURRENT POS', currentPos);
 
    switch(key){
        case InputKeys.ARROW_UP: return {x: currentPos.x, y: currentPos.y - 10};
        case InputKeys.ARROW_DOWN: return {x: currentPos.x, y: currentPos.y + 10};
        case InputKeys.ARROW_LEFT: return {x: currentPos.x - 10, y: currentPos.y};
        case InputKeys.ARROW_RIGHT: return {x: currentPos.x + 10, y:currentPos.y};
        default: return currentPos;
    }
}