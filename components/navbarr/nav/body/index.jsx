import { motion } from 'framer-motion';
import Link from 'next/link';
import { blur, translate } from '../../anim';

export default function Body({ links, selectedLink, setSelectedLink }) {
  const getChars = (word) => {
    return word.split('').map((char, i) => (
      <motion.span
        custom={[i * 0.02, (word.length - i) * 0.01]}
        variants={translate}
        initial="initial"
        animate="enter"
        exit="exit"
        key={char + i}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <div className="flex flex-wrap mt-10 font-satoshi lg:mt-20 max-w-full lg:max-w-[1200px]">
      {links.map((link, index) => {
        const { title, href } = link;
        return (
          <Link key={`l_${index}`} href={href} className="no-underline uppercase text-black">
            <motion.p
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index ? 'open' : 'closed'
              }
              className="m-0 flex overflow-hidden font-satoshi text-[32px] lg:text-[5vw] pr-[20px] lg:pr-[2vw] pt-[10px] font-normal"
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
}
