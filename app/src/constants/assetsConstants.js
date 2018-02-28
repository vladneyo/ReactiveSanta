import { Asset } from '../asset';

export class AssetsConstants {
    static get santaImg() { return new Asset('santa', 'santa2.png') };
    static get giftImg() { return new Asset('gift', 'gift.png') };
    static get houseImg() { return new Asset('house', 'house.png') };
    static get cloudImg() { return new Asset('cloud', 'cloud.png') };

    static get droppedSnd() { return new Asset('dropped', 'dropped.mp3') };
    static get deliveredSnd() { return new Asset('delivered', 'delivered.mp3') };
    static get crashSnd() { return new Asset('crash', 'crash.mp3') };
    static get santaMoveSnd() { return new Asset('santamove', 'santamove.mp3') };
}