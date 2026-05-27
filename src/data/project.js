export const project = {
  site: {
    name: "Instant Fold",
    description:
      "Instant Fold: In-Context Imitation Learning for Deformable Manipulation.",
  },
  hero: {
    title: "Instant Fold: In-Context Imitation Learning for Deformable Manipulation",
    venue: "Under Review",
    authors: [{ name: "Anonymous Authors" }],
    actions: [
      { label: "Paper", href: "#", external: false },
    ],
    teaserVideo: "/assets/videos/teaser.mp4",
    teaserPoster: "/assets/posters/teaser.jpg",
    teaserCaption:
      "Given a single human demonstration as a prompt, Instant Fold infers and executes diverse manipulation strategies directly from the demonstration without requiring gradient updates.",
  },
  zeroShotSim2Real: {
    title: "Zero-Shot Sim2Real with Human Demonstration",
    videos: [
      { video: "/assets/videos/one-shot-videos/1.mp4" },
      { video: "/assets/videos/one-shot-videos/2.mp4" },
      { video: "/assets/videos/one-shot-videos/3.mp4" },
      { video: "/assets/videos/one-shot-videos/4.mp4" },
    ],
  },
  videoSets: {
    pink: {
      label: "Shirt 1",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/pink/1.mp4" },
        { label: "Sleeve: center | Body: top down | Left-first", video: "/assets/videos/pink/2.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Right-first", video: "/assets/videos/pink/3.mp4" },
        { label: "Sleeve: center | Body: bottom up | Left-first", video: "/assets/videos/pink/4.mp4" },
      ],
    },
    navy_blue: {
      label: "Shirt 2",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/navy_blue/1.mp4" },
        { label: "Sleeve: diagonal | Body: bottom up | Left-first (Unseen)", video: "/assets/videos/navy_blue/2.mp4" },
        { label: "Sleeve: down | Body: bottom up | Simultaneous", video: "/assets/videos/navy_blue/3.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/navy_blue/4.mp4" },
      ],
    },
    blue_short: {
      label: "Short 1",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/blue_short/1.mp4" },
        { label: "Sleeve: asymmetric | Body: top down | Left-first", video: "/assets/videos/blue_short/2.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/blue_short/3.mp4" },
        { label: "Sleeve: center | Body: bottom up | Left-first", video: "/assets/videos/blue_short/4.mp4" },
      ],
    },
    purple_short: {
      label: "Short 2",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/purple_short/1.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/purple_short/2.mp4" },
      ],
    },
    black_dress: {
      label: "Blouse 1",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/black_dress/1.mp4" },
        { label: "Sleeve: center | Body: top down | Left-first", video: "/assets/videos/black_dress/2.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/black_dress/3.mp4" },
        { label: "Sleeve: diagonal | Body: bottom up | Left-first", video: "/assets/videos/black_dress/4.mp4" },
      ],
    },
    pink_dress: {
      label: "Blouse 2",
      videos: [
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/pink_dress/1.mp4" },
        { label: "Sleeve: center | Body: bottom up | Left-first", video: "/assets/videos/pink_dress/2.mp4" },
      ],
    },
    black_sports: {
      label: "Training Jacket",
      videos: [
        { label: "Sleeve: down | Body: top down | Simultaneous", video: "/assets/videos/black_sports/1.mp4" },
        { label: "Sleeve: cross | Body: bottom up | Left-first", video: "/assets/videos/black_sports/2.mp4" },
      ],
    },
  },
  abstract: [
    "Deformable object manipulation (DOM) is challenging due to high-dimensional, partially observable states that evolve through long-horizon, topology-changing interactions with multiple valid manipulation strategies. We introduce Instant Fold, an in-context imitation learning framework for DOM. Given a single human demonstration, our policy infers and executes diverse manipulation strategies directly from the demonstration—including variations in spatial execution and ordering—without requiring gradient updates. Our approach first learns deformation-aware visual representations via temporal contrastive pretraining, after which a flow-matching transformer policy conditioned on the demonstration predicts actions to execute the intended manipulation strategy. Trained entirely in simulation, Instant Fold generalizes across diverse folding strategies and transfers zero-shot to real-world settings without additional finetuning."
  ],
};
