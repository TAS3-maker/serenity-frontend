import { C } from "../tokens";

// ─── Users ────────────────────────────────────────────────────
export const USERS = [
  {id:1,name:"Sarah M.",email:"sarah.m@email.com",profile:"avoider",plan:"premium",status:"active",country:"US",device:"iOS",joined:"Jan 14, 2026",lastActive:"Today",streak:7,reliefScore:68,day:3,missionsComplete:12,totalMissions:30,payments:[{id:"pay_1",date:"Jan 14, 2026",amount:"$19.00",method:"Visa ••4242",status:"paid"},{id:"pay_2",date:"Feb 14, 2026",amount:"$19.00",method:"Visa ••4242",status:"paid"}],history:[{id:1,day:1,title:"Understanding Your Pattern",sent:"Jan 14",opened:true,completed:true},{id:2,day:2,title:"Naming the Feeling",sent:"Jan 15",opened:true,completed:true},{id:3,day:3,title:"The Avoidance Map",sent:"Jan 16",opened:true,completed:false}]},
  {id:2,name:"Marcus T.",email:"marcus.t@email.com",profile:"anxious",plan:"premium",status:"active",country:"UK",device:"Android",joined:"Jan 22, 2026",lastActive:"Yesterday",streak:4,reliefScore:55,day:8,missionsComplete:18,totalMissions:30,payments:[{id:"pay_3",date:"Jan 22, 2026",amount:"$19.00",method:"Mastercard ••1234",status:"paid"}],history:[{id:1,day:1,title:"Understanding Your Pattern",sent:"Jan 22",opened:true,completed:true}]},
  {id:3,name:"Priya R.",email:"priya.r@email.com",profile:"silent",plan:"free",status:"active",country:"IN",device:"iOS",joined:"Feb 1, 2026",lastActive:"3 days ago",streak:2,reliefScore:42,day:2,missionsComplete:4,totalMissions:7,payments:[],history:[]},
  {id:4,name:"Elena V.",email:"elena.v@email.com",profile:"avoider",plan:"free",status:"active",country:"DE",device:"iOS",joined:"Feb 8, 2026",lastActive:"Today",streak:1,reliefScore:35,day:1,missionsComplete:1,totalMissions:7,payments:[],history:[]},
  {id:5,name:"James K.",email:"james.k@email.com",profile:"anxious",plan:"premium",status:"inactive",country:"AU",device:"Android",joined:"Jan 5, 2026",lastActive:"Mar 1, 2026",streak:0,reliefScore:61,day:15,missionsComplete:22,totalMissions:30,payments:[{id:"pay_4",date:"Jan 5, 2026",amount:"$19.00",method:"Visa ••9876",status:"paid"}],history:[]},
  {id:6,name:"Aisha B.",email:"aisha.b@email.com",profile:"silent",plan:"premium",status:"active",country:"NG",device:"Android",joined:"Dec 20, 2025",lastActive:"Today",streak:12,reliefScore:79,day:28,missionsComplete:28,totalMissions:30,payments:[{id:"pay_5",date:"Dec 20, 2025",amount:"$19.00",method:"Visa ••5678",status:"paid"}],history:[]},
  {id:7,name:"Tom H.",email:"tom.h@email.com",profile:"avoider",plan:"free",status:"active",country:"CA",device:"iOS",joined:"Mar 1, 2026",lastActive:"Today",streak:3,reliefScore:38,day:3,missionsComplete:3,totalMissions:7,payments:[],history:[]},
  {id:8,name:"Yuki N.",email:"yuki.n@email.com",profile:"silent",plan:"free",status:"new",country:"JP",device:"Android",joined:"Mar 20, 2026",lastActive:"Today",streak:1,reliefScore:30,day:1,missionsComplete:0,totalMissions:7,payments:[],history:[]},
];

