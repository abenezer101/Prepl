"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'motion/react';
import { Terminal, Code2, Sparkles, ChevronRight } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Custom brand SVG components with premium hover states
const WalmartLogo = () => (
  <div className="group flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-[1px] select-none cursor-pointer px-5 py-2.5">
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-zinc-400 group-hover:text-amber-500 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(12, 12)">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <rect
            key={angle}
            x="-1.5"
            y="-9"
            width="3"
            height="6"
            rx="1.5"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    </svg>
    <span className="font-sans font-bold tracking-tight text-lg text-zinc-500 group-hover:text-zinc-900 transition-colors duration-300">Walmart</span>
  </div>
);

const McDonaldsLogo = () => (
  <div className="group flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-[1px] select-none cursor-pointer px-5 py-2.5">
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-zinc-400 group-hover:text-amber-500 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.243 3.006c2.066 0 3.742 8.714 3.742 19.478H24c0-11.588-3.042-20.968-6.766-20.968-2.127 0-4.007 2.81-5.248 7.227-1.241-4.416-3.121-7.227-5.231-7.227C3.031 1.516 0 10.888 0 22.476h3.014c0-10.763 1.658-19.47 3.724-19.47 2.066 0 3.741 8.05 3.741 17.98h2.997c0-9.93 1.684-17.98 3.75-17.98Z" />
    </svg>
    <span className="font-sans font-bold tracking-tight text-lg text-zinc-500 group-hover:text-zinc-900 transition-colors duration-300">McDonald&apos;s</span>
  </div>
);

