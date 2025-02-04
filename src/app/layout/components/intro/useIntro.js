import { useDispatch, useSelector } from "react-redux";
import { SET_COMPLETE_INTRO } from "../../../../store/actions/actions";

function useIntro() {
  const dispatch = useDispatch();
  const introDone = useSelector((state) => state.ui.introCompleted);

  const hanleCompleteIntro = () => {
    dispatch(SET_COMPLETE_INTRO());
  };

  return { introDone, completeIntro: hanleCompleteIntro };
}

export default useIntro;
