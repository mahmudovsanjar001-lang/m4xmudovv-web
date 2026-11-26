import { Fragment } from 'react'
import { motion } from 'motion/react'

// Word-by-word reveal for section headings.
export default function Heading({ children, as = 'h2', className = '' }) {
  const Tag = motion[as]
  const text = String(children)
  return (
    <Tag className={className} aria-label={text} initial="h" whileInView="v" viewport={{ once: true, margin: '-80px' }} variants={{ h: {}, v: { transition: { staggerChildren: 0.07 } } }}>
      {text.split(' ').map((w, i) => (
        <Fragment key={i}>{i > 0 && ' '}
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span className="inline-block" variants={{ h: { y: '110%' }, v: { y: 0 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}
