/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Third-party imports
import { motion } from "framer-motion";

/* ––
 * –––– Component declaration
 * –––––––––––––––––––––––––––––––––– */
export default function MotionDiv(props: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...props}
    >
      {props.children}
    </motion.div>
  );
}