// ─── Email Templates ──────────────────────────────────────────
export const TEMPLATES = [
  {id:1,name:"Welcome Email",slug:"welcome",subject:"Welcome to SerenityDecoded — your journey starts here",trigger:"on_signup",active:true,body:`Hi {{first_name}},\n\nWelcome to SerenityDecoded.\n\nYour Stress Profile is: {{stress_profile}}\n\nYour free 7-Day Relief Program is ready:\n→ {{app_link}}\n\nWith care,\nThe SerenityDecoded Team\n\n---\nUnsubscribe | Your data is never sold.`},
  {id:2,name:"Daily Mission Reminder",slug:"daily_mission",subject:"Your daily mission is ready, {{first_name}}",trigger:"daily_9am",active:true,body:`Hi {{first_name}},\n\nDay {{day_number}} of {{program_name}} is ready.\n\nToday: {{mission_title}}\n\n→ {{app_link}}\n\n"{{daily_quote}}"\n\nSerenityDecoded`},
  {id:3,name:"Streak Achievement",slug:"streak_achievement",subject:"{{streak_count}}-day streak — you're building something real",trigger:"streak_7",active:true,body:`Hi {{first_name}},\n\nYou've hit a {{streak_count}}-day streak.\n\nMoney Relief Score: {{relief_score}}/100\n\n→ {{app_link}}\n\nSerenityDecoded`},
  {id:4,name:"Subscription Expiry — 3 Days",slug:"expiry_3days",subject:"Your SerenityDecoded access expires in 3 days",trigger:"subscription_minus_3",active:true,body:`Hi {{first_name}},\n\nYour Premium access expires on {{expiry_date}} — 3 days from now.\n\nRenew now:\n→ {{renewal_link}}\n\nSerenityDecoded`},
  {id:5,name:"Subscription Expiry — 2 Days",slug:"expiry_2days",subject:"Your Premium access expires in 2 days",trigger:"subscription_minus_2",active:true,body:`Hi {{first_name}},\n\nTwo days left on your Premium access.\n\n→ {{renewal_link}}\n\nSerenityDecoded`},
  {id:6,name:"Subscription Expiry — 1 Day",slug:"expiry_1day",subject:"Last chance — your Premium access expires tomorrow",trigger:"subscription_minus_1",active:true,body:`Hi {{first_name}},\n\nYour Premium access expires tomorrow.\n\n→ Renew: {{renewal_link}}\n\nSerenityDecoded`},
  {id:7,name:"Subscription Expired",slug:"expired",subject:"Your Premium access has ended",trigger:"subscription_expired",active:true,body:`Hi {{first_name}},\n\nYour Premium access ended on {{expiry_date}}.\n\nYour free 7-Day program is still fully available.\n\nRejoin: {{renewal_link}}\n\nSerenityDecoded`},
  {id:8,name:"Payment Confirmation",slug:"payment_confirm",subject:"Payment confirmed — welcome to Premium",trigger:"payment_success",active:true,body:`Hi {{first_name}},\n\nPayment confirmed. Thank you.\n\nAmount: {{amount}} · Date: {{payment_date}}\n\nStart Day 1:\n→ {{app_link}}\n\nReceipt: {{receipt_id}} | Powered by Stripe`},
];

