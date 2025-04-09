"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Select, message } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebaseConfig";
import NavigationBar from "@/components/NavigationBar";
import BackButton from "@/components/BackButton/BackButton";

const { TextArea } = Input;

const NewPost = () => {
  const [uid, setUid] = useState<string | null>(null);
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
      else router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  const handlePost = async (isDraft = false) => {
    if (!title || !content || !uid) {
      message.error("Please fill out all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "comments"), {
        header: title,
        text: content,
        tag,
        userId: uid,
        imageUrl,
        isDraft,
        createdAt: serverTimestamp(),
      });

      message.success(isDraft ? "Draft saved!" : "Post submitted!");
      if (!isDraft) router.push("/forum");
    } catch (error) {
      console.error("Error adding post:", error);
      message.error("Failed to submit post.");
    }
  };

  if (!uid) return <div>Loading...</div>;

  return (
    <div>
      <NavigationBar uid={uid} />
      <div style={{ padding: "50px", background: "#fff", minHeight: "100vh" }}>
        <BackButton />
        <h2 style={{ fontSize: 32, fontWeight: 700, color: "#5E4A00", marginBottom: 24 }}>
            Create Post
        </h2>

        <div style={{ display: "flex", gap: 40 }}>
            {/* Left Column */}
            <div style={{ flex: 1 }}>
            <label style={{ marginBottom: 8, display: "block" }}>Select your tag</label>
            <Select
                value={tag}
                onChange={setTag}
                style={{ width: "100%", marginBottom: 16, background: "#fff7ba", borderRadius: 8 }}
                placeholder="Choose a category"
                options={[
                { value: "International Foods", label: "International Foods" },
                { value: "Cafe Suggestions", label: "Cafe Suggestions" },
                { value: "Best Places to Eat", label: "Best Places to Eat" },
                { value: "Vegan & Healthy Options", label: "Vegan & Healthy Options" },
                ]}
            />

            <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginBottom: 16, height: 50, borderRadius: 8 }}
            />

            <TextArea
                rows={6}
                placeholder="What do you think?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ borderRadius: 8 }}
            />
            </div>

            {/* Right Column */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
                style={{
                width: "100%",
                height: 200,
                border: "2px dashed #d9d9d9",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
                }}
            >
                {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Uploaded Preview"
                    style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 4 }}
                />
                ) : (
                <span style={{ color: "#999" }}>Upload your images</span>
                )}
            </div>

            <Input
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{ marginBottom: 16, height: 40, borderRadius: 8 }}
            />

            <div style={{ display: "flex", gap: 8 }}>
                <Button onClick={() => handlePost(true)}>Save draft</Button>
                <Button
                type="primary"
                onClick={() => handlePost(false)}
                style={{
                    backgroundColor: "#5E4A00",
                    borderColor: "#5E4A00",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 8,
                }}
                >
                Post
                </Button>
            </div>
            </div>
        </div>
    </div>

    </div>
  );
};

export default NewPost;
