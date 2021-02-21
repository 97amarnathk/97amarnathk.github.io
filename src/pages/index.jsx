import React from "react";
import { HeroSection } from "../components/heroSection";
import { RecentPosts } from "../components/recentPosts";
import { DefaultLayout } from "../layouts/defaultLayout";

export default function Home() {
  return (
    <DefaultLayout>
      <div class="space-y-16">
        <HeroSection />
        <RecentPosts />
      </div>
    </DefaultLayout >
  );
}