// ─── Scheduled notifications ───────────────────────────────────
export const SCHEDULES = [
  {id:1,name:"Sub Expiry — 3 Days",trigger:"subscription_minus_3",template:"expiry_3days",audience:"premium",channel:"email",active:true,sent:142,lastRun:"Mar 16, 2026 09:00",nextRun:"Mar 20, 2026 09:00",scheduleType:"event_offset",offsetDays:-3,offsetFrom:"subscription_end",runTime:"09:00",timezone:"UTC",description:"Sends 3 days before Premium subscription expires"},
  {id:2,name:"Sub Expiry — 2 Days",trigger:"subscription_minus_2",template:"expiry_2days",audience:"premium",channel:"email",active:true,sent:138,lastRun:"Mar 17, 2026 09:00",nextRun:"Mar 21, 2026 09:00",scheduleType:"event_offset",offsetDays:-2,offsetFrom:"subscription_end",runTime:"09:00",timezone:"UTC",description:"Sends 2 days before Premium subscription expires"},
  {id:3,name:"Sub Expiry — 1 Day",trigger:"subscription_minus_1",template:"expiry_1day",audience:"premium",channel:"email",active:true,sent:134,lastRun:"Mar 18, 2026 09:00",nextRun:"Mar 19, 2026 09:00",scheduleType:"event_offset",offsetDays:-1,offsetFrom:"subscription_end",runTime:"09:00",timezone:"UTC"},
  {id:4,name:"Sub Expired",trigger:"subscription_expired",template:"expired",audience:"premium",channel:"email",active:true,sent:89,lastRun:"Mar 15, 2026 10:00",nextRun:"Mar 20, 2026 10:00",scheduleType:"event_trigger",runTime:"10:00",timezone:"UTC"},
  {id:5,name:"Daily Mission Reminder",trigger:"daily_9am",template:"daily_mission",audience:"all",channel:"push",active:true,sent:8942,lastRun:"Mar 19, 2026 09:00",nextRun:"Mar 20, 2026 09:00",scheduleType:"recurring_daily",runTime:"09:00",timezone:"UTC"},
  {id:6,name:"Welcome Email",trigger:"on_signup",template:"welcome",audience:"all",channel:"email",active:true,sent:1284,lastRun:"Mar 19, 2026 14:22",nextRun:"On next signup",scheduleType:"event_trigger",runTime:"immediate",timezone:"UTC"},
  {id:7,name:"Payment Confirmation",trigger:"payment_success",template:"payment_confirm",audience:"premium",channel:"email",active:true,sent:221,lastRun:"Mar 14, 2026 18:44",nextRun:"On next payment",scheduleType:"event_trigger",runTime:"immediate",timezone:"UTC"},
  {id:8,name:"Streak 7-day Milestone",trigger:"streak_7",template:"streak_achievement",audience:"all",channel:"push",active:true,sent:456,lastRun:"Mar 18, 2026 20:00",nextRun:"Mar 19, 2026 20:00",scheduleType:"event_trigger",runTime:"20:00",timezone:"UTC"},
  {id:9,name:"Re-engagement (7 days inactive)",trigger:"inactive_7d",template:"daily_mission",audience:"free",channel:"email",active:false,sent:312,lastRun:"Mar 12, 2026 11:00",nextRun:"Paused",scheduleType:"event_offset",offsetDays:7,offsetFrom:"last_activity",runTime:"11:00",timezone:"UTC"},
];

// ─── Membership plans ─────────────────────────────────────────
export const PLANS = [
  {id:"free",name:"7-Day Relief Program",price:0,interval:"free",active:true,highlighted:false,tagline:"Your foundation in financial calm.",desc:"Seven daily missions tailored to your Stress Profile.",features:["Financial Stress Profile assessment","7 personalised daily missions","Guilt Cycle Mapper","Money Story Journal","Streak tracking","Community access"],stripePriceId:"",stripeProductId:""},
  {id:"premium",name:"30-Day Financial Calm Sprint",price:19,interval:"one_time",active:true,highlighted:true,badge:"Most popular",tagline:"Build lasting Financial Contentment.",desc:"30 targeted behavioral missions that deepen the work.",features:["Everything in the 7-Day program","30 targeted deep-dive missions","Money Belief Reset exercises","Progress dashboard","Relief Score analytics","Priority community access"],stripePriceId:"",stripeProductId:""},
];

// ─── Blog posts ───────────────────────────────────────────────
export const BLOG_POSTS = [
  {id:1,tag:"Behavioral Psychology",date:"Mar 14, 2026",title:"The Silence Tax: What Financial Avoidance Really Costs You",excerpt:"Financial avoidance feels protective in the moment. But every bill you don't open has a compounding psychological cost.",body:"Financial avoidance feels protective in the moment. But every bill you don't open, every statement you ignore, has a compounding psychological cost that researchers call the Silence Tax.\n\nWhen we avoid something anxiety-provoking, our nervous system learns that avoidance works — it brings temporary relief. The problem is that the relief is temporary, and the underlying anxiety grows stronger.\n\nFor Avoiders, this creates a self-reinforcing cycle. Over months and years, the financial reality you've been avoiding becomes harder to face, not easier.",coverImage:"",emoji:"",author:"Dr. Aisha Bell",readTime:"4 min read",published:true,comments:[{id:1,author:"Sarah M.",text:"This really resonated.",time:"Mar 15",approved:true},{id:2,author:"Anonymous",text:"Spam content here…",time:"Mar 17",approved:false}]},
  {id:2,tag:"Behavioral Science",date:"Mar 7, 2026",title:"Why Willpower Fails Every Time (And What Actually Works)",excerpt:"Every personal finance book tells you to budget more and spend less. They're all missing the fundamental truth about how financial behaviour actually changes.",body:"Every personal finance book tells you to budget more and spend less.\n\nWillpower is a limited resource, and using it to fight money anxiety is like trying to stop a flood with a paper towel. Sustainable change comes from changing the environment, the cues, and the emotional meaning attached to the behaviour.",coverImage:"",emoji:"",author:"James Wright",readTime:"5 min read",published:true,comments:[{id:1,author:"Marcus T.",text:"Eye-opening perspective.",time:"Mar 16",approved:true}]},
  {id:3,tag:"Stress Profiles",date:"Feb 28, 2026",title:"Understanding Your Financial Stress Profile",excerpt:"There are three dominant patterns driving financial stress. Understanding yours is the first step to changing it.",body:"There are three dominant patterns driving financial stress, and most people fall clearly into one.\n\nThe Avoider protects themselves by not knowing. The Anxious Manager over-monitors and still feels behind. The Silent Stressor manages everything quietly and carries it alone.\n\nIdentifying your profile is the critical first step, because the intervention for each pattern is completely different.",coverImage:"",emoji:"",author:"Dr. Aisha Bell",readTime:"6 min read",published:true,comments:[]},
  {id:4,tag:"Research",date:"Feb 21, 2026",title:"The Income-Happiness Gap: Why More Money Doesn't Mean Less Stress",excerpt:"Why earning more doesn't make money feel better — and what the research says about what actually does.",body:"Studies consistently show that above a certain income threshold, additional earnings have almost no impact on day-to-day emotional wellbeing.\n\nFinancial stress is rarely about the numbers. It's about the story you inherited about what money means. Until you change the story, changing the numbers won't help.",coverImage:"",emoji:"",author:"James Wright",readTime:"5 min read",published:false,comments:[]},
];

