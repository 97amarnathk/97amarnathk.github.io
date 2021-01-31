import React from "react";
import cartoon from "../assets/cartoon.png";
import { HeroSection } from "../components/heroSection";
import { RecentPosts } from "../components/recentPosts";
import { DefaultLayout } from "../layouts/defaultLayout";

export default function Home() {
  { console.log(cartoon) }
  return (
    <DefaultLayout>
      <div class="space-y-16">
        <HeroSection />
        <RecentPosts />
      </div>
    </DefaultLayout >
  );
}
