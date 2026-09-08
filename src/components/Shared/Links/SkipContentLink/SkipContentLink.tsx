import s from "./SkipContentLink.module.css";

const SkipContentLink = () => {
  return (
    <a className={s.skipLink} href="#main-content" target="_self">
      跳转到主要内容
    </a>
  );
};

export default SkipContentLink;