// ─── FAQ items ────────────────────────────────────────────────
export const FAQS = [
  {id:1,q:"Is the 7-Day program really free?",a:"Yes — completely. No credit card required. Full access to the 7-day program, your Stress Profile, and the community.",category:"Pricing",published:true,order:1},
  {id:2,q:"What if the 30-Day Sprint doesn't work?",a:"If you complete all 30 missions and don't feel meaningfully calmer about money, email us. We'll refund in full.",category:"Pricing",published:true,order:2},
  {id:3,q:"Is this therapy?",a:"No. SerenityDecoded is a behavioral tools app. It is not a substitute for professional mental health care.",category:"General",published:true,order:3},
  {id:4,q:"What makes this different from a budgeting app?",a:"We don't track money. We change how money feels. The psychology first — the numbers sort themselves out.",category:"General",published:true,order:4},
  {id:5,q:"How long does each mission take?",a:"Most missions take 3–5 minutes. The goal is consistency, not duration.",category:"Product",published:true,order:5},
  {id:6,q:"Can I do the program alongside therapy?",a:"Absolutely. SerenityDecoded is designed to complement therapeutic work.",category:"General",published:false,order:6},
];

// ─── Admin accounts ────────────────────────────────────────────
export const ADMINS = [
  {id:1,name:"Admin User",email:"admin@serenitydecoded.com",role:"Super Admin",status:"active",lastLogin:"Mar 23, 2026 09:14 UTC",joined:"Jan 1, 2026",avatar:"AU",permissions:["view_dashboard","manage_users","manage_programs","manage_blog","manage_community","send_push","manage_templates","manage_scheduler","manage_memberships","view_payments","manage_admins","manage_config","view_logs"],twoFA:true,phone:"+1 555 000 0001",timezone:"UTC"},
  {id:2,name:"Priya Sharma",email:"priya.admin@serenitydecoded.com",role:"Content Editor",status:"active",lastLogin:"Mar 22, 2026 14:30 UTC",joined:"Feb 1, 2026",avatar:"PS",permissions:["view_dashboard","manage_programs","manage_blog","manage_community","manage_templates","manage_scheduler"],twoFA:false,phone:"",timezone:"Asia/Kolkata"},
  {id:3,name:"James Wright",email:"james.admin@serenitydecoded.com",role:"Support",status:"active",lastLogin:"Mar 20, 2026 11:00 UTC",joined:"Mar 1, 2026",avatar:"JW",permissions:["view_dashboard","manage_users","manage_community","send_push"],twoFA:false,phone:"+44 7911 123456",timezone:"Europe/London"},
  {id:4,name:"Nora Okafor",email:"nora.admin@serenitydecoded.com",role:"Content Editor",status:"inactive",lastLogin:"Mar 10, 2026 08:00 UTC",joined:"Feb 15, 2026",avatar:"NO",permissions:["view_dashboard","manage_programs","manage_blog","manage_community","manage_templates","manage_scheduler"],twoFA:false,phone:"",timezone:"UTC"},
];

