import Leftsidebar from "./Leftsidebar";
import CategoryTab from "./CategoryTab";
import FeaturesItems from "./FeaturesItems";
import RecommendedItems from "./RecommendedItems";
function SliderContent() {
  return (
    <>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-sm-3">
              <Leftsidebar />
            </div>

            <div class="col-sm-9 padding-right">
              <FeaturesItems />
              <CategoryTab />
              <RecommendedItems />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default SliderContent;
