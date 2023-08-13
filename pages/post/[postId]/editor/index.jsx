import { useContext, useEffect, useRef, useState } from "react";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getAppProps } from "../../../../utils/getAppProps";
import { AppLayout } from "../../../../components/AppLayout";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapEditorProps } from "./props";
import { TiptapExtensions } from "./extensions";
import DeletConfirmation from "../../../../components/DeletConfirmation/DeletConfirmation";
import { FileIcon, defaultStyles } from "react-file-icon";
import { saveAs } from "file-saver";
import PostsContext from "../../../../context/postsContext";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import va from "@vercel/analytics";
import { EditorBubbleMenu } from "./components";
import { BsDatabaseFillCheck, BsDownload } from "react-icons/bs";
import { useRouter } from "next/router";

export default function Editor(props) {
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(props.postContent);
  }, [props.postContent]);

  // Delete
  const router = useRouter();
  const { deletePost } = useContext(PostsContext);

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/posts/deletePost`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ postId: props.id }),
      });
      const json = await response.json();
      if (json.success) {
        deletePost(props.id);
        router.replace(`/post/new`);
      }
    } catch (e) {}
  };

  const [saveStatus, setSaveStatus] = useState("Saved");

  // Download

  const handleDownload = async (format) => {
    const downladableContent = editor.getHTML();
    switch (format) {
      case "txt":
        const plainText = downladableContent.replace(/<[^>]+>/g, "");
        const txtBlob = new Blob([plainText], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(txtBlob, `page.txt`);
        break;
      case "mdx":
        const mdxContent = `---
  title: page
  ---
  
  ${downladableContent}`;
        const mdxBlob = new Blob([mdxContent], {
          type: "text/markdown;charset=utf-8",
        });
        saveAs(mdxBlob, `page.mdx`);

        break;
      case "docx":
        // Generate DOCX and download
        const docxContent = `<html><body>${downladableContent}</body></html>`;
        const docxFile = new Blob([docxContent], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(docxFile, `page.docx`);
        break;
      default:
        break;
    }
  };

  // Save Changes
  const handleSaveChanges = async () => {
    try {
      const editedContent = editor.getHTML();
      const editResponse = await fetch(`/api/posts/editPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: props.id,
          postContent: editedContent,
        }),
      });
      const editJson = await editResponse.json();
      if (editJson.success) {
        toast.success("Content saved successfully.");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Unsaved");
      const selection = e.editor.state.selection;
      const lastTwo = e.editor.state.doc.textBetween(
        selection.from - 2,
        selection.from,
        "\n"
      );
      if (lastTwo === "++" && !isLoading) {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        complete(e.editor.getText());
        va.track("Autocomplete Shortcut Used");
      }
    },
    content,
  });

  const { complete, completion, isLoading, stop } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        va.track("Rate Limit Reached");
        return;
      }
    },
    onFinish: (_prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const prev = useRef("");

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, completion]);

  useEffect(() => {
    // if user presses escape or cmd + z and it's loading,
    // stop the request, delete the completion, and insert back the "++"
    const onKeyDown = (e) => {
      if (e.key === "Escape" || (e.metaKey && e.key === "z")) {
        stop();
        if (e.key === "Escape") {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - completion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent("++");
      }
    };
    const mousedownHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      stop();
      if (window.confirm("AI writing paused. Continue?")) {
        complete(editor?.getText() || "");
      }
    };
    if (isLoading) {
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    } else {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    };
  }, [stop, isLoading, editor, complete, completion.length]);

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div className="overflow-auto min-h-screen min-w-screen">
      <div className="mb-20">
        <div
          onClick={() => {
            editor?.chain().focus().run();
          }}
          className="min-h-screen min-w-screen sm:mx-10"
        >
          <div className="card mx-10 sm:mx-32 shadow-2xl p-10    rounded-md">
            <div className=" text-2xl font-bold mt-4 mb-6 prose-sm ">
              {props.title}
            </div>
            <div className="mb-10 text-justify w-full prose-sm">
              {props.metaDescription}
            </div>
            <div className="font-bold prose-sm">Keywords</div>
            <div>
              {props.keywords.split(",").map((keyword, i) => (
                <div key={i} className="prose-sm">
                  {keyword}
                </div>
              ))}
            </div>
          </div>
          <div className="divider"></div>
          {editor && <EditorBubbleMenu editor={editor} />}
          <EditorContent editor={editor} className="p-10 prose-sm w-full" />
        </div>
        {/* Actions */}

        <div className="flex justify-between items-center mx-10 sm:mx-20">
          <DeletConfirmation onDelete={handleDeleteConfirm} />

          <button className="btn  " onClick={handleSaveChanges}>
            <BsDatabaseFillCheck />
            <div className="hidden sm:block capitalize prose-sm text-xs">
              Save Changes
            </div>
          </button>
          <div className="dropdown  dropdown-top dropdown-end">
            <label tabIndex={0} className="btn m-1 ">
              <BsDownload />
              <div className="hidden sm:block capitalize prose-sm text-xs">
                Download
              </div>
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit "
            >
              <div className="tooltip tooltip-left " data-tip=".txt">
                <li>
                  <a
                    onClick={() => handleDownload("txt")}
                    className="flex justify-between items-center w-16 "
                  >
                    <FileIcon extension="txt" {...defaultStyles.txt} />
                  </a>
                </li>
              </div>
              <div className="tooltip tooltip-left " data-tip=".mdx">
                <li>
                  <a
                    onClick={() => handleDownload("mdx")}
                    className="flex justify-between items-center w-16 "
                  >
                    <FileIcon extension="mdx" {...defaultStyles.mdx} />
                  </a>
                </li>
              </div>
              <div className="tooltip tooltip-left " data-tip=".docx">
                <li>
                  <a
                    onClick={() => handleDownload("docx")}
                    className="flex justify-between items-center w-16 "
                  >
                    <FileIcon extension="docx" {...defaultStyles.docx} />
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
Editor.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("BlogStandard");
    const user = await db.collection("users").findOne({
      auth0Id: userSession.user.sub,
    });
    const post = await db.collection("posts").findOne({
      _id: new ObjectId(ctx.params.postId),
      userId: user._id,
    });

    if (!post) {
      return {
        redirect: {
          destination: "/post/new",
          permanent: false,
        },
      };
    }

    return {
      props: {
        id: ctx.params.postId,
        postContent: post.postContent,
        title: post.title,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        postCreated: post.create.toString(),
        ...props,
      },
    };
  },
});