// ─── Assessment questions ──────────────────────────────────────
export const QUESTIONS = [
  {id:1,q:"When you think about your bank account, your first feeling is usually...",opts:["Dread — I'd rather not look","Anxiety — I check it constantly","Numbness — I try not to think about it","Calm — I've made peace with it"],active:true},
  {id:2,q:"When a large unexpected expense comes up, your instinct is to...",opts:["Ignore it and hope it goes away","Obsessively calculate every scenario","Handle it quietly without telling anyone","Make a plan and move forward"],active:true},
  {id:3,q:"How often do you avoid opening bank emails or statements?",opts:["Almost always","More than I'd like to admit","Occasionally","Rarely or never"],active:true},
  {id:4,q:"When money comes up in conversation, you feel...",opts:["Overwhelmed — I change the subject","Exhausted — I can't stop analysing","Guarded — I keep my situation private","Comfortable — money is just a tool"],active:true},
  {id:5,q:"Your relationship with financial planning feels...",opts:["Like something I keep meaning to start","Like something I overdo yet feel unsure about","Like something I minimise to stay calm","Like something I do consistently"],active:true},
];

// ─── Mission actions ───────────────────────────────────────────
export const ACTIONS = [
  {id:1,day:1,title:"Understanding Your Pattern",profile:"all",type:"reflection",duration:3,body:"Today we begin by simply noticing — without judgment — how money feels in your body.",active:true,sentCount:1738},
  {id:2,day:2,title:"Naming the Feeling",profile:"all",type:"exercise",duration:3,body:"Give the feeling a name. Not a label — a description. Where do you feel it?",active:true,sentCount:1605},
  {id:3,day:3,title:"The Avoidance Map",profile:"avoider",type:"mapping",duration:3,body:"We map exactly what you avoid, when, and what the trigger is.",active:true,sentCount:1459},
  {id:4,day:4,title:"Your Money Origin Story",profile:"all",type:"journal",duration:5,body:"Write about your earliest money memory. No editing. Just what comes up.",active:true,sentCount:1255},
  {id:5,day:5,title:"The Guilt Cycle",profile:"all",type:"reflection",duration:3,body:"Notice the guilt cycle — the thought, the feeling, the avoidance, the shame.",active:true,sentCount:1102},
  {id:6,day:6,title:"Rewriting the Script",profile:"all",type:"exercise",duration:4,body:"One belief about money you inherited. One you'd choose instead.",active:true,sentCount:968},
  {id:7,day:7,title:"Building the Foundation",profile:"all",type:"milestone",duration:5,body:"Seven days. Something has shifted. Name it — even if it's small.",active:true,sentCount:793},
];

// ─── Cron schedulers ──────────────────────────────────────────
export const CRONS = [
  {id:1,name:"7-Day Program — All Users",program:"7day",profile:"all",plan:"all",time:"09:00",tz:"user",channel:"both",active:true,sentToday:1284,lastRun:"Mar 20 09:00",nextRun:"Mar 21 09:00",totalDelivered:8942,progress:43},
  {id:2,name:"7-Day Program — Avoiders",program:"7day",profile:"avoider",plan:"all",time:"09:00",tz:"user",channel:"both",active:true,sentToday:614,lastRun:"Mar 20 09:00",nextRun:"Mar 21 09:00",totalDelivered:4293,progress:52},
  {id:3,name:"30-Day Sprint — Premium",program:"30day",profile:"all",plan:"premium",time:"08:00",tz:"UTC",channel:"both",active:true,sentToday:221,lastRun:"Mar 20 08:00",nextRun:"Mar 21 08:00",totalDelivered:1845,progress:38},
  {id:4,name:"Re-engagement — Inactive",program:"7day",profile:"all",plan:"free",time:"11:00",tz:"UTC",channel:"email",active:false,sentToday:0,lastRun:"Mar 12 11:00",nextRun:"Paused",totalDelivered:892,progress:12},
];

