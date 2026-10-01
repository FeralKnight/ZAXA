import {getUser} from '../../../lib/auth';
export async function GET(){return Response.json({user:await getUser()},{headers:{'Cache-Control':'no-store'}})}
