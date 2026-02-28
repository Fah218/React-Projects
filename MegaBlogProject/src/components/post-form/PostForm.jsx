import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setIsSubmitting(true);
        console.log("Form submitted with data:", data);

        try {
            if (post) {
                // Updating existing post
                const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file && post.featuredImage) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // Creating new post
                if (!userData || !userData.$id) {
                    alert("Error: User not logged in. Please refresh and try again.");
                    setIsSubmitting(false);
                    return;
                }

                if (!data.image || !data.image[0]) {
                    alert("Please select a featured image");
                    setIsSubmitting(false);
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;

                    // Limit slug to 36 chars to avoid appwrite document id limits
                    const safeSlug = data.slug.substring(0, 36);

                    const dbPost = await appwriteService.createPost({ ...data, slug: safeSlug, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        alert("Failed to create post. A post with this title/slug might already exist. Try changing the title. Check console for details.");
                    }
                } else {
                    alert("Failed to upload image. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error during submission:", error);
            alert("An error occurred during submission. See console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError = (errors) => {
        console.log("Form Validation Errors:", errors);
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
                .substring(0, 36); // Appwrite max document ID length

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit, onError)} className="flex flex-wrap text-left">
            <div className="w-full lg:w-2/3 px-2">
                <Input
                    label="Title *"
                    placeholder="Enter an engaging title"
                    className="mb-1"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="text-red-500 text-sm mb-4">{errors.title.message}</p>}

                <Input
                    label="Slug *"
                    placeholder="post-url-slug"
                    className="mb-1"
                    {...register("slug", { required: "Slug is required" })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && <p className="text-red-500 text-sm mb-4">{errors.slug.message}</p>}

                <div className="mt-4">
                    <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>

            <div className="w-full lg:w-1/3 px-2 mt-6 lg:mt-0">
                <Input
                    label="Featured Image *"
                    type="file"
                    className="mb-1"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post ? "An image is required" : false })}
                />
                {errors.image && <p className="text-red-500 text-sm mb-4">{errors.image.message}</p>}

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg border border-gray-700 shadow-md"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Visibility Status"
                    className="mb-6 mt-4"
                    {...register("status", { required: "Status is required" })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"}
                    className="w-full flex justify-center items-center py-3 text-lg font-bold shadow-lg transition-all duration-200 hover:-translate-y-1"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {post ? "Updating..." : "Publishing..."}
                        </div>
                    ) : (
                        post ? "Update Post" : "Publish Post"
                    )}
                </Button>
            </div>
        </form>
    );
}