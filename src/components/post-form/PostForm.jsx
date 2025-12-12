import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Image preview local state
  const [preview, setPreview] = React.useState(post?.featuredimage ? appwriteService.getFileUrl(post.featuredimage) : null);

  const slugTransform = useCallback((value) => {
    if (!value) return "";
    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z\d\s]+/g, "-")
      .replace(/\s+/g, "-");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
      if (name === "image" && value.image && value.image.length > 0) {
        const file = value.image[0];
        setPreview(URL.createObjectURL(file)); // local preview
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      let fileId = post?.featuredimage || null;

      if (data.image && data.image[0]) {
        const file = await appwriteService.uploadFile(data.image[0]);
        fileId = file.$id;
        if (post && post.featuredimage) {
          await appwriteService.deleteFile(post.featuredimage);
        }
      }

      const postData = {
        ...data,
        featuredimage: fileId,
        userid: userData.$id,
      };

      let dbPost;
      if (post) {
        dbPost = await appwriteService.updatePost(post.$id, postData);
      } else {
        dbPost = await appwriteService.createPost(postData);
      }

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input label="Title :" placeholder="Title" className="mb-4" {...register("title", { required: true })} />
        <Input label="Slug :" placeholder="Slug" className="mb-4" {...register("slug", { required: true })} />
        <label className="inline-block mb-1 pl-1 font-medium">Content :</label>
        <textarea
          {...register("content", { required: true })}
          placeholder="Write something..."
          className="w-full h-64 p-3 border rounded-lg mb-4"
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg"
          {...register("image", { required: !post })}
        />

        {preview && <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg mb-4" />}

        <Select options={["active", "inactive"]} label="Status" className="mb-4" {...register("status", { required: true })} />

        <Button type="submit" className="w-full bg-green-500 text-white">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}