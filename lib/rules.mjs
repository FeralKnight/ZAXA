export const DAY=86400000;
export function isNew(p,now=Date.now()){return !!p.newAt && now>=p.newAt && now<p.newAt+14*DAY && p.published;}
export function activeOffer(p,now=Date.now()){return p.offer?.enabled && now>=p.offer.start && (!p.offer.end||now<p.offer.end)&&p.published;}
export function price(p,now=Date.now()){return activeOffer(p,now)?Math.round((p.offer.type==='percent'?p.price*(1-p.offer.value/100):p.price-p.offer.value)*100)/100:p.price;}