const StarbucksLogo = () => (
  <div className="group flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-[1px] select-none cursor-pointer px-5 py-2.5">
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-zinc-400 group-hover:text-emerald-600 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.2072 5.2801c-.1052-.0188-.6126-.104-1.2072-.104s-1.102.0848-1.2072.104c-.0605.0108-.0837-.0484-.0377-.0828.0417-.0308 1.2445-.9463 1.2445-.9463l1.244.9463c.0469.0344.024.0936-.0364.0828zm-2.0783 5.9446s-.0636.0228-.0804.0788c.252.1937.4257.6343.9515.6343s.6995-.4406.9511-.6343c-.0164-.0564-.08-.0788-.08-.0788s-.3293.0776-.8711.0776c-.5418 0-.8711-.0776-.8711-.0776zM12 10.4832c-.146 0-.178-.0552-.2777-.0548-.0948.0004-.2789.076-.319.1453a.1542.1542 0 00.0413.0948c.2129.032.309.1505.5558.1505.2469 0 .3425-.1185.5558-.1505a.1579.1579 0 00.0412-.0948c-.0396-.0692-.224-.1445-.3193-.1453-.1-.0008-.1324.0548-.2781.0548zm11.9868 2.27a11.964 11.964 0 01-.076.8528c-1.359.2249-1.8447-.986-3.2368-.9252.0832.2954.1508.5963.2029.9036 1.148-.0008 1.6105 1.0724 2.8878.9143-.0672.3281-.148.6519-.2413.9708-1.01.0992-1.3657-.9044-2.5345-.8767.0096.1664.0148.3345.0148.5041l-.0048.2805 2.2696.866a12.04 12.04 0 01-.3965.9479c-.6823-.0376-.9175-.9127-1.9555-.8431a9.0882 9.0882 0 01-.118.665c.9015-.0632 1.0955.7667 1.7414.834a12.2317 12.2317 0 01-.5302.8767c-.3826-.205-.7143-.8231-1.4398-.8612a8.6035 8.6035 0 00.195-.6994c-.6435 0-1.3794-.2509-1.9964-.8127.2-1.1388-1.5674-2.2984-1.5674-3.1324 0-.9059.4582-1.4073.4582-2.6285 0-.9063-.4402-1.8895-1.104-2.5614a2.2175 2.2175 0 00-.4114-.3309c.6098.7547 1.078 1.6494 1.078 2.6858 0 1.15-.535 1.757-.535 2.8186 0 1.0612 1.5526 1.9796 1.5526 3.074 0 .4305-.1377.851-.5914 1.677.697.6962 1.605 1.076 2.1908 1.076.19 0 .292-.058.3601-.2073a9.0925 9.0925 0 00.1665-.391c.631.0245.9199.5979 1.2692.8268-.1916.2573-.393.5057-.6038.7462-.234-.2593-.5486-.6954-1.0092-.8167a9.2087 9.2087 0 01-.2613.473c.3966.108.6679.5082.878.7715a12.1305 12.1305 0 01-.7075.6754c-.1532-.2384-.3917-.541-.659-.7042a8.3639 8.3639 0 01-.3077.391c.2272.154.4277.4313.5586.6574-.2833.2272-.5763.443-.8796.6446-.1496-1.2192-1.8138-2.0548-1.3653-3.4693-.1472.2493-.3229.561-.3229.9364 0 1.024 1.0908 1.8366 1.1776 2.8542-.226.1353-.4573.2625-.693.383-.0392-1.1185-1.194-2.3425-1.194-3.2604 0-1.0248 1.342-2.054 1.342-3.2636 0-1.2105-1.5485-2.0484-1.5485-3.1112 0-1.062.6586-1.673.6586-3.0343 0-.9972-.4738-2.0063-1.2056-2.651-.1297-.1144-.2573-.2052-.4106-.2849.6903.828 1.0904 1.579 1.0904 2.7186 0 1.2801-.7546 1.9908-.7546 3.244 0 1.2537 1.5197 1.9507 1.5197 3.1192 0 1.1684-1.4145 2.1532-1.4145 3.3536 0 1.092 1.2468 2.182 1.2653 3.4777a11.7704 11.7704 0 01-.8327.3257c.1584-1.3089-1.245-2.659-1.245-3.727 0-1.1676 1.4674-2.1712 1.4674-3.43 0-1.2597-1.4917-1.8451-1.4917-3.138 0-1.292.9151-2.0075.9151-3.4352 0-1.1129-.5494-2.1136-1.352-2.7338l-.0509-.0385c-.0756-.056-.138.0116-.0844.078.5682.7095.8719 1.427.8719 2.4894 0 1.306-1.0512 2.3673-1.0512 3.6325 0 1.4934 1.4117 1.9203 1.4117 3.1456 0 1.2248-1.5137 2.2048-1.5137 3.5053 0 1.206 1.4325 2.5445 1.1868 3.9366a11.6645 11.6645 0 01-.8743.192c.2689-1.7334-1.1364-2.9782-1.1364-4.1122 0-1.2277 1.5677-2.322 1.5677-3.5217 0-1.1316-1.1252-1.5014-1.2732-2.659-.0204-.158-.1473-.2753-.3221-.2461-.2285.0416-.5214.192-.9816.192-.4602 0-.753-.1508-.982-.192-.1744-.0288-.3013.0884-.3217.246-.1476 1.1577-1.2736 1.527-1.2736 2.659 0 1.1997 1.5681 2.2937 1.5681 3.5218 0 1.134-1.4053 2.3788-1.1368 4.1123a12.1233 12.1233 0 01-.8743-.1921c-.2457-1.3921 1.1872-2.7306 1.1872-3.9366 0-1.3005-1.5141-2.2805-1.5141-3.5053 0-1.2253 1.412-1.6522 1.412-3.1456 0-1.2652-1.0515-2.326-1.0515-3.6325 0-1.062.3037-1.7795.8723-2.4893.0532-.0665-.0088-.134-.0848-.078l-.0504.0384c-.802.6186-1.351 1.6193-1.351 2.7322 0 1.4277.9152 2.1431.9152 3.4352 0 1.2925-1.4917 1.878-1.4917 3.138 0 1.2588 1.4673 2.2624 1.4673 3.43 0 1.0684-1.4033 2.4181-1.2445 3.727a11.8995 11.8995 0 01-.833-.3257c.0188-1.2957 1.2648-2.3861 1.2648-3.4777 0-1.2004-1.4137-2.1852-1.4137-3.3536 0-1.1685 1.519-1.8655 1.519-3.1192 0-1.2532-.7543-1.9639-.7543-3.244 0-1.1396.3997-1.8907 1.09-2.7186-.1537.0797-.281.1705-.4102.285-.7318.6446-1.2052 1.6537-1.2052 2.651 0 1.3612.6586 1.9722.6586 3.0342 0 1.0628-1.5485 1.9007-1.5485 3.1112 0 1.2096 1.342 2.2392 1.342 3.2636 0 .9183-1.1556 2.1423-1.1944 3.2604a11.8754 11.8754 0 01-.693-.383c.0872-1.0176 1.1776-1.8303 1.1776-2.8542 0-.3754-.1753-.687-.323-.9364.4486 1.4145-1.2156 2.25-1.3652 3.4693a12.1204 12.1204 0 01-.8796-.6446c.1305-.2257.331-.5034.5586-.6575a7.9134 7.9134 0 01-.3077-.391c-.2677.1633-.5066.4659-.6594.7043a12.2459 12.2459 0 01-.707-.6754c.21-.2633.4813-.6635.8779-.7715a9.0433 9.0433 0 01-.2613-.473c-.4606.1213-.7755.5574-1.0092.8167a12.141 12.141 0 01-.6038-.7462c.3493-.229.6382-.8027 1.2688-.8267.0529.1312.1085.2617.1669.3909.068.1493.1705.2073.3601.2073.5858 0 1.4934-.3798 2.1908-1.076-.4537-.826-.5914-1.2465-.5914-1.677 0-1.094 1.5526-2.0124 1.5526-3.074 0-1.0615-.535-1.6686-.535-2.8186 0-1.0364.4682-1.9311 1.078-2.6858a2.2175 2.2175 0 00-.4114.331c-.6638.6722-1.104 1.655-1.104 2.5613 0 1.2212.4586 1.7226.4586 2.6285 0 .834-1.7679 1.9936-1.5678 3.1324-.617.5618-1.3529.8127-1.9967.8127a9.305 9.305 0 00.1949.6994c-.7251.0385-1.0568.6567-1.4398.8612a12.0872 12.0872 0 01-.5302-.8768c.6455-.0672.84-.897 1.7419-.8339a9.1275 9.1275 0 01-.1185-.665c-1.038-.0696-1.2732.8059-1.9555.8431a12.04 12.04 0 01-.3965-.948l2.27-.8659-.0048-.2805c0-.1696.0052-.3377.0144-.5041-1.1688-.0273-1.5246.976-2.5345.8767a12.106 12.106 0 01-.241-.9708c1.2766.158 1.7395-.9151 2.888-.9143a8.7482 8.7482 0 01.2024-.9036c-1.392-.0604-1.8779 1.1505-3.2364.9252a11.7352 11.7352 0 01-.076-.8527c1.5794.1764 2.1716-1.122 3.6097-.9632a8.4303 8.4303 0 01.471-.9963c-1.803-.317-2.4153 1.1908-4.0935.9591C.1813 5.2805 5.4844.0898 12 .0898S23.8187 5.2805 24 11.753c-1.6786.2317-2.2908-1.2757-4.0935-.9591.1773.32.335.6526.471.9963 1.4373-.1592 2.0295 1.1396 3.6093.9632zm-17.147-5.035c-.884-.3613-1.954-.278-2.868.309-.1416-.8504-.603-1.6058-1.26-2.0616-.0908-.0628-.1853-.0032-.1769.102.1389 1.7967-.9115 3.3569-2.2032 4.7282 1.3313.4001 2.4645-1.3141 4.1912-.7159a9.0364 9.0364 0 012.3168-2.3617z" />
    </svg>
    <span className="font-sans font-bold tracking-tight text-lg text-zinc-500 group-hover:text-zinc-900 transition-colors duration-300">Starbucks</span>
  </div>
);

