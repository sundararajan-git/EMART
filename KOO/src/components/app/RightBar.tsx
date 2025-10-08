import PopularTags from "./PopularTags";
import Recommendations from "./Recommendations";
import Search from "./Search";

const RightBar = () => {
  return (
    <div className="pt-4 flex flex-col gap-4 sticky top-0 h-max">
      <Search />
      <PopularTags />
      <Recommendations />
      <div className="text-textGray text-sm flex gap-x-4 flex-wrap">
        <a href="/">Terms of Service</a>
        <a href="/">Privacy Policy</a>
        <a href="/">Cookie Policy</a>
        <a href="/">Accessibility</a>
        <a href="/">Ads Info</a>
        <span>© 2025 L Corp.</span>
      </div>
    </div>
  );
};

export default RightBar;
