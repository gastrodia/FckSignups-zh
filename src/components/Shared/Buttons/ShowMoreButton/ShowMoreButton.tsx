import { Tool } from "../../../../types";
import { ui } from "../../../../i18n/zh-CN";
import s from "./ShowMoreButton.module.css";

interface ShowMoreButtonProps {
  setShowMore: (value: boolean) => void;
  meetsCriteria: Tool[];
}

const ShowMoreButton = ({
  setShowMore,
  meetsCriteria,
}: ShowMoreButtonProps) => {
  return (
    <div className={s.showMoreWrap}>
      <button
        type="button"
        className={s.showMoreBtn}
        onClick={() => setShowMore(true)}
      >
        <strong>{ui.showMore} </strong>
        <p>{ui.moreToolMeets(meetsCriteria.length)}</p>
      </button>
    </div>
  );
};
export default ShowMoreButton;