const TargetLogo = () => (
  <div className="group flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-[1px] select-none cursor-pointer px-5 py-2.5">
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-zinc-400 group-hover:text-red-600 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0005 0C18.627 0 24 5.373 24 12.0005 24 18.627 18.627 24 11.9995 24 5.373 24 0 18.627 0 11.9995 0 5.373 5.373 0 12.0005 0zm0 19.826a7.8265 7.8265 0 10-.001-15.652C7.7133 4.2246 4.2653 7.7136 4.2653 12c0 4.2864 3.448 7.7754 7.7342 7.826h.001zm0-3.9853a3.8402 3.8402 0 110-7.6803c2.1204.0006 3.839 1.7197 3.839 3.8401s-1.7186 3.8396-3.839 3.8402z" />
    </svg>
    <span className="font-sans font-bold tracking-tight text-lg text-zinc-500 group-hover:text-zinc-900 transition-colors duration-300">Target</span>
  </div>
);

const CostcoLogo = () => (
  <div className="group flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-[1px] select-none cursor-pointer px-5 py-2.5">
    <div className="flex items-baseline gap-[2px] font-sans font-black tracking-tight text-xl italic select-none">
      <span className="text-zinc-400 group-hover:text-red-600 transition-colors duration-300">COSTCO</span>
      <span className="text-[8px] not-italic font-bold tracking-widest uppercase text-zinc-400 group-hover:text-zinc-500 transition-colors duration-300">WHOLESALE</span>
    </div>
  </div>
);

