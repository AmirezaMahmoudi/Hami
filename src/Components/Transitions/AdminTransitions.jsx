import { motion } from "framer-motion"
const AdminTransitions = (Component) => {
    return (
        <>
            <Component/>

            <motion.div 
            className="fixed bg-slate-900 inset-0"
            initial={{opacity : 1}}
            animate={{opacity : 0}}
            exit={{opacity : 1}}
            >

            </motion.div>




        </>
    );
}

export default AdminTransitions;