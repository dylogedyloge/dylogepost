// import { withPageAuthRequired } from "@auth0/nextjs-auth0";
// import { AppLayout } from "../../components/AppLayout";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { getAppProps } from "../../utils/getAppProps";

// export default function NewPost(props) {
//   const router = useRouter();

//   const [topic, setTopic] = useState("");
//   const [keywords, setKeywords] = useState("");
//   const [generating, setGenerating] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setGenerating(true);
//     try {
//       const response = await fetch(`/api/generatePost`, {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({ topic, keywords }),
//       });
//       const json = await response.json();

//       if (json?.postId) {
//         router.push(`/post/${json.postId}/editor`);
//       }
//     } catch (e) {
//       setGenerating(false);
//     }
//   };
//   return (
//     <div className="grid place-items-center min-h-screen ">
//       {!!generating && (
//         <div className=" grid h-screen place-items-center ">
//           {" "}
//           <span className="loading loading-ring loading-sm"></span>
//         </div>
//       )}
//       {!generating && (
//         <div className="min-h-screen grid place-items-center overflow-auto mx-2 ">
//           <form
//             onSubmit={handleSubmit}
//             className="card border border-1 bg-base-100 w-fit shadow-xl p-10 "
//           >
//             <div className="mb-5 ">
//               <label className="label grid place-content-center mb-4">
//                 <span className="label-text text-md font-semibold prose">
//                   Topic
//                 </span>
//               </label>
//               <textarea
//                 placeholder="Top 10 tips for happiness prose"
//                 className="textarea border border-1 w-full"
//                 value={topic}
//                 onChange={(e) => setTopic(e.target.value)}
//                 maxLength={80}
//               />
//             </div>
//             <div className="mb-10">
//               <label className="label grid place-content-center mb-4">
//                 <span className="label-text text-md font-semibold prose ">
//                   Keywords (Seperate with comma)
//                 </span>
//               </label>
//               <textarea
//                 placeholder="happines, self-steem, Anthony Robins"
//                 className="textarea w-full border border-1 prose"
//                 value={keywords}
//                 onChange={(e) => setKeywords(e.target.value)}
//                 maxLength={80}
//               />
//             </div>
//             <button
//               type="submit"
//               className="btn btn-block capitalize"
//               disabled={!topic.trim() || !keywords.trim()}
//             >
//               Generate stroy
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// NewPost.getLayout = function getLayout(page, pageProps) {
//   return <AppLayout {...pageProps}>{page}</AppLayout>;
// };

// export const getServerSideProps = withPageAuthRequired({
//   async getServerSideProps(ctx) {
//     const props = await getAppProps(ctx);
//     if (!props.availableTokens) {
//       return {
//         redirect: {
//           destination: "/token-topup",
//           permanent: false,
//         },
//       };
//     }
//     return {
//       props,
//     };
//   },
// });

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { BsFillXSquareFill, BsPlusSquareFill } from "react-icons/bs";

export default function NewMoviescript(props) {
  const router = useRouter();
  const [genre, setGenre] = useState("");
  const [characters, setCharacters] = useState([
    { name: "", age: "", description: "" },
  ]);
  const [generating, setGenerating] = useState(false);

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleCharacterChange = (index, field, value) => {
    const updatedCharacters = [...characters];
    updatedCharacters[index] = { ...updatedCharacters[index], [field]: value };
    setCharacters(updatedCharacters);
  };

  const handleAddCharacter = () => {
    setCharacters([...characters, { name: "", age: "", description: "" }]);
  };

  const handleRemoveCharacter = (index) => {
    const updatedCharacters = [...characters];
    updatedCharacters.splice(index, 1);
    setCharacters(updatedCharacters);
  };

  // const handleSubmit = (e) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const response = await fetch(`/api/generateMoviescriptIdeas`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ genre, characters }),
      });
      const json = await response.json();

      if (json?.moviescriptId) {
        router.push(`/moviescript/${json.moviescriptId}/editor`);
      }
    } catch (e) {
      setGenerating(false);
    }
    // console.log({
    //   genre,
    //   characters,
    // });
  };

  return (
    <div className="grid place-items-center min-h-screen ">
      {!!generating && (
        <div className=" grid h-screen place-items-center ">
          {" "}
          <span className="loading loading-ring loading-sm"></span>
        </div>
      )}
      {!generating && (
        <div className="min-h-screen grid place-items-center overflow-auto mx-2 ">
          <form
            onSubmit={handleSubmit}
            className="card border border-1  w-fit shadow-xl p-10 "
          >
            <div className=" grid grid-cols-5 ">
              <div className="mb-5 col-span-5">
                <label className="label" htmlFor="genre">
                  <span className="label-text text-md  prose-sm">Genre:</span>
                </label>
                <select
                  className="select select-bordered w-full  "
                  id="genre"
                  value={genre}
                  onChange={handleGenreChange}
                >
                  <option disabled selected value="">
                    Select a genre
                  </option>
                  <option value="horror" className="prose-sm">
                    Horror
                  </option>
                  <option value="action" className="prose-sm">
                    Action
                  </option>
                  <option value="detective" className="prose-sm">
                    Detective
                  </option>
                </select>
              </div>
              {characters.map((character, index) => (
                <div
                  key={index}
                  className="mb-10 col-span-5  grid grid-cols-6 gap-4 card border border-1 p-10 relative"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveCharacter(index)}
                    className={`btn btn-square btn-ghost btn-xs absolute top-4 right-4 prose-sm ${
                      index === 0 ? "hidden" : ""
                    }`}
                  >
                    <BsFillXSquareFill size={18} />
                  </button>
                  <p className="text-md text-center font-semibold mb-4 col-span-6 prose-sm">
                    Character {index + 1}
                  </p>

                  <div className="form-control w-full col-span-3 ">
                    <label className="label">
                      <span
                        className="label-text prose-sm"
                        htmlFor={`name-${index}`}
                      >
                        Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full prose-sm"
                      onChange={(e) =>
                        handleCharacterChange(index, "name", e.target.value)
                      }
                      value={character.name}
                      id={`name-${index}`}
                    />
                  </div>
                  <div className="form-control w-full col-span-3  ">
                    <label className="label">
                      <span
                        className="label-text prose-sm"
                        htmlFor={`age-${index}`}
                      >
                        Age
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs prose-sm"
                      value={character.age}
                      onChange={(e) =>
                        handleCharacterChange(index, "age", e.target.value)
                      }
                      id={`age-${index}`}
                    />
                  </div>

                  <div className="form-control col-span-6">
                    <label className="label">
                      <span
                        className="label-text prose-sm "
                        htmlFor={`description-${index}`}
                      >
                        Description
                      </span>
                    </label>
                    <textarea
                      id={`description-${index}`}
                      className="textarea textarea-bordered h-24 prose-sm"
                      placeholder="Character description"
                      value={character.description}
                      onChange={(e) =>
                        handleCharacterChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    ></textarea>
                  </div>

                  <button
                    className="btn col-span-6 "
                    type="button"
                    onClick={handleAddCharacter}
                  >
                    <BsPlusSquareFill />
                    <div className="hidden sm:block prose-sm capitalize">
                      Add Another Character
                    </div>
                  </button>
                </div>
              ))}

              <button
                type="submit"
                className="btn btn- capitalize col-span-5 prose-sm"
              >
                Generate
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

NewMoviescript.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    if (!props.availableTokens) {
      return {
        redirect: {
          destination: "/token-topup",
          permanent: false,
        },
      };
    }
    return {
      props,
    };
  },
});