const AmazonLogo = () => (
  <div className="group flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-[1px] select-none cursor-pointer px-5 py-2.5">
    <div className="flex items-center gap-1 font-sans font-bold tracking-tight text-xl select-none pt-0.5">
      <span className="text-zinc-500 group-hover:text-zinc-900 transition-colors duration-300">amazon</span>
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2 text-zinc-400 group-hover:text-amber-500 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 14c4 3 14 3 18 0M17 13.5l4.5 2.5-1.5-5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </div>
);

const FedExLogo = () => (
  <div className="group flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-[1px] select-none cursor-pointer px-5 py-2.5">
    <div className="flex items-baseline gap-[1px] font-sans font-black tracking-tighter text-xl select-none">
      <span className="text-zinc-500 group-hover:text-indigo-800 transition-colors duration-300">Fed</span>
      <span className="bg-zinc-200/70 group-hover:bg-amber-100 group-hover:text-amber-700 px-0.5 rounded-sm transition-colors duration-300 text-zinc-600">Ex</span>
    </div>
  </div>
);

const LOGOS = [
  { id: 'walmart', component: WalmartLogo },
  { id: 'mcdonalds', component: McDonaldsLogo },
  { id: 'starbucks', component: StarbucksLogo },
  { id: 'target', component: TargetLogo },
  { id: 'costco', component: CostcoLogo },
  { id: 'amazon', component: AmazonLogo },
  { id: 'fedex', component: FedExLogo }
];

const CAROUSEL_ITEMS = [...LOGOS, ...LOGOS, ...LOGOS];

