import Feed from "@/components/app/Feed";
import LeftBar from "@/components/app/LeftBar";
import Share from "@/components/app/Share";
import RightBar from "@/components/app/RightBar";
import PostModal from "./PostModal";
import UserPage, { StatusPage } from "./UserPage";

const Homepage = () => {
  return (
    <div className="">
      <div className="px-4 pt-4 flex justify-between text-textGray font-bold border-b-[1px] border-borderGray">
        <a
          className="pb-3 flex items-center border-b-4 border-iconBlue"
          href="/"
        >
          For you
        </a>
        <a className="pb-3 flex items-center" href="/">
          Following
        </a>
        <a className="hidden pb-3 md:flex items-center" href="/">
          React.js
        </a>
        <a className="hidden pb-3 md:flex items-center" href="/">
          Javascript
        </a>
        <a className="hidden pb-3 md:flex items-center" href="/">
          CSS
        </a>
      </div>
      <Share />
      <Feed />
    </div>
  );
};

export default Homepage;

export const Out = () => {
  return (
    <>
      <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
        <div className="px-2 xsm:px-4 xxl:px-8 ">
          <LeftBar />
        </div>
        <div className="flex-1 lg:min-w-[600px] border-x-[1px] border-borderGray ">
          {true ? (
            <UserPage />
          ) : (
            // <StatusPage />
            <>
              <Homepage />
              {!true ? <PostModal /> : null}
            </>
          )}
        </div>
        <div className="hidden lg:flex ml-4 md:ml-8 flex-1 ">
          <RightBar />
        </div>
      </div>
    </>
  );
};
