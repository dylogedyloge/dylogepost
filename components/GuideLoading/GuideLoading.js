import Lottie from "lottie-react";
import animationData from "../../public/animation.json";

const GuideLoading = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Lottie animationData={animationData} />
    </div>
  );
};

export default GuideLoading;
