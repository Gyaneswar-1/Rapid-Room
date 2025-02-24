import React from 'react';
import { motion } from 'framer-motion';

interface MenuItemsProps {
  onClick: () => void;
  label: string;
  style?: string;
}

const MenuItem: React.FC<MenuItemsProps> = ({ onClick, label, style }) => {
  const itemVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={itemVariants}
      onClick={onClick}
      className={`px-4  py-1.5 hover:bg-neutral-200 rounded-md m-1 transition ${style}`}
    >
      {label}
    </motion.div>
  );
};

export default MenuItem;
