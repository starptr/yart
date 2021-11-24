import styles from './yutoji.module.scss';
import utilStyles from '../styles/utils.module.css';

export function Shortcode(props: { children: string }) {
  return <code className={`${styles.shortcode}`}>:{props.children}:</code>;
};
