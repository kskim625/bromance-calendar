import styles from '../../styles/Footer.module.css';

const Footer = () => {
  const FOOTER_COMMENT: string = 'Implemented with ';

  return (
    <footer className={styles.footer}>
      <div>
        {FOOTER_COMMENT}
        <a href="https://reactjs.org/">
          <span>React.js</span>
        </a>
      </div>
      <div>{'More matches are to be updated!'}</div>
    </footer>
  );
};

export default Footer;
