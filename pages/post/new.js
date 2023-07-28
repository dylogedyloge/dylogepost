import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";

export default function NewPost(props) {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const response = await fetch(`/api/generatePost`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ topic, keywords }),
      });
      const json = await response.json();

      if (json?.postId) {
        router.push(`/post/${json.postId}/editor`);
      }
    } catch (e) {
      setGenerating(false);
    }
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
            className="card border border-1 bg-base-100 w-fit shadow-xl p-10 glass"
          >
            <div className="mb-5 ">
              <label className="label grid place-content-center mb-4">
                <span className="label-text  font-semibold prose-sm text-sm">
                  Topic
                </span>
              </label>
              <textarea
                // placeholder="Top 10 tips for happiness "
                className="textarea textarea-bordered w-full prose-sm text-sm"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                maxLength={80}
              />
            </div>
            <div className="mb-10">
              <label className="label grid place-content-center mb-4">
                <span className="label-text  ">
                  <div className="grid place-items-center">
                    <div className="font-semibold prose-sm text-sm">
                      Keywords{" "}
                    </div>
                    <div className="prose-sm text-xs text-base-content/75">
                      Seperate with comma
                    </div>
                  </div>
                </span>
              </label>
              <textarea
                // placeholder="happines, self-steem, Anthony Robins"
                className="textarea textarea-bordered w-full  prose-sm text-sm"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                maxLength={80}
              />
            </div>
            <button
              type="submit"
              className="btn btn-block capitalize"
              disabled={!topic.trim() || !keywords.trim()}
            >
              <div className="prose-sm text-sm"> Generate</div>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
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
