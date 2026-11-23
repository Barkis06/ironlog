// IronLog AI Coach. Never store API keys in website code or GitHub.
import { timingSafeEqual } from 'node:crypto';
const MODEL='gpt-5.4-mini';
const CALL_LIMIT=12;
const WINDOW=10*60*1000;
const attempts=new Map();
const HEADERS={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const respond=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:HEADERS});
const INSTRUCTIONS="You are IronLog Coach, a practical and supportive strength-training assistant. The user is 19 years old, 194 cm and 71 kg starting weight; a beginner with a full gym; strength goal and 5 gym visits weekly. Deadlifts and Romanian deadlifts are intentionally excluded because of difficulty with technique.\nCURRENT WORKOUT ROUTINE:\nMonday Lower A: Barbell Back Squat 3x5; Hip Thrust Machine 3x8; Leg Press 2x10; Seated Leg Curl 2x10; Standing Calf Raise 2x12.\nTuesday Upper A: Barbell Bench Press 3x5; Seated Cable Row 3x8; Dumbbell Shoulder Press 2x8; Lat Pulldown 3x10; Triceps Pushdown 2x12.\nWednesday Light Day: Easy walking or cycling 15-20 minutes; Cable Face Pull 2x15; Dumbbell Biceps Curl 2x12; Reverse Wrist Curl 2x12-15; Plank 3x30-45 sec; Mobility Exercises 5-10 minutes.\nThursday Lower B: Hack Squat Machine 3x6-8; Bulgarian Split Squat 2x8 per leg; Seated Leg Curl 3x10; Hip Thrust Machine 2x10; Seated Calf Raise 2x12.\nFriday Upper B: Barbell Overhead Press 3x5; Incline Dumbbell Bench Press 3x8; Assisted Pull-ups 3x6-8; Chest-Supported Row 3x8; Dumbbell Lateral Raise 2x12; Dumbbell Biceps Curl 2x10; Dumbbell Shrugs 2x10-15.\nSaturday and Sunday rest.\nProgression: begin with 2-3 reps in reserve while learning technique and add small amounts of weight after clean sets. Approximate daily protein goal 115-145 g and a moderate calorie surplus if aiming to gain mass. Answer the user's latest question briefly but usefully. Recommend a qualified trainer for technique that needs hands-on assessment. Avoid working through sharp or worsening pain and recommend evaluation for persistent symptoms. Never claim you can see the user's local workout logs, injuries, training history or measurements beyond the above starting profile; no private workout logs are transmitted. You are a separate AI service, not the user's existing ChatGPT conversation. Respond in the user's language.";
function limited(ip){
 const now=Date.now(),item=attempts.get(ip)||{since:now,count:0};
 if(now-item.since>WINDOW){item.since=now;item.count=0;}
 item.count++;attempts.set(ip,item);
 if(attempts.size>400){for(const [key,val] of attempts)if(now-val.since>WINDOW)attempts.delete(key);}
 return item.count>CALL_LIMIT;
}
export default async function coach(req){
 if(req.method!=='POST')return respond({error:'Use POST to send chat messages.'},405);
 const origin=req.headers.get('origin');
 if(origin&&origin!==new URL(req.url).origin)return respond({error:'Only this IronLog website can call the coach.'},403);
 const key=process.env.OPENAI_API_KEY, secret=process.env.IRONLOG_COACH_ACCESS_CODE;
 if(!key||!secret||secret.length<16)
  return respond({error:'AI Coach needs setup. Add OPENAI_API_KEY and IRONLOG_COACH_ACCESS_CODE to your Netlify environment, then redeploy.'},503);
 let body;
 try{
  if(Number(req.headers.get('content-length')||0)>20000)return respond({error:'Your conversation is too long.'},413);
  const raw=await req.text();if(raw.length>20000)return respond({error:'Your conversation is too long.'},413);
  body=JSON.parse(raw);
 }catch{return respond({error:'Invalid request.'},400);}
 const expected=Buffer.from(secret,'utf8');
 const supplied=Buffer.from(typeof body?.code==='string'?body.code:'','utf8');
 if(supplied.length!==expected.length||!timingSafeEqual(expected,supplied))
  return respond({error:'Incorrect access code. Check the code you saved in IronLog.'},401);
 const ip=req.headers.get('x-nf-client-connection-ip')||req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
 if(limited(ip))return respond({error:'Temporary chat limit reached. Try again in about 10 minutes.'},429);
 if(!Array.isArray(body.messages)||!body.messages.length||body.messages.length>20)
  return respond({error:'Please start a new chat and try again.'},400);
 const messages=body.messages.slice(-12);
 if(!messages.every(m=>m&&['user','assistant'].includes(m.role)&&typeof m.content==='string'&&m.content.trim()&&m.content.length<=4500))
  return respond({error:'One of your messages is too long or invalid.'},400);
 if(messages.at(-1).role!=='user'||messages.at(-1).content.length>800)
  return respond({error:'Your question must be 800 characters or fewer.'},400);
 try{
  const response=await fetch('https://api.openai.com/v1/responses',{
   method:'POST',signal:AbortSignal.timeout(26000),
   headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},
   body:JSON.stringify({model:process.env.IRONLOG_AI_MODEL||MODEL,store:false,instructions:INSTRUCTIONS,input:messages.map(m=>({role:m.role,content:m.content})),max_output_tokens:800,reasoning:{effort:'none'}})
  });
  if(!response.ok){
   if(response.status===401||response.status===403)return respond({error:'OpenAI rejected the API key. Check OPENAI_API_KEY in Netlify.'},502);
   if(response.status===429)return respond({error:'OpenAI is rate-limited or your API credits are exhausted. Check API billing.'},429);
   return respond({error:'The AI service could not answer. Please try again later.'},502);
  }
  const result=await response.json();
  const text=Array.isArray(result.output)?result.output.flatMap(o=>Array.isArray(o.content)?o.content:[]).filter(c=>c.type==='output_text'&&typeof c.text==='string').map(c=>c.text).join('\n').trim():'';
  if(!text)return respond({error:'The AI returned no text. Please retry.'},502);
  return respond({reply:text.slice(0,4500)});
 }catch(err){return respond({error:err?.name==='TimeoutError'?'The request timed out. Try again.':'The AI service is temporarily unavailable.'},502);}
}
