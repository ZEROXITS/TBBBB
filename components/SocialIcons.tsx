
import React from 'react';

const socialLinks = [
  { name: 'TikTok', user: 'f.yjs', url: 'https://www.tiktok.com/@f.yjs', icon: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.31-4.39-2.08-6.77.22-2.37 1.02-4.58 2.5-6.31 1.82-2.16 4.5-3.41 7.12-3.44.04 1.63.03 3.26.02 4.89-.95.16-1.85.55-2.63 1.11-1.03.73-1.72 1.89-1.82 3.13-.03.41-.02.82.02 1.23.11 1.07.63 2.09 1.41 2.75.93.8 2.22 1.11 3.48.95.86-.11 1.71-.45 2.43-.95.62-.43 1.11-.99 1.46-1.62.01-3.51.01-7.02.02-10.53z"/> },
  { name: 'Instagram', user: 'mn_moh.n', url: 'https://www.instagram.com/mn_moh.n', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></> },
  { name: 'Telegram', user: 'D_3_X', url: 'https://t.me/D_3_X', icon: <path d="M22 2L11 13L2 9L22 2ZM22 2L15 22L11 13L2 9L22 2Z"/> },
];

const SocialIcon: React.FC<{ link: typeof socialLinks[0] }> = ({ link }) => {
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" 
       className="relative group p-3 text-cyan-300 hover:text-white transition-all duration-300
                  transform hover:scale-125 hover:-translate-y-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
           className="drop-shadow-[0_0_8px_#00ffff] group-hover:drop-shadow-[0_0_15px_#ffffff]">
        {link.icon}
      </svg>
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-3 py-1 bg-black/50 backdrop-blur-sm 
                     rounded-md text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {link.name}: {link.user}
      </div>
    </a>
  );
};


const SocialIcons: React.FC = () => {
    return (
        <div className="absolute top-5 right-5 flex items-center space-x-4 z-30">
            {socialLinks.map((link) => (
                <SocialIcon key={link.name} link={link} />
            ))}
        </div>
    );
};

export default SocialIcons;
