import {
  BsCaretRightFill,
  BsCaretLeftFill,
  BsVectorPen,
  BsFillFileTextFill,
  BsFillEnvelopeFill,
} from "react-icons/bs";
import { BiSolidCameraMovie } from "react-icons/bi";
import Link from "next/link";

const Options = () => {
  return (
    <div className="carousel w-full m-4 border border-1 border-t-0 border-r-0 border-l-0 ">
      <div id="blogpost" className="carousel-item relative w-full ">
        <div className="card w-full bg-base-100 ">
          <div className="card-body">
            <div className="grid  sm:grid-cols-4 gap-2  px-4">
              <div className="sm:col-span-1 grid place-items-center ">
                <BsFillFileTextFill
                  size={18}
                  className="object-cover w-10 h-20 prose"
                />
              </div>
              <div className="sm:col-span-2 grid place-items-center">
                {/* <h2 className="card-title">Cold E-mail</h2> */}
                <div className="flex flex-col gap-2 ">
                  <p className="font-bold prose">Blog Post</p>
                  <p className="text-sm prose">
                    If a dog chews shoes whose shoes does he choose?If a dog
                    chews shoes whose shoes does hoose?If a dog chews shoes who
                    shoes does he choose?If a dog chews shoes whose does he
                    choose?If a dog chews shoes whose shoes
                  </p>
                </div>
              </div>
              <div className="grid place-items-center ">
                <button className="btn flex-auto capitalize">
                  <Link href="/post/new">Start Writing</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#coldemail">
            <BsCaretLeftFill />
          </a>
          <a href="#moviescript">
            <BsCaretRightFill />
          </a>
        </div>
      </div>
      <div id="moviescript" className="carousel-item relative w-full">
        <div className="card w-full bg-base-100 ">
          <div className="card-body">
            <div className="grid sm:grid-cols-4 gap-2">
              <div className="sm:col-span-1 grid place-items-center   ">
                <BiSolidCameraMovie
                  size={18}
                  className="object-cover w-20 h-20 prose"
                />
              </div>
              <div className="sm:col-span-2 grid place-items-center">
                {/* <h2 className="card-title">Cold E-mail</h2> */}
                <div className="flex flex-col gap-2">
                  <p className="font-bold prose">Movie Script</p>
                  <p className="text-sm prose">
                    If a dog chews shoes whose shoes does he choose?If a dog
                    chews shoes whose shoes does hoose?If a dog chews shoes who
                    shoes does he choose?If a dog chews shoes whose does he
                    choose?If a dog chews shoes whose shoes
                  </p>
                </div>
              </div>
              <div className=" grid place-items-center ">
                <button className="btn flex-auto capitalize">
                  <Link href="/moviescript/new">Start Writing</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#blogpost">
            <BsCaretLeftFill />
          </a>
          <a href="#story">
            <BsCaretRightFill />
          </a>
        </div>
      </div>
      <div id="story" className="carousel-item relative w-full">
        <div className="card w-full bg-base-100 ">
          <div className="card-body">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-1 grid place-items-center ">
                <BsVectorPen
                  size={18}
                  className="object-cover w-20 h-20 prose"
                />
              </div>
              <div className="col-span-2 grid place-items-center">
                {/* <h2 className="card-title">Cold E-mail</h2> */}
                <div className="flex flex-col gap-2">
                  <p className="font-bold prose">Story</p>
                  <p className="text-sm prose">
                    If a dog chews shoes whose shoes does he choose?If a dog
                    chews shoes whose shoes does hoose?If a dog chews shoes who
                    shoes does he choose?If a dog chews shoes whose does he
                    choose?If a dog chews shoes whose shoes
                  </p>
                </div>
              </div>
              <div className=" grid place-items-center ">
                <button className="btn capitalize flex-auto">
                  <Link href="/storyIdea/new">Start Writing</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#moviescript">
            <BsCaretLeftFill />
          </a>
          <a href="#coldemail">
            <BsCaretRightFill />
          </a>
        </div>
      </div>
      <div id="coldemail" className="carousel-item relative w-full ">
        <div className="card w-full bg-base-100 ">
          <div className="card-body ">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-1 grid place-items-center ">
                <BsFillEnvelopeFill
                  size={18}
                  className="object-cover w-20 h-20 prose"
                />
              </div>
              <div className="col-span-2 grid place-items-center">
                {/* <h2 className="card-title">Cold E-mail</h2> */}
                <div className="flex flex-col gap-2 ">
                  <p className="font-bold prose">Cold E-mail</p>
                  <p className="text-sm">
                    If a dog chews shoes whose shoes does he choose?If a dog
                    chews shoes whose shoes does hoose?If a dog chews shoes who
                    shoes does he choose?If a dog chews shoes whose does he
                    choose?If a dog chews shoes whose shoes
                  </p>
                </div>
              </div>
              <div className=" grid place-items-center ">
                <button className="btn capitalize flex-auto">
                  <Link href="/coldemail/new">Start Writing</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#story">
            <BsCaretLeftFill />
          </a>
          <a href="#blogpost">
            <BsCaretRightFill />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Options;
