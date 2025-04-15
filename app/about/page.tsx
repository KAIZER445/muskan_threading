import Layoutsone from "../about_layouts/Layoutsone";
import Layoutsthree from "../about_layouts/Layoutsthree";
import Layoutstwo from "../about_layouts/Layoutstwo";

export default function AboutPage(){
    return(
        <div className="container mx-auto">
             <Layoutsone />
             <Layoutstwo />
             <Layoutsthree />
        </div>
    )
}