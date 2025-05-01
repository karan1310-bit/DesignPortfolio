import { translate } from '../../anim';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <div className="flex flex-wrap items-start mt-6 text-[12px] md:text-xl font-satoshi uppercase">
      <ul className="w-1/2 lg:w-auto mt-2 md:hidden overflow-hidden list-none p-0">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          Currently A Freelance Developer
        </motion.li>
      </ul>
      <ul className="w-1/2 lg:w-auto mt-2 md:hidden overflow-hidden list-none p-0">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          Based In Ujjain, India
        </motion.li>
      </ul>
      <ul className="w-1/2 lg:w-auto mt-2 overflow-hidden list-none p-0">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          kfreelance131@gmail.com
        </motion.li>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          +91 722-592-8721
        </motion.li>
      </ul>
    </div>
  );
}