export function HeroSection() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="relative w-full pt-2 flex flex-col overflow-hidden">
      {/* Background Image with smooth load fade-in */}
      <div className="absolute inset-x-0 -top-10 bottom-0 z-0 pointer-events-none overflow-hidden select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: imgLoaded ? 1.0 : 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/hero-bg.png"
            alt="Hero Background"
            fill
            priority
            quality={90}
            className="object-contain object-top"
            onLoad={() => setImgLoaded(true)}
          />
        </motion.div>
      </div>

      <div className="px-6 max-w-[1200px] mx-auto text-center w-full pb-20 relative z-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl mx-auto relative z-10"
        >
        {/* Top badge */}
        <motion.div variants={fadeInUp} className="mb-2">
          <div className="px-4 py-1.5 text-xs font-semibold tracking-widest text-zinc-500 uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            INTRODUCING PREPL
          </div>
        </motion.div>
        
        {/* Headline */}
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          <span className="text-zinc-900">Most People Fail Interviews</span> <br />
          <span className="text-zinc-700 text-4xl md:text-5xl">Before They Walk Into The Room.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.div variants={fadeInUp} className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Practice. Improve. Get hired.
          <p className="text-zinc-500 text-base md:text-lg font-normal mt-3">
            Practice realistic interviews, get instant feedback, and walk into every interview with confidence.
          </p>
        </motion.div>
        
        {/* Dual CTAs */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mb-8">
          <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto bg-gradient-to-b from-zinc-200/50 to-transparent p-[4px] rounded-full inline-flex">
            <Link href="/signup" className="w-full group p-[4px] rounded-full bg-gradient-to-b from-stone-200 to-stone-300 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_0_20px_rgba(96,165,250,0.15)] active:shadow-[0_0px_1px_rgba(0,0,0,0.08)] active:scale-[0.995] transition-all duration-300 cursor-pointer text-center">
              <div className="bg-gradient-to-b from-stone-100 to-stone-200 rounded-full px-6 py-2.5">
                <div className="flex gap-2 items-center justify-center">
                  <span className="font-semibold text-stone-900">Practice for Free</span>
                  <ChevronRight className="w-4 h-4 text-stone-900" />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div whileTap={{ scale: 0.98 }} className="w-full sm:w-auto bg-gradient-to-b from-zinc-200/20 to-transparent p-[4px] rounded-full inline-flex">
            <Link href="/signup" className="w-full group p-[4px] rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-850 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_0_20px_rgba(96,165,250,0.1)] active:scale-[0.995] transition-all duration-300 cursor-pointer text-center">
              <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-full px-6 py-2.5">
                <div className="flex gap-2 items-center justify-center">
                  <span className="font-semibold text-white">See Sample Report</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* The Hero Asset - Product Blueprint Simulator */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="w-full relative max-w-5xl mx-auto z-10"
      >
         <div className="p-2 sm:p-4 rounded-lg bg-white border border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl">
            <div className="rounded-lg overflow-hidden bg-white border border-zinc-200 flex flex-col h-[500px] text-left">
               {/* Header Bar */}
               <div className="h-12 border-b border-zinc-200 bg-zinc-50 flex items-center px-4 justify-between">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
                     <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
                     <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
                  </div>
                  <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                     <Terminal className="w-3.5 h-3.5" /> prepl-session-dashboard
                  </div>
                  <div className="w-12"></div>
               </div>
               {/* Body */}
               <div className="flex-1 flex overflow-hidden">
                  {/* Sidebar Prep Context */}
                  <div className="w-1/3 border-r border-zinc-200 bg-zinc-50 p-4 hidden md:block">
                     <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold mb-4 uppercase tracking-wider">
                       <Code2 className="w-4 h-4" /> Prep Checklist
                     </div>
                     <div className="space-y-2 font-mono text-sm text-zinc-600">
                        <div className="text-zinc-900 font-semibold">Active Prep</div>
                        <div className="pl-4">Behavioral</div>
                        <div className="pl-8 text-zinc-800 font-semibold">STAR Method <span className="text-zinc-400 ml-2 text-xs">● Active</span></div>
                        <div className="pl-8">Clarity & Pace</div>
                        <div className="pl-4 text-zinc-900 font-semibold">Role-Specific</div>
                        <div className="pl-4">Follow-ups</div>
                     </div>
                  </div>
                  {/* Main Viewer */}
                  <div className="flex-1 flex flex-col relative bg-zinc-50/50">
                     <div className="p-6 font-mono text-sm text-zinc-600 space-y-4">
                        <div className="animate-pulse flex items-center gap-2 text-zinc-800"><Sparkles className="w-4 h-4"/> Prepl analyzing communication pace...</div>
                        <div className="text-green-600">▶ Assessing tone & composure... [COMPLETE]</div>
                        <div>Evaluating behavioral response structure...</div>
                        <div className="bg-white border border-zinc-200 p-4 rounded-lg mt-4 text-zinc-700">
                           <span className="text-indigo-600 font-semibold">Feedback summary:</span>
                           <br />&nbsp;&nbsp;<span className="text-zinc-400">{"// Strong breakdown of the situation and action."}</span>
                           <br />&nbsp;&nbsp;<span className="text-zinc-800 font-semibold">Result: Highly structured, persuasive delivery.</span>
                        </div>
                     </div>
                     <div className="absolute bottom-6 left-6 right-6">
                        <div className="rounded-xl bg-white border border-zinc-200 p-4 shadow-lg flex justify-between items-center">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                                 <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                              </div>
                              <div>
                                 <div className="text-sm font-semibold text-zinc-900">Mock Interview Session</div>
                                 <div className="text-xs text-zinc-500">Candidate: Alex K. • Confidence Score: 94%</div>
                              </div>
                           </div>
                            <div className="bg-gradient-to-b from-white to-transparent p-[3px] rounded-xl flex justify-center items-center">
                              <button className="group p-[3px] rounded-lg bg-gradient-to-b from-stone-200 to-stone-300 shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_0_15px_rgba(96,165,250,0.15)] active:shadow-[0_0px_1px_rgba(0,0,0,0.08)] active:scale-[0.995] transition-all duration-300 cursor-pointer">
                                 <div className="bg-gradient-to-b from-stone-100 to-stone-200 rounded-md px-3 py-1.5">
                                   <div className="flex gap-2 items-center justify-center">
                                     <span className="text-xs font-bold text-stone-900">Review Feedback</span>
                                   </div>
                                 </div>
                              </button>
                            </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
      </div>

      {/* Companies Section */}
      <div className="mt-2 mb-0 text-center max-w-2xl mx-auto relative z-10 px-4">
        <h2 className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-1">
          Our Candidates Land Offers
        </h2>
        <p className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
          Where Prepl users walk in ready.
        </p>
      </div>

      {/* Infinite Carousel Section */}
      <div className="w-full relative z-10 overflow-hidden py-2">
        {/* Left & Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#fbf8f3] via-[#fbf8f3]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#fbf8f3] via-[#fbf8f3]/90 to-transparent z-20 pointer-events-none" />

        <div className="animate-infinite-scroll flex gap-8 items-center py-1">
          {CAROUSEL_ITEMS.map((item, idx) => {
            const LogoComponent = item.component;
            return (
              <div key={`${item.id}-${idx}`} className="flex-shrink-0">
                <LogoComponent />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[700px] bg-gradient-to-t from-[#fbf8f3] via-[#fbf8f3]/90 to-transparent pointer-events-none z-[1]"></div>
    </section>
  );
}
