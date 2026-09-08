import { ExternalIcon } from "../../../constants/icons";
import { useModal } from "../../../hooks/useModal";
import { ui } from "../../../i18n/zh-CN";
import s from "./Footer.module.css";

export function Footer() {
  const { showModalWithID } = useModal();

  return (
    <footer className={s.footer}>
      <div className={s.footerGrid}>
        <div className={s.footerCol}>
          <h3>{ui.about}</h3>
          <p>
            {ui.aboutText}
          </p>
        </div>
        <div className={s.footerCol}>
          <h3>{ui.contribute}</h3>
          <div className={s.contributeButtons}>
            <button
              className={s.footerBtn}
              onClick={() => showModalWithID("submit-tool")}
            >
              {ui.submitATool}
            </button>
            <a
              href="https://github.com/BraveOPotato/FckSignups/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ui.reportIssue} <ExternalIcon />
            </a>
          </div>
        </div>
        <div className={s.footerCol}>
          <h3>{ui.legal}</h3>
          <p>
            {ui.legalText}
          </p>
        </div>
      </div>
      <div className={s.footerBottom}>
        <p>
          © 2026 NOSIGNUPS /// {ui.curatedWithSpite} ///{" "}
          <a
            href="https://github.com/BraveOPotato/FckSignups"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>
        </p>
      </div>
    </footer>
  );
}