// ─── Community Groups ──────────────────────────────────────────
export const COMMUNITY_GROUPS = [
  {
    id: "grp_1",
    name: "Avoiders Anonymous",
    description: "A safe space for those who struggle with financial avoidance. Share wins, setbacks, and strategies.",
    emoji: "🛡️",
    coverColor: "#0D7377",
    type: "public",
    messaging: "all",     // "all" | "admins_only"
    createdBy: 1,         // user id
    admins: [1, 6],       // user ids who are group admins
    members: [1, 2, 3, 4, 6, 7],
    pinned: ["msg_1"],
    createdAt: "Jan 20, 2026",
    lastActivity: "2 min ago",
    messageCount: 42,
  },
  {
    id: "grp_2",
    name: "30-Day Sprint Squad",
    description: "Accountability group for Premium members completing the 30-Day Sprint program together.",
    emoji: "🚀",
    coverColor: "#1A1A2E",
    type: "private",
    messaging: "all",
    createdBy: 6,
    admins: [6, 2],
    members: [2, 5, 6, 8],
    pinned: [],
    createdAt: "Feb 5, 2026",
    lastActivity: "1 hour ago",
    messageCount: 128,
  },
  {
    id: "grp_3",
    name: "SerenityDecoded Official",
    description: "Official announcements, new features, and updates from the SerenityDecoded team.",
    emoji: "📢",
    coverColor: "#B7860B",
    type: "public",
    messaging: "admins_only",
    createdBy: 0,         // 0 = platform admin
    admins: [0],
    members: [1, 2, 3, 4, 5, 6, 7, 8],
    pinned: ["msg_ann_1"],
    createdAt: "Dec 1, 2025",
    lastActivity: "Mar 22, 2026",
    messageCount: 15,
  },
];

export const COMMUNITY_MESSAGES = {
  grp_1: [
    { id:"msg_1", userId:1, text:"Welcome everyone! This is a space to share honestly about money avoidance without judgment. I'll start: I haven't opened my credit card statement in 4 months. Today I did.", type:"text", pinned:true, reactions:{heart:8,clap:5}, ts:"Jan 20 10:02" },
    { id:"msg_2", userId:6, text:"That took real courage. Day 1 here too — avoidance has cost me more in late fees than the actual bills would have been.", type:"text", pinned:false, reactions:{heart:6}, ts:"Jan 20 10:15" },
    { id:"msg_3", userId:2, text:"My pattern is opening statements then immediately closing the tab without reading them. Anyone else?", type:"text", pinned:false, reactions:{heart:11,laugh:3}, ts:"Jan 21 08:30" },
    { id:"msg_4", userId:3, text:"Every single time 😅 The anxiety hits before the tab even loads.", type:"text", pinned:false, reactions:{heart:7,laugh:8}, ts:"Jan 21 08:47" },
    { id:"msg_5", userId:1, text:"Week 2 update: opened AND read all three statements. Relief Score went from 35 → 52. The missions are actually working.", type:"text", pinned:false, reactions:{heart:14,clap:9}, ts:"Jan 28 20:00" },
    { id:"msg_6", userId:7, text:"Just joined today. Didn't know there was a name for what I've been doing. Feels validating to find this group.", type:"text", pinned:false, reactions:{heart:12}, ts:"Mar 1 09:00" },
  ],
  grp_2: [
    { id:"msg_7", userId:6, text:"Day 1 accountability check-in! What's your starting Relief Score? Mine is 62.", type:"text", pinned:false, reactions:{heart:3,clap:2}, ts:"Feb 5 07:00" },
    { id:"msg_8", userId:2, text:"Starting at 55. Let's go!", type:"text", pinned:false, reactions:{heart:4}, ts:"Feb 5 07:20" },
    { id:"msg_9", userId:5, text:"52 here. Nervous about Day 4 (the origin story mission).", type:"text", pinned:false, reactions:{heart:5}, ts:"Feb 5 08:00" },
    { id:"msg_10", userId:6, text:"Day 15 check-in: 74 now 🎉", type:"text", pinned:false, reactions:{heart:8,clap:6}, ts:"Feb 20 18:00" },
  ],
  grp_3: [
    { id:"msg_ann_1", userId:0, text:"🎉 SerenityDecoded v2.0 is live! New features: community groups, streak leaderboard, and the upgraded 30-Day Sprint program. Thank you for being part of this journey.", type:"text", pinned:true, reactions:{heart:44,clap:38}, ts:"Mar 22 09:00" },
  ],
};
