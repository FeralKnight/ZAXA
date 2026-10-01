import {cookies} from 'next/headers';
import {createHmac,timingSafeEqual,scryptSync} from 'node:crypto';
export type User={name:string;role:'owner'|'admin'|'editor';};
export function accounts(){try{return JSON.parse(process.env.ZAXA_ACCOUNTS_JSON||'[]')}catch{return []}}
export function verifyPassword(password:string,hash:string){try{const [salt,expected]=hash.split(':');const actual=scryptSync(password,salt,64);const target=Buffer.from(expected,'hex');return actual.length===target.length&&timingSafeEqual(actual,target)}catch{return false}}
export function signSession(user:User){const payload=Buffer.from(JSON.stringify({...user,exp:Date.now()+8*3600000})).toString('base64url');return payload+'.'+createHmac('sha256',process.env.ZAXA_SESSION_SECRET!).update(payload).digest('base64url')}
export async function getUser():Promise<User|null>{const raw=(await cookies()).get('zaxa_session')?.value;if(!raw||!process.env.ZAXA_SESSION_SECRET)return null;try{const [p,s]=raw.split('.'),expected=createHmac('sha256',process.env.ZAXA_SESSION_SECRET).update(p).digest('base64url');if(s.length!==expected.length||!timingSafeEqual(Buffer.from(s),Buffer.from(expected)))return null;const u=JSON.parse(Buffer.from(p,'base64url').toString());if(u.exp<Date.now()||!accounts().some((a:any)=>a.name===u.name&&a.role===u.role))return null;return {name:u.name,role:u.role}}catch{return null}}
