import {NextResponse} from 'next/server';
export async function POST(req:Request){if(new URL(req.url).origin!==req.headers.get('origin'))return NextResponse.json({error:'Solicitud inválida'},{status:403});const r=NextResponse.json({ok:true});r.cookies.set('zaxa_session','',{httpOnly:true,sameSite:'strict',secure:true,path:'/',maxAge:0});return r}
